import OpticalAutomationAppPage from './OpticalAutomationAppPage';
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = {
    ...generatePageMetadata(
        'apps-optical-automation',
        'Optical Automation Mobile App | App Portfolio',
        'Full-featured native SwiftUI app with 5-tab navigation, dark mode, subscription plans, native portfolio browser, and more.'
    )
};

export default function Page() {
    return <OpticalAutomationAppPage />;
}
