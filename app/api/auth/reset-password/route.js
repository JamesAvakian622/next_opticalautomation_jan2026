import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
    let client;

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

        // Connect to MongoDB
        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const usersCollection = db.collection('users');

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
