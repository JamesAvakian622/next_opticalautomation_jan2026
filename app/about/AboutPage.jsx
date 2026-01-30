'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    FiTarget,
    FiHeart,
    FiAward,
    FiUsers,
    FiTrendingUp
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
    text-align: left;
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

const TitleIcon = styled.span`
font-size: 2.5rem;
background: ${({ theme }) => theme.colors.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;

@media(max-width: 768px) {
    font-size: 1.75rem;
}
`;

const Subtitle = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 1.125rem;
max-width: 600px;
margin: 0;
`;

/* Mission Statement Section */
const MissionSection = styled(motion.section)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xxl};
margin-bottom: ${({ theme }) => theme.spacing.xxl};
position: relative;
overflow: hidden;

    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme.colors.gradient};
}

@media(max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl};
}
`;

const MissionTitle = styled.h2`
font-size: 2rem;
margin-bottom: ${({ theme }) => theme.spacing.xl};
background: ${({ theme }) => theme.colors.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
display: flex;
align-items: center;
gap: ${({ theme }) => theme.spacing.md};

    svg {
    color: ${({ theme }) => theme.colors.primary};
}

@media(max-width: 768px) {
    font-size: 1.5rem;
}
`;

const MissionParagraph = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 1.1rem;
line-height: 1.8;
margin-bottom: ${({ theme }) => theme.spacing.lg};

    &: last-child {
    margin-bottom: 0;
}

@media(max-width: 768px) {
    font-size: 1rem;
    line-height: 1.7;
}
`;

/* Core Values Section */
const ValuesSection = styled.section`
margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
font-size: 2rem;
text-align: left;
margin-bottom: ${({ theme }) => theme.spacing.xl};
background: ${({ theme }) => theme.colors.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
`;

const ValuesGrid = styled.div`
display: grid;
grid-template-columns: repeat(2, 1fr);
gap: ${({ theme }) => theme.spacing.xl};

@media(max-width: 768px) {
    grid-template-columns: 1fr;
}
`;

const ValueCard = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xl};
transition: all 0.3s ease;
position: relative;
overflow: hidden;

    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $color }) => $color};
    transform: scaleX(0);
    transition: transform 0.3s ease;
}

    &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};

        &::before {
        transform: scaleX(1);
    }
}
`;

const ValueIcon = styled.div`
width: 60px;
height: 60px;
border-radius: 0;
background: ${({ $color }) => `${$color}20`};
display: flex;
align-items: center;
justify-content: center;
margin-bottom: ${({ theme }) => theme.spacing.md};

    svg {
    font-size: 1.75rem;
    color: ${({ $color }) => $color};
}
`;

const ValueTitle = styled.h3`
font-size: 1.25rem;
color: ${({ theme }) => theme.colors.text};
margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ValueDescription = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 0.95rem;
line-height: 1.6;
`;

const coreValues = [
    {
        title: 'Our Mission',
        description: 'Our mission is to deliver innovative solutions that empower both businesses and individuals to reach their full potential. We harness cutting‑edge technology not just to solve problems, but to open new possibilities—helping our customers work smarter, move faster, and achieve meaningful results. Everything we build is designed with purpose, clarity, and long‑term value in mind, ensuring that our impact extends far beyond the tools we create.',
        icon: FiTarget,
        color: '#6366f1'
    },
    {
        title: 'Our Values',
        description: 'Our values form the foundation of every decision we make. Integrity guides how we operate, transparency shapes how we communicate, and a customer‑first mindset drives how we build and support our products. These principles are not slogans—they are commitments. They define our culture, influence our strategy, and ensure that we remain accountable to the people who trust us.',
        icon: FiHeart,
        color: '#EC4899'
    },
    {
        title: 'Excellence',
        description: 'Excellence is the standard we hold ourselves to in every aspect of our work. From the smallest detail in a user interface to the architecture behind our most complex systems, we refuse to compromise on quality. We believe that excellence is not a single achievement but a continuous pursuit—one that pushes us to refine, improve, and innovate with every project we undertake.',
        icon: FiAward,
        color: '#10B981'
    },
    {
        title: 'Community',
        description: 'We are dedicated to building a vibrant community of people who share our vision for a more connected, collaborative, and forward‑thinking world. This community is more than an audience—it is a network of creators, innovators, and problem‑solvers who inspire and support one another. By fostering meaningful relationships and encouraging open exchange, we aim to create an environment where everyone can grow, contribute, and thrive.',
        icon: FiUsers,
        color: '#F59E0B'
    }
];

export default function AboutPage() {
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
                        About Us
                    </Title>
                    <Subtitle>
                        Discover our mission and the artistic and scientific values that drive everything we do.
                    </Subtitle>
                </HeroSection>

                {/* Mission Statement */}
                <MissionSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <MissionTitle>
                        <FiTarget /> Our Mission Statement
                    </MissionTitle>
                    <MissionParagraph>
                        Born from a bold vision to reshape the digital landscape, we began as a small startup with big ambitions. Equipped with powerful tools—including the Office Suite, GitHub Copilot, and Google Antigravity AI Agentic Assistance—we steadily evolved into a trusted technology partner for businesses around the world.
                    </MissionParagraph>
                    <MissionParagraph>
                        Our roots run deep in technical writing and innovation. Over the years, we've contributed to electro‑mechanical eye and eyeglass designs, authored successful Small Business Innovation Grant proposals, and secured U.S. patents and trademarks. The journey has been long, challenging, and incredibly rewarding.
                    </MissionParagraph>
                    <MissionParagraph>
                        Driven by academic achievement, self‑learning, and an unwavering commitment to quality, we now build both single‑purpose applications and full‑scale information systems. Our expertise spans secure websites, MERN‑stack database platforms, and integrated MERN web‑and‑mobile solutions that share unified data environments.
                    </MissionParagraph>
                    <MissionParagraph>
                        Today, we continue to push boundaries and explore new technological frontiers—always keeping our customers at the center of every decision. Because we've not only followed the evolution of application development but helped lead it, we approach every project as an opportunity to create something meaningful, impactful, and truly remarkable.
                    </MissionParagraph>
                </MissionSection>

                {/* Core Values */}
                <ValuesSection>
                    <SectionTitle>Core Values</SectionTitle>
                    <ValuesGrid>
                        {coreValues.map((value, index) => (
                            <ValueCard
                                key={value.title}
                                $color={value.color}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                            >
                                <ValueIcon $color={value.color}>
                                    <value.icon />
                                </ValueIcon>
                                <ValueTitle>{value.title}</ValueTitle>
                                <ValueDescription>{value.description}</ValueDescription>
                            </ValueCard>
                        ))}
                    </ValuesGrid>
                </ValuesSection>
            </Container>
        </PageWrapper>
    );
}
