'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiHome,
    FiGrid,
    FiCpu,
    FiGlobe,
    FiFileText,
    FiHeart,
    FiUser,
    FiPhone,
    FiShield,
    FiLock,
    FiBookOpen,
    FiMap,
    FiAward
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
    max-width: 1400px;
    margin: 0 auto;
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    width: 100%;
    justify-content: center;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
    font-size: 1.125rem;
`;

const SectionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    max-width: 1400px;
    margin: 0 auto;

    @media (max-width: 1200px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const Section = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionIcon = styled.div`
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme }) => theme.colors.gradient};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 1.5rem;
        color: white;
    }
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
`;

const LinksList = styled.ul`
    list-style: none;
`;

const LinkItem = styled.li`
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const SiteLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.backgroundAlt};
        color: ${({ theme }) => theme.colors.primary};
        transform: translateX(4px);
    }

    svg {
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const siteMapData = [
    {
        title: 'Main Pages',
        icon: FiHome,
        links: [
            { href: '/', label: 'Home', icon: FiHome },
            { href: '/about', label: 'About Us', icon: FiAward },
            { href: '/portfolio', label: 'Portfolio', icon: FiGrid },
            { href: '/domains', label: 'Domain Portfolio', icon: FiGlobe },
            { href: '/tech', label: 'Technology', icon: FiCpu },
            { href: '/products', label: 'Products', icon: FiGlobe },
            { href: '/pricing', label: 'Pricing', icon: FiGlobe },
            { href: '/documents', label: 'Documents', icon: FiFileText }
        ]
    },
    {
        title: 'User Account',
        icon: FiUser,
        links: [
            { href: '/login', label: 'Login / Register', icon: FiUser },
            { href: '/profile', label: 'User Profile', icon: FiUser },
            { href: '/favorites', label: 'My Favorites', icon: FiHeart }
        ]
    },
    {
        title: 'Support',
        icon: FiPhone,
        links: [
            { href: '/support', label: 'Technical Support', icon: FiPhone },
            { href: '/support#faq', label: 'FAQ', icon: FiBookOpen },
            { href: '/support#contact', label: 'Contact Us', icon: FiPhone }
        ]
    },
    {
        title: 'Legal',
        icon: FiShield,
        links: [
            { href: '/terms', label: 'Terms of Use', icon: FiShield },
            { href: '/privacy', label: 'Privacy Policy', icon: FiLock },
            { href: '/content-policy', label: 'Content Policy', icon: FiBookOpen },
            { href: '/trademarks', label: 'Trademarks', icon: FiAward },
            { href: '/sitemap', label: 'Site Map', icon: FiMap }
        ]
    }
];

export default function SitemapPage() {
    return (
        <PageWrapper>
            <Container>
                <Title
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <FiMap /> Site Map
                </Title>
                <Subtitle>
                    Navigate all pages and sections of the Optical Automation website
                </Subtitle>

                <SectionsGrid>
                    {siteMapData.map((section, index) => (
                        <Section
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <SectionHeader>
                                <SectionIcon>
                                    <section.icon />
                                </SectionIcon>
                                <SectionTitle>{section.title}</SectionTitle>
                            </SectionHeader>
                            <LinksList>
                                {section.links.map((link) => (
                                    <LinkItem key={link.href}>
                                        <SiteLink href={link.href}>
                                            <link.icon />
                                            {link.label}
                                        </SiteLink>
                                    </LinkItem>
                                ))}
                            </LinksList>
                        </Section>
                    ))}
                </SectionsGrid>
            </Container>
        </PageWrapper>
    );
}
