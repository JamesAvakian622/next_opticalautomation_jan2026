import MyDeskViewAppPage from './MyDeskViewAppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-mydeskview',
        'MyDeskView Mobile App | App Portfolio',
        '27+ integrated applications across Business, Education, Entertainment, Productivity, and Health categories with native iOS interface.'
    )
};

export default function Page() {
    return <MyDeskViewAppPage />;
}
