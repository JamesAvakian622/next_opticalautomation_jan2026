import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
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

        client = await MongoClient.connect(uri);
        const db = client.db(process.env.MONGODB_DB || 'optical_automation');
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email: email.toLowerCase() });

        if (!user) {
            return NextResponse.json({
                success: true,
                message: 'If an account with that email exists, a password reset link has been sent.'
            });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000);

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

        try {
            const { Resend } = await import('resend');

            if (!process.env.RESEND_API_KEY) {
                throw new Error('RESEND_API_KEY is not configured');
            }

            const resend = new Resend(process.env.RESEND_API_KEY);
            const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opticalautomation.com';
            const resetLink = `${siteUrl}/reset-password?token=${resetToken}`;
            const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';

            const { data, error: sendError } = await resend.emails.send({
                from: `Optical Automation <${fromEmail}>`,
                to: [email],
                subject: 'Reset Your Password - Optical Automation',
                html: `
                    <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background-color: #0f0f23; color: #e2e8f0; padding: 40px; border-radius: 12px;">
                        <div style="text-align: center; margin-bottom: 30px;">
                            <h1 style="color: #6366f1; margin: 0; font-size: 28px;">Optical Automation</h1>
                            <p style="color: #94a3b8; font-style: italic; margin-top: 4px;">Information At The Speed Of Light</p>
                        </div>
                        <div style="background-color: #1e1e3a; padding: 30px; border-radius: 8px; border: 1px solid #2d2d5e;">
                            <h2 style="color: #e2e8f0; margin-top: 0;">Password Reset Request</h2>
                            <p style="color: #94a3b8; line-height: 1.6;">
                                We received a request to reset the password for your account associated with <strong style="color: #e2e8f0;">${email}</strong>.
                            </p>
                            <p style="color: #94a3b8; line-height: 1.6;">
                                Click the button below to reset your password. This link will expire in 1 hour.
                            </p>
                            <div style="text-align: center; margin: 30px 0;">
                                <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #6366f1, #9333ea); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                                    Reset Password
                                </a>
                            </div>
                            <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
                                If you didn't request this password reset, you can safely ignore this email.
                            </p>
                            <hr style="border: none; border-top: 1px solid #2d2d5e; margin: 20px 0;" />
                            <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">
                                If the button doesn't work, copy and paste this link:<br/>
                                <a href="${resetLink}" style="color: #6366f1; word-break: break-all;">${resetLink}</a>
                            </p>
                        </div>
                        <div style="text-align: center; margin-top: 30px;">
                            <p style="color: #475569; font-size: 12px; margin: 0;">
                                &copy; ${new Date().getFullYear()} Optical Automation, LLC. All rights reserved.
                            </p>
                        </div>
                    </div>
                `,
            });

            if (sendError) {
                console.error('Resend API error:', sendError);
                return NextResponse.json(
                    { success: false, error: `Email delivery failed: ${sendError.message}` },
                    { status: 500 }
                );
            }

            console.log(`Password reset email sent to ${email}, id: ${data?.id}`);
        } catch (emailError) {
            console.error('Failed to send reset email:', emailError.message);
            return NextResponse.json(
                { success: false, error: `Failed to send email: ${emailError.message}` },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'If an account with that email exists, a password reset link has been sent.'
        });

    } catch (error) {
        console.error('Forgot password error:', error.message, error.stack);

        if (error.message?.includes('ECONNREFUSED') || error.message?.includes('MongoServerError')) {
            return NextResponse.json(
                { success: false, error: 'Database connection failed. Please try again later.' },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { success: false, error: `An error occurred: ${error.message}` },
            { status: 500 }
        );
    } finally {
        if (client) {
            await client.close();
        }
    }
}
