'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiSmartphone, FiStar, FiBook, FiSearch, FiBookmark, FiSettings, FiVolume2, FiMoon, FiHeart } from 'react-icons/fi';

export default function SnowyChristmasAppPage() {
  const screens = [
    {
      title: 'Home',
      content: (
        <>
          <MockNav>❄️ A Snowy Christmas</MockNav>
          <MockHeroCard>
            <span style={{ fontSize: '2.2rem' }}>❄️</span>
            <h3>A Snowy Christmas</h3>
            <small>A magical mystical collection</small>
          </MockHeroCard>
          <MockButtonRow>
            <MockButton primary>▶ Start Reading</MockButton>
            <MockButton>Browse All →</MockButton>
          </MockButtonRow>
          <MockCollectionTitle>Explore Our Collection</MockCollectionTitle>
          <MockCollGrid>
            <MockCollCard emoji="📖" title="Stories" desc="Magical winter tales..." />
            <MockCollCard emoji="✍️" title="Poems" desc="Beautiful verses..." />
          </MockCollGrid>
          <MockTabBar active={0} tabs={['Home', 'Stories', 'Search', 'Favorites', 'Settings']} />
        </>
      )
    },
    {
      title: 'Stories',
      content: (
        <>
          <MockNav>📖 Stories</MockNav>
          <MockSectionHeader>
            <h3>📖 Stories</h3>
            <small>Immerse yourself in magical winter tales</small>
          </MockSectionHeader>
          <MockStoryCard>
            <MockStoryIcon>❄️</MockStoryIcon>
            <div>
              <strong>The Winter Heart</strong>
              <small>A magical winter tale about Elara, Caelan, the Winter Heart, and the Frost Wraith.</small>
              <MockTagRow>
                <MockTag color="#8b5cf6">fantasy</MockTag>
                <MockTag color="#6366f1">winter</MockTag>
                <MockTag color="#ec4899">magic</MockTag>
              </MockTagRow>
              <MockMeta>👤 Anonymous · ⏱ 25 min · 📖 4 ch</MockMeta>
            </div>
          </MockStoryCard>
          <MockStoryCard>
            <MockStoryIcon>🏮</MockStoryIcon>
            <div>
              <strong>The Christmas Lantern</strong>
              <small>A magical lantern guides lost travelers through a blizzard...</small>
              <MockTagRow>
                <MockTag color="#ec4899">magic</MockTag>
                <MockTag color="#f59e0b">christmas</MockTag>
              </MockTagRow>
            </div>
          </MockStoryCard>
          <MockTabBar active={1} tabs={['Home', 'Stories', 'Search', 'Favorites', 'Settings']} />
        </>
      )
    },
    {
      title: 'Search',
      content: (
        <>
          <MockNav>🔍 Search</MockNav>
          <MockSearchHeader>
            <span style={{ fontSize: '1.5rem' }}>🔎</span>
            <h3>Search Stories</h3>
            <small>Find your next winter tale</small>
          </MockSearchHeader>
          <MockSearchInput>🔍 Search stories, poems, tales...</MockSearchInput>
          <MockFilterRow>
            <MockFilterChip active>🏷️ All</MockFilterChip>
            <MockFilterChip>📖 Stories</MockFilterChip>
            <MockFilterChip>📚 Poems</MockFilterChip>
            <MockFilterChip>🌙 Bed...</MockFilterChip>
          </MockFilterRow>
          <MockResultCount>5 results</MockResultCount>
          <MockSearchResultCard icon="❄️" title="The Winter Heart" tags={['fantasy', 'winter']} time="25 min" />
          <MockSearchResultCard icon="🏮" title="The Christmas Lantern" tags={['magic', 'christmas']} time="12 min" />
          <MockTabBar active={2} tabs={['Home', 'Stories', 'Search', 'Favorites', 'Settings']} />
        </>
      )
    },
    {
      title: 'Favorites',
      content: (
        <>
          <MockNav>🔖 Favorites</MockNav>
          <MockFavHeader>
            <h3>🔖 Favorites</h3>
            <small>Your saved stories and poems</small>
          </MockFavHeader>
          <MockEmptyState>
            <span style={{ fontSize: '2rem', opacity: 0.3 }}>🔖</span>
            <strong>No Favorites Yet</strong>
            <small>Save your favorite stories and poems to find them here later.</small>
            <MockButton primary style={{ marginTop: 8 }}>📖 Browse Stories</MockButton>
          </MockEmptyState>
          <MockTabBar active={3} tabs={['Home', 'Stories', 'Search', 'Favorites', 'Settings']} />
        </>
      )
    },
    {
      title: 'Settings',
      content: (
        <>
          <MockNav>⚙️ Settings</MockNav>
          <MockSettingsHeader>
            <span style={{ fontSize: '1.5rem' }}>⚙️</span>
            <h3>Settings</h3>
            <small>Customize your experience</small>
          </MockSettingsHeader>
          <MockSettingsSection>
            <MockSettingsLabel>🎨 Appearance</MockSettingsLabel>
            <MockSettingItem>
              <span>🌙 Dark Mode</span>
              <MockToggle on={true} />
            </MockSettingItem>
          </MockSettingsSection>
          <MockSettingsSection>
            <MockSettingsLabel>🔊 Audio & Narration</MockSettingsLabel>
            <MockSettingItem>
              <span>Voice Type</span>
            </MockSettingItem>
            <MockVoiceRow>
              <MockVoiceChip>Young Girl</MockVoiceChip>
              <MockVoiceChip>Older Man</MockVoiceChip>
              <MockVoiceChip active>System Default</MockVoiceChip>
            </MockVoiceRow>
            <MockSettingItem>
              <span>Reading Speed</span>
            </MockSettingItem>
            <MockVoiceRow>
              <MockVoiceChip>🐢 Slow</MockVoiceChip>
              <MockVoiceChip active>🚶 Normal</MockVoiceChip>
              <MockVoiceChip>🏃 Fast</MockVoiceChip>
            </MockVoiceRow>
          </MockSettingsSection>
          <MockTabBar active={4} tabs={['Home', 'Stories', 'Search', 'Favorites', 'Settings']} />
        </>
      )
    }
  ];

  const features = [
    { icon: <FiVolume2 />, title: 'Audio Narration', desc: 'Full audio narration with multiple voice types' },
    { icon: <FiBook />, title: 'Stories & Poems', desc: 'Magical winter tales, poems, bedtime tales and more' },
    { icon: <FiSearch />, title: 'Search', desc: 'Find your next winter tale with full-text search' },
    { icon: <FiBookmark />, title: 'Favorites', desc: 'Save your favorite stories and poems for later' },
    { icon: <FiMoon />, title: 'Dark Mode', desc: 'Beautiful dark navy theme with light blue accents' },
    { icon: <FiSettings />, title: 'Reading Controls', desc: 'Voice selection, reading speed, and appearance settings' },
  ];

  return (
    <PageContainer>
      <HeroSection>
        <BackLink href="/app-portfolio">
          <FiArrowLeft /> Back to App Portfolio
        </BackLink>
        <SnowflakesBg>
          {[...Array(12)].map((_, i) => (
            <Snowflake key={i} style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
              fontSize: `${0.6 + Math.random() * 0.8}rem`,
              opacity: 0.15 + Math.random() * 0.2
            }}>❄</Snowflake>
          ))}
        </SnowflakesBg>
        <HeroContent>
          <MobileAppsBadge
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FiSmartphone /> Mobile Applications
          </MobileAppsBadge>
          <AppIconLarge initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}>
            ❄️
          </AppIconLarge>
          <AppTitle initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            A Snowy Christmas
          </AppTitle>
          <AppTagline initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Winter Stories & Poems
          </AppTagline>
          <BadgeRow initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <Badge color="#7dd3fc"><FiSmartphone size={12} /> iOS</Badge>
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
        <CTATitle>A Magical Reading Experience</CTATitle>
        <CTADesc>Native iOS app built with SwiftUI. Audio narration, beautiful themes, and a curated winter collection.</CTADesc>
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
  overflow: hidden;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(135deg, #0a1628 0%, #0f1d3a 50%, #162447 100%)'
    : 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #e0e7ff 100%)'};
`;

const SnowflakesBg = styled.div`position: absolute; inset: 0; pointer-events: none; overflow: hidden;`;

const Snowflake = styled.span`
  position: absolute;
  top: -20px;
  animation: snowfall linear infinite;
  @keyframes snowfall {
    0% { transform: translateY(-20px) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
`;

const BackLink = styled(Link)`
  position: absolute; top: 24px; left: 24px; z-index: 2;
  display: inline-flex; align-items: center; gap: 6px;
  color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0369a1'};
  text-decoration: none; font-size: 0.9rem; font-weight: 600;
  transition: opacity 0.2s; &:hover { opacity: 0.7; }
`;

const HeroContent = styled.div`max-width: 600px; margin: 0 auto; position: relative; z-index: 2;`;

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
  font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; margin-bottom: 8px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(135deg, #fff 0%, #7dd3fc 100%)'
    : 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 100%)'};
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
`;

const AppTagline = styled(motion.p)`
  font-size: 1.1rem; color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic; margin-bottom: 20px;
`;

const BadgeRow = styled(motion.div)`display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;`;

const Badge = styled.span`
  display: inline-flex; align-items: center; gap: 5px;
  padding: 6px 14px; border-radius: 20px; font-size: 0.78rem; font-weight: 600;
  background: ${({ color }) => color}20; color: ${({ color }) => color};
  border: 1px solid ${({ color }) => color}30;
`;

const ScreensSection = styled.section`max-width: 1400px; margin: 0 auto; padding: 60px 20px;`;

const SectionTitle = styled(motion.h2)`
  font-size: 1.8rem; font-weight: 700; text-align: center; margin-bottom: 40px;
  color: ${({ theme }) => theme.colors.text};
`;

const ScreensGrid = styled.div`display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;`;

const PhoneFrame = styled(motion.div)`
  width: 210px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#0f1d3a' : '#f8fafc'};
  border: 2px solid ${({ theme }) => theme.mode === 'dark' ? '#1e3a5f' : '#e2e8f0'};
  border-radius: 28px; padding: 8px;
  box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
`;

const PhoneNotch = styled.div`
  width: 80px; height: 6px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#1e3a5f' : '#d1d5db'};
  border-radius: 3px; margin: 6px auto 8px;
`;

const PhoneScreen = styled.div`
  background: ${({ theme }) => theme.mode === 'dark' ? '#0a1628' : '#f1f5f9'};
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
  &:hover { transform: translateY(-2px); border-color: #7dd3fc; }
`;

const FeatureIcon = styled.div`
  width: 40px; height: 40px; border-radius: 10px;
  background: rgba(125, 211, 252, 0.12);
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: #7dd3fc; font-size: 1.1rem;
`;

const FeatureTitle = styled.h4`font-size: 0.95rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; margin-bottom: 4px;`;
const FeatureDesc = styled.p`font-size: 0.82rem; color: ${({ theme }) => theme.colors.textSecondary}; line-height: 1.4; margin: 0;`;

const CTASection = styled.section`
  text-align: center; padding: 50px 20px 80px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(180deg, transparent 0%, rgba(125,211,252,0.06) 100%)'
    : 'linear-gradient(180deg, transparent 0%, rgba(125,211,252,0.04) 100%)'};
`;

const CTATitle = styled.h2`font-size: 1.8rem; font-weight: 700; color: ${({ theme }) => theme.colors.text}; margin-bottom: 10px;`;
const CTADesc = styled.p`color: ${({ theme }) => theme.colors.textSecondary}; margin-bottom: 24px; max-width: 500px; display: inline-block;`;

const CTAButton = styled(Link)`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 12px 28px; border-radius: 12px; font-size: 0.95rem; font-weight: 700;
  text-decoration: none; color: white;
  background: linear-gradient(135deg, #0ea5e9, #7dd3fc);
  transition: all 0.3s ease;
  &:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(14,165,233,0.3); }
`;

// ── Mock Phone UI Components ──────────────────
const MockNav = styled.div`
  padding: 10px 14px 6px; text-align: center; font-size: 0.7rem; font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0369a1'};
`;

const MockHeroCard = styled.div`
  text-align: center; padding: 14px 12px; margin: 0 10px 8px; border-radius: 12px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.08)' : 'rgba(14,165,233,0.06)'};
  h3 { font-size: 0.85rem; font-weight: 700; color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0369a1'}; margin: 6px 0 2px; }
  small { font-size: 0.58rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockButtonRow = styled.div`display: flex; gap: 6px; padding: 0 10px; margin-bottom: 12px;`;

const MockButton = styled.div`
  flex: 1; text-align: center; padding: 6px 8px; border-radius: 8px;
  font-size: 0.6rem; font-weight: 600; cursor: default;
  background: ${({ primary }) => primary ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'transparent'};
  color: ${({ primary, theme }) => primary ? '#fff' : theme.mode === 'dark' ? '#e2e8f0' : '#1e293b'};
  border: ${({ primary }) => primary ? 'none' : '1px solid rgba(125,211,252,0.3)'};
`;

const MockCollectionTitle = styled.div`
  font-size: 0.72rem; font-weight: 700; padding: 4px 14px;
  color: ${({ theme }) => theme.colors.text};
`;

const MockCollGrid = styled.div`display: flex; gap: 6px; padding: 4px 10px;`;

const MockCollCard = ({ emoji, title, desc }) => (
  <MockCollCardStyled>
    <span>{emoji}</span>
    <strong>{title}</strong>
    <small>{desc}</small>
  </MockCollCardStyled>
);

const MockCollCardStyled = styled.div`
  flex: 1; padding: 10px; border-radius: 10px; text-align: center;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.06)' : 'rgba(14,165,233,0.04)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.12)' : 'rgba(14,165,233,0.1)'};
  span { font-size: 1rem; display: block; margin-bottom: 4px; }
  strong { font-size: 0.62rem; display: block; color: ${({ theme }) => theme.colors.text}; }
  small { font-size: 0.5rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockSectionHeader = styled.div`
  text-align: center; padding: 10px 14px 6px;
  h3 { font-size: 0.8rem; font-weight: 700; color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0369a1'}; margin: 0 0 2px; }
  small { font-size: 0.58rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockStoryCard = styled.div`
  display: flex; gap: 8px; padding: 10px; margin: 6px 8px; border-radius: 12px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.06)' : 'rgba(14,165,233,0.04)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.1)' : 'rgba(14,165,233,0.08)'};
  strong { font-size: 0.7rem; display: block; color: ${({ theme }) => theme.colors.text}; margin-bottom: 2px; }
  small { font-size: 0.52rem; color: ${({ theme }) => theme.colors.textSecondary}; display: block; }
`;

const MockStoryIcon = styled.div`
  width: 36px; height: 36px; border-radius: 8px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.15)' : 'rgba(14,165,233,0.1)'};
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem;
`;

const MockTagRow = styled.div`display: flex; gap: 3px; margin-top: 3px;`;

const MockTag = styled.span`
  font-size: 0.45rem; padding: 1px 5px; border-radius: 4px; font-weight: 600;
  background: ${({ color }) => color}18; color: ${({ color }) => color};
`;

const MockMeta = styled.div`
  font-size: 0.48rem; color: ${({ theme }) => theme.colors.textSecondary}; margin-top: 3px;
`;

const MockSearchHeader = styled.div`
  text-align: center; padding: 8px 14px 4px;
  h3 { font-size: 0.8rem; font-weight: 700; color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0369a1'}; margin: 4px 0 2px; }
  small { font-size: 0.55rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockSearchInput = styled.div`
  margin: 6px 10px; padding: 7px 10px; border-radius: 8px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.08)' : 'rgba(14,165,233,0.06)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.15)' : 'rgba(14,165,233,0.12)'};
  font-size: 0.55rem; color: ${({ theme }) => theme.colors.textSecondary};
`;

const MockFilterRow = styled.div`display: flex; gap: 4px; padding: 4px 10px; overflow: hidden;`;

const MockFilterChip = styled.span`
  font-size: 0.5rem; padding: 3px 7px; border-radius: 6px; font-weight: 600; white-space: nowrap;
  background: ${({ active }) => active ? 'rgba(125,211,252,0.2)' : 'transparent'};
  color: ${({ active }) => active ? '#7dd3fc' : '#94a3b8'};
`;

const MockResultCount = styled.div`
  font-size: 0.5rem; padding: 2px 14px; color: #7dd3fc; font-weight: 600;
`;

const MockSearchResultCard = ({ icon, title, tags, time }) => (
  <MockSearchResultCardStyled>
    <MockStoryIcon>{icon}</MockStoryIcon>
    <div>
      <strong>{title}</strong>
      <MockTagRow>
        {tags.map(t => <MockTag key={t} color="#7dd3fc">{t}</MockTag>)}
      </MockTagRow>
      <div style={{ fontSize: '0.45rem', color: '#94a3b8', marginTop: 2 }}>⏱ {time}</div>
    </div>
  </MockSearchResultCardStyled>
);

const MockSearchResultCardStyled = styled.div`
  display: flex; gap: 8px; padding: 8px 10px; margin: 4px 8px; border-radius: 10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.05)' : 'rgba(14,165,233,0.03)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.08)' : 'rgba(14,165,233,0.06)'};
  strong { font-size: 0.65rem; display: block; color: ${({ theme }) => theme.colors.text}; margin-bottom: 2px; }
`;

const MockFavHeader = styled.div`
  text-align: center; padding: 10px 14px 6px;
  h3 { font-size: 0.8rem; font-weight: 700; color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0369a1'}; margin: 0 0 2px; }
  small { font-size: 0.58rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockEmptyState = styled.div`
  text-align: center; padding: 30px 20px; margin: 10px;
  border-radius: 12px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.04)' : 'rgba(14,165,233,0.03)'};
  strong { font-size: 0.75rem; display: block; color: ${({ theme }) => theme.colors.text}; margin: 8px 0 4px; }
  small { font-size: 0.55rem; color: ${({ theme }) => theme.colors.textSecondary}; display: block; }
`;

const MockSettingsHeader = styled.div`
  text-align: center; padding: 8px 14px 4px;
  h3 { font-size: 0.8rem; font-weight: 700; color: ${({ theme }) => theme.mode === 'dark' ? '#7dd3fc' : '#0369a1'}; margin: 4px 0 2px; }
  small { font-size: 0.55rem; color: ${({ theme }) => theme.colors.textSecondary}; }
`;

const MockSettingsSection = styled.div`
  margin: 6px 8px; padding: 8px; border-radius: 10px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.04)' : 'rgba(14,165,233,0.03)'};
`;

const MockSettingsLabel = styled.div`
  font-size: 0.62rem; font-weight: 700; color: ${({ theme }) => theme.colors.text};
  padding: 2px 6px 4px;
`;

const MockSettingItem = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 6px; font-size: 0.6rem; color: ${({ theme }) => theme.colors.text};
`;

const MockToggle = ({ on }) => (
  <div style={{
    width: 24, height: 14, borderRadius: 7,
    background: on ? '#6366f1' : '#555',
    position: 'relative', flexShrink: 0
  }}>
    <div style={{
      width: 10, height: 10, borderRadius: 5,
      background: '#fff', position: 'absolute', top: 2,
      left: on ? 12 : 2, transition: 'left 0.2s'
    }} />
  </div>
);

const MockVoiceRow = styled.div`display: flex; gap: 4px; padding: 2px 6px 6px;`;

const MockVoiceChip = styled.span`
  font-size: 0.48rem; padding: 3px 6px; border-radius: 6px; font-weight: 600;
  background: ${({ active }) => active ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.05)'};
  color: ${({ active }) => active ? '#6366f1' : '#94a3b8'};
  border: 1px solid ${({ active }) => active ? '#6366f1' : 'transparent'};
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
  display: flex; justify-content: space-around; padding: 6px 2px;
  background: ${({ theme }) => theme.mode === 'dark' ? '#0a1628' : '#f1f5f9'};
  border-top: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(125,211,252,0.1)' : 'rgba(14,165,233,0.08)'};
`;

const MockTabItem = styled.span`
  font-size: 0.45rem;
  font-weight: ${({ $active }) => $active ? '700' : '500'};
  color: ${({ $active }) => $active ? '#7dd3fc' : '#94a3b8'};
`;
