'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiGlobe,
    FiExternalLink,
    FiServer,
    FiShield,
    FiZap,
    FiCheck
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

const products = [
    {
        name: 'Optical Automation',
        url: 'opticalautomation.com',
        description: 'Our flagship website showcasing web development services, portfolio, and technical expertise.',
        color: '#6366f1',
        active: true,
        features: ['React/Next.js', 'Full-Stack Development', 'AI Integration', 'SEO Optimized']
    },
    {
        name: 'Client Portal',
        url: 'portal.opticalautomation.com',
        description: 'Secure client portal for project management, file sharing, and communication.',
        color: '#10B981',
        active: true,
        features: ['Project Tracking', 'File Sharing', 'Real-time Chat', 'Invoice Management']
    },
    {
        name: 'Documentation Hub',
        url: 'docs.opticalautomation.com',
        description: 'Technical documentation, API references, and development guides.',
        color: '#F59E0B',
        active: true,
        features: ['API Docs', 'Tutorials', 'Code Examples', 'Version History']
    },
    {
        name: 'Analytics Dashboard',
        url: 'analytics.opticalautomation.com',
        description: 'Real-time analytics and performance monitoring for client applications.',
        color: '#EC4899',
        active: false,
        features: ['Real-time Data', 'Custom Reports', 'Performance Metrics', 'Alerts']
    },
    {
        name: 'Development Sandbox',
        url: 'dev.opticalautomation.com',
        description: 'Testing and staging environment for development and QA purposes.',
        color: '#8B5CF6',
        active: true,
        features: ['Staging Environments', 'A/B Testing', 'Beta Features', 'Debug Tools']
    },
    {
        name: 'Learning Platform',
        url: 'learn.opticalautomation.com',
        description: 'Educational resources, courses, and tutorials for web development.',
        color: '#06B6D4',
        active: false,
        features: ['Video Courses', 'Interactive Labs', 'Certifications', 'Community']
    }
];

export default function ProductsPage() {
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
                                <StatusBadge $active={product.active}>
                                    {product.active ? 'Active' : 'Coming Soon'}
                                </StatusBadge>
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
                                    href={`https://${product.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Site < FiExternalLink />
                                </VisitLink >
                            )}
                        </ProductCard >
                    ))}
                </ProductsGrid >

                <ServicesSection>
                    <SectionTitle>Product Services</SectionTitle>
                    <ServicesGrid>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <ServiceIcon>
                                <FiServer />
                            </ServiceIcon>
                            <ServiceTitle>Cloud Hosting</ServiceTitle>
                            <ServiceDesc>High-performance cloud hosting with 99.9% uptime guarantee</ServiceDesc>
                        </ServiceItem>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <ServiceIcon>
                                <FiShield />
                            </ServiceIcon>
                            <ServiceTitle>SSL Certificates</ServiceTitle>
                            <ServiceDesc>Enterprise-grade SSL encryption for all products</ServiceDesc>
                        </ServiceItem>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <ServiceIcon>
                                <FiZap />
                            </ServiceIcon>
                            <ServiceTitle>CDN Integration</ServiceTitle>
                            <ServiceDesc>Global content delivery for lightning-fast load times</ServiceDesc>
                        </ServiceItem>
                        <ServiceItem
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <ServiceIcon>
                                <FiGlobe />
                            </ServiceIcon>
                            <ServiceTitle>DNS Management</ServiceTitle>
                            <ServiceDesc>Advanced DNS configuration and management tools</ServiceDesc>
                        </ServiceItem>
                    </ServicesGrid>
                </ServicesSection>
            </Container >
        </PageWrapper >
    );
}
