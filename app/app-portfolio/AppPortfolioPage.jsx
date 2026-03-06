'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { generateBreadcrumbJsonLd } from '@/lib/metadata';
import {
  FiSmartphone,
  FiGlobe,
  FiCode,
  FiLayout,
  FiUsers,
  FiBook,
  FiMusic,
  FiHeart,
  FiTrendingUp,
  FiShoppingCart,
  FiArrowRight,
  FiExternalLink,
  FiMonitor,
  FiAward,
  FiPackage,
  FiMapPin,
  FiPlay,
  FiCamera,
  FiCheck,
  FiCpu,
  FiZap,
  FiDollarSign,
  FiCalendar,
  FiStar,
  FiUser,
  FiX,
  FiChevronDown,
  FiClock
} from 'react-icons/fi';

// ── App Data ──────────────────────────────────────────────
const appCategories = [
  {
    id: 'all',
    label: 'Websites',
    icon: FiPackage,
    color: '#6366F1'
  },
  {
    id: 'ios',
    label: 'iOS',
    icon: FiSmartphone,
    color: '#F06449'
  },
  {
    id: 'android',
    label: 'Android',
    icon: FiSmartphone,
    color: '#3DDC84'
  }
];

const apps = [
  {
    id: 'optical-automation',
    name: 'Optical Automation',
    subtitle: 'Web & Mobile Suite',
    description: 'Full-featured native SwiftUI app with 5-tab navigation (Home, DeskView, Portfolio, Subscribe, More), dark mode, "Information At The Speed Of Light" tagline, subscription plans (Free & Pro $9.99/mo), native portfolio browser with Next.JS/MERN/SwiftUI/Android tabs, integrated WebKit views, and contact form.',
    websiteScreenshots: [
      { src: '/imgs/website-screenshops/optical-1.png', label: 'Website Home' },
      { src: '/imgs/website-screenshops/optical-2.png', label: 'Portfolio' }
    ],
    websiteScreenshots: [
      { src: '/imgs/website-screenshops/optical-1.png', label: 'Website Home' },
      { src: '/imgs/website-screenshops/optical-2.png', label: 'Portfolio' }
    ],
    icon: FiGlobe,
    color: '#6366F1',
    platforms: ['ios'],
    status: 'Live',
    features: ['5-Tab Navigation', 'Dark Mode', 'Subscription Plans', 'Native Portfolio', 'SwiftUI', 'WebKit Integration', 'Contact Form', 'In-App Purchase'],
    website: '/apps/optical-automation'
  },
  {
    id: 'james-avakian',
    name: 'James Avakian',
    subtitle: 'Personal Bio & Portfolio',
    description: 'Native SwiftUI bio app with 5-tab navigation (Home, Explore, Search, Contact, Profile). Features 4 categories, 26 sections, 20+ videos across Biography, Entertainment, Technology, and Resources. Includes full-text search, contact form, profile with education (Cal Poly SLO — BS Electronics Engineering Technology), and Founder\'s Journey.',
    icon: FiUser,
    color: '#8B5CF6',
    platforms: ['ios'],
    status: 'Live',
    features: ['5-Tab Navigation', 'Search Everything', '26 Sections', '20+ Videos', 'Contact Form', 'Profile', 'Dark Mode', 'SwiftUI Native'],
    website: '/apps/james-avakian'
  },
  {
    id: 'snowy-christmas',
    name: 'A Snowy Christmas',
    subtitle: 'Winter Stories & Poems',
    description: 'A magical mystical collection of stories, poems, bedtime tales, and futures by Anonymous. Features 5-tab navigation (Home, Stories, Search, Favorites, Settings), full audio narration with voice type selection, reading speed controls, dark mode, procedurally generated songs, and beautifully illustrated winter content.',
    icon: FiBook,
    color: '#7DD3FC',
    platforms: ['ios'],
    status: 'Live',
    features: ['Audio Narration', 'Voice Selection', 'Stories & Poems', 'Favorites', 'Search', 'Dark Mode', 'Reading Speed', 'SwiftUI Native'],
    website: '/apps/snowy-christmas'
  },
  {
    id: 'mydeskview',
    name: 'MyDeskView',
    subtitle: 'Desktop Productivity Suite',
    description: '27+ integrated applications across Business, Education, Entertainment, Productivity, and Health categories with native iOS interface.',
    icon: FiMonitor,
    color: '#0EA5E9',
    platforms: ['ios'],
    status: 'Live',
    features: ['27+ Apps', 'Widget System', 'Cross-App Sync', 'Real-time Updates'],
    website: '/apps/mydeskview'
  },
  {
    id: 'technology-and-times',
    name: 'Technology And Times',
    subtitle: 'Technology Portal',
    description: 'Technology news and articles covering Technology, Computers, Homes, Automobiles, Corporations, and Government with native SwiftUI views.',
    icon: FiCpu,
    color: '#10B981',
    platforms: ['ios'],
    status: 'Live',
    features: ['News Feed', 'Category Browse', 'Offline Reading', 'Push Alerts'],
    website: '/apps/technology-and-times'
  },
  {
    id: 'americatoday250',
    name: 'AmericaToday250',
    subtitle: 'American History',
    description: 'American history from George Washington arranged in decades, featuring all presidents, current officials, and comprehensive government appendix.',
    icon: FiBook,
    color: '#DC2626',
    platforms: ['ios'],
    status: 'Live',
    features: ['Timeline View', 'President Database', 'Interactive Maps', 'Search'],
    website: '/apps/americatoday250'
  },
  {
    id: 'learnskills365',
    name: 'LearnSkills365',
    subtitle: 'Educational Platform',
    description: 'Interactive learning platform for Math, Reading, Writing, Memory, Typing, Geography, and Quizzes with progress tracking.',
    icon: FiBook,
    color: '#F59E0B',
    platforms: ['ios'],
    status: 'Live',
    features: ['7 Subjects', 'Progress Tracking', 'Quizzes', 'Achievements'],
    website: '/apps/learnskills365'
  },
  {
    id: 'corvettequiz',
    name: 'CorvetteQuiz',
    subtitle: 'iOS Game',
    description: 'Interactive quiz testing knowledge of Corvette history, models, specifications, and racing heritage with beautiful animations.',
    icon: FiAward,
    color: '#EF4444',
    platforms: ['ios'],
    status: 'Live',
    features: ['Score Tracking', 'Achievements', 'Leaderboard', 'Beautiful UI'],
    website: '/apps/corvette-quiz'
  },
  {
    id: 'accessmoney',
    name: 'AccessMoney',
    subtitle: 'Business & Finance',
    description: 'Financial access and money management application with account tracking, budgeting, and detailed financial reports.',
    icon: FiDollarSign,
    color: '#10B981',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Account Tracking', 'Budgeting', 'Reports', 'Secure Login'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'ai-trading',
    name: 'AI Trading',
    subtitle: 'Investment Analysis',
    description: 'AI-powered trading and investment analysis platform with market predictions and portfolio management.',
    icon: FiTrendingUp,
    color: '#6366F1',
    platforms: ['ios'],
    status: 'Pending',
    features: ['AI Predictions', 'Portfolio View', 'Market Analysis', 'Alerts'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'bistrorestaurant',
    name: 'BistroRestaurant',
    subtitle: 'Restaurant Management',
    description: 'Restaurant management and ordering platform with menu builder, order tracking, and table management.',
    icon: FiShoppingCart,
    color: '#EF4444',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Menu Builder', 'Order Tracking', 'Table Mgmt', 'Analytics'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'gooddaymusic',
    name: 'GoodDayMusic',
    subtitle: 'Music Discovery',
    description: 'Music discovery and playlist management application with genre browsing and artist information.',
    icon: FiMusic,
    color: '#10B981',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Playlist Builder', 'Genre Browse', 'Artist Info', 'Favorites'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'fitnesstracker',
    name: 'FitnessTracker',
    subtitle: 'Health & Fitness',
    description: 'Fitness activity tracking and workout management with step counting, workout logs, and goal tracking.',
    icon: FiHeart,
    color: '#10B981',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Workout Logs', 'Step Counter', 'Goals', 'HealthKit'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'taskmanager',
    name: 'TaskManager',
    subtitle: 'Productivity',
    description: 'Task management and productivity tracking application with lists, due dates, and priority levels.',
    icon: FiCheck,
    color: '#8B5CF6',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Task Lists', 'Due Dates', 'Priority Levels', 'Reminders'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'oscartracker',
    name: 'OscarTracker',
    subtitle: 'Entertainment',
    description: 'Interactive Academy Awards history and tracking with nominees, winners, and predictions.',
    icon: FiAward,
    color: '#F59E0B',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Award History', 'Nominees', 'Predictions', 'Search'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'cruisefinder',
    name: 'CruiseFinder',
    subtitle: 'Travel',
    description: 'Cruise vacation search and discovery with ship details, itineraries, and reviews.',
    icon: FiMapPin,
    color: '#0EA5E9',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Ship Search', 'Itineraries', 'Reviews', 'Booking Links'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'photoalbums',
    name: 'PhotoAlbums',
    subtitle: 'Photography',
    description: 'Photo organization and album management for your digital memories with sharing options.',
    icon: FiCamera,
    color: '#EC4899',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Album Creation', 'Photo Organization', 'Sharing', 'Memory Timeline'],
    website: 'https://mydeskview.com'
  },
  {
    id: 'mydatebook',
    name: 'MyDateBook',
    subtitle: 'Calendar & Events',
    description: 'Personal date and event management with reminders, notes, and calendar views.',
    icon: FiCalendar,
    color: '#8B5CF6',
    platforms: ['ios'],
    status: 'Pending',
    features: ['Event Planning', 'Reminders', 'Notes', 'Calendar Sync'],
    website: 'https://mydeskview.com'
  }
];

const appGroups = [
  {
    id: 'featured-websites',
    title: 'Featured Websites',
    icon: FiGlobe,
    color: '#6366F1',
    appIds: ['optical-automation', 'mydeskview', 'technology-and-times', 'americatoday250', 'learnskills365']
  },
  {
    id: 'personal-creative',
    title: 'Personal & Creative',
    icon: FiUser,
    color: '#8B5CF6',
    appIds: ['james-avakian', 'snowy-christmas', 'photoalbums']
  },
  {
    id: 'business-finance',
    title: 'Business & Finance',
    icon: FiTrendingUp,
    color: '#10B981',
    appIds: ['accessmoney', 'ai-trading', 'bistrorestaurant']
  },
  {
    id: 'entertainment-leisure',
    title: 'Entertainment & Leisure',
    icon: FiMusic,
    color: '#EC4899',
    appIds: ['corvettequiz', 'gooddaymusic', 'oscartracker', 'cruisefinder']
  },
  {
    id: 'productivity-health',
    title: 'Productivity & Health',
    icon: FiLayout,
    color: '#F59E0B',
    appIds: ['taskmanager', 'fitnesstracker', 'mydatebook']
  }
];

function groupAppsByCategory(appList) {
  return appGroups
    .map(group => ({
      ...group,
      apps: group.appIds
        .map(id => appList.find(a => a.id === id))
        .filter(Boolean)
    }))
    .filter(group => group.apps.length > 0);
}

// ── Styled Components ─────────────────────────────────────
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSection = styled.section`
  position: relative;
  margin-top: 24px;
  padding: 94px 20px 90px;
  text-align: center;
  overflow: hidden;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
    : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #ddd6fe 100%)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.mode === 'dark'
    ? 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(148, 96, 250, 0.2) 0%, transparent 60%)'
    : 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(148, 96, 250, 0.1) 0%, transparent 60%)'};
    pointer-events: none;
  }

  /* Floating orbs */
  &::after {
    content: '';
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
    top: -80px;
    right: -80px;
    animation: floatOrb 8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-25px, 25px); }
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 800px;
  margin: 0 auto;
`;

const HeroBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(99, 102, 241, 0.12)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.25)'};
  border-radius: 50px;
  padding: 8px 20px;
  margin-bottom: 24px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.mode === 'dark' ? '#a5b4fc' : '#4f46e5'};
  backdrop-filter: blur(10px);

  svg {
    color: ${({ theme }) => theme.mode === 'dark' ? '#818cf8' : '#6366f1'};
  }
`;

const HeroLogo = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0 0 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  line-height: 1.15;
`;

const HeroTitleText = styled.span`
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(135deg, #fff 0%, #a5b4fc 50%, #c084fc 100%)'
    : 'linear-gradient(135deg, #1e1b4b 0%, #4f46e5 50%, #7c3aed 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(30, 27, 75, 0.7)'};
  max-width: 600px;
  margin: 0 auto 32px;
  line-height: 1.65;
`;

const StatsBar = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const StatItem = styled.div`
  text-align: center;

  .value {
    font-size: 1.8rem;
    font-weight: 800;
    background: linear-gradient(135deg, #6366f1, #9460fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .label {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(30, 27, 75, 0.5)'};
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-top: 2px;
  }
`;

const ContentSection = styled.section`
  max-width: 1280px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 48px;
`;

const FilterButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: 12px;
  border: 1px solid ${({ $active, theme }) => $active ? 'rgba(99, 102, 241, 0.6)' : theme.colors.border};
  background: ${({ $active, theme }) => $active
    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.25), rgba(148, 96, 250, 0.2))'
    : theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ $active, theme }) => $active ? '#6366f1' : theme.colors.textSecondary};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    border-color: rgba(99, 102, 241, 0.4);
    color: #6366f1;
    background: rgba(99, 102, 241, 0.12);
    transform: translateY(-1px);
  }

  svg {
    font-size: 1rem;
  }
`;

const AppGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AppCard = styled(motion.div)`
  position: relative;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.03)' : theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 20px;
  padding: 28px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $color }) => $color || '#6366f1'};
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: ${({ $color }) => $color || '#6366f1'}40;
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(99, 102, 241, 0.04)'};
    transform: translateY(-4px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow},
                0 0 0 1px ${({ $color }) => $color || '#6366f1'}20;

    &::before {
      opacity: 1;
    }
  }
`;

const SectionBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'rgba(99, 102, 241, 0.12)'
    : 'rgba(99, 102, 241, 0.10)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark'
    ? 'rgba(99, 102, 241, 0.3)'
    : 'rgba(99, 102, 241, 0.25)'};
  border-radius: 50px;
  padding: 10px 28px;
  margin: 0 auto 36px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark' ? '#a5b4fc' : '#4f46e5'};
  backdrop-filter: blur(10px);
  text-align: center;
  width: fit-content;

  svg {
    color: ${({ theme }) => theme.mode === 'dark' ? '#818cf8' : '#6366f1'};
    font-size: 1.1rem;
  }
`;

const SectionBadgeWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 8px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 16px;
`;

const AppIconBox = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ $color }) => $color || '#6366f1'}18;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.5rem;
    color: ${({ $color }) => $color || '#6366f1'};
  }
`;

const AppInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const AppName = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin: 0 0 4px;
`;

const AppSubtitle = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  color: ${({ $color }) => $color || '#6366f1'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: ${({ $status }) => $status === 'Pending' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(16, 185, 129, 0.15)'};
  color: ${({ $status }) => $status === 'Pending' ? '#F59E0B' : '#34d399'};
  border: 1px solid ${({ $status }) => $status === 'Pending' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)'};
  flex-shrink: 0;
  margin-top: 4px;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $status }) => $status === 'Pending' ? '#F59E0B' : '#34d399'};
  }
`;

const AppDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin: 0 0 18px;
`;

const PlatformTags = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const PlatformTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.72rem;
  font-weight: 600;
  background: ${({ $platform }) => {
    switch ($platform) {
      case 'ios': return 'rgba(240, 100, 73, 0.12)';
      case 'android': return 'rgba(61, 220, 132, 0.12)';
      case 'cross-platform': return 'rgba(14, 165, 233, 0.12)';
      default: return 'rgba(99, 102, 241, 0.12)';
    }
  }};
  color: ${({ $platform }) => {
    switch ($platform) {
      case 'ios': return '#F06449';
      case 'android': return '#3DDC84';
      case 'cross-platform': return '#0EA5E9';
      default: return '#818cf8';
    }
  }};
  border: 1px solid ${({ $platform }) => {
    switch ($platform) {
      case 'ios': return 'rgba(240, 100, 73, 0.2)';
      case 'android': return 'rgba(61, 220, 132, 0.2)';
      case 'cross-platform': return 'rgba(14, 165, 233, 0.2)';
      default: return 'rgba(99, 102, 241, 0.2)';
    }
  }};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

const FeatureList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

const FeatureChip = styled.span`
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 500;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const ScreenshotGallery = styled.div`
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 4px 0 12px;
  margin-bottom: 16px;
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'} transparent;

  &::-webkit-scrollbar {
    height: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'};
    border-radius: 2px;
  }
`;

const ScreenshotItem = styled.div`
  flex-shrink: 0;
  width: 120px;
  text-align: center;
  cursor: pointer;

  img {
    width: 120px;
    height: 213px;
    object-fit: cover;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)'};
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: scale(1.08);
      box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
    }
  }

  span {
    display: block;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 6px;
  }
`;

// ── Lightbox Modal ──────────────────────────
const LightboxOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  cursor: pointer;
  padding: 40px;
`;

const LightboxContent = styled(motion.div)`
  position: relative;
  max-width: 420px;
  width: 100%;
  cursor: default;

  img {
    width: 100%;
    height: auto;
    border-radius: 20px;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
  }
`;

const LightboxLabel = styled(motion.p)`
  text-align: center;
  margin-top: 16px;
  font-size: 0.95rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.3px;
`;

const LightboxClose = styled(motion.button)`
  position: absolute;
  top: -48px;
  right: -4px;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 0.82rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;

    &.primary {
      background: ${({ $color }) => $color || '#6366f1'};
      color: white;

      &:hover {
        filter: brightness(1.15);
        transform: translateY(-1px);
      }
    }

    &.secondary {
      background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
      color: ${({ theme }) => theme.colors.textSecondary};
      border: 1px solid ${({ theme }) => theme.colors.border};

      &:hover {
        background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)'};
        color: ${({ theme }) => theme.colors.text};
      }
    }
  }
`;

const CTASection = styled.section`
  text-align: center;
  padding: 60px 20px 80px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.06) 100%)'
    : 'linear-gradient(180deg, transparent 0%, rgba(99, 102, 241, 0.04) 100%)'};
`;

const CTATitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 14px;
`;

const CTASubtitle = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 28px;
  max-width: 500px;
  display: inline-block;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: 14px;
  font-size: 1rem;
  font-weight: 700;
  text-decoration: none;
  color: white;
  background: linear-gradient(135deg, #6366f1, #9460fa);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(99, 102, 241, 0.3);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

// ── Breadcrumb ─────────────────────────────
const BreadcrumbContainer = styled.nav`
  max-width: 1280px;
  margin: 0 auto;
  padding: 16px 20px 0;
  font-size: 0.82rem;

  a {
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    transition: color 0.2s;

    &:hover { color: ${({ theme }) => theme.colors.primary}; }
  }

  span {
    color: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.3)'};
    margin: 0 8px;
  }

  .current {
    color: ${({ theme }) => theme.colors.text};
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 60px 20px;
  grid-column: 1 / -1;

  svg {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 16px;
    opacity: 0.5;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 8px;
  }

  p {
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

// ── Group Accordion Components ────────────────
const GroupAccordionWrap = styled.div`
  margin-bottom: 16px;
`;

const GroupAccordionBtn = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 28px;
  border-radius: 16px;
  border: 1px solid ${({ $color, theme }) => theme.mode === 'dark' ? `${$color}33` : `${$color}40`};
  background: ${({ $color, theme }) => theme.mode === 'dark'
    ? `linear-gradient(135deg, ${$color}14, ${$color}0a)`
    : `linear-gradient(135deg, ${$color}0f, ${$color}08)`};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ $color }) => `${$color}66`};
    background: ${({ $color, theme }) => theme.mode === 'dark'
      ? `linear-gradient(135deg, ${$color}1f, ${$color}14)`
      : `linear-gradient(135deg, ${$color}1a, ${$color}10)`};
  }
`;

const GroupAccordionIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: ${({ $color }) => `${$color}22`};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
    color: ${({ $color }) => $color};
  }
`;

const GroupAccordionTitleBlock = styled.div`
  flex: 1;
  text-align: left;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 2px;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const GroupAccordionChevron = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const GroupAccordionBody = styled(motion.div)`
  overflow: hidden;
`;

const GroupAppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
  padding: 20px 0 0;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// ── Accordion Components ──────────────────────
const AccordionSection = styled.div`
  margin-top: 48px;
`;

const AccordionHeader = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 28px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(245, 158, 11, 0.25)'};
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(234, 88, 12, 0.06))'
    : 'linear-gradient(135deg, rgba(245, 158, 11, 0.06), rgba(234, 88, 12, 0.04))'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(245, 158, 11, 0.4);
    background: ${({ theme }) => theme.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(234, 88, 12, 0.1))'
      : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(234, 88, 12, 0.08))'};
  }
`;

const AccordionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const AccordionIconBox = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(245, 158, 11, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.25rem;
    color: #F59E0B;
  }
`;

const AccordionTitle = styled.div`
  text-align: left;

  h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 2px;
  }

  span {
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const AccordionChevron = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)'};
  flex-shrink: 0;

  svg {
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const AccordionBody = styled(motion.div)`
  overflow: hidden;
`;

const PendingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
  padding: 20px 0 0;
`;

const PendingItem = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.02)' : theme.colors.surface};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ $color }) => $color || '#6366f1'}40;
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(99, 102, 241, 0.03)'};
    transform: translateX(4px);
  }
`;

const PendingIconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ $color }) => $color || '#6366f1'}15;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    font-size: 1.1rem;
    color: ${({ $color }) => $color || '#6366f1'};
  }
`;

const PendingInfo = styled.div`
  flex: 1;
  min-width: 0;

  h4 {
    font-size: 0.95rem;
    font-weight: 650;
    color: ${({ theme }) => theme.colors.text};
    margin: 0 0 2px;
  }

  span {
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.3px;
  }
`;

const PendingBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(245, 158, 11, 0.12);
  color: #F59E0B;
  border: 1px solid rgba(245, 158, 11, 0.2);
  flex-shrink: 0;
  white-space: nowrap;

  svg {
    font-size: 0.7rem;
  }
`;

// ── Helper ─────────────────────────────────
const platformLabel = (p) => {
  switch (p) {
    case 'ios': return 'iOS';
    case 'android': return 'Android';
    case 'cross-platform': return 'Cross-Platform';
    default: return p;
  }
};

// ── Component ──────────────────────────────
export default function AppPortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);
  const [openGroups, setOpenGroups] = useState({});

  const toggleGroup = (groupKey) => {
    setOpenGroups(prev => ({ ...prev, [groupKey]: !prev[groupKey] }));
  };

  const closeLightbox = useCallback(() => setLightboxImage(null), []);
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') closeLightbox(); };
    if (lightboxImage) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxImage, closeLightbox]);

  const allFiltered = activeFilter === 'all'
    ? apps
    : apps.filter(app => app.platforms.includes(activeFilter));


  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: 'https://opticalautomation.com' },
    { name: 'Portfolio', url: 'https://opticalautomation.com/portfolio' },
    { name: 'Software Product Portfolio', url: 'https://opticalautomation.com/app-portfolio' }
  ]);

  return (
    <PageContainer>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <HeroSection>
        <HeroContent>
          {/* Hero badge removed per request */}

          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <HeroLogo>
              <Image src="/opauto.png" alt="Optical Automation" fill style={{ objectFit: 'contain' }} />
            </HeroLogo>
            <HeroTitleText>Software Product Portfolio</HeroTitleText>
          </HeroTitle>

          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore our collection of Websites and Mobile Apps.
          </HeroSubtitle>

          <StatsBar
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <StatItem>
              <div className="value">8</div>
              <div className="label">Websites</div>
            </StatItem>
            <StatItem>
              <div className="value">8+</div>
              <div className="label">Mobile Apps</div>
            </StatItem>
            <StatItem>
              <div className="value">2</div>
              <div className="label">Platforms</div>
            </StatItem>
            <StatItem>
              <div className="value">6</div>
              <div className="label">Categories</div>
            </StatItem>
            <StatItem>
              <div className="value">100+</div>
              <div className="label">Features</div>
            </StatItem>
          </StatsBar>
        </HeroContent>
      </HeroSection>

      {/* Breadcrumb */}
      <BreadcrumbContainer>
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/portfolio">Portfolio</Link>
        <span>/</span>
        <span className="current">Software Product Portfolio</span>
      </BreadcrumbContainer>

      {/* Main Content */}
      <ContentSection>
        {/* Filters */}
        <FilterBar>
          {appCategories.map(cat => (
            <FilterButton
              key={cat.id}
              $active={activeFilter === cat.id}
              onClick={() => setActiveFilter(cat.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <cat.icon />
              {cat.label}
            </FilterButton>
          ))}
        </FilterBar>

        {/* Grouped Accordions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {groupAppsByCategory(allFiltered).length === 0 ? (
              <EmptyState
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <FiSmartphone />
                <h3>No Android Apps Available Yet</h3>
                <p>Android applications are coming soon. Stay tuned for updates as we expand to the Android platform.</p>
              </EmptyState>
            ) : (
              groupAppsByCategory(allFiltered).map((group) => {
                const groupKey = `${activeFilter}-${group.id}`;
                return (
                  <GroupAccordionWrap key={group.id}>
                    <GroupAccordionBtn
                      $color={group.color}
                      onClick={() => toggleGroup(groupKey)}
                      whileTap={{ scale: 0.995 }}
                    >
                      <GroupAccordionIcon $color={group.color}>
                        <group.icon />
                      </GroupAccordionIcon>
                      <GroupAccordionTitleBlock>
                        <h3>{group.title}</h3>
                        <span>{group.apps.length} title{group.apps.length !== 1 ? 's' : ''}</span>
                      </GroupAccordionTitleBlock>
                      <GroupAccordionChevron
                        animate={{ rotate: openGroups[groupKey] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <FiChevronDown />
                      </GroupAccordionChevron>
                    </GroupAccordionBtn>

                    <AnimatePresence initial={false}>
                      {openGroups[groupKey] && (
                        <GroupAccordionBody
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        >
                          <GroupAppGrid>
                            {group.apps.map((app, index) => (
                              <AppCard
                                key={app.id}
                                $color={app.color}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.06 }}
                              >
                                <CardHeader>
                                  <AppIconBox $color={app.color}>
                                    <app.icon />
                                  </AppIconBox>
                                  <AppInfo>
                                    <AppName>{app.name}</AppName>
                                    <AppSubtitle $color={app.color}>{app.subtitle}</AppSubtitle>
                                  </AppInfo>
                                  <StatusBadge $status={app.status}>{app.status}</StatusBadge>
                                </CardHeader>

                                <AppDescription>{app.description}</AppDescription>

                                {app.screenshots && app.screenshots.length > 0 && (
                                  <ScreenshotGallery>
                                    {app.screenshots.map((shot) => (
                                      <ScreenshotItem key={shot.label} onClick={() => setLightboxImage({ src: shot.src, label: `${app.name} — ${shot.label}` })}>
                                        <img src={shot.src} alt={`${app.name} — ${shot.label}`} loading="lazy" />
                                        <span>{shot.label}</span>
                                      </ScreenshotItem>
                                    ))}
                                  </ScreenshotGallery>
                                )}

                                <PlatformTags>
                                  {app.platforms.map(p => (
                                    <PlatformTag key={p} $platform={p}>
                                      <FiSmartphone size={10} />
                                      {platformLabel(p)}
                                    </PlatformTag>
                                  ))}
                                </PlatformTags>

                                <FeatureList>
                                  {app.features.map(f => (
                                    <FeatureChip key={f}>{f}</FeatureChip>
                                  ))}
                                </FeatureList>

                                <CardActions $color={app.color}>
                                  {app.website.startsWith('/') ? (
                                    <Link href={app.website} className="primary">
                                      <FiExternalLink size={14} /> Visit
                                    </Link>
                                  ) : (
                                    <a href={app.website} className="primary" target="_blank" rel="noopener noreferrer">
                                      <FiExternalLink size={14} /> Visit
                                    </a>
                                  )}
                                  <Link href="/portfolio" className="secondary">
                                    <FiCode size={14} /> Details
                                  </Link>
                                </CardActions>
                              </AppCard>
                            ))}
                          </GroupAppGrid>
                        </GroupAccordionBody>
                      )}
                    </AnimatePresence>
                  </GroupAccordionWrap>
                );
              })
            )}
          </motion.div>
        </AnimatePresence>
      </ContentSection>

      {/* CTA */}
      <CTASection>
        <CTATitle>Want a Mobile App?</CTATitle>
        <CTASubtitle>
          We build native iOS and Android applications with SwiftUI and ReactNative.
          Let&apos;s bring your idea to life.
        </CTASubtitle>
        <br />
        <CTAButton href="/pricing">
          View Pricing <FiArrowRight />
        </CTAButton>
      </CTASection>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightboxImage(null)}
          >
            <LightboxContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <LightboxClose
                onClick={() => setLightboxImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX />
              </LightboxClose>
              <img src={lightboxImage.src} alt={lightboxImage.label} />
              <LightboxLabel
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {lightboxImage.label}
              </LightboxLabel>
            </LightboxContent>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}
