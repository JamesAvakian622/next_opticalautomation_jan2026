import { generatePageMetadata } from '@/lib/metadata';
import FavoritesPage from './FavoritesPage';

export const metadata = {
    ...generatePageMetadata('favorites', 'View your saved favorite projects from the Optical Automation portfolio.'),
    alternates: {
        canonical: 'https://opticalautomation.com/favorites'
    }
};

export default function Page() {
    return <FavoritesPage />;
}
