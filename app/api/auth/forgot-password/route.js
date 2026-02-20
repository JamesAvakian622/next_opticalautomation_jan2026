import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { sendPasswordResetEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { success: false, error: 'Email is required' },
                { status: 400 }
            );
        }

        const usersCollection = await getUsersCollection();

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
        try {
            await sendPasswordResetEmail(email, resetToken);
            console.log(`Password reset email sent to ${email}`);
        } catch (emailError) {
            console.error('Failed to send reset email:', emailError);
            return NextResponse.json(
                { success: false, error: 'Failed to send email. Please check your configuration.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'If an account with that email exists, a password reset link has been sent.'
        });

    } catch (error) {
        console.error('Forgot password error:', error);

        // Handle MongoDB connection errors specifically
        if (error.message.includes('ECONNREFUSED')) {
            return NextResponse.json(
                { success: false, error: 'Database connection failed. Please try again later.' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { success: false, error: 'An error occurred. Please try again.' },
            { status: 500 }
        );
    }
}
