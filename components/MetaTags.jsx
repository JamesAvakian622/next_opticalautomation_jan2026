'use client';

import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function MetaTags({
    appId,
    appArgument,
    manifest,
    themeColor,
    appleTouchIccon
}) {
    return (
        <Helmet>
            {/* Google Site Verification */}
            <meta name="google-site-verification" content="your-verification-code" />

            {/* Pinterest */}
            <meta name="p:domain_verify" content="pinterest-verification-code" />

            {/* Application Links */}
            {appId && <meta name="google-play-app" content={`app-id=${appId}`} />}
            {appArgument && <meta name="apple-itunes-app" content={`app-id=${appId}, app-argument=${appArgument}`} />}

            {/* PWA Tags */}
            <meta name="application-name" content="Optical Automation" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="Optical Automation" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="msapplication-TileColor" content={themeColor || "#6366f1"} />
            <meta name="msapplication-tap-highlight" content="no" />

            {/* SEO & Social */}
            <meta property="og:site_name" content="Optical Automation" />
            <meta property="og:locale" content="en_US" />
            <meta name="twitter:site" content="@javakian2025" />
            <meta name="twitter:creator" content="@javakian2025" />

            {themeColor && <meta name="theme-color" content={themeColor} />}
            {manifest && <link rel="manifest" href={manifest} />}
            {appleTouchIccon && <link rel="apple-touch-icon" href={appleTouchIccon} />}
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
        </Helmet>
    );
}
