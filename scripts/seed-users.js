import 'dotenv/config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'optical_automation';

async function seedUsers() {
    let client;

    try {
        console.log('Connecting to MongoDB...');
        client = await MongoClient.connect(uri);
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Check if users already exist
        const existingCount = await usersCollection.countDocuments();
        if (existingCount > 0) {
            console.log(`Database already has ${existingCount} user(s). Skipping seed.`);
            return;
        }

        console.log('Creating test users...');

        // Hash passwords
        const hashedAdminPassword = await bcrypt.hash('as34gh90', 10);
        const hashedUserPassword = await bcrypt.hash('user123', 10);

        // Create test users
        const testUsers = [
            {
                email: 'admin@opticalautomation.com',
                password: hashedAdminPassword,
                name: 'Admin User',
                clientId: `CLIENT-${Date.now()}-ADMIN`,
                role: 'admin',
                subscriptionTier: 'premium',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                email: 'user@opticalautomation.com',
                password: hashedUserPassword,
                name: 'Demo User',
                clientId: `CLIENT-${Date.now()}-USER`,
                role: 'user',
                subscriptionTier: 'free',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                email: 'javakian2025@gmail.com',
                password: hashedAdminPassword,
                name: 'James Avakian',
                clientId: `CLIENT-${Date.now()}-JAMES`,
                role: 'admin',
                subscriptionTier: 'premium',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        const result = await usersCollection.insertMany(testUsers);
        console.log(`✅ Successfully created ${result.insertedCount} test users!`);

        console.log('\nTest Credentials:');
        console.log('─────────────────────────────────────');
        console.log('Email: admin@opticalautomation.com');
        console.log('Password: as34gh90');
        console.log('─────────────────────────────────────');
        console.log('Email: user@opticalautomation.com');
        console.log('Password: user123');
        console.log('─────────────────────────────────────');
        console.log('Email: javakian2025@gmail.com');
        console.log('Password: as34gh90');
        console.log('─────────────────────────────────────');

    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log('\nDatabase connection closed.');
        }
    }
}

seedUsers();
