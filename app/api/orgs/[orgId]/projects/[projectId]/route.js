/**
 * GET    /api/orgs/[orgId]/projects/[projectId] — Get single project
 * PUT    /api/orgs/[orgId]/projects/[projectId] — Update project
 * DELETE /api/orgs/[orgId]/projects/[projectId] — Delete project
 */

import { NextResponse } from 'next/server';
import { withTenantGuard } from '@/lib/guards/tenant-guard';
import { ProjectService } from '@/lib/services/project-service';

export const GET = withTenantGuard(async (_request, context, tenant) => {
    const { projectId } = context.params;
    const service = new ProjectService(tenant.orgId);
    const project = await service.findById(projectId);

    if (!project) {
        return NextResponse.json(
            { success: false, error: 'Project not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, project });
});

export const PUT = withTenantGuard(async (request, context, tenant) => {
    const { projectId } = context.params;
    const body = await request.json();
    const service = new ProjectService(tenant.orgId);

    const project = await service.update(projectId, body);

    if (!project) {
        return NextResponse.json(
            { success: false, error: 'Project not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, project });
}, { requiredRole: 'editor' });

export const DELETE = withTenantGuard(async (_request, context, tenant) => {
    const { projectId } = context.params;
    const service = new ProjectService(tenant.orgId);
    const deleted = await service.remove(projectId);

    if (!deleted) {
        return NextResponse.json(
            { success: false, error: 'Project not found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, message: 'Project deleted' });
}, { requiredRole: 'admin' });
