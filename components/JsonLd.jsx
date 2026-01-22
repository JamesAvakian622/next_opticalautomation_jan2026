'use client';

import {
    generateOrganizationJsonLd,
    generateWebsiteJsonLd,
    generateLocalBusinessJsonLd,
    generateServiceJsonLd,
    generateFAQJsonLd,
    generateWebPageJsonLd,
    generateBreadcrumbJsonLd,
    generateSoftwareApplicationJsonLd
} from '@/lib/metadata';

export default function JsonLd({ type = 'organization', data }) {
    let jsonLdData;

    switch (type) {
        case 'organization':
            jsonLdData = generateOrganizationJsonLd();
            break;
        case 'website':
            jsonLdData = generateWebsiteJsonLd();
            break;
        case 'localBusiness':
            jsonLdData = generateLocalBusinessJsonLd();
            break;
        case 'service':
            jsonLdData = data ? generateServiceJsonLd(data) : null;
            break;
        case 'faq':
            jsonLdData = data ? generateFAQJsonLd(data) : null;
            break;
        case 'webPage':
            jsonLdData = data ? generateWebPageJsonLd(data) : null;
            break;
        case 'breadcrumb':
            jsonLdData = data ? generateBreadcrumbJsonLd(data) : null;
            break;
        case 'softwareApplication':
            jsonLdData = data || generateSoftwareApplicationJsonLd();
            break;
        default:
            jsonLdData = generateOrganizationJsonLd();
    }

    if (!jsonLdData) return null;

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
    );
}
