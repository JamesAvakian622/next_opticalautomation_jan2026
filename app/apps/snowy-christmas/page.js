import SnowyChristmasAppPage from './SnowyChristmasAppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-snowy-christmas',
        'A Snowy Christmas Mobile App | App Portfolio',
        'A magical mystical collection of stories, poems, bedtime tales with full audio narration, voice selection, and SwiftUI native interface.'
    )
};

export default function Page() {
    return <SnowyChristmasAppPage />;
}
