'use client';

import Image from 'next/image';
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
    FiLayers,
    FiTool,
    FiCalendar,
    FiMonitor,
    FiMapPin,
    FiImage
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



const LogoWrapper = styled(motion.div)`
width: 60px;
height: 60px;
position: relative;
border - radius: 0;
overflow: hidden;
flex - shrink: 0;

@media(max - width: 768px) {
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

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 1.5rem;
max-width: 600px;
margin: 0 auto;
`;

const IntroSection = styled(motion.section)`
max - width: 900px;
margin: 0 auto ${({ theme }) => theme.spacing.xxl};
text - align: center;
`;

const SectionSubtitle = styled.h3`
font - size: 1.5rem;
color: ${({ theme }) => theme.colors.text};
margin - bottom: ${({ theme }) => theme.spacing.xl};
margin - top: ${({ theme }) => theme.spacing.lg};
font - weight: 500;
`;

const DescriptionParagraph = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 1.05rem;
line-height: 1.8;
margin-top: 1.5rem;
margin-bottom: 1.5rem;
text-align: left;
    
&:first-child {
    margin-top: 0;
}

&:last-child {
    margin-bottom: 0;
}
`;

const SoftwareGrid = styled.div`
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: ${({ theme }) => theme.spacing.lg};
margin: ${({ theme }) => theme.spacing.xl} auto;
max-width: 900px;
justify-content: center;

@media(max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 600px;
}

@media(max-width: 600px) {
    grid-template-columns: 1fr;
    max-width: 350px;
}
`;

const FeaturedSection = styled.div`
display: flex;
gap: ${({ theme }) => theme.spacing.xxl};
align-items: flex-start;
margin-bottom: 4rem;
padding-bottom: 2rem;
border-bottom: 1px solid ${({ theme }) => theme.colors.border};

@media(max-width: 1024px) {
    flex-direction: column;
    align-items: center;
}

&:last-of-type {
    border-bottom: none;
    margin-bottom: 3rem;
}
`;

const FeaturedCardWrapper = styled.div`
flex: 0 0 400px;
max - width: 100 %;

@media(max - width: 1024px) {
    flex: 1;
    width: 100 %;
    max - width: 500px;
}
`;

const ScreenshotWrapper = styled(motion.div)`
flex: 1;
border - radius: ${({ theme }) => theme.borderRadius.xl};
overflow: hidden;
box - shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ScreenshotImage = styled.img`
width: 100 %;
height: auto;
display: block;
`;

const SoftwareItem = styled.div`
display: flex;
align - items: center;
gap: ${({ theme }) => theme.spacing.sm};
color: ${({ theme }) => theme.colors.text};
font - size: 0.95rem;
    
    svg {
    color: ${({ theme }) => theme.colors.success};
    font - size: 1.1em;
}
`;

const CategoryTitle = styled.h4`
grid-column: 1 / -1;
color: ${({ theme }) => theme.mode === 'dark' ? '#ffffff' : '#333333'};
font-size: 1.1rem;
font-weight: 600;
text-align: center;
margin-top: ${({ theme }) => theme.spacing.lg};
margin-bottom: ${({ theme }) => theme.spacing.sm};
padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(156, 163, 175, 0.3)'};
border-radius: ${({ theme }) => theme.borderRadius.md};
border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(156, 163, 175, 0.5)'};

&:first-child {
    margin-top: 0;
}
`;

const CategoryGroup = styled.div`
background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(156, 163, 175, 0.15)'};
border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(156, 163, 175, 0.3)'};
border-radius: ${({ theme }) => theme.borderRadius.lg};
padding: ${({ theme }) => theme.spacing.md};
margin-bottom: ${({ theme }) => theme.spacing.lg};
transition: all 0.3s ease;

&:hover {
    border: 3px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.7)' : 'rgba(59, 130, 246, 0.5)'};
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(59, 130, 246, 0.25)' : 'rgba(59, 130, 246, 0.1)'};
}
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

const ProductsGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
gap: ${({ theme }) => theme.spacing.xl};
margin-top: 2rem;
margin-bottom: ${({ theme }) => theme.spacing.xxl};

@media(max-width: 400px) {
    grid-template-columns: 1fr;
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
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  gap: 12px;
`;

const ProductIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background: ${({ $color }) => `${$color}20`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.5rem;
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
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
`;

const PlatformStatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: flex-end;
  flex-shrink: 0;
`;

const PlatformStatus = styled.span`
  display: block;
  padding: 3px 10px;
  background: ${({ $active, theme }) =>
        $active ? `${theme.colors.success}20` : `${theme.colors.warning}20`
    };
  color: ${({ $active, theme }) =>
        $active ? theme.colors.success : theme.colors.warning
    };
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductUrl = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductDescription = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeaturesList = styled.ul`
  list-style: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  svg {
    color: ${({ theme }) => theme.colors.success};
    flex-shrink: 0;
  }
`;

const VisitLink = styled.a`
display: inline-flex;
align-items: center;
gap: 6px;
padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
margin-top: 1.5rem;
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
        url: 'www.MyDeskView.com',
        description: 'Your central command center for daily workflow management and productivity.',
        color: '#6366f1',
        active: true,
        features: ['Central Dashboard', 'Widget System', 'App Integrations', 'Real-time Updates'],
        icon: FiLayout
    },
    {
        name: 'MyPersonalOrganizer',
        url: 'www.MyPersonalOrganizer.com',
        description: 'Comprehensive personal life management for goals, habits, and schedules.',
        color: '#10B981',
        active: true,
        features: ['Goal Tracking', 'Habit Builder', 'Smart Calendar', 'Personal Journal'],
        icon: FiUser
    },
    {
        name: 'MyDetailBase',
        url: 'www.MyDetailBase.com',
        description: 'Secure structured data management for all your essential information.',
        color: '#F59E0B',
        active: true,
        features: ['Data Encryption', 'Custom Fields', 'Smart Search', 'Document Storage'],
        icon: FiDatabase
    },
    {
        name: 'MyBusinessOrganizer',
        url: 'www.MyBusinessOrganizer.com',
        description: 'Complete business operations suite for entrepreneurs and teams.',
        color: '#EC4899',
        active: true,
        features: ['Project Management', 'Team Collaboration', 'Invoicing', 'Resource Planning'],
        icon: FiBriefcase
    },
    {
        name: 'MyOneUniverse',
        url: 'www.MyOneUniverse.com',
        description: 'The unifying ecosystem connecting all your Optical Automation apps.',
        color: '#8B5CF6',
        active: true,
        features: ['Cross-App Sync', 'Universal Search', 'Unified Identity', 'Seamless Handoff'],
        icon: FiLayers
    },
    {
        name: 'MyDeskView - DIY Solutions',
        url: 'www.MyDeskView.com',
        description: 'Home improvement and DIY project management integrated into your desktop workflow.',
        color: '#F97316',
        active: true,
        features: ['Project Templates', 'Material Lists', 'Step-by-Step Guides', 'Cost Tracking'],
        icon: FiZap
    },
    {
        name: 'MyDeskView - YouTube Videos',
        url: 'www.MyDeskView.com',
        description: 'Curated video content and YouTube integration with assignable movies for quick access.',
        color: '#EF4444',
        active: true,
        features: ['Video Library', 'Quick Access Menu', 'Playlist Management', 'Watch History'],
        icon: FiExternalLink
    },
    {
        name: 'DIY Solutions',
        url: 'www.MyDeskView.com',
        description: 'Do-it-yourself solutions and projects for home improvement and creative endeavors.',
        color: '#F59E0B',
        active: true,
        features: ['Project Guides', 'Tool Lists', 'Step-by-Step Instructions', 'Material Calculators'],
        icon: FiTool
    },
    {
        name: 'MyDateBook',
        url: 'www.MyDeskView.com',
        description: 'Personal date and event management with calendar integration and reminders.',
        color: '#8B5CF6',
        active: true,
        features: ['Event Calendar', 'Reminders', 'Date Tracking', 'Anniversary Alerts'],
        icon: FiCalendar
    },

    {
        name: 'MyDeskView - 2026 Places',
        url: 'www.MyDeskView.com',
        description: 'Location tracking and management for your favorite places and destinations.',
        color: '#10B981',
        active: true,
        features: ['Location Bookmarks', 'Travel Planning', 'Map Integration', 'Place Reviews'],
        icon: FiMapPin
    },
    {
        name: 'MyDeskView - PhotoAlbums',
        url: 'www.MyDeskView.com',
        description: 'Photo organization and album management for your digital memories.',
        color: '#EC4899',
        active: true,
        features: ['Album Creation', 'Photo Organization', 'Sharing Options', 'Memory Timeline'],
        icon: FiImage
    }
];

const integratedSoftware = {
    'Business & Finance': [
        'AccessMoney',
        'AI Trading',
        'AppointmentBook',
        'BistroRestaurant',
        'BusinessTracker',
        'CreativeTracker',
        'DollarDimeStore',
        'EmployDirectory',
        'EmployeeHandBook',
        'GasolineFinder',
        'InvestmentTracker',
        'RealEstatePortal'
    ],
    'Education & Learning': [
        'Animals',
        'GrammyHistory',
        'GuitarBranded',
        'InventorsBio',
        'LearnSkills365.com',
        'MusiciansHallOfFame',
        'MyGreatRecipes',
        'NationalParks',
        'NewsChannels',
        'NinePlanets',
        'Quiz System',
        'SportsTracker'
    ],
    'Entertainment & Leisure': [
        'A Snowy Christmas',
        'Apple M Processors',
        'Biographies',
        'CarShow YouTube',
        'CoolJimmy',
        'CorvetteQuiz',
        'CruiseFinder',
        'GoodDayMusic'
    ],
    'Personal Productivity': [
        'DIY Solutions',
        'MyBusinessOrganizer',
        'MyDateBook',
        'MyDeskView',
        'MyDeskView - 2026 Places',
        'MyDeskView - YouTube',
        'MyPersonalOrganizer',
        'Photo Albums'
    ],
    'Communication & Social': [
        'Hi5',
        'MyTelephoneBook',
        'RecipeLists',
        'TaskManager',
        'TechnologyAndTimes',
        'Teleprompter'
    ],
    'Health': [
        'Disease Tracker',
        'Fitness Tracker',
        'GymnasticTracker',
        'Health Tracker',
        'HealthAidTracking',
        'MigraineTinitusTracker',
        'WalkTracker'
    ]
};

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
                        <LogoWrapper>
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </LogoWrapper>
                        MyDeskView Series
                    </Title>
                    <Subtitle>
                        Dashboard Information and Website System
                    </Subtitle>
                </HeroSection>

                <IntroSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>

                    <SectionSubtitle>
                        MyDeskView Series Software Integrates These
                    </SectionSubtitle>

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

                    <SectionSubtitle style={{ marginTop: '3rem' }}>Your Central Desktop</SectionSubtitle>
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
                            </ProductHeader>
                            <ProductName>{products[0].name}</ProductName>
                            <ProductUrl>{products[0].url}</ProductUrl>
                            <PlatformStatusContainer style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
                                <PlatformStatus $active={products[0].active}>Web : {products[0].active ? 'Active.' : 'Pending.'}</PlatformStatus>
                                <PlatformStatus $active={false}>iOS / Android : Pending</PlatformStatus>
                            </PlatformStatusContainer>
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
                                    Visit Site < FiExternalLink />
                                </VisitLink >
                            )}
                        </ProductCard >
                    </FeaturedCardWrapper >

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
                </FeaturedSection >

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
                            </ProductHeader>
                            <ProductName>{products[1].name}</ProductName>
                            <ProductUrl>{products[1].url}</ProductUrl>
                            <PlatformStatusContainer style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
                                <PlatformStatus $active={products[1].active}>Web : {products[1].active ? 'Active.' : 'Pending.'}</PlatformStatus>
                                <PlatformStatus $active={false}>iOS / Android : Pending</PlatformStatus>
                            </PlatformStatusContainer>
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
                            </ProductHeader>
                            <ProductName>{products[2].name}</ProductName>
                            <ProductUrl>{products[2].url}</ProductUrl>
                            <PlatformStatusContainer style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
                                <PlatformStatus $active={products[2].active}>Web : {products[2].active ? 'Active.' : 'Pending.'}</PlatformStatus>
                                <PlatformStatus $active={false}>iOS / Android : Pending</PlatformStatus>
                            </PlatformStatusContainer>
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
                            </ProductHeader>
                            <ProductName>{product.name}</ProductName>
                            <ProductUrl>{product.url}</ProductUrl>
                            <PlatformStatusContainer style={{ alignItems: 'flex-start', marginBottom: '16px' }}>
                                <PlatformStatus $active={product.active}>Web : {product.active ? 'Active.' : 'Pending.'}</PlatformStatus>
                                <PlatformStatus $active={false}>iOS / Android : Pending</PlatformStatus>
                            </PlatformStatusContainer>
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
