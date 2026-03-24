import VideosPage from './VideosPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'videos',
        'Product Videos | Optical Automation',
        'Watch our product demonstrations, company mission statements, and developer showcases.'
    )
};

export default function Page() {
    return <VideosPage />;
}
