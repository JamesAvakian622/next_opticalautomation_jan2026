import { generatePageMetadata } from '@/lib/metadata';
import SupportPage from './SupportPage';

export const metadata = {
    ...generatePageMetadata('support', 'Get technical support from Optical Automation. Contact us via phone, email, or live chat. View FAQs and submit support requests.'),
    alternates: {
        canonical: 'https://opticalautomation.com/support'
    }
};

export default function Page() {
    return <SupportPage />;
}
