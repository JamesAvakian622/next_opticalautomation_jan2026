import LearnSkills365AppPage from './LearnSkills365AppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-learnskills365',
        'LearnSkills365 Mobile App | App Portfolio',
        'Interactive iOS learning app with Math, Reading, Writing, Memory, Typing, Geography quizzes, and progress tracking for students of all ages.'
    )
};

export default function Page() {
    return <LearnSkills365AppPage />;
}
