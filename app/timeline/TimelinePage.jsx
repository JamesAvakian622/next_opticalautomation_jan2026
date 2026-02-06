'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import {
    FiCode,
    FiLayers,
    FiServer,
    FiCloud,
    FiUsers,
    FiCpu,
    FiZap,
    FiTrendingUp,
    FiCalendar
} from 'react-icons/fi';

// Timeline Data
const timelineData = [
    {
        year: '2013',
        title: 'React.js Launches',
        icon: FiCode,
        color: '#61dafb',
        description: 'Facebook releases React.js, introducing the virtual DOM and component‑based UI architecture.',
        impact: 'Sparks a revolution in front‑end development.',
        slides: [
            'Introduced component‑based UI',
            'Virtual DOM boosts performance',
            'Foundation for modern front‑end engineering'
        ]
    },
    {
        year: '2014–2016',
        title: 'Modern Web Framework Boom',
        icon: FiLayers,
        color: '#dd0031',
        description: 'Angular 2+, Vue.js, Redux, and other frameworks reshape how developers build scalable, interactive web apps.',
        impact: 'Single‑page applications become the norm.',
        slides: [
            'Angular 2+, Vue.js, Redux',
            'Rise of single‑page applications',
            'Standardization of scalable front‑end patterns'
        ]
    },
    {
        year: '2017–2019',
        title: 'Serverless & JAMstack Era',
        icon: FiServer,
        color: '#ff9900',
        description: 'AWS Lambda, Netlify, and Vercel popularize serverless deployment.',
        impact: 'JAMstack (JavaScript, APIs, Markup) becomes a dominant architecture for fast, secure sites.',
        slides: [
            'AWS Lambda, Netlify, Vercel',
            'Faster deployments, lower maintenance',
            'API‑driven architecture becomes mainstream'
        ]
    },
    {
        year: '2020–2022',
        title: 'Real‑Time Collaboration & Low‑Code Tools',
        icon: FiUsers,
        color: '#00d4ff',
        description: 'Figma, Notion, Airtable, and similar platforms redefine cloud‑native collaboration.',
        impact: 'Low‑code/no‑code tools democratize app creation.',
        slides: [
            'Figma, Notion, Airtable',
            'Real‑time cloud collaboration',
            'Low‑code tools empower non‑developers'
        ]
    },
    {
        year: '2023–2024',
        title: 'AI‑Native Software Becomes Standard',
        icon: FiCpu,
        color: '#10a37f',
        description: 'AI copilots and generative models integrate into browsers, IDEs, and productivity tools.',
        impact: 'AI‑driven UI generation and code completion reshape workflows.',
        slides: [
            'AI copilots in browsers and IDEs',
            'Generative UI and code',
            'AI becomes part of every workflow'
        ]
    },
    {
        year: '2024',
        title: 'Google Antigravity Arrives',
        icon: FiZap,
        color: '#6366f1',
        description: 'Google introduces Antigravity, a modular, template‑driven environment for building modern software projects.',
        impact: 'AG Projects and other libraries provide ready‑to‑use dashboards, CRUD modules, and Next.js integrations.',
        slides: [
            'Modular, template‑driven development',
            'Ready‑made project blueprints',
            'Integrations with Next.js and modern stacks'
        ],
        highlight: true
    },
    {
        year: '2025',
        title: 'Advanced React Visualization Tools',
        icon: FiTrendingUp,
        color: '#8b5cf6',
        description: 'High‑performance timeline and data‑visualization libraries (e.g., canvas‑based React timelines) mature.',
        impact: 'Rich data storytelling becomes easier and more interactive.',
        slides: [
            'High‑performance timeline libraries',
            'Rich data visualization in React',
            'Better storytelling tools for apps'
        ]
    },
    {
        year: '2026',
        title: 'AI‑Integrated Web Platforms Become the Norm',
        icon: FiCloud,
        color: '#ec4899',
        description: 'AI‑generated UI, autonomous code refactoring, and self‑optimizing cloud apps become standard.',
        impact: 'Development shifts toward AI‑assisted architecture and automation.',
        slides: [
            'Self‑optimizing cloud apps',
            'AI‑generated UI and backend scaffolding',
            'Autonomous development workflows'
        ]
    }
];

// Styled Components
const PageContainer = styled.div`
    min-height: 100vh;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    padding: 120px 20px 80px;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: 
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
`;

const Container = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 80px;
`;



const LogoWrapper = styled(motion.div)`
    width: 60px;
    height: 60px;
    position: relative;
    border-radius: 0;
    overflow: hidden;
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 50px;
        height: 50px;
    }
`;

const Title = styled(motion.h1)`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
    line-height: 1.2;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    gap: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
`;

const Subtitle = styled(motion.p)`
    font-size: clamp(1.25rem, 2.5vw, 1.8rem);
    color: rgba(255, 255, 255, 0.8);
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
`;

const TimelineContainer = styled.div`
    position: relative;
    padding: 40px 0;
    max-width: 900px;
    margin: 0 auto;
`;

const TimelineLine = styled.div`
    position: absolute;
    left: 100px;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(180deg,
        transparent 0%,
        rgba(99, 102, 241, 0.5) 10%,
        rgba(99, 102, 241, 0.5) 90%,
        transparent 100%
    );
    z-index: 1;

    @media (max-width: 768px) {
        left: 70px;
    }
`;

const TimelineItem = styled(motion.div)`
    position: relative;
    margin-bottom: 80px;
    display: flex;
    align-items: center;
    gap: 40px;
    padding-left: 20px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        padding-left: 20px;
        gap: 20px;
    }
`;

const TimelineContent = styled(motion.div)`
    flex: 1;
    max-width: 600px;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 32px;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    ${({ $highlight }) => $highlight && `
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 100%);
        border: 2px solid rgba(99, 102, 241, 0.4);
        box-shadow: 0 0 40px rgba(99, 102, 241, 0.3);
    `}

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, ${({ $color }) => $color}20 0%, transparent 100%);
        opacity: 0;
        transition: opacity 0.4s ease;
    }

    &:hover {
        transform: translateY(-8px) scale(1.02);
        border-color: ${({ $color }) => $color};
        box-shadow: 0 20px 60px ${({ $color }) => $color}40;

        &::before {
            opacity: 1;
        }
    }

    @media (max-width: 768px) {
        width: 100%;
        max-width: none;
    }
`;


const TimelineYear = styled.div`
    background: ${({ $color }) => $color};
    color: ${({ theme }) => theme.colors.background === '#0a0a0a' || theme.colors.background === '#0f172a' ? '#000000' : '#ffffff'};
    padding: 18px 40px;
    border-radius: 50px;
    font-weight: 800;
    font-size: 1.75rem;
    box-shadow:
        0 8px 32px ${({ $color }) => $color}80,
        0 0 40px ${({ $color }) => $color}60,
        inset 0 2px 4px rgba(255, 255, 255, 0.3);
    z-index: 2;
    white-space: nowrap;
    letter-spacing: 0.05em;
    border: 2px solid rgba(255, 255, 255, 0.3);
    flex-shrink: 0;

    @media (max-width: 768px) {
        font-size: 1.5rem;
        padding: 14px 28px;
    }
`;

const TimelineIcon = styled.div`
position: absolute;
left: 50 %;
transform: translate(-50 %, 120 %);
width: 60px;
height: 60px;
background: ${({ $color }) => $color};
border - radius: 50 %;
display: flex;
align - items: center;
justify - content: center;
box - shadow: 0 8px 24px ${({ $color }) => $color} 60;
z - index: 3;
border: 4px solid #0f172a;

    svg {
    font - size: 1.5rem;
    color: white;
}

@media(max - width: 768px) {
    left: 30px;
    transform: translate(-50 %, 120 %);
}
`;

const ContentHeader = styled.div`
margin - top: 40px;
margin - bottom: 16px;
`;

const ContentTitle = styled.h3`
font - size: 1.75rem;
font - weight: 700;
color: white;
margin - bottom: 12px;
display: flex;
align - items: center;
gap: 12px;
`;

const ContentDescription = styled.p`
font - size: 1.05rem;
color: rgba(255, 255, 255, 0.8);
line - height: 1.7;
margin - bottom: 16px;
`;

const ContentImpact = styled.p`
font - size: 1rem;
color: ${({ $color }) => $color};
font - weight: 600;
font - style: italic;
padding: 16px;
background: rgba(255, 255, 255, 0.05);
border - left: 4px solid ${({ $color }) => $color};
border - radius: 8px;
`;

const SlidesList = styled(motion.ul)`
list - style: none;
padding: 0;
margin - top: 20px;
display: flex;
flex - direction: column;
gap: 12px;
`;

const SlideItem = styled(motion.li)`
display: flex;
align - items: center;
gap: 12px;
padding: 12px 16px;
background: rgba(255, 255, 255, 0.05);
border - radius: 12px;
color: rgba(255, 255, 255, 0.9);
font - size: 0.95rem;
border - left: 3px solid ${({ $color }) => $color};

    &::before {
    content: '▸';
    color: ${({ $color }) => $color};
    font - weight: 700;
    font - size: 1.2rem;
}
`;

const ClosingSection = styled(motion.div)`
margin - top: 100px;
text - align: center;
padding: 60px 40px;
background: rgba(255, 255, 255, 0.05);
backdrop - filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.1);
border - radius: 32px;
position: relative;
overflow: hidden;

    &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear - gradient(135deg, rgba(99, 102, 241, 0.1) 0 %, rgba(236, 72, 153, 0.1) 100 %);
}
`;

const ClosingTitle = styled.h2`
font - size: 2.5rem;
font - weight: 800;
background: linear - gradient(135deg, #6366f1 0 %, #ec4899 100 %);
-webkit - background - clip: text;
-webkit - text - fill - color: transparent;
background - clip: text;
margin - bottom: 20px;
position: relative;
`;

const ClosingText = styled.p`
font - size: 1.25rem;
color: rgba(255, 255, 255, 0.8);
max - width: 800px;
margin: 0 auto;
line - height: 1.8;
position: relative;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
  position: relative;
  text-align: left;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 24px;
  
  h4 {
    font-size: 1.1rem;
    color: #6366f1;
    margin-bottom: 12px;
    font-weight: 700;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    color: rgba(255, 255, 255, 0.85);
    font-size: 0.95rem;
    padding: 6px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    
    &:last-child {
      border-bottom: none;
    }
    
    strong {
      color: #ec4899;
    }
  }
`;

const StatHighlight = styled.div`
  text-align: center;
  margin-top: 40px;
  padding: 32px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  
  h3 {
    font-size: 1.5rem;
    color: white;
    margin-bottom: 16px;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1rem;
    line-height: 1.7;
    max-width: 700px;
    margin: 0 auto;
  }
`;

export default function TimelinePage() {
    const [expandedItem, setExpandedItem] = useState(null);

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0);
    }, []);

    const toggleItem = (index) => {
        setExpandedItem(expandedItem === index ? null : index);
    };

    return (
        <PageContainer>
            <Container>
                <Header>
                    <Title
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
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
                        Internet Software Timeline
                    </Title>
                    <Subtitle
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Cross-platform Developer Production Software From React.js to Google Antigravity and Beyond
                    </Subtitle>
                </Header>

                <TimelineContainer>
                    <TimelineLine />

                    {timelineData.map((item, index) => (
                        <TimelineItem
                            key={index}
                            $index={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                            <TimelineYear $color={item.color}>
                                {item.year}
                            </TimelineYear>

                            <TimelineContent
                                $color={item.color}
                                $highlight={item.highlight}
                                onMouseEnter={() => setExpandedItem(index)}
                                onMouseLeave={() => setExpandedItem(null)}
                                whileHover={{ scale: 1.02 }}
                            >
                                <ContentHeader>
                                    <ContentTitle>
                                        {item.title}
                                    </ContentTitle>
                                    <ContentDescription>
                                        {item.description}
                                    </ContentDescription>
                                    <ContentImpact $color={item.color}>
                                        {item.impact}
                                    </ContentImpact>
                                </ContentHeader>

                                <AnimatePresence>
                                    {expandedItem === index && (
                                        <SlidesList
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {item.slides.map((slide, slideIndex) => (
                                                <SlideItem
                                                    key={slideIndex}
                                                    $color={item.color}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: slideIndex * 0.1 }}
                                                >
                                                    {slide}
                                                </SlideItem>
                                            ))}
                                        </SlidesList>
                                    )}
                                </AnimatePresence>
                            </TimelineContent>
                        </TimelineItem>
                    ))}
                </TimelineContainer>

                <ClosingSection
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <ClosingTitle>The Future is Accelerating</ClosingTitle>
                    <ClosingText>
                        The internet software ecosystem is accelerating — from frameworks to AI‑driven platforms,
                        each era builds on the last. We're witnessing an unprecedented convergence of AI,
                        cloud computing, and developer tools that's reshaping how we build, deploy, and experience software.
                    </ClosingText>

                    <StatsGrid>
                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <h4>Global Website Statistics</h4>
                            <ul>
                                <li><strong>1.98 billion</strong> websites worldwide</li>
                                <li><strong>7.5 million+</strong> Next.js websites</li>
                                <li><strong>12 million+</strong> React-based applications</li>
                                <li><strong>3.2 million+</strong> MERN stack projects</li>
                                <li><strong>85%</strong> of top sites are SEO optimized</li>
                            </ul>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <h4>Mobile Apps Worldwide</h4>
                            <ul>
                                <li><strong>8.93 million</strong> mobile apps globally</li>
                                <li><strong>2.1 million+</strong> iOS App Store apps</li>
                                <li><strong>3.5 million+</strong> Google Play apps</li>
                                <li><strong>850,000+</strong> SwiftUI-based apps</li>
                                <li><strong>1.2 million+</strong> React Native apps</li>
                            </ul>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <h4>Developers Worldwide</h4>
                            <ul>
                                <li><strong>28.7 million</strong> developers globally</li>
                                <li><strong>17.4 million</strong> JavaScript developers</li>
                                <li><strong>8.5 million</strong> Python developers</li>
                                <li><strong>4.2 million</strong> Swift/iOS developers</li>
                                <li><strong>6.1 million</strong> full-stack developers</li>
                            </ul>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            <h4>Compliance Standards</h4>
                            <ul>
                                <li><strong>SOC2</strong> — 45,000+ certified companies</li>
                                <li><strong>ISO 8601</strong> — Universal date/time standard</li>
                                <li><strong>GDPR</strong> — 1.2 million+ compliant sites</li>
                                <li><strong>WCAG</strong> — Growing accessibility adoption</li>
                                <li><strong>PCI DSS</strong> — E-commerce security standard</li>
                            </ul>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                        >
                            <h4>Internet Users by Continent</h4>
                            <ul>
                                <li><strong>Asia</strong> — 2.93 billion users (54%)</li>
                                <li><strong>Europe</strong> — 750 million users (14%)</li>
                                <li><strong>Africa</strong> — 590 million users (11%)</li>
                                <li><strong>Americas</strong> — 540 million users (10%)</li>
                                <li><strong>Oceania</strong> — 32 million users (0.6%)</li>
                            </ul>
                        </StatCard>

                        <StatCard
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                        >
                            <h4>Software Usage Statistics</h4>
                            <ul>
                                <li><strong>5.44 billion</strong> people use the internet</li>
                                <li><strong>4.95 billion</strong> social media users</li>
                                <li><strong>6.92 billion</strong> smartphone users</li>
                                <li><strong>2.71 billion</strong> online shoppers</li>
                                <li><strong>4.4 billion</strong> email users worldwide</li>
                            </ul>
                        </StatCard>
                    </StatsGrid>

                    <StatHighlight>
                        <h3>The Digital Economy is Growing Exponentially</h3>
                        <p>
                            With over 28 million developers creating solutions using modern frameworks like Next.js, React, and SwiftUI,
                            the software industry continues to expand. SOC2 compliance and ISO 8601 standards ensure security and
                            interoperability across global platforms, while SEO optimization drives discoverability for billions of users.
                        </p>
                    </StatHighlight>
                </ClosingSection>
            </Container>
        </PageContainer>
    );
}
