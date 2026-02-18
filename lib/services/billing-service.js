/**
 * Billing Service — manages billing/subscription records per org
 */

import { getBillingCollection, scopeToOrg } from '../db/collections.js';

export class BillingService {
    constructor(orgId) {
        if (!orgId) throw new Error('BillingService requires an orgId');
        this.orgId = orgId;
    }

    async getByOrg() {
        const collection = await getBillingCollection();
        return collection.findOne(scopeToOrg(this.orgId));
    }

    async createOrUpdate({ plan = 'free', stripeCustomerId, stripeSubscriptionId, seats = 1, currentPeriodEnd }) {
        const collection = await getBillingCollection();
        const now = new Date();

        const result = await collection.findOneAndUpdate(
            scopeToOrg(this.orgId),
            {
                $set: {
                    plan,
                    stripeCustomerId: stripeCustomerId || null,
                    stripeSubscriptionId: stripeSubscriptionId || null,
                    seats,
                    currentPeriodEnd: currentPeriodEnd || null,
                    cancelAtPeriodEnd: false,
                    updatedAt: now,
                },
                $setOnInsert: {
                    orgId: this.orgId,
                    invoiceHistory: [],
                    createdAt: now,
                },
            },
            { upsert: true, returnDocument: 'after' }
        );

        return result;
    }

    async updatePlan(plan, { seats, stripeSubscriptionId, currentPeriodEnd } = {}) {
        const collection = await getBillingCollection();
        const updates = { plan, updatedAt: new Date() };

        if (seats !== undefined) updates.seats = seats;
        if (stripeSubscriptionId !== undefined) updates.stripeSubscriptionId = stripeSubscriptionId;
        if (currentPeriodEnd !== undefined) updates.currentPeriodEnd = currentPeriodEnd;

        const result = await collection.findOneAndUpdate(
            scopeToOrg(this.orgId),
            { $set: updates },
            { returnDocument: 'after' }
        );

        return result;
    }

    async cancelSubscription() {
        const collection = await getBillingCollection();
        const result = await collection.findOneAndUpdate(
            scopeToOrg(this.orgId),
            { $set: { cancelAtPeriodEnd: true, updatedAt: new Date() } },
            { returnDocument: 'after' }
        );

        return result;
    }

    async addInvoice({ invoiceId, amount, currency = 'usd', status, date }) {
        const collection = await getBillingCollection();
        const result = await collection.findOneAndUpdate(
            scopeToOrg(this.orgId),
            {
                $push: {
                    invoiceHistory: {
                        invoiceId,
                        amount,
                        currency,
                        status,
                        date: date || new Date(),
                    },
                },
                $set: { updatedAt: new Date() },
            },
            { returnDocument: 'after' }
        );

        return result;
    }

    async getInvoiceHistory() {
        const billing = await this.getByOrg();
        return billing?.invoiceHistory || [];
    }
}
