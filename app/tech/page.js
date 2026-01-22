import { generatePageMetadata } from '@/lib/metadata';
import TechPage from './TechPage';

export const metadata = {
    ...generatePageMetadata('tech', 'Explore our technology stack including React, Next.js, MERN, and AI-powered development tools for cutting-edge solutions.'),
    alternates: {
        canonical: 'https://opticalautomation.com/tech'
    }
};

export default function Tech() {
    return <TechPage />;
}
