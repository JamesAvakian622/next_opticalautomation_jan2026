'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiSmartphone, FiStar, FiBook, FiClock, FiMap, FiUsers, FiSearch, FiMoon, FiSettings, FiGlobe, FiMail, FiFlag } from 'react-icons/fi';

export default function AmericaToday250AppPage() {
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
                    <AppIconLarge
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                    >
                        🇺🇸
                    </AppIconLarge>
                    <AppTitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        AmericaToday250
                    </AppTitle>
                    <AppTagline
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        250 Years of American History — From Washington to Today
                    </AppTagline>
                    <BadgeRow
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <Badge color="#DC2626"><FiSmartphone size={12} /> iOS</Badge>
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
  padding: 100px 20px 60px;
  text-align: center;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #3b0e0e 100%)'
        : 'linear-gradient(135deg, #fca5a5 0%, #f87171 50%, #fca5a5 100%)'};
`;

const BackLink = styled(Link)`
  position: absolute;
  top: 24px;
  left: 24px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.mode === 'dark' ? '#fca5a5' : '#b91c1c'};
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
