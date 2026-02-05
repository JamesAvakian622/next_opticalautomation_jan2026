import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const uri = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET || 'opauto-jwt-secret-key-2026-secure';

export async function POST(request) {
    let client;

    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const usersCollection = db.collection('users');

        // Find user by email
        const user = await usersCollection.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id.toString(),
                email: user.email,
                clientId: user.clientId
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return success with user data (without password)
        const { password: _, ...userWithoutPassword } = user;

        const response = NextResponse.json(
            {
                success: true,
                user: userWithoutPassword,
                token
            },
            { status: 200 }
        );

        // Set cookie (NOT HttpOnly so client can also set it)
        response.cookies.set('token', token, {
            httpOnly: false, // Allow client-side JavaScript access
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
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
