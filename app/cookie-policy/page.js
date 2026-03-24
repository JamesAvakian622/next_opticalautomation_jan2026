import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata(
    'privacy',
    'Cookie Policy for Optical Automation and usage details for site cookies.',
    null,
    ['cookie policy', 'cookies', 'tracking'],
    '/cookie-policy'
);

export default function CookiePolicyPage() {
    return (
        <main style={{ maxWidth: 960, margin: '0 auto', padding: '120px 20px 60px' }}>
            <h1>Cookie Policy</h1>
            <p>
                Optical Automation uses cookies to keep core functionality working, remember user
                preferences, measure site performance, and improve user experience.
            </p>
            <p>
                By using this website, you consent to the use of necessary cookies. Optional analytics
                and personalization cookies may be controlled in your browser settings.
            </p>
        </main>
    );
}
