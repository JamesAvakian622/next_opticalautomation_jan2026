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
        const { email, password, name } = body;

        if (!email || !password || !name) {
            return NextResponse.json(
                { success: false, error: 'Name, email, and password are required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const usersCollection = db.collection('users');

        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate clientId
        const clientId = `CLIENT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`.toUpperCase();

        // Create new user
        const newUser = {
            email: email.toLowerCase(),
            password: hashedPassword,
            name,
            clientId,
            role: 'user',
            subscriptionTier: 'free',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        const result = await usersCollection.insertOne(newUser);

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: result.insertedId.toString(),
                email: newUser.email,
                clientId: newUser.clientId
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        // Return success with user data (without password)
        const { password: _, ...userWithoutPassword } = newUser;
        userWithoutPassword._id = result.insertedId;

        const response = NextResponse.json(
            {
                success: true,
                user: userWithoutPassword,
                token
            },
            { status: 201 }
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
        console.error('Registration error:', error);
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
