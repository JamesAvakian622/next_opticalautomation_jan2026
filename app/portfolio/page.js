import { generatePageMetadata } from '@/lib/metadata';
import PortfolioPage from './PortfolioPage';

export const metadata = {
    ...generatePageMetadata('portfolio', 'Explore our portfolio of web development projects including eCommerce, dashboards, and enterprise applications.'),
    alternates: {
        canonical: 'https://opticalautomation.com/portfolio'
    }
};

export default function Portfolio() {
    return <PortfolioPage />;
}
