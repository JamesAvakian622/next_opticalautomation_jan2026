import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata(
    'onboarding',
    'Organization onboarding for Optical Automation workspaces and account setup.',
    null,
    ['onboarding', 'workspace setup', 'organization setup'],
    '/onboarding'
);

export default function OnboardingLayout({ children }) {
    return children;
}
