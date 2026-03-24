import JamesAvakianAppPage from './JamesAvakianAppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-james-avakian',
        'James Avakian Mobile App | App Portfolio',
        'Native SwiftUI bio app with 5-tab navigation, 4 categories, 26 sections, 20+ videos, full-text search, and contact form.'
    )
};

export default function Page() {
    return <JamesAvakianAppPage />;
}
