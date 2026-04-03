import { generatePageMetadata } from '@/lib/metadata';
import JamesAvakianMobileAppPage from './JamesAvakianMobileAppPage';

export const metadata = generatePageMetadata(
    'james-avakian-mobile',
    'James Avakian mobile app - Personal bio and portfolio with 26 sections, 20+ videos, and full-text search.',
    null,
    ['james avakian', 'mobile app', 'ios', 'swiftui', 'biography'],
    '/apps/james-avakian-mobile'
);

export default function Page() {
    return <JamesAvakianMobileAppPage />;
}
