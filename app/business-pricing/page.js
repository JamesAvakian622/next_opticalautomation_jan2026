import { generatePageMetadata } from '@/lib/metadata';
import BusinessPricingPage from './BusinessPricingPage';

export const metadata = {
    ...generatePageMetadata('business-pricing', 'Business licensing and multi-user pricing for Optical Automation software suite. Standard, Silver, and Gold tiers available.'),
};

export default function Page() {
    return <BusinessPricingPage />;
}
