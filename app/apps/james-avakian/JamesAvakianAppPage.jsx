'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiSmartphone, FiStar, FiCheck, FiUser, FiSearch, FiMail, FiBookOpen, FiVideo, FiMoon, FiGrid } from 'react-icons/fi';

export default function JamesAvakianAppPage() {
    const screens = [
        {
            title: 'Home',
            content: (
                <>
                    <MockNav>●●○ James Avakian</MockNav>
                    <MockHeroCard bg="#8b5cf6">
                        <span style={{ fontSize: '1.8rem' }}>👤</span>
                        <h3>James Avakian</h3>
                        <small>Founder & Developer</small>
                    </MockHeroCard>
                    <MockCategoryCard emoji="📖" title="Biography" count="8 sections" />
                    <MockCategoryCard emoji="🎬" title="Entertainment" count="6 sections" />
                    <MockCategoryCard emoji="💻" title="Technology" count="7 sections" />
                    <MockCategoryCard emoji="📚" title="Resources" count="5 sections" />
                    <MockTabBar active={0} tabs={['Home', 'Explore', 'Search', 'Contact', 'Profile']} />
                </>
            )
        },
        {
            title: 'Explore',
            content: (
                <>
                    <MockNav>Explore</MockNav>
                    <MockSectionTitle>📱 Explore Content</MockSectionTitle>
                    <MockVideoCard title="Cal Poly SLO Journey" duration="4:32" />
                    <MockVideoCard title="SwiftUI Development" duration="6:15" />
                    <MockVideoCard title="iOS App Showcase" duration="3:48" />
                    <MockVideoCard title="Optical Automation Story" duration="5:20" />
                    <MockTabBar active={1} tabs={['Home', 'Explore', 'Search', 'Contact', 'Profile']} />
                </>
            )
        },
        {
            title: 'Search',
            content: (
                <>
                    <MockNav>Search</MockNav>
                    <MockSectionTitle>🔍 Search Everything</MockSectionTitle>
                    <MockSearchBar />
                    <MockSearchResult title="Electronics Engineering" section="Education" />
                    <MockSearchResult title="SwiftUI Projects" section="Technology" />
                    <MockSearchResult title="Award History" section="Entertainment" />
                    <MockSearchResult title="Founder's Journey" section="Biography" />
                    <MockTabBar active={2} tabs={['Home', 'Explore', 'Search', 'Contact', 'Profile']} />
                </>
            )
        },
        {
            title: 'Profile',
            content: (
                <>
                    <MockNav>Profile</MockNav>
                    <MockProfileHeader>
                        <div style={{ width: 40, height: 40, borderRadius: 20, background: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.2rem' }}>
                            <FiUser />
                        </div>
                        <div>
                            <strong>James Avakian</strong>
                            <small>Founder, Optical Automation</small>
                        </div>
                    </MockProfileHeader>
                    <MockProfileStat label="Education" value="Cal Poly SLO" />
                    <MockProfileStat label="Degree" value="BS EET" />
                    <MockProfileStat label="Sections" value="26" />
                    <MockProfileStat label="Videos" value="20+" />
                    <MockTabBar active={4} tabs={['Home', 'Explore', 'Search', 'Contact', 'Profile']} />
                </>
            )
        }
    ];

    const features = [
        { icon: <FiGrid />, title: '5-Tab Navigation', desc: 'Home, Explore, Search, Contact, Profile' },
        { icon: <FiBookOpen />, title: '26 Sections', desc: 'Across 4 categories: Bio, Entertainment, Tech, Resources' },
        { icon: <FiVideo />, title: '20+ Videos', desc: 'Embedded video content throughout all categories' },
        { icon: <FiSearch />, title: 'Full-Text Search', desc: 'Search everything across all sections instantly' },
        { icon: <FiMail />, title: 'Contact Form', desc: 'Built-in contact form for direct communication' },
        { icon: <FiMoon />, title: 'Dark Mode', desc: 'Beautiful dark interface with SwiftUI native design' },
    ];

    return (
        <PageContainer>
            <HeroSection>
                <BackLink href="/app-portfolio">
                    <FiArrowLeft /> Back to App Portfolio
                </BackLink>
                <HeroContent>
                    <MobileAppsBadge
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <FiSmartphone /> Mobile Applications
                    </MobileAppsBadge>
                    <AppIconLarge
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                        👤
                    </AppIconLarge>
                    <AppTitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        James Avakian
                    </AppTitle>
                    <AppTagline
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        Personal Bio & Portfolio App
                    </AppTagline>
                    <BadgeRow
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Badge color="#8b5cf6"><FiSmartphone size={12} /> iOS</Badge>
                        <Badge color="#10b981"><FiStar size={12} /> SwiftUI</Badge>
                        <Badge color="#f59e0b">Live</Badge>
                    </BadgeRow>
                </HeroContent>
            </HeroSection>

            <ScreensSection>
                <SectionTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    App Screenshots
                </SectionTitle>
                <ScreensGrid>
                    {screens.map((screen, i) => (
                        <PhoneFrame key={screen.title} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                            <PhoneNotch />
                            <PhoneScreen>{screen.content}</PhoneScreen>
                            <ScreenLabel>{screen.title}</ScreenLabel>
                        </PhoneFrame>
                    ))}
                </ScreensGrid>
            </ScreensSection>

            <FeaturesSection>
                <SectionTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    Key Features
                </SectionTitle>
                <FeaturesGrid>
                    {features.map((f, i) => (
                        <FeatureCard key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
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
                <CTAButton href="/app-portfolio"><FiArrowLeft /> Back to Portfolio</CTAButton>
            </CTASection>
        </PageContainer>
    );
}

// ── Styled Components ──────────────────────────
const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.background : '#dbeafe'};
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSection = styled.section`
  position: relative;
  padding: 100px 20px 60px;
  text-align: center;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(135deg, #1a0a2e 0%, #2d1854 50%, #24243e 100%)'
        : 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 50%, #e0e7ff 100%)'};
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.mode === 'dark' ? '#c4b5fd' : '#7c3aed'};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

const HeroContent = styled.div`max-width: 600px; margin: 0 auto;`;

const MobileAppsBadge = styled(motion.div)`
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
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark' ? '#a5b4fc' : '#4f46e5'};
  backdrop-filter: blur(10px);

  svg {
    color: ${({ theme }) => theme.mode === 'dark' ? '#818cf8' : '#6366f1'};
    font-size: 1.1rem;
  }
`;

const AppIconLarge = styled(motion.div)`font-size: 4rem; margin-bottom: 16px;`;

const AppTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(135deg, #fff 0%, #c4b5fd 100%)'
        : 'linear-gradient(135deg, #1e1b4b 0%, #7c3aed 100%)'};
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

const BadgeRow = styled(motion.div)`display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;`;

const Badge = styled.span`
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;
  background: ${({ color }) => color}20;
  color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color}30;
`;

const ScreensSection = styled.section`max-width: 1200px; margin: 0 auto; padding: 60px 20px;`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem; font-weight: 700; text-align: center; margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};
`;

const ScreensGrid = styled.div`display: flex; gap: 28px; justify-content: center; flex-wrap: wrap;`;

const PhoneFrame = styled(motion.div)`
  width: 220px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#1a1a2e' : '#f8fafc'};
  border: 2px solid ${({ theme }) => theme.mode === 'dark' ? '#2d2d5e' : '#e2e8f0'};
  border-radius: 28px; padding: 8px;
  box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
`;

const PhoneNotch = styled.div`
  width: 80px; height: 6px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#333' : '#d1d5db'};
  border-radius: 3px; margin: 6px auto 8px;
`;

const PhoneScreen = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? '#0f0f23' : '#f1f5f9'};
  border-radius: 20px; min-height: 380px; overflow: hidden; position: relative; padding-bottom: 40px;
`;

const ScreenLabel = styled.div`
  text-align: center; font-size: 0.78rem; font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary}; margin-top: 8px; padding-bottom: 4px;
`;

const FeaturesSection = styled.section`max-width: 900px; margin: 0 auto; padding: 20px 20px 60px;`;

const FeaturesGrid = styled.div`
  display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;
`;

const FeatureCard = styled(motion.div)`
  display: flex; align-items: flex-start; gap: 14px; padding: 20px; border-radius: 14px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); border-color: #8b5cf6; }
`;

const FeatureIcon = styled.div`
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(139, 92, 246, 0.12);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: #8b5cf6; font-size: 1.1rem;
`;

const FeatureTitle = styled.h4`
  font-size: 0.95rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; margin-bottom: 4px;
`;

const FeatureDesc = styled.p`
  font-size: 0.82rem; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.4; margin: 0;
`;

const CTASection = styled.section`
  text-align: center; padding: 50px 20px 80px;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.06) 100%)'
        : 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 100%)'};
`;

const CTATitle = styled.h2`font-size: 1.8rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; margin-bottom: 10px;`;
const CTADesc = styled.p`color: ${({ theme }) => theme.colors.textSecondary}; margin-bottom: 24px;`;

const CTAButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px; border-radius: 12px; font-size: 0.95rem; font-weight: 700;
  text-decoration: none; color: white;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(139,92,246,0.3); }
`;

// ── Mock Phone UI Components ──────────────────
const MockNav = styled.div`
  padding: 10px 14px 6px; text-align: center; font-size: 0.7rem; font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark' ? '#e2e8f0' : '#1e293b'}; opacity: 0.6;
`;

const MockHeroCard = styled.div`
  text-align: center; padding: 16px 12px; margin: 0 10px 10px; border-radius: 12px;
  background: ${({ bg }) => bg}15;
  h3 { font-size: 0.85rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; margin: 6px 0 2px; }
  small { font-size: 0.6rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockCategoryCard = ({ emoji, title, count }) => (
    <MockCategoryCardStyled>
        <span>{emoji}</span>
        <div>
            <strong>{title}</strong>
            <small>{count}</small>
        </div>
    </MockCategoryCardStyled>
);

const MockCategoryCardStyled = styled.div`
  display: flex; align-items: center; gap: 10px;
  padding: 10px 14px; margin: 6px 10px; border-radius: 10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
  span { font-size: 1.2rem; }
  strong { font-size: 0.72rem; display: block; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.58rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockSectionTitle = styled.div`
  font-size: 0.8rem; font-weight: 700; padding: 10px 14px 6px;
  color: ${({ theme }) => theme.colors.text};
`;

const MockVideoCard = ({ title, duration }) => (
    <MockVideoCardStyled>
        <div style={{ width: 44, height: 32, borderRadius: 6, background: 'rgba(139,92,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#8b5cf6', flexShrink: 0 }}>▶</div>
        <div>
            <strong>{title}</strong>
            <small>{duration}</small>
        </div>
    </MockVideoCardStyled>
);

const MockVideoCardStyled = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 8px 14px; margin: 4px 10px; border-radius: 8px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'};
  strong { font-size: 0.68rem; display: block; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.55rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockSearchBar = () => (
    <div style={{ margin: '4px 10px 8px', padding: '8px 12px', borderRadius: 8, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)', fontSize: '0.6rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
        <FiSearch size={10} /> Search sections, videos...
    </div>
);

const MockSearchResult = ({ title, section }) => (
    <MockSearchResultStyled>
        <strong>{title}</strong>
        <small>{section}</small>
    </MockSearchResultStyled>
);

const MockSearchResultStyled = styled.div`
  padding: 8px 14px; margin: 4px 10px; border-radius: 8px;
  border-left: 3px solid #8b5cf6;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'};
  strong { font-size: 0.68rem; display: block; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.55rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockProfileHeader = styled.div`
  display: flex; align-items: center; gap: 10px;
  padding: 14px; margin: 6px 10px; border-radius: 12px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(139,92,246,0.1)' : 'rgba(139,92,246,0.06)'};
  strong { font-size: 0.75rem; display: block; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.58rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockProfileStat = ({ label, value }) => (
    <MockProfileStatStyled>
        <span>{label}</span>
        <strong>{value}</strong>
    </MockProfileStatStyled>
);

const MockProfileStatStyled = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 14px; margin: 4px 10px; border-radius: 8px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)'};
  span { font-size: 0.65rem; color: ${({ theme }) => theme.colors.textSecondary}; }
  strong { font-size: 0.65rem; color: #8b5cf6; }
`;

const MockTabBar = ({ tabs, active }) => (
    <MockTabBarContainer>
        {tabs.map((t, i) => (
            <MockTabItem key={t} $active={i === active}>{t}</MockTabItem>
        ))}
    </MockTabBarContainer>
);

const MockTabBarContainer = styled.div`
  position: absolute; bottom: 0; left: 0; right: 0;
  display: flex; justify-content: space-around; padding: 6px 4px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#0f0f23' : '#f1f5f9'};
  border-top: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'};
`;

const MockTabItem = styled.span`
  font-size: 0.5rem;
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  color: ${({ $active }) => $active ? '#8b5cf6' : '#94a3b8'};
`;
