/**
 * POST /api/onboarding — Create a new organization
 *
 * 1. Creates org in Clerk
 * 2. Seeds MongoDB (org doc, default roles, billing, owner membership)
 * 3. Returns redirect URL
 */

import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { OrgService } from '@/lib/services/org-service';
import { slugifyOrgName, isValidOrgSlug } from '@/lib/resolve-tenant';

export async function POST(request) {
    try {
        // 1. Authenticate
        const authResult = await auth();
        const { userId } = authResult;

        if (!userId) {
            return NextResponse.json(
                { success: false, error: 'Authentication required' },
                { status: 401 }
            );
        }

        // 2. Parse body
        const body = await request.json();
        const { orgName, slug: requestedSlug, plan = 'free' } = body;

        if (!orgName || orgName.trim().length < 2) {
            return NextResponse.json(
                { success: false, error: 'Organization name must be at least 2 characters' },
                { status: 400 }
            );
        }

        // Generate or validate slug
        const slug = requestedSlug || slugifyOrgName(orgName);
        if (!isValidOrgSlug(slug)) {
            return NextResponse.json(
                { success: false, error: 'Invalid organization slug. Use letters, numbers, hyphens only (3-64 chars).' },
                { status: 400 }
            );
        }

        // 3. Create org in Clerk
        let clerkOrg;
        try {
            const client = await clerkClient();
            clerkOrg = await client.organizations.createOrganization({
                name: orgName.trim(),
                slug,
                createdBy: userId,
            });
        } catch (clerkError) {
            console.error('[Onboarding] Clerk org creation failed:', clerkError);
            const message = clerkError?.errors?.[0]?.message || 'Failed to create organization in Clerk';
            return NextResponse.json(
                { success: false, error: message },
                { status: 422 }
            );
        }

        // 4. Fetch user email from Clerk
        let userEmail = '';
        try {
            const client = await clerkClient();
            const user = await client.users.getUser(userId);
            userEmail = user.emailAddresses?.[0]?.emailAddress || '';
        } catch {
            // Continue without email
        }

        // 5. Seed MongoDB
        let org;
        try {
            org = await OrgService.createOrg({
                clerkOrgId: clerkOrg.id,
                slug,
                name: orgName.trim(),
                ownerId: userId,
                ownerEmail: userEmail,
                plan,
            });
        } catch (dbError) {
            console.error('[Onboarding] DB seeding failed:', dbError);
            // Attempt cleanup: delete Clerk org
            try {
                const client = await clerkClient();
                await client.organizations.deleteOrganization(clerkOrg.id);
            } catch {
                console.error('[Onboarding] Clerk cleanup also failed');
            }

            if (dbError.message.includes('already taken')) {
                return NextResponse.json(
                    { success: false, error: dbError.message },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { success: false, error: 'Failed to set up organization database' },
                { status: 500 }
            );
        }

        // 6. Return success with redirect
        const redirectUrl = `/org/${slug}/dashboard`;

        return NextResponse.json(
            {
                success: true,
                org: {
                    id: org._id,
                    clerkOrgId: clerkOrg.id,
                    slug,
                    name: orgName.trim(),
                    plan,
                },
                redirectUrl,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('[Onboarding] Unexpected error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    }
}
