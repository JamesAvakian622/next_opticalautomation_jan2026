/**
 * GET    /api/orgs/[orgId]/users/[userId] — Get single member
 * PUT    /api/orgs/[orgId]/users/[userId] — Update member role
 * DELETE /api/orgs/[orgId]/users/[userId] — Remove member
 */

import { NextResponse } from 'next/server';
import { withTenantGuard } from '@/lib/guards/tenant-guard';
import { UserService } from '@/lib/services/user-service';

export const GET = withTenantGuard(async (_request, context, tenant) => {
    const { userId } = context.params;
    const service = new UserService(tenant.orgId);
    const member = await service.findById(userId);

    if (!member) {
        return NextResponse.json(
            { success: false, error: 'Member not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, member });
});

export const PUT = withTenantGuard(async (request, context, tenant) => {
    const { userId } = context.params;
    const body = await request.json();
    const { role, customRoleId } = body;

    const service = new UserService(tenant.orgId);
    const member = await service.updateRole(userId, { role, customRoleId });

    if (!member) {
        return NextResponse.json(
            { success: false, error: 'Member not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, member });
}, { requiredRole: 'admin' });

export const DELETE = withTenantGuard(async (_request, context, tenant) => {
    const { userId } = context.params;
    const service = new UserService(tenant.orgId);

    try {
        const deleted = await service.remove(userId);
        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'Member not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, message: 'Member removed' });
    } catch (error) {
        if (error.message.includes('owner')) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 403 }
            );
        }
        throw error;
    }
}, { requiredRole: 'owner' });
