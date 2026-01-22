import { generatePageMetadata } from '@/lib/metadata';
import ProductsPage from './ProductsPage';

export const metadata = {
    ...generatePageMetadata('products', 'Explore the ecosystem of Optical Automation products and web services. Discover our software solutions and platforms.'),
    alternates: {
        canonical: 'https://opticalautomation.com/products'
    }
};

export default function Page() {
    return <ProductsPage />;
}
