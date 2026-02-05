'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiBook,
    FiGamepad,
    FiCheckSquare,
    FiBrain,
    FiBookOpen,
    FiKeyboard,
    FiCircle,
    FiAward,
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

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.25rem;
    max-width: 600px;
    margin: 0 auto;
`;

const Description = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.05rem;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto ${({ theme }) => theme.spacing.xxl};
    text-align: center;
`;

const ActivitiesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ActivityCard = styled(motion.div)`
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

const ActivityIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ $color }) => `${$color}20`};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    svg {
        font-size: 2rem;
        color: ${({ $color }) => $color};
    }
`;

const ActivityTitle = styled.h3`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ActivityDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ActivityLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        gap: ${({ theme }) => theme.spacing.sm};
    }
`;

const activities = [
    {
        id: 'games',
        title: 'Educational Games',
        description: 'Engage with interactive games designed to make learning enjoyable and effective. Perfect for all ages and skill levels.',
        icon: FiGamepad,
        color: '#8B5CF6',
        href: '/learning#games'
    },
    {
        id: 'quizzes',
        title: 'Quizzes',
        description: 'Test your knowledge with interactive quizzes covering a wide range of topics. Track your progress and challenge yourself.',
        icon: FiCheckSquare,
        color: '#10B981',
        href: '/learning#quizzes'
    },
    {
        id: 'memory',
        title: 'Memory Games',
        description: 'Improve your memory and cognitive skills with fun memory exercises and challenges designed to boost retention.',
        icon: FiBrain,
        color: '#F59E0B',
        href: '/learning#memory'
    },
    {
        id: 'reading',
        title: 'Reading Skills',
        description: 'Enhance your reading comprehension and speed with curated reading exercises and engaging content.',
        icon: FiBookOpen,
        color: '#3B82F6',
        href: '/learning#reading'
    },
    {
        id: 'typing',
        title: 'Typing Practice',
        description: 'Master touch typing with interactive lessons and exercises. Improve your speed and accuracy progressively.',
        icon: FiKeyboard,
        color: '#EC4899',
        href: '/learning#typing'
    },
    {
        id: 'connect-dots',
        title: 'Connect the Dots',
        description: 'Develop pattern recognition and problem-solving skills through engaging connect-the-dots puzzles.',
        icon: FiCircle,
        color: '#6366F1',
        href: '/learning#connect-dots'
    }
];

export default function LearningPage() {
    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiBook /> Learning Activities
                    </Title>
                    <Subtitle>Make learning fun with interactive educational activities</Subtitle>
                </HeroSection>

                <Description>
                    Explore our collection of educational games, quizzes, and practice activities designed to make learning engaging and effective. Whether you want to improve your memory, enhance your reading skills, or master typing, we have the perfect activity for you.
                </Description>

                <ActivitiesGrid>
                    {activities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <ActivityCard
                                key={activity.id}
                                id={activity.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ActivityIcon $color={activity.color}>
                                    <Icon />
                                </ActivityIcon>
                                <ActivityTitle>{activity.title}</ActivityTitle>
                                <ActivityDescription>{activity.description}</ActivityDescription>
                                <ActivityLink href={activity.href}>
                                    Learn more <FiTrendingUp />
                                </ActivityLink>
                            </ActivityCard>
                        );
                    })}
                </ActivitiesGrid>
            </Container>
        </PageWrapper>
    );
}
