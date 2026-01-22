import { generatePageMetadata } from '@/lib/metadata';
import LoginPage from './LoginPage';

export const metadata = {
    ...generatePageMetadata('login', 'Sign in or create an account with Optical Automation to access exclusive features and save your favorite projects.'),
    robots: {
        index: false,
        follow: true
    },
    alternates: {
        canonical: 'https://opticalautomation.com/login'
    }
};

export default function Page() {
    return <LoginPage />;
}
