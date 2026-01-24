import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { hashPassword } from '@/lib/auth';

export async function POST(request) {
    try {
        const users = await getUsersCollection();

        // Check if admin already exists
        const existingAdmin = await users.findOne({ email: 'admin@opticalautomation.com' });

        if (existingAdmin) {
            return NextResponse.json({
                success: false,
                message: 'Admin user already exists'
            });
        }

        // Create admin user
        const hashedPassword = await hashPassword('as34gh90');

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

        return NextResponse.json({
            success: true,
            message: 'Admin user created successfully!',
            credentials: {
                email: 'admin@opticalautomation.com',
                password: 'as34gh90'
            }
        });
    } catch (error) {
        console.error('Error seeding admin user:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}
