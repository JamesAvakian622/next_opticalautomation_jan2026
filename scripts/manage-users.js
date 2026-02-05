import 'dotenv/config';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'optical_automation';

async function manageUsers() {
    let client;

    try {
        console.log('Connecting to MongoDB...\n');
        client = await MongoClient.connect(uri);
        const db = client.db(dbName);
        const usersCollection = db.collection('users');

        // Get all users
        const users = await usersCollection.find({}, { projection: { password: 0 } }).toArray();

        console.log(`Found ${users.length} user(s):\n`);
        users.forEach((user, index) => {
            console.log(`${index + 1}. Email: ${user.email}`);
            console.log(`   Name: ${user.name || 'N/A'}`);
            console.log(`   Role: ${user.role || 'user'}`);
            console.log(`   ClientID: ${user.clientId || 'N/A'}`);
            console.log('');
        });

        // Update all users with known password
        console.log('\nUpdating all user passwords to: as34gh90\n');
        const hashedPassword = await bcrypt.hash('as34gh90', 10);

        const updateResult = await usersCollection.updateMany(
            {},
            {
                $set: {
                    password: hashedPassword,
                    updatedAt: new Date().toISOString()
                }
            }
        );

        console.log(`✅ Updated ${updateResult.modifiedCount} user password(s)\n`);

        console.log('─────────────────────────────────────');
        console.log('You can now log in with:');
        console.log('─────────────────────────────────────');
        users.forEach(user => {
            console.log(`Email: ${user.email}`);
            console.log(`Password: as34gh90`);
            console.log('─────────────────────────────────────');
        });

    } catch (error) {
        console.error('Error managing users:', error);
        process.exit(1);
    } finally {
        if (client) {
            await client.close();
            console.log('\nDatabase connection closed.');
        }
    }
}

manageUsers();
