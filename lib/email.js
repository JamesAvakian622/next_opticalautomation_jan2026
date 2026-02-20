import { Resend } from 'resend';

// Lazy-initialize Resend client (avoid crash during build when env var is missing)
let resend;
function getResend() {
    if (!resend) {
        if (!process.env.RESEND_API_KEY) {
            throw new Error('RESEND_API_KEY environment variable is not set');
        }
        resend = new Resend(process.env.RESEND_API_KEY);
    }
    return resend;
}

/**
 * Send a password reset email
 */
export async function sendPasswordResetEmail(to, resetToken) {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opticalautomation1.netlify.com';
    const resetLink = `${siteUrl}/reset-password?token=${resetToken}`;
    const fromEmail = process.env.RESEND_FROM || 'onboarding@resend.dev';

    if (!process.env.RESEND_FROM) {
        console.warn('⚠️ RESEND_FROM is not set. Using default onboarding@resend.dev which only allows sending to the account owner.');
    }

    const { data, error } = await getResend().emails.send({
        from: `Optical Automation <${fromEmail}>`,
        to: [to],
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
                        We received a request to reset the password for your account associated with <strong style="color: #e2e8f0;">${to}</strong>.
                    </p>
                    <p style="color: #94a3b8; line-height: 1.6;">
                        Click the button below to reset your password. This link will expire in 1 hour.
                    </p>
                    
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetLink}" 
                           style="display: inline-block; background: linear-gradient(135deg, #6366f1, #9333ea); color: white; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px;">
                            Reset Password
                        </a>
                    </div>
                    
                    <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
                        If you didn't request this password reset, you can safely ignore this email. Your password will remain unchanged.
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #2d2d5e; margin: 20px 0;" />
                    
                    <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">
                        If the button doesn't work, copy and paste this link into your browser:<br/>
                        <a href="${resetLink}" style="color: #6366f1; word-break: break-all;">${resetLink}</a>
                    </p>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #475569; font-size: 12px; margin: 0;">
                        &copy; ${new Date().getFullYear()} Optical Automation, LLC. All rights reserved.
                    </p>
                    <p style="color: #475569; font-size: 12px; margin-top: 4px;">
                        <a href="https://opticalautomation.com" style="color: #6366f1;">opticalautomation.com</a>
                    </p>
                </div>
            </div>
        `,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

/**
 * Send a generic email
 */
export async function sendEmail({ to, subject, html }) {
    const { data, error } = await getResend().emails.send({
        from: process.env.RESEND_FROM || 'Optical Automation <onboarding@resend.dev>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}
