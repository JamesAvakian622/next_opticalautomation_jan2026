'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const TabButton = styled.button`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-weight: 600;
    font-size: 0.875rem;
    transition: all 0.3s ease;
    border: 2px solid ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.border)};
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
    color: ${({ $active }) => ($active ? 'white' : 'inherit')};
    cursor: pointer;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.primary)};
    }
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
    border-radius: 0;
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
    border-radius: 0;
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

const pricingPlans = {
    web: [
        {
            name: 'Starter Website',
            price: '$499',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'Professional presence for small businesses.',
            color: '#6366f1',
            featured: false,
            features: [
                'Responsive Design',
                'SEO Optimization',
                'Contact Integration',
                'CMS Support',
                'Domain Setup',
                'Cloud Hosting'
            ]
        },
        {
            name: 'Business Solution Web',
            price: '$999',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'Advanced business features and database.',
            color: '#10B981',
            featured: true,
            features: [
                'MERN Stack Database',
                'User Authentication',
                'Admin Dashboard',
                'Custom API Design',
                'Priority Support',
                'Advanced Analytics'
            ]
        }
    ],
    mobile: [
        {
            name: 'Starter Mobile App',
            price: '$499',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'Single platform application framework.',
            color: '#EC4899',
            featured: false,
            features: [
                'Native Performance',
                'Core Functionality',
                'User Login',
                'Basic Push Notifications',
                'Store Submission',
                'Essential Features'
            ]
        },
        {
            name: 'iOS or Android',
            price: '$750',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'Professional app for either iOS or Android.',
            color: '#8B5CF6',
            featured: false,
            features: [
                'Native Platform Build',
                'iOS Store or Google Play',
                'App Store Submission',
                'Real-time Data Sync',
                'Cloud Backend Access',
                'API Integration'
            ]
        },
        {
            name: 'Business iOS and Android',
            price: '$1,250',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'High-performance cross-platform application.',
            color: '#06B6D4',
            featured: true,
            features: [
                'Both iOS and Android',
                'Both Store Submissions',
                'Cross-platform Sync',
                'Push Notifications Pro',
                'Unified Management',
                'Priority Tech Support'
            ]
        }
    ],
    both: [
        {
            name: 'Web and One App',
            price: '$750',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'Seamless integration between web and one mobile platform.',
            color: '#F59E0B',
            featured: false,
            features: [
                'Website Production',
                'iOS or Android App',
                'Shared MERN Database',
                'Cloud Image Sync',
                'Store Submission',
                'Multi-channel Auth'
            ]
        },
        {
            name: 'Business Solution Web + 2 Apps',
            price: '$1,250',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'The ultimate digital ecosystem: Web, iOS, and Android.',
            color: '#06B6D4',
            featured: true,
            features: [
                'High-performance Web',
                'iOS + Android Apps',
                'Unified Dashboard',
                'Real-time Syncing',
                'Global Availability',
                'Priority 24/7 Support'
            ]
        }
    ]
};



export default function PricingPage() {
    const [activeTab, setActiveTab] = React.useState('both');

    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Image src="/opauto.png" alt="Logo" width={40} height={40} style={{ objectFit: 'contain' }} /> Applications Production
                    </Title>
                    <Subtitle>
                        Let us create a profitable website solution for your company.
                    </Subtitle>

                    <TabContainer>
                        <TabButton $active={activeTab === 'web'} onClick={() => setActiveTab('web')}>Starter Website</TabButton>
                        <TabButton $active={activeTab === 'mobile'} onClick={() => setActiveTab('mobile')}>Starter Mobile App</TabButton>
                        <TabButton $active={activeTab === 'both'} onClick={() => setActiveTab('both')}>Both (Web + Apps)</TabButton>
                    </TabContainer>
                </HeroSection>

                <PricingGrid>
                    {pricingPlans[activeTab].map((plan, index) => (
                        <PricingCard
                            key={plan.name}
                            $featured={plan.featured}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <PricingHeader>
                                <PricingIcon $color={plan.color}>
                                    <Image src="/opauto.png" alt="Logo" width={24} height={24} style={{ objectFit: 'contain' }} />
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
                            {plan.updates && <div style={{ color: '#0066cc', fontWeight: '700', marginBottom: '15px', fontSize: '0.9rem' }}>{plan.updates}</div>}
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
