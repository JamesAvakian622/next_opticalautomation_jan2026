import ProductVideosPage from './ProductVideosPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('product-videos');

export default function Page() {
    return <ProductVideosPage />;
}
