/**
 * GET  /api/orgs/[orgId]/roles — List roles
 * POST /api/orgs/[orgId]/roles — Create custom role
 */

import { NextResponse } from 'next/server';
import { withTenantGuard } from '@/lib/guards/tenant-guard';
import { RoleService } from '@/lib/services/role-service';

export const GET = withTenantGuard(async (_request, _context, tenant) => {
    const service = new RoleService(tenant.orgId);
    const roles = await service.findByOrg();

    return NextResponse.json({ success: true, roles });
});

export const POST = withTenantGuard(async (request, _context, tenant) => {
    const body = await request.json();
    const { name, description, permissions } = body;

    if (!name) {
        return NextResponse.json(
            { success: false, error: 'Role name is required' },
            { status: 400 }
        );
    }

    const service = new RoleService(tenant.orgId);

    try {
        const role = await service.create({ name, description, permissions });
        return NextResponse.json({ success: true, role }, { status: 201 });
    } catch (error) {
        if (error.message.includes('already exists') || error.message.includes('Invalid permissions')) {
            return NextResponse.json(
                { success: false, error: error.message },
                { status: 400 }
            );
        }
        throw error;
    }
}, { requiredRole: 'admin' });
