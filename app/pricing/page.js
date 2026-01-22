import { generatePageMetadata } from '@/lib/metadata';
import PricingPage from './PricingPage';

export const metadata = {
    ...generatePageMetadata('pricing', 'Website database production pricing and solutions. Let us create a profitable website solution for your company.'),
    alternates: {
        canonical: 'https://opticalautomation.com/pricing'
    }
};

export default function Page() {
    return <PricingPage />;
}
