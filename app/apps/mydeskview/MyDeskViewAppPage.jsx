'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiSmartphone, FiStar, FiCheck, FiMonitor, FiLayout, FiGrid, FiRefreshCw, FiLayers, FiSettings, FiMoon, FiMail, FiGlobe } from 'react-icons/fi';

export default function MyDeskViewAppPage() {
    const screens = [
        {
            title: 'Dashboard',
            color: '#0EA5E9',
            content: (
                <>
                    <MockNav>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>●●○ MyDeskView</span>
                    </MockNav>
                    <MockHeader bg="#0EA5E9">
                        <span style={{ fontSize: '2rem' }}>🖥️</span>
                        <h3>MyDeskView</h3>
                        <small>Your Digital Desktop</small>
                    </MockHeader>
                    <MockCard>
                        <FiLayout style={{ color: '#0EA5E9' }} />
                        <div><strong>Quick Access</strong><br /><small>27+ Apps Ready</small></div>
                    </MockCard>
                    <MockCard>
                        <FiGrid style={{ color: '#8b5cf6' }} />
                        <div><strong>Widgets</strong><br /><small>Customizable Layout</small></div>
                    </MockCard>
                    <MockCard>
                        <FiRefreshCw style={{ color: '#10b981' }} />
                        <div><strong>Sync</strong><br /><small>Real-time Updates</small></div>
                    </MockCard>
                    <MockTabBar active={0} tabs={['Dashboard', 'Apps', 'Widgets', 'Settings']} />
                </>
            )
        },
        {
            title: 'Apps',
            color: '#8b5cf6',
            content: (
                <>
                    <MockNav>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Apps</span>
                    </MockNav>
                    <MockSectionTitle>📱 Integrated Apps</MockSectionTitle>
                    <MockTabs tabs={['All', 'Business', 'Education', 'Personal']} active={0} />
                    <MockProjectCard color="#0EA5E9">
                        <strong>AccessMoney</strong>
                        <small>Financial Management</small>
                    </MockProjectCard>
                    <MockProjectCard color="#10b981">
                        <strong>BusinessTracker</strong>
                        <small>Business Intelligence</small>
                    </MockProjectCard>
                    <MockProjectCard color="#f59e0b">
                        <strong>LearnSkills365</strong>
                        <small>Educational Platform</small>
                    </MockProjectCard>
                    <MockProjectCard color="#ec4899">
                        <strong>FitnessTracker</strong>
                        <small>Health & Fitness</small>
                    </MockProjectCard>
                    <MockTabBar active={1} tabs={['Dashboard', 'Apps', 'Widgets', 'Settings']} />
                </>
            )
        },
        {
            title: 'Widgets',
            color: '#10b981',
            content: (
                <>
                    <MockNav>
                        <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>Widgets</span>
                    </MockNav>
                    <MockSectionTitle>🧩 Widget System</MockSectionTitle>
                    <MockCard>
                        <FiMonitor style={{ color: '#0EA5E9' }} />
                        <div><strong>Calendar Widget</strong><br /><small>Events & Reminders</small></div>
                    </MockCard>
                    <MockCard>
                        <FiLayers style={{ color: '#10b981' }} />
                        <div><strong>Quick Notes</strong><br /><small>Sticky Notes</small></div>
                    </MockCard>
                    <MockCard>
                        <FiGrid style={{ color: '#f59e0b' }} />
                        <div><strong>App Launcher</strong><br /><small>Favorite Apps</small></div>
                    </MockCard>
                    <MockCard>
                        <FiRefreshCw style={{ color: '#ec4899' }} />
                        <div><strong>News Feed</strong><br /><small>Live Updates</small></div>
                    </MockCard>
                    <MockTabBar active={2} tabs={['Dashboard', 'Apps', 'Widgets', 'Settings']} />
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
                        <FiGrid /> <span>Widget Layout</span> <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>→</span>
                    </MockSettingRow>
                    <MockSettingRow>
                        <FiRefreshCw /> <span>Auto Sync</span> <MockToggle on={true} />
                    </MockSettingRow>
                    <MockSettingRow>
                        <FiMail /> <span>Support</span> <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>→</span>
                    </MockSettingRow>
                    <MockSettingRow>
                        <FiGlobe /> <span>Visit Website</span> <span style={{ opacity: 0.5, fontSize: '0.7rem' }}>→</span>
                    </MockSettingRow>
                    <MockAbout>
                        <p>MyDeskView</p>
                        <small>Version 1.0 • © 2026</small>
                        <small>Optical Automation, LLC</small>
                    </MockAbout>
                    <MockTabBar active={3} tabs={['Dashboard', 'Apps', 'Widgets', 'Settings']} />
                </>
            )
        }
    ];

    const features = [
        { icon: <FiMonitor />, title: '27+ Integrated Apps', desc: 'Business, Education, Entertainment, Productivity & Health categories' },
        { icon: <FiGrid />, title: 'Widget System', desc: 'Customizable widgets for quick access to your favorite tools' },
        { icon: <FiRefreshCw />, title: 'Cross-App Sync', desc: 'Real-time synchronization across all integrated applications' },
        { icon: <FiLayers />, title: 'Dashboard View', desc: 'Central command center for daily workflow management' },
        { icon: <FiMoon />, title: 'Dark Mode', desc: 'Beautiful dark interface with automatic system detection' },
        { icon: <FiSettings />, title: 'Customizable', desc: 'Personalize layout, themes, and notification preferences' },
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
                        MyDeskView
                    </AppTitle>
                    <AppTagline
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Your Digital Desktop — 27+ Apps In One Place
                    </AppTagline>
                    <BadgeRow
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Badge color="#0EA5E9"><FiSmartphone size={12} /> iOS</Badge>
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
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.background : '#e0f2fe'};
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSection = styled.section`
  position: relative;
  padding: 100px 20px 60px;
  text-align: center;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(135deg, #0c1929 0%, #0e3a5e 50%, #0f2942 100%)'
        : 'linear-gradient(135deg, #bae6fd 0%, #7dd3fc 50%, #a5f3fc 100%)'};
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0284c7'};
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
        ? 'linear-gradient(135deg, #fff 0%, #7dd3fc 100%)'
        : 'linear-gradient(135deg, #0c4a6e 0%, #0EA5E9 100%)'};
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
    border-color: #0EA5E9;
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(14, 165, 233, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #0EA5E9;
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
        ? 'linear-gradient(180deg, transparent 0%, rgba(14, 165, 233, 0.06) 100%)'
        : 'linear-gradient(180deg, transparent 0%, rgba(14, 165, 233, 0.04) 100%)'};
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
  background: linear-gradient(135deg, #0EA5E9, #0284c7);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3);
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
  color: ${({ $active }) => $active ? '#0EA5E9' : '#94a3b8'};
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
  background: ${({ $active }) => $active ? 'rgba(14,165,233,0.2)' : 'transparent'};
  color: ${({ $active }) => $active ? '#0EA5E9' : '#94a3b8'};
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

  svg { font-size: 0.85rem; color: #0EA5E9; }
  span:nth-child(2) { flex: 1; }
`;

const MockToggle = ({ on }) => (
    <div style={{
        width: 28, height: 16, borderRadius: 8,
        background: on ? '#0EA5E9' : '#555',
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
