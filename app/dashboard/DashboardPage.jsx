'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiUser, FiPackage, FiDollarSign, FiEdit, FiLogOut, FiCheckCircle, FiClock } from 'react-icons/fi';
import { softwareData } from '@/lib/softwareData';

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

const Header = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const WelcomeSection = styled(motion.div)`
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    padding: ${({ theme }) => theme.spacing.xxl};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const WelcomeTitle = styled.h1`
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const WelcomeSubtitle = styled.p`
    font-size: 1.125rem;
    opacity: 0.9;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
`;

const StatIcon = styled.div`
    width: 60px;
    height: 60px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme, $color }) => `${$color}20`};
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
`;

const StatInfo = styled.div`
    flex: 1;
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const StatValue = styled.div`
    font-size: 1.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const Section = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.text};
`;

const ActionButton = styled.button`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme, $variant }) =>
        $variant === 'primary' ? theme.colors.gradient :
            $variant === 'danger' ? theme.colors.accent :
                theme.colors.backgroundAlt
    };
    color: ${({ $variant }) => $variant === 'primary' || $variant === 'danger' ? 'white' : 'inherit'};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const SoftwareGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const SoftwareCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px ${({ theme }) => theme.colors.shadow};
    }
`;

const SoftwareName = styled.h3`
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const SoftwareCategory = styled.span`
    font-size: 0.75rem;
    padding: 4px 8px;
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const SoftwareDescription = styled.p`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
`;

const EmptyState = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xxl};
    background: ${({ theme }) => theme.colors.surface};
    border: 2px dashed ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const EmptyStateText = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TierBadge = styled.span`
    display: inline-block;
    padding: 4px 12px;
    background: ${({ theme, $tier }) =>
        $tier === 'gold' ? theme.colors.gradient :
            $tier === 'silver' ? `${theme.colors.primary}80` :
                theme.colors.backgroundAlt
    };
    color: ${({ $tier }) => $tier === 'individual' ? 'inherit' : 'white'};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-weight: 600;
    font-size: 0.875rem;
`;

const AccountInfo = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.md} 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};

    &:last-child {
        border-bottom: none;
    }
`;

const InfoLabel = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
`;

const InfoValue = styled.span`
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
`;

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedApps, setSelectedApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [maxAllowed, setMaxAllowed] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login?redirect=/dashboard');
            return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        const limits = {
            individual: 10,
            silver: 28,
            gold: 40
        };
        setMaxAllowed(limits[parsedUser.subscriptionTier] || 10);

        fetchSelections(token);
    }, [router]);

    const fetchSelections = async (token) => {
        try {
            const response = await fetch('/api/selections', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setSelectedApps(data.selections || []);
            }
        } catch (error) {
            console.error('Error fetching selections:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/');
    };

    const getTierPrice = () => {
        const prices = {
            individual: 0,
            silver: 25,
            gold: 35
        };
        return prices[user?.subscriptionTier] || 0;
    };

    const getSelectedSoftware = () => {
        return softwareData.filter(app => selectedApps.includes(app.id));
    };

    if (loading) {
        return (
            <PageWrapper>
                <Container>
                    <WelcomeTitle>Loading...</WelcomeTitle>
                </Container>
            </PageWrapper>
        );
    }

    const selectedSoftware = getSelectedSoftware();

    return (
        <PageWrapper>
            <Container>
                <Header>
                    <WelcomeSection
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <WelcomeTitle>Welcome back, {user?.name}!</WelcomeTitle>
                        <WelcomeSubtitle>
                            Manage your software subscriptions and selections
                        </WelcomeSubtitle>
                    </WelcomeSection>

                    <StatsGrid>
                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <StatIcon $color="#6366f1">
                                <FiUser />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Subscription Tier</StatLabel>
                                <StatValue>
                                    <TierBadge $tier={user?.subscriptionTier}>
                                        {user?.subscriptionTier?.toUpperCase()}
                                    </TierBadge>
                                </StatValue>
                            </StatInfo>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <StatIcon $color="#10b981">
                                <FiPackage />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Selected Apps</StatLabel>
                                <StatValue>{selectedApps.length} / {maxAllowed}</StatValue>
                            </StatInfo>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <StatIcon $color="#f59e0b">
                                <FiDollarSign />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Annual Cost</StatLabel>
                                <StatValue>${getTierPrice()}</StatValue>
                            </StatInfo>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <StatIcon $color="#8b5cf6">
                                <FiClock />
                            </StatIcon>
                            <StatInfo>
                                <StatLabel>Status</StatLabel>
                                <StatValue style={{ fontSize: '1rem' }}>
                                    {user?.subscriptionStatus === 'trial' ? 'Free Trial' : 'Active'}
                                </StatValue>
                            </StatInfo>
                        </StatCard>
                    </StatsGrid>
                </Header>

                <Section>
                    <SectionHeader>
                        <SectionTitle>Your Selected Software ({selectedSoftware.length})</SectionTitle>
                        <ActionButton
                            $variant="primary"
                            onClick={() => router.push('/select-software')}
                        >
                            <FiEdit />
                            Manage Selections
                        </ActionButton>
                    </SectionHeader>

                    {selectedSoftware.length > 0 ? (
                        <SoftwareGrid>
                            {selectedSoftware.map((software, index) => (
                                <SoftwareCard
                                    key={software.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <SoftwareName>
                                        <FiCheckCircle color="#10b981" />
                                        {software.name}
                                    </SoftwareName>
                                    <SoftwareCategory>{software.category}</SoftwareCategory>
                                    <SoftwareDescription style={{ marginTop: '8px' }}>
                                        {software.description}
                                    </SoftwareDescription>
                                </SoftwareCard>
                            ))}
                        </SoftwareGrid>
                    ) : (
                        <EmptyState>
                            <EmptyStateText>
                                You haven't selected any software yet
                            </EmptyStateText>
                            <ActionButton
                                $variant="primary"
                                onClick={() => router.push('/select-software')}
                            >
                                <FiPackage />
                                Select Software
                            </ActionButton>
                        </EmptyState>
                    )}
                </Section>

                <Section>
                    <SectionHeader>
                        <SectionTitle>Account Information</SectionTitle>
                        <ActionButton
                            $variant="danger"
                            onClick={handleLogout}
                        >
                            <FiLogOut />
                            Logout
                        </ActionButton>
                    </SectionHeader>

                    <AccountInfo
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <InfoRow>
                            <InfoLabel>Client ID</InfoLabel>
                            <InfoValue>{user?.clientId}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Email</InfoLabel>
                            <InfoValue>{user?.email}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Name</InfoLabel>
                            <InfoValue>{user?.name}</InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Subscription Tier</InfoLabel>
                            <InfoValue>
                                <TierBadge $tier={user?.subscriptionTier}>
                                    {user?.subscriptionTier?.toUpperCase()}
                                </TierBadge>
                            </InfoValue>
                        </InfoRow>
                        <InfoRow>
                            <InfoLabel>Status</InfoLabel>
                            <InfoValue>{user?.subscriptionStatus === 'trial' ? 'Free Trial (30 days)' : 'Active'}</InfoValue>
                        </InfoRow>
                    </AccountInfo>
                </Section>
            </Container>
        </PageWrapper>
    );
}
