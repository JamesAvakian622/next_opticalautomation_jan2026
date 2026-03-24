import ResetPasswordPage from './ResetPasswordPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'login',
        'Set new password | Optical Automation',
        'Set a new password for your Optical Automation account.',
        ['password reset', 'new password'],
        '/reset-password'
    )
};

export default function Page() {
    return <ResetPasswordPage />;
}
