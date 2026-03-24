import ForgotPasswordPage from './ForgotPasswordPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'login',
        'Forgot password | Optical Automation',
        'Request a link to reset your Optical Automation account password.',
        ['forgot password', 'password reset'],
        '/forgot-password'
    )
};

export default function Page() {
    return <ForgotPasswordPage />;
}
