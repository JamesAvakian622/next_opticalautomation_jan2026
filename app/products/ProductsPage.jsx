'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    FiGlobe,
    FiExternalLink,
    FiServer,
    FiShield,
    FiZap,
    FiCheck,
    FiHeart,
    FiPrinter
} from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh-70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const HeroSection = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;



const LogoWrapper = styled(motion.div)`
width: 60px;
height: 60px;
position: relative;
border-radius: 0;
overflow: hidden;
flex-shrink: 0;

@media(max-width: 768px) {
    width: 40px;
    height: 40px;
}
`;

const Title = styled(motion.h1)`
font-size: 3rem;
margin-bottom: ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.colors.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
display: inline-flex;
align-items: center;
gap: ${({ theme }) => theme.spacing.md};

@media(max-width: 768px) {
    font-size: 2rem;
}
`;

const Subtitle = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 1.125rem;
max-width: 600px;
margin: 0 auto;
`;

const ProductsGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
gap: ${({ theme }) => theme.spacing.xl};
margin-bottom: ${({ theme }) => theme.spacing.xxl};

@media(max-width: 400px) {
    grid-template-columns: 1fr;
}
`;

const ProductCard = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xl};
transition: all 0.3s ease;

    &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
}
`;

const ProductHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductIcon = styled.div`
width: 48px;
height: 48px;
border-radius: ${({ theme }) => theme.borderRadius.lg};
background: ${({ $color }) => `${$color}20`};
display: flex;
align-items: center;
justify-content: center;

    svg {
    font-size: 1.5rem;
    color: ${({ $color }) => $color};
}
`;

const StatusBadge = styled.span`
padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
background: ${({ $active, theme }) =>
        $active ? `${theme.colors.success}20` : `${theme.colors.warning}20`
    };
color: ${({ $active, theme }) =>
        $active ? theme.colors.success : theme.colors.warning
    };
border-radius: ${({ theme }) => theme.borderRadius.full};
font-size: 0.75rem;
font-weight: 600;
`;

const FavoriteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: ${({ $favorited, theme }) => $favorited ? '#ef4444' : theme.colors.textSecondary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundAlt};
    transform: scale(1.1);
  }
  
  svg {
    font-size: 1.25rem;
    fill: ${({ $favorited }) => $favorited ? '#ef4444' : 'none'};
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PrintFavoritesButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.gradient};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const ProductName = styled.h3`
font-size: 1.25rem;
color: ${({ theme }) => theme.colors.text};
margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const ProductUrl = styled.p`
color: ${({ theme }) => theme.colors.primary};
font-size: 0.875rem;
font-weight: 500;
margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProductDescription = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 0.9rem;
line-height: 1.6;
margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeaturesList = styled.ul`
list-style: none;
margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FeatureItem = styled.li`
display: flex;
align-items: center;
gap: ${({ theme }) => theme.spacing.sm};
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 0.875rem;
margin-bottom: ${({ theme }) => theme.spacing.sm};

    svg {
    color: ${({ theme }) => theme.colors.success};
    flex-shrink: 0;
}
`;

const VisitLink = styled.a`
display: inline-flex;
align-items: center;
gap: 6px;
padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.colors.gradient};
color: white;
border-radius: ${({ theme }) => theme.borderRadius.md};
font-size: 0.875rem;
font-weight: 500;
transition: all 0.3s ease;

    &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
}
`;

const ServicesSection = styled.div`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xxl};
`;

const SectionTitle = styled.h2`
font-size: 2rem;
text-align: center;
margin-bottom: ${({ theme }) => theme.spacing.xl};
background: ${({ theme }) => theme.colors.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
`;

const ServicesGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
gap: ${({ theme }) => theme.spacing.lg};
`;

const ServiceItem = styled(motion.div)`
text-align: center;
padding: ${({ theme }) => theme.spacing.lg};
`;

const ServiceIcon = styled.div`
width: 60px;
height: 60px;
margin: 0 auto ${({ theme }) => theme.spacing.md};
border-radius: ${({ theme }) => theme.borderRadius.full};
background: ${({ theme }) => theme.colors.backgroundAlt};
display: flex;
align-items: center;
justify-content: center;

    svg {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
}
`;

const ServiceTitle = styled.h4`
color: ${({ theme }) => theme.colors.text};
margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ServiceDesc = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 0.875rem;
`;

const products = [
    {
        name: 'Optical Automation',
        url: 'opticalautomation.com',
        description: 'Our flagship website showcasing web development services, portfolio, and technical expertise.',
        color: '#6366f1',
        active: true,
        features: ['React/Next.js', 'Full-Stack Development', 'AI Integration', 'SEO Optimized']
    },
    {
        name: 'Client Portal',
        url: 'www.JamesAvakian.com',
        description: 'Secure client portal for project management, file sharing, and communication.',
        color: '#10B981',
        active: true,
        features: ['Project Tracking', 'File Sharing', 'Real-time Chat', 'Invoice Management']
    },
    {
        name: 'DocumentHub',
        url: 'documenthubaws.netlify.app',
        description: 'AWS-powered document management system for viewing and accessing PDF documents.',
        color: '#F59E0B',
        active: true,
        features: ['PDF Viewer', 'AWS Storage', 'Document Search', 'Quick Access']
    },

    {
        name: 'LearnSkills365',
        url: 'www.LearnSkills365.com',
        description: 'Educational resources, courses, and tutorials for web development.',
        color: '#06B6D4',
        active: true,
        features: ['Video Courses', 'Interactive Labs', 'Certifications', 'Community']
    },
    {
        name: 'DollarDimeStore',
        url: 'www.dollardimestore.com',
        description: 'eCommerce platform offering affordable products and deals for everyday needs.',
        color: '#22C55E',
        active: true,
        features: ['Product Catalog', 'Shopping Cart', 'Secure Checkout', 'Order Tracking']
    }
];

export default function ProductsPage() {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (productUrl) => {
        setFavorites(prev =>
            prev.includes(productUrl)
                ? prev.filter(url => url !== productUrl)
                : [...prev, productUrl]
        );
    };

    const printFavorites = () => {
        const favoriteProducts = products.filter(p => favorites.includes(p.url));
        const printContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>My Favorite Products - Optical Automation</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
                    h1 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
                    .product { margin: 30px 0; padding: 20px; border: 1px solid #ddd; border-radius: 12px; }
                    .product-name { font-size: 1.5rem; font-weight: bold; color: #6366f1; margin-bottom: 5px; }
                    .product-url { color: #666; font-size: 0.9rem; margin-bottom: 10px; }
                    .product-desc { margin-bottom: 15px; line-height: 1.6; }
                    .features { display: flex; flex-wrap: wrap; gap: 8px; }
                    .feature { background: #f0f0f0; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; }
                    .footer { margin-top: 40px; text-align: center; color: #666; font-size: 0.85rem; }
                </style>
            </head>
            <body>
                <h1>⭐ My Favorite Products</h1>
                <p>Generated on ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                ${favoriteProducts.map(p => `
                    <div class="product">
                        <div class="product-name">${p.name}</div>
                        <div class="product-url">🌐 ${p.url}</div>
                        <div class="product-desc">${p.description}</div>
                        <div class="features">
                            ${p.features.map(f => `<span class="feature">✓ ${f}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
                <div class="footer">
                    <p>Optical Automation | opticalautomation.com</p>
                </div>
            </body>
            </html>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.print();
    };

    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <LogoWrapper>
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </LogoWrapper>
                        Products
                    </Title>
                    <Subtitle>
                        Explore the ecosystem of Optical Automation domains and services
                    </Subtitle>
                </HeroSection>

                {favorites.length > 0 && (
                    <PrintFavoritesButton onClick={printFavorites}>
                        <FiPrinter /> Print {favorites.length} Favorite{favorites.length > 1 ? 's' : ''} as PDF
                    </PrintFavoritesButton>
                )}

                <ProductsGrid>
                    {products.map((product, index) => (
                        <ProductCard
                            key={product.url}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <ProductHeader>
                                <ProductIcon $color={product.color}>
                                    <FiGlobe />
                                </ProductIcon>
                                <HeaderActions>
                                    <FavoriteButton
                                        $favorited={favorites.includes(product.url)}
                                        onClick={() => toggleFavorite(product.url)}
                                        title={favorites.includes(product.url) ? 'Remove from favorites' : 'Add to favorites'}
                                    >
                                        <FiHeart />
                                    </FavoriteButton>
                                    <StatusBadge $active={product.active}>
                                        {product.status === 'pending' ? 'Pending' : (product.active ? 'Active' : 'Coming Soon')}
                                    </StatusBadge>
                                </HeaderActions>
                            </ProductHeader>
                            <ProductName>{product.name}</ProductName>
                            <ProductUrl>{product.url}</ProductUrl>
                            <ProductDescription>{product.description}</ProductDescription>
                            <FeaturesList>
                                {product.features.map((feature) => (
                                    <FeatureItem key={feature}>
                                        <FiCheck /> {feature}
                                    </FeatureItem>
                                ))}
                            </FeaturesList>
                            {product.active && (
                                <VisitLink
                                    href="https://6961af51fdbe659fc8f241fa--illustrious-baklava-da0cd7.netlify.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Visit Site < FiExternalLink />
                                </VisitLink >
                            )}
                        </ProductCard >
                    ))}
                </ProductsGrid >
            </Container >
        </PageWrapper >
    );
}
