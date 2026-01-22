import { generatePageMetadata } from '@/lib/metadata';
import DeskViewPage from './DeskViewPage';

export const metadata = {
    ...generatePageMetadata('deskview', 'The DeskView Series', 'Dashboard information and website items for The DeskView Series.'),
    alternates: {
        canonical: 'https://opticalautomation.com/deskview'
    }
};

export default function Page() {
    return <DeskViewPage />;
}
