import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json(
                { success: false, error: 'Token and new password are required' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { success: false, error: 'Password must be at least 6 characters' },
                { status: 400 }
            );
        }

        const usersCollection = await getUsersCollection();

        // Find user with valid reset token
        const user = await usersCollection.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid or expired reset token. Please request a new password reset.' },
                { status: 400 }
            );
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update password and clear reset token
        await usersCollection.updateOne(
            { _id: user._id },
            {
                $set: {
                    password: hashedPassword,
                    updatedAt: new Date().toISOString()
                },
                $unset: {
                    resetToken: '',
                    resetTokenExpiry: ''
                }
            }
        );

        return NextResponse.json({
            success: true,
            message: 'Password has been reset successfully.'
        });

    } catch (error) {
        console.error('Reset password error:', error);

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
