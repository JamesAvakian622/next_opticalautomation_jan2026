'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { generateBreadcrumbJsonLd } from '@/lib/metadata';
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
  FiDollarSign,
  FiTerminal
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
  {
    id: 'react-native',
    label: 'React Native',
    icon: FiSmartphone,
    color: 'linear-gradient(135deg, #61DAFB 0%, #0070F3 100%)',
    projects: [
      {
        id: 'rn-ecommerce',
        title: 'Mobile Commerce App',
        category: 'React Native iOS/Android App',
        description: 'Native mobile shopping experience with cross-platform performance, optimized for both iOS and Android.',
        detailedDescription: 'This React Native application delivers a high-performance shopping experience with native-like UI components. It features a robust state management system, offline support for browsing, and integration with native device features like biometric authentication and push notifications.',
        icon: FiShoppingCart,
        color: '#61DAFB',
        website: 'https://example-rn-ecommerce.com'
      },
      {
        id: 'rn-health',
        title: 'Pulse Health Tracker',
        category: 'React Native iOS/Android App',
        description: 'Health and wellness tracking application with real-time health data visualization and native health kit integration.',
        detailedDescription: 'Pulse provides users with a comprehensive view of their wellness by integrating with Apple HealthKit and Google Fit. The app uses React Native\'s bridge to access native health APIs while maintaining a single codebase for both platforms.',
        icon: FiHeart,
        color: '#E91E63',
        website: 'https://example-rn-health.com'
      },
      {
        id: 'rn-rideshare',
        title: 'RideShare Connect',
        category: 'React Native iOS/Android App',
        description: 'Location-based ride sharing platform with real-time mapping, driver tracking, and secure payment processing.',
        detailedDescription: 'RideShare Connect leverages advanced mapping libraries for sub-second location updates. It includes a sophisticated dispatching algorithm, in-app messaging between drivers and riders, and a secure payment portal supporting major digital wallets.',
        icon: FiMapPin,
        color: '#10B981',
        website: 'https://example-rn-rideshare.com'
      }
    ]
  },
  {
    id: 'python',
    label: 'Python',
    icon: FiTerminal,
    color: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
    projects: [
      {
        id: 'python-ai',
        title: 'DataInsight AI',
        category: 'Python AI/ML Solution',
        description: 'Advanced machine learning platform for predictive analytics and automated data processing using Python and TensorFlow.',
        detailedDescription: 'DataInsight AI processes massive datasets to provide actionable business predictions. Built with Python, it utilizes Spark for data processing and PyTorch for model training, delivering 98% accuracy in market trend forecasting.',
        icon: FiPieChart,
        color: '#3776AB',
        website: 'https://example-python-ai.com'
      },
      {
        id: 'python-automation',
        title: 'Automation Engine',
        category: 'Python Automation Tool',
        description: 'Enterprise workflow automation suite designed to streamline repetitive tasks and improve operational efficiency.',
        detailedDescription: 'This Python-based automation engine integrates with legacy systems and modern APIs to automate complex workflows. It features a visual task builder, scheduled executions, and comprehensive logging for auditing and compliance.',
        icon: FiZap,
        color: '#F59E0B',
        website: 'https://example-python-automation.com'
      },
      {
        id: 'python-api',
        title: 'Backend API Pro',
        category: 'Python Backend Service',
        description: 'High-performance RESTful API service built with FastAPI, providing sub-millisecond response times for global applications.',
        detailedDescription: 'Backend API Pro is an enterprise-grade service designed for extreme scalability. It utilizes FastAPI and PostgreSQL with Redis caching to handle millions of requests daily, supporting core services for multiple frontend platforms.',
        icon: FiServer,
        color: '#14B8A6',
        website: 'https://example-python-api.com'
      }
    ]
  }
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

  const activeCategory = tabCategories.find(cat => cat.id === activeTab);

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
      itemListElement: tabCategories.flatMap(cat => cat.projects).map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description,
          url: `https://opticalautomation.com/portfolio#${project.id}`
        }
      }))
    }
  };

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
    </PageWrapper>
  );
}
