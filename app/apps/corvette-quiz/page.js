import CorvetteQuizAppPage from './CorvetteQuizAppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-corvette-quiz',
        'CorvetteQuiz Mobile App | App Portfolio',
        'Interactive iOS quiz app testing knowledge of Corvette history, models, specifications, and racing heritage across all 8 generations.'
    )
};

export default function Page() {
    return <CorvetteQuizAppPage />;
}
