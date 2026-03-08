'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiSmartphone, FiStar, FiBook, FiClock, FiMap, FiUsers, FiSearch, FiMoon, FiSettings, FiGlobe, FiMail, FiFlag, FiX } from 'react-icons/fi';

export default function AmericaToday250AppPage() {
  const [fullScreenSrc, setFullScreenSrc] = useState(null);
  const screenshots = [
    { src: '/america_home.png', label: 'Home' },
    { src: '/america_chapters.png', label: 'Chapters' },
    { src: '/america_chapter_detail.png', label: 'Chapter Detail' },
    { src: '/america_map.png', label: 'Map View' },
    { src: '/america_conflicts.png', label: 'Conflicts' }
  ];

  const features = [
    { icon: <FiClock />, title: 'Timeline View', desc: 'American history from George Washington arranged in decades' },
    { icon: <FiUsers />, title: 'President Database', desc: 'Comprehensive profiles of all U.S. presidents' },
    { icon: <FiMap />, title: 'Interactive Maps', desc: 'Visual maps of historical events, territories, and more' },
    { icon: <FiFlag />, title: 'Current Officials', desc: 'Up-to-date listing of current government officials' },
    { icon: <FiBook />, title: 'Government Appendix', desc: 'Detailed appendix covering the structure of U.S. government' },
    { icon: <FiSearch />, title: 'Full Search', desc: 'Search across all chapters, presidents, and historical events' },
  ];

  return (
    <PageContainer>
      <HeroSection>
        <BackLink href="/app-portfolio">
          <FiArrowLeft /> Back to App Portfolio
        </BackLink>
        <HeroContent>
          <HeroTitleRow>
            <HeroLogo>
              <Image src="/opauto.png" alt="Optical Automation" fill style={{ objectFit: 'contain' }} />
            </HeroLogo>
            <AppTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              AmericaToday250
            </AppTitle>
          </HeroTitleRow>
          <AppTagline
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            250 Years of American History — From Washington to Today
          </AppTagline>
        </HeroContent>
      </HeroSection>

      <WebsiteSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          AmericaToday250 website
        </SectionTitle>
        <WebsiteImageClickWrapper onClick={() => setFullScreenSrc('/americatoday250-website.png')}>
          <WebsiteImageWrapper>
            <Image
              src="/americatoday250-website.png"
              alt="AmericaToday250 website landing page"
              width={1920}
              height={1080}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </WebsiteImageWrapper>
          <WebsiteImageHint>Click to view full size</WebsiteImageHint>
        </WebsiteImageClickWrapper>
      </WebsiteSection>

      <IntroSection>
        <IntroHeading>🇺🇸 AmericaToday250</IntroHeading>
        <IntroParagraph>
          AmericaToday250 is a forward‑looking cultural initiative designed to reflect on the United States as it approaches its 250th anniversary. It blends history, innovation, and civic imagination to explore how the nation's past shapes its present and how today's choices will influence the next century. At its core, the project invites people to examine the country's defining ideals—freedom, opportunity, and pluralism—and consider how those values have evolved across generations.
        </IntroParagraph>
        <IntroParagraph>
          The initiative also serves as a platform for storytelling. Through multimedia exhibitions, digital archives, and community‑driven narratives, AmericaToday250 highlights the voices that have often been overlooked in traditional histories. It brings together artists, educators, scientists, and everyday citizens to create a mosaic of perspectives, showing the country not as a single story but as a dynamic, sometimes contradictory, always evolving tapestry.
        </IntroParagraph>
        <IntroParagraph>
          Ultimately, AmericaToday250 is both a celebration and a challenge. It celebrates the resilience and creativity that have shaped the nation, while challenging Americans to confront unresolved tensions and imagine a more inclusive future. By encouraging reflection, dialogue, and participation, the project aims to make the 250th anniversary not just a commemoration of the past but a catalyst for the next chapter of American life.
        </IntroParagraph>
      </IntroSection>

      <ScreensSection>
        <SectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          App Screenshots
        </SectionTitle>
        <ScreensGrid>
          {screenshots.map((ss, i) => (
            <ScreenshotFrame
              key={ss.label}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
            >
              <ScreenshotImageWrapper>
                <Image
                  src={ss.src}
                  alt={ss.label}
                  width={240}
                  height={520}
                  style={{ objectFit: 'cover', borderRadius: '20px', width: '100%', height: 'auto' }}
                />
              </ScreenshotImageWrapper>
              <ScreenLabel>{ss.label}</ScreenLabel>
            </ScreenshotFrame>
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

      <AnimatePresence>
        {fullScreenSrc && (
          <FullScreenOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFullScreenSrc(null)}
          >
            <FullScreenCloseBtn onClick={(e) => { e.stopPropagation(); setFullScreenSrc(null); }}>
              <FiX size={24} />
            </FullScreenCloseBtn>
            <FullScreenImageContainer
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setFullScreenSrc(null)}
            >
              <img src={fullScreenSrc} alt="Full screen view" />
            </FullScreenImageContainer>
            <FullScreenHint>Click anywhere outside to close</FullScreenHint>
          </FullScreenOverlay>
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

// ── Styled Components ──────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.background : '#fee2e2'};
  color: ${({ theme }) => theme.colors.text};
`;

const HeroSection = styled.section`
  position: relative;
  margin-top: 24px;
  padding: 94px 20px 80px;
  text-align: center;
  overflow: hidden;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)'
    : 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 50%, #ddd6fe 100%)'};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.mode === 'dark'
    ? 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.25) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(148, 96, 250, 0.2) 0%, transparent 60%)'
    : 'radial-gradient(ellipse at 30% 20%, rgba(99, 102, 241, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(148, 96, 250, 0.1) 0%, transparent 60%)'};
    pointer-events: none;
  }

  &::after {
    content: '';
    position: absolute;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 70%);
    top: -80px;
    right: -80px;
    animation: floatOrb 8s ease-in-out infinite;
    pointer-events: none;
  }

  @keyframes floatOrb {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(-25px, 25px); }
  }
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 10;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.mode === 'dark' ? '#a5b4fc' : '#4f46e5'};
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  margin: 0 auto;
`;

const HeroTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 8px;
`;

const HeroLogo = styled.div`
  width: 56px;
  height: 56px;
  position: relative;
  flex-shrink: 0;
  @media (max-width: 768px) {
    width: 44px;
    height: 44px;
  }
`;

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

const AppIconLarge = styled(motion.div)`
  font-size: 4rem;
  margin-bottom: 16px;
`;

const AppTitle = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 800;
  margin-bottom: 8px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(135deg, #fff 0%, #fca5a5 100%)'
    : 'linear-gradient(135deg, #7f1d1d 0%, #DC2626 100%)'};
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

const WebsiteSection = styled.section`
  width: 100%;
  margin: 0 auto;
  padding: 60px 0 60px;
`;

const WebsiteImageClickWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
  }
`;

const WebsiteImageWrapper = styled.div`
  width: 100%;
  line-height: 0;
  img {
    width: 100%;
    height: auto;
    display: block;
    vertical-align: middle;
  }
`;

const WebsiteImageHint = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 0 0;
`;

const FullScreenOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000;
  cursor: pointer;
`;

const FullScreenCloseBtn = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.1);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10000;

  &:hover {
    background: rgba(255,255,255,0.25);
    transform: scale(1.1);
  }
`;

const FullScreenImageContainer = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
`;

const FullScreenHint = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  pointer-events: none;
`;

const IntroSection = styled.section`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px 60px;
`;

const IntroHeading = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 1.25rem;
  text-align: center;
`;

const IntroParagraph = styled.p`
  font-size: 1.05rem;
  line-height: 1.75;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 1.25rem;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }
`;

const ScreensSection = styled.section`
  max-width: 1400px;
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

const ScreenshotFrame = styled(motion.div)`
  width: 240px;
  text-align: center;
`;

const ScreenshotImageWrapper = styled.div`
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
  border: 2px solid ${({ theme }) => theme.mode === 'dark' ? '#2d2d5e' : '#e2e8f0'};
  background: ${({ theme }) => theme.mode === 'dark' ? '#1a1a2e' : '#f8fafc'};
  padding: 4px;
`;

const ScreenLabel = styled.div`
  text-align: center;
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 12px;
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
    border-color: #DC2626;
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(220, 38, 38, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #DC2626;
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
    ? 'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.06) 100%)'
    : 'linear-gradient(180deg, transparent 0%, rgba(220, 38, 38, 0.04) 100%)'};
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
  background: linear-gradient(135deg, #DC2626, #b91c1c);
  transition: all 0.3s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.3);
  }
`;
