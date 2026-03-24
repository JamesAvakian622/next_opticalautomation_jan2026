import AmericaToday250AppPage from './AmericaToday250AppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-americatoday250',
        'AmericaToday250 Mobile App | App Portfolio',
        'American history from George Washington arranged in decades, featuring all presidents, current officials, and comprehensive government appendix.'
    )
};

export default function Page() {
    return <AmericaToday250AppPage />;
}
