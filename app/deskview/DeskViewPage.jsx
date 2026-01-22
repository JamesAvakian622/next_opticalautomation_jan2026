'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiGlobe,
    FiExternalLink,
    FiServer,
    FiShield,
    FiZap,
    FiCheck,
    FiLayout,
    FiUser,
    FiDatabase,
    FiBriefcase,
    FiLayers
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
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
    max-width: 600px;
    margin: 0 auto;
`;

const IntroSection = styled(motion.section)`
    max-width: 900px;
    margin: 0 auto ${({ theme }) => theme.spacing.xxl};
    text-align: center;
`;

const SectionSubtitle = styled.h3`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    font-weight: 500;
`;

const DescriptionParagraph = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.05rem;
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    text-align: left;
    
    &:last-child {
        margin-bottom: 0;
    }
`;

const SoftwareGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
    margin: ${({ theme }) => theme.spacing.xl} 0;
    text-align: left;
`;

const FeaturedSection = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.xxl};
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 1024px) {
        flex-direction: column;
        align-items: center;
    }
`;

const FeaturedCardWrapper = styled.div`
    flex: 0 0 400px;
    max-width: 100%;

    @media (max-width: 1024px) {
        flex: 1;
        width: 100%;
        max-width: 500px;
    }
`;

const ScreenshotWrapper = styled(motion.div)`
    flex: 1;
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    overflow: hidden;
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
    border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ScreenshotImage = styled.img`
    width: 100%;
    height: auto;
    display: block;
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

const ProductsGrid = styled.div`
    display: grid;
grid - template - columns: repeat(auto - fill, minmax(350px, 1fr));
gap: ${({ theme }) => theme.spacing.xl};
margin - bottom: ${({ theme }) => theme.spacing.xxl};

@media(max - width: 400px) {
    grid - template - columns: 1fr;
}
`;

const ProductCard = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border - radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xl};
transition: all 0.3s ease;

    &:hover {
    border - color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box - shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
}
`;

const ProductHeader = styled.div`
display: flex;
align - items: center;
justify - content: space - between;
margin - bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductIcon = styled.div`
width: 48px;
height: 48px;
border - radius: ${({ theme }) => theme.borderRadius.lg};
background: ${({ $color }) => `${$color}20`};
display: flex;
align - items: center;
justify - content: center;

    svg {
    font - size: 1.5rem;
    color: ${({ $color }) => $color};
}
`;

const StatusBadge = styled.span`
padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
background: ${({ $active, theme }) =>
        $active ? `${theme.colors.success}20` : `${theme.colors.warning}20`
    };
color: ${({ $active, theme }) =>
        $active ? theme.colors.success : theme.colors.warning
    };
border - radius: ${({ theme }) => theme.borderRadius.full};
font - size: 0.75rem;
font - weight: 600;
`;

const ProductName = styled.h3`
font - size: 1.25rem;
color: ${({ theme }) => theme.colors.text};
margin - bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductUrl = styled.p`
color: ${({ theme }) => theme.colors.primary};
font - size: 0.875rem;
font - weight: 500;
margin - bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductDescription = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font - size: 0.9rem;
line - height: 1.6;
margin - bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeaturesList = styled.ul`
list - style: none;
margin - bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureItem = styled.li`
display: flex;
align - items: center;
gap: ${({ theme }) => theme.spacing.sm};
color: ${({ theme }) => theme.colors.textSecondary};
font - size: 0.875rem;
margin - bottom: ${({ theme }) => theme.spacing.sm};

    svg {
    color: ${({ theme }) => theme.colors.success};
    flex - shrink: 0;
}
`;

const VisitLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    margin-top: ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const ServicesSection = styled.div`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border - radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
font - size: 2rem;
text - align: center;
margin - bottom: ${({ theme }) => theme.spacing.xl};
background: ${({ theme }) => theme.colors.gradient};
-webkit - background - clip: text;
-webkit - text - fill - color: transparent;
background - clip: text;
`;

const ServicesGrid = styled.div`
display: grid;
grid - template - columns: repeat(auto - fit, minmax(200px, 1fr));
gap: ${({ theme }) => theme.spacing.lg};
`;

const ServiceItem = styled(motion.div)`
text - align: center;
padding: ${({ theme }) => theme.spacing.lg};
`;

const ServiceIcon = styled.div`
width: 60px;
height: 60px;
margin: 0 auto ${({ theme }) => theme.spacing.md};
border - radius: ${({ theme }) => theme.borderRadius.full};
background: ${({ theme }) => theme.colors.backgroundAlt};
display: flex;
align - items: center;
justify - content: center;

    svg {
    font - size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
}
`;

const ServiceTitle = styled.h4`
color: ${({ theme }) => theme.colors.text};
margin - bottom: ${({ theme }) => theme.spacing.sm};
`;

const ServiceDesc = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font - size: 0.875rem;
`;

const products = [
    {
        name: 'MyDeskView',
        url: 'mydeskview.opticalautomation.com',
        description: 'Your central command center for daily workflow management and productivity.',
        color: '#6366f1',
        active: true,
        features: ['Central Dashboard', 'Widget System', 'App Integrations', 'Real-time Updates'],
        icon: FiLayout
    },
    {
        name: 'MyPersonalOrganizer',
        url: 'personal.opticalautomation.com',
        description: 'Comprehensive personal life management for goals, habits, and schedules.',
        color: '#10B981',
        active: true,
        features: ['Goal Tracking', 'Habit Builder', 'Smart Calendar', 'Personal Journal'],
        icon: FiUser
    },
    {
        name: 'MyDetailBase',
        url: 'details.opticalautomation.com',
        description: 'Secure structured data management for all your essential information.',
        color: '#F59E0B',
        active: true,
        features: ['Data Encryption', 'Custom Fields', 'Smart Search', 'Document Storage'],
        icon: FiDatabase
    },
    {
        name: 'MyBusinessOrganizer',
        url: 'business.opticalautomation.com',
        description: 'Complete business operations suite for entrepreneurs and teams.',
        color: '#EC4899',
        active: true,
        features: ['Project Management', 'Team Collaboration', 'Invoicing', 'Resource Planning'],
        icon: FiBriefcase
    },
    {
        name: 'MyOneUniverse',
        url: 'universe.opticalautomation.com',
        description: 'The unifying ecosystem connecting all your Optical Automation apps.',
        color: '#8B5CF6',
        active: true,
        features: ['Cross-App Sync', 'Universal Search', 'Unified Identity', 'Seamless Handoff'],
        icon: FiLayers
    }
];

const integratedSoftware = [
    'A Snowy Christmas',
    'BistroRestaurant',
    'BusinessTracker',
    'CorvetteQuiz',
    'CreativeTracker',
    'DollarDimeStore',
    'GoodDayMusic',
    'Hi5',
    'InvestmentTracker',
    'LearningPlatform',
    'MyDateBook',
    'MyTelephoneBook',
    'Photo Albums',
    'Quiz System',
    'RealEstatePortal',
    'RecipeLists',
    'SportsTracker',
    'TaskManager',
    'TechnologyAndTimes',
    'Teleprompter'
];

export default function DeskViewPage() {
    const FeaturedIcon = products[0].icon;
    const FeaturedIcon2 = products[1].icon;
    const FeaturedIcon3 = products[2].icon;

    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiGlobe /> The DeskView Series
                    </Title>
                    <Subtitle>
                        Dashboard Information and Website Items
                    </Subtitle>
                </HeroSection>

                <IntroSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

                    <SectionSubtitle>The Single Point Of Execution For Applications</SectionSubtitle>
                    <DescriptionParagraph>
                        MyDeskView serves as your comprehensive dashboard for managing all aspects of your daily workflow. This powerful application brings together your most important information, tasks, and tools in one centralized location, allowing you to maintain focus and productivity throughout your day. With its intuitive interface and customizable widgets, you can tailor your workspace to match your unique needs and preferences.
                    </DescriptionParagraph>
                    <DescriptionParagraph>
                        The application features real-time updates and notifications, ensuring you never miss important deadlines or appointments. Whether you're tracking project milestones, monitoring team progress, or managing your personal schedule, MyDeskView provides the visibility and control you need to stay on top of everything. The dashboard adapts to your workflow, learning from your usage patterns to surface the most relevant information when you need it most.
                    </DescriptionParagraph>
                    <DescriptionParagraph>
                        Integration capabilities allow MyDeskView to connect with your existing tools and services, creating a seamless ecosystem for your digital workspace. From calendar synchronization to task management integration, the platform works harmoniously with the applications you already use. This eliminates the need to switch between multiple windows and applications, streamlining your workflow and reducing context-switching overhead.
                    </DescriptionParagraph>
                    <DescriptionParagraph>
                        Built with performance and reliability in mind, MyDeskView ensures your data is always accessible and secure. The application employs industry-standard encryption and follows best practices for data protection, giving you peace of mind while you focus on what matters most. Whether you're working from the office, home, or on the go, MyDeskView provides a consistent and reliable experience across all your devices.
                    </DescriptionParagraph>

                    <SectionSubtitle style={{ marginTop: '3rem', fontSize: '1.25rem' }}>
                        The following software titles are integrated and built into each of the MyDeskView Series program:
                    </SectionSubtitle>

                    <SoftwareGrid>
                        {integratedSoftware.map((title) => (
                            <SoftwareItem key={title}>
                                <FiCheck /> {title}
                            </SoftwareItem>
                        ))}
                    </SoftwareGrid>
                </IntroSection>

                <FeaturedSection>
                    <FeaturedCardWrapper>
                        <ProductCard
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ height: '100%' }}
                        >
                            <ProductHeader>
                                <ProductIcon $color={products[0].color}>
                                    <FeaturedIcon />
                                </ProductIcon>
                                <StatusBadge $active={products[0].active}>
                                    {products[0].active ? 'Active' : 'Coming Soon'}
                                </StatusBadge>
                            </ProductHeader>
                            <ProductName>{products[0].name}</ProductName>
                            <ProductUrl>{products[0].url}</ProductUrl>
                            <ProductDescription>{products[0].description}</ProductDescription>
                            <FeaturesList>
                                {products[0].features.map((feature) => (
                                    <FeatureItem key={feature}>
                                        <FiCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            {products[0].active && (
                                <VisitLink
                                    href={`https://${products[0].url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Site <FiExternalLink />
                                </VisitLink>
                            )}
                        </ProductCard>
                    </FeaturedCardWrapper>

                    <ScreenshotWrapper
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <ScreenshotImage
                            src="/mydeskview_dashboard.png"
                            alt="MyDeskView Dashboard Interface"
                        />
                    </ScreenshotWrapper>
                </FeaturedSection>

                <FeaturedSection>
                    <ScreenshotWrapper
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <ScreenshotImage
                            src="/mypersonalorganizer_dashboard.png"
                            alt="MyPersonalOrganizer Dashboard Interface"
                        />
                    </ScreenshotWrapper>

                    <FeaturedCardWrapper>
                        <ProductCard
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ height: '100%' }}
                        >
                            <ProductHeader>
                                <ProductIcon $color={products[1].color}>
                                    <FeaturedIcon2 />
                                </ProductIcon>
                                <StatusBadge $active={products[1].active}>
                                    {products[1].active ? 'Active' : 'Coming Soon'}
                                </StatusBadge>
                            </ProductHeader>
                            <ProductName>{products[1].name}</ProductName>
                            <ProductUrl>{products[1].url}</ProductUrl>
                            <ProductDescription>{products[1].description}</ProductDescription>
                            <FeaturesList>
                                {products[1].features.map((feature) => (
                                    <FeatureItem key={feature}>
                                        <FiCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            {products[1].active && (
                                <VisitLink
                                    href={`https://${products[1].url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Site <FiExternalLink />
                                </VisitLink>
                            )}
                        </ProductCard>
                    </FeaturedCardWrapper>
                </FeaturedSection>

                <FeaturedSection>
                    <FeaturedCardWrapper>
                        <ProductCard
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ height: '100%' }}
                        >
                            <ProductHeader>
                                <ProductIcon $color={products[2].color}>
                                    <FeaturedIcon3 />
                                </ProductIcon>
                                <StatusBadge $active={products[2].active}>
                                    {products[2].active ? 'Active' : 'Coming Soon'}
                                </StatusBadge>
                            </ProductHeader>
                            <ProductName>{products[2].name}</ProductName>
                            <ProductUrl>{products[2].url}</ProductUrl>
                            <ProductDescription>{products[2].description}</ProductDescription>
                            <FeaturesList>
                                {products[2].features.map((feature) => (
                                    <FeatureItem key={feature}>
                                        <FiCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            {products[2].active && (
                                <VisitLink
                                    href={`https://${products[2].url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Site <FiExternalLink />
                                </VisitLink>
                            )}
                        </ProductCard>
                    </FeaturedCardWrapper>

                    <ScreenshotWrapper
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <ScreenshotImage
                            src="/mydetailbase_dashboard.png"
                            alt="MyDetailBase Dashboard Interface"
                        />
                    </ScreenshotWrapper>
                </FeaturedSection>

                <ProductsGrid>
                    {products.slice(3).map((product, index) => (
                        <ProductCard
                            key={product.url}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductHeader>
                                <ProductIcon $color={product.color}>
                                    <product.icon />
                                </ProductIcon>
                                <StatusBadge $active={product.active}>
                                    {product.active ? 'Active' : 'Coming Soon'}
                                </StatusBadge>
                            </ProductHeader>
                            <ProductName>{product.name}</ProductName>
                            <ProductUrl>{product.url}</ProductUrl>
                            <ProductDescription>{product.description}</ProductDescription>
                            <FeaturesList>
                                {product.features.map((feature) => (
                                    <FeatureItem key={feature}>
                                        <FiCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            {product.active && (
                                <VisitLink
                                    href={`https://${product.url}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Site < FiExternalLink />
                                </VisitLink >
                            )}
                        </ProductCard >
                    ))}
                </ProductsGrid >


            </Container >
        </PageWrapper >
    );
}
