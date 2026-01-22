'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiChevronRight, FiHome } from 'react-icons/fi';

const BreadcrumbNav = styled.nav`
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  z-index: 10;
  position: relative;
  overflow-x: auto;
  white-space: nowrap;
  
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: ${({ theme }) => theme.spacing.xs};
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
`;

const BreadcrumbItem = styled.li`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const BreadcrumbLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: 500;
  font-size: 0.875rem;
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => `${theme.colors.primary}10`};
  }

  svg {
    font-size: 1rem;
  }
`;

const CurrentPage = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
  font-size: 0.875rem;
  padding: 4px 8px;
`;

const Separator = styled(FiChevronRight)`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.5;
`;

const routeLabels = {
    'tech': 'Technology',
    'about': 'About Us',
    'contact': 'Contact',
    'pricing': 'Pricing',
    'support': 'Support',
    'privacy': 'Privacy Policy',
    'terms': 'Terms of Service',
    'products': 'Products',
    'documents': 'Documents',
    'sitemap': 'Site Map',
    'timeline': 'Timeline',
    'trademarks': 'Trademarks',
    'content-policy': 'Content Policy',
    'favorites': 'Favorites',
    'login': 'Login',
    'profile': 'Profile',
    'domains': 'Domains',
    'portfolio': 'Portfolio'
};

const Breadcrumbs = () => {
    const pathname = usePathname();

    // Don't show on home page
    if (pathname === '/') return null;

    const pathSegments = pathname.split('/').filter(Boolean);

    const crumbs = [
        { label: 'Home', href: '/', icon: <FiHome /> },
        ...pathSegments.map((segment, index) => {
            const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
            const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            return { label, href };
        })
    ];

    return (
        <BreadcrumbNav aria-label="Breadcrumb">
            <BreadcrumbList>
                {crumbs.map((crumb, index) => {
                    const isLast = index === crumbs.length - 1;

                    return (
                        <BreadcrumbItem key={crumb.href}>
                            {index > 0 && <Separator aria-hidden="true" />}
                            {isLast ? (
                                <CurrentPage aria-current="page">
                                    {index === 0 && crumb.icon}
                                    {crumb.label}
                                </CurrentPage>
                            ) : (
                                <BreadcrumbLink href={crumb.href}>
                                    {index === 0 && crumb.icon}
                                    {crumb.label}
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                    );
                })}
            </BreadcrumbList>
        </BreadcrumbNav>
    );
};

export default Breadcrumbs;
