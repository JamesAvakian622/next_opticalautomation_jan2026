'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowLeft, FiSmartphone, FiStar, FiUser } from 'react-icons/fi';

export default function JamesAvakianAppPage() {
  const [activeTab, setActiveTab] = useState('websites');
  const [selectedWebsiteImage, setSelectedWebsiteImage] = useState(null);

  const websiteScreens = [
    { title: 'Home', image: '/ja00.png' },
    { title: 'Biography', image: '/ja0.png' },
    { title: 'Entertainment', image: '/ja1.png' },
    { title: 'Technology', image: '/ja2.png' },
    { title: 'Resources', image: '/ja3.png' },
    { title: 'Profile', image: '/ja4.png' },
    { title: 'Contact', image: '/ja5.png' }
  ];

  const mobileAppScreens = [
    { title: 'Home Screen', image: '/ja_appi0.png' },
    { title: 'Explore', image: '/ja_appi1.png' },
    { title: 'Search', image: '/ja_appi2.png' },
    { title: 'Contact', image: '/ja_appi3.png' },
    { title: 'Profile', image: '/ja_appi4.png' }
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
            Personal Bio & Portfolio
          </AppTagline>
          <BadgeRow
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Badge color="#8b5cf6"><FiUser size={12} /> Biography</Badge>
            <Badge color="#10b981"><FiStar size={12} /> Portfolio</Badge>
            <Badge color="#f59e0b">Live</Badge>
          </BadgeRow>
        </HeroContent>
      </HeroSection>

      <TabsSection>
        <TabsContainer>
          <TabButton
            $active={activeTab === 'websites'}
            onClick={() => setActiveTab('websites')}
          >
            Websites
          </TabButton>
          <TabButton
            $active={activeTab === 'ios'}
            onClick={() => setActiveTab('ios')}
          >
            iOS
          </TabButton>
          <TabButton
            $active={activeTab === 'android'}
            onClick={() => setActiveTab('android')}
          >
            Android
          </TabButton>
        </TabsContainer>
      </TabsSection>

      {activeTab === 'websites' && (
        <ScreensSection>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Website
          </SectionTitle>
          <WebsiteGrid>
            {websiteScreens.map((screen, i) => (
              <WebsiteCard
                key={screen.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={() => setSelectedWebsiteImage(screen)}
              >
                <WebsiteImage src={screen.image} alt={`${screen.title} website screenshot`} />
                <WebsiteLabel>{screen.title}</WebsiteLabel>
              </WebsiteCard>
            ))}
          </WebsiteGrid>

          {selectedWebsiteImage && (
            <WebsiteImageOverlay onClick={() => setSelectedWebsiteImage(null)}>
              <WebsiteImageModal onClick={(e) => e.stopPropagation()}>
                <WebsiteModalImage
                  src={selectedWebsiteImage.image}
                  alt={`${selectedWebsiteImage.title} website screenshot enlarged`}
                  onClick={() => setSelectedWebsiteImage(null)}
                />
                <WebsiteModalLabel>{selectedWebsiteImage.title}</WebsiteModalLabel>
              </WebsiteImageModal>
            </WebsiteImageOverlay>
          )}
        </ScreensSection>
      )}

      {(activeTab === 'ios' || activeTab === 'android') && (
        <ScreensSection>
          <SectionTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Mobile App
          </SectionTitle>
          <MobileAppGrid>
            {mobileAppScreens.map((screen, i) => (
              <MobileAppCard
                key={screen.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
                onClick={() => setSelectedWebsiteImage(screen)}
              >
                <MobileAppImage src={screen.image} alt={`${screen.title} mobile app screenshot`} />
                <MobileAppLabel>{screen.title}</MobileAppLabel>
              </MobileAppCard>
            ))}
          </MobileAppGrid>

          {selectedWebsiteImage && (
            <WebsiteImageOverlay onClick={() => setSelectedWebsiteImage(null)}>
              <WebsiteImageModal onClick={(e) => e.stopPropagation()}>
                <WebsiteModalImage
                  src={selectedWebsiteImage.image}
                  alt={`${selectedWebsiteImage.title} screenshot enlarged`}
                  onClick={() => setSelectedWebsiteImage(null)}
                />
                <WebsiteModalLabel>{selectedWebsiteImage.title}</WebsiteModalLabel>
              </WebsiteImageModal>
            </WebsiteImageOverlay>
          )}
        </ScreensSection>
      )}

      <CTASection>
        <CTATitle>
          {activeTab === 'websites' 
            ? 'Built with React.js, Next.js, and MongoDB'
            : 'Built with Shared MongoDB Database by Website and Mobile App, SwiftUI and Android SDK'}
        </CTATitle>
        <CTADesc>A comprehensive personal bio and portfolio platform.</CTADesc>
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

const TabsSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 20px;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const TabButton = styled.button`
  padding: 12px 32px;
  border-radius: 12px;
  border: 1px solid ${({ $active, theme }) => $active ? '#8b5cf6' : theme.colors.border};
  background: ${({ $active, theme }) => $active
    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(139, 92, 246, 0.15))'
    : theme.mode === 'dark' ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.03)'};
  color: ${({ $active, theme }) => $active ? '#8b5cf6' : theme.colors.textSecondary};
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #8b5cf6;
    color: #8b5cf6;
    background: rgba(139, 92, 246, 0.12);
    transform: translateY(-1px);
  }
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

const WebsiteGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WebsiteCard = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.mode === 'dark' ? '#141427' : '#ffffff'};
  box-shadow: 0 12px 30px ${({ theme }) => theme.colors.shadow};
  cursor: zoom-in;
  position: relative;

  &:hover::after {
    content: 'Click to Open / Click to Close Image';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
  }
`;

const WebsiteImage = styled.img`
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
  background: ${({ theme }) => theme.mode === 'dark' ? '#111827' : '#f1f5f9'};
`;

const WebsiteLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 12px 12px;
`;

const WebsiteImageOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.72);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 20px;
`;

const WebsiteImageModal = styled.div`
  width: min(80vw, 1200px);
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WebsiteModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: calc(80vh - 48px);
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  cursor: zoom-out;
`;

const WebsiteModalLabel = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #f8fafc;
`;

const MobileAppGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const MobileAppCard = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.mode === 'dark' ? '#141427' : '#ffffff'};
  box-shadow: 0 12px 30px ${({ theme }) => theme.colors.shadow};
  cursor: zoom-in;
  position: relative;

  &:hover::after {
    content: 'Click to Open / Click to Close Image';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.85);
    color: white;
    padding: 8px 16px;
    border-radius: 8px;
    font-size: 0.75rem;
    font-weight: 600;
    white-space: nowrap;
    pointer-events: none;
    z-index: 10;
  }
`;

const MobileAppImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  display: block;
  background: ${({ theme }) => theme.mode === 'dark' ? '#111827' : '#f1f5f9'};
`;

const MobileAppLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding: 10px 12px 12px;
`;

const MobileRedirectCard = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  text-align: center;
  border-radius: 20px;
  background: ${({ theme }) => theme.mode === 'dark' ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.06)'};
  border: 1px solid ${({ theme }) => theme.mode === 'dark' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(139, 92, 246, 0.15)'};
`;

const MobileRedirectIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 16px;
`;

const MobileRedirectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

const MobileRedirectDesc = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-bottom: 24px;
  line-height: 1.6;
`;

const MobileRedirectButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: none;
  color: white;
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
  }
`;

const CTASection = styled.section`
  text-align: center;
  padding: 50px 20px 80px;
  background: ${({ theme }) => theme.mode === 'dark'
    ? 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.06) 100%)'
    : 'linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.04) 100%)'};
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
  background: linear-gradient(135deg, #8b5cf6, #6366f1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.3);
  }
`;
