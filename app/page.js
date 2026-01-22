import HomePage from './HomePage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata('home');

export default function Page() {
    return <HomePage />;
}
