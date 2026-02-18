/**
 * GET /api/orgs/[orgId]/billing — Get billing info
 * PUT /api/orgs/[orgId]/billing — Update billing/plan
 */

import { NextResponse } from 'next/server';
import { withTenantGuard } from '@/lib/guards/tenant-guard';
import { BillingService } from '@/lib/services/billing-service';

export const GET = withTenantGuard(async (_request, _context, tenant) => {
    const service = new BillingService(tenant.orgId);
    const billing = await service.getByOrg();

    if (!billing) {
        return NextResponse.json(
            { success: false, error: 'No billing record found' },
            { status: 404 }
        );
    }

    return NextResponse.json({ success: true, billing });
}, { requiredRole: 'viewer' });

export const PUT = withTenantGuard(async (request, _context, tenant) => {
    const body = await request.json();
    const { plan, seats, stripeCustomerId, stripeSubscriptionId, currentPeriodEnd } = body;

    const service = new BillingService(tenant.orgId);

    if (plan) {
        const billing = await service.updatePlan(plan, {
            seats,
            stripeSubscriptionId,
            currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : undefined,
        });
        return NextResponse.json({ success: true, billing });
    }

    const billing = await service.createOrUpdate({
        stripeCustomerId,
        stripeSubscriptionId,
        seats,
        currentPeriodEnd: currentPeriodEnd ? new Date(currentPeriodEnd) : undefined,
    });

    return NextResponse.json({ success: true, billing });
}, { requiredRole: 'owner' });
