import { generatePageMetadata } from '@/lib/metadata';
import RegisterPage from './RegisterPage';

export const metadata = {
    ...generatePageMetadata('register', 'Create your Optical Automation account to access our software suite. Start with a Per Title 14-day free trial.'),
};

export default function Page() {
    return <RegisterPage />;
}
