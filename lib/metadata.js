const siteConfig = {
    name: 'Optical Automation',
    legalName: 'Optical Automation, LLC',
    description: 'Transforming businesses with AI-first software development, specialized MERN stack solutions, and premium SEO optimization. We build high-performance web and mobile applications including the MyDeskView Suite for personal and business organization.',
    shortDescription: 'AI-First Software Development & MyDeskView Solutions',
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
        'MyDeskView Apps'
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
        // All pages now default to siteConfig.name ("Optical Automation")
    };

    const title = customTitle || titles[pageKey] || siteConfig.name;
    const description = customDescription || siteConfig.description;
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
            canonical: './',
            languages: {
                'en-US': '/en-US',
            },
        },
        openGraph: {
            title,
            description,
            url: './',
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
        },
        verification: {
            google: 'google-site-verification-code',
            yandex: 'yandex-verification-code',
            me: 'jamesavakian'
        },
        itunes: {
            appId: 'my-app-id',
            appArgument: 'my-app-argument',
        },
        other: {
            'facebook-domain-verification': 'fb-verification-code',
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


