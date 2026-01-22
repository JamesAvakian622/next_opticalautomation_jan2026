'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { generateBreadcrumbJsonLd } from '@/lib/metadata';
import FavoriteButton from '@/components/FavoriteButton';
import {
  FiExternalLink,
  FiArrowRight,
  FiLayout,
  FiShoppingCart,
  FiUsers,
  FiCode,
  FiDatabase,
  FiPieChart,
  FiCamera,
  FiMusic,
  FiBook,
  FiHome,
  FiTruck,
  FiHeart,
  FiCloud,
  FiMonitor,
  FiSmartphone,
  FiGlobe,
  FiTrendingUp,
  FiZap,
  FiLayers,
  FiServer,
  FiCpu,
  FiPackage,
  FiPlay,
  FiMessageSquare,
  FiMapPin,
  FiDollarSign
} from 'react-icons/fi';

// Tab Categories Data
const tabCategories = [
  {
    id: 'react-nextjs',
    label: 'ReactJS / NextJS',
    icon: FiCode,
    color: 'linear-gradient(135deg, #61DAFB 0%, #0070F3 100%)',
    projects: [
      {
        id: 'react-dashboard',
        title: 'Enterprise Dashboard Pro',
        category: 'ReactJS Application',
        description: 'Advanced admin dashboard with real-time analytics, data visualization, and role-based access control built with React 18 and Redux Toolkit.',
        detailedDescription: 'Enterprise Dashboard Pro is a comprehensive business intelligence platform built with React 18, Redux Toolkit, and React Query. Features include customizable widget layouts, real-time WebSocket data streaming, interactive Chart.js visualizations, and granular permission systems. The responsive design adapts seamlessly from mobile to 4K displays.',
        icon: FiPieChart,
        color: '#61DAFB',
        website: 'https://example-dashboard.com'
      },
      {
        id: 'nextjs-ecommerce',
        title: 'ShopNext E-Commerce',
        category: 'Next.js Application',
        description: 'Full-stack e-commerce platform with SSR/SSG, Stripe integration, and headless CMS powered by Next.js 14 App Router.',
        detailedDescription: 'ShopNext leverages Next.js 14 App Router for optimal performance with server-side rendering, static site generation, and incremental static regeneration. Includes Stripe payment processing, inventory management, customer authentication via NextAuth.js, and integration with Sanity CMS for content management.',
        icon: FiShoppingCart,
        color: '#0070F3',
        website: 'https://example-shopnext.com'
      },
      {
        id: 'react-social',
        title: 'ConnectHub Social Platform',
        category: 'ReactJS Application',
        description: 'Modern social networking app with real-time messaging, post feeds, and notification system using React and Socket.io.',
        detailedDescription: 'ConnectHub delivers a seamless social experience with React functional components, Context API for state management, and Socket.io for real-time communication. Features include infinite scrolling feeds, media uploads via Cloudinary, friend suggestions algorithm, and push notifications.',
        icon: FiUsers,
        color: '#E91E63',
        website: 'https://example-connecthub.com'
      },
      {
        id: 'nextjs-blog',
        title: 'DevBlog Publishing Platform',
        category: 'Next.js Application',
        description: 'Developer blog platform with MDX support, syntax highlighting, and SEO optimization built on Next.js.',
        detailedDescription: 'DevBlog is a performant publishing platform utilizing Next.js static generation for blazing-fast page loads. Features MDX for rich content authoring, Prism.js syntax highlighting, automatic table of contents generation, RSS feed, and comprehensive SEO with structured data.',
        icon: FiBook,
        color: '#10B981',
        website: 'https://example-devblog.com'
      },
      {
        id: 'react-music',
        title: 'WaveFlow Music Player',
        category: 'ReactJS Application',
        description: 'Spotify-inspired music streaming interface with playlist management, audio visualization, and offline support.',
        detailedDescription: 'WaveFlow showcases advanced React audio handling with Web Audio API integration for visualizations, IndexedDB for offline playlist caching, and background audio playback. Includes cross-device sync, collaborative playlists, and AI-powered recommendations.',
        icon: FiMusic,
        color: '#1DB954',
        website: 'https://example-waveflow.com'
      },
      {
        id: 'nextjs-portfolio',
        title: 'CreativeForge Portfolio',
        category: 'Next.js Application',
        description: 'Stunning portfolio template with Framer Motion animations, project galleries, and contact form integration.',
        detailedDescription: 'CreativeForge is a premium portfolio starter using Next.js and Framer Motion for jaw-dropping animations. Features include project filtering, image galleries with lightbox, testimonials carousel, and Resend email integration for the contact form.',
        icon: FiLayers,
        color: '#8B5CF6',
        website: 'https://example-creativeforge.com'
      }
    ]
  },
  {
    id: 'mern',
    label: 'MERN Stack',
    icon: FiDatabase,
    color: 'linear-gradient(135deg, #68A063 0%, #3F3F3F 100%)',
    projects: [
      {
        id: 'mern-marketplace',
        title: 'MarketPlace Hub',
        category: 'MERN Application',
        description: 'Multi-vendor marketplace with seller dashboards, product reviews, and secure payment processing using MongoDB, Express, React, and Node.',
        detailedDescription: 'MarketPlace Hub is a comprehensive multi-vendor platform featuring seller storefronts, product listings with variants, customer reviews with moderation, Stripe Connect for split payments, order tracking, and real-time chat between buyers and sellers.',
        icon: FiShoppingCart,
        color: '#68A063',
        website: 'https://example-marketplace.com'
      },
      {
        id: 'mern-crm',
        title: 'SalesForce Lite CRM',
        category: 'MERN Application',
        description: 'Customer relationship management system with lead tracking, pipeline visualization, and email campaign integration.',
        detailedDescription: 'SalesForce Lite provides small businesses with powerful CRM capabilities built on the MERN stack. Features include contact management, deal pipeline with drag-and-drop Kanban boards, email sequence automation, activity logging, and sales analytics dashboards.',
        icon: FiUsers,
        color: '#00A4EF',
        website: 'https://example-crm.com'
      },
      {
        id: 'mern-learning',
        title: 'EduCore LMS',
        category: 'MERN Application',
        description: 'Learning management system with course creation, video streaming, quizzes, and student progress tracking.',
        detailedDescription: 'EduCore enables educators to create and sell online courses with a full MERN implementation. Includes video hosting via AWS S3, course builder with drag-and-drop sections, quiz creation, completion certificates, and revenue analytics for instructors.',
        icon: FiBook,
        color: '#F59E0B',
        website: 'https://example-educore.com'
      },
      {
        id: 'mern-booking',
        title: 'BookingMaster Scheduler',
        category: 'MERN Application',
        description: 'Appointment scheduling platform for service businesses with calendar sync, reminders, and payment collection.',
        detailedDescription: 'BookingMaster streamlines appointment management with Google Calendar integration, automated SMS/email reminders, rescheduling options, deposit collection, staff scheduling, and detailed analytics on booking patterns and revenue.',
        icon: FiLayout,
        color: '#EC4899',
        website: 'https://example-booking.com'
      },
      {
        id: 'mern-inventory',
        title: 'StockTrack Inventory',
        category: 'MERN Application',
        description: 'Inventory management system with barcode scanning, stock alerts, and supplier management for warehouses.',
        detailedDescription: 'StockTrack provides complete inventory control with barcode/QR scanning, multi-warehouse support, automated reorder points, supplier management, purchase order generation, and comprehensive reporting for stock movements and valuations.',
        icon: FiPackage,
        color: '#6366F1',
        website: 'https://example-stocktrack.com'
      },
      {
        id: 'mern-realtime',
        title: 'ChatFlow Messaging',
        category: 'MERN Application',
        description: 'Real-time messaging platform with group chats, file sharing, and video calls using Socket.io and WebRTC.',
        detailedDescription: 'ChatFlow delivers enterprise messaging capabilities with Socket.io-powered real-time communication, WebRTC video/audio calls, file sharing with preview, message search, read receipts, and desktop notification support.',
        icon: FiMessageSquare,
        color: '#14B8A6',
        website: 'https://example-chatflow.com'
      }
    ]
  },
  {
    id: 'swiftui',
    label: 'SwiftUI',
    icon: FiSmartphone,
    color: 'linear-gradient(135deg, #F05138 0%, #FA7343 100%)',
    projects: [
      {
        id: 'swift-fitness',
        title: 'FitTrack Pro',
        category: 'SwiftUI iOS App',
        description: 'Comprehensive fitness tracking app with workout logging, Apple Health integration, and personalized training plans.',
        detailedDescription: 'FitTrack Pro leverages SwiftUI and HealthKit for seamless Apple ecosystem integration. Features include workout templates, exercise video guides, progress charts with Charts framework, Apple Watch companion app, and CloudKit sync for multi-device support.',
        icon: FiHeart,
        color: '#F05138',
        website: 'https://apps.apple.com/fittrack'
      },
      {
        id: 'swift-finance',
        title: 'BudgetWise Finance',
        category: 'SwiftUI iOS App',
        description: 'Personal finance manager with expense tracking, budget categories, and investment portfolio monitoring.',
        detailedDescription: 'BudgetWise brings financial clarity with SwiftUI Charts, Core Data persistence, and secure Face ID/Touch ID authentication. Includes bank account linking via Plaid, recurring transaction detection, spending insights, and goal tracking with visual progress indicators.',
        icon: FiDollarSign,
        color: '#10B981',
        website: 'https://apps.apple.com/budgetwise'
      },
      {
        id: 'swift-recipes',
        title: 'ChefMate Recipes',
        category: 'SwiftUI iOS App',
        description: 'Recipe discovery and meal planning app with shopping lists, nutrition info, and step-by-step cooking mode.',
        detailedDescription: 'ChefMate offers a beautiful recipe browsing experience with SwiftUI animations and transitions. Features recipe search by ingredients, dietary filters, meal planning calendar, auto-generated shopping lists, and a distraction-free cooking mode with voice commands via SiriKit.',
        icon: FiHome,
        color: '#F59E0B',
        website: 'https://apps.apple.com/chefmate'
      },
      {
        id: 'swift-notes',
        title: 'ThoughtSpace Notes',
        category: 'SwiftUI iOS/macOS App',
        description: 'Universal note-taking app with markdown support, folder organization, and seamless iCloud synchronization.',
        detailedDescription: 'ThoughtSpace is a cross-platform notes app for iPhone, iPad, and Mac built with SwiftUI and ShareExtension. Supports rich text with markdown rendering, nested folders, tags, search with spotlight integration, and end-to-end encrypted sync via CloudKit.',
        icon: FiBook,
        color: '#8B5CF6',
        website: 'https://apps.apple.com/thoughtspace'
      },
      {
        id: 'swift-weather',
        title: 'SkyView Weather',
        category: 'SwiftUI iOS App',
        description: 'Beautiful weather app with animated conditions, hourly/10-day forecasts, and severe weather alerts.',
        detailedDescription: 'SkyView delivers weather information through stunning SwiftUI animations that reflect current conditions. Integrates with WeatherKit for accurate forecasts, provides location-based alerts, includes widgets with multiple sizes, and a watchOS companion for quick glances.',
        icon: FiCloud,
        color: '#0EA5E9',
        website: 'https://apps.apple.com/skyview'
      },
      {
        id: 'swift-meditation',
        title: 'ZenMind Meditation',
        category: 'SwiftUI iOS App',
        description: 'Guided meditation app with breathing exercises, sleep stories, and mindfulness tracking.',
        detailedDescription: 'ZenMind promotes mental wellness with beautifully animated breathing guides, curated meditation sessions, ambient soundscapes, and Apple Health integration for mindfulness minutes tracking. Includes widgets, shortcuts, and Focus mode integration.',
        icon: FiZap,
        color: '#A855F7',
        website: 'https://apps.apple.com/zenmind'
      }
    ]
  },

];

// Tab Styled Components
const TabSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  
  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const TabSectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TabSectionSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xl};
  font-size: 1.125rem;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  flex-wrap: wrap;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 4px 20px ${({ theme }) => theme.colors.shadow};
`;

const Tab = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  background: ${props => props.$isActive ? props.$activeColor : 'transparent'};
  color: ${props => props.$isActive ? 'white' : props.theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  svg {
    font-size: 1.25rem;
  }
  
  &:hover {
    background: ${props => props.$isActive ? props.$activeColor : props.theme.colors.backgroundAlt};
    transform: translateY(-2px);
  }
  
  @media (max-width: 600px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: 0.875rem;
    
    svg {
      font-size: 1rem;
    }
  }
`;

const TabContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const TabContent = styled(motion.div)`
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

const TabProjectCard = styled(motion.div)`
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
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, ${props => `${props.$accentColor}10`} 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px ${({ theme }) => theme.colors.shadow};
    border-color: ${props => props.$accentColor || props.theme.colors.primary};
    
    &::before {
      transform: scaleX(1);
    }
    
    &::after {
      opacity: 1;
    }
  }
`;

const TabCardIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color || 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: all 0.3s ease;
  
  ${TabProjectCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
    box-shadow: 0 8px 20px ${props => `${props.$color}40`};
  }
  
  svg {
    font-size: 1.75rem;
    color: white;
  }
`;

const TabCardTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 ${({ theme }) => theme.spacing.xs};
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;
  
  ${TabProjectCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const TabCardCategory = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TabCardDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TabCardLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${props => props.$color || props.theme.colors.gradient};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }
  
  svg {
    font-size: 0.875rem;
  }
`;

const CategoryBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${props => `${props.$color}20`};
  color: ${props => props.$color};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  svg {
    font-size: 0.875rem;
  }
`;

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

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const PortfolioGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const PortfolioCard = styled(motion.div)`
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
    border-color: ${({ theme }) => theme.colors.primary};

    &::before {
      transform: scaleX(1);
    }
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const CardIcon = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color || 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  transition: transform 0.3s ease;

  ${PortfolioCard}:hover & {
    transform: scale(1.1) rotate(-5deg);
  }

  svg {
    font-size: 1.5rem;
    color: white;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text};
  transition: color 0.3s ease;

  ${PortfolioCard}:hover & {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CardCategory = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CardLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: auto;
`;

const CardLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
    transform: translateX(2px);
  }

  svg {
    font-size: 0.875rem;
  }
`;

const ExternalLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }

  svg {
    font-size: 0.875rem;
  }
`;

const DetailsSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.surface};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const DetailsSectionTitle = styled.h2`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const DetailsSectionSubtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 700px;
  margin: 0 auto ${({ theme }) => theme.spacing.xxl};
  font-size: 1.125rem;
`;

const DetailItem = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  scroll-margin-top: 100px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
  }

  &:target {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}30`};
  }
`;

const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DetailIcon = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color || 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  svg {
    font-size: 1.25rem;
    color: white;
  }
`;

const DetailTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
`;

const DetailCategory = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: block;
  margin-top: 4px;
`;

const DetailParagraph = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const BackToTop = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 0.875rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const projects = [
  {
    id: 'e-commerce-platform',
    title: 'DollarDimeStore E-Commerce Store',
    category: 'Retail Web Application',
    description: 'Full-featured online shopping platform of items and item detail. We employ MERN database and Cloudinary for image storage server access. It has a cart, checkout, and payment integration.',
    detailedDescription: 'DollarDimeStore represents our flagship e-commerce solution, built from the ground up using the MERN stack (MongoDB, Express.js, React, Node.js) with Cloudinary integration for seamless image management. This comprehensive retail platform features a fully responsive product catalog with advanced filtering and search capabilities, a dynamic shopping cart with persistent storage, secure user authentication with JWT tokens, and a streamlined checkout process with multiple payment gateway options. The admin dashboard provides real-time inventory management, order tracking, sales analytics, and customer relationship tools. We implemented server-side rendering for optimal SEO performance and lightning-fast page loads, ensuring customers enjoy a smooth shopping experience across all devices.',
    icon: FiShoppingCart,
    color: '#6366f1',
    website: 'https://example-ecommerce.com'
  },
  {
    id: 'e-commerce-platform2',
    title: 'Checkered Flag E-Commerce Store',
    category: 'Retail Web Application',
    description: 'Full-featured online shopping platform of items and item detail. We employ MERN database and Cloudinary for image storage server access. It has a cart, checkout, and payment integration.',
    detailedDescription: 'Checkered Flag E-Commerce Store is a specialized automotive parts and accessories marketplace designed for racing enthusiasts and automotive professionals. Built on our proven MERN architecture with Cloudinary powering the extensive product image galleries, this platform features vehicle-specific part matching, compatibility checking, and detailed specification sheets for each product. The system includes a robust inventory management system that tracks stock levels across multiple warehouses, automated reorder notifications, and integration with major shipping carriers for real-time delivery estimates. Customer accounts feature order history, wishlist functionality, and personalized recommendations based on vehicle profiles and browsing behavior.',
    icon: FiShoppingCart,
    color: '#6366f1',
    website: 'https://example-ecommerce.com'
  },
  {
    id: 'real-estate2',
    title: 'RealtyManager Real Estate App',
    category: 'Productivity',
    description: 'Comprehensive MERN database with Cloudinary image server for marketing American state, county, and city property. It features Theme control, favorite marking, and a pdf print output.',
    detailedDescription: 'RealtyManager is an enterprise-grade real estate management platform designed to streamline property marketing across the United States. The application leverages MongoDB for its flexible document structure, perfectly suited for storing diverse property data across different states, counties, and cities. Cloudinary integration enables high-resolution property photography with automatic optimization for web delivery. Key features include interactive map-based property search, advanced filtering by location hierarchy, customizable dark/light themes for user preference, a robust favorites system for saving and comparing properties, and professional PDF generation for property listings and comparative market analyses. The platform supports multi-user access with role-based permissions for agents, brokers, and administrators.',
    icon: FiLayout,
    color: '#e3cf19ff',
    website: 'https://example-tasks.com'
  },
  {
    id: 'task-management',
    title: 'TaskMaster Management App',
    category: 'Productivity',
    description: 'Comprehensive three year task tracking system with calendars, reminders, and team collaboration and task pdf print output.',
    detailedDescription: 'TaskMaster is a sophisticated project and task management application engineered for individuals and teams who need to plan and track work across extended timeframes. The three-year planning horizon sets TaskMaster apart, enabling long-term project roadmapping alongside daily task management. Features include multiple calendar views (day, week, month, year), customizable reminder systems with email and push notifications, team collaboration tools with real-time updates, file attachments, and comment threads. The PDF export functionality generates professional task reports, project summaries, and Gantt chart visualizations for stakeholder presentations. Built with React and styled-components, the interface is clean, intuitive, and fully responsive for mobile task management on the go.',
    icon: FiLayout,
    color: '#10B981',
    website: 'https://example-tasks.com'
  },
  {
    id: 'social-network',
    title: 'Social Network',
    category: 'Social Media',
    description: 'Modern social platform with real-time messaging, posts, and user interactions.',
    detailedDescription: 'Our Social Network platform demonstrates the full capabilities of real-time web application development using WebSocket technology for instant messaging and live updates. Users can create rich media posts with images, videos, and formatted text, engage with content through likes, comments, and shares, and build connections through friend requests and follower systems. The messaging system supports both one-on-one conversations and group chats with read receipts and typing indicators. Privacy controls allow users to manage post visibility, block unwanted contacts, and control notification preferences. The platform includes content moderation tools, reporting systems, and admin dashboards for community management. Built for scalability, the architecture supports thousands of concurrent users with minimal latency.',
    icon: FiUsers,
    color: '#EC4899',
    website: 'https://example-social.com'
  },
  {
    id: 'developer-portfolio',
    title: 'Developer Portfolio',
    category: 'Personal Branding',
    description: 'Stunning portfolio showcase for creative professionals and developers.',
    detailedDescription: 'The Developer Portfolio template represents the pinnacle of personal branding websites, designed to help developers and creative professionals showcase their work in the most compelling way possible. Built with Next.js and Framer Motion, the portfolio features smooth page transitions, scroll-triggered animations, and interactive project showcases that captivate visitors. The template includes sections for project galleries with filterable categories, an about page with timeline-based experience display, a skills section with animated proficiency indicators, a blog integration for sharing technical insights, and a contact form with spam protection. SEO is baked in with structured data, optimized meta tags, and automatic sitemap generation. The design is fully customizable through a theme configuration file, allowing developers to match their personal brand colors and typography.',
    icon: FiCode,
    color: '#8B5CF6',
    website: 'https://example-portfolio.com'
  },
  {
    id: 'personal-dashboard',
    title: 'My Personal Organizer',
    category: 'Business Intelligence',
    description: 'Real-time data visualization dashboard with charts, graphs, and reporting.',
    detailedDescription: 'My Personal Organizer is a comprehensive personal productivity suite that brings together task management, goal tracking, and data visualization in one elegant interface. The dashboard presents an at-a-glance view of your day with upcoming tasks, calendar events, and progress toward personal goals. Interactive charts built with Chart.js display trends in productivity, habit tracking data, and custom metrics you define. Features include a notes system with rich text editing, a bookmark manager for organizing web resources, a journal for daily reflections, and a finance tracker for budgeting and expense categorization. The responsive design ensures the dashboard is equally functional on desktop monitors and mobile devices, keeping you organized wherever you are.',
    icon: FiPieChart,
    color: '#F59E0B',
    website: 'https://example-dashboard.com'
  },
  {
    id: 'business-dashboard',
    title: 'My Business Organizer',
    category: 'Business Intelligence',
    description: 'Real-time data visualization dashboard with charts, graphs, and reporting.',
    detailedDescription: 'My Business Organizer extends our personal dashboard concept into a full-featured business intelligence platform suitable for small to medium enterprises. The system aggregates data from multiple sources including sales platforms, marketing tools, and financial software to present unified business metrics. Key features include customizable KPI widgets, automated report generation with scheduled email delivery, team performance tracking, client relationship management, and invoice tracking. The dashboard supports multiple user accounts with role-based access control, ensuring employees see only the data relevant to their responsibilities. Real-time updates keep all stakeholders informed of business performance, while historical data analysis tools help identify trends and inform strategic decisions.',
    icon: FiPieChart,
    color: '#F59E0B',
    website: 'https://example-dashboard.com'
  },
  {
    id: 'photo-gallery',
    title: 'Photo Gallery',
    category: 'Media',
    description: 'Beautiful image gallery with lightbox, albums, and cloud storage integration.',
    detailedDescription: 'The Photo Gallery application provides photographers and visual artists with a stunning platform to showcase and organize their work. Built with performance in mind, the gallery implements lazy loading, responsive images with automatic srcset generation, and WebP format support for optimal loading times. The masonry-style layout dynamically arranges images for visual impact, while the lightbox viewer supports keyboard navigation, swipe gestures, and EXIF data display. Album organization features allow grouping photos by event, date, or custom categories. Cloud storage integration with services like Cloudinary or AWS S3 ensures reliable image hosting with CDN delivery. For professional photographers, the platform includes client proofing features, watermarking options, and secure download links for purchased images.',
    icon: FiCamera,
    color: '#EF4444',
    website: 'https://example-gallery.com'
  },
  {
    id: 'music-streaming',
    title: 'Music Streaming',
    category: 'Entertainment',
    description: 'Audio streaming platform with playlists, artist pages, and personalized recommendations.',
    detailedDescription: 'Our Music Streaming platform showcases advanced audio streaming capabilities with a user experience rivaling major music services. The application features gapless audio playback, queue management, and crossfade between tracks for uninterrupted listening. Users can create and share playlists, follow their favorite artists, and discover new music through algorithmic recommendations powered by listening history analysis. Artist pages include biographies, discographies, and upcoming event listings. The audio player supports background playback on mobile devices, lock screen controls, and Bluetooth device integration. For independent artists and labels, the platform includes an upload portal, streaming analytics, and royalty tracking. The backend handles high-concurrency streaming with adaptive bitrate delivery based on network conditions.',
    icon: FiMusic,
    color: '#14B8A6',
    website: 'https://example-music.com'
  },
  {
    id: 'learning-platform',
    title: 'Learning Platform',
    category: 'Education',
    description: 'Online learning management system with courses, quizzes, and progress tracking.',
    detailedDescription: 'The Learning Platform is a comprehensive Learning Management System (LMS) designed to deliver engaging educational content to students of all ages. Course creators can build structured curricula with video lessons, reading materials, interactive exercises, and assessments. The platform supports multiple question types including multiple choice, fill-in-the-blank, matching, and essay questions with rubric-based grading. Progress tracking provides students with visual indicators of completion and mastery, while instructors receive detailed analytics on student engagement and performance. Features include discussion forums for peer learning, live virtual classroom integration, certificate generation upon course completion, and mobile apps for learning on the go. The platform supports SCORM content import for organizations migrating from legacy LMS systems.',
    icon: FiBook,
    color: '#3B82F6',
    website: 'https://example-learning.com'
  },
  {
    id: 'restaurant-food',
    title: 'Restaurant Food Delivery Tracker',
    category: 'Hospitality',
    description: 'Real-time package tracking system with maps, notifications, and delivery estimates.',
    detailedDescription: 'The Restaurant Food Delivery Tracker provides restaurants and their customers with complete visibility into the delivery process from kitchen to doorstep. The system integrates with restaurant POS systems to automatically capture orders and estimated preparation times. Once food leaves the restaurant, real-time GPS tracking shows customers exactly where their delivery is on an interactive map. Push notifications alert customers to status changes including order confirmation, preparation complete, out for delivery, and approaching arrival. For restaurant managers, the dashboard displays all active deliveries, driver locations, and delivery time analytics to optimize operations. Driver apps include turn-by-turn navigation, order details, and customer contact options. The platform supports multiple delivery zones with dynamic pricing based on distance and demand.',
    icon: FiTruck,
    color: '#F97316',
    website: 'https://example-delivery.com'
  },
  {
    id: 'fitness-app',
    title: 'Fitness Tracker',
    category: 'Health & Fitness',
    description: 'Workout planning and fitness tracking app with progress charts and goal setting.',
    detailedDescription: 'The Fitness Tracker application empowers users to take control of their health and fitness journey with comprehensive workout planning and progress monitoring tools. The exercise library includes hundreds of movements with video demonstrations, muscle group targeting, and equipment requirements. Users can follow pre-built workout programs or create custom routines tailored to their goals. The tracking system logs sets, reps, weight, and rest times with automatic progression suggestions based on performance trends. Progress charts visualize strength gains, body measurements, and workout consistency over time. Integration with wearable devices and health apps allows automatic syncing of steps, heart rate, and calorie data. Social features enable workout sharing, friendly competitions, and accountability partnerships to keep users motivated.',
    icon: FiHeart,
    color: '#DC2626',
    website: 'https://example-fitness.com'
  },
  {
    id: 'cloud-storage',
    title: 'Cloud Storage',
    category: 'Utility',
    description: 'Secure file storage and sharing platform with encryption and team folders.',
    detailedDescription: 'Our Cloud Storage solution provides individuals and businesses with secure, reliable file storage accessible from anywhere. Files are encrypted both in transit and at rest using AES-256 encryption, ensuring complete data protection. The intuitive interface supports drag-and-drop uploads, folder organization, and powerful search across all stored content including full-text search within documents. Sharing features include password-protected links, expiration dates, and download tracking. Team accounts benefit from shared folders with granular permission controls, activity logs for compliance, and storage quota management. File versioning automatically maintains previous versions with one-click restoration. Mobile apps provide offline access to favorited files with automatic sync when connectivity returns. Business plans include admin consoles, SSO integration, and data residency options for regulatory compliance.',
    icon: FiCloud,
    color: '#0EA5E9',
    website: 'https://example-cloud.com'
  },
  {
    id: 'cms-platform',
    title: 'CMS Platform',
    category: 'Content Management',
    description: 'Flexible content management system for blogs, news sites, and corporate websites.',
    detailedDescription: 'The CMS Platform delivers enterprise-grade content management capabilities with the ease of use that content creators demand. The block-based editor allows assembling beautiful pages from pre-designed components without touching code, while developers can create custom blocks for organization-specific needs. Content types are fully customizable, supporting everything from simple blog posts to complex product catalogs with custom fields and relationships. The media library provides organized asset management with automatic image optimization and responsive image generation. Multi-language support enables content translation workflows for global audiences. Publishing features include scheduled posts, revision history, approval workflows, and content staging environments. SEO tools provide real-time feedback on content optimization with meta tag management and automatic sitemap generation.',
    icon: FiMonitor,
    color: '#5b06eeff',
    website: 'https://example-cms.com'
  },
  {
    id: 'mobile-banking',
    title: 'Mobile Banking',
    category: 'Finance',
    description: 'Secure mobile banking interface with transactions, transfers, and account management.',
    detailedDescription: 'The Mobile Banking application demonstrates our capability to develop secure, user-friendly financial applications that meet rigorous industry standards. The interface provides customers with instant access to account balances, transaction history, and detailed statements. Transfer functionality supports internal transfers, external bank transfers, and recurring payment scheduling. Bill pay features include payee management, payment reminders, and eBill integration. Security measures include biometric authentication, transaction notifications, card lock functionality, and suspicious activity detection. The app provides ATM and branch locators with real-time availability information. Personal financial management tools help users track spending by category, set budgets, and work toward savings goals. Push notifications keep users informed of account activity, payment due dates, and security alerts.',
    icon: FiSmartphone,
    color: '#2563EB',
    website: 'https://example-banking.com'
  },
  {
    id: 'travel-booking',
    title: 'Travel Booking',
    category: 'Travel & Tourism',
    description: 'Comprehensive travel booking platform for flights, hotels, and vacation packages.',
    detailedDescription: 'The Travel Booking platform provides travelers with a one-stop solution for planning and booking complete trips. Flight search aggregates results from multiple airlines with flexible date options and fare comparison. Hotel inventory includes properties ranging from budget accommodations to luxury resorts with detailed amenity listings, photo galleries, and verified guest reviews. The platform supports vacation package bundling for flights, hotels, and car rentals with package discounts. Itinerary management keeps all trip details organized with confirmation numbers, check-in times, and important contact information. Travel alerts notify users of flight changes, gate assignments, and destination weather updates. The loyalty program rewards frequent bookers with points redeemable for travel credits. Concierge features provide destination guides, activity recommendations, and restaurant reservations.',
    icon: FiGlobe,
    color: '#b27608ff',
    website: 'https://example-travel.com'
  },
  {
    id: 'stock-trading',
    title: 'Stock Trading',
    category: 'Investment',
    description: 'Real-time stock trading platform with charts, portfolio tracking, and market news.',
    detailedDescription: 'The Stock Trading platform provides investors with professional-grade tools for market analysis and trade execution. Real-time quotes stream directly to the interface with bid/ask spreads, volume indicators, and price change calculations. Advanced charting capabilities include multiple timeframes, technical indicators, drawing tools, and chart pattern recognition. Portfolio tracking displays holdings with real-time valuation, gain/loss calculations, and allocation breakdowns. The order system supports market orders, limit orders, stop-losses, and conditional orders with pre and after-hours trading options. News integration delivers company announcements, earnings reports, and market-moving headlines. Watchlists help users monitor potential investments with customizable alerts for price targets and volume spikes. Educational resources help novice investors understand market concepts and develop trading strategies.',
    icon: FiTrendingUp,
    color: '#16A34A',
    website: 'https://example-trading.com'
  },
  {
    id: 'smart-home',
    title: 'Smart Home Hub',
    category: 'IoT',
    description: 'IoT control center for smart home devices, automation, and energy monitoring.',
    detailedDescription: 'The Smart Home Hub serves as the central command center for connected home devices, bringing disparate smart home ecosystems together in one unified interface. Device support includes smart lighting, thermostats, door locks, security cameras, garage doors, and appliances from major manufacturers. The automation engine enables creating complex routines triggered by time, location, device state, or external conditions like weather. Energy monitoring tracks electricity consumption by device and time period, identifying opportunities for efficiency improvements. Security features include real-time camera feeds, motion alerts, and integration with professional monitoring services. The interface is optimized for wall-mounted tablets, smartphones, and voice assistants. Scenes allow one-tap activation of multiple devices for scenarios like "Movie Night" or "Good Morning." Family accounts support individual preferences and parental controls for children access.',
    icon: FiZap,
    color: '#FBBF24',
    website: 'https://example-smarthome.com'
  },
  {
    id: 'design-system',
    title: 'Design System',
    category: 'UI/UX',
    description: 'Comprehensive component library and design system for enterprise applications.',
    detailedDescription: 'Our Design System represents a complete solution for organizations seeking consistency and efficiency in their digital product development. The component library includes over 50 React components ranging from basic elements like buttons and inputs to complex patterns like data tables, navigation systems, and modal dialogs. Each component is fully accessible following WCAG 2.1 guidelines, responsive across all device sizes, and themeable through a centralized token system. Documentation includes interactive examples, API references, usage guidelines, and copy-paste code snippets. The design token system defines colors, typography, spacing, and motion in a platform-agnostic format exportable to CSS, Sass, iOS, and Android. Figma design files mirror the code components exactly, ensuring seamless designer-developer handoffs. Version management and changelog documentation help teams stay current with library updates.',
    icon: FiLayers,
    color: '#A855F7',
    website: 'https://example-designsystem.com'
  },
  {
    id: 'api-platform',
    title: 'API Platform',
    category: 'Developer Tools',
    description: 'API management platform with documentation, testing, and analytics features.',
    detailedDescription: 'The API Platform provides development teams with comprehensive tools for designing, documenting, testing, and monitoring their APIs. The documentation generator creates beautiful, interactive API docs from OpenAPI specifications with try-it-now functionality for immediate testing. The mock server enables frontend development to proceed before backend implementation is complete. Testing tools support automated test suites, environment management, and CI/CD integration for continuous API validation. Analytics track endpoint usage, response times, error rates, and consumer behavior patterns. Rate limiting and API key management protect endpoints from abuse while enabling controlled access for third-party developers. The developer portal provides self-service onboarding for API consumers with account management, usage dashboards, and support ticket submission.',
    icon: FiDatabase,
    color: '#0D9488',
    website: 'https://example-api.com'
  },
  {
    id: 'restaurant-pos',
    title: 'Restaurant POS',
    category: 'Hospitality',
    description: 'Point of sale system for restaurants with menu management and order processing.',
    detailedDescription: 'The Restaurant POS system streamlines front-of-house and back-of-house operations for restaurants of all sizes. The intuitive touchscreen interface enables rapid order entry with modifier support, special instructions, and course timing. Table management visualizes the dining room layout with real-time status indicators for seating, ordering, and check stages. Kitchen display integration eliminates paper tickets with prioritized order queuing and preparation timing. Payment processing supports splits by item or guest, tip suggestions, and multiple tender types. Menu management allows real-time updates to pricing, descriptions, and availability with automatic 86ing when inventory runs low. Reporting covers sales by category, server performance, and peak hour analysis. Integration with accounting software and payroll systems reduces administrative overhead and ensures accurate financial tracking.',
    icon: FiLayout,
    color: '#DB2777',
    website: 'https://example-restaurant.com'
  },
  {
    id: 'good-day-music',
    title: 'GoodDayMusic.com',
    category: 'Musical Instrument Retail',
    description: 'An eCommerce website for marketing guitar, bass, drums, audio, and audio gear.',
    detailedDescription: 'GoodDayMusic.com is a comprehensive eCommerce platform built on Wix, designed for music enthusiasts and professional musicians alike. The store features an extensive catalog of guitars, bass instruments, drum kits, and audio gear with detailed product specifications and high-quality media galleries. The platform provides an intuitive shopping experience with category filtering, search functionality, and product comparison tools. Each instrument category showcases products from leading brands with rich imagery, demonstration videos, and customer reviews. Built with Wix\'s powerful eCommerce capabilities, the site offers secure checkout, multiple payment options, and reliable shipping integration. The media gallery feature allows customers to view instruments from multiple angles and watch demo videos before making a purchase decision.',
    icon: FiMusic,
    color: '#1DB954',
    website: 'http://www.GoodDayMusic.com'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
};

export default function PortfolioPage() {
  const [activeTab, setActiveTab] = useState('react-nextjs');

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' }
  ]);

  const portfolioJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio | Optical Automation',
    description: 'Explore our portfolio of web development projects including e-commerce, dashboards, and enterprise applications.',
    url: 'https://opticalautomation.com/portfolio',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: `https://opticalautomation.com/portfolio/${project.id}`
        }
      }))
    }
  };

  const activeCategory = tabCategories.find(cat => cat.id === activeTab);

  return (
    <PageWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioJsonLd) }}
      />
      <HeroSection id="top">
        <HeroContent>
          <PageTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Portfolio
          </PageTitle>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our latest projects showcasing innovative web solutions,
            from Search Engine Optimized, e-commerce platforms to enterprise information technology applications.
          </Subtitle>
        </HeroContent>
      </HeroSection>

      {/* Technology Tab Section */}
      <TabSection>
        <TabSectionTitle>Projects by Technology</TabSectionTitle>
        <TabSectionSubtitle>
          Browse our diverse portfolio of applications built with modern information technology frameworks and technologies
        </TabSectionSubtitle>

        <TabsContainer>
          {tabCategories.map(category => (
            <Tab
              key={category.id}
              $isActive={activeTab === category.id}
              $activeColor={category.color}
              onClick={() => setActiveTab(category.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <category.icon />
              {category.label}
            </Tab>
          ))}
        </TabsContainer>

        <TabContentWrapper>
          <AnimatePresence mode="wait">
            {activeCategory && (
              <TabContent
                key={activeCategory.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeCategory.projects.map((project, index) => (
                  <TabProjectCard
                    key={project.id}
                    $accentColor={project.color}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <CategoryBadge $color={project.color}>
                      <activeCategory.icon />
                      {activeCategory.label}
                    </CategoryBadge>
                    <TabCardIcon $color={project.color}>
                      <project.icon />
                    </TabCardIcon>
                    <TabCardTitle>{project.title}</TabCardTitle>
                    <TabCardCategory>{project.category}</TabCardCategory>
                    <TabCardDescription>{project.description}</TabCardDescription>
                    <TabCardLink
                      href={project.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      $color={project.color}
                    >
                      <FiExternalLink /> View Project
                    </TabCardLink>
                  </TabProjectCard>
                ))}
              </TabContent>
            )}
          </AnimatePresence>
        </TabContentWrapper>
      </TabSection>


      <ContentSection>
        <Container>
          <PortfolioGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <PortfolioCard
                key={`${project.id}-${index}`}
                variants={itemVariants}
                $accentColor={project.color}
              >
                <CardHeader>
                  <CardIcon $color={project.color}>
                    <project.icon />
                  </CardIcon>
                  <FavoriteButton item={project} />
                </CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardCategory>{project.category}</CardCategory>
                <CardDescription>{project.description}</CardDescription>
                <CardLinks>
                  <CardLink href={`#detail-${index}`}>
                    Details <FiArrowRight />
                  </CardLink>
                  <ExternalLink
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink /> Visit
                  </ExternalLink>
                </CardLinks>
              </PortfolioCard>
            ))}
          </PortfolioGrid>
        </Container>
      </ContentSection>

      <DetailsSection>
        <Container>
          <DetailsSectionTitle>Project Details</DetailsSectionTitle>
          <DetailsSectionSubtitle>
            Learn more about each project, the technologies used, and the problems we solved.
          </DetailsSectionSubtitle>

          {projects.map((project, index) => (
            <DetailItem
              key={`detail-${project.id}-${index}`}
              id={`detail-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.02 }}
            >
              <DetailHeader>
                <DetailIcon $color={project.color}>
                  <project.icon />
                </DetailIcon>
                <div>
                  <DetailTitle>{project.title}</DetailTitle>
                  <DetailCategory>{project.category}</DetailCategory>
                </div>
              </DetailHeader>
              <DetailParagraph>{project.detailedDescription}</DetailParagraph>
              <BackToTop href="#top">↑ Back to Portfolio</BackToTop>
            </DetailItem>
          ))}
        </Container>
      </DetailsSection>
    </PageWrapper>
  );
}
