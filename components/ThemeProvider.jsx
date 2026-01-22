'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const ThemeContext = createContext();

const lightTheme = {
    mode: 'light',
    colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#f43f5e',
        background: '#ffffff',
        backgroundAlt: '#f8fafc',
        surface: '#ffffff',
        text: '#000000',
        textSecondary: '#334155',
        border: '#e2e8f0',
        shadow: 'rgba(0, 0, 0, 0.05)',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366f1 50%, #8B5CF6 100%)',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        xxl: '64px'
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        full: '9999px'
    },
    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
    },
    transitions: {
        fast: '150ms ease',
        normal: '300ms ease',
        slow: '500ms ease'
    }
};

const darkTheme = {
    mode: 'dark',
    colors: {
        primary: '#6366f1',
        secondary: '#ec4899',
        accent: '#f43f5e',
        background: '#000000',
        backgroundAlt: '#0a0a0a',
        surface: '#111111',
        text: '#ffffff',
        textSecondary: '#94a3b8',
        border: '#333333',
        shadow: 'rgba(0, 0, 0, 0.5)',
        gradient: 'linear-gradient(135deg, #3B82F6 0%, #6366f1 50%, #8B5CF6 100%)',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444'
    },
    spacing: lightTheme.spacing,
    borderRadius: lightTheme.borderRadius,
    fontSizes: lightTheme.fontSizes,
    transitions: lightTheme.transitions
};

const THEME_STORAGE_KEY = 'optical-automation-theme';

export default function ThemeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored) {
            setIsDark(stored === 'dark');
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDark(prefersDark);
        }
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setIsDark((prev) => {
            const newValue = !prev;
            localStorage.setItem(THEME_STORAGE_KEY, newValue ? 'dark' : 'light');
            return newValue;
        });
    };

    const theme = isDark ? darkTheme : lightTheme;

    // Prevent flash of wrong theme
    if (!mounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
            <StyledThemeProvider theme={theme}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

export { lightTheme, darkTheme };
