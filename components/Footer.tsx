'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Github, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { name: 'Facebook', href: 'https://www.Facebook.com/james.avakian.9', icon: Facebook },
  { name: 'X', href: 'https://twitter.com/JamesAvaki4763', icon: Twitter },
  { name: 'LinkedIn', href: 'https://www.LinkedIn.com/in/james-l-avakian-13500713/', icon: Linkedin },
  { name: 'GitHub', href: 'https://www.github.com/jamesvakian62', icon: Github },
  { name: 'Instagram', href: 'https://www.Instagram.com/jamesavakian/', icon: Instagram }
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
  { href: 'https://documenthubaws.netlify.app/', label: 'DocumentHub', external: true },
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

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

function FooterLink({ href, children, external }: FooterLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-muted-foreground text-sm hover:text-primary transition-colors"
      >
        {children}
      </a>
    );
  }
  return (
    <Link
      href={href}
      className="text-muted-foreground text-sm hover:text-primary transition-colors"
    >
      {children}
    </Link>
  );
}

interface FooterSectionProps {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}

function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h4 className="text-base font-semibold text-foreground mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink href={link.href} external={link.external}>
              {link.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-card border-t border-border px-6 py-1 print:hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Brand Section */}
        <div className="flex flex-col items-center text-center mb-10">
          <Link href="/" className="flex flex-col items-center -mt-8 -mb-16">
            <div className="relative w-[300px] h-[300px]">
              <Image
                src="/opauto0.png"
                alt="Optical Automation"
                fill
                className="object-contain"
              />
            </div>
          </Link>
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-[600px] mx-auto">
            Software app applications as Websites, Mobile Apps, and Database were developed by Agentic AI access for high performance, fast display, and efficient access with SEO Optimization, SOC2 Type II, and ISO 8601 compliance.
          </p>
        </div>

        {/* Footer Links Grid */}
        <div className="grid grid-cols-5 gap-10 mb-16 max-[1100px]:grid-cols-3 max-[900px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:text-center">
          <FooterSection title="Portfolio" links={portfolioLinks} />
          <FooterSection title="Technology" links={technologyLinks} />
          <FooterSection title="Products" links={productsLinks} />
          <FooterSection title="Resources" links={resourcesLinks} />
          <FooterSection title="Policies" links={policyLinks.map(l => ({ ...l, external: true }))} />
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-between items-center pt-10 border-t border-border max-[600px]:flex-col max-[600px]:gap-6">
          <div className="flex flex-col gap-1 max-[600px]:items-center max-[600px]:text-center">
            {/* Footer Branding */}
            <div className="flex items-center justify-center gap-4 mb-6 pb-6 border-b border-border">
              <div className="relative w-[50px] h-[50px] flex-shrink-0">
                <Image
                  src="/opauto.png"
                  alt="OA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-semibold gradient-text">
                Optical Automation
              </span>
            </div>
            
            {/* Legal Disclaimer */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-6 max-w-[600px] text-left opacity-90">
              All trademarks, product names, and logos are the property of their respective owners. Optical Automation, LLC owns all developed software as intellectual property protected by U.S. Copyright and Trademarks. Unauthorized reproduction or distribution of any material on this site is prohibited.
            </p>
            
            {/* Copyright */}
            <p className="text-muted-foreground text-[13px]">
              © {currentYear} Optical Automation, LLC. All rights reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="w-10 h-10 flex items-center justify-center bg-muted rounded-full text-foreground hover:gradient-bg hover:text-white hover:-translate-y-[3px] transition-all"
              >
                <social.icon className="w-[18px] h-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-10 right-10 w-12 h-12 rounded-full gradient-bg text-white border-none shadow-lg hover:-translate-y-1 hover:shadow-xl z-[999] max-md:bottom-6 max-md:right-6 max-md:w-11 max-md:h-11"
      >
        <ArrowUp className="w-6 h-6" />
      </Button>
    </footer>
  );
}
