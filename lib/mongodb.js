import { MongoClient } from 'mongodb';

const options = {};

let client;
let clientPromise;

// This function is only called at runtime, never during build
async function connectToDatabase() {
    if (!process.env.MONGODB_URI) {
        throw new Error('Please add your MongoDB URI to .env');
    }

    if (clientPromise) {
        return clientPromise;
    }

    const uri = process.env.MONGODB_URI;

    if (process.env.NODE_ENV === 'development') {
        // In development mode, use a global variable to preserve the connection
        if (!global._mongoClientPromise) {
            client = new MongoClient(uri, options);
            global._mongoClientPromise = client.connect();
        }
        clientPromise = global._mongoClientPromise;
    } else {
        // In production mode, create a new client
        client = new MongoClient(uri, options);
        clientPromise = client.connect();
    }

    return clientPromise;
}

export default connectToDatabase;

export async function getDatabase() {
    const client = await connectToDatabase();
    return client.db(process.env.MONGODB_DB || 'optical_automation');
}

export async function getUsersCollection() {
    const db = await getDatabase();
    return db.collection('users');
}

export async function getSelectionsCollection() {
    const db = await getDatabase();
    return db.collection('selections');
}

// ─── Multi-tenant helpers ──────────────────────────────────────────────────────

/**
 * Alias for getDatabase() — makes multi-tenant intent explicit.
 * All tenant collections live in the same DB, scoped by orgId fields.
 */
export async function getTenantDatabase() {
    return getDatabase();
}

// Re-export tenant collection accessors for convenience
export {
    getOrganizationsCollection,
    getOrgUsersCollection,
    getProjectsCollection,
    getBillingCollection,
    getRolesCollection,
    scopeToOrg,
    ensureIndexes,
} from './db/collections.js';
