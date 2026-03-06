import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST() {
    let client;
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
        }

        const clerkUser = await currentUser();
        const now = new Date().toISOString();

        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const collection = db.collection('user_activity');

        await collection.updateOne(
            { clerkUserId: userId },
            {
                $set: {
                    email: clerkUser?.emailAddresses?.[0]?.emailAddress || '',
                    name: `${clerkUser?.firstName || ''} ${clerkUser?.lastName || ''}`.trim(),
                    lastLoginAt: now,
                },
                $inc: { loginCount: 1 },
                $push: { logins: { timestamp: now } },
                $setOnInsert: { createdAt: now },
            },
            { upsert: true }
        );

        const userDoc = await collection.findOne({ clerkUserId: userId });

        return NextResponse.json({
            success: true,
            stats: {
                loginCount: userDoc.loginCount,
                lastLoginAt: userDoc.lastLoginAt,
            },
        });
    } catch (error) {
        console.error('Login tracking error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}
