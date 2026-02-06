import { generatePageMetadata } from '@/lib/metadata';
import SubscriptionPage from './SubscriptionPage';

export const metadata = {
    ...generatePageMetadata('subscription', 'Subscribe to access our comprehensive suite of software applications. Choose from Individual, Silver ($25/year), or Gold ($99/year) tiers with Per Title 14-day free trial.'),
};

export default function Page() {
    return <SubscriptionPage />;
}
