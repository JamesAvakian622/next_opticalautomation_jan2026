'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { siteConfig } from '@/lib/metadata';

export default function SEO({
    title,
    description,
    canonical,
    ogImage,
    ogType = 'website',
    twitterHandle = siteConfig.twitterHandle,
    keywords = []
}) {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
    const metaDescription = description || siteConfig.description;
    const url = typeof window !== 'undefined' ? window.location.href : siteConfig.url;
    const image = ogImage || `${siteConfig.url}${siteConfig.logo}`;

    const combinedKeywords = [...new Set([...siteConfig.keywords, ...keywords])].join(', ');

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={combinedKeywords} />
            <link rel="canonical" href={canonical || url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteConfig.name} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={image} />
            {twitterHandle && <meta name="twitter:creator" content={twitterHandle} />}

            {/* Additional SEO */}
            <meta name="robots" content="index, follow" />
            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
            <meta name="theme-color" content="#6366f1" />
        </Helmet>
    );
}
