import { generatePageMetadata } from '@/lib/metadata';
import DeskViewPage from './DeskViewPage';

export const metadata = {
    ...generatePageMetadata('deskview', 'The MyDeskView Series', 'Dashboard information and website items for The MyDeskView Series.'),
    alternates: {
        canonical: 'https://opticalautomation.com/deskview'
    }
};

export default function Page() {
    return <DeskViewPage />;
}
