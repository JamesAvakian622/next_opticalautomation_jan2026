import { generatePageMetadata } from '@/lib/metadata';
import LearningPage from './LearningPage';

export const metadata = {
    ...generatePageMetadata('learning', 'Learning Activities', 'Make learning fun with interactive educational games, quizzes, memory exercises, reading practice, and typing skills development.'),
    alternates: {
        canonical: 'https://opticalautomation.com/learning'
    }
};

export default function Page() {
    return <LearningPage />;
}
