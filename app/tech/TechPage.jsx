'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  FiCode,
  FiServer,
  FiDatabase,
  FiLayers,
  FiCpu,
  FiGlobe,
  FiZap,
  FiBox,
  FiSmartphone,
  FiTerminal,
  FiTrendingUp,
  FiSearch,
  FiShield,
  FiCheck
} from 'react-icons/fi';

const PageWrapper = styled.div`
  min-height: calc(100vh - 70px);
`;

const HeroSection = styled.section`
  padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  text-align: left;
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

const HeroHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    gap: ${({ theme }) => theme.spacing.md};
    flex-direction: column;
    text-align: center;
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
  max-width: 1200px;
  margin: 0 auto;
`;

const IntroSection = styled.div`
  max-width: 1200px;
  margin: 0 0 ${({ theme }) => theme.spacing.md};
  text-align: left;
`;

const IntroText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.9;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-size: 2.25rem;
  text-align: left;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SectionSubtitle = styled.p`
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 100%;
  margin: 0 0 ${({ theme }) => theme.spacing.xxl};
  font-size: 1.125rem;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.xxl};

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const TechCard = styled(motion.div)`
  scroll-margin-top: 100px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const TechHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const TechIcon = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$color || 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)'};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  svg {
    font-size: 1.75rem;
    color: white;
  }
`;

const TechTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;
`;

const TechDescription = styled.div`
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;

  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const TechList = styled.ul`
  list-style-type: none;
  padding: 0;
  max-width: 1200px;
  margin: 0 0 ${({ theme }) => theme.spacing.xxl};
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TechListItem = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 1.05rem;
  padding: ${({ theme }) => theme.spacing.xs} 0;

  &::before {
    content: '•';
    color: #6366f1;
    font-weight: bold;
    font-size: 1.5rem;
    line-height: 1;
  }
`;

const HighlightBox = styled.div`
  background: ${({ theme }) => theme.colors.backgroundAlt};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  margin: ${({ theme }) => theme.spacing.xxl} auto;
  text-align: center;
  max-width: 100%;
`;

const HighlightTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const HighlightText = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.8;
  max-width: 100%;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  text-align: left;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const StackBadges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
`;

const StackBadge = styled.span`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  font-size: 0.875rem;
`;

const HoverZoomImage = styled.div`
  flex-shrink: 0;
  border-radius: 16px;
  overflow: visible;
  cursor: pointer;
  position: relative;
  z-index: 1;
  
  img {
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.15);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  &:hover {
    z-index: 100;
    
    img {
      transform: scale(3);
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
  }
`;

const ServicesSection = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.xxl};
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const ServicesSectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const ServiceItem = styled(motion.div)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing.lg};
`;

const ServiceIcon = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.backgroundAlt};
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ServiceTitle = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ServiceDesc = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
`;

// MyDeskView Integrated Software Data
const integratedSoftware = {
  'Business & Finance': [
    'AccessMoney', 'AI Trading', 'AppointmentBook', 'BistroRestaurant', 'BusinessTracker',
    'CreativeTracker', 'DollarDimeStore', 'EmployDirectory', 'EmployeeHandBook',
    'GasolineFinder', 'InvestmentTracker', 'RealEstatePortal'
  ],
  'Education & Learning': [
    'Animals', 'GrammyHistory', 'GuitarBranded', 'InventorsBio', 'LearnSkills365.com',
    'MusiciansHallOfFame', 'MyGreatRecipes', 'NationalParks', 'NewsChannels',
    'NinePlanets', 'Quiz System', 'SportsTracker'
  ],
  'Entertainment & Leisure': [
    'A Snowy Christmas', 'Apple M Processors', 'Biographies', 'CarShow YouTube',
    'CoolJimmy', 'CorvetteQuiz', 'CruiseFinder', 'GoodDayMusic'
  ],
  'Personal Productivity': [
    'DIY Solutions', 'MyBusinessOrganizer', 'MyDateBook', 'MyDeskView',
    'MyDeskView - 2026 Places', 'MyDeskView - YouTube', 'MyPersonalOrganizer', 'Photo Albums'
  ],
  'Communication & Social': [
    'Hi5', 'MyTelephoneBook', 'RecipeLists', 'TaskManager', 'TechnologyAndTimes', 'Teleprompter'
  ],
  'Health': [
    'Disease Tracker', 'Fitness Tracker', 'GymnasticTracker', 'Health Tracker',
    'HealthAidTracking', 'MigraineTinitusTracker', 'WalkTracker'
  ]
};

const SoftwareSection = styled.section`
  margin-top: ${({ theme }) => theme.spacing.xxl};
`;

const SoftwareSectionTitle = styled.h2`
  font-size: 2rem;
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SoftwareGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SoftwareCategoryGroup = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SoftwareCategoryTitle = styled.h3`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.primary}20;
`;

const SoftwareItemsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const SoftwareItemEntry = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.875rem;
  
  svg {
    color: ${({ theme }) => theme.colors.success};
    flex-shrink: 0;
    font-size: 0.875rem;
  }
`;

const technologies = [
  {
    id: 'ai',
    icon: FiCpu,
    title: 'Agentic AI Development',
    color: '#8B5CF6',
    image: '/agentic_ai_diagram.png',
    description: [
      'We embrace the future of software engineering through AI-human collaboration and automation.',
      'Development methodology:',
      '• AI-assisted code generation and optimization',
      '• All system files dev for Next.JS website, SEO utilities, SwiftUI iOS, and ReactNative Android.',
      '• Automated debugging and performance analysis',
      '• Accelerated delivery timelines for complex features',
      '• Enhanced code quality through AI-powered reviews',
      'This hybrid approach combines our expert architecture decisions with AI efficiency to deliver innovative digital products.',
    ],
  },
  {
    id: 'fullstack',
    icon: FiGlobe,
    title: 'Full-Stack Development',
    color: '#0EA5E9',
    description: [
      'We provide end-to-end expertise across the entire application development lifecycle.',
      'Our service scope covers:',
      '• Responsive frontend user interface design',
      '• Robust server-side logic and API integration',
      '• Database architecture and optimization',
      '• Cloud deployment and infrastructure setup',
      'By managing every layer of the stack, we ensure your application works in perfect harmony for the best user experience.',
    ],
  },
  {
    id: 'design',
    icon: FiZap,
    title: 'Web Design & Publishing',
    color: '#F59E0B',
    description: [
      'Focusing on aesthetics and usability, we create modern digital experiences that engage and convert.',
      'Design and publishing focus:',
      '• Intuitive UI/UX and mobile-first design',
      '• SEO best practices for maximum visibility',
      '• Performance optimization and fast initial loads',
      '• Comprehensive domain and hosting management',
      'From wireframes to final launch, we handle every detail to ensure your brand stands out in the digital landscape.',
    ],
  },
  {
    id: 'backend',
    icon: FiBox,
    title: 'Backend & Database Design',
    color: '#EF4444',
    description: [
      'Our backend systems are engineered for high availability, security, and effortless scaling.',
      'Core capabilities:',
      '• Advanced schema design and data modeling',
      '• Microservices and modular architecture logic',
      '• Secure authentication and data authorization',
      '• Performance-tuned retrieval and caching',
      'We build reliable backends that power everything from simple websites to complex enterprise applications.',
    ],
  },
  {
    id: 'nextjs',
    icon: FiCode,
    title: 'Next.js',
    color: '#000000',
    description: [
      'Next.js is a powerful JavaScript library for building user interfaces, developed and maintained by Vercel.',
      'Core features and benefits:',
      '• Component-based architecture for maximum reusability',
      '• High-performance Virtual DOM for seamless interactions',
      '• Rich ecosystem of modern development tools',
      '• Declarative UI that is easy to debug and maintain',
      'Together with modern frameworks, React.js forms the foundation of our powerful, scalable web applications.',
    ],
  },
  {
    id: 'swiftui',
    icon: FiSmartphone,
    title: 'SwiftUI',
    color: '#007AFF',
    description: [
      'Apple Computer language for computer and handheld devices as a modern UI framework for fast, consistent, and premium mobile apps. Apps require submission at Apple App Store.',
      'Key Benefits:',
      '• Faster development with clean, declarative code',
      '• One design system for iOS, macOS, watchOS, and more',
      '• Modern visuals with smooth animations and dynamic layouts',
      '• Predictable, state‑driven architecture for lower maintenance',
      '• Future-ready and aligned with Apple\'s long-term direction',
    ],
  },
  {
    id: 'python',
    icon: FiTerminal,
    title: 'Python, AI, & Automation',
    color: '#3776AB',
    description: [
      'Our data-centric solutions and automation tools are powered by the versatility of Python.',
      'Python application areas:',
      '• Advanced machine learning and AI model integration',
      '• Scalable data processing and analytics pipelines',
      '• Enterprise-level task automation and scripting',
      '• High-performance backend services with FastAPI',
      'Python\'s rich ecosystem makes it our primary choice for complex data challenges and intelligent automation.',
    ],
  },
  {
    id: 'seo',
    icon: FiTrendingUp,
    title: 'SEO & Meta Data',
    color: '#10B981',
    description: [
      'We implement advanced SEO strategies utilizing standard JSON, JSON-LD, and modern libraries.',
      'Our optimization stack includes:',
      '• JSON-LD structured data for rich search results',
      '• Dynamic Metatags management for social sharing',
      '• React Helmet Async for dynamic head management',
      '• Open Graph and Twitter Card integration',
      '• Semantic HTML structure for accessibility',
      'Ensuring your application is perfectly indexed, discoverable, and stands out in search results.',
    ],
  },
  {
    id: 'reactnative',
    icon: FiSmartphone,
    title: 'React Native',
    color: '#61DAFB',
    description: [
      'We develop high-performance cross-platform mobile applications using React Native.',
      'Mobile development benefits:',
      '• Single codebase for both iOS and Android platforms',
      '• Native-like performance and smooth animations',
      '• Access to native device APIs through powerful bridges',
      '• Rapid development and deployment cycles',
      'React Native allows us to deliver high-quality mobile experiences with greater efficiency and speed.',
    ],
  },
  {
    id: 'styling',
    icon: FiLayers,
    title: 'CSS, Styled-Components, and TailwindCSS',
    color: '#DB7093',
    description: [
      'We utilize a sophisticated styling stack to create beautiful, responsive, and maintainable user interfaces.',
      'Our styling toolkit includes:',
      '• CSS (Flexbox, Grid) for core layout and design foundations',
      '• Styled-Components for encapsulated, component-scoped styling',
      '• TailwindCSS for rapid, utility-first development and consistency',
      '• Responsive design patterns for perfect viewing on all devices',
      'This combination enables us to deliver premium aesthetics with high performance and complete design flexibility.',
    ],
  },
  {
    id: 'nodejs',
    icon: FiServer,
    title: 'Node.js & Express',
    color: '#339933',
    description: [
      'We build scalable server-side applications using high-performance JavaScript runtimes.',
      'Core backend features:',
      '• Efficient event-driven, non-blocking I/O model',
      '• Robust RESTful API development with Express.js',
      '• Real-time data processing and websocket integration',
      '• Secure middleware and authentication systems',
      'Node.js and Express together provide a unified JavaScript development experience for reliable, high-traffic server solutions.',
    ],
  },
  {
    id: 'mongodb',
    icon: FiDatabase,
    title: 'MongoDB & MERN Stack',
    color: '#47A248',
    description: [
      'Our full-stack solutions are powered by modern NoSQL databases and unified JavaScript architectures.',
      'Architecture highlights:',
      '• Flexible JSON-like document storage with MongoDB',
      '• Seamless data flow between frontend and backend',
      '• Rapid development with unified stack expertise',
      '• Scalable cloud database integrations',
      'We leverage the MERN stack to build data-driven applications that balance speed, reliability, and complex data management.',
    ],
  },
];

const technologyStack = [
  'MERN Stack and SwiftUI Mobile App Database Development',
  'Google Antigravity with Anthropic Claude Opus 4 Agent Reasoning',
  'Next.js Server-Side Execution (SSR)',
  'Github Copilot Coding Assistant',
  'Copilot.Microsoft.Com AI Assistant',
  'Visual Studio Code Emmet Assistance',
  'JSON-LD and Metatags For SEO Optimization',
  'BreadCrumbs',
  'Next.js Page Router',
  'Carousel and Image Optimization By Next.js and Styled Components',
  'TypeScript',
  'Styled-components',
  'Framer Motion',
  'Responsive Control, Full, Tablet, and Cell Phone sized Displays',
  'Light / Dark Mode Support',
  'Netlify / Vercel Deployment',
  'ESLint and Prettier',
  'React Testing Library and Jest',
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function TechPage() {
  React.useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    };

    handleHashScroll();
  }, []);

  return (
    <PageWrapper>
      <HeroSection>
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
              style={{ marginBottom: 0 }}
            >
              Our Technology Stack
            </PageTitle>
          </HeroHeader>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Cutting-edge technologies powering innovative web solutions.
            From AI-assisted development to full-stack MERN applications.
          </Subtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <Container>
          <IntroSection>
            <SectionTitle>Technologies at Our Command</SectionTitle>
            <IntroText>
              At Optical Automation, LLC, we specialize in modern web development using the most
              powerful and efficient technologies available. Our expertise spans the entire
              development lifecycle, from initial design concepts to deployment and maintenance.
            </IntroText>
            <IntroText>
              We embrace AI-powered agentic development to accelerate our workflow while maintaining
              the highest standards of code quality. Our full-stack capabilities enable us to deliver
              complete solutions that are scalable, maintainable, and performant.
            </IntroText>
          </IntroSection>

          <SectionSubtitle>
            Each technology in our stack is carefully chosen for its reliability,
            performance, and developer experience.
          </SectionSubtitle>

          <HighlightBox>
            <HighlightTitle>The MERN Stack Advantage</HighlightTitle>
            <HighlightText>
              We use industry‑standard JavaScript across the entire stack, and MERN—MongoDB, Express.js, React.js or Next.js, and Node.js—is one of the most efficient technologies for high‑performance information delivery and SEO‑optimized web applications. By building on a unified JavaScript ecosystem, we eliminate unnecessary context switching and significantly increase engineering efficiency.
            </HighlightText>
            <HighlightText>
              This cohesive architecture enables predictable data flow, shared validation schemas, reusable logic, and consistent development patterns from the database layer to the user interface. Leveraging our standardized industry components, we further ensure uniform, high‑quality UI/UX design across all products.
            </HighlightText>
            <HighlightText>
              When combined with our AI‑assisted development workflows, this approach accelerates delivery timelines while maintaining exceptional scalability, reliability, and performance—far surpassing the speed and maintainability of traditional multi‑language development pipelines.
            </HighlightText>
            <StackBadges>
              <StackBadge>MongoDB</StackBadge>
              <StackBadge>Express.js</StackBadge>
              <StackBadge>React</StackBadge>
              <StackBadge>Node.js</StackBadge>
              <StackBadge>Next.js</StackBadge>
              <StackBadge>AI Agentic Dev</StackBadge>
            </StackBadges>
          </HighlightBox>

          <SectionTitle>Technology Stack</SectionTitle>
          <TechList>
            {technologyStack.map((item, index) => (
              <TechListItem
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                {item}
              </TechListItem>
            ))}
          </TechList>

          <TechGrid
            as={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {technologies.map((tech, index) => (
              <TechCard key={index} variants={itemVariants} id={tech.id} style={tech.image ? { gridColumn: '1 / -1' } : {}}>
                <div style={tech.image ? { display: 'flex', gap: '2rem', alignItems: 'flex-start' } : {}}>
                  <div style={{ flex: 1 }}>
                    <TechHeader>
                      <TechIcon $color={tech.color}>
                        <tech.icon />
                      </TechIcon>
                      <TechTitle>{tech.title}</TechTitle>
                    </TechHeader>
                    <TechDescription>
                      {tech.description.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </TechDescription>
                  </div>
                  {tech.image && (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <HoverZoomImage>
                        <Image
                          src={tech.image}
                          alt={tech.title}
                          width={400}
                          height={400}
                          style={{ display: 'block', objectFit: 'cover' }}
                        />
                      </HoverZoomImage>
                      <p style={{ marginTop: '12px', fontSize: '1.25rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', fontWeight: '500' }}>Hover To Read</p>
                    </div>
                  )}
                </div>
              </TechCard>
            ))}
          </TechGrid>

          <ServicesSection>
            <ServicesSectionTitle>Product Services</ServicesSectionTitle>
            <ServicesGrid>
              <ServiceItem
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <ServiceIcon>
                  <FiServer />
                </ServiceIcon>
                <ServiceTitle>Cloud Hosting</ServiceTitle>
                <ServiceDesc>High-performance cloud hosting with 99.9% uptime guarantee</ServiceDesc>
              </ServiceItem>
              <ServiceItem
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <ServiceIcon>
                  <FiShield />
                </ServiceIcon>
                <ServiceTitle>SSL Certificates</ServiceTitle>
                <ServiceDesc>Enterprise-grade SSL encryption for all products</ServiceDesc>
              </ServiceItem>
              <ServiceItem
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <ServiceIcon>
                  <FiZap />
                </ServiceIcon>
                <ServiceTitle>CDN Integration</ServiceTitle>
                <ServiceDesc>Global content delivery for lightning-fast load times</ServiceDesc>
              </ServiceItem>
              <ServiceItem
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <ServiceIcon>
                  <FiGlobe />
                </ServiceIcon>
                <ServiceTitle>DNS Management</ServiceTitle>
                <ServiceDesc>Advanced DNS configuration and management tools</ServiceDesc>
              </ServiceItem>
            </ServicesGrid>
          </ServicesSection>


        </Container>
      </ContentSection>
    </PageWrapper>
  );
}
