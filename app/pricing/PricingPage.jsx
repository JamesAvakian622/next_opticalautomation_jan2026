'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiDollarSign,
    FiExternalLink,
    FiServer,
    FiDatabase,
    FiCode,
    FiCheck,
    FiStar,
    FiZap,
    FiShield,
    FiCloud
} from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
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

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto;
`;

const PricingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 400px) {
        grid-template-columns: 1fr;
    }
`;

const PricingCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme, $featured }) => $featured ? theme.colors.primary : theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;

    ${({ $featured }) => $featured && `
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
        }
    `}

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-4px);
        box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
    }
`;

const PricingHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PricingIcon = styled.div`
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

const FeaturedBadge = styled.span`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 0.75rem;
    font-weight: 600;
`;

const PlanName = styled.h3`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PlanPrice = styled.div`
    font-size: 2.5rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    span {
        font-size: 1rem;
        font-weight: 400;
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const PlanDescription = styled.p`
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

const CTAButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    background: ${({ $featured, theme }) => $featured ? theme.colors.gradient : theme.colors.backgroundAlt};
    color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.text};
    border: 1px solid ${({ $featured, theme }) => $featured ? 'transparent' : theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const ServicesSection = styled.div`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const ServicesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
`;

const ServiceItem = styled(motion.div)`
    text-align: center;
    padding: ${({ theme }) => theme.spacing.lg};
`;

const ServiceIcon = styled.div`
    width: 60px;
    height: 60px;
    margin: 0 auto ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const ServiceTitle = styled.h4`
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ServiceDesc = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
`;

const pricingPlans = [
    {
        name: 'Starter Website',
        price: '$999',
        period: 'one-time',
        description: 'Perfect for small businesses looking to establish their online presence with a professional website.',
        color: '#6366f1',
        featured: false,
        features: [
            'Up to 5 pages',
            'Responsive design',
            'Contact form',
            'Basic SEO setup',
            '1 month support',
            'Domain setup assistance'
        ]
    },
    {
        name: 'Business Solution',
        price: '$2,499',
        period: 'one-time',
        description: 'Comprehensive website with database integration, user authentication, and advanced functionality.',
        color: '#10B981',
        featured: true,
        features: [
            'Up to 15 pages',
            'MERN Stack database',
            'User authentication',
            'Admin dashboard',
            'Cloud image storage',
            '3 months support',
            'SEO optimization',
            'Analytics integration'
        ]
    },
    {
        name: 'Enterprise Platform',
        price: '$4,999',
        period: 'one-time',
        description: 'Full-scale web application with custom features, API integrations, and enterprise-grade security.',
        color: '#F59E0B',
        featured: false,
        features: [
            'Unlimited pages',
            'Custom database design',
            'Multiple user roles',
            'API integrations',
            'Payment processing',
            '6 months support',
            'Performance optimization',
            'Security hardening',
            'Training sessions'
        ]
    },
    {
        name: 'E-Commerce Store',
        price: '$3,499',
        period: 'one-time',
        description: 'Complete online store with product management, shopping cart, and payment gateway integration.',
        color: '#EC4899',
        featured: false,
        features: [
            'Product catalog',
            'Shopping cart',
            'Payment integration',
            'Order management',
            'Inventory tracking',
            'Customer accounts',
            '3 months support',
            'Mobile responsive'
        ]
    },
    {
        name: 'Mobile + Web App',
        price: '$5,999',
        period: 'one-time',
        description: 'Combined website and mobile application sharing the same database and business logic.',
        color: '#8B5CF6',
        featured: false,
        features: [
            'React Native mobile app',
            'Shared MERN backend',
            'Cross-platform support',
            'Push notifications',
            'Offline capability',
            '6 months support',
            'App store deployment',
            'Continuous updates'
        ]
    },
    {
        name: 'Monthly Retainer',
        price: '$499',
        period: '/month',
        description: 'Ongoing development, maintenance, and support for your web applications.',
        color: '#06B6D4',
        featured: false,
        features: [
            'Priority support',
            'Bug fixes included',
            'Feature updates',
            'Security patches',
            'Performance monitoring',
            'Monthly reports',
            'Hosting management'
        ]
    }
];

export default function PricingPage() {
    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiDollarSign /> Website Database Production
                    </Title>
                    <Subtitle>
                        Let us create a profitable website solution for your company.
                    </Subtitle>
                </HeroSection>

                <PricingGrid>
                    {pricingPlans.map((plan, index) => (
                        <PricingCard
                            key={plan.name}
                            $featured={plan.featured}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PricingHeader>
                                <PricingIcon $color={plan.color}>
                                    <FiDollarSign />
                                </PricingIcon>
                                {plan.featured && (
                                    <FeaturedBadge>
                                        <FiStar /> Most Popular
                                    </FeaturedBadge>
                                )}
                            </PricingHeader>
                            <PlanName>{plan.name}</PlanName>
                            <PlanPrice>
                                {plan.price} <span>{plan.period}</span>
                            </PlanPrice>
                            <PlanDescription>{plan.description}</PlanDescription>
                            <FeaturesList>
                                {plan.features.map((feature) => (
                                    <FeatureItem key={feature}>
                                        <FiCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            <CTAButton href="/support" $featured={plan.featured}>
                                Get Started
                            </CTAButton>
                        </PricingCard>
                    ))}
                </PricingGrid>

                <ServicesSection>
                    <SectionTitle>What's Included</SectionTitle>
                    <ServicesGrid>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ServiceIcon>
                                <FiDatabase />
                            </ServiceIcon>
                            <ServiceTitle>Database Design</ServiceTitle>
                            <ServiceDesc>Custom MongoDB schemas optimized for your business needs</ServiceDesc>
                        </ServiceItem>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ServiceIcon>
                                <FiCode />
                            </ServiceIcon>
                            <ServiceTitle>Clean Code</ServiceTitle>
                            <ServiceDesc>Well-documented, maintainable code following best practices</ServiceDesc>
                        </ServiceItem>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <ServiceIcon>
                                <FiShield />
                            </ServiceIcon>
                            <ServiceTitle>Security First</ServiceTitle>
                            <ServiceDesc>Enterprise-grade security with JWT authentication</ServiceDesc>
                        </ServiceItem>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <ServiceIcon>
                                <FiCloud />
                            </ServiceIcon>
                            <ServiceTitle>Cloud Hosting</ServiceTitle>
                            <ServiceDesc>Deployment assistance and hosting recommendations</ServiceDesc>
                        </ServiceItem>
                    </ServicesGrid>
                </ServicesSection>
            </Container>
        </PageWrapper>
    );
}
