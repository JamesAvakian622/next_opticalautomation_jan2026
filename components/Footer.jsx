'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin, FiGithub, FiArrowUp } from 'react-icons/fi';

const FooterWrapper = styled.footer`
    background: ${({ theme }) => theme.colors.surface};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.lg};

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
    grid-template-columns: repeat(5, 1fr);
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
    }

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
    gap: 0;
    margin-bottom: -60px;
    margin-top: -30px;
`;

const LogoImage = styled.div`
    width: 300px;
    height: 300px;
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

const ExternalFooterLink = styled.a`
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
    font-size: 0.9rem;
    line-height: 1.6;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    max-width: 600px;
    text-align: left;
    opacity: 0.9;
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

const FooterBrandingSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    padding-bottom: ${({ theme }) => theme.spacing.lg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const SmallLogoWrapper = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
    flex-shrink: 0;
`;

const FooterBrandName = styled.span`
    font-size: 1.25rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const ScrollToTopButton = styled.button`
    position: fixed;
    bottom: ${({ theme }) => theme.spacing.xl};
    right: ${({ theme }) => theme.spacing.xl};
    width: 48px;
    height: 48px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    transition: all 0.3s ease;
    z-index: 999;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 20px ${({ theme }) => theme.colors.shadow};
    }

    svg {
        font-size: 1.5rem;
    }

    @media (max-width: 768px) {
        bottom: ${({ theme }) => theme.spacing.lg};
        right: ${({ theme }) => theme.spacing.lg};
        width: 44px;
        height: 44px;
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
  { name: 'Facebook', href: 'https://www.Facebook.com/james.avakian.9', icon: FiFacebook },
  { name: 'X', href: 'https://twitter.com/JamesAvaki4763', icon: FiTwitter },
  { name: 'LinkedIn', href: 'https://www.LinkedIn.com/in/james-l-avakian-13500713/', icon: FiLinkedin },
  { name: 'GitHub', href: 'https://www.github.com/jamesvakian62', icon: FiGithub },
  { name: 'Instagram', href: 'https://www.Instagram.com/jamesavakian/', icon: FiInstagram }
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
  { href: '/deskview', label: 'MyDeskView' },
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
  { href: '/videos', label: 'Videos' },
  { href: '/guides', label: 'Guides' },
  { href: '/forgot-password', label: 'Password Reset' },
  { href: '/support', label: 'Support' },
  { href: '/sitemap', label: 'Site Map' }
];

const policyLinks = [
  { href: 'https://jovial-sunflower-4cf4bd.netlify.app/terms-of-use', label: 'Terms of Use' },
  { href: 'https://jovial-sunflower-4cf4bd.netlify.app/privacy-policy', label: 'Content Policy' },
  { href: 'https://jovial-sunflower-4cf4bd.netlify.app/content-policy', label: 'Privacy Policy' },
  { href: 'https://jovial-sunflower-4cf4bd.netlify.app/cookie-policy', label: 'Cookie Policy' }
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
            </LogoLink>
            <BrandDescription>
              We are a software development company that produces app applications Websites, Mobile Apps, and Database system networks. These products are developed by AI process Agents for high performance, fast display, and efficient access according to American Industry Standards.
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

          <FooterSection>
            <SectionTitle>Policies</SectionTitle>
            <FooterLinks>
              {policyLinks.map((link) => (
                <FooterLinkItem key={link.label}>
                  <ExternalFooterLink href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</ExternalFooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <BottomCreditWrapper>
            <FooterBrandingSection>
              <SmallLogoWrapper>
                <Image
                  src="/opauto.png"
                  alt="OA Logo"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </SmallLogoWrapper>
              <FooterBrandName>Optical Automation</FooterBrandName>
            </FooterBrandingSection>
            <LegalDisclaimer>
              All trademarks, product names, and logos are the property of their respective owners. Optical Automation, LLC owns all developed software as intellectual property protected by U.S. Copyright and Trademarks. Unauthorized reproduction or distribution of any material on this site is prohibited.
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

      <ScrollToTopButton onClick={scrollToTop} aria-label="Scroll to top">
        <FiArrowUp />
      </ScrollToTopButton>
    </FooterWrapper>
  );
}
