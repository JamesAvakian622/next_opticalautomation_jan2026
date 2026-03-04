import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'opauto-jwt-secret-key-2026-secure';

export async function GET(request) {
    let client;

    try {
        const token = request.cookies.get('token')?.value;

        if (!token) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const user = await db.collection('users').findOne(
            { email: decoded.email },
            { projection: { password: 0 } }
        );

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            stats: {
                email: user.email,
                name: user.name,
                loginCount: user.loginCount || 0,
                lastLoginAt: user.lastLoginAt || null,
                createdAt: user.createdAt || null
            }
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return NextResponse.json(
                { success: false, error: 'Invalid or expired token' },
                { status: 401 }
            );
        }
        console.error('User stats error:', error);
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
