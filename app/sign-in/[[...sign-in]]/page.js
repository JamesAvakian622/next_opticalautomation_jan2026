import { SignIn } from '@clerk/nextjs';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata(
    'login',
    'Sign in to Optical Automation to access your account and applications.',
    null,
    ['sign in', 'authentication'],
    '/sign-in'
);

export default function SignInPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '40px 20px',
        }}>
            <SignIn
                appearance={{
                    elements: {
                        rootBox: { width: '100%', maxWidth: '440px' },
                        card: {
                            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.15)',
                            borderRadius: '20px',
                        },
                    },
                }}
            />
        </div>
    );
}
