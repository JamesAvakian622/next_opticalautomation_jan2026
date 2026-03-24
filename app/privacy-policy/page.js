import { generatePageMetadata } from '@/lib/metadata';
import PrivacyPage from '../privacy/PrivacyPage';

export const metadata = generatePageMetadata(
    'privacy',
    'Read the Privacy Policy for Optical Automation. Learn how we collect, use, and protect your personal information.',
    null,
    ['privacy policy', 'data privacy'],
    '/privacy-policy'
);

export default function Page() {
    return <PrivacyPage />;
}
