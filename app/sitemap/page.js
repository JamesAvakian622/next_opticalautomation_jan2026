import { generatePageMetadata } from '@/lib/metadata';
import SitemapPage from './SitemapPage';

export const metadata = {
    ...generatePageMetadata('sitemap', 'Navigate all pages and sections of the Optical Automation website.'),
    alternates: {
        canonical: 'https://opticalautomation.com/sitemap'
    }
};

export default function Page() {
    return <SitemapPage />;
}
