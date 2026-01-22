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
    grid-template-columns: 2fr 1fr 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};

    @media (max-width: 900px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (max-width: 600px) {
        grid-template-columns: 1fr;
        text-align: left;
    }
`;

const BrandSection = styled.div``;

const LogoLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: 600px) {
        justify-content: flex-start;
    }
`;

const LogoImage = styled.div`
    width: 50px;
    height: 50px;
    position: relative;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow: hidden;
`;

const CompanyName = styled.span`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const BrandDescription = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    line-height: 1.6;
    max-width: 300px;

    @media (max-width: 600px) {
        max-width: 100%;
    }
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
    font-size: 0.875rem;
    margin: 0;
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

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/tech', label: 'Technology' },
  { href: '/products', label: 'Products' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/documents', label: 'Documents' }
];

const legalLinks = [
  { href: '/terms', label: 'Terms of Use' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/content-policy', label: 'Content Policy' },
  { href: '/trademarks', label: 'Trademarks' },
  { href: '/sitemap', label: 'Site Map' }
];

const supportLinks = [
  { href: '/support', label: 'Technical Support' },
  { href: '/support#faq', label: 'FAQ' },
  { href: '/support#contact', label: 'Contact Us' },
  { href: '/login', label: 'Login / Register' }
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
            <SectionTitle>Navigation</SectionTitle>
            <FooterLinks>
              {navigationLinks.map((link) => (
                <FooterLinkItem key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Support</SectionTitle>
            <FooterLinks>
              {supportLinks.map((link) => (
                <FooterLinkItem key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>

          <FooterSection>
            <SectionTitle>Legal</SectionTitle>
            <FooterLinks>
              {legalLinks.map((link) => (
                <FooterLinkItem key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </FooterLinkItem>
              ))}
            </FooterLinks>
          </FooterSection>
        </FooterTop>

        <FooterBottom>
          <Copyright>
            © {currentYear} Optical Automation, LLC. All rights reserved.
          </Copyright>

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
