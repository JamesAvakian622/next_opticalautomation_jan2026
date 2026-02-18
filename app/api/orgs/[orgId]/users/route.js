/**
 * GET  /api/orgs/[orgId]/users — List org members
 * POST /api/orgs/[orgId]/users — Invite a user
 */

import { NextResponse } from 'next/server';
import { withTenantGuard } from '@/lib/guards/tenant-guard';
import { UserService } from '@/lib/services/user-service';

export const GET = withTenantGuard(async (request, _context, tenant) => {
    const url = new URL(request.url);
    const role = url.searchParams.get('role');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);

    const service = new UserService(tenant.orgId);
    const result = await service.findByOrg({ role, page, limit });

    return NextResponse.json({ success: true, ...result });
});

export const POST = withTenantGuard(async (request, _context, tenant) => {
    const body = await request.json();
    const { clerkUserId, email, name, role } = body;

    if (!email) {
        return NextResponse.json(
            { success: false, error: 'Email is required' },
            { status: 400 }
        );
    }

    const service = new UserService(tenant.orgId);

    try {
        const member = await service.invite({
            clerkUserId: clerkUserId || null,
            email,
            name,
            role: role || 'viewer',
            invitedBy: tenant.userId,
        });

        return NextResponse.json({ success: true, member }, { status: 201 });
    } catch (error) {
        if (error.message.includes('already a member')) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 409 }
            );
        }
        throw error;
    }
}, { requiredRole: 'admin' });
