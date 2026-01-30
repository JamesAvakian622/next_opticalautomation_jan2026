'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiX, FiSave, FiAlertCircle, FiCheckCircle, FiHome, FiCreditCard } from 'react-icons/fi';
import { softwareByCategory, categories } from '@/lib/softwareData';
import { useRouter } from 'next/navigation';

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

const Header = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
    font-size: 2.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const TierBadge = styled(motion.div)`
    display: inline-block;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme, $tier }) =>
        $tier === 'gold' ? theme.colors.gradient :
            $tier === 'silver' ? `${theme.colors.primary}80` :
                theme.colors.backgroundAlt
    };
    color: ${({ $tier }) => $tier === 'individual' ? 'inherit' : 'white'};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-weight: 600;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SelectionCounter = styled(motion.div)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.surface};
    border: 2px solid ${({ theme, $isLimit }) => $isLimit ? theme.colors.accent : theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const CounterText = styled.div`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};

    span {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const ActionButtons = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
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

    &:hover:not(:disabled) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const CategorySection = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CategoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-bottom: ${({ theme }) => theme.spacing.md};
    border-bottom: 2px solid ${({ theme }) => theme.colors.border};
`;

const CategoryTitle = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
`;

const CategoryCount = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
`;

const SoftwareGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const SoftwareCard = styled(motion.div)`
    background: ${({ theme, $selected }) =>
        $selected ? `${theme.colors.primary}10` : theme.colors.backgroundAlt
    };
    border: 2px solid ${({ theme, $selected }) =>
        $selected ? theme.colors.primary : theme.colors.border
    };
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.md};
    cursor: ${({ $disabled }) => $disabled ? 'not-allowed' : 'pointer'};
    opacity: ${({ $disabled }) => $disabled ? 0.5 : 1};
    transition: all 0.3s ease;

    &:hover:not([disabled]) {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Checkbox = styled.div`
    width: 24px;
    height: 24px;
    border: 2px solid ${({ theme, $checked }) =>
        $checked ? theme.colors.primary : theme.colors.border
    };
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    background: ${({ theme, $checked }) =>
        $checked ? theme.colors.primary : 'transparent'
    };
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: all 0.3s ease;

    svg {
        color: white;
        font-size: 16px;
    }
`;

const SoftwareInfo = styled.div`
    flex: 1;
`;

const SoftwareName = styled.h3`
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SoftwareDescription = styled.p`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FeaturesList = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const FeatureTag = styled.li`
    font-size: 0.75rem;
    padding: 2px 8px;
    background: ${({ theme }) => theme.colors.primary}20;
    color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const SaveStatus = styled(motion.div)`
    position: fixed;
    bottom: ${({ theme }) => theme.spacing.xl};
    right: ${({ theme }) => theme.spacing.xl};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme, $success }) =>
        $success ? theme.colors.success : theme.colors.accent
    };
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    z-index: 1000;
`;

const PriceSummary = styled(motion.div)`
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    padding: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    margin-top: ${({ theme }) => theme.spacing.xl};
    text-align: center;
`;

const PriceRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${({ theme }) => theme.spacing.sm} 0;
    border-bottom: ${({ $total }) => $total ? '2px solid rgba(255,255,255,0.3)' : 'none'};
    margin-bottom: ${({ $total, theme }) => $total ? theme.spacing.md : 0};
    font-size: ${({ $total }) => $total ? '1.5rem' : '1rem'};
    font-weight: ${({ $total }) => $total ? '700' : '400'};
`;

export default function SelectSoftwarePage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [selectedApps, setSelectedApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [maxAllowed, setMaxAllowed] = useState(0);

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (!token || !userData) {
            router.push('/login?redirect=/select-software');
            return;
        }

        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);

        // Calculate max allowed based on tier
        const limits = {
            individual: 10,
            silver: 28,
            gold: 40
        };
        setMaxAllowed(limits[parsedUser.subscriptionTier] || 10);

        // Fetch existing selections
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

    const toggleApp = (appId) => {
        if (selectedApps.includes(appId)) {
            setSelectedApps(selectedApps.filter(id => id !== appId));
        } else {
            // In Store mode, we allow selecting more than the limit, 
            // the dashboard will handle tier upgrades or charges.
            setSelectedApps([...selectedApps, appId]);
        }
    };

    const selectAll = () => {
        const allAppIds = Object.values(softwareByCategory)
            .flat()
            .map(app => app.id);
        setSelectedApps(allAppIds);
    };

    const clearAll = () => {
        setSelectedApps([]);
    };

    const saveSelections = async () => {
        setSaving(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/selections', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ selectedApps })
            });

            if (response.ok) {
                setSaveStatus({ success: true, message: 'Selections saved successfully!' });
                setTimeout(() => setSaveStatus(null), 3000);
            } else {
                const error = await response.json();
                setSaveStatus({ success: false, message: error.error || 'Failed to save' });
                setTimeout(() => setSaveStatus(null), 3000);
            }
        } catch (error) {
            setSaveStatus({ success: false, message: 'Error saving selections' });
            setTimeout(() => setSaveStatus(null), 3000);
        } finally {
            setSaving(false);
        }
    };

    const getTierDetails = (count) => {
        if (count >= 21) return { tier: 'gold', label: 'GOLD TIER' };
        if (count >= 11) return { tier: 'silver', label: 'SILVER TIER' };
        return { tier: 'individual', label: 'INDIVIDUAL TIER' };
    };

    const currentTier = getTierDetails(selectedApps.length);

    const getTierPrice = () => {
        const count = selectedApps.length;
        if (count >= 21) return '30.00';
        if (count >= 11) return '15.00';
        return Math.min(count * 2.00, 10.00).toFixed(2);
    };

    if (loading) {
        return (
            <PageWrapper>
                <Container>
                    <Title>Loading...</Title>
                </Container>
            </PageWrapper>
        );
    }

    const isAtLimit = false; // Limits removed for Store mode

    return (
        <PageWrapper>
            <Container>
                <Header>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Software Store
                    </Title>
                    <TierBadge
                        $tier={currentTier.tier}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        {currentTier.label}
                    </TierBadge>
                    <div style={{ marginTop: '20px' }}>
                        <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '8px' }}>Tier Pricing, Software Titles, $ 2.00 each</h3>
                        <p style={{ color: 'white', fontSize: '1.1rem', margin: '4px 0' }}>Individual 0 to 5 titles, ($10 max)</p>
                        <p style={{ color: 'white', fontSize: '1.1rem', margin: '4px 0' }}>Silver Tier, 11 to 20 titles, ($15 max)</p>
                        <p style={{ color: 'white', fontSize: '1.1rem', margin: '4px 0' }}>Gold Tier, 21 to 44 titles, ($30 max)</p>
                    </div>
                </Header>

                <SelectionCounter
                    $isLimit={isAtLimit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <CounterText>
                        <span>{selectedApps.length}</span> titles selected
                    </CounterText>
                    {isAtLimit && <FiAlertCircle size={24} color="#ff6b6b" />}
                </SelectionCounter>

                <ActionButtons>
                    <ActionButton onClick={() => router.push('/dashboard')} $variant="primary">
                        <FiHome />
                        View Dashboard
                    </ActionButton>
                    <ActionButton onClick={selectAll} disabled={isAtLimit}>
                        <FiCheckCircle />
                        Select All (44) Titles
                    </ActionButton>
                    <ActionButton onClick={clearAll} $variant="danger">
                        <FiX />
                        Clear All
                    </ActionButton>
                    <ActionButton onClick={saveSelections} $variant="primary" disabled={saving}>
                        <FiSave />
                        {saving ? 'Saving...' : 'Save Selections'}
                    </ActionButton>
                    <ActionButton
                        onClick={() => alert(`Redirecting to Stripe Checkout for $${getTierPrice()}`)}
                        $variant="primary"
                        style={{ background: '#10b981' }}
                    >
                        <FiCreditCard />
                        Purchase
                    </ActionButton>
                </ActionButtons>

                {categories.map((category, index) => (
                    <CategorySection
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <CategoryHeader>
                            <CategoryTitle>{category}</CategoryTitle>
                            <CategoryCount>
                                {softwareByCategory[category]?.filter(app => selectedApps.includes(app.id)).length || 0} / {softwareByCategory[category]?.length || 0} selected
                            </CategoryCount>
                        </CategoryHeader>

                        <SoftwareGrid>
                            {softwareByCategory[category]?.map(software => {
                                const isSelected = selectedApps.includes(software.id);
                                const isDisabled = !isSelected && isAtLimit;

                                return (
                                    <SoftwareCard
                                        key={software.id}
                                        $selected={isSelected}
                                        $disabled={isDisabled}
                                        onClick={() => !isDisabled && toggleApp(software.id)}
                                        whileHover={!isDisabled ? { scale: 1.02 } : {}}
                                    >
                                        <CardHeader>
                                            <Checkbox $checked={isSelected}>
                                                {isSelected && <FiCheck />}
                                            </Checkbox>
                                            <SoftwareInfo>
                                                <SoftwareName>{software.name}</SoftwareName>
                                            </SoftwareInfo>
                                        </CardHeader>
                                        <SoftwareDescription>
                                            {software.description}
                                        </SoftwareDescription>
                                        <FeaturesList>
                                            {software.features.map((feature, idx) => (
                                                <FeatureTag key={idx}>{feature}</FeatureTag>
                                            ))}
                                        </FeaturesList>
                                    </SoftwareCard>
                                );
                            })}
                        </SoftwareGrid>
                    </CategorySection>
                ))}

                <PriceSummary
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h2 style={{ marginBottom: '1rem' }}>Subscription Summary</h2>
                    <PriceRow>
                        <span>Subscription Tier:</span>
                        <span>{currentTier.label}</span>
                    </PriceRow>
                    <PriceRow>
                        <span>Selected Applications:</span>
                        <span>{selectedApps.length} of {maxAllowed}</span>
                    </PriceRow>
                    <PriceRow $total>
                        <span>Total Annual Cost:</span>
                        <span>${getTierPrice()}</span>
                    </PriceRow>
                </PriceSummary>

                <AnimatePresence>
                    {saveStatus && (
                        <SaveStatus
                            $success={saveStatus.success}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                        >
                            {saveStatus.success ? <FiCheckCircle /> : <FiAlertCircle />}
                            {saveStatus.message}
                        </SaveStatus>
                    )}
                </AnimatePresence>
            </Container>
        </PageWrapper>
    );
}
