'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiArrowRight, FiSmartphone, FiBook, FiStar, FiCheck, FiBarChart2, FiTarget, FiZap, FiEdit3, FiType, FiMapPin, FiAward, FiTrendingUp } from 'react-icons/fi';

// ── Component ──────────────────────────────────
export default function LearnSkills365AppPage() {
    const screens = [
        { src: '/ls365_dashboard.png', label: 'Dashboard', caption: 'Track progress across all subjects with stats and quick access' },
        { src: '/ls365_math.png', label: 'Mathematics', caption: 'Practice Addition, Subtraction, Multiplication & Division' },
        { src: '/ls365_reading.png', label: 'Reading Practice', caption: 'Read passages aloud with voice recognition feedback' },
        { src: '/ls365_states.png', label: 'States & Capitals', caption: 'Learn all 50 US states and capitals with quizzes' },
    ];

    const features = [
        { icon: <FiBarChart2 />, title: 'Math Practice', desc: 'Addition, Subtraction, Multiplication & Division with Easy, Medium, and Hard difficulty levels' },
        { icon: <FiBook />, title: 'Reading Practice', desc: 'Read passages aloud with voice recognition to improve fluency and comprehension' },
        { icon: <FiEdit3 />, title: 'Writing Skills', desc: 'Improve writing abilities with guided exercises and practice prompts' },
        { icon: <FiType />, title: 'Typing Practice', desc: 'Build typing speed and accuracy with WPM tracking and progress stats' },
        { icon: <FiMapPin />, title: 'States & Capitals', desc: 'Learn all 50 US states and their capitals with searchable lists and practice quizzes' },
        { icon: <FiTrendingUp />, title: 'Progress Tracking', desc: 'Track scores, accuracy, quizzes completed, and improvement across all subjects' },
        { icon: <FiAward />, title: 'Practice Quizzes', desc: 'Interactive quizzes across all subjects with instant feedback and score tracking' },
        { icon: <FiTarget />, title: 'Memory Games', desc: 'Brain training exercises to sharpen memory and cognitive skills' },
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
                        📚
                    </AppIconLarge>

                    <AppTitle
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        LearnSkills365
                    </AppTitle>

                    <AppTagline
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        Learn Something New Every Day
                    </AppTagline>

                    <AppDesc
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        A comprehensive learning platform covering Math, Reading, Writing, Typing,
                        Memory, Geography, and more. Track your progress with detailed stats,
                        practice with interactive quizzes, and build skills at your own pace.
                    </AppDesc>

                    <HeroBadges
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        <Badge><FiSmartphone size={14} /> iOS Native</Badge>
                        <Badge $accent><FiZap size={14} /> SwiftUI</Badge>
                        <Badge><FiBook size={14} /> 7 Subjects</Badge>
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
                                <ScreenImage src={screen.src} alt={`LearnSkills365 — ${screen.label}`} loading="lazy" />
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
                <CTATitle>Ready to Start Learning?</CTATitle>
                <CTADesc>LearnSkills365 makes education fun with interactive quizzes, progress tracking, and 7 subjects to master.</CTADesc>
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
  background: ${({ theme }) => theme.mode === 'dark' ? theme.colors.background : '#fffbeb'};
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
  background: radial-gradient(ellipse, rgba(245,158,11,0.18) 0%, transparent 70%);
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
        ? 'linear-gradient(135deg, #fff 0%, #fcd34d 100%)'
        : 'linear-gradient(135deg, #92400e 0%, #f59e0b 100%)'};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const AppTagline = styled(motion.p)`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.mode === 'dark' ? '#fcd34d' : '#d97706'};
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
        ? 'rgba(245,158,11,0.15)'
        : theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'};
  color: ${({ $accent, theme }) => $accent
        ? '#f59e0b'
        : theme.colors.textSecondary};
  border: 1px solid ${({ $accent, theme }) => $accent
        ? 'rgba(245,158,11,0.25)'
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
    border-color: rgba(245,158,11,0.3);
    background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(245,158,11,0.03)'};
    transform: translateY(-2px);
  }
`;

const FeatureIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: rgba(245,158,11,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #f59e0b;
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
        ? 'linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.06) 100%)'
        : 'linear-gradient(180deg, transparent 0%, rgba(245,158,11,0.04) 100%)'};
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
  background: linear-gradient(135deg, #f59e0b, #d97706);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(245,158,11,0.35);
  }

  svg {
    transition: transform 0.3s ease;
  }
  &:hover svg {
    transform: translateX(4px);
  }
`;
