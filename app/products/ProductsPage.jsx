'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiGlobe,
    FiExternalLink,
    FiCheck,
    FiHeart,
    FiPrinter,
    FiTrendingUp,
    FiMusic,
    FiAward,
    FiBook,
    FiMonitor,
    FiCamera,
    FiPlay,
    FiUsers,
    FiMessageSquare,
    FiDollarSign,
    FiBriefcase,
    FiLayout
} from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh-70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const HeroSection = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const LogoWrapper = styled(motion.div)`
    width: 60px;
    height: 60px;
    position: relative;
    border-radius: 0;
    overflow: hidden;
    flex-shrink: 0;

    @media(max-width: 768px) {
        width: 40px;
        height: 40px;
    }
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};

    @media(max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto;
`;

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media(max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;

const ProductCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    transition: all 0.3s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-4px);
        box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
    }
`;

const ProductHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ $color }) => `${$color}20`};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.5rem;
        color: ${({ $color }) => $color};
    }
`;

const StatusBadge = styled.span`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    background: ${({ $active, theme }) =>
        $active ? `${theme.colors.success}20` : `${theme.colors.warning}20`
    };
    color: ${({ $active, theme }) =>
        $active ? theme.colors.success : theme.colors.warning
    };
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 0.75rem;
    font-weight: 600;
`;

const FavoriteButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: ${({ $favorited, theme }) => $favorited ? '#ef4444' : theme.colors.textSecondary};

    &:hover {
        background: ${({ theme }) => theme.colors.backgroundAlt};
        transform: scale(1.1);
    }

    svg {
        font-size: 1.25rem;
        fill: ${({ $favorited }) => $favorited ? '#ef4444' : 'none'};
    }
`;

const HeaderActions = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const PrintFavoritesButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }

    svg {
        font-size: 1rem;
    }
`;

const ProductName = styled.h3`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductUrl = styled.p`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeaturesList = styled.ul`
    list-style: none;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureItem = styled.li`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    svg {
        color: ${({ theme }) => theme.colors.success};
        flex-shrink: 0;
    }
`;

const VisitLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const CategorySection = styled.section`
    scroll-margin-top: 100px;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const CategoryIconBox = styled.div`
    width: 44px;
    height: 44px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ $color }) => `${$color}18`};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
        font-size: 1.25rem;
        color: ${({ $color }) => $color};
    }
`;

const CategoryTitle = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin: 0;
`;

const CategoryCount = styled.span`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 4px 12px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-weight: 600;
`;

const CategoryGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};

    @media(max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;

const NextJsSectionTitle = styled.h2`
    font-size: 2rem;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const NextJsSectionSubtitle = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
    font-size: 1rem;
`;

const products = [
    {
        name: 'AmericaToday250',
        url: 'https://nextjs-america250-feb2026.vercel.app',
        description: 'American history arranged in decades, featuring Colonial America, Presidential Records, and Today in Government.',
        color: '#06B6D4',
        active: true,
        features: ['History Since George Washington', 'The Civil War', 'Government Current Day'],
    },
    {
        name: 'Technology And Times',
        url: 'https://nextjs-technologyandtimes.vercel.app',
        description: 'Technology Life and Time resources, companies, and products with timelines.',
        color: '#06B6D4',
        active: true,
        features: ['Technology Timeline', 'Company Histories', 'Product Launches', 'Historical Insights']
    },
    {
        name: 'Client Portal',
        url: 'www.JamesAvakian.com',
        description: 'Secure client portal for project management, file sharing, and communication.',
        color: '#10B981',
        active: true,
        features: ['Project Tracking', 'File Sharing', 'Real-time Chat', 'Invoice Management']
    },
    {
        name: 'DocumentHub',
        url: 'documenthubaws.netlify.app',
        description: 'AWS-powered document management system for viewing and accessing PDF documents.',
        color: '#F59E0B',
        active: true,
        features: ['PDF Viewer', 'AWS Storage', 'Document Search', 'Quick Access']
    },
    {
        name: 'LearnSkills365',
        url: 'www.LearnSkills365.com',
        description: 'Educational resources, courses, and tutorials for web development.',
        color: '#06B6D4',
        active: true,
        features: ['Video Courses', 'Interactive Labs', 'Certifications', 'Community']
    },
    {
        name: 'OlympicsTracker',
        url: 'https://nextjs-olympics.vercel.app',
        description: 'Educational resources, olympics history, and event record for physical athletes.',
        color: '#06B6D4',
        active: true,
        features: ['Historic Country Win', 'International Medal History', 'Event Search', 'Quick Access'],
    },
    {
        name: 'Snowy Christmas',
        url: 'https://nextjs-snowychristmas.vercel.app',
        description: 'Writing, Poems, Songs, and Literature resource for the holiday season.',
        color: '#06B6D4',
        active: true,
        features: ['Poetry', 'Songs', 'Literature', 'Holiday Themes']
    },
    {
        name: 'AmericanCars',
        url: 'https://nextjs-americancars2026-k48l.vercel.app',
        description: 'Comprehensive resource for American car history, models, and industry insights.',
        color: '#06B6D4',
        active: true,
        features: ['Car Models', 'Industry History', 'Technological Innovations', 'Classic Cars']
    },
    {
        name: 'Apple M Processors',
        url: 'https://nextjs-academyawardtracker.vercel.app',
        description: 'Current and Future Apple Computer M Compuer Micrporocessors.',
        color: '#06B6D4',
        active: true,
        features: ['Apple M Processors', 'Future Tech', 'Performance Benchmarks', 'Developer Resources']
    },
    {
        name: 'Fitness Tracker',
        url: 'https://nextjs-fitnesstracker.vercel.app',
        description: 'Track workouts, nutrition, and health metrics for a healthier lifestyle.',
        color: '#06B6D4',
        active: true,
        features: ['Workout Logging', 'Nutrition Tracking', 'Health Metrics', 'Progress Reports']
    }
];

const nextJsCategories = [
    {
        id: 'business-finance',
        title: 'Business & Finance',
        icon: FiBriefcase,
        color: '#10B981',
        products: [
            { name: 'AccessMoney', description: 'Financial access and money management application with account tracking and budgeting.', color: '#10B981', features: ['Account Tracking', 'Budgeting', 'Reports', 'Secure Login'] },
            { name: 'AI Trading', description: 'AI-powered trading and investment analysis platform with market predictions.', color: '#6366F1', features: ['AI Predictions', 'Portfolio View', 'Market Analysis', 'Alerts'] },
            { name: 'BusinessTracker', description: 'Business performance tracking and analytics dashboard.', color: '#8B5CF6', features: ['Performance Metrics', 'Analytics', 'Reports', 'Dashboard'] },
        ]
    },
    {
        id: 'education-learning',
        title: 'Education & Learning',
        icon: FiBook,
        color: '#F59E0B',
        products: [
            { name: 'LearnSkills365', description: 'Interactive learning platform for Math, Reading, Writing, Memory, Typing, Geography, and Quizzes.', color: '#F59E0B', features: ['7 Subjects', 'Progress Tracking', 'Quizzes', 'Achievements'] },
        ]
    },
    {
        id: 'entertainment-leisure',
        title: 'Entertainment & Leisure',
        icon: FiMusic,
        color: '#EC4899',
        products: [
            { name: 'GoodDayMusic', description: 'Music discovery and playlist management application with genre browsing and artist information.', color: '#10B981', features: ['Playlist Builder', 'Genre Browse', 'Artist Info', 'Favorites'] },
            { name: 'CorvetteQuiz', description: 'Interactive quiz testing knowledge of Corvette history, models, and specifications.', color: '#EF4444', features: ['Score Tracking', 'Achievements', 'Leaderboard', 'Beautiful UI'] },
            { name: 'Biographies', description: 'Collection of notable biographies and life stories of famous personalities.', color: '#8B5CF6', features: ['Life Stories', 'Timelines', 'Search', 'Categories'] },
        ]
    },
    {
        id: 'personal-productivity',
        title: 'Personal Productivity',
        icon: FiLayout,
        color: '#6366F1',
        products: [
            { name: 'MyDeskView', description: 'Central command center for daily workflow management and productivity.', color: '#6366F1', features: ['Dashboard', 'Widgets', 'Cross-App Sync', 'Real-time Updates'] },
            { name: 'MyBusinessOrganizer', description: 'Complete business operations suite for entrepreneurs and teams.', color: '#EC4899', features: ['Task Management', 'Scheduling', 'Notes', 'Projects'] },
            { name: 'PhotoAlbums', description: 'Photo organization and album management for your digital memories.', color: '#EC4899', features: ['Album Creation', 'Photo Organization', 'Sharing', 'Timeline'] },
            { name: 'MyDeskView YouTube', description: 'Curated video content and YouTube integration with quick access menus.', color: '#EF4444', features: ['Video Playlists', 'Quick Access', 'Favorites', 'Categories'] },
        ]
    },
    {
        id: 'communication-social',
        title: 'Communication & Social',
        icon: FiMessageSquare,
        color: '#0EA5E9',
        products: [
            { name: 'MyTelephoneBook', description: 'Digital telephone directory and contact management system.', color: '#10B981', features: ['Contact Management', 'Search', 'Categories', 'Sync'] },
            { name: 'Hi5', description: 'Social networking and communication platform for connecting with others.', color: '#6366F1', features: ['Messaging', 'Profiles', 'Groups', 'Notifications'] },
            { name: 'Teleprompter', description: 'Digital teleprompter for presentations and video production.', color: '#EC4899', features: ['Speed Control', 'Text Editor', 'Mirror Mode', 'Fullscreen'] },
        ]
    },
    {
        id: 'health',
        title: 'Health',
        icon: FiHeart,
        color: '#EF4444',
        products: [
            { name: 'FitnessTracker', description: 'Fitness activity tracking and workout management with step counting and goal tracking.', color: '#10B981', features: ['Workout Logs', 'Step Counter', 'Goals', 'HealthKit'] },
            { name: 'HealthTracker', description: 'Comprehensive health monitoring and wellness tracking application.', color: '#EC4899', features: ['Health Metrics', 'Wellness Tracking', 'Reports', 'Reminders'] },
            { name: 'WalkTracker', description: 'Walking activity tracker with distance and step counting for daily fitness.', color: '#0EA5E9', features: ['Distance Tracking', 'Step Counting', 'Routes', 'History'] },
        ]
    }
];

export default function ProductsPage() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            setTimeout(() => {
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 150);
        }
    }, []);

    const toggleFavorite = (productUrl) => {
        setFavorites(prev =>
            prev.includes(productUrl)
                ? prev.filter(url => url !== productUrl)
                : [...prev, productUrl]
        );
    };

    const printFavorites = () => {
        const favoriteProducts = products.filter(p => favorites.includes(p.url));
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>My Favorite Products - Optical Automation</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
                    h1 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
                    .product { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 12px; }
                    .product-name { font-size: 1.5rem; font-weight: bold; color: #6366f1; margin-bottom: 5px; }
                    .product-url { color: #666; font-size: 0.9rem; margin-bottom: 10px; }
                    .product-desc { margin-bottom: 15px; line-height: 1.6; }
                    .features { display: flex; flex-wrap: wrap; gap: 8px; }
                    .feature { background: #f0f0f0; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
                    .footer { margin-top: 40px; text-align: center; color: #666; font-size: 0.85rem; }
                </style>
            </head>
            <body>
                <h1>My Favorite Products</h1>
                <p>Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                ${favoriteProducts.map(p => `
                    <div class="product">
                        <div class="product-name">${p.name}</div>
                        <div class="product-url">${p.url}</div>
                        <div class="product-desc">${p.description}</div>
                        <div class="features">
                            ${p.features.map(f => `<span class="feature">${f}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
                <div class="footer">
                    <p>Optical Automation | opticalautomation.com</p>
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <LogoWrapper>
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </LogoWrapper>
                        Products
                    </Title>
                    <Subtitle>
                        Explore the ecosystem of Optical Automation domains and services
                    </Subtitle>
                </HeroSection>

                {favorites.length > 0 && (
                    <PrintFavoritesButton onClick={printFavorites}>
                        <FiPrinter /> Print {favorites.length} Favorite{favorites.length > 1 ? 's' : ''} as PDF
                    </PrintFavoritesButton>
                )}

                <ProductsGrid>
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.url}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductHeader>
                                <ProductIcon $color={product.color}>
                                    <FiGlobe />
                                </ProductIcon>
                                <HeaderActions>
                                    <FavoriteButton
                                        $favorited={favorites.includes(product.url)}
                                        onClick={() => toggleFavorite(product.url)}
                                        title={favorites.includes(product.url) ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <FiHeart />
                                    </FavoriteButton>
                                    <StatusBadge $active={product.active}>
                                        {product.active ? 'Active' : 'Coming Soon'}
                                    </StatusBadge>
                                </HeaderActions>
                            </ProductHeader>
                            <ProductName>{product.name}</ProductName>
                            <ProductUrl>{product.url}</ProductUrl>
                            <ProductDescription>{product.description}</ProductDescription>
                            <FeaturesList>
                                {product.features.map((feature) => (
                                    <FeatureItem key={feature}>
                                        <FiCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            {product.active && (
                                <VisitLink
                                    href="https://6961af51fdbe659fc8f241fa--illustrious-baklava-da0cd7.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Site <FiExternalLink />
                                </VisitLink>
                            )}
                        </ProductCard>
                    ))}
                </ProductsGrid>

                <NextJsSectionTitle>Next.js Products</NextJsSectionTitle>
                <NextJsSectionSubtitle>
                    Software titles built with Next.js across Business, Education, Entertainment, Productivity, Communication, and Health
                </NextJsSectionSubtitle>

                {nextJsCategories.map((category) => (
                    <CategorySection key={category.id} id={category.id}>
                        <CategoryHeader>
                            <CategoryIconBox $color={category.color}>
                                <category.icon />
                            </CategoryIconBox>
                            <CategoryTitle>{category.title}</CategoryTitle>
                            <CategoryCount>{category.products.length} title{category.products.length !== 1 ? 's' : ''}</CategoryCount>
                        </CategoryHeader>
                        <CategoryGrid>
                            {category.products.map((product, index) => (
                                <ProductCard
                                    key={product.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                >
                                    <ProductHeader>
                                        <ProductIcon $color={product.color}>
                                            <category.icon />
                                        </ProductIcon>
                                        <StatusBadge $active={true}>Next.js</StatusBadge>
                                    </ProductHeader>
                                    <ProductName>{product.name}</ProductName>
                                    <ProductDescription>{product.description}</ProductDescription>
                                    <FeaturesList>
                                        {product.features.map((feature) => (
                                            <FeatureItem key={feature}>
                                                <FiCheck /> {feature}
                                            </FeatureItem>
                                        ))}
                                    </FeaturesList>
                                </ProductCard>
                            ))}
                        </CategoryGrid>
                    </CategorySection>
                ))}
            </Container>
        </PageWrapper>
    );
}
