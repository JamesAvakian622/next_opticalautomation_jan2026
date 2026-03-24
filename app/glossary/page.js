import GlossaryPage from './GlossaryPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'glossary',
        'Technology Glossary | Optical Automation',
        'Comprehensive glossary of technology terms, frameworks, and concepts used in modern software development.'
    )
};

export default function Page() {
    return <GlossaryPage />;
}
