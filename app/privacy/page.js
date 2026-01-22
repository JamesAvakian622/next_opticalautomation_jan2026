import { generatePageMetadata } from '@/lib/metadata';
import PrivacyPage from './PrivacyPage';

export const metadata = {
    ...generatePageMetadata('privacy', 'Read the Privacy Policy for Optical Automation. Learn how we collect, use, and protect your personal information.'),
    alternates: {
        canonical: 'https://opticalautomation.com/privacy'
    }
};

export default function Page() {
    return <PrivacyPage />;
}
