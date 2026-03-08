import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import ClientLayout from './ClientLayout';
import ClientLayoutNoClerk from './ClientLayoutNoClerk';
import ClerkLayoutErrorBoundary from '@/components/ClerkLayoutErrorBoundary';
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
    const organizationJsonLd = generateOrganizationJsonLd();
    const websiteJsonLd = generateWebsiteJsonLd();
    const professionalServiceJsonLd = generateLocalBusinessJsonLd();
    const softwareAppJsonLd = generateSoftwareApplicationJsonLd();
    const clerkPublishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="icon" href="/opauto.ico" type="image/x-icon" />
                <link rel="icon" href="/opauto.png" type="image/png" />
                <link rel="apple-touch-icon" href="/opauto.png" />
                <link rel="canonical" href="https://opticalautomation.com" />
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

                {clerkPublishableKey ? (
                    <ClerkProvider publishableKey={clerkPublishableKey}>
                        <ClerkLayoutErrorBoundary fallbackChildren={children}>
                            <ClientLayout>{children}</ClientLayout>
                        </ClerkLayoutErrorBoundary>
                    </ClerkProvider>
                ) : (
                    <ClientLayoutNoClerk>{children}</ClientLayoutNoClerk>
                )}
            </body>
        </html>
    );
}