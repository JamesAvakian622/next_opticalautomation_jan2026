import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
    let client;
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
        }

        const body = await request.json();
        const now = new Date().toISOString();

        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');

        await db.collection('user_activity').updateOne(
            { clerkUserId: userId },
            {
                $set: {
                    lastActivityAt: now,
                    lastActivityPage: body.page || '/',
                },
            }
        );

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Heartbeat error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}
