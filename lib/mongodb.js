import { MongoClient } from 'mongodb';

const options = {};

let client;
let clientPromise;

function getClientPromise() {
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

export default getClientPromise();

export async function getDatabase() {
    const client = await getClientPromise();
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
