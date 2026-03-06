import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '40px 20px',
        }}>
            <SignUp
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
