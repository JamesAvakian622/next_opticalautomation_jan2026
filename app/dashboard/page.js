import { generatePageMetadata } from '@/lib/metadata';
import DashboardPage from './DashboardPage';

export const metadata = {
    ...generatePageMetadata('dashboard', 'Your software dashboard - manage your subscriptions and selected applications.'),
};

export default function Page() {
    return <DashboardPage />;
}
