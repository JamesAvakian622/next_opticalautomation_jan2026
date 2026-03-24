import { generatePageMetadata } from '@/lib/metadata';
import TermsPage from './TermsPage';

export const metadata = {
    ...generatePageMetadata('terms', 'Read the Terms of Use for Optical Automation website and services.', null, [], '/terms-of-use'),
    alternates: {
        canonical: 'https://opticalautomation.com/terms-of-use'
    }
};

export default function Page() {
    return <TermsPage />;
}
