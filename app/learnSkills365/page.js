import { generatePageMetadata } from '@/lib/metadata';
import LearnSkills365Page from './LearnSkills365Page';

export const metadata = {
    ...generatePageMetadata('learnSkills365', 'LearnSkills365', 'Comprehensive educational platform featuring Math, Memory, Reading, Typing, Connect Dots, and Quizzes to enhance your learning experience.'),
    alternates: {
        canonical: 'https://opticalautomation.com/learnSkills365'
    }
};

export default function Page() {
    return <LearnSkills365Page />;
}
