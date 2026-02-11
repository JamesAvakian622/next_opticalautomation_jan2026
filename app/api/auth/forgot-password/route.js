import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
    let client;

    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        // Connect to MongoDB (same pattern as login route)
        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const usersCollection = db.collection('users');

        // Check if user exists
        const user = await usersCollection.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Don't reveal whether email exists for security
            return NextResponse.json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        // Store reset token in database
        await usersCollection.updateOne(
            { email: email.toLowerCase() },
            {
                $set: {
                    resetToken,
                    resetTokenExpiry,
                    updatedAt: new Date().toISOString()
                }
            }
        );

        // Send the password reset email
        await sendPasswordResetEmail(email, resetToken);
        console.log(`Password reset email sent to ${email}`);

        return NextResponse.json({
            success: true,
            message: 'If an account with that email exists, a password reset link has been sent.'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { success: false, error: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}
