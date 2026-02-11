import { generatePageMetadata } from '@/lib/metadata';
import AppPortfolioPage from './AppPortfolioPage';

export const metadata = {
    ...generatePageMetadata('app-portfolio', 'Browse our mobile application portfolio featuring iOS and Android apps built with SwiftUI and Kotlin across productivity, education, entertainment, and business categories.'),
    alternates: {
        canonical: 'https://opticalautomation.com/app-portfolio'
    }
};

export default function AppPortfolio() {
    return <AppPortfolioPage />;
}
