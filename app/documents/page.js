import { generatePageMetadata } from '@/lib/metadata';
import DocumentsPage from './DocumentsPage';

export const metadata = {
    ...generatePageMetadata('documents', 'Access guides, templates, technical documentation, and resources from Optical Automation.'),
    alternates: {
        canonical: 'https://opticalautomation.com/documents'
    }
};

export default function Page() {
    return <DocumentsPage />;
}
