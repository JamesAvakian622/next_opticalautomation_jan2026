/**
 * GET    /api/orgs/[orgId]/roles/[roleId] — Get single role
 * PUT    /api/orgs/[orgId]/roles/[roleId] — Update role
 * DELETE /api/orgs/[orgId]/roles/[roleId] — Delete role
 */

import { NextResponse } from 'next/server';
import { withTenantGuard } from '@/lib/guards/tenant-guard';
import { RoleService } from '@/lib/services/role-service';

export const GET = withTenantGuard(async (_request, context, tenant) => {
    const { roleId } = context.params;
    const service = new RoleService(tenant.orgId);
    const role = await service.findById(roleId);

    if (!role) {
        return NextResponse.json(
            { success: false, error: 'Role not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, role });
});

export const PUT = withTenantGuard(async (request, context, tenant) => {
    const { roleId } = context.params;
    const body = await request.json();
    const { name, description, permissions } = body;

    const service = new RoleService(tenant.orgId);

    try {
        const role = await service.update(roleId, { name, description, permissions });
        if (!role) {
            return NextResponse.json(
                { success: false, error: 'Role not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, role });
    } catch (error) {
        if (error.message.includes('default') || error.message.includes('Invalid')) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
        throw error;
    }
}, { requiredRole: 'admin' });

export const DELETE = withTenantGuard(async (_request, context, tenant) => {
    const { roleId } = context.params;
    const service = new RoleService(tenant.orgId);

    try {
        const deleted = await service.remove(roleId);
        if (!deleted) {
            return NextResponse.json(
                { success: false, error: 'Role not found' },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, message: 'Role deleted' });
    } catch (error) {
        if (error.message.includes('default')) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 403 }
            );
        }
        throw error;
    }
}, { requiredRole: 'admin' });
