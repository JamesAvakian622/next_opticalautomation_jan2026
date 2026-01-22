import { generatePageMetadata } from '@/lib/metadata';
import AboutPage from './AboutPage';

export const metadata = {
    ...generatePageMetadata('about', 'Learn about Optical Automation\'s mission to deliver innovative solutions that empower businesses through cutting-edge technology and AI-first development.'),
    alternates: {
        canonical: 'https://opticalautomation.com/about'
    }
};

export default function Page() {
    return <AboutPage />;
}
