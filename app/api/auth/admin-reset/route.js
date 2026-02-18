import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const ADMIN_KEY = 'opauto-admin-reset-2026';

export async function POST(request) {
    let client;

    try {
        const body = await request.json();
        const { email, newPassword, adminKey } = body;

        if (adminKey !== ADMIN_KEY) {
            return NextResponse.json(
                { success: false, error: 'Unauthorized' },
                { status: 403 }
            );
        }

        if (!email || !newPassword) {
            return NextResponse.json(
                { success: false, error: 'Email and new password are required' },
                { status: 400 }
            );
        }

        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await usersCollection.updateOne(
            { email: email.toLowerCase() },
            { $set: { password: hashedPassword, updatedAt: new Date().toISOString() } }
        );

        return NextResponse.json(
            { success: true, message: `Password reset successfully for ${email}` },
            { status: 200 }
        );
    } catch (error) {
        console.error('Admin reset password error:', error);
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}
