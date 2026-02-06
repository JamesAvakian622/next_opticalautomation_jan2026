'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiCheck, FiExternalLink } from 'react-icons/fi';
import { softwareData, titleToSlug } from '@/lib/softwareData';

const PageWrapper = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    padding-top: 80px;
`;

const Container = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const BackButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    transition: all 0.2s ease;

    &:hover {
        gap: 12px;
    }
`;

const HeroSection = styled(motion.div)`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled.h1`
    font-size: 3rem;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
`;

const NetworkBadge = styled(motion.div)`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const NetworkTitle = styled.h2`
    color: ${({ theme }) => theme.colors.text};
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const NetworkSubtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
`;

const ImagePlaceholder = styled(motion.div)`
    width: 100%;
    height: 300px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${({ theme }) => theme.spacing.xxl} 0;
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
`;

const PlaceholderText = styled.span`
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    opacity: 0.8;
`;

const ContentSection = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xxl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Description = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const FeaturesTitle = styled.h3`
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeaturesList = styled.ul`
    list-style: none;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const FeatureItem = styled.li`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textSecondary};

    svg {
        color: ${({ theme }) => theme.colors.success};
        flex-shrink: 0;
    }
`;

const VisitButton = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px ${({ theme }) => theme.colors.shadow};
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.xl};
    flex-wrap: wrap;
`;

export default function SoftwareDetailPage({ slug }) {
    const software = softwareData[slug];

    if (!software) {
        return (
            <PageWrapper>
                <Container>
                    <BackButton href="/deskview">
                        <FiArrowLeft /> Back to DeskView
                    </BackButton>
                    <Title>Software Not Found</Title>
                    <Description>The requested software could not be found.</Description>
                </Container>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Container>
                <BackButton href="/deskview">
                    <FiArrowLeft /> Back to DeskView
                </BackButton>

                <NetworkBadge
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <NetworkTitle>MyDeskView Series</NetworkTitle>
                    <NetworkSubtitle>A Software Application Integration</NetworkSubtitle>
                </NetworkBadge>

                <HeroSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Title>{software.title}</Title>
                    <Subtitle>Excells in {software.category}</Subtitle>
                </HeroSection>

                <ImagePlaceholder
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <PlaceholderText>{software.title}</PlaceholderText>
                </ImagePlaceholder>

                <ContentSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <Description>{software.description}</Description>

                    <FeaturesTitle>Key Features</FeaturesTitle>
                    <FeaturesList>
                        {software.features.map((feature) => (
                            <FeatureItem key={feature}>
                                <FiCheck /> {feature}
                            </FeatureItem>
                        ))}
                    </FeaturesList>

                    <ButtonContainer>
                        <VisitButton
                            href="https://mydeskview.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit MyDeskView.com <FiExternalLink />
                        </VisitButton>
                        <VisitButton
                            href="http://www.GoodDayMusic.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GoodDayMusic.com <FiExternalLink />
                        </VisitButton>
                    </ButtonContainer>
                </ContentSection>
            </Container>
        </PageWrapper>
    );
}
