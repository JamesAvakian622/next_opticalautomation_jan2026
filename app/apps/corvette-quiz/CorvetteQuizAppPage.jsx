'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiSmartphone, FiAward, FiStar, FiCheck, FiLayers, FiBarChart2, FiClock, FiTarget, FiZap, FiBookOpen } from 'react-icons/fi';

// ── Component ──────────────────────────────────
export default function CorvetteQuizAppPage() {
    const screens = [
        { src: '/corvette_generations.png', label: 'Generations', caption: 'Browse all 8 Corvette generations from C1 to C8' },
        { src: '/corvette_eray.png', label: 'E-Ray Model', caption: 'Detailed specs for every model including the hybrid E-Ray' },
        { src: '/corvette_settings.png', label: 'Settings', caption: 'Customize appearance and view app statistics' },
        { src: '/corvette_quiz.png', label: 'Quiz', caption: 'Test your knowledge with challenging trivia' },
    ];

    const features = [
        { icon: <FiAward />, title: '40+ Quiz Questions', desc: 'History, specs, racing heritage — all difficulty levels' },
        { icon: <FiLayers />, title: '8 Generations', desc: 'From the 1953 C1 Solid Axle to the mid-engine C8' },
        { icon: <FiTarget />, title: '17 Models', desc: 'Stingray, Grand Sport, Z06, E-Ray, ZR1 & ZR1X' },
        { icon: <FiStar />, title: 'Score Tracking', desc: 'Track your performance and beat your personal best' },
        { icon: <FiBarChart2 />, title: 'Difficulty Tags', desc: 'Easy, Medium, and Hard questions with category labels' },
        { icon: <FiBookOpen />, title: 'Learn Mode', desc: 'Detailed model specs, highlights, and historical facts' },
    ];

    return (
        <PageContainer>
            {/* Back Navigation */}
            <BackNav>
                <Link href="/app-portfolio">
                    <FiArrowLeft /> Back to App Portfolio
                </Link>
            </BackNav>

            {/* Hero */}
            <HeroSection>
                <HeroGlow />
                <HeroContent>
                    <AppIconLarge
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        🏁
                    </AppIconLarge>

                    <AppTitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        CorvetteQuiz
                    </AppTitle>

                    <AppTagline
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        America&apos;s Sports Car — The Ultimate Corvette Trivia
                    </AppTagline>

                    <AppDesc
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        Celebrating 70+ years of the Chevrolet Corvette. Explore every generation from the
                        1953 C1 to today&apos;s mid-engine C8, test your knowledge with challenging quizzes,
                        and discover specs for every iconic model including the 1,250 hp ZR1X hypercar.
                    </AppDesc>

                    <HeroBadges
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Badge><FiSmartphone size={14} /> iOS Native</Badge>
                        <Badge $accent><FiZap size={14} /> SwiftUI</Badge>
                        <Badge><FiClock size={14} /> Dark Mode</Badge>
                    </HeroBadges>
                </HeroContent>
            </HeroSection>

            {/* Screenshots Section */}
            <ScreensSection>
                <SectionTitle>App Screenshots</SectionTitle>
                <ScreensGrid>
                    {screens.map((screen, i) => (
                        <ScreenCard
                            key={screen.label}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.12 }}
                        >
                            <PhoneFrame>
                                <ScreenImage src={screen.src} alt={`CorvetteQuiz — ${screen.label}`} loading="lazy" />
                            </PhoneFrame>
                            <ScreenLabel>{screen.label}</ScreenLabel>
                            <ScreenCaption>{screen.caption}</ScreenCaption>
                        </ScreenCard>
                    ))}
                </ScreensGrid>
            </ScreensSection>

            {/* Features Section */}
            <FeaturesSection>
                <SectionTitle>Key Features</SectionTitle>
                <FeaturesGrid>
                    {features.map((f, i) => (
                        <FeatureCard
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
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

            {/* CTA */}
            <CTASection>
                <CTATitle>Ready to Test Your Corvette Knowledge?</CTATitle>
                <CTADesc>Download CorvetteQuiz and prove you&apos;re the ultimate Corvette enthusiast.</CTADesc>
                <CTAButton href="/app-portfolio">
                    Browse All Apps <FiArrowRight />
                </CTAButton>
            </CTASection>
        </PageContainer>
    );
}

// ── Styled Components ──────────────────────────

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.background : '#fef2f2'};
  color: ${({ theme }) => theme.colors.text};
`;

const BackNav = styled.nav`
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px 20px 0;

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 600;
    transition: opacity 0.2s;
    &:hover { opacity: 0.7; }
  }
`;

const HeroSection = styled.section`
  position: relative;
  text-align: center;
  padding: 60px 20px 50px;
  overflow: hidden;
`;

const HeroGlow = styled.div`
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background: radial-gradient(ellipse, rgba(239,68,68,0.18) 0%, transparent 70%);
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 650px;
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
        : 'linear-gradient(135deg, #991b1b 0%, #ef4444 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AppTagline = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark' ? '#fca5a5' : '#dc2626'};
  margin-bottom: 16px;
`;

const AppDesc = styled(motion.p)`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  max-width: 560px;
  margin: 0 auto 24px;
`;

const HeroBadges = styled(motion.div)`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${({ $accent, theme }) => $accent
        ? 'rgba(239,68,68,0.15)'
        : theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'};
  color: ${({ $accent, theme }) => $accent
        ? '#ef4444'
        : theme.colors.textSecondary};
  border: 1px solid ${({ $accent, theme }) => $accent
        ? 'rgba(239,68,68,0.25)'
        : theme.colors.border};
`;

// ── Screenshots ──────────────────────────

const ScreensSection = styled.section`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 60px;
`;

const SectionTitle = styled.h2`
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

const ScreenCard = styled(motion.div)`
  text-align: center;
  max-width: 240px;
`;

const PhoneFrame = styled.div`
  width: 220px;
  border-radius: 28px;
  overflow: hidden;
  border: 2px solid ${({ theme }) => theme.mode === 'dark' ? '#2d2d4e' : '#e2e8f0'};
  background: ${({ theme }) => theme.mode === 'dark' ? '#1a1a2e' : '#f8fafc'};
  box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
  }
`;

const ScreenImage = styled.img`
  width: 100%;
  display: block;
`;

const ScreenLabel = styled.h3`
  font-size: 0.95rem;
  font-weight: 700;
  margin: 12px 0 4px;
  color: ${({ theme }) => theme.colors.text};
`;

const ScreenCaption = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.45;
`;

// ── Features ──────────────────────────

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
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'white'};
  border: 1px solid ${({ theme }) => theme.colors.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(239,68,68,0.3);
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(239,68,68,0.03)'};
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(239,68,68,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #ef4444;
  font-size: 1.1rem;
`;

const FeatureTitle = styled.h4`
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 4px;
  color: ${({ theme }) => theme.colors.text};
`;

const FeatureDesc = styled.p`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.5;
  margin: 0;
`;

// ── CTA ──────────────────────────

const CTASection = styled.section`
  text-align: center;
  padding: 60px 20px 80px;
  background: ${({ theme }) => theme.mode === 'dark'
        ? 'linear-gradient(180deg, transparent 0%, rgba(239,68,68,0.06) 100%)'
        : 'linear-gradient(180deg, transparent 0%, rgba(239,68,68,0.04) 100%)'};
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
  background: linear-gradient(135deg, #ef4444, #dc2626);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(239,68,68,0.35);
  }

  svg {
    transition: transform 0.3s ease;
  }
  &:hover svg {
    transform: translateX(4px);
  }
`;
