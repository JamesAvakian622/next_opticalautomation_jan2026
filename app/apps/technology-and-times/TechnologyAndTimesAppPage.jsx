'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiSmartphone, FiStar, FiCpu, FiMonitor, FiHome, FiTruck, FiUsers, FiGlobe, FiMoon, FiSettings, FiMail, FiRss, FiSearch } from 'react-icons/fi';

export default function TechnologyAndTimesAppPage() {
    const screens = [
        {
            title: 'Home',
            color: '#10B981',
            content: (
                <>
                    <MockNav>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>●●○ Technology And Times</span>
                    </MockNav>
                    <MockHeader bg="#10B981">
                        <span style={{ fontSize: '2rem' }}>🖥️</span>
                        <h3>Technology And Times</h3>
                        <small>Tech News & Articles</small>
                    </MockHeader>
                    <MockCard>
                        <FiCpu style={{ color: '#10B981' }} />
                        <div><strong>Technology</strong><br /><small>Latest Innovation</small></div>
                    </MockCard>
                    <MockCard>
                        <FiMonitor style={{ color: '#6366f1' }} />
                        <div><strong>Computers</strong><br /><small>Hardware & Software</small></div>
                    </MockCard>
                    <MockCard>
                        <FiHome style={{ color: '#f59e0b' }} />
                        <div><strong>Homes</strong><br /><small>Smart Living</small></div>
                    </MockCard>
                    <MockTabBar active={0} tabs={['Home', 'Categories', 'Search', 'Settings']} />
                </>
            )
        },
        {
            title: 'Categories',
            color: '#6366f1',
            content: (
                <>
                    <MockNav>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Categories</span>
                    </MockNav>
                    <MockSectionTitle>📂 Browse Topics</MockSectionTitle>
                    <MockTabs tabs={['All', 'Tech', 'Business', 'Gov']} active={0} />
                    <MockProjectCard color="#10B981">
                        <strong>Technology</strong>
                        <small>Innovation & Trends</small>
                    </MockProjectCard>
                    <MockProjectCard color="#6366f1">
                        <strong>Computers</strong>
                        <small>Hardware • Software</small>
                    </MockProjectCard>
                    <MockProjectCard color="#f59e0b">
                        <strong>Homes</strong>
                        <small>Smart Home Tech</small>
                    </MockProjectCard>
                    <MockProjectCard color="#0EA5E9">
                        <strong>Automobiles</strong>
                        <small>Electric • Autonomous</small>
                    </MockProjectCard>
                    <MockProjectCard color="#ec4899">
                        <strong>Corporations</strong>
                        <small>Business & Industry</small>
                    </MockProjectCard>
                    <MockTabBar active={1} tabs={['Home', 'Categories', 'Search', 'Settings']} />
                </>
            )
        },
        {
            title: 'Article',
            color: '#0EA5E9',
            content: (
                <>
                    <MockNav>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>← Technology</span>
                    </MockNav>
                    <div style={{ padding: '8px 14px' }}>
                        <div style={{
                            width: '100%', height: 80, borderRadius: 10,
                            background: 'linear-gradient(135deg, #10B981, #059669)',
                            marginBottom: 10,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.8rem'
                        }}>
                            📰
                        </div>
                    </div>
                    <MockSectionTitle>AI Revolutionizes Industry</MockSectionTitle>
                    <div style={{ padding: '0 14px', fontSize: '0.6rem', color: '#94a3b8', lineHeight: 1.5 }}>
                        The latest breakthroughs in artificial intelligence are transforming how businesses operate across all sectors...
                    </div>
                    <MockCard>
                        <FiRss style={{ color: '#10B981' }} />
                        <div><strong>Related Articles</strong><br /><small>5 more stories</small></div>
                    </MockCard>
                    <MockTabBar active={0} tabs={['Home', 'Categories', 'Search', 'Settings']} />
                </>
            )
        },
        {
            title: 'Settings',
            color: '#f59e0b',
            content: (
                <>
                    <MockNav>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Settings</span>
                    </MockNav>
                    <MockSectionTitle>⚙️ Settings</MockSectionTitle>
                    <MockSettingRow>
                        <FiMoon /> <span>Dark Mode</span> <MockToggle on={true} />
                    </MockSettingRow>
                    <MockSettingRow>
                        <FiRss /> <span>Push Notifications</span> <MockToggle on={true} />
                    </MockSettingRow>
                    <MockSettingRow>
                        <FiMail /> <span>Contact</span> <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>→</span>
                    </MockSettingRow>
                    <MockSettingRow>
                        <FiGlobe /> <span>Visit Website</span> <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>→</span>
                    </MockSettingRow>
                    <MockAbout>
                        <p>Technology And Times</p>
                        <small>Version 1.0 • © 2026</small>
                        <small>Optical Automation, LLC</small>
                    </MockAbout>
                    <MockTabBar active={3} tabs={['Home', 'Categories', 'Search', 'Settings']} />
                </>
            )
        }
    ];

    const features = [
        { icon: <FiRss />, title: 'News Feed', desc: 'Browse articles across Technology, Computers, Homes, Automobiles & more' },
        { icon: <FiCpu />, title: 'Category Browse', desc: '6 categories: Technology, Computers, Homes, Automobiles, Corporations, Government' },
        { icon: <FiSearch />, title: 'Smart Search', desc: 'Find articles instantly with full-text search capabilities' },
        { icon: <FiGlobe />, title: 'Offline Reading', desc: 'Save articles for reading when you\'re not connected' },
        { icon: <FiMoon />, title: 'Dark Mode', desc: 'Beautiful dark interface with system detection' },
        { icon: <FiSettings />, title: 'Push Alerts', desc: 'Get notified when new articles are published in your favorite topics' },
    ];

    return (
        <PageContainer>
            <HeroSection>
                <BackLink href="/app-portfolio">
                    <FiArrowLeft /> Back to App Portfolio
                </BackLink>
                <HeroContent>
                    <AppIconLarge
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                        🖥️
                    </AppIconLarge>
                    <AppTitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Technology And Times
                    </AppTitle>
                    <AppTagline
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Your Source for Technology News & Articles
                    </AppTagline>
                    <BadgeRow
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Badge color="#10B981"><FiSmartphone size={12} /> iOS</Badge>
                        <Badge color="#10b981"><FiStar size={12} /> SwiftUI</Badge>
                        <Badge color="#f59e0b">Live</Badge>
                    </BadgeRow>
                </HeroContent>
            </HeroSection>

            <ScreensSection>
                <SectionTitle
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    App Screenshots
                </SectionTitle>
                <ScreensGrid>
                    {screens.map((screen, i) => (
                        <PhoneFrame
                            key={screen.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                        >
                            <PhoneNotch />
                            <PhoneScreen>
                                {screen.content}
                            </PhoneScreen>
                            <ScreenLabel>{screen.title}</ScreenLabel>
                        </PhoneFrame>
                    ))}
                </ScreensGrid>
            </ScreensSection>

            <FeaturesSection>
                <SectionTitle
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Key Features
                </SectionTitle>
                <FeaturesGrid>
                    {features.map((f, i) => (
                        <FeatureCard
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.08 }}
                        >
                            <FeatureIcon>{f.icon}</FeatureIcon>
                            <div>
                                <FeatureTitle>{f.title}</FeatureTitle>
                                <FeatureDesc>{f.desc}</FeatureDesc>
                            </div>
                        </FeatureCard>
                    ))}
                </FeaturesGrid>
            </FeaturesSection>

            <CTASection>
                <CTATitle>Built with SwiftUI</CTATitle>
                <CTADesc>Native iOS experience with premium design and performance.</CTADesc>
                <CTAButton href="/app-portfolio">
                    <FiArrowLeft /> Back to Portfolio
                </CTAButton>
            </CTASection>
        </PageContainer>
    );
}

// ── Styled Components ──────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.background : '#d1fae5'};
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSection = styled.section`
  position: relative;
  padding: 100px 20px 60px;
  text-align: center;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(135deg, #052e16 0%, #064e3b 50%, #0f2f23 100%)'
        : 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 50%, #a7f3d0 100%)'};
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.mode === 'dark' ? '#6ee7b7' : '#047857'};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

const HeroContent = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const AppIconLarge = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const AppTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(135deg, #fff 0%, #6ee7b7 100%)'
        : 'linear-gradient(135deg, #064e3b 0%, #10B981 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AppTagline = styled(motion.p)`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  margin-bottom: 20px;
`;

const BadgeRow = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color}30;
`;

const ScreensSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};
`;

const ScreensGrid = styled.div`
  display: flex;
  gap: 28px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PhoneFrame = styled(motion.div)`
  width: 220px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#1a1a2e' : '#f8fafc'};
  border: 2px solid ${({ theme }) => theme.mode === 'dark' ? '#2d2d5e' : '#e2e8f0'};
  border-radius: 28px;
  padding: 8px;
  box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
`;

const PhoneNotch = styled.div`
  width: 80px;
  height: 6px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#333' : '#d1d5db'};
  border-radius: 3px;
  margin: 6px auto 8px;
`;

const PhoneScreen = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? '#0f0f23' : '#f1f5f9'};
  border-radius: 20px;
  min-height: 380px;
  overflow: hidden;
  position: relative;
  padding-bottom: 40px;
`;

const ScreenLabel = styled.div`
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 8px;
  padding-bottom: 4px;
`;

const FeaturesSection = styled.section`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px 20px 60px;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
`;

const FeatureCard = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px;
  border-radius: 14px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    border-color: #10B981;
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(16, 185, 129, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #10B981;
  font-size: 1.1rem;
`;

const FeatureTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 4px;
`;

const FeatureDesc = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.4;
  margin: 0;
`;

const CTASection = styled.section`
  text-align: center;
  padding: 50px 20px 80px;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.06) 100%)'
        : 'linear-gradient(180deg, transparent 0%, rgba(16, 185, 129, 0.04) 100%)'};
`;

const CTATitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 10px;
`;

const CTADesc = styled.p`
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
`;

const CTAButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  color: white;
  background: linear-gradient(135deg, #10B981, #059669);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  }
`;

// ── Mock Phone UI Components ──────────────────

const MockNav = styled.div`
  padding: 10px 14px 6px;
  text-align: center;
  font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark' ? '#e2e8f0' : '#1e293b'};
`;

const MockHeader = styled.div`
  text-align: center;
  padding: 16px 12px;
  background: ${({ bg }) => bg}15;
  margin: 0 10px 10px;
  border-radius: 12px;

  h3 {
    font-size: 0.85rem;
    font-weight: 700;
    color: ${({ theme }) => theme.mode === 'dark' ? '#e2e8f0' : '#1e293b'};
    margin: 6px 0 2px;
  }

  small {
    font-size: 0.6rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-style: italic;
  }
`;

const MockCard = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  margin: 6px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};

  strong { font-size: 0.75rem; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.6rem; color: ${({ theme }) => theme.colors.textSecondary}; }
  svg { font-size: 1.1rem; }
`;

const MockTabBar = ({ tabs, active }) => (
    <MockTabBarContainer>
        {tabs.map((t, i) => (
            <MockTab key={t} $active={i === active}>{t}</MockTab>
        ))}
    </MockTabBarContainer>
);

const MockTabBarContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  padding: 6px 4px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#0f0f23' : '#f1f5f9'};
  border-top: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
`;

const MockTab = styled.span`
  font-size: 0.5rem;
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  color: ${({ $active }) => $active ? '#10B981' : '#94a3b8'};
`;

const MockSectionTitle = styled.div`
  font-size: 0.8rem;
  font-weight: 700;
  padding: 10px 14px 6px;
  color: ${({ theme }) => theme.colors.text};
`;

const MockTabs = ({ tabs, active }) => (
    <MockTabsContainer>
        {tabs.map((t, i) => (
            <MockFilterTab key={t} $active={i === active}>{t}</MockFilterTab>
        ))}
    </MockTabsContainer>
);

const MockTabsContainer = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 10px;
  overflow: hidden;
`;

const MockFilterTab = styled.span`
  font-size: 0.55rem;
  padding: 3px 8px;
  border-radius: 6px;
  font-weight: 600;
  background: ${({ $active }) => $active ? 'rgba(16,185,129,0.2)' : 'transparent'};
  color: ${({ $active }) => $active ? '#10B981' : '#94a3b8'};
  white-space: nowrap;
`;

const MockProjectCard = ({ color, children }) => (
    <MockProjectCardStyled $color={color}>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: color, flexShrink: 0 }} />
        <div>{children}</div>
    </MockProjectCardStyled>
);

const MockProjectCardStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  margin: 6px 10px;
  border-radius: 10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'};
  border-left: 3px solid ${({ $color }) => $color};

  strong { font-size: 0.72rem; display: block; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.58rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockSettingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  margin: 4px 10px;
  border-radius: 8px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'};
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.text};

  svg { font-size: 0.85rem; color: #10B981; }
  span:nth-child(2) { flex: 1; }
`;

const MockToggle = ({ on }) => (
    <div style={{
        width: 28, height: 16, borderRadius: 8,
        background: on ? '#10B981' : '#555',
        position: 'relative',
        flexShrink: 0
    }}>
        <div style={{
            width: 12, height: 12, borderRadius: 6,
            background: '#fff',
            position: 'absolute',
            top: 2,
            left: on ? 14 : 2,
            transition: 'left 0.2s'
        }} />
    </div>
);

const MockAbout = styled.div`
  text-align: center;
  padding: 16px 10px;
  margin-top: 10px;
  p { font-size: 0.7rem; font-weight: 600; margin: 0 0 2px; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.55rem; color: ${({ theme }) => theme.colors.textSecondary}; display: block; }
`;
