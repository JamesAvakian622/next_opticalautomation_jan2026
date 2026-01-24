'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiGithub } from 'react-icons/fi';

const FooterWrapper = styled.footer`
    background: ${({ theme }) => theme.colors.surface};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};

    @media print {
        display: none;
    }
`;

const FooterContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const FooterTop = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        text-align: center;
    }
`;

const BrandSection = styled.div`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const LogoLink = styled(Link)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const LogoImage = styled.div`
    width: 150px;
    height: 150px;
    position: relative;
    border-radius: 0;
    overflow: hidden;
`;

const CompanyName = styled.span`
    font-size: 1.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const BrandDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.95rem;
    line-height: 1.6;
    max-width: 600px;
    margin: 0 auto;
`;

const FooterSection = styled.div``;

const SectionTitle = styled.h4`
    font-size: 1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FooterLinks = styled.ul`
    list-style: none;
`;

const FooterLinkItem = styled.li`
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const FooterLink = styled(Link)`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    transition: color 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const FooterBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: ${({ theme }) => theme.spacing.xl};
    border-top: 1px solid ${({ theme }) => theme.colors.border};

    @media (max-width: 600px) {
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.lg};
    }
`;

const Copyright = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.8125rem;
    margin: 0;
`;

const LegalDisclaimer = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.75rem;
    line-height: 1.5;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    max-width: 800px;
    opacity: 0.8;
`;

const BottomCreditWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    @media (max-width: 600px) {
        align-items: center;
        text-align: center;
    }
`;

const SocialSection = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const SocialLink = styled.a`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.gradient};
        color: white;
        transform: translateY(-3px);
    }

    svg {
        font-size: 1.125rem;
    }
`;

const socialLinks = [
  { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61585668745327', icon: FiFacebook },
  { name: 'Twitter', href: 'https://x.com/javakian2025', icon: FiTwitter },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/optical-automation/posts/?feedView=all', icon: FiLinkedin },
  { name: 'GitHub', href: 'https://github.com/opticalautomation', icon: FiGithub }
];

const portfolioLinks = [
  { href: '/portfolio', label: 'All Projects' },
  { href: '/portfolio#react-nextjs', label: 'React / Next.js' },
  { href: '/portfolio#mern', label: 'MERN Stack' },
  { href: '/portfolio#swiftui', label: 'SwiftUI' },
  { href: '/portfolio#react-native', label: 'React Native' },
  { href: '/portfolio#python', label: 'Python' }
];

const technologyLinks = [
  { href: '/tech#react', label: 'Frontend' },
  { href: '/tech#nodejs', label: 'Backend' },
  { href: '/tech#mongodb', label: 'Database' },
  { href: '/tech#fullstack', label: 'Full-Stack' },
  { href: '/tech#ai-agentic', label: 'AI Agentic' },
  { href: '/timeline', label: 'Timeline' }
];

const productsLinks = [
  { href: '/deskview', label: 'DeskView' },
  { href: '/products', label: 'E-Commerce' },
  { href: '/products', label: 'Automotive' },
  { href: '/products', label: 'Business' },
  { href: '/products', label: 'Finance' },
  { href: '/products', label: 'Scheduling' }
];

const resourcesLinks = [
  { href: '/about', label: 'About Us' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/documents', label: 'Documents' },
  { href: '/guides', label: 'Guides' },
  { href: '/forgot-password', label: 'Password Reset' },
  { href: '/support', label: 'Support' },
  { href: '/sitemap', label: 'Site Map' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterTop>
          <BrandSection>
            <LogoLink href="/">
              <LogoImage>
                <Image
                  src="/opauto0.png"
                  alt="Optical Automation"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </LogoImage>
              <CompanyName>Optical Automation</CompanyName>
            </LogoLink>
            <BrandDescription>
              Cutting-edge shared MERN website and mobile app information system solutions using AI-assisted development deployment by modern technologies. Transform your ideas into powerful digital experiences with our talent and experience.
            </BrandDescription>
          </BrandSection>

          <FooterSection>
            <SectionTitle>Portfolio</SectionTitle>
            <FooterLinks>
              {portfolioLinks.map((link) => (
                <FooterLinkItem key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Technology</SectionTitle>
            <FooterLinks>
              {technologyLinks.map((link) => (
                <FooterLinkItem key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Products</SectionTitle>
            <FooterLinks>
              {productsLinks.map((link) => (
                <FooterLinkItem key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Resources</SectionTitle>
            <FooterLinks>
              {resourcesLinks.map((link) => (
                <FooterLinkItem key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <BottomCreditWrapper>
            <LegalDisclaimer>
              All trademarks, product names, and logos are the property of their respective owners.
              Unauthorized reproduction or distribution of any material on this site is prohibited.
            </LegalDisclaimer>
            <Copyright>
              © {currentYear} Optical Automation, LLC. All rights reserved.
            </Copyright>
          </BottomCreditWrapper>

          <SocialSection>
            {socialLinks.map((social) => (
              <SocialLink
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
              >
                <social.icon />
              </SocialLink>
            ))}
          </SocialSection>
        </FooterBottom>
      </FooterContent>
    </FooterWrapper>
  );
}
