import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { MongoClient } from 'mongodb';

export const dynamic = 'force-dynamic';

const uri = process.env.MONGODB_URI;
const ADMIN_EMAIL = 'software@opticalautomation.com';

export async function GET(request) {
    let client;
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
        }

        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const collection = db.collection('user_activity');

        const { searchParams } = new URL(request.url);
        const allUsers = searchParams.get('all') === 'true';

        if (allUsers) {
            const requester = await collection.findOne({ clerkUserId: userId });
            if (requester?.email?.toLowerCase() !== ADMIN_EMAIL) {
                return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
            }
            const users = await collection.find({}, {
                projection: { logins: { $slice: -10 } }
            }).sort({ lastLoginAt: -1 }).toArray();
            return NextResponse.json({ success: true, users });
        }

        const userDoc = await collection.findOne(
            { clerkUserId: userId },
            { projection: { logins: { $slice: -20 } } }
        );

        if (!userDoc) {
            return NextResponse.json({ success: true, stats: null });
        }

        return NextResponse.json({
            success: true,
            stats: {
                email: userDoc.email,
                name: userDoc.name,
                loginCount: userDoc.loginCount || 0,
                logins: userDoc.logins || [],
                lastLoginAt: userDoc.lastLoginAt,
                lastActivityAt: userDoc.lastActivityAt,
                lastActivityPage: userDoc.lastActivityPage,
                createdAt: userDoc.createdAt,
            },
        });
    } catch (error) {
        console.error('User stats error:', error);
        return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
    } finally {
        if (client) await client.close();
    }
}
