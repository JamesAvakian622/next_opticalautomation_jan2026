import { NextResponse } from 'next/server';
import { getUsersCollection } from '@/lib/mongodb';
import { verifyPassword, hashPassword } from '@/lib/auth';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        const { email, currentPassword, newPassword } = await request.json();

        // Validate inputs
        if (!email || !currentPassword || !newPassword) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        if (newPassword.length < 8) {
            return NextResponse.json(
                { error: 'New password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Get user from database
        const users = await getUsersCollection();
        const user = await users.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Verify current password
        const isValidPassword = await verifyPassword(currentPassword, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: 'Current password is incorrect' },
                { status: 401 }
            );
        }

        // Hash new password
        const hashedNewPassword = await hashPassword(newPassword);

        // Update password in database
        await users.updateOne(
            { email: email.toLowerCase() },
            {
                $set: {
                    password: hashedNewPassword,
                    updatedAt: new Date()
                }
            }
        );

        // Send confirmation email
        try {
            const transporter = nodemailer.createTransport({
                host: process.env.SMTP_HOST,
                port: parseInt(process.env.SMTP_PORT || '587'),
                secure: process.env.SMTP_SECURE === 'true',
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: user.email,
                subject: 'Password Changed Successfully - Optical Automation',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2 style="color: #333;">Password Changed Successfully</h2>
                        <p>Hello ${user.name},</p>
                        <p>Your password for Optical Automation has been changed successfully.</p>
                        <p><strong>Changed on:</strong> ${new Date().toLocaleString()}</p>
                        <p>If you did not make this change, please contact support immediately.</p>
                        <hr style="border: 1px solid #eee; margin: 20px 0;">
                        <p style="color: #666; font-size: 12px;">
                            This is an automated message from Optical Automation. Please do not reply to this email.
                        </p>
                    </div>
                `,
            });
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // Don't fail the request if email fails
        }

        return NextResponse.json({
            success: true,
            message: 'Password changed successfully'
        });

    } catch (error) {
        console.error('Error changing password:', error);
        return NextResponse.json(
            { error: 'Failed to change password' },
            { status: 500 }
        );
    }
}
