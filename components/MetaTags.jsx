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

            {/* Application Links */}
            {appId && <meta name="google-play-app" content={`app-id=${appId}`} />}
            {appArgument && <meta name="apple-itunes-app" content={`app-id=${appId}, app-argument=${appArgument}`} />}

            {/* PWA Tags */}
            <meta name="application-name" content="Optical Automation" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="OpAuto" />
            <meta name="format-detection" content="telephone=no" />
            <meta name="mobile-web-app-capable" content="yes" />

            {themeColor && <meta name="theme-color" content={themeColor} />}
            {manifest && <link rel="manifest" href={manifest} />}
            {appleTouchIccon && <link rel="apple-touch-icon" href={appleTouchIccon} />}
        </Helmet>
    );
}
