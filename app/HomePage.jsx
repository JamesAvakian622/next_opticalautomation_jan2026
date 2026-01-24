'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import InfoCards from '@/components/InfoCards';
import {
    FiArrowRight,
    FiCode,
    FiServer,
    FiSmartphone,
    FiZap,
    FiShield,
    FiTrendingUp,
    FiGrid,
    FiCpu,
    FiGlobe,
    FiFileText
} from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
`;

// Hero Section
const HeroSection = styled.section`
    min-height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
            ellipse at 50% 50%,
            ${({ theme }) => `${theme.colors.primary}15`} 0%,
            transparent 70%
        );
    }
`;

const HeroContent = styled.div`
    max-width: 1200px;
    margin: 0;
    text-align: left;
    position: relative;
    z-index: 1;
`;

const HeroHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};

    @media (max-width: 768px) {
        gap: ${({ theme }) => theme.spacing.md};
    }
`;

const HeroLogo = styled(motion.div)`
    width: 120px;
    height: 120px;
    position: relative;
    border-radius: 0;
    overflow: hidden;
    box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 80px;
        height: 80px;
    }
`;

const HeroTitle = styled(motion.h1)`
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 0;
    line-height: 1.1;

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }

    @media (max-width: 480px) {
        font-size: 2rem;
    }
`;

const GradientText = styled.span`
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const HeroSubtitle = styled(motion.p)`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 0 ${({ theme }) => theme.spacing.xl};
    line-height: 1.7;

    @media (max-width: 768px) {
        font-size: 1rem;
    }
`;

const HeroButtons = styled(motion.div)`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    justify-content: flex-start;
    flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-3px);
        box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }
`;

const SecondaryButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => `${theme.colors.primary}10`};
    }
`;

// Features Section
const FeaturesSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.surface};
`;

const SectionContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const SectionHeader = styled.div`
    text-align: left;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled(motion.h2)`
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const SectionSubtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0;
`;

const FeaturesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
`;

const FeatureCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.background};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    transition: all 0.3s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        transform: translateY(-8px);
        box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
    }
`;

const FeatureIcon = styled.div`
    width: 60px;
    height: 60px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ $color }) => `${$color}20`};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};

    svg {
        font-size: 1.75rem;
        color: ${({ $color }) => $color};
    }
`;

const FeatureTitle = styled.h3`
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
`;

const FeatureDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    line-height: 1.7;
`;

// Quick Links Section
const QuickLinksSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
`;

const QuickLinksGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
`;

const QuickLinkCard = styled(motion(Link))`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    transition: all 0.3s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        transform: translateX(8px);
        box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }
`;

const QuickLinkIcon = styled.div`
    width: 56px;
    height: 56px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme }) => theme.colors.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    svg {
        font-size: 1.5rem;
        color: white;
    }
`;

const QuickLinkContent = styled.div`
    flex: 1;
`;

const QuickLinkTitle = styled.h3`
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const QuickLinkDesc = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
`;

const QuickLinkArrow = styled.div`
    color: ${({ theme }) => theme.colors.primary};
    transition: transform 0.3s ease;

    ${QuickLinkCard}:hover & {
        transform: translateX(4px);
    }
`;

// Stats Section
const StatsSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.gradient};
`;

const StatsGrid = styled.div`
    max-width: 1000px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    text-align: left;
`;

const StatItem = styled(motion.div)`
    color: white;
`;

const StatValue = styled.div`
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const StatLabel = styled.div`
    font-size: 1rem;
    opacity: 0.9;
`;

const features = [
    {
        icon: FiCode,
        title: 'Modern Development',
        description: 'Cutting-edge development using React, Next.js, and the full MERN stack to build fast, scalable, and future‑ready web applications. From dynamic frontends to robust backend architectures, every project is engineered with modern best practices and long-term maintainability in mind.',
        color: '#6366f1'
    },
    {
        icon: FiZap,
        title: 'AI-Assisted',
        description: 'Intelligent development workflows powered by AI tools to accelerate delivery, improve code quality, and streamline complex tasks. This means faster iterations, cleaner architecture, and smarter solutions tailored to your business needs.',
        color: '#F59E0B'
    },
    {
        icon: FiSmartphone,
        title: 'Responsive Design',
        description: 'Pixel-perfect, mobile‑first interfaces that adapt beautifully to any screen size. Whether on phones, tablets, or desktops, your users enjoy a seamless, intuitive experience designed for maximum engagement.',
        color: '#EC4899'
    },
    {
        icon: FiServer,
        title: 'Full-Stack Solutions',
        description: 'Complete end‑to‑end development covering frontend, backend, databases, and API integrations. From concept to deployment, every layer of your application is built to work together smoothly and efficiently.',
        color: '#10B981'
    },
    {
        icon: FiShield,
        title: 'Secure & Reliable',
        description: 'Industry‑standard security practices, hardened infrastructure, and reliable deployment pipelines that protect your data and keep your application running smoothly. Peace of mind is built into every project.',
        color: '#EF4444'
    },
    {
        icon: FiTrendingUp,
        title: 'SEO Optimized',
        description: 'Search‑engine‑friendly architecture, clean semantic markup, and performance‑focused optimizations that help your site rank higher and attract more organic traffic from day one.',
        color: '#06B6D4'
    }
];

const quickLinks = [
    {
        href: '/portfolio',
        icon: FiGrid,
        title: 'Portfolio',
        description: 'View our work'
    },
    {
        href: '/tech',
        icon: FiCpu,
        title: 'Technology',
        description: 'Our tech stack'
    },
    {
        href: '/products',
        icon: FiGlobe,
        title: 'Products',
        description: 'Our platforms'
    },
    {
        href: '/documents',
        icon: FiFileText,
        title: 'Documents',
        description: 'Resources & guides'
    },
    {
        href: '/forgot-password',
        icon: FiShield,
        title: 'Password Reset',
        description: 'Recover your account'
    }
];

export default function HomePage() {
    return (
        <PageWrapper>
            <HeroCarousel />
            <HeroSection>
                <HeroContent>
                    <HeroHeader>
                        <HeroLogo
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </HeroLogo>

                        <HeroTitle
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <GradientText>Optical Automation</GradientText>
                        </HeroTitle>
                    </HeroHeader>

                    <HeroSubtitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        A software development production company that uses Artificial Intelligence
                        first with SEO Optimization and Full Stack performance. Transform your
                        ideas into powerful digital experiences with our talent and experience.
                    </HeroSubtitle>

                    <HeroButtons
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <PrimaryButton href="/portfolio">
                            View Our Work <FiArrowRight />
                        </PrimaryButton>
                        <SecondaryButton href="/support">
                            Get In Touch
                        </SecondaryButton>
                    </HeroButtons>
                </HeroContent>
            </HeroSection>

            <FeaturesSection>
                <SectionContainer>
                    <SectionHeader>
                        <SectionTitle
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            What We Offer
                        </SectionTitle>
                        <SectionSubtitle>
                            From concept to deployment, we provide modern Agentic AI and SEO Optimized comprehensive website information technology development deployment services.
                        </SectionSubtitle>
                    </SectionHeader>

                    <FeaturesGrid>
                        {features.map((feature, index) => (
                            <FeatureCard
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <FeatureIcon $color={feature.color}>
                                    <feature.icon />
                                </FeatureIcon>
                                <FeatureTitle>{feature.title}</FeatureTitle>
                                <FeatureDescription>{feature.description}</FeatureDescription>
                            </FeatureCard>
                        ))}
                    </FeaturesGrid>
                </SectionContainer>
            </FeaturesSection>

            <StatsSection>
                <StatsGrid>
                    <StatItem
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <StatValue>36+</StatValue>
                        <StatLabel>Projects Completed</StatLabel>
                    </StatItem>
                    <StatItem
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <StatValue>99%</StatValue>
                        <StatLabel>Client Satisfaction</StatLabel>
                    </StatItem>
                    <StatItem
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <StatValue>24/7</StatValue>
                        <StatLabel>Support Available</StatLabel>
                    </StatItem>
                    <StatItem
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <StatValue>6+</StatValue>
                        <StatLabel>Years Experience</StatLabel>
                    </StatItem>
                </StatsGrid>
            </StatsSection>

            <QuickLinksSection>
                <SectionContainer>
                    <SectionHeader>
                        <SectionTitle
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Explore More
                        </SectionTitle>
                        <SectionSubtitle>
                            Discover our full range of services and resources.
                        </SectionSubtitle>
                    </SectionHeader>

                    <QuickLinksGrid>
                        {quickLinks.map((link, index) => (
                            <QuickLinkCard
                                key={link.href}
                                href={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <QuickLinkIcon>
                                    <link.icon />
                                </QuickLinkIcon>
                                <QuickLinkContent>
                                    <QuickLinkTitle>{link.title}</QuickLinkTitle>
                                    <QuickLinkDesc>{link.description}</QuickLinkDesc>
                                </QuickLinkContent>
                                <QuickLinkArrow>
                                    <FiArrowRight />
                                </QuickLinkArrow>
                            </QuickLinkCard>
                        ))}
                    </QuickLinksGrid>
                </SectionContainer>
            </QuickLinksSection>
            <InfoCards />
        </PageWrapper>
    );
}
