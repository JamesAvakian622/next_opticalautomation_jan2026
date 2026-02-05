'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    FiCheckSquare,
    FiBrain,
    FiBookOpen,
    FiKeyboard,
    FiCircle,
    FiAward,
    FiHash,
    FiCheck
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
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const Description = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.05rem;
    line-height: 1.8;
    max-width: 800px;
    margin: 0 auto ${({ theme }) => theme.spacing.xxl};
    text-align: center;
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
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

const SoftwareSection = styled.div`
    margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const SoftwareGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.xl} auto;
    max-width: 800px;

    @media(max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
        max-width: 600px;
    }

    @media(max-width: 600px) {
        grid-template-columns: 1fr;
        max-width: 300px;
    }
`;

const CategoryGroup = styled.div`
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(156, 163, 175, 0.15)'};
    border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(156, 163, 175, 0.3)'};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CategoryTitle = styled.h4`
    grid-column: 1 / -1;
    color: ${({ theme }) => theme.mode === 'dark' ? '#ffffff' : '#333333'};
    font-size: 1.1rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(156, 163, 175, 0.3)'};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(156, 163, 175, 0.5)'};
`;

const CategoryItemsList = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.sm};

    @media(max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const SoftwareItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.95rem;
    
    svg {
        color: ${({ theme }) => theme.colors.success};
        font-size: 1.1em;
    }
`;

const activities = [
    {
        id: 'math',
        title: 'Math',
        description: 'Mathematical exercises to strengthen your computational skills and problem-solving abilities.',
        icon: FiHash,
        color: '#8B5CF6'
    },
    {
        id: 'memory',
        title: 'Memory',
        description: 'Memory enhancement games designed to improve retention and cognitive recall abilities.',
        icon: FiBrain,
        color: '#F59E0B'
    },
    {
        id: 'reading',
        title: 'Reading',
        description: 'Reading comprehension exercises to enhance your understanding and speed.',
        icon: FiBookOpen,
        color: '#3B82F6'
    },
    {
        id: 'typing',
        title: 'Typing',
        description: 'Typing practice to improve your speed and accuracy with progressive lessons.',
        icon: FiKeyboard,
        color: '#EC4899'
    },
    {
        id: 'connect-dots',
        title: 'Connect Dots Game',
        description: 'Pattern recognition puzzles to develop visual-spatial reasoning and problem-solving.',
        icon: FiCircle,
        color: '#6366F1'
    },
    {
        id: 'quizzes',
        title: 'Quizzes',
        description: 'Interactive quizzes covering multiple subjects to test and expand your knowledge.',
        icon: FiCheckSquare,
        color: '#10B981'
    }
];

const integratedSoftware = {
    'Business & Finance': [
        'BistroRestaurant',
        'BusinessTracker',
        'CreativeTracker',
        'DollarDimeStore',
        'InvestmentTracker',
        'RealEstatePortal'
    ],
    'Education & Learning': [
        'LearnSkills365.com',
        'Quiz System'
    ],
    'Entertainment & Leisure': [
        'A Snowy Christmas',
        'CorvetteQuiz',
        'GoodDayMusic',
        'GuitarBranded',
        'SportsTracker'
    ],
    'Personal Productivity': [
        'MyDateBook',
        'Photo Albums',
        'RecipeLists',
        'TaskManager',
        'Teleprompter'
    ],
    'Communication & Social': [
        'Hi5',
        'MyTelephoneBook',
        'TechnologyAndTimes'
    ],
    'Health': [
        'Fitness Tracker',
        'Health Tracker'
    ]
};

export default function LearnSkills365Page() {
    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiAward /> LearnSkills365
                    </Title>
                    <Subtitle>Comprehensive Educational Learning Platform</Subtitle>
                </HeroSection>

                <Description>
                    LearnSkills365 is a comprehensive educational platform designed to make learning engaging, effective, and fun. Our integrated suite of learning activities helps you develop essential skills in mathematics, memory, reading, typing, and critical thinking through interactive exercises and games.
                </Description>

                <SectionTitle>Integrated Learning Activities</SectionTitle>

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
                            </ActivityCard>
                        );
                    })}
                </ActivitiesGrid>

                <SoftwareSection>
                    <SectionTitle>Integrated Software Titles</SectionTitle>
                    <SoftwareGrid>
                        {Object.entries(integratedSoftware).map(([category, items]) => (
                            <CategoryGroup key={category}>
                                <CategoryTitle>{category}</CategoryTitle>
                                <CategoryItemsList>
                                    {items.map((title) => (
                                        <SoftwareItem key={title}>
                                            <FiCheck /> {title}
                                        </SoftwareItem>
                                    ))}
                                </CategoryItemsList>
                            </CategoryGroup>
                        ))}
                    </SoftwareGrid>
                </SoftwareSection>
            </Container>
        </PageWrapper>
    );
}
