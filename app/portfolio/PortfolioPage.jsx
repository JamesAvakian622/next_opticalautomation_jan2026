'use client';

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
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
  FiTerminal,
  FiAward,
  FiCheck
} from 'react-icons/fi';

// Tab Categories Data
const tabCategories = [
  {
    id: 'react-nextjs',
    label: 'Next.JS',
    icon: FiCode,
    color: 'linear-gradient(135deg, #61DAFB 0%, #0070F3 100%)',
    projects: [
      {
        id: 'optical-automation',
        title: 'Optical Automation',
        category: 'Web & Mobile Suite',
        description: 'MERN Stack and SwiftUI application featuring Megamenu navigation, SEO optimized metadata-driven content, SOC2 compliant metatags, and AI-powered insights.',
        detailedDescription: 'Optical Automation is a comprehensive Web & Mobile Suite built with MERN Stack and SwiftUI. Features include an advanced Megamenu navigation system, SEO optimized pages with metadata-driven content management, SOC2 compliant metatags for enterprise security, and AI-powered insights for enhanced user experience.',
        icon: FiGlobe,
        color: '#6366F1',
        website: 'https://opticalautomation.com'
      },
      {
        id: 'mydeskview',
        title: 'MyDeskView',
        category: 'Desktop Productivity Suite',
        description: 'Desktop Productivity Suite integrating MyDeskView, MyPersonalOrganizer, MyBusinessOrganizer, DIY Solutions, MyDeskView - 2026 Places, and MyDeskView - YouTube with assignable movies for fast menu access.',
        detailedDescription: 'MyDeskView is a comprehensive Desktop Productivity Suite featuring multiple integrated applications: MyPersonalOrganizer for personal task management, MyBusinessOrganizer for professional workflows, DIY Solutions for home projects, MyDeskView - 2026 Places for location tracking, and MyDeskView - YouTube integration with assignable movies for fast menu access.',
        icon: FiMonitor,
        color: '#61DAFB',
        website: 'https://mydeskview.com'
      },
      {
        id: 'technology-and-times',
        title: 'Technology And Times',
        category: 'Web & Mobile Suite',
        description: 'Comprehensive technology portal covering Technology, Computers, Homes, Automobiles, Corporations, and Government with videos and photo galleries.',
        detailedDescription: 'Technology And Times delivers today\'s technology and everything accessible on the internet. Covers Technology, Computers, Homes, Automobiles, Corporations, and Government sectors with rich video content, photo galleries, and in-depth articles in a full Web & Mobile Suite experience.',
        icon: FiCpu,
        color: '#10B981',
        website: 'https://technologyandtimes.com'
      },
      {
        id: 'america-today-250',
        title: 'AmericaToday250',
        category: 'Web & Mobile Suite',
        description: 'American history from George Washington arranged in decades, featuring colonial America, state acquisitions, all presidents, and current government officials.',
        detailedDescription: 'AmericaToday250 chronicles American history from George Washington to present day, organized by decades with colonial America and state acquisitions. Comprehensive appendix includes all presidents, current Executive Branch, official logos, State Governors, and House and Congress officials.',
        icon: FiBook,
        color: '#DC2626',
        website: 'https://americatoday250.com'
      },
      {
        id: 'learnskills365',
        title: 'LearnSkills365',
        category: 'Educational Platform',
        description: 'Interactive learning platform for Math, Reading, Writing, Memory, Typing, Geography, and multiple Quizzes to build essential skills year-round.',
        detailedDescription: 'LearnSkills365 is an interactive educational platform designed to build essential skills throughout the year. Features comprehensive lessons in Math, Reading, Writing, Memory training, Typing practice, Geography exploration, and a variety of engaging Quizzes to reinforce learning.',
        icon: FiBook,
        color: '#F59E0B',
        website: 'https://learnskills365.com'
      },
      {
        id: 'purchase-software-hub',
        title: 'Purchase Software Hub',
        category: 'Software Titles For Sale',
        description: 'Technical documentation, API references, and development guides. Software titles available for purchase.',
        detailedDescription: 'Purchase Software Hub provides comprehensive technical documentation, API references, and development guides. Browse and purchase software titles from our catalog.',
        icon: FiShoppingCart,
        color: '#10B981',
        website: 'https://docs.opticalautomation.com'
      },
      // Business & Finance
      { id: 'accessmoney', title: 'AccessMoney', category: 'Business & Finance', description: 'Financial access and money management application.', icon: FiDollarSign, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'ai-trading', title: 'AI Trading', category: 'Business & Finance', description: 'AI-powered trading and investment analysis platform.', icon: FiTrendingUp, color: '#6366F1', website: 'https://mydeskview.com' },
      { id: 'appointmentbook', title: 'AppointmentBook', category: 'Business & Finance', description: 'Appointment scheduling and booking management system.', icon: FiBook, color: '#F59E0B', website: 'https://mydeskview.com' },
      { id: 'bistrorestaurant', title: 'BistroRestaurant', category: 'Business & Finance', description: 'Restaurant management and ordering platform.', icon: FiHome, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'businesstracker', title: 'BusinessTracker', category: 'Business & Finance', description: 'Business performance tracking and analytics dashboard.', icon: FiPieChart, color: '#8B5CF6', website: 'https://mydeskview.com' },
      { id: 'creativetracker', title: 'CreativeTracker', category: 'Business & Finance', description: 'Creative project tracking and portfolio management.', icon: FiCamera, color: '#EC4899', website: 'https://mydeskview.com' },
      { id: 'dollardimestore', title: 'DollarDimeStore', category: 'Business & Finance', description: 'E-commerce retail and store management platform.', icon: FiShoppingCart, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'employdirectory', title: 'EmployDirectory', category: 'Business & Finance', description: 'Employee directory and organizational management.', icon: FiUsers, color: '#0EA5E9', website: 'https://mydeskview.com' },
      { id: 'employeehandbook', title: 'EmployeeHandBook', category: 'Business & Finance', description: 'Digital employee handbook and HR resource center.', icon: FiBook, color: '#F97316', website: 'https://mydeskview.com' },
      { id: 'gasolinefinder', title: 'GasolineFinder', category: 'Business & Finance', description: 'Gas station locator and fuel price comparison tool.', icon: FiMapPin, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'investmenttracker', title: 'InvestmentTracker', category: 'Business & Finance', description: 'Investment portfolio tracking and performance analysis.', icon: FiTrendingUp, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'realestateportal', title: 'RealEstatePortal', category: 'Business & Finance', description: 'Real estate listing and property management portal.', icon: FiHome, color: '#6366F1', website: 'https://mydeskview.com' },
      // Education & Learning
      { id: 'animals', title: 'Animals', category: 'Education & Learning', description: 'Educational animal encyclopedia and learning resource.', icon: FiBook, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'grammyhistory', title: 'GrammyHistory', category: 'Education & Learning', description: 'Interactive history of Grammy Awards and music achievements.', icon: FiMusic, color: '#F59E0B', website: 'https://mydeskview.com' },
      { id: 'guitarbranded', title: 'GuitarBranded', category: 'Education & Learning', description: 'Guitar brands encyclopedia and music education platform.', icon: FiMusic, color: '#8B5CF6', website: 'https://mydeskview.com' },
      { id: 'inventorsbio', title: 'InventorsBio', category: 'Education & Learning', description: 'Biographies of famous inventors and their innovations.', icon: FiAward, color: '#EC4899', website: 'https://mydeskview.com' },
      { id: 'learnskills365-app', title: 'LearnSkills365.com', category: 'Education & Learning', description: 'Interactive daily learning platform for building essential skills.', icon: FiBook, color: '#F59E0B', website: 'https://learnskills365.com' },
      { id: 'musicianshalloffame', title: 'MusiciansHallOfFame', category: 'Education & Learning', description: 'Hall of fame directory celebrating legendary musicians.', icon: FiMusic, color: '#6366F1', website: 'https://mydeskview.com' },
      { id: 'mygreatrecipes', title: 'MyGreatRecipes', category: 'Education & Learning', description: 'Recipe collection and cooking education platform.', icon: FiBook, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'nationalparks', title: 'NationalParks', category: 'Education & Learning', description: 'Guide to U.S. National Parks with maps and information.', icon: FiMapPin, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'newschannels', title: 'NewsChannels', category: 'Education & Learning', description: 'Aggregated news channels and media directory.', icon: FiGlobe, color: '#0EA5E9', website: 'https://mydeskview.com' },
      { id: 'nineplanets', title: 'NinePlanets', category: 'Education & Learning', description: 'Solar system exploration and planetary science education.', icon: FiGlobe, color: '#8B5CF6', website: 'https://mydeskview.com' },
      { id: 'quiz-system', title: 'Quiz System', category: 'Education & Learning', description: 'Interactive quiz platform for knowledge testing and learning.', icon: FiAward, color: '#F59E0B', website: 'https://mydeskview.com' },
      { id: 'sportstracker', title: 'SportsTracker', category: 'Education & Learning', description: 'Sports statistics tracking and athletic performance analysis.', icon: FiAward, color: '#EF4444', website: 'https://mydeskview.com' },
      // Entertainment & Leisure
      { id: 'a-snowy-christmas', title: 'A Snowy Christmas', category: 'Entertainment & Leisure', description: 'Holiday-themed interactive entertainment experience.', icon: FiHeart, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'apple-m-processors', title: 'Apple M Processors', category: 'Entertainment & Leisure', description: 'Guide to Apple M-series processor technology and specifications.', icon: FiCpu, color: '#6366F1', website: 'https://mydeskview.com' },
      { id: 'biographies', title: 'Biographies', category: 'Entertainment & Leisure', description: 'Collection of notable biographies and life stories.', icon: FiBook, color: '#8B5CF6', website: 'https://mydeskview.com' },
      { id: 'carshow-youtube', title: 'CarShow YouTube', category: 'Entertainment & Leisure', description: 'Curated car show videos and automotive entertainment.', icon: FiPlay, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'cooljimmy', title: 'CoolJimmy', category: 'Entertainment & Leisure', description: 'Entertainment and lifestyle content platform.', icon: FiZap, color: '#F59E0B', website: 'https://mydeskview.com' },
      { id: 'corvettequiz-app', title: 'CorvetteQuiz', category: 'Entertainment & Leisure', description: 'Interactive quiz testing knowledge of Corvette history and models.', icon: FiAward, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'cruisefinder', title: 'CruiseFinder', category: 'Entertainment & Leisure', description: 'Cruise vacation search and booking discovery platform.', icon: FiGlobe, color: '#0EA5E9', website: 'https://mydeskview.com' },
      { id: 'gooddaymusic', title: 'GoodDayMusic', category: 'Entertainment & Leisure', description: 'Music discovery and playlist management application.', icon: FiMusic, color: '#10B981', website: 'https://mydeskview.com' },
      // Personal Productivity
      { id: 'diy-solutions', title: 'DIY Solutions', category: 'Personal Productivity', description: 'Do-it-yourself project guides and home improvement solutions.', icon: FiZap, color: '#F97316', website: 'https://mydeskview.com' },
      { id: 'mybusinessorganizer', title: 'MyBusinessOrganizer', category: 'Personal Productivity', description: 'Complete business operations suite for entrepreneurs and teams.', icon: FiLayers, color: '#EC4899', website: 'https://mydeskview.com' },
      { id: 'mydatebook', title: 'MyDateBook', category: 'Personal Productivity', description: 'Personal date and event management with calendar integration.', icon: FiBook, color: '#8B5CF6', website: 'https://mydeskview.com' },
      { id: 'mydeskview-app', title: 'MyDeskView', category: 'Personal Productivity', description: 'Central command center for daily workflow management and productivity.', icon: FiMonitor, color: '#6366F1', website: 'https://mydeskview.com' },
      { id: 'mydeskview-2026-places', title: 'MyDeskView - 2026 Places', category: 'Personal Productivity', description: 'Location tracking and management for favorite places and destinations.', icon: FiMapPin, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'mydeskview-youtube', title: 'MyDeskView - YouTube', category: 'Personal Productivity', description: 'Curated video content and YouTube integration with quick access.', icon: FiPlay, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'mypersonalorganizer', title: 'MyPersonalOrganizer', category: 'Personal Productivity', description: 'Comprehensive personal life management for goals, habits, and schedules.', icon: FiLayers, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'photo-albums', title: 'Photo Albums', category: 'Personal Productivity', description: 'Photo organization and album management for digital memories.', icon: FiCamera, color: '#EC4899', website: 'https://mydeskview.com' },
      // Communication & Social
      { id: 'hi5', title: 'Hi5', category: 'Communication & Social', description: 'Social networking and communication platform.', icon: FiMessageSquare, color: '#6366F1', website: 'https://mydeskview.com' },
      { id: 'mytelephonebook', title: 'MyTelephoneBook', category: 'Communication & Social', description: 'Digital telephone directory and contact management.', icon: FiUsers, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'recipelists', title: 'RecipeLists', category: 'Communication & Social', description: 'Recipe sharing and meal planning collaboration tool.', icon: FiBook, color: '#F59E0B', website: 'https://mydeskview.com' },
      { id: 'taskmanager', title: 'TaskManager', category: 'Communication & Social', description: 'Task management and productivity tracking application.', icon: FiCheck, color: '#8B5CF6', website: 'https://mydeskview.com' },
      { id: 'technologyandtimes-app', title: 'TechnologyAndTimes', category: 'Communication & Social', description: 'Technology news and media portal.', icon: FiCpu, color: '#0EA5E9', website: 'https://mydeskview.com' },
      { id: 'teleprompter', title: 'Teleprompter', category: 'Communication & Social', description: 'Digital teleprompter for presentations and video production.', icon: FiMonitor, color: '#EC4899', website: 'https://mydeskview.com' },
      // Health
      { id: 'disease-tracker', title: 'Disease Tracker', category: 'Health', description: 'Disease monitoring and health condition tracking application.', icon: FiHeart, color: '#EF4444', website: 'https://mydeskview.com' },
      { id: 'fitness-tracker', title: 'Fitness Tracker', category: 'Health', description: 'Fitness activity tracking and workout management.', icon: FiHeart, color: '#10B981', website: 'https://mydeskview.com' },
      { id: 'gymnastictracker', title: 'GymnasticTracker', category: 'Health', description: 'Gymnastics training and performance tracking tool.', icon: FiAward, color: '#8B5CF6', website: 'https://mydeskview.com' },
      { id: 'health-tracker', title: 'Health Tracker', category: 'Health', description: 'Comprehensive health monitoring and wellness tracking.', icon: FiHeart, color: '#EC4899', website: 'https://mydeskview.com' },
      { id: 'healthaidtracking', title: 'HealthAidTracking', category: 'Health', description: 'Health aid and medication tracking management system.', icon: FiHeart, color: '#F97316', website: 'https://mydeskview.com' },
      { id: 'migrainetinitrustracker', title: 'MigraineTinitusTracker', category: 'Health', description: 'Migraine and tinnitus symptom tracking and management.', icon: FiHeart, color: '#6366F1', website: 'https://mydeskview.com' },
      { id: 'walktracker', title: 'WalkTracker', category: 'Health', description: 'Walking activity tracker with distance and step counting.', icon: FiHeart, color: '#0EA5E9', website: 'https://mydeskview.com' }
    ]
  },
  {
    id: 'mern',
    label: 'MERN Stack',
    icon: FiDatabase,
    color: 'linear-gradient(135deg, #68A063 0%, #3F3F3F 100%)',
    projects: [
      {
        id: 'mern-optical-automation',
        title: 'Optical Automation',
        category: 'Web & Mobile Suite',
        description: 'MERN Stack and SwiftUI application featuring Megamenu navigation, SEO optimized metadata-driven content, SOC2 compliant metatags, and AI-powered insights.',
        detailedDescription: 'Optical Automation is a comprehensive Web & Mobile Suite built with MERN Stack and SwiftUI. Features include an advanced Megamenu navigation system, SEO optimized pages with metadata-driven content management, SOC2 compliant metatags for enterprise security, and AI-powered insights for enhanced user experience.',
        icon: FiGlobe,
        color: '#68A063',
        website: 'https://opticalautomation.com'
      },
      {
        id: 'mern-mydeskview',
        title: 'MyDeskView',
        category: 'Desktop Productivity Suite',
        description: 'Desktop Productivity Suite with 27+ integrated applications across Business & Finance, Education & Learning, Entertainment & Leisure, Personal Productivity, Communication & Social, and Health categories.',
        detailedDescription: 'MyDeskView is a comprehensive Desktop Productivity Suite featuring 27+ integrated applications: Business & Finance (BusinessTracker, CreativeTracker, DollarDimeStore, InvestmentTracker, RealEstatePortal), Education & Learning (LearnSkills365.com, Quiz System), Entertainment & Leisure (A Snowy Christmas, CorvetteQuiz, GoodDayMusic, GuitarBranded, SportsTracker), Personal Productivity (MyDateBook, Photo Albums, RecipeLists, TaskManager, Teleprompter), Communication & Social (Hi5, MyTelephoneBook, TechnologyAndTimes), and Health (Fitness Tracker, Health Tracker).',
        icon: FiMonitor,
        color: '#00A4EF',
        website: 'https://mydeskview.com'
      },
      {
        id: 'mern-technology-times',
        title: 'Technology And Times',
        category: 'Web & Mobile Suite',
        description: 'Comprehensive technology portal covering Technology, Computers, Homes, Automobiles, Corporations, and Government with videos and photo galleries.',
        detailedDescription: 'Technology And Times delivers today\'s technology and everything accessible on the internet. Covers Technology, Computers, Homes, Automobiles, Corporations, and Government sectors with rich video content, photo galleries, and in-depth articles in a full Web & Mobile Suite experience.',
        icon: FiCpu,
        color: '#F59E0B',
        website: 'https://technologyandtimes.com'
      },
      {
        id: 'mern-america-today',
        title: 'AmericaToday250',
        category: 'Web & Mobile Suite',
        description: 'American history from George Washington arranged in decades, featuring colonial America, state acquisitions, all presidents, and current government officials.',
        detailedDescription: 'AmericaToday250 chronicles American history from George Washington to present day, organized by decades with colonial America and state acquisitions. Comprehensive appendix includes all presidents, current Executive Branch, official logos, State Governors, and House and Congress officials.',
        icon: FiBook,
        color: '#DC2626',
        website: 'https://americatoday250.com'
      },
      {
        id: 'mern-purchase-software-hub',
        title: 'Purchase Software Hub',
        category: 'Software Titles For Sale',
        description: 'Technical documentation, API references, and development guides. Software titles available for purchase.',
        detailedDescription: 'Purchase Software Hub provides comprehensive technical documentation, API references, and development guides. Browse and purchase software titles from our catalog.',
        icon: FiShoppingCart,
        color: '#10B981',
        website: 'https://docs.opticalautomation.com'
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
        id: 'swift-optical-automation',
        title: 'Optical Automation',
        category: 'Web & Mobile Suite',
        description: 'MERN Stack and SwiftUI application featuring Megamenu navigation, SEO optimized metadata-driven content, SOC2 compliant metatags, and AI-powered insights.',
        detailedDescription: 'Optical Automation is a comprehensive Web & Mobile Suite built with MERN Stack and SwiftUI. Features include an advanced Megamenu navigation system, SEO optimized pages with metadata-driven content management, SOC2 compliant metatags for enterprise security, and AI-powered insights for enhanced user experience.',
        icon: FiGlobe,
        color: '#F05138',
        website: 'https://opticalautomation.com'
      },
      {
        id: 'swift-mydeskview',
        title: 'MyDeskView',
        category: 'Desktop Productivity Suite',
        description: 'Desktop Productivity Suite integrating MyDeskView, MyPersonalOrganizer, MyBusinessOrganizer, DIY Solutions, MyDeskView - 2026 Places, and MyDeskView - YouTube with assignable movies for fast menu access.',
        detailedDescription: 'MyDeskView is a comprehensive Desktop Productivity Suite featuring multiple integrated applications: MyPersonalOrganizer for personal task management, MyBusinessOrganizer for professional workflows, DIY Solutions for home projects, MyDeskView - 2026 Places for location tracking, and MyDeskView - YouTube integration with assignable movies for fast menu access.',
        icon: FiMonitor,
        color: '#FA7343',
        website: 'https://mydeskview.com'
      },
      {
        id: 'swift-technology-times',
        title: 'Technology And Times',
        category: 'Web & Mobile Suite',
        description: 'Comprehensive technology portal covering Technology, Computers, Homes, Automobiles, Corporations, and Government with videos and photo galleries.',
        detailedDescription: 'Technology And Times delivers today\'s technology and everything accessible on the internet. Covers Technology, Computers, Homes, Automobiles, Corporations, and Government sectors with rich video content, photo galleries, and in-depth articles in a full Web & Mobile Suite experience.',
        icon: FiCpu,
        color: '#10B981',
        website: 'https://technologyandtimes.com'
      },
      {
        id: 'swift-america-today',
        title: 'AmericaToday250',
        category: 'Web & Mobile Suite',
        description: 'American history from George Washington arranged in decades, featuring colonial America, state acquisitions, all presidents, and current government officials.',
        detailedDescription: 'AmericaToday250 chronicles American history from George Washington to present day, organized by decades with colonial America and state acquisitions. Comprehensive appendix includes all presidents, current Executive Branch, official logos, State Governors, and House and Congress officials.',
        icon: FiBook,
        color: '#DC2626',
        website: 'https://americatoday250.com'
      },
      {
        id: 'swift-corvette-quiz',
        title: 'CorvetteQuiz',
        category: 'SwiftUI Mobile App',
        description: 'Interactive quiz application testing knowledge of Corvette history, models, and specifications.',
        detailedDescription: 'CorvetteQuiz is a native SwiftUI mobile application featuring an engaging quiz experience for Corvette enthusiasts. Test your knowledge of Corvette history, model generations, specifications, and trivia with beautiful animations and achievement tracking.',
        icon: FiAward,
        color: '#EF4444',
        website: 'https://corvettequiz.com'
      }
    ]
  },
  {
    id: 'react-native',
    label: 'Android',
    icon: FiSmartphone,
    color: 'linear-gradient(135deg, #61DAFB 0%, #0070F3 100%)',
    projects: [
      {
        id: 'android-corvette-quiz',
        title: 'CorvetteQuiz',
        category: 'Android Mobile App',
        description: 'Interactive quiz application testing knowledge of Corvette history, models, and specifications.',
        detailedDescription: 'CorvetteQuiz is a native Android application featuring an engaging quiz experience for Corvette enthusiasts. Test your knowledge of Corvette history, model generations, specifications, and trivia with beautiful animations and achievement tracking.',
        icon: FiAward,
        color: '#EF4444',
        website: 'https://corvettequiz.com'
      }
    ]
  },
  {
    id: 'python',
    label: 'Python',
    icon: FiTerminal,
    color: 'linear-gradient(135deg, #3776AB 0%, #FFD43B 100%)',
    projects: [
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
  padding: 120px ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xxl};
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
    padding: 100px ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
    flex-direction: column;
  }
`;

const HeroLogo = styled(motion.div)`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: 3.5rem;
  color: white;
  margin-bottom: 0;
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

  useEffect(() => {
    const handleHashNavigation = () => {
      const hash = window.location.hash.replace('#', '');

      if (!hash) {
        window.scrollTo(0, 0);
        return;
      }

      // Check if hash matches a category
      const matchingCategory = tabCategories.find(cat => cat.id === hash);
      if (matchingCategory) {
        setActiveTab(hash);
        // Scroll to tabs section after a brief delay to ensure render
        setTimeout(() => {
          const tabsSection = document.getElementById('portfolio-tabs');
          if (tabsSection) {
            tabsSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      }

      // Check if hash matches a project
      for (const cat of tabCategories) {
        const matchingProject = cat.projects.find(p => p.id === hash);
        if (matchingProject) {
          setActiveTab(cat.id);
          // Scroll to project after tab switch and render
          setTimeout(() => {
            const projectElement = document.getElementById(hash);
            if (projectElement) {
              projectElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
          return;
        }
      }
    };

    handleHashNavigation();

    // Add event listener for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    return () => window.removeEventListener('hashchange', handleHashNavigation);
  }, []);

  const portfolioJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Portfolio | Optical Automation',
    description: 'Explore our portfolio of web development projects including eCommerce, dashboards, and enterprise applications.',
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
          <HeroHeader>
            <HeroLogo
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/opauto.png"
                alt="Optical Automation"
                fill
                style={{ objectFit: 'contain' }}
                priority
              />
            </HeroLogo>
            <PageTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </PageTitle>
          </HeroHeader>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explore our latest projects showcasing innovative web solutions,
            from Search Engine Optimized, eCommerce platforms to enterprise information technology applications.
          </Subtitle>
        </HeroContent>
      </HeroSection>

      {/* Technology Tab Section */}
      <TabSection id="portfolio-tabs">
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
              onClick={() => {
                setActiveTab(category.id);
                document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' });
              }}
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
                    id={project.id}
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
                      href="https://6961af51fdbe659fc8f241fa--illustrious-baklava-da0cd7.netlify.app"
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
