'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiMonitor,
    FiFolder,
    FiBookOpen,
    FiVideo,
    FiLink,
    FiLayout,
    FiMousePointer,
    FiTool,
    FiDatabase,
    FiArrowRight
} from 'react-icons/fi';

const InfoSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundAlt};
`;

const SectionContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const SectionSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.25rem;
  max-width: 800px;
  margin: 0 auto;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
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
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
    border-color: ${({ theme }) => theme.colors.primary};
    
    &::before {
      transform: scaleX(1);
    }
  }
`;

const IconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ theme, $color }) => $color ? `${$color}15` : `${theme.colors.primary}15`};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  svg {
    font-size: 1.75rem;
    color: ${({ theme, $color }) => $color || theme.colors.primary};
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
`;

const CardDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex: 1;
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 1.125rem;
  transition: all 0.2s ease;
  
  &:hover {
    gap: 12px;
    opacity: 0.8;
  }
`;

const infoItems = [
    {
        icon: FiMonitor,
        title: 'DeskView Apps',
        description: 'Organize your personal and business life with powerful desktop applications, including MyDeskView, Personal Organizer, and Business Organizer.',
        href: '/products',
        color: '#3b82f6'
    },
    {
        icon: FiFolder,
        title: 'Media Management',
        description: 'Manage photo albums, music collections, and multimedia content effortlessly within your unified digital space.',
        href: '/products',
        color: '#ec4899'
    },
    {
        icon: FiBookOpen,
        title: 'Learning Tools',
        description: 'Interactive quizzes and flash cards to enhance your learning experience and knowledge retention.',
        href: '/products',
        color: '#f59e0b'
    },
    {
        icon: FiVideo,
        title: 'Teleprompter',
        description: 'Professional teleprompter with customizable speed and display options for presentations and video creation.',
        href: '/products',
        color: '#ef4444'
    },
    {
        icon: FiLink,
        title: 'Link Organization',
        description: 'Keep your important resources organized and accessible with advanced link management and dual-column layouts.',
        href: '/products',
        color: '#8b5cf6'
    },
    {
        icon: FiLayout,
        title: 'Modern Design Solutions',
        description: 'Websites that adapt seamlessly to different screen sizes and devices, providing a premium user experience.',
        href: '/tech',
        color: '#06b6d4'
    },
    {
        icon: FiMousePointer,
        title: 'Intuitive Operation',
        description: 'Software that feels natural from the first click, designed to flow with your expectations and enhance efficiency.',
        href: '/tech',
        color: '#10b981'
    },
    {
        icon: FiTool,
        title: 'Practical Information',
        description: 'Access essential tools and resources designed to simplify everyday tasks and decision-making.',
        href: '/documents',
        color: '#6366f1'
    },
    {
        icon: FiDatabase,
        title: 'Record Keeping',
        description: 'Maintain comprehensive records and documentation with organized storage and easy retrieval systems.',
        href: '/documents',
        color: '#4b5563'
    }
];

const InfoCards = () => {
    return (
        <InfoSection>
            <SectionContainer>
                <SectionHeader>
                    <SectionTitle
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Digital Solutions & Services
                    </SectionTitle>
                    <SectionSubtitle>
                        Explore our diverse range of specialized software and professional development tools.
                    </SectionSubtitle>
                </SectionHeader>

                <InfoGrid>
                    {infoItems.map((item, index) => (
                        <InfoCard
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <IconWrapper $color={item.color}>
                                <item.icon />
                            </IconWrapper>
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription>{item.description}</CardDescription>
                            <CardLink href={item.href}>
                                Explore <FiArrowRight />
                            </CardLink>
                        </InfoCard>
                    ))}
                </InfoGrid>
            </SectionContainer>
        </InfoSection>
    );
};

export default InfoCards;
