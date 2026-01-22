import { generatePageMetadata } from '@/lib/metadata';
import TrademarksPage from './TrademarksPage';

export const metadata = {
    ...generatePageMetadata('trademarks', 'Trademark and Brand Guidelines for Optical Automation. Learn how to properly use our brand assets, logos, and trademarks.'),
    alternates: {
        canonical: 'https://opticalautomation.com/trademarks'
    }
};

export default function Page() {
    return <TrademarksPage />;
}
