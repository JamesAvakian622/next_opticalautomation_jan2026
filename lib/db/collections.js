/**
 * Centralized Collection Accessors
 * Every accessor returns a MongoDB collection, scoped to orgId where applicable.
 */

import { getDatabase } from '../mongodb.js';
import { COLLECTIONS, SCHEMA_MAP } from './schemas.js';

// ─── Raw collection accessors ──────────────────────────────────────────────────

export async function getOrganizationsCollection() {
    const db = await getDatabase();
    return db.collection(COLLECTIONS.ORGANIZATIONS);
}

export async function getOrgUsersCollection() {
    const db = await getDatabase();
    return db.collection(COLLECTIONS.ORG_USERS);
}

export async function getProjectsCollection() {
    const db = await getDatabase();
    return db.collection(COLLECTIONS.PROJECTS);
}

export async function getBillingCollection() {
    const db = await getDatabase();
    return db.collection(COLLECTIONS.BILLING);
}

export async function getRolesCollection() {
    const db = await getDatabase();
    return db.collection(COLLECTIONS.ROLES);
}

// ─── Scoped query helpers ──────────────────────────────────────────────────────
// Utility to build org-scoped filters

export function scopeToOrg(orgId, filter = {}) {
    if (!orgId) throw new Error('orgId is required for tenant-scoped queries');
    return { orgId, ...filter };
}

// ─── Index management ──────────────────────────────────────────────────────────

/**
 * Ensures all compound indexes defined in schemas.js exist.
 * Safe to call multiple times — MongoDB will skip existing indexes.
 */
export async function ensureIndexes() {
    const db = await getDatabase();
    const results = {};

    for (const [collectionName, schema] of Object.entries(SCHEMA_MAP)) {
        const collection = db.collection(collectionName);
        const indexResults = [];

        for (const idx of schema.indexes) {
            try {
                const result = await collection.createIndex(idx.key, idx.options || {});
                indexResults.push({ index: idx.options?.name || JSON.stringify(idx.key), result });
            } catch (err) {
                indexResults.push({
                    index: idx.options?.name || JSON.stringify(idx.key),
                    error: err.message,
                });
            }
        }

        results[collectionName] = indexResults;
    }

    return results;
}

// ─── Collection validation (optional, for initial setup) ───────────────────────

/**
 * Apply JSON schema validators to collections.
 * Only needed once during initial database setup.
 */
export async function applyValidators() {
    const db = await getDatabase();
    const results = {};

    for (const [collectionName, schema] of Object.entries(SCHEMA_MAP)) {
        try {
            // Try to create the collection with validation
            await db.createCollection(collectionName, schema.validator ? { validator: schema.validator } : {});
            results[collectionName] = 'created';
        } catch (err) {
            if (err.codeName === 'NamespaceExists') {
                // Collection exists — update the validator
                try {
                    await db.command({
                        collMod: collectionName,
                        ...(schema.validator ? { validator: schema.validator } : {}),
                        validationLevel: 'moderate', // Allow existing docs that don't match
                    });
                    results[collectionName] = 'validator updated';
                } catch (modErr) {
                    results[collectionName] = `validator update failed: ${modErr.message}`;
                }
            } else {
                results[collectionName] = `error: ${err.message}`;
            }
        }
    }

    return results;
}
