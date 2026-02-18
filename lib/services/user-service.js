/**
 * User Service — manages org_users (membership) collection
 */

import { getOrgUsersCollection, scopeToOrg } from '../db/collections.js';
import { ObjectId } from 'mongodb';

export class UserService {
    constructor(orgId) {
        if (!orgId) throw new Error('UserService requires an orgId');
        this.orgId = orgId;
    }

    async invite({ clerkUserId, email, name, role = 'viewer', invitedBy }) {
        const collection = await getOrgUsersCollection();
        const now = new Date();

        // Check if already a member
        const existing = await collection.findOne(scopeToOrg(this.orgId, { clerkUserId }));
        if (existing) {
            throw new Error('User is already a member of this organization');
        }

        const doc = {
            orgId: this.orgId,
            clerkUserId,
            email,
            name: name || '',
            role,
            customRoleId: null,
            invitedBy: invitedBy || null,
            joinedAt: now,
            updatedAt: now,
        };

        const result = await collection.insertOne(doc);
        return { ...doc, _id: result.insertedId };
    }

    async findById(membershipId) {
        const collection = await getOrgUsersCollection();
        return collection.findOne(scopeToOrg(this.orgId, {
            _id: new ObjectId(membershipId),
        }));
    }

    async findByClerkUserId(clerkUserId) {
        const collection = await getOrgUsersCollection();
        return collection.findOne(scopeToOrg(this.orgId, { clerkUserId }));
    }

    async findByOrg({ role, page = 1, limit = 50, sort = { joinedAt: -1 } } = {}) {
        const collection = await getOrgUsersCollection();
        const filter = scopeToOrg(this.orgId);

        if (role) filter.role = role;

        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            collection.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
            collection.countDocuments(filter),
        ]);

        return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
    }

    async updateRole(membershipId, { role, customRoleId }) {
        const collection = await getOrgUsersCollection();
        const updates = { updatedAt: new Date() };
        if (role) updates.role = role;
        if (customRoleId !== undefined) updates.customRoleId = customRoleId;

        const result = await collection.findOneAndUpdate(
            scopeToOrg(this.orgId, { _id: new ObjectId(membershipId) }),
            { $set: updates },
            { returnDocument: 'after' }
        );

        return result;
    }

    async remove(membershipId) {
        const collection = await getOrgUsersCollection();
        // Prevent removing the owner
        const member = await this.findById(membershipId);
        if (member?.role === 'owner') {
            throw new Error('Cannot remove the organization owner');
        }

        const result = await collection.deleteOne(
            scopeToOrg(this.orgId, { _id: new ObjectId(membershipId) })
        );
        return result.deletedCount > 0;
    }

    async countMembers() {
        const collection = await getOrgUsersCollection();
        return collection.countDocuments(scopeToOrg(this.orgId));
    }
}
