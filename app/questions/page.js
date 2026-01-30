import { generatePageMetadata } from '@/lib/metadata';
import QuestionsPage from './QuestionsPage';

export const metadata = generatePageMetadata('home', 'Questions & Answers | Optical Automation', 'Common questions and answers about our web development services, process, and values.');

export default function Page() {
    return <QuestionsPage />;
}
