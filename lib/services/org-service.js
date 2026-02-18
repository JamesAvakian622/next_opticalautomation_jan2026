/**
 * Organization Service — manages org lifecycle (create, seed, lookup)
 */

import { getOrganizationsCollection, getOrgUsersCollection } from '../db/collections.js';
import { DEFAULT_ROLES } from '../db/schemas.js';
import { RoleService } from './role-service.js';
import { BillingService } from './billing-service.js';

export class OrgService {
    /**
     * Create a new organization and seed defaults.
     *
     * @param {Object} params
     * @param {string} params.clerkOrgId - Clerk organization ID
     * @param {string} params.slug - URL-safe org slug
     * @param {string} params.name - Display name
     * @param {string} params.ownerId - Clerk user ID of the owner
     * @param {string} params.ownerEmail - Owner's email
     * @param {string} [params.plan='free'] - Subscription plan
     * @returns {Object} Created org document
     */
    static async createOrg({ clerkOrgId, slug, name, ownerId, ownerEmail, plan = 'free' }) {
        const orgsCollection = await getOrganizationsCollection();
        const now = new Date();

        // Check for duplicate slug
        const existingSlug = await orgsCollection.findOne({ slug });
        if (existingSlug) {
            throw new Error(`Organization slug "${slug}" is already taken`);
        }

        // 1. Insert organization document
        const orgDoc = {
            clerkOrgId,
            slug,
            name,
            ownerId,
            plan,
            settings: {
                logoUrl: null,
                primaryColor: '#6366f1',
                features: [],
            },
            createdAt: now,
            updatedAt: now,
        };

        const result = await orgsCollection.insertOne(orgDoc);
        const orgId = result.insertedId.toString();

        // 2. Add owner as first org_user
        const orgUsersCollection = await getOrgUsersCollection();
        await orgUsersCollection.insertOne({
            orgId,
            clerkUserId: ownerId,
            email: ownerEmail,
            name: name,
            role: 'owner',
            customRoleId: null,
            invitedBy: null,
            joinedAt: now,
            updatedAt: now,
        });

        // 3. Seed default roles
        const roleService = new RoleService(orgId);
        await roleService.seedDefaults(DEFAULT_ROLES);

        // 4. Create default billing record
        const billingService = new BillingService(orgId);
        await billingService.createOrUpdate({ plan, seats: 1 });

        return { ...orgDoc, _id: result.insertedId };
    }

    /**
     * Find org by slug.
     */
    static async findBySlug(slug) {
        const collection = await getOrganizationsCollection();
        return collection.findOne({ slug });
    }

    /**
     * Find org by Clerk org ID.
     */
    static async findByClerkOrgId(clerkOrgId) {
        const collection = await getOrganizationsCollection();
        return collection.findOne({ clerkOrgId });
    }

    /**
     * List all organizations a Clerk user belongs to.
     */
    static async findByUserId(clerkUserId) {
        const orgUsersCollection = await getOrgUsersCollection();
        const memberships = await orgUsersCollection.find({ clerkUserId }).toArray();

        if (memberships.length === 0) return [];

        const orgIds = memberships.map((m) => m.orgId);
        const orgsCollection = await getOrganizationsCollection();

        // orgIds are stored as strings of ObjectId
        const { ObjectId } = await import('mongodb');
        const orgs = await orgsCollection
            .find({ _id: { $in: orgIds.map((id) => new ObjectId(id)) } })
            .toArray();

        // Attach role to each org
        return orgs.map((org) => {
            const membership = memberships.find((m) => m.orgId === org._id.toString());
            return { ...org, userRole: membership?.role };
        });
    }

    /**
     * Update org settings.
     */
    static async updateSettings(orgId, settings) {
        const collection = await getOrganizationsCollection();
        const { ObjectId } = await import('mongodb');

        const result = await collection.findOneAndUpdate(
            { _id: new ObjectId(orgId) },
            { $set: { settings, updatedAt: new Date() } },
            { returnDocument: 'after' }
        );

        return result;
    }
}
