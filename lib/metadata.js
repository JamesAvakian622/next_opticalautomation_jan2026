const siteConfig = {
    name: 'Optical Automation',
    legalName: 'Optical Automation, LLC',
    description: 'Transforming businesses with AI-first software development, specialized MERN stack solutions, and premium SEO optimization. We build high-performance web and mobile applications including the DeskView Suite for personal and business organization.',
    shortDescription: 'AI-First Software Development & DeskView Solutions',
    url: 'https://opticalautomation.com',
    logo: '/opauto.png',
    ogImage: '/og-image.png', // Add a dedicated OG image if available, else use logo
    footerLogo: '/opauto0.png',
    founder: 'James L. Avakian',
    foundingDate: '2024',
    twitterHandle: '@javakian2025',
    keywords: [
        'web development',
        'React',
        'Next.js',
        'MERN stack',
        'AI development',
        'Antigravity AI',
        'Agentic Coding',
        'Software Engineering',
        'Custom Business Solutions',
        'SEO Optimization',
        'Digital Transformation',
        'Mobile App Development',
        'MyDeskView',
        'Personal Organizer',
        'Business Organizer',
        'Teleprompter Software',
        'Media Management',
        'DeskView Apps'
    ],
    social: {
        facebook: 'https://www.facebook.com/profile.php?id=61585668745327',
        twitter: 'https://x.com/javakian2025',
        linkedin: 'https://www.linkedin.com/company/optical-automation',
        github: 'https://github.com/opticalautomation'
    },
    contact: {
        email: 'OpticalAutomation2025@gmail.com',
        telephone: '+1-747-354-2925',
        supportEmail: 'support@opticalautomation.com'
    },
    address: {
        streetAddress: 'Sylmar',
        addressLocality: 'Los Angeles',
        addressRegion: 'CA',
        postalCode: '91342',
        addressCountry: 'US'
    }
};

export function generatePageMetadata(pageKey, customTitle, customDescription, customKeywords = []) {
    const titles = {
        home: 'Optical Automation',
        tech: 'Technology Stack & Modern Frameworks',
        portfolio: 'Our Portfolio - Recent Projects',
        domains: 'Premium Domain Portfolio',
        about: 'About Optical Automation - Our Vision',
        contact: 'Get In Touch - Contact Us',
        pricing: 'Transparent Pricing & Services',
        support: 'Technical Support & Client Care',
        privacy: 'Privacy Policy & Data Protection',
        terms: 'Terms of Use & Service Agreements',
        products: 'DeskView Apps & Digital Products',
        documents: 'Documentation & Case Studies',
        sitemap: 'Site Map - Explore our Content',
        timeline: 'Our Journey & Timeline',
        trademarks: 'Trademarks & Intellectual Property',
        'content-policy': 'Content Policy & Guidelines',
        favorites: 'User Favorites',
        login: 'Secure Client Login',
        profile: 'Your Profile'
    };

    const fullTitle = siteConfig.name;
    const pageDescription = customDescription || siteConfig.description;

    const combinedKeywords = [...new Set([...siteConfig.keywords, ...customKeywords])];

    return {
        title: fullTitle,
        description: pageDescription,
        applicationName: 'Optical Automation',
        appleWebApp: {
            title: 'Optical Automation',
            statusBarStyle: 'default',
        },
        keywords: combinedKeywords,
        authors: [{ name: siteConfig.name }],
        creator: siteConfig.name,
        publisher: siteConfig.name,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: './',
        },
        openGraph: {
            title: fullTitle,
            description: pageDescription,
            url: './',
            siteName: siteConfig.name,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: siteConfig.ogImage || siteConfig.logo,
                    width: 1200,
                    height: 630,
                    alt: siteConfig.name
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: pageDescription,
            creator: siteConfig.twitterHandle,
            images: [siteConfig.ogImage || siteConfig.logo]
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
        },
        verification: {
            google: 'google-site-verification-code', // User should update this
        }
    };
}

export function generateOrganizationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url: siteConfig.url,
        logo: {
            '@type': 'ImageObject',
            url: `${siteConfig.url}${siteConfig.logo}`,
            width: 512,
            height: 512
        },
        image: `${siteConfig.url}${siteConfig.logo}`,
        founder: {
            '@type': 'Person',
            name: siteConfig.founder
        },
        foundingDate: siteConfig.foundingDate,
        description: siteConfig.description,
        sameAs: [
            siteConfig.social.facebook,
            siteConfig.social.twitter,
            siteConfig.social.linkedin,
            siteConfig.social.github
        ].filter(Boolean),
        contactPoint: [
            {
                '@type': 'ContactPoint',
                email: siteConfig.contact.email,
                telephone: siteConfig.contact.telephone,
                contactType: 'customer service',
                availableLanguage: 'English'
            },
            {
                '@type': 'ContactPoint',
                email: siteConfig.contact.supportEmail,
                contactType: 'technical support',
                availableLanguage: 'English'
            }
        ]
    };
}

export function generateLocalBusinessJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${siteConfig.url}/#service`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}${siteConfig.logo}`,
        image: `${siteConfig.url}${siteConfig.logo}`,
        telephone: siteConfig.contact.telephone,
        email: siteConfig.contact.email,
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.streetAddress,
            addressLocality: siteConfig.address.addressLocality,
            addressRegion: siteConfig.address.addressRegion,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.addressCountry
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '34.3058', // Approximate for Sylmar
            longitude: '-118.4417'
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
        },
        sameAs: [
            siteConfig.social.facebook,
            siteConfig.social.twitter,
            siteConfig.social.linkedin,
            siteConfig.social.github
        ].filter(Boolean)
    };
}

export function generateWebsiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${siteConfig.url}/#website`,
        name: siteConfig.name,
        url: siteConfig.url,
        description: siteConfig.description,
        publisher: {
            '@id': `${siteConfig.url}/#organization`
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${siteConfig.url}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        },
        inLanguage: 'en-US'
    };
}

export function generateSoftwareApplicationJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'DeskView Suite',
        operatingSystem: 'Windows, MacOS, iOS, Android',
        applicationCategory: 'BusinessApplication',
        genre: 'Productivity',
        description: 'A comprehensive suite of desktop and mobile applications including MyDeskView, Personal Organizer, and Business Organizer designed to streamline your digital life.',
        maintainer: {
            '@type': 'Organization',
            name: siteConfig.name
        },
        offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD'
        },
        featureList: 'MyDeskView, Personal Organizer, Business Organizer, Teleprompter, Media Management'
    };
}

export function generateWebPageJsonLd(page) {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${siteConfig.url}${page.path}#webpage`,
        name: page.title,
        description: page.description,
        url: `${siteConfig.url}${page.path}`,
        isPartOf: {
            '@id': `${siteConfig.url}/#website`
        },
        about: {
            '@id': `${siteConfig.url}/#organization`
        },
        breadcrumb: {
            '@id': `${siteConfig.url}${page.path}#breadcrumb`
        },
        inLanguage: 'en-US'
    };
}

export function generateServiceJsonLd(services) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Software Development & SEO',
        provider: {
            '@id': `${siteConfig.url}/#organization`
        },
        description: siteConfig.description,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Development Services',
            itemListElement: services.map((service, index) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: service.name,
                    description: service.description
                }
            }))
        }
    };
}

export function generateFAQJsonLd(faqs) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer
            }
        }))
    };
}

export function generateBreadcrumbJsonLd(items) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        '@id': `${siteConfig.url}#breadcrumb`,
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${siteConfig.url}${item.path}`
        }))
    };
}

export { siteConfig };

