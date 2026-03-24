import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata(
    'guides',
    'IP Guides | Intellectual Property Resources | Optical Automation',
    'Comprehensive intellectual property guides including slide deck outlines, book chapters, maintenance plans, and copyright definitions for no-code and AI development.',
    ['intellectual property', 'copyright', 'trademark', 'IP protection', 'no-code', 'AI development', 'legal guides'],
    '/guides'
);

export default function GuidesLayout({ children }) {
    return children;
}
