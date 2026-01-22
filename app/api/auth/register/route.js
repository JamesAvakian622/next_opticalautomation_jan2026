import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { hashPassword, generateClientId, isValidEmail, validatePassword } from '@/lib/auth';

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return NextResponse.json(
                { error: passwordValidation.message },
                { status: 400 }
            );
        }

        const users = await getUsersCollection();

        // Check if user already exists
        const existingUser = await users.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password and create user
        const hashedPassword = await hashPassword(password);
        const clientId = generateClientId();

        const newUser = {
            clientId,
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            subscriptionTier: 'individual',
            subscriptionStatus: 'trial',
            subscriptionStartDate: new Date(),
            subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const result = await users.insertOne(newUser);

        // Generate token for auto-login
        const { generateToken } = require('@/lib/auth');
        const token = generateToken(
            result.insertedId.toString(),
            newUser.email,
            newUser.subscriptionTier
        );

        // Return user data without password
        const { password: _, ...userWithoutPassword } = newUser;

        const response = NextResponse.json({
            success: true,
            token,
            user: {
                ...userWithoutPassword,
                _id: result.insertedId
            }
        }, { status: 201 });

        // Set HTTP-only cookie for middleware
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 7 days
        });

        return response;

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
