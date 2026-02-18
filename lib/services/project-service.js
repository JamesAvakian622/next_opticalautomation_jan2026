/**
 * Project Service — CRUD operations scoped to orgId
 */

import { getProjectsCollection, scopeToOrg } from '../db/collections.js';
import { ObjectId } from 'mongodb';

export class ProjectService {
    constructor(orgId) {
        if (!orgId) throw new Error('ProjectService requires an orgId');
        this.orgId = orgId;
    }

    async create({ name, description, status = 'active', ownerId, tags = [], metadata = {} }) {
        const collection = await getProjectsCollection();
        const now = new Date();

        const doc = {
            orgId: this.orgId,
            name,
            description: description || '',
            status,
            ownerId: ownerId || null,
            tags,
            metadata,
            createdAt: now,
            updatedAt: now,
        };

        const result = await collection.insertOne(doc);
        return { ...doc, _id: result.insertedId };
    }

    async findById(projectId) {
        const collection = await getProjectsCollection();
        return collection.findOne(scopeToOrg(this.orgId, {
            _id: new ObjectId(projectId),
        }));
    }

    async findAll({ status, ownerId, page = 1, limit = 50, sort = { createdAt: -1 } } = {}) {
        const collection = await getProjectsCollection();
        const filter = scopeToOrg(this.orgId);

        if (status) filter.status = status;
        if (ownerId) filter.ownerId = ownerId;

        const skip = (page - 1) * limit;
        const [items, total] = await Promise.all([
            collection.find(filter).sort(sort).skip(skip).limit(limit).toArray(),
            collection.countDocuments(filter),
        ]);

        return { items, total, page, limit, totalPages: Math.ceil(total / limit) };
    }

    async update(projectId, updates) {
        const collection = await getProjectsCollection();
        const { _id, orgId, createdAt, ...safeUpdates } = updates;

        const result = await collection.findOneAndUpdate(
            scopeToOrg(this.orgId, { _id: new ObjectId(projectId) }),
            { $set: { ...safeUpdates, updatedAt: new Date() } },
            { returnDocument: 'after' }
        );

        return result;
    }

    async remove(projectId) {
        const collection = await getProjectsCollection();
        const result = await collection.deleteOne(
            scopeToOrg(this.orgId, { _id: new ObjectId(projectId) })
        );
        return result.deletedCount > 0;
    }

    async countByStatus() {
        const collection = await getProjectsCollection();
        return collection.aggregate([
            { $match: { orgId: this.orgId } },
            { $group: { _id: '$status', count: { $sum: 1 } } },
        ]).toArray();
    }
}
