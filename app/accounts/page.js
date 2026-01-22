import { generatePageMetadata } from '@/lib/metadata';
import AccountsPage from './AccountsPage';

export const metadata = {
    ...generatePageMetadata('accounts', 'Manage your Optical Automation accounts and customer information.'),
    alternates: {
        canonical: 'https://opticalautomation.com/accounts'
    }
};

export default function Page() {
    return <AccountsPage />;
}
