'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiHeart, FiExternalLink, FiTrash2, FiArrowRight } from 'react-icons/fi';
import { useFavorites } from '@/contexts/FavoritesContext';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.div`
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

    svg {
        background: ${({ theme }) => theme.colors.gradient};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        fill: currentColor;
    }

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
`;

const FavoritesGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`;

const FavoriteCard = styled(motion.div)`
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

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardIcon = styled.div`
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

const RemoveButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.error};
        color: white;
    }
`;

const CardTitle = styled.h3`
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text};
`;

const CardCategory = styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
`;

const CardDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    margin: ${({ theme }) => theme.spacing.md} 0;
    line-height: 1.6;
`;

const CardActions = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ActionLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: ${({ $primary, theme }) =>
        $primary ? theme.colors.gradient : theme.colors.backgroundAlt};
    color: ${({ $primary, theme }) => ($primary ? 'white' : theme.colors.text)};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }

    svg {
        font-size: 0.875rem;
    }
`;

const EmptyState = styled(motion.div)`
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xxl};
`;

const EmptyIcon = styled.div`
    width: 80px;
    height: 80px;
    margin: 0 auto ${({ theme }) => theme.spacing.xl};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 2.5rem;
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const EmptyTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
`;

const EmptyText = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const BrowseButton = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-weight: 600;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
    }
`;

const ClearAllButton = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.error};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.875rem;
    font-weight: 500;
    margin-left: auto;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
    }
`;

const HeaderActions = styled.div`
    display: flex;
    justify-content: center;
    margin-top: ${({ theme }) => theme.spacing.lg};
`;

export default function FavoritesPage() {
    const { favorites, removeFavorite, clearFavorites, isLoaded } = useFavorites();

    if (!isLoaded) {
        return (
            <PageWrapper>
                <Container>
                    <Header>
                        <Title>Loading...</Title>
                    </Header>
                </Container>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Container>
                <Header>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiHeart /> My Favorites
                    </Title>
                    <Subtitle>
                        {favorites.length > 0
                            ? `You have ${favorites.length} saved project${favorites.length > 1 ? 's' : ''}`
                            : 'Save your favorite projects for quick access'}
                    </Subtitle>
                    {favorites.length > 0 && (
                        <HeaderActions>
                            <ClearAllButton onClick={clearFavorites}>
                                <FiTrash2 /> Clear All
                            </ClearAllButton>
                        </HeaderActions>
                    )}
                </Header>

                {favorites.length > 0 ? (
                    <FavoritesGrid
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {favorites.map((item) => (
                            <FavoriteCard
                                key={item.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                <CardHeader>
                                    <CardIcon $color={item.color || '#6366f1'}>
                                        <FiHeart />
                                    </CardIcon>
                                    <RemoveButton
                                        onClick={() => removeFavorite(item.id)}
                                        title="Remove from favorites"
                                    >
                                        <FiTrash2 size={16} />
                                    </RemoveButton>
                                </CardHeader>
                                <CardTitle>{item.title}</CardTitle>
                                <CardCategory>{item.category}</CardCategory>
                                <CardDescription>{item.description}</CardDescription>
                                <CardActions>
                                    <ActionLink href={`/portfolio/${item.id}`} $primary>
                                        View Details <FiArrowRight />
                                    </ActionLink>
                                    {item.website && (
                                        <ActionLink
                                            href="https://6961af51fdbe659fc8f241fa--illustrious-baklava-da0cd7.netlify.app"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FiExternalLink /> Visit Site
                                        </ActionLink>
                                    )}
                                </CardActions>
                            </FavoriteCard>
                        ))}
                    </FavoritesGrid>
                ) : (
                    <EmptyState
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <EmptyIcon>
                            <FiHeart />
                        </EmptyIcon>
                        <EmptyTitle>No Favorites Yet</EmptyTitle>
                        <EmptyText>
                            Browse our portfolio and click the heart icon to save projects you love!
                        </EmptyText>
                        <BrowseButton href="/portfolio">
                            Browse Portfolio <FiArrowRight />
                        </BrowseButton>
                    </EmptyState>
                )}
            </Container>
        </PageWrapper>
    );
}
