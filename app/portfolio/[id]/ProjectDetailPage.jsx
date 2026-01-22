'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { generateBreadcrumbJsonLd, generateProjectJsonLd } from '@/lib/metadata';
import {
    FiExternalLink,
    FiArrowLeft,
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
    FiCheckCircle
} from 'react-icons/fi';

const PageWrapper = styled.div`
  min-height: calc(100vh - 70px);
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${props => props.$bgColor || 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'};
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

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  transition: color 0.3s ease;

  &:hover {
    color: white;
  }
`;

const ProjectIcon = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  margin: 0 auto ${({ theme }) => theme.spacing.lg};
  backdrop-filter: blur(10px);

  svg {
    font-size: 2.5rem;
    color: white;
  }
`;

const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  color: white;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
`;

const Category = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  backdrop-filter: blur(10px);
`;

const ContentSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
  }
`;

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Section = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text};
`;

const Paragraph = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.9;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }

  svg {
    color: ${props => props.$color || '#10B981'};
    font-size: 1.25rem;
    flex-shrink: 0;
    margin-top: 2px;
  }
`;

const FeatureText = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TechBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.text};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
`;

const CTASection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const CTATitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CTAText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CTAButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px ${({ theme }) => theme.colors.shadow};
  }
`;

const projectsData = {
    'e-commerce-platform': {
        title: 'E-Commerce Platform',
        category: 'Web Application',
        icon: FiShoppingCart,
        color: '#6366f1',
        website: 'https://example-ecommerce.com',
        description: [
            'This comprehensive e-commerce platform represents the pinnacle of modern online shopping experiences. Built with scalability and performance in mind, the platform handles thousands of concurrent users while maintaining lightning-fast response times.',
            'The user interface was carefully crafted to provide an intuitive shopping journey, from product discovery to checkout. Advanced filtering, search autocomplete, and personalized recommendations help customers find exactly what they\'re looking for.',
            'On the backend, robust inventory management, order processing, and fulfillment systems ensure smooth operations. Integration with multiple payment gateways including Stripe, PayPal, and Apple Pay provides customers with flexible payment options.'
        ],
        features: [
            'Advanced product search with filters and autocomplete',
            'Real-time inventory management system',
            'Multiple payment gateway integrations',
            'Order tracking and notification system',
            'Customer reviews and ratings',
            'Wishlist and save for later functionality'
        ],
        techStack: ['React', 'Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Redis']
    },
    'task-management': {
        title: 'Task Management App',
        category: 'Productivity',
        icon: FiLayout,
        color: '#10B981',
        website: 'https://example-tasks.com',
        description: [
            'A powerful task management solution designed to help teams stay organized and productive. The application combines intuitive design with powerful features to streamline project workflows.',
            'The calendar integration provides a visual overview of deadlines and milestones, while the Kanban board view offers flexible task organization. Team members can collaborate in real-time, assign tasks, and track progress.',
            'Built-in time tracking and reporting features help managers understand resource allocation and identify bottlenecks. Automated reminders and notifications ensure nothing falls through the cracks.'
        ],
        features: [
            'Kanban board and list view options',
            'Calendar integration with deadline tracking',
            'Real-time collaboration features',
            'Time tracking and reporting',
            'Automated task reminders',
            'Custom workflow automation'
        ],
        techStack: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Socket.io', 'AWS']
    },
    'social-network': {
        title: 'Social Network',
        category: 'Social Media',
        icon: FiUsers,
        color: '#EC4899',
        website: 'https://example-social.com',
        description: [
            'A modern social networking platform built to connect people and foster meaningful interactions. The platform prioritizes user privacy while enabling rich social experiences.',
            'Real-time messaging with read receipts, typing indicators, and media sharing makes communication seamless. The news feed algorithm surfaces relevant content while giving users control over what they see.',
            'Robust content moderation tools and reporting systems help maintain a safe community environment. The platform scales efficiently to handle millions of daily active users.'
        ],
        features: [
            'Real-time messaging and notifications',
            'Rich media posts with image and video support',
            'Privacy-focused user controls',
            'Content moderation and reporting',
            'Group creation and management',
            'Event planning and RSVP tracking'
        ],
        techStack: ['React Native', 'Node.js', 'MongoDB', 'Redis', 'WebSocket', 'CDN']
    },
    'developer-portfolio': {
        title: 'Developer Portfolio',
        category: 'Personal Branding',
        icon: FiCode,
        color: '#8B5CF6',
        website: 'https://example-portfolio.com',
        description: [
            'A stunning portfolio template designed specifically for developers and creative professionals. The design balances aesthetic appeal with performance, ensuring fast load times and smooth animations.',
            'The modular component system allows for easy customization while maintaining design consistency. Dark mode support and accessibility features ensure a great experience for all users.',
            'Built-in CMS integration makes it easy to update projects and blog posts without touching code. SEO optimization and social media previews help increase visibility and professional reach.'
        ],
        features: [
            'Responsive design with dark mode support',
            'Smooth scroll animations and transitions',
            'Integrated blog with markdown support',
            'Project showcase with filtering',
            'Contact form with email integration',
            'SEO optimization and analytics'
        ],
        techStack: ['Next.js', 'Styled Components', 'Framer Motion', 'MDX', 'Vercel']
    },
    'data-dashboard': {
        title: 'Analytics Dashboard',
        category: 'Business Intelligence',
        icon: FiPieChart,
        color: '#F59E0B',
        website: 'https://example-dashboard.com',
        description: [
            'A comprehensive analytics dashboard that transforms raw data into actionable insights. The platform aggregates data from multiple sources and presents it through intuitive visualizations.',
            'Real-time updates ensure stakeholders always have access to the latest metrics. Customizable widgets and layouts allow each user to create their ideal dashboard view.',
            'Advanced reporting features enable scheduled exports, custom date ranges, and comparison analysis. The drill-down capabilities help identify trends and anomalies at granular levels.'
        ],
        features: [
            'Real-time data visualization',
            'Customizable dashboard widgets',
            'Automated report generation',
            'Multi-source data integration',
            'Team sharing and permissions',
            'Export to PDF, Excel, and CSV'
        ],
        techStack: ['React', 'D3.js', 'Python', 'PostgreSQL', 'Apache Kafka', 'Docker']
    },
    'photo-gallery': {
        title: 'Photo Gallery',
        category: 'Media',
        icon: FiCamera,
        color: '#EF4444',
        website: 'https://example-gallery.com',
        description: [
            'A beautiful photo gallery platform designed for photographers and visual artists. The masonry layout showcases images in their optimal aspect ratios while maintaining visual harmony.',
            'The lightbox view provides an immersive viewing experience with gesture support and keyboard navigation. Automatic image optimization ensures fast loading without sacrificing quality.',
            'Cloud storage integration allows for unlimited photo uploads with automatic organization by date, location, and album. Sharing features make it easy to distribute galleries to clients.'
        ],
        features: [
            'Masonry grid layout with infinite scroll',
            'Fullscreen lightbox with gestures',
            'Automatic image optimization',
            'Album organization and tagging',
            'Client gallery sharing',
            'Download and print options'
        ],
        techStack: ['Next.js', 'Cloudinary', 'MongoDB', 'Sharp', 'AWS S3', 'Vercel']
    },
    'music-streaming': {
        title: 'Music Streaming',
        category: 'Entertainment',
        icon: FiMusic,
        color: '#14B8A6',
        website: 'https://example-music.com',
        description: [
            'A feature-rich music streaming platform that delivers high-quality audio experiences. The intuitive interface makes it easy to discover new music, create playlists, and enjoy favorites.',
            'Personalized recommendations powered by machine learning help users discover music tailored to their tastes. Social features allow sharing playlists and following friends.',
            'Offline mode and cross-device sync ensure music is always accessible. The audio player supports multiple quality levels and integrates with smart home devices.'
        ],
        features: [
            'High-fidelity audio streaming',
            'Personalized music recommendations',
            'Playlist creation and sharing',
            'Offline download support',
            'Cross-device synchronization',
            'Artist profiles and tour dates'
        ],
        techStack: ['React', 'Node.js', 'MongoDB', 'Redis', 'FFmpeg', 'CDN']
    },
    'learning-platform': {
        title: 'Learning Platform',
        category: 'Education',
        icon: FiBook,
        color: '#3B82F6',
        website: 'https://example-learning.com',
        description: [
            'An engaging online learning management system that makes education accessible and effective. The platform supports various content types including video, text, quizzes, and interactive exercises.',
            'Progress tracking and achievement systems motivate learners to complete courses. Instructors have powerful tools to create, organize, and monetize their content.',
            'Discussion forums and live sessions enable community learning and direct instructor engagement. Analytics help both learners and instructors understand progress and areas for improvement.'
        ],
        features: [
            'Video course hosting with chapters',
            'Interactive quizzes and assessments',
            'Progress tracking and certificates',
            'Discussion forums and Q&A',
            'Instructor dashboard and analytics',
            'Payment processing and subscriptions'
        ],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe', 'Mux']
    },
    'real-estate': {
        title: 'Real Estate Portal',
        category: 'Property',
        icon: FiHome,
        color: '#059669',
        website: 'https://example-realestate.com',
        description: [
            'A comprehensive real estate platform connecting buyers, sellers, and agents. The advanced search functionality makes it easy to find properties matching specific criteria.',
            'Virtual tours and high-quality photography bring listings to life. Interactive maps show neighborhood amenities, school districts, and commute times.',
            'Agent profiles and direct messaging streamline the connection between clients and professionals. Market analytics help users understand pricing trends and make informed decisions.'
        ],
        features: [
            'Advanced property search and filters',
            'Virtual 3D property tours',
            'Interactive neighborhood maps',
            'Mortgage calculator and estimates',
            'Agent profiles and messaging',
            'Market trend analytics'
        ],
        techStack: ['Next.js', 'Node.js', 'PostgreSQL', 'Mapbox', 'Matterport', 'Twilio']
    },
    'delivery-tracking': {
        title: 'Delivery Tracker',
        category: 'Logistics',
        icon: FiTruck,
        color: '#F97316',
        website: 'https://example-delivery.com',
        description: [
            'A real-time delivery tracking system that keeps customers informed every step of the way. Live GPS tracking shows exact driver locations on an interactive map.',
            'Push notifications and SMS updates alert customers about delivery status changes. Estimated arrival times are continuously updated based on traffic and route conditions.',
            'The driver app provides optimized routes and delivery instructions. Backend analytics help logistics managers optimize operations and identify efficiency improvements.'
        ],
        features: [
            'Real-time GPS tracking',
            'Push notification updates',
            'Delivery time estimates',
            'Route optimization for drivers',
            'Proof of delivery capture',
            'Operations analytics dashboard'
        ],
        techStack: ['React Native', 'Node.js', 'MongoDB', 'Google Maps', 'Firebase', 'Socket.io']
    },
    'fitness-app': {
        title: 'Fitness Tracker',
        category: 'Health & Fitness',
        icon: FiHeart,
        color: '#DC2626',
        website: 'https://example-fitness.com',
        description: [
            'A comprehensive fitness application designed to help users achieve their health goals. Workout planning, tracking, and progress visualization make fitness journeys measurable.',
            'The exercise library includes detailed instructions and videos for hundreds of movements. Custom workout builders allow users to create personalized routines.',
            'Integration with wearable devices and health apps provides a complete picture of daily activity. Social features and challenges add motivation through friendly competition.'
        ],
        features: [
            'Workout planning and tracking',
            'Exercise library with videos',
            'Progress charts and statistics',
            'Wearable device integration',
            'Nutrition logging and goals',
            'Social challenges and leaderboards'
        ],
        techStack: ['React Native', 'Node.js', 'PostgreSQL', 'HealthKit', 'Google Fit', 'TensorFlow']
    },
    'cloud-storage': {
        title: 'Cloud Storage',
        category: 'Utility',
        icon: FiCloud,
        color: '#0EA5E9',
        website: 'https://example-cloud.com',
        description: [
            'A secure cloud storage solution that makes file management simple and accessible from anywhere. End-to-end encryption ensures data privacy and security.',
            'The intuitive interface supports drag-and-drop uploads, folder organization, and powerful search. File versioning allows recovery of previous versions when needed.',
            'Team collaboration features include shared folders, permission management, and real-time co-editing. Desktop and mobile apps provide seamless cross-platform sync.'
        ],
        features: [
            'End-to-end encryption',
            'Cross-platform sync',
            'File versioning and recovery',
            'Team folders and permissions',
            'Large file transfer support',
            'Desktop and mobile apps'
        ],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS S3', 'Redis', 'Electron']
    },
    'cms-platform': {
        title: 'CMS Platform',
        category: 'Content Management',
        icon: FiMonitor,
        color: '#7C3AED',
        website: 'https://example-cms.com',
        description: [
            'A flexible content management system designed for modern websites. The headless architecture enables content delivery to any platform including web, mobile, and IoT devices.',
            'The visual editor makes content creation intuitive for non-technical users while developers enjoy full API access. Custom content types and fields adapt to any use case.',
            'Built-in SEO tools and performance optimization ensure content ranks well and loads quickly. Scheduled publishing and workflow approvals streamline team content operations.'
        ],
        features: [
            'Visual content editor',
            'Custom content types',
            'Multi-language support',
            'Role-based permissions',
            'API-first architecture',
            'Publishing workflows'
        ],
        techStack: ['React', 'Node.js', 'MongoDB', 'GraphQL', 'Redis', 'Docker']
    },
    'mobile-banking': {
        title: 'Mobile Banking',
        category: 'Finance',
        icon: FiSmartphone,
        color: '#2563EB',
        website: 'https://example-banking.com',
        description: [
            'A secure mobile banking interface that puts financial management at users\' fingertips. Biometric authentication and encryption protect sensitive account data.',
            'Quick balance checks, transfers, and bill payments make daily banking effortless. Transaction categorization and spending insights help users understand their finances.',
            'The platform supports multiple account types, investment tracking, and budgeting tools. Real-time fraud detection and instant notifications provide peace of mind.'
        ],
        features: [
            'Biometric authentication',
            'Instant transfers and payments',
            'Transaction categorization',
            'Budget tracking and goals',
            'Investment portfolio view',
            'Fraud detection alerts'
        ],
        techStack: ['React Native', 'Node.js', 'PostgreSQL', 'Redis', 'Plaid', 'AWS']
    },
    'travel-booking': {
        title: 'Travel Booking',
        category: 'Travel & Tourism',
        icon: FiGlobe,
        color: '#0891B2',
        website: 'https://example-travel.com',
        description: [
            'A comprehensive travel booking platform that simplifies vacation planning. Compare flights, hotels, and vacation packages across multiple providers to find the best deals.',
            'The intuitive search interface supports flexible dates and nearby airports for maximum flexibility. Detailed reviews and photos help travelers make informed decisions.',
            'Itinerary management keeps all booking details organized in one place. Integration with calendar apps and travel document storage ensures stress-free trips.'
        ],
        features: [
            'Multi-provider flight search',
            'Hotel comparison and booking',
            'Vacation package deals',
            'Itinerary management',
            'Review aggregation',
            'Travel document storage'
        ],
        techStack: ['Next.js', 'Node.js', 'MongoDB', 'Amadeus API', 'Redis', 'Stripe']
    },
    'stock-trading': {
        title: 'Stock Trading',
        category: 'Investment',
        icon: FiTrendingUp,
        color: '#16A34A',
        website: 'https://example-trading.com',
        description: [
            'A powerful stock trading platform that provides the tools needed for informed investment decisions. Real-time quotes and interactive charts display market movements as they happen.',
            'Advanced charting tools support technical analysis with indicators and drawing tools. News aggregation and earnings calendars keep traders informed of market-moving events.',
            'Portfolio tracking calculates performance, gains, and diversification metrics. Watchlists and alerts help monitor opportunities across markets.'
        ],
        features: [
            'Real-time stock quotes',
            'Interactive charting tools',
            'Portfolio tracking and analytics',
            'News and earnings calendar',
            'Watchlists and price alerts',
            'Research and analyst ratings'
        ],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'IEX Cloud', 'Redis']
    },
    'smart-home': {
        title: 'Smart Home Hub',
        category: 'IoT',
        icon: FiZap,
        color: '#FBBF24',
        website: 'https://example-smarthome.com',
        description: [
            'A centralized control hub for smart home devices that brings automation to everyday life. Support for multiple protocols ensures compatibility with a wide range of devices.',
            'Automation routines trigger actions based on time, location, or device states. Voice control integration with major assistants provides hands-free operation.',
            'Energy monitoring and historical data help identify savings opportunities. Security features include alerts, camera integration, and access control.'
        ],
        features: [
            'Multi-protocol device support',
            'Automation routines',
            'Voice assistant integration',
            'Energy monitoring',
            'Security system integration',
            'Remote access and control'
        ],
        techStack: ['React', 'Node.js', 'MQTT', 'InfluxDB', 'Zigbee', 'Z-Wave']
    },
    'design-system': {
        title: 'Design System',
        category: 'UI/UX',
        icon: FiLayers,
        color: '#A855F7',
        website: 'https://example-designsystem.com',
        description: [
            'A comprehensive component library and design system that ensures consistency across enterprise applications. Every component is designed with accessibility and customization in mind.',
            'Theming support allows brands to customize colors, typography, and spacing. Documentation includes interactive examples, code snippets, and best practices.',
            'The system includes patterns for common use cases like forms, navigation, and data display. Regular updates and semantic versioning ensure smooth adoption.'
        ],
        features: [
            'Reusable component library',
            'Theming and customization',
            'Accessibility compliance',
            'Interactive documentation',
            'Design tokens and variables',
            'Figma integration'
        ],
        techStack: ['React', 'TypeScript', 'Storybook', 'Styled Components', 'Jest', 'Figma']
    },
    'api-platform': {
        title: 'API Platform',
        category: 'Developer Tools',
        icon: FiDatabase,
        color: '#0D9488',
        website: 'https://example-api.com',
        description: [
            'An API management platform that simplifies the process of building, testing, and documenting APIs. Auto-generated documentation ensures APIs are always up to date.',
            'The testing environment allows developers to explore endpoints without writing code. Mock servers enable frontend development before backend implementation.',
            'Analytics track usage patterns, errors, and performance metrics. Rate limiting and authentication protect APIs while usage quotas manage access.'
        ],
        features: [
            'Auto-generated documentation',
            'API testing environment',
            'Mock server generation',
            'Usage analytics and monitoring',
            'Rate limiting and quotas',
            'OAuth and API key management'
        ],
        techStack: ['Node.js', 'PostgreSQL', 'Redis', 'OpenAPI', 'Docker', 'Kubernetes']
    },
    'restaurant-pos': {
        title: 'Restaurant POS',
        category: 'Hospitality',
        icon: FiLayout,
        color: '#DB2777',
        website: 'https://example-restaurant.com',
        description: [
            'A modern point of sale system designed specifically for the restaurant industry. The intuitive interface minimizes training time while maximizing order accuracy.',
            'Table management visualizes floor layouts and tracks order status. Kitchen display integration ensures timely food preparation and coordination.',
            'Comprehensive reporting covers sales, inventory, and staff performance. Integration with online ordering and delivery platforms extends reach beyond the physical location.'
        ],
        features: [
            'Order management and checkout',
            'Table and floor management',
            'Kitchen display system',
            'Menu and inventory management',
            'Sales reporting and analytics',
            'Online ordering integration'
        ],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Socket.io', 'Stripe', 'Square']
    }
};

export default function ProjectDetailPage() {
    const params = useParams();
    const projectId = params.id;

    const project = projectsData[projectId];

    if (!project) {
        return (
            <PageWrapper>
                <ContentSection>
                    <Container style={{ textAlign: 'center', padding: '100px 20px' }}>
                        <h1>Project Not Found</h1>
                        <p style={{ marginTop: '20px', marginBottom: '30px' }}>
                            The project you're looking for doesn't exist.
                        </p>
                        <Link href="/portfolio" style={{ color: '#6366f1' }}>
                            ← Back to Portfolio
                        </Link>
                    </Container>
                </ContentSection>
            </PageWrapper>
        );
    }

    const IconComponent = project.icon;

    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: project.title, path: `/portfolio/${projectId}` }
    ]);

    const projectJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: project.title,
        description: project.description[0],
        url: `https://opticalautomation.com/portfolio/${projectId}`,
        creator: {
            '@type': 'Organization',
            name: 'Optical Automation, LLC'
        },
        genre: project.category,
        keywords: project.techStack.join(', ')
    };

    return (
        <PageWrapper>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
            />
            <HeroSection $bgColor={project.color}>
                <HeroContent>
                    <BackLink href="/portfolio">
                        <FiArrowLeft /> Back to Portfolio
                    </BackLink>
                    <ProjectIcon>
                        <IconComponent />
                    </ProjectIcon>
                    <PageTitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {project.title}
                    </PageTitle>
                    <Category>{project.category}</Category>
                </HeroContent>
            </HeroSection>

            <ContentSection>
                <Container>
                    <Section>
                        <SectionTitle>Project Overview</SectionTitle>
                        {project.description.map((paragraph, index) => (
                            <Paragraph
                                key={index}
                                as={motion.p}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                {paragraph}
                            </Paragraph>
                        ))}
                    </Section>

                    <Section>
                        <SectionTitle>Key Features</SectionTitle>
                        <FeatureList>
                            {project.features.map((feature, index) => (
                                <FeatureItem
                                    key={index}
                                    $color={project.color}
                                    as={motion.li}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <FiCheckCircle />
                                    <FeatureText>{feature}</FeatureText>
                                </FeatureItem>
                            ))}
                        </FeatureList>
                    </Section>

                    <Section>
                        <SectionTitle>Technology Stack</SectionTitle>
                        <TechStack>
                            {project.techStack.map((tech, index) => (
                                <TechBadge
                                    key={index}
                                    as={motion.span}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {tech}
                                </TechBadge>
                            ))}
                        </TechStack>
                    </Section>

                    <CTASection
                        as={motion.div}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <CTATitle>View Live Project</CTATitle>
                        <CTAText>
                            See this project in action and explore all its features.
                        </CTAText>
                        <CTAButton
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Visit Website <FiExternalLink />
                        </CTAButton>
                    </CTASection>
                </Container>
            </ContentSection>
        </PageWrapper>
    );
}
