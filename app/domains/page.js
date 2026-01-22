import { generatePageMetadata } from '@/lib/metadata';
import DomainsPage from './DomainsPage';

export const metadata = {
    ...generatePageMetadata('domains', 'Comprehensive domain portfolio appraisal showcasing our collection of premium web domains across technology, automotive, business, and lifestyle categories.'),
    alternates: {
        canonical: 'https://opticalautomation.com/domains'
    }
};

export default function Domains() {
    return <DomainsPage />;
}
