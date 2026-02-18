/**
 * Role Service — manages custom per-org roles with permissions
 */

import { getRolesCollection, scopeToOrg } from '../db/collections.js';
import { ObjectId } from 'mongodb';
import { PERMISSIONS } from '../db/schemas.js';

export class RoleService {
    constructor(orgId) {
        if (!orgId) throw new Error('RoleService requires an orgId');
        this.orgId = orgId;
    }

    async create({ name, description, permissions = [] }) {
        const collection = await getRolesCollection();
        const now = new Date();

        // Validate permission keys
        const validPermissions = Object.values(PERMISSIONS);
        const invalid = permissions.filter((p) => !validPermissions.includes(p));
        if (invalid.length > 0) {
            throw new Error(`Invalid permissions: ${invalid.join(', ')}`);
        }

        // Check for duplicate role name within org
        const existing = await collection.findOne(scopeToOrg(this.orgId, { name }));
        if (existing) {
            throw new Error(`Role "${name}" already exists in this organization`);
        }

        const doc = {
            orgId: this.orgId,
            name,
            description: description || '',
            permissions,
            isDefault: false,
            createdAt: now,
            updatedAt: now,
        };

        const result = await collection.insertOne(doc);
        return { ...doc, _id: result.insertedId };
    }

    async findByOrg({ includeDefaults = true } = {}) {
        const collection = await getRolesCollection();
        const filter = scopeToOrg(this.orgId);

        if (!includeDefaults) {
            filter.isDefault = { $ne: true };
        }

        return collection.find(filter).sort({ isDefault: -1, name: 1 }).toArray();
    }

    async findById(roleId) {
        const collection = await getRolesCollection();
        return collection.findOne(scopeToOrg(this.orgId, {
            _id: new ObjectId(roleId),
        }));
    }

    async update(roleId, { name, description, permissions }) {
        const collection = await getRolesCollection();

        // Check that it's not a default system role
        const role = await this.findById(roleId);
        if (!role) return null;
        if (role.isDefault) {
            throw new Error('Cannot modify default system roles');
        }

        // Validate permission keys if provided
        if (permissions) {
            const validPermissions = Object.values(PERMISSIONS);
            const invalid = permissions.filter((p) => !validPermissions.includes(p));
            if (invalid.length > 0) {
                throw new Error(`Invalid permissions: ${invalid.join(', ')}`);
            }
        }

        const updates = { updatedAt: new Date() };
        if (name !== undefined) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (permissions !== undefined) updates.permissions = permissions;

        const result = await collection.findOneAndUpdate(
            scopeToOrg(this.orgId, { _id: new ObjectId(roleId) }),
            { $set: updates },
            { returnDocument: 'after' }
        );

        return result;
    }

    async remove(roleId) {
        const collection = await getRolesCollection();

        // Cannot delete default roles
        const role = await this.findById(roleId);
        if (!role) return false;
        if (role.isDefault) {
            throw new Error('Cannot delete default system roles');
        }

        const result = await collection.deleteOne(
            scopeToOrg(this.orgId, { _id: new ObjectId(roleId) })
        );
        return result.deletedCount > 0;
    }

    /**
     * Seed default roles for a new organization.
     * Called during onboarding.
     */
    async seedDefaults(defaultRoles) {
        const collection = await getRolesCollection();
        const now = new Date();

        const docs = defaultRoles.map((role) => ({
            orgId: this.orgId,
            ...role,
            isDefault: true,
            createdAt: now,
            updatedAt: now,
        }));

        const result = await collection.insertMany(docs);
        return result.insertedCount;
    }

    /**
     * List all available permission keys.
     */
    static getAvailablePermissions() {
        return PERMISSIONS;
    }
}
