'use client';

import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

export default function SEOHelmet({ children }) {
    return (
        <HelmetProvider>
            <Helmet>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="robots" content="index, follow" />
                <meta name="googlebot" content="index, follow" />
                <meta name="theme-color" content="#6366f1" />
                <html lang="en" />
            </Helmet>
            {children}
        </HelmetProvider>
    );
}
