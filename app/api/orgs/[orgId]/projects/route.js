/**
 * GET /api/orgs/[orgId]/projects — List projects
 * POST /api/orgs/[orgId]/projects — Create project
 */

import { NextResponse } from 'next/server';
import { withTenantGuard } from '@/lib/guards/tenant-guard';
import { ProjectService } from '@/lib/services/project-service';

export const GET = withTenantGuard(async (request, context, tenant) => {
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = parseInt(url.searchParams.get('limit') || '50', 10);

    const service = new ProjectService(tenant.orgId);
    const result = await service.findAll({ status, page, limit });

    return NextResponse.json({ success: true, ...result });
});

export const POST = withTenantGuard(async (request, _context, tenant) => {
    const body = await request.json();
    const { name, description, status, tags, metadata } = body;

    if (!name) {
        return NextResponse.json(
            { success: false, error: 'Project name is required' },
            { status: 400 }
        );
    }

    const service = new ProjectService(tenant.orgId);

    try {
        const project = await service.create({
            name,
            description,
            status,
            ownerId: tenant.userId,
            tags,
            metadata,
        });

        return NextResponse.json({ success: true, project }, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json(
                { success: false, error: 'A project with this name already exists' },
                { status: 409 }
            );
        }
        throw error;
    }
}, { requiredRole: 'viewer' });
