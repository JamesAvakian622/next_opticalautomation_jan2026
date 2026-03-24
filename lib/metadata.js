const siteConfig = {
    name: 'Optical Automation',
    legalName: 'Optical Automation, LLC',
    description: 'Transforming businesses with AI-first software development, specialized MERN stack solutions, and premium SEO optimization. We build high-performance web and mobile applications including the MyDeskView Suite for personal and business organization. We apply practical security controls (authentication, authorization, encryption in transit) and use ISO 8601 for machine-readable dates and times where applicable. We do not claim independent SOC 2 Type II attestation or CASA program verification unless we publish a specific report or listing.',
    shortDescription: 'AI-First Software Development & MyDeskView Solutions',
    compliance: {
        securityApproach: 'We implement standard safeguards including authentication, access control, and encryption in transit, and we follow secure development practices suitable for customer-facing software.',
        securityApproachExtended: 'Delivered solutions are engineered with authentication, access control, encryption in transit, and related practices informed by common trust-service themes (e.g. security and confidentiality). This is not a substitute for a third-party SOC 2 Type II report or CASA badge unless separately made available.',
        iso8601: 'All date and time values conform to ISO 8601 international standard format (YYYY-MM-DDTHH:MM:SSZ).'
    },
    url: 'https://www.OpticalAutomation.com',
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
        'MyDeskView Apps'
    ],
    social: {
        facebook: 'https://www.facebook.com/profile.php?id=100091998258369',
        twitter: 'https://x.com/javakian2025',
        linkedin: 'https://www.linkedin.com/company/optical-automation/posts/?feedView=all',
        github: 'http://www.Github.com/JamesAvakian622'
    },
    policies: {
        termsOfUse: 'https://www.OpticalAutomation.com/terms-of-use',
        privacyPolicy: 'https://www.OpticalAutomation.com/privacy-policy',
        contentPolicy: 'https://www.OpticalAutomation.com/content-policy',
        cookiePolicy: 'https://www.OpticalAutomation.com/cookie-policy'
    },
    legal: {
        terms: '/terms-of-use',
        privacy: '/privacy-policy',
        content: '/content-policy',
        cookies: '/cookie-policy'
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

const pagePathMap = {
    home: '/',
    about: '/about',
    portfolio: '/portfolio',
    'app-portfolio': '/app-portfolio',
    domains: '/domains',
    support: '/support',
    pricing: '/pricing',
    products: '/products',
    dashboard: '/dashboard',
    documents: '/documents',
    profile: '/profile',
    accounts: '/accounts',
    login: '/login',
    register: '/register',
    terms: '/terms-of-use',
    privacy: '/privacy-policy',
    'content-policy': '/content-policy',
    sitemap: '/sitemap',
    deskview: '/deskview',
    subscription: '/subscription',
    favorites: '/favorites',
    timeline: '/timeline',
    guides: '/guides',
    onboarding: '/onboarding',
    glossary: '/glossary',
    trademarks: '/trademarks',
    learnSkills365: '/learnSkills365',
    'business-pricing': '/business-pricing',
    'select-software': '/select-software',
    'product-videos': '/product-videos',
    questions: '/questions',
    videos: '/videos',
    'admin-accounts': '/admin/accounts',
    tech: '/tech',
    learning: '/learning',
    'apps-mydeskview': '/apps/mydeskview',
    'apps-learnskills365': '/apps/learnskills365',
    'apps-optical-automation': '/apps/optical-automation',
    'apps-snowy-christmas': '/apps/snowy-christmas',
    'apps-corvette-quiz': '/apps/corvette-quiz',
    'apps-americatoday250': '/apps/americatoday250',
    'apps-james-avakian': '/apps/james-avakian',
    'apps-technology-and-times': '/apps/technology-and-times'
};

function inferTitleAndDescription(customTitle, customDescription) {
    if (customDescription) {
        return { title: customTitle, description: customDescription };
    }
    if (!customTitle) {
        return { title: null, description: null };
    }
    // Most existing calls pass a long description in second argument.
    if (customTitle.length > 80) {
        return { title: null, description: customTitle };
    }
    return { title: customTitle, description: null };
}

function getAbsoluteUrl(pathname = '/') {
    const normalized = pathname === '/' ? '/' : `/${pathname.replace(/^\/+/, '')}`;
    return `${siteConfig.url}${normalized}`;
}

export function generatePageMetadata(pageKey, customTitle, customDescription, customKeywords = [], customPath) {
    const titles = {
        // All pages now default to siteConfig.name ("Optical Automation")
    };

    const inferred = inferTitleAndDescription(customTitle, customDescription);
    const title = inferred.title || titles[pageKey] || siteConfig.name;
    const description = inferred.description || siteConfig.description;
    const pagePath = customPath || pagePathMap[pageKey] || '/';
    const canonicalUrl = getAbsoluteUrl(pagePath);
    const combinedKeywords = [...new Set([...siteConfig.keywords, ...customKeywords])];

    return {
        title,
        description,
        applicationName: siteConfig.name,
        appleWebApp: {
            title: siteConfig.name,
            statusBarStyle: 'default',
            capable: true,
        },
        formatDetection: {
            telephone: false,
        },
        keywords: combinedKeywords,
        authors: [{ name: siteConfig.founder }, { name: siteConfig.name }],
        creator: siteConfig.founder,
        publisher: siteConfig.name,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: canonicalUrl
        },
        openGraph: {
            title,
            description,
            url: canonicalUrl,
            siteName: siteConfig.name,
            locale: 'en_US',
            type: 'website',
            images: [
                {
                    url: siteConfig.ogImage || siteConfig.logo,
                    width: 1200,
                    height: 630,
                    alt: title
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            creator: siteConfig.twitterHandle,
            site: siteConfig.twitterHandle,
            images: [siteConfig.ogImage || siteConfig.logo]
        },
        robots: {
            index: true,
            follow: true,
            nocache: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1
            }
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
            siteConfig.social.github,
            'https://www.instagram.com/jamesavakian/',
            'https://www.pinterest.com/jamesavakian/'
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
        ].filter(Boolean),
        additionalProperty: [
            {
                '@type': 'PropertyValue',
                name: 'Security approach',
                value: siteConfig.compliance.securityApproachExtended
            },
            {
                '@type': 'PropertyValue',
                name: 'ISO 8601 date and time format',
                value: siteConfig.compliance.iso8601
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
            latitude: '34.3058',
            longitude: '-118.4417'
        },
        openingHoursSpecification: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00'
        }
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

export function generateSoftwareApplicationJsonLd(appData) {
    const data = appData || {
        name: 'MyDeskView Suite',
        operatingSystem: 'Windows, MacOS, iOS, Android',
        applicationCategory: 'BusinessApplication',
        genre: 'Productivity',
        description: 'A comprehensive suite of desktop and mobile applications including MyDeskView, Personal Organizer, and Business Organizer designed to streamline your digital life.',
        offers: {
            '@type': 'Offer',
            price: '0.00',
            priceCurrency: 'USD'
        },
        featureList: 'MyDeskView, Personal Organizer, Business Organizer, Teleprompter, Media Management'
    };

    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        ...data,
        maintainer: {
            '@type': 'Organization',
            name: siteConfig.name
        }
    };
}

export function generateWebPageJsonLd(page) {
    const pagePath = page?.path || '/';
    const pageTitle = page?.title || siteConfig.name;
    const pageDescription = page?.description || siteConfig.description;
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        '@id': `${siteConfig.url}${pagePath}#webpage`,
        name: pageTitle,
        description: pageDescription,
        url: `${siteConfig.url}${pagePath}`,
        isPartOf: {
            '@id': `${siteConfig.url}/#website`
        },
        about: {
            '@id': `${siteConfig.url}/#organization`
        },
        breadcrumb: {
            '@id': `${siteConfig.url}${pagePath}#breadcrumb`
        },
        inLanguage: 'en-US'
    };
}

export function generateRouteWebPageJsonLd(pathname = '/', title = siteConfig.name, description = siteConfig.description) {
    return generateWebPageJsonLd({ path: pathname, title, description });
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

export function generateArticleJsonLd(article) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        image: article.image,
        datePublished: article.publishedAt,
        dateModified: article.updatedAt || article.publishedAt,
        author: {
            '@type': 'Person',
            name: article.author || siteConfig.founder
        },
        publisher: {
            '@id': `${siteConfig.url}/#organization`
        },
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `${siteConfig.url}${article.path}`
        }
    };
}

export function generateTechArticleJsonLd(article) {
    return {
        ...generateArticleJsonLd(article),
        '@type': 'TechArticle',
        dependencies: article.dependencies,
        proficiencyLevel: article.proficiencyLevel || 'Advanced'
    };
}

export function generateVideoJsonLd(video) {
    return {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: video.title,
        description: video.description,
        thumbnailUrl: video.thumbnailUrl || siteConfig.logo,
        uploadDate: video.uploadDate || '2025-01-25',
        contentUrl: video.url,
        embedUrl: video.embedUrl,
        publisher: {
            '@id': `${siteConfig.url}/#organization`
        }
    };
}

export function generateProductJsonLd(product) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        brand: {
            '@type': 'Brand',
            name: siteConfig.name
        },
        offers: {
            '@type': 'Offer',
            url: `${siteConfig.url}${product.path}`,
            priceCurrency: 'USD',
            price: product.price || '0',
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/NewCondition'
        }
    };
}

export function generatePersonJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: siteConfig.founder,
        url: siteConfig.url,
        image: `${siteConfig.url}/profile.jpg`,
        sameAs: [
            siteConfig.social.twitter,
            siteConfig.social.linkedin,
            siteConfig.social.github,
            'https://www.facebook.com/james.avakian.9',
            'https://www.instagram.com/jamesavakian/'
        ].filter(Boolean),
        jobTitle: 'Founder & CEO',
        worksFor: {
            '@id': `${siteConfig.url}/#organization`
        }
    };
}

export function generateEventJsonLd(event) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Event',
        name: event.name,
        startDate: event.startDate,
        endDate: event.endDate,
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        eventStatus: 'https://schema.org/EventScheduled',
        location: {
            '@type': 'VirtualLocation',
            url: event.url
        },
        description: event.description,
        organizer: {
            '@id': `${siteConfig.url}/#organization`
        }
    };
}

export { siteConfig };


