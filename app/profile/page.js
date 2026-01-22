import { generatePageMetadata } from '@/lib/metadata';
import ProfilePage from './ProfilePage';

export const metadata = {
    ...generatePageMetadata('profile', 'Manage your Optical Automation account settings, view activity, and update preferences.'),
    robots: {
        index: false,
        follow: true
    },
    alternates: {
        canonical: 'https://opticalautomation.com/profile'
    }
};

export default function Page() {
    return <ProfilePage />;
}
