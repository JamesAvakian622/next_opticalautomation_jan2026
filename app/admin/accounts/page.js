import AdminAccountsPage from './AdminAccountsPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'admin-accounts',
        'Admin Accounts | Optical Automation',
        'Manage platform users and subscriptions.'
    )
};

export default function Page() {
    return <AdminAccountsPage />;
}
