import TechnologyAndTimesAppPage from './TechnologyAndTimesAppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-technology-and-times',
        'Technology And Times Mobile App | App Portfolio',
        'Technology news covering Technology, Computers, Homes, Automobiles, Corporations, and Government with native SwiftUI views.'
    )
};

export default function Page() {
    return <TechnologyAndTimesAppPage />;
}
