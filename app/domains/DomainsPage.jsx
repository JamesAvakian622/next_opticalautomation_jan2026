'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiGlobe,
    FiExternalLink,
    FiCheck,
    FiClock,
    FiPackage,
    FiStar,
    FiCode,
    FiShoppingCart,
    FiUsers,
    FiTruck,
    FiCalendar,
    FiDollarSign,
    FiActivity,
    FiBook,
    FiMusic,
    FiHome,
    FiMap,
    FiHeart,
    FiBriefcase,
    FiDatabase,
    FiSearch,
    FiLock,
    FiGrid
} from 'react-icons/fi';

// Domain Data
const domains = [
    {
        id: 1,
        name: 'OpticalAutomation.com',
        status: 'active',
        category: 'Technology',
        description: 'Cutting-edge MERN website and mobile app development solutions using AI-assisted deployment. The flagship technology company domain.',
        technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Express'],
        features: ['Full-Stack Development', 'AI Integration', 'Mobile Apps', 'Web Applications'],
        icon: FiCode,
        color: '#6366f1'
    },
    {
        id: 2,
        name: 'JamesAvakian.com',
        status: 'active',
        category: 'Portfolio',
        description: 'Professional portfolio showcasing web development expertise, projects, and technical achievements.',
        technologies: ['React', 'Next.js', 'Styled Components'],
        features: ['Portfolio', 'Resume', 'Project Showcase', 'Contact'],
        icon: FiUsers,
        color: '#EC4899'
    },
    {
        id: 3,
        name: 'TheCorvetteJournal.com',
        status: 'active',
        category: 'Automotive',
        description: 'Comprehensive Corvette news, reviews, and enthusiast content covering all generations of America\'s sports car.',
        technologies: ['React', 'Content Management', 'SEO'],
        features: ['News', 'Reviews', 'Photos', 'Community'],
        icon: FiTruck,
        color: '#EF4444'
    },
    {
        id: 4,
        name: 'TheCorvetteWeb.com',
        status: 'active',
        category: 'Automotive',
        description: 'Central hub for Corvette enthusiasts featuring specifications, history, and community resources.',
        technologies: ['React', 'Database', 'Media Gallery'],
        features: ['Specifications', 'History', 'Gallery', 'Forums'],
        icon: FiTruck,
        color: '#F97316'
    },
    {
        id: 5,
        name: 'TheCorvetteReporter.com',
        status: 'active',
        category: 'Automotive',
        description: 'Breaking news and in-depth reporting on Corvette developments, events, and industry updates.',
        technologies: ['React', 'CMS', 'Newsletter'],
        features: ['Breaking News', 'Events', 'Industry Updates', 'Newsletter'],
        icon: FiTruck,
        color: '#14B8A6'
    },
    {
        id: 6,
        name: 'BestOfCorvette.com',
        status: 'active',
        category: 'Automotive',
        description: 'Curated collection of the finest Corvettes, featuring buyer guides, collector insights, and premium listings.',
        technologies: ['React', 'Listings', 'Search'],
        features: ['Buyer Guides', 'Collector Insights', 'Premium Listings', 'Valuations'],
        icon: FiStar,
        color: '#F59E0B'
    },
    {
        id: 7,
        name: 'MyPersonalOrganizer.com',
        status: 'active',
        category: 'Productivity',
        description: 'Personal organization and task management platform with secure user authentication via Clerk.',
        technologies: ['React', 'Clerk Auth', 'MongoDB', 'Node.js'],
        features: ['Task Management', 'Calendar', 'Notes', 'Secure Login'],
        icon: FiCalendar,
        color: '#8B5CF6'
    },
    {
        id: 8,
        name: 'MyBusinessOrganizer.com',
        status: 'early',
        category: 'Business',
        description: 'Business organization suite for managing projects, clients, invoices, and team collaboration.',
        technologies: ['React', 'Node.js', 'MongoDB'],
        features: ['Project Management', 'Client Portal', 'Invoicing', 'Team Tools'],
        icon: FiBriefcase,
        color: '#0EA5E9'
    },
    {
        id: 9,
        name: 'CoolJimmy.com',
        status: 'early',
        category: 'Personal',
        description: 'Personal brand and creative showcase platform for unique content and projects.',
        technologies: ['React', 'Media Gallery'],
        features: ['Personal Brand', 'Creative Portfolio', 'Blog'],
        icon: FiStar,
        color: '#A855F7'
    },
    {
        id: 10,
        name: 'VetteAgent.com',
        status: 'early',
        category: 'Automotive',
        description: 'Corvette sales and brokerage platform connecting buyers, sellers, and collectors.',
        technologies: ['React', 'Listings', 'Messaging'],
        features: ['Vehicle Listings', 'Brokerage', 'Buyer Matching', 'Valuation Tools'],
        icon: FiTruck,
        color: '#DC2626'
    },
    {
        id: 11,
        name: 'BestOfBest.com',
        status: 'early',
        category: 'Curated',
        description: 'Curated collection of top-rated products, services, and experiences across multiple categories.',
        technologies: ['React', 'Search', 'Reviews'],
        features: ['Product Rankings', 'Reviews', 'Comparisons', 'Recommendations'],
        icon: FiStar,
        color: '#FBBF24'
    },
    {
        id: 12,
        name: 'BusinessPlans.com',
        status: 'active',
        category: 'Business',
        description: 'Comprehensive business planning platform with templates, AI assistance, and MongoDB-powered search.',
        technologies: ['MongoDB', 'Search', 'AI', 'Templates'],
        features: ['Plan Templates', 'AI Writing', 'Market Research', 'Financial Projections'],
        icon: FiBriefcase,
        color: '#059669'
    },
    {
        id: 13,
        name: 'DollarDimeStore.com',
        status: 'ready',
        category: 'eCommerce',
        description: 'Budget-friendly eCommerce platform ready for product population. Tracks client numbers, order numbers, and account numbers.',
        technologies: ['React', 'eCommerce', 'Payment Processing', 'Inventory'],
        features: ['Client Management', 'Order Tracking', 'Account System', 'Budget Products'],
        icon: FiShoppingCart,
        color: '#10B981'
    },
    {
        id: 14,
        name: 'Checkered-Flag.com',
        status: 'active',
        category: 'Automotive',
        description: 'Racing and motorsports content hub featuring race coverage, driver profiles, and enthusiast community.',
        technologies: ['React', 'Media', 'Community'],
        features: ['Race Coverage', 'Driver Profiles', 'Community', 'News'],
        icon: FiTruck,
        color: '#1F2937'
    },
    {
        id: 15,
        name: 'MyZR1.com',
        status: 'early',
        category: 'Automotive',
        description: 'Dedicated platform for Corvette ZR1 owners and enthusiasts featuring specs, mods, and community.',
        technologies: ['React', 'Forums', 'Gallery'],
        features: ['ZR1 Specs', 'Modifications', 'Owner Registry', 'Community'],
        icon: FiTruck,
        color: '#B91C1C'
    },
    {
        id: 16,
        name: 'TechnologyAndTimes.com',
        status: 'early',
        category: 'Tech News',
        description: 'Technology news and analysis platform with Watch, Quiz, and Tech N Times features.',
        technologies: ['React', 'CMS', 'Quizzes', 'Video'],
        features: ['Tech News', 'Watch Content', 'Interactive Quizzes', 'Analysis'],
        icon: FiCode,
        color: '#4F46E5'
    },
    {
        id: 17,
        name: 'InvestmentTracker.com',
        status: 'early',
        category: 'Finance',
        description: 'Investment portfolio tracking and analysis platform for stocks, crypto, and diversified assets.',
        technologies: ['React', 'APIs', 'Charts', 'Analytics'],
        features: ['Portfolio Tracking', 'Market Data', 'Performance Analysis', 'Alerts'],
        icon: FiDollarSign,
        color: '#16A34A'
    },
    {
        id: 18,
        name: 'CreativeTracker.com',
        status: 'early',
        category: 'Creativity',
        description: 'Creative project management and inspiration tracking for artists, designers, and content creators.',
        technologies: ['React', 'Media', 'Collaboration'],
        features: ['Project Tracking', 'Inspiration Boards', 'Collaboration', 'Asset Management'],
        icon: FiStar,
        color: '#DB2777'
    },
    {
        id: 19,
        name: 'MyTelephoneBook.com',
        status: 'early',
        category: 'Contacts',
        description: 'Modern contact management and communication platform with smart organization features.',
        technologies: ['React', 'Contacts API', 'Sync'],
        features: ['Contact Management', 'Smart Groups', 'Communication History', 'Sync'],
        icon: FiUsers,
        color: '#0284C7'
    },
    {
        id: 20,
        name: 'AccessMoney',
        status: 'early',
        category: 'Fintech',
        description: 'Payment application platform for secure money transfers and financial transactions.',
        technologies: ['React', 'Payment API', 'Security', 'Mobile'],
        features: ['Money Transfers', 'Bill Pay', 'Secure Transactions', 'Account Management'],
        icon: FiDollarSign,
        color: '#7C3AED'
    },
    {
        id: 21,
        name: 'ApartyWithGifts.com',
        status: 'new',
        category: 'Events',
        description: 'Event planning and gift registry platform for parties, celebrations, and special occasions.',
        technologies: ['React', 'eCommerce', 'Calendar'],
        features: ['Event Planning', 'Gift Registry', 'Invitations', 'RSVP Management'],
        icon: FiCalendar,
        color: '#E11D48'
    },
    {
        id: 22,
        name: 'FitnessTracker',
        status: 'new',
        category: 'Health',
        description: 'Comprehensive fitness and health tracking application for workouts, nutrition, and wellness goals.',
        technologies: ['React', 'Mobile', 'Health APIs'],
        features: ['Workout Logging', 'Nutrition Tracking', 'Goal Setting', 'Progress Charts'],
        icon: FiActivity,
        color: '#EA580C'
    },
    {
        id: 23,
        name: 'LearningPlatform',
        status: 'new',
        category: 'Education',
        description: 'Online learning management system for courses, tutorials, and educational content delivery.',
        technologies: ['React', 'LMS', 'Video', 'Assessments'],
        features: ['Course Creation', 'Video Lessons', 'Quizzes', 'Certificates'],
        icon: FiBook,
        color: '#2563EB'
    },
    {
        id: 24,
        name: 'CorvetteQuiz',
        status: 'new',
        category: 'Entertainment',
        description: 'Interactive quiz platform for Corvette enthusiasts to test their knowledge and compete.',
        technologies: ['React', 'Gamification', 'Leaderboards'],
        features: ['Interactive Quizzes', 'Leaderboards', 'Badges', 'Social Sharing'],
        icon: FiStar,
        color: '#DC2626'
    },
    {
        id: 25,
        name: 'MusicStreaming',
        status: 'new',
        category: 'Entertainment',
        description: 'Music streaming and discovery platform for artists and listeners.',
        technologies: ['React', 'Audio APIs', 'Streaming'],
        features: ['Music Streaming', 'Playlists', 'Artist Profiles', 'Discovery'],
        icon: FiMusic,
        color: '#1DB954'
    },
    {
        id: 26,
        name: 'RealEstatePortal',
        status: 'new',
        category: 'Real Estate',
        description: 'Property listing and real estate marketplace for buyers, sellers, and agents.',
        technologies: ['React', 'Listings', 'Maps', 'Search'],
        features: ['Property Listings', 'Virtual Tours', 'Agent Connect', 'Mortgage Calculator'],
        icon: FiHome,
        color: '#0891B2'
    },
    {
        id: 27,
        name: 'RestaurantBooking',
        status: 'new',
        category: 'Scheduling',
        description: 'Restaurant reservation and table booking platform for diners and establishments.',
        technologies: ['React', 'Booking System', 'Calendar'],
        features: ['Table Reservations', 'Menu Preview', 'Reviews', 'Special Events'],
        icon: FiCalendar,
        color: '#CA8A04'
    },
    {
        id: 28,
        name: 'DentistBooking',
        status: 'new',
        category: 'Scheduling',
        description: 'Dental appointment scheduling platform for practices and patients.',
        technologies: ['React', 'Booking System', 'Reminders'],
        features: ['Appointment Scheduling', 'Patient Records', 'Reminders', 'Insurance'],
        icon: FiCalendar,
        color: '#0D9488'
    },
    {
        id: 29,
        name: 'AttorneyBooking',
        status: 'new',
        category: 'Scheduling',
        description: 'Legal consultation booking platform connecting clients with attorneys.',
        technologies: ['React', 'Booking System', 'Secure Messaging'],
        features: ['Consultation Booking', 'Attorney Profiles', 'Secure Documents', 'Billing'],
        icon: FiCalendar,
        color: '#4338CA'
    },
    {
        id: 30,
        name: 'TravelBooking',
        status: 'new',
        category: 'Travel',
        description: 'Comprehensive travel booking platform for flights, hotels, and vacation packages.',
        technologies: ['React', 'Travel APIs', 'Booking System'],
        features: ['Flight Search', 'Hotel Booking', 'Vacation Packages', 'Itineraries'],
        icon: FiMap,
        color: '#0369A1'
    },
    {
        id: 31,
        name: 'eComm React',
        status: 'early',
        category: 'eCommerce',
        description: 'React-based eCommerce platform template for online stores and marketplaces.',
        technologies: ['React', 'Redux', 'Stripe', 'Cart'],
        features: ['Product Catalog', 'Shopping Cart', 'Checkout', 'Order Management'],
        icon: FiShoppingCart,
        color: '#7C3AED'
    },
    {
        id: 32,
        name: 'eComm ReactNative',
        status: 'early',
        category: 'Mobile eCommerce',
        description: 'React Native mobile eCommerce application for iOS and Android platforms.',
        technologies: ['React Native', 'Mobile', 'Payments'],
        features: ['Mobile Shopping', 'Push Notifications', 'Offline Support', 'Native Performance'],
        icon: FiShoppingCart,
        color: '#2563EB'
    },
    {
        id: 33,
        name: 'TaskManager',
        status: 'early',
        category: 'Productivity',
        description: 'Task and project management application for personal and team productivity.',
        technologies: ['React', 'MongoDB', 'Real-time'],
        features: ['Task Lists', 'Projects', 'Deadlines', 'Collaboration'],
        icon: FiGrid,
        color: '#059669'
    },
    {
        id: 34,
        name: 'GoodDayMusic.com',
        status: 'active',
        category: 'Musical Instrument Retail',
        description: 'An eCommerce website for marketing guitar, bass, drums, audio, and audio gear.',
        technologies: ['Wix', 'Media Gallery'],
        features: ['Guitar Sales', 'Bass Sales', 'Drum Kits', 'Audio Gear'],
        icon: FiMusic,
        color: '#1DB954',
        website: 'http://www.GoodDayMusic.com'
    }
];

// Filter categories
const filterCategories = [
    { id: 'all', label: 'All Domains', icon: FiGlobe },
    { id: 'active', label: 'Active', icon: FiCheck },
    { id: 'early', label: 'Early Stage', icon: FiClock },
    { id: 'ready', label: 'Ready to Deploy', icon: FiPackage },
    { id: 'new', label: 'New Projects', icon: FiStar }
];

// Styled Components
const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
`;

const HeroSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.gradient};
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -20%;
        width: 60%;
        height: 150%;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        filter: blur(80px);
    }

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    }
`;

const HeroContent = styled.div`
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const PageTitle = styled(motion.h1)`
    font-size: 3.5rem;
    color: white;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled(motion.p)`
    font-size: 1.375rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;

    @media (max-width: 768px) {
        font-size: 1.125rem;
    }
`;

const StatsRow = styled(motion.div)`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xl};
    margin-top: ${({ theme }) => theme.spacing.xl};
    flex-wrap: wrap;
`;

const StatItem = styled.div`
    text-align: center;
    color: white;
`;

const StatValue = styled.div`
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: ${({ theme }) => theme.spacing.xs};

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.1em;
`;

const FilterSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.surface};
    position: sticky;
    top: 70px;
    z-index: 10;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const FilterContainer = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    flex-wrap: wrap;
`;

const FilterButton = styled(motion.button)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    background: ${props => props.$isActive ? props.theme.colors.gradient : props.theme.colors.background};
    color: ${props => props.$isActive ? 'white' : props.theme.colors.text};
    border: 1px solid ${props => props.$isActive ? 'transparent' : props.theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
        font-size: 1rem;
    }

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }

    @media (max-width: 600px) {
        padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
        font-size: 0.8rem;
    }
`;

const ContentSection = styled.section`
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

const DomainsGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: ${({ theme }) => theme.spacing.lg};

    @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`;

const DomainCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.lg};
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
        background: ${props => props.$accentColor || 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'};
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &:hover {
        transform: translateY(-8px) scale(1.02);
        box-shadow: 0 25px 50px ${({ theme }) => theme.colors.shadow};
        border-color: ${props => props.$accentColor || props.theme.colors.primary};

        &::before {
            transform: scaleX(1);
        }
    }
`;

const CardHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardIcon = styled.div`
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$color || 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    transition: transform 0.3s ease;

    ${DomainCard}:hover & {
        transform: scale(1.1) rotate(-5deg);
    }

    svg {
        font-size: 1.5rem;
        color: white;
    }
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    
    ${props => {
        switch (props.$status) {
            case 'active':
                return `
                    background: rgba(16, 185, 129, 0.15);
                    color: #10B981;
                `;
            case 'early':
                return `
                    background: rgba(245, 158, 11, 0.15);
                    color: #F59E0B;
                `;
            case 'ready':
                return `
                    background: rgba(59, 130, 246, 0.15);
                    color: #3B82F6;
                `;
            case 'new':
                return `
                    background: rgba(168, 85, 247, 0.15);
                    color: #A855F7;
                `;
            default:
                return `
                    background: rgba(107, 114, 128, 0.15);
                    color: #6B7280;
                `;
        }
    }}

    svg {
        font-size: 0.75rem;
    }
`;

const DomainName = styled.h3`
    font-size: 1.25rem;
    margin: 0 0 ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    transition: color 0.3s ease;

    ${DomainCard}:hover & {
        color: ${({ theme }) => theme.colors.primary};
    }

    svg {
        font-size: 0.875rem;
        opacity: 0.5;
    }
`;

const CategoryLabel = styled.span`
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Description = styled.p`
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.7;
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TechStack = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TechBadge = styled.span`
    padding: 4px 8px;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
`;

const FeaturesList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.xs};
`;

const FeatureTag = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 4px 10px;
    background: ${props => `${props.$color}15`};
    color: ${props => props.$color};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 0.7rem;
    font-weight: 600;

    svg {
        font-size: 0.65rem;
    }
`;

const NoResults = styled.div`
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xxl};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
`;

// Helper functions
const getStatusIcon = (status) => {
    switch (status) {
        case 'active':
            return FiCheck;
        case 'early':
            return FiClock;
        case 'ready':
            return FiPackage;
        case 'new':
            return FiStar;
        default:
            return FiGlobe;
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case 'active':
            return 'Active';
        case 'early':
            return 'Early Stage';
        case 'ready':
            return 'Ready';
        case 'new':
            return 'New';
        default:
            return 'Unknown';
    }
};

export default function DomainsPage() {
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredDomains = domains.filter(domain => {
        if (activeFilter === 'all') return true;
        return domain.status === activeFilter;
    });

    const stats = {
        total: domains.length,
        active: domains.filter(d => d.status === 'active').length,
        early: domains.filter(d => d.status === 'early').length,
        categories: [...new Set(domains.map(d => d.category))].length
    };

    // JSON-LD Structured Data for SEO
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Optical Automation Domain Portfolio',
        description: 'Comprehensive collection of premium web domains across technology, automotive, business, and lifestyle categories. All websites utilize SEO optimization by JSON Structured Data JSON-LD.',
        numberOfItems: domains.length,
        itemListElement: domains.map((domain, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
                '@type': 'WebSite',
                name: domain.name,
                description: domain.description,
                url: `https://${domain.name.toLowerCase().replace(/\s/g, '')}`,
                genre: domain.category,
                keywords: domain.technologies.join(', ')
            }
        }))
    };

    return (
        <PageWrapper>
            {/* JSON-LD Structured Data for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection>
                <HeroContent>
                    <PageTitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Domain Portfolio
                    </PageTitle>
                    <Subtitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Comprehensive domain appraisal showcasing our collection of premium web domains
                        across technology, automotive, business, and lifestyle categories. All websites
                        utilize SEO optimization with JSON Structured Data (JSON-LD) providing Internet Website Access.
                    </Subtitle>
                    <StatsRow
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <StatItem>
                            <StatValue>{stats.total}</StatValue>
                            <StatLabel>Total Domains</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>{stats.active}</StatValue>
                            <StatLabel>Active Sites</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>{stats.early}</StatValue>
                            <StatLabel>In Development</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>{stats.categories}</StatValue>
                            <StatLabel>Categories</StatLabel>
                        </StatItem>
                    </StatsRow>
                </HeroContent>
            </HeroSection>

            <FilterSection>
                <FilterContainer>
                    {filterCategories.map((filter) => (
                        <FilterButton
                            key={filter.id}
                            $isActive={activeFilter === filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <filter.icon />
                            {filter.label}
                        </FilterButton>
                    ))}
                </FilterContainer>
            </FilterSection>

            <ContentSection>
                <Container>
                    <AnimatePresence mode="wait">
                        {filteredDomains.length > 0 ? (
                            <DomainsGrid
                                key={activeFilter}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {filteredDomains.map((domain, index) => {
                                    const StatusIcon = getStatusIcon(domain.status);
                                    const cardContent = (
                                        <>
                                            <CardHeader>
                                                <CardIcon $color={domain.color}>
                                                    <domain.icon />
                                                </CardIcon>
                                                <StatusBadge $status={domain.status}>
                                                    <StatusIcon />
                                                    {getStatusLabel(domain.status)}
                                                </StatusBadge>
                                            </CardHeader>
                                            <DomainName>
                                                {domain.name}
                                                <FiExternalLink />
                                            </DomainName>
                                            <CategoryLabel>{domain.category}</CategoryLabel>
                                            <Description>{domain.description}</Description>
                                            <TechStack>
                                                {domain.technologies.map((tech, idx) => (
                                                    <TechBadge key={idx}>{tech}</TechBadge>
                                                ))}
                                            </TechStack>
                                            <FeaturesList>
                                                {domain.features.slice(0, 3).map((feature, idx) => (
                                                    <FeatureTag key={idx} $color={domain.color}>
                                                        <FiCheck />
                                                        {feature}
                                                    </FeatureTag>
                                                ))}
                                            </FeaturesList>
                                        </>
                                    );
                                    return (
                                        <DomainCard
                                            key={domain.id}
                                            $accentColor={domain.color}
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            as={domain.website ? 'a' : 'div'}
                                            href={domain.website || undefined}
                                            target={domain.website ? '_blank' : undefined}
                                            rel={domain.website ? 'noopener noreferrer' : undefined}
                                            style={{ textDecoration: 'none', cursor: domain.website ? 'pointer' : 'default' }}
                                        >
                                            {cardContent}
                                        </DomainCard>
                                    );
                                })}
                            </DomainsGrid>
                        ) : (
                            <NoResults>
                                No domains found in this category.
                            </NoResults>
                        )}
                    </AnimatePresence>
                </Container>
            </ContentSection>
        </PageWrapper>
    );
}
