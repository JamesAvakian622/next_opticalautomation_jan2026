'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiChevronDown, FiChevronUp, FiCalendar, FiSmartphone, FiAlertCircle } from 'react-icons/fi';
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
    max-width: 1200px;
    margin: 0 auto;
`;

const Hero = styled.div`
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
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TrialBadge = styled(motion.div)`
    display: inline-block;
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-weight: 600;
    font-size: 1rem;
`;

const TiersGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const TierCard = styled(motion.div)`
    background: ${({ theme, $selected }) =>
        $selected ? `${theme.colors.primary}15` : theme.colors.surface};
    border: 2px solid ${({ theme, $selected }) =>
        $selected ? theme.colors.primary : theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }
`;

const TierHeader = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TierName = styled.h3`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const TierPrice = styled.div`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    span {
        font-size: 1rem;
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const TierDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TierFeatures = styled.ul`
    list-style: none;
    padding: 0;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Feature = styled.li`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};

    svg {
        color: ${({ theme }) => theme.colors.success};
        flex-shrink: 0;
    }
`;

const SelectButton = styled.button`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme, $selected }) =>
        $selected ? theme.colors.primary : theme.colors.backgroundAlt};
    color: ${({ theme, $selected }) => $selected ? 'white' : theme.colors.text};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
    }
`;

const PricingSection = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
    text-align: center;
`;

const TotalPrice = styled.div`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CheckoutButton = styled.button`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xxl};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-weight: 600;
    font-size: 1.125rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
    }
`;

const SoftwareSection = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-align: center;
`;

const CategoryCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CategoryHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    user-select: none;
`;

const CategoryTitle = styled.h3`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const CategoryCount = styled.span`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: normal;
`;

const SoftwareList = styled(motion.ul)`
    list-style: none;
    padding: 0;
    margin-top: ${({ theme }) => theme.spacing.md};
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.sm};
`;

const SoftwareItem = styled.li`
    color: ${({ theme }) => theme.colors.text};
    padding: ${({ theme }) => theme.spacing.xs};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};

    &:before {
        content: '•';
        color: ${({ theme }) => theme.colors.primary};
        font-weight: bold;
    }
`;

const NoticeSection = styled(motion.div)`
    background: ${({ theme }) => `${theme.colors.primary}10`};
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const NoticeTitle = styled.h4`
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const NoticeText = styled.p`
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
`;

const TimelineSection = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const TimelineItem = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    &:last-child {
        margin-bottom: 0;
    }
`;

const TimelineIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
`;

const TimelineContent = styled.div`
    flex: 1;
`;

const TimelineTitle = styled.h4`
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const TimelineDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
`;

const softwareCategories = [
    {
        name: 'The Company',
        items: [
            'OpticalAutomation',
            'Technologies',
            'JamesAvakian.com',
            'AmericaRediscovered',
            'Technology And Times',
            'Document List',
            'MyTelephoneBook',
            'RecipiesAndLists',
            'CampingList',
            'FoodList',
            'AccessPurchase'
        ]
    },
    {
        name: 'MyDeskView',
        items: [
            'MyDeskView',
            'DIY Solutions',
            'Friends',
            'PlacesToGo',
            'MyPersonalOrganizer',
            'MyBusinessOrganizer',
            'MyDateBook',
            'MyPhotoAlbum'
        ]
    },
    {
        name: 'eCommerce',
        items: ['DollarDimeStore.com']
    },
    {
        name: 'Productivity',
        items: [
            'GoodDayMusic',
            'AppointmentBook',
            'AccessMoney',
            'BistroRestaurant',
            'RealEstatePortal',
            'RealEstateTracker',
            'Reservation Book',
            'DentistBooking / RestaurantBooking / AttorneyBooking'
        ]
    },
    {
        name: 'Trackers',
        items: [
            'InvestmentTracker',
            'CreativeTracker',
            'VacationAndAirlineTracker',
            'BusinessTracker',
            'FitnessTracker',
            'SportsTracker',
            'TaskManager',
            'AppointmentBook'
        ]
    },
    {
        name: 'Games',
        items: [
            'VetteGame',
            'VetteQuiz',
            'TypingTeacher',
            'A Snowy Christmas'
        ]
    }
];

const subscriptionTiers = [
    {
        id: 'individual',
        name: 'Individual',
        price: 0,
        period: 'Free',
        description: '30-day free trial access to all software',
        features: [
            'Access to all software titles',
            '30-day free trial',
            'Web-based applications',
            'Basic support'
        ]
    },
    {
        id: 'silver',
        name: 'Silver',
        price: 25,
        period: 'per year',
        description: 'Annual subscription with full access',
        features: [
            'Everything in Individual',
            'Unlimited access after trial',
            'Priority support',
            'Early access to new features',
            'iOS apps (August 2026)'
        ]
    },
    {
        id: 'gold',
        name: 'Gold',
        price: 35,
        period: 'per year',
        description: 'Premium annual subscription',
        features: [
            'Everything in Silver',
            'Premium support',
            'Exclusive features',
            'Beta access to new software',
            'iOS apps (August 2026)'
        ]
    }
];

export default function SubscriptionPage() {
    const router = useRouter();
    const [selectedTier, setSelectedTier] = useState(null);
    const [expandedCategories, setExpandedCategories] = useState({});

    const toggleCategory = (categoryName) => {
        setExpandedCategories(prev => ({
            ...prev,
            [categoryName]: !prev[categoryName]
        }));
    };

    const handleCheckout = () => {
        // Check if user is logged in
        const token = localStorage.getItem('token');

        if (!token) {
            // Store selected tier for after registration
            if (selectedTier) {
                localStorage.setItem('selectedTier', selectedTier);
            }
            // Redirect to registration
            router.push('/register');
            return;
        }

        // If logged in, go to software selection
        if (selectedTier === 'individual') {
            router.push('/select-software');
        } else {
            // For paid tiers, go to software selection (Stripe will be added later)
            router.push('/select-software');
        }
    };

    const selectedPrice = selectedTier
        ? subscriptionTiers.find(t => t.id === selectedTier)?.price || 0
        : 0;

    return (
        <PageWrapper>
            <Container>
                <Hero>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Software Access Subscription
                    </Title>
                    <Subtitle>
                        Choose your access tier and unlock our comprehensive suite of applications
                    </Subtitle>
                    <TrialBadge
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        🎉 30-Day Free Trial on All Software
                    </TrialBadge>
                </Hero>

                <TiersGrid>
                    {subscriptionTiers.map((tier, index) => (
                        <TierCard
                            key={tier.id}
                            $selected={selectedTier === tier.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setSelectedTier(tier.id)}
                        >
                            <TierHeader>
                                <TierName>{tier.name}</TierName>
                                <TierPrice>
                                    ${tier.price}
                                    <span>/{tier.period}</span>
                                </TierPrice>
                                <TierDescription>{tier.description}</TierDescription>
                            </TierHeader>

                            <TierFeatures>
                                {tier.features.map((feature, idx) => (
                                    <Feature key={idx}>
                                        <FiCheck />
                                        {feature}
                                    </Feature>
                                ))}
                            </TierFeatures>

                            <SelectButton
                                $selected={selectedTier === tier.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedTier(tier.id);
                                }}
                            >
                                {selectedTier === tier.id ? 'Selected' : 'Select Plan'}
                            </SelectButton>
                        </TierCard>
                    ))}
                </TiersGrid>

                {selectedTier && (
                    <PricingSection
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <TotalPrice>
                            Total: ${selectedPrice} {selectedPrice > 0 ? 'per year' : ''}
                        </TotalPrice>
                        <CheckoutButton
                            onClick={handleCheckout}
                            disabled={!selectedTier}
                        >
                            {selectedTier === 'individual' ? 'Start Free Trial' : 'Proceed to Checkout'}
                        </CheckoutButton>
                    </PricingSection>
                )}

                <NoticeSection
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <NoticeTitle>
                        <FiAlertCircle />
                        Important Information
                    </NoticeTitle>
                    <NoticeText>
                        <strong>All sales are final.</strong> Please review your subscription tier carefully before purchasing.
                        Subscriptions are billed annually and provide access to all current and future software in our catalog.
                    </NoticeText>
                </NoticeSection>

                <NoticeSection
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <NoticeTitle>
                        <FiSmartphone />
                        iOS Mobile Apps
                    </NoticeTitle>
                    <NoticeText>
                        iOS mobile applications will be available from the Apple App Store starting <strong>August 2026</strong>.
                        All subscribers will have access to mobile versions of our software at no additional cost.
                    </NoticeText>
                </NoticeSection>

                <SoftwareSection>
                    <SectionTitle>Included Software ({softwareCategories.reduce((acc, cat) => acc + cat.items.length, 0)} Applications)</SectionTitle>

                    {softwareCategories.map((category, index) => (
                        <CategoryCard
                            key={category.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <CategoryHeader onClick={() => toggleCategory(category.name)}>
                                <CategoryTitle>
                                    {category.name}
                                    <CategoryCount>({category.items.length} apps)</CategoryCount>
                                </CategoryTitle>
                                {expandedCategories[category.name] ? <FiChevronUp /> : <FiChevronDown />}
                            </CategoryHeader>

                            {expandedCategories[category.name] && (
                                <SoftwareList
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                >
                                    {category.items.map((item, idx) => (
                                        <SoftwareItem key={idx}>{item}</SoftwareItem>
                                    ))}
                                </SoftwareList>
                            )}
                        </CategoryCard>
                    ))}
                </SoftwareSection>

                <TimelineSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <SectionTitle>Development Timeline</SectionTitle>

                    <TimelineItem>
                        <TimelineIcon>
                            <FiCalendar />
                        </TimelineIcon>
                        <TimelineContent>
                            <TimelineTitle>2026 Q1 - Development Program</TimelineTitle>
                            <TimelineDescription>
                                Start development program with multiple group and single copyright submissions
                            </TimelineDescription>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineIcon>
                            <FiSmartphone />
                        </TimelineIcon>
                        <TimelineContent>
                            <TimelineTitle>2026 Q2 - Apple App Store</TimelineTitle>
                            <TimelineDescription>
                                Submit applications to Apple App Store for review and distribution
                            </TimelineDescription>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineIcon>
                            <FiCalendar />
                        </TimelineIcon>
                        <TimelineContent>
                            <TimelineTitle>2026 - Website and Mobile Launch</TimelineTitle>
                            <TimelineDescription>
                                Full website and mobile application availability for all subscribers
                            </TimelineDescription>
                        </TimelineContent>
                    </TimelineItem>

                    <TimelineItem>
                        <TimelineIcon>
                            <FiCalendar />
                        </TimelineIcon>
                        <TimelineContent>
                            <TimelineTitle>2027 - Future Expansion</TimelineTitle>
                            <TimelineDescription>
                                Potential expansion to additional platforms and features (Corvette apps maybe 2027)
                            </TimelineDescription>
                        </TimelineContent>
                    </TimelineItem>
                </TimelineSection>
            </Container>
        </PageWrapper>
    );
}
