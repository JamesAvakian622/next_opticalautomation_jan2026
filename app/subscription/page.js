import { generatePageMetadata } from '@/lib/metadata';
import SubscriptionPage from './SubscriptionPage';

export const metadata = {
    ...generatePageMetadata('subscription', 'Subscribe to access our comprehensive suite of software applications. Choose from Individual, Silver ($25/year), or Gold ($35/year) tiers with 30-day free trial.'),
};

export default function Page() {
    return <SubscriptionPage />;
}
