import { generatePageMetadata } from '@/lib/metadata';
import ContentPolicyPage from './ContentPolicyPage';

export const metadata = {
    ...generatePageMetadata('content-policy', 'Read the Content Policy for Optical Automation. Learn about our content guidelines and moderation standards.'),
    alternates: {
        canonical: 'https://opticalautomation.com/content-policy'
    }
};

export default function Page() {
    return <ContentPolicyPage />;
}
