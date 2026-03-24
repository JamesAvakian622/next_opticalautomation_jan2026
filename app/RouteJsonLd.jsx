'use client';

import { usePathname } from 'next/navigation';
import { generateRouteWebPageJsonLd } from '@/lib/metadata';

export default function RouteJsonLd() {
    const pathname = usePathname() || '/';
    const jsonLd = generateRouteWebPageJsonLd(pathname);

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
