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
    FiCloud,
    FiChevronDown
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
    flex-wrap: wrap;
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
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
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

const AccordionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)'};
    border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.4)'};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    transition: all 0.3s ease;
    user-select: none;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }

    h3 {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.mode === 'dark' ? '#ffffff' : '#000000'};
        -webkit-text-fill-color: ${({ theme }) => theme.mode === 'dark' ? '#ffffff' : '#000000'};
        margin: 0;
    }

    svg {
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.primary};
        transition: transform 0.3s ease;
        transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
    }
`;

const AccordionContent = styled(motion.div)`
    overflow: hidden;
`;

const pricingPlans = {
    web: [
        {
            name: 'Starter Website',
            price: '$3,499',
            period: 'one-time',
            updates: '$249 updates',
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
            price: '$4,999',
            period: 'one-time',
            updates: '$499/spot updates or $2,500/month',
            description: 'Advanced business features and database.',
            color: '#10B981',
            featured: true,
            features: [
                'MERN Stack Database',
                'User Authentication',
                'Admin Dashboard',
                'Custom API Design',
                'Priority Support',
                'SEO Optimization with Analytics'
            ]
        },
        {
            name: 'Business eCommerce Solution',
            price: '$7,500',
            period: 'one-time',
            updates: '$2,499/month',
            description: 'Full-featured eCommerce platform for online businesses.',
            color: '#F59E0B',
            featured: false,
            features: [
                'Complete eCommerce Platform',
                'Stripe & PayPal Integration',
                'Product Catalog & Inventory',
                'Order Management System',
                'Customer Accounts & Dashboards',
                'Analytics & Reporting'
            ]
        }
    ],
    mobile: [
        {
            name: 'Starter WebView',
            price: '$1,299',
            period: 'one-time',
            description: 'WebView-based mobile app for quick market entry.',
            color: '#EC4899',
            featured: false,
            features: [
                'Single WebView',
                'iOS or Android',
                'Responsive Design',
                'Includes Store Submission',
                'Core Functionality',
                'Basic Support'
            ]
        },
        {
            name: 'Dual Starter Apps',
            price: '$2,499',
            period: 'one-time',
            description: 'WebView apps for both iOS and Android platforms.',
            color: '#06B6D4',
            featured: true,
            features: [
                'iOS & Android WebView',
                'Both Store Submissions',
                'Cross-platform Access',
                'Push Notifications',
                'Unified Management',
                'Priority Support'
            ]
        },
        {
            name: 'Four Business Apps',
            price: '$4,999',
            period: 'one-time',
            description: 'Full-featured business mobile application.',
            color: '#F59E0B',
            featured: false,
            features: [
                'iOS & Android WebView',
                'Four Store Submissions',
                'Native Business App',
                'Advanced Features',
                'Custom API Integration',
                'Premium Support'
            ]
        }
    ],
    both: [
        {
            name: 'Web and One App',
            price: 'TBD',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'Seamless integration between web and one mobile platform.',
            color: '#F59E0B',
            featured: false,
            features: [
                'Website Production',
                'iOS or Android App',
                'Shared MERN Database',
                'User Authentication',
                'Cloud Image Sync',
                'Includes Store Submission',
                'Multi-channel Auth'
            ]
        },
        {
            name: 'Business Solution Web + 2 Apps',
            price: 'TBD',
            period: 'one-time',
            updates: '$499/mo updates',
            description: 'The ultimate digital ecosystem: Web, iOS, and Android.',
            color: '#06B6D4',
            featured: true,
            features: [
                'High-performance Web',
                'iOS + Android Apps',
                'Unified Dashboard',
                'User Authentication',
                'Real-time Syncing',
                'Global Availability',
                'Priority 24/7 Support'
            ]
        }
    ],
    readymade: [
        {
            name: 'Single Application',
            price: '$2, 5, and 10',
            period: 'one-time',
            description: 'Choose a single application from our catalog. Pricing varies by app tier — from basic tools to full-featured premium applications.',
            color: '#8B5CF6',
            featured: false,
            features: [
                'One Application License',
                'Instant Access',
                '$2 Basic, $5 Premium, $10 Top-Tier',
                'Full Features at Every Level',
                'Community & Email Support'
            ]
        },
        {
            name: 'Silver Group',
            price: '$49',
            period: 'one-time',
            description: 'Bundle of twenty applications from our catalog. Perfect for users who want a broad selection of tools.',
            color: '#94A3B8',
            featured: true,
            features: [
                '20 Applications Included',
                'Mix & Match Any Apps',
                'Full Feature Access',
                'Cross-App Integration',
                'Email & Chat Support',
                'Free Updates for 6 Months'
            ]
        },
        {
            name: 'Gold Level',
            price: '$125',
            period: '/year',
            description: 'Annual all-title access. Every application in our entire catalog, current and future, included for one year.',
            color: '#F59E0B',
            featured: false,
            features: [
                'All Titles Available',
                'Annual Access Pass',
                'New Titles Included',
                'Full Feature Access',
                'Priority Support',
                'Exclusive Updates'
            ]
        }
    ]
};



export default function PricingPage() {
    const [activeTab, setActiveTab] = React.useState('readymade');
    const [whatsIncludedOpen, setWhatsIncludedOpen] = React.useState(false);

    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Image src="/opauto.png" alt="Logo" width={40} height={40} style={{ objectFit: 'contain' }} /> Product Marketing Pricing
                    </Title>
                    <Subtitle>
                        Let us create a profitable software solution for your company.
                    </Subtitle>

                    <TabContainer>
                        <TabButton $active={activeTab === 'readymade'} onClick={() => setActiveTab('readymade')}>Ready-Made Products</TabButton>
                        <TabButton $active={activeTab === 'web'} onClick={() => setActiveTab('web')}>Starter Website</TabButton>
                        <TabButton $active={activeTab === 'mobile'} onClick={() => setActiveTab('mobile')}>Mobile App</TabButton>
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


                <AccordionHeader $isOpen={whatsIncludedOpen} onClick={() => setWhatsIncludedOpen(!whatsIncludedOpen)}>
                    <h3>What's Included</h3>
                    <FiChevronDown />
                </AccordionHeader>
                <AccordionContent
                    initial={false}
                    animate={{ height: whatsIncludedOpen ? 'auto' : 0, opacity: whatsIncludedOpen ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <ServicesSection>
                        <ServicesGrid>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <ServiceIcon>
                                    <FiCode />
                                </ServiceIcon>
                                <ServiceTitle>Sharp Design</ServiceTitle>
                                <ServiceDesc>Modern, visually stunning interfaces crafted for maximum impact and user engagement</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <ServiceIcon>
                                    <FiZap />
                                </ServiceIcon>
                                <ServiceTitle>SEO Optimization</ServiceTitle>
                                <ServiceDesc>Search engine optimized pages with metadata-driven content for maximum visibility</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <ServiceIcon>
                                    <FiDatabase />
                                </ServiceIcon>
                                <ServiceTitle>Information Research</ServiceTitle>
                                <ServiceDesc>In-depth research and data-driven content to power your application</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
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
                                transition={{ delay: 0.5 }}
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
                                transition={{ delay: 0.6 }}
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
                                transition={{ delay: 0.7 }}
                            >
                                <ServiceIcon>
                                    <FiCloud />
                                </ServiceIcon>
                                <ServiceTitle>Cloud Hosting</ServiceTitle>
                                <ServiceDesc>Deployment assistance and hosting recommendations</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <ServiceIcon>
                                    <FiShield />
                                </ServiceIcon>
                                <ServiceTitle>Login Secure Authentication</ServiceTitle>
                                <ServiceDesc>Enterprise-grade user authentication with secure login and access control</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                            >
                                <ServiceIcon>
                                    <FiDatabase />
                                </ServiceIcon>
                                <ServiceTitle>Historic Research</ServiceTitle>
                                <ServiceDesc>Thorough historical data analysis and research integrated into every application</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0 }}
                            >
                                <ServiceIcon>
                                    <FiServer />
                                </ServiceIcon>
                                <ServiceTitle>Full Available Background</ServiceTitle>
                                <ServiceDesc>Comprehensive background information and context provided for all application data</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 }}
                            >
                                <ServiceIcon>
                                    <FiZap />
                                </ServiceIcon>
                                <ServiceTitle>Latent Industry</ServiceTitle>
                                <ServiceDesc>Emerging market insights and latent industry trends incorporated into solutions</ServiceDesc>
                            </ServiceItem>
                            <ServiceItem
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2 }}
                            >
                                <ServiceIcon>
                                    <FiShield />
                                </ServiceIcon>
                                <ServiceTitle>SOC2 & ISO8601 Compliance</ServiceTitle>
                                <ServiceDesc>Standard SOC2 and ISO8601 compliance applied to every application</ServiceDesc>
                            </ServiceItem>
                        </ServicesGrid>
                    </ServicesSection>
                </AccordionContent>
            </Container>
        </PageWrapper>
    );
}
