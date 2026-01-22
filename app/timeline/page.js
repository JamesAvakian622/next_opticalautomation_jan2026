import { generatePageMetadata } from '@/lib/metadata';
import TimelinePage from './TimelinePage';

export const metadata = {
    ...generatePageMetadata('timeline', 'Explore the evolution of internet software from React.js to Google Antigravity and beyond. A comprehensive timeline of major milestones from 2013 to 2026.'),
    keywords: ['timeline', 'internet software', 'React.js', 'Google Antigravity', 'web development history', 'software evolution'],
    alternates: {
        canonical: 'https://opticalautomation.com/timeline'
    }
};

export default function Page() {
    return <TimelinePage />;
}
