/**
 * TenantGuard — Higher-Order API Route Wrapper
 *
 * Enforces Clerk organization membership before allowing access to
 * tenant-scoped API routes. Injects tenant context into the handler.
 *
 * Usage:
 *   import { withTenantGuard } from '@/lib/guards/tenant-guard';
 *
 *   export const GET = withTenantGuard(async (request, context, tenant) => {
 *     // tenant = { orgId, userId, userEmail, userRole, org }
 *     const projects = await ProjectService.findAll(tenant.orgId);
 *     return NextResponse.json(projects);
 *   }, { requiredRole: 'editor' });
 */

import { NextResponse } from 'next/server';
import { auth, clerkClient } from '@clerk/nextjs/server';
import { getOrganizationsCollection, getOrgUsersCollection } from '../db/collections.js';

// Role hierarchy for comparison
const ROLE_HIERARCHY = {
    viewer: 0,
    editor: 1,
    admin: 2,
    owner: 3,
};

/**
 * Wrap an API route handler with tenant guard logic.
 *
 * @param {Function} handler - async (request, context, tenant) => Response
 * @param {Object} [options]
 * @param {string} [options.requiredRole] - Minimum role required (viewer|editor|admin|owner)
 * @param {string[]} [options.requiredPermissions] - Specific permissions required
 * @returns {Function} - Wrapped handler
 */
export function withTenantGuard(handler, options = {}) {
    return async function guardedHandler(request, context) {
        try {
            // 1. Authenticate via Clerk
            const authResult = await auth();
            const { userId, orgId: clerkActiveOrgId } = authResult;

            if (!userId) {
                return NextResponse.json(
                    { error: 'Authentication required', code: 'UNAUTHENTICATED' },
                    { status: 401 }
                );
            }

            // 2. Determine the target orgId
            // Priority: URL param > Clerk active org > header
            const urlOrgId = context?.params?.orgId;
            const headerOrgId = request.headers.get('x-tenant-id');
            const targetOrgId = urlOrgId || clerkActiveOrgId || headerOrgId;

            if (!targetOrgId) {
                return NextResponse.json(
                    { error: 'Organization context required', code: 'NO_ORG_CONTEXT' },
                    { status: 400 }
                );
            }

            // 3. Look up the org in our database
            const orgsCollection = await getOrganizationsCollection();
            const org = await orgsCollection.findOne({
                $or: [
                    { clerkOrgId: targetOrgId },
                    { slug: targetOrgId },
                    { _id: targetOrgId },
                ],
            });

            if (!org) {
                return NextResponse.json(
                    { error: 'Organization not found', code: 'ORG_NOT_FOUND' },
                    { status: 404 }
                );
            }

            const orgId = org._id.toString();

            // 4. Check membership in our org_users collection
            const orgUsersCollection = await getOrgUsersCollection();
            const membership = await orgUsersCollection.findOne({
                orgId,
                clerkUserId: userId,
            });

            if (!membership) {
                // Fallback: check Clerk org membership directly
                let clerkMembership = null;
                try {
                    const client = await clerkClient();
                    const memberships = await client.organizations.getOrganizationMembershipList({
                        organizationId: org.clerkOrgId,
                    });
                    clerkMembership = memberships.data?.find(
                        (m) => m.publicUserData?.userId === userId
                    );
                } catch {
                    // Clerk lookup failed — deny access
                }

                if (!clerkMembership) {
                    return NextResponse.json(
                        { error: 'Not a member of this organization', code: 'NOT_A_MEMBER' },
                        { status: 403 }
                    );
                }
            }

            const userRole = membership?.role || 'viewer';

            // 5. Check required role
            if (options.requiredRole) {
                const userLevel = ROLE_HIERARCHY[userRole] ?? 0;
                const requiredLevel = ROLE_HIERARCHY[options.requiredRole] ?? 0;

                if (userLevel < requiredLevel) {
                    return NextResponse.json(
                        {
                            error: `Requires ${options.requiredRole} role or higher`,
                            code: 'INSUFFICIENT_ROLE',
                        },
                        { status: 403 }
                    );
                }
            }

            // 6. Check required permissions (if using custom roles)
            if (options.requiredPermissions?.length > 0 && membership?.customRoleId) {
                // Look up role permissions
                const { getRolesCollection } = await import('../db/collections.js');
                const rolesCollection = await getRolesCollection();
                const customRole = await rolesCollection.findOne({
                    _id: membership.customRoleId,
                    orgId,
                });

                if (customRole) {
                    const missingPerms = options.requiredPermissions.filter(
                        (p) => !customRole.permissions.includes(p)
                    );
                    if (missingPerms.length > 0) {
                        return NextResponse.json(
                            {
                                error: `Missing permissions: ${missingPerms.join(', ')}`,
                                code: 'INSUFFICIENT_PERMISSIONS',
                            },
                            { status: 403 }
                        );
                    }
                }
            }

            // 7. Build tenant context and call the handler
            const tenant = {
                orgId,
                orgSlug: org.slug,
                orgName: org.name,
                orgPlan: org.plan,
                userId,
                userEmail: membership?.email || null,
                userRole,
                org,
            };

            return handler(request, context, tenant);
        } catch (error) {
            console.error('[TenantGuard] Error:', error);
            return NextResponse.json(
                { error: 'Internal server error', code: 'INTERNAL_ERROR' },
                { status: 500 }
            );
        }
    };
}

/**
 * Lightweight guard that only checks authentication (no org membership).
 * Useful for endpoints like /api/onboarding that run before org exists.
 */
export function withAuthGuard(handler) {
    return async function guardedHandler(request, context) {
        try {
            const authResult = await auth();
            const { userId } = authResult;

            if (!userId) {
                return NextResponse.json(
                    { error: 'Authentication required', code: 'UNAUTHENTICATED' },
                    { status: 401 }
                );
            }

            // Fetch user details from Clerk
            let userEmail = null;
            try {
                const client = await clerkClient();
                const user = await client.users.getUser(userId);
                userEmail = user.emailAddresses?.[0]?.emailAddress || null;
            } catch {
                // Proceed without email
            }

            return handler(request, context, { userId, userEmail });
        } catch (error) {
            console.error('[AuthGuard] Error:', error);
            return NextResponse.json(
                { error: 'Internal server error', code: 'INTERNAL_ERROR' },
                { status: 500 }
            );
        }
    };
}
