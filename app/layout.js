import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ClientLayout from './ClientLayout';
import ClientLayoutNoClerk from './ClientLayoutNoClerk';
import ForceSignOutOnFirstLoad from './ForceSignOutOnFirstLoad';
import RouteJsonLd from './RouteJsonLd';
import ClerkLayoutErrorBoundary from '@/components/ClerkLayoutErrorBoundary';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { hasClerkPublishableKey, validateClerkEnvForProduction } from '@/lib/clerk-env';
import {
    generatePageMetadata,
    generateOrganizationJsonLd,
    generateWebsiteJsonLd,
    generateLocalBusinessJsonLd,
    generateSoftwareApplicationJsonLd
} from '@/lib/metadata';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export const metadata = generatePageMetadata('home');

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: '#6366f1'
};

export default function RootLayout({ children }) {
    validateClerkEnvForProduction();

    const organizationJsonLd = generateOrganizationJsonLd();
    const websiteJsonLd = generateWebsiteJsonLd();
    const professionalServiceJsonLd = generateLocalBusinessJsonLd();
    const softwareAppJsonLd = generateSoftwareApplicationJsonLd();
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    const hasClerk = hasClerkPublishableKey();

    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="icon" href="/opauto.ico" type="image/x-icon" />
                <link rel="icon" href="/opauto.png" type="image/png" />
                <link rel="apple-touch-icon" href="/opauto.png" />
            </head>
            <body>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceJsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }}
                />

                {hasClerk ? (
                    <ClerkProvider publishableKey={clerkPublishableKey}>
                        <RouteJsonLd />
                        <ClerkLayoutErrorBoundary fallbackChildren={children}>
                            <ClientLayout>{children}</ClientLayout>
                        </ClerkLayoutErrorBoundary>
                    </ClerkProvider>
                ) : (
                    <>
                        <RouteJsonLd />
                        <ClientLayoutNoClerk>{children}</ClientLayoutNoClerk>
                    </>
                )}
                <SpeedInsights />
            </body>
        </html>
    );
}