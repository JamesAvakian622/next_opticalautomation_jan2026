// Set environment variables
process.env.MONGODB_URI = 'mongodb+srv://javakian2025_db_user:as34gh90@cluster0.0mo64qz.mongodb.net/optical?retryWrites=true&w=majority';
process.env.MONGODB_DB = 'optical_automation';
process.env.JWT_SECRET = 'opauto-jwt-secret-key-2026-secure';

import { getUsersCollection } from '../lib/mongodb.js';
import { hashPassword } from '../lib/auth.js';

async function seedAdminUser() {
    try {
        const users = await getUsersCollection();

        // Check if admin already exists
        const existingAdmin = await users.findOne({ email: 'admin@opticalautomation.com' });

        if (existingAdmin) {
            console.log('Admin user already exists');
            return;
        }

        // Create admin user
        const hashedPassword = await hashPassword('admin123');

        const adminUser = {
            clientId: 'ADMIN_001',
            name: 'Admin User',
            email: 'admin@opticalautomation.com',
            password: hashedPassword,
            subscriptionTier: 'gold',
            subscriptionStatus: 'active',
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await users.insertOne(adminUser);
        console.log('✅ Admin user created successfully!');
        console.log('Email: admin@opticalautomation.com');
        console.log('Password: admin123');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin user:', error);
        process.exit(1);
    }
}

seedAdminUser();
