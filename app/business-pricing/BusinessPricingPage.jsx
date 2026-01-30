'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiUsers, FiPackage, FiDollarSign, FiMail } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
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

const Header = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;



const LogoWrapper = styled(motion.div)`
width: 60px;
height: 60px;
position: relative;
border - radius: 0;
overflow: hidden;
flex - shrink: 0;

@media(max - width: 768px) {
    width: 40px;
    height: 40px;
}
`;

const Title = styled(motion.h1)`
font - size: 3rem;
margin - bottom: ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.colors.gradient};
-webkit - background - clip: text;
-webkit - text - fill - color: transparent;
background - clip: text;
display: inline - flex;
align - items: center;
gap: ${({ theme }) => theme.spacing.md};

@media(max - width: 768px) {
    font - size: 2rem;
    flex - direction: column;
}
`;

const Subtitle = styled.p`
font - size: 1.25rem;
color: ${({ theme }) => theme.colors.textSecondary};
margin - bottom: ${({ theme }) => theme.spacing.lg};
`;

const Badge = styled(motion.div)`
display: inline - block;
background: ${({ theme }) => theme.colors.gradient};
color: white;
padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
border - radius: ${({ theme }) => theme.borderRadius.full};
font - weight: 600;
font - size: 1rem;
`;

const PricingGrid = styled.div`
display: grid;
grid - template - columns: repeat(auto - fit, minmax(320px, 1fr));
gap: ${({ theme }) => theme.spacing.xl};
margin - bottom: ${({ theme }) => theme.spacing.xxl};

@media(max - width: 768px) {
    grid - template - columns: 1fr;
}
`;

const PricingCard = styled(motion.div)`
background: ${({ theme, $featured }) =>
        $featured ? `${theme.colors.primary}10` : theme.colors.surface
    };
border: 2px solid ${({ theme, $featured }) =>
        $featured ? theme.colors.primary : theme.colors.border
    };
border - radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xxl};
position: relative;
transition: all 0.3s ease;

    &:hover {
    transform: translateY(-8px);
    box - shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
}
`;

const FeaturedBadge = styled.div`
position: absolute;
top: -12px;
right: ${({ theme }) => theme.spacing.lg};
background: ${({ theme }) => theme.colors.gradient};
color: white;
padding: 4px 16px;
border - radius: ${({ theme }) => theme.borderRadius.full};
font - size: 0.875rem;
font - weight: 600;
`;

const TierName = styled.h2`
font - size: 2rem;
color: ${({ theme }) => theme.colors.text};
margin - bottom: ${({ theme }) => theme.spacing.md};
`;

const PriceSection = styled.div`
margin - bottom: ${({ theme }) => theme.spacing.xl};
`;

const Price = styled.div`
font - size: 3rem;
font - weight: 700;
color: ${({ theme }) => theme.colors.primary};
margin - bottom: ${({ theme }) => theme.spacing.xs};

    span {
    font - size: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
}
`;

const PriceDescription = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font - size: 0.875rem;
`;

const FeaturesList = styled.ul`
list - style: none;
padding: 0;
margin - bottom: ${({ theme }) => theme.spacing.xl};
`;

const Feature = styled.li`
display: flex;
align - items: flex - start;
gap: ${({ theme }) => theme.spacing.sm};
color: ${({ theme }) => theme.colors.text};
margin - bottom: ${({ theme }) => theme.spacing.md};
line - height: 1.6;

    svg {
    color: ${({ theme }) => theme.colors.success};
    flex - shrink: 0;
    margin - top: 2px;
}
`;

const CTAButton = styled.button`
width: 100 %;
padding: ${({ theme }) => theme.spacing.md};
background: ${({ theme, $primary }) =>
        $primary ? theme.colors.gradient : theme.colors.backgroundAlt
    };
color: ${({ $primary }) => $primary ? 'white' : 'inherit'};
border: ${({ theme, $primary }) =>
        $primary ? 'none' : `2px solid ${theme.colors.border}`
    };
border - radius: ${({ theme }) => theme.borderRadius.lg};
font - weight: 600;
font - size: 1.125rem;
cursor: pointer;
transition: all 0.3s ease;

    &:hover {
    transform: translateY(-2px);
    box - shadow: 0 8px 20px ${({ theme }) => theme.colors.shadow};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
}
`;

const InfoSection = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border - radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xxl};
margin - bottom: ${({ theme }) => theme.spacing.xxl};
`;

const InfoTitle = styled.h3`
font - size: 1.5rem;
color: ${({ theme }) => theme.colors.text};
margin - bottom: ${({ theme }) => theme.spacing.md};
`;

const InfoText = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
line - height: 1.8;
margin - bottom: ${({ theme }) => theme.spacing.md};
`;

const ComparisonTable = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border - radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xl};
overflow - x: auto;
`;

const Table = styled.table`
width: 100 %;
border - collapse: collapse;

th, td {
    padding: ${({ theme }) => theme.spacing.md};
    text - align: left;
    border - bottom: 1px solid ${({ theme }) => theme.colors.border};
}

    th {
    color: ${({ theme }) => theme.colors.primary};
    font - weight: 600;
}

    td {
    color: ${({ theme }) => theme.colors.text};
}

tr: last - child td {
    border - bottom: none;
}
`;

const deskViewSeries = [
    'MyDeskView',
    'DIY Solutions',
    'Friends',
    'PlacesToGo',
    'MyPersonalOrganizer',
    'MyBusinessOrganizer',
    'MyDateBook',
    'MyPhotoAlbum'
];

export default function BusinessPricingPage() {
    const router = useRouter();

    const handleContact = () => {
        router.push('/contact');
    };

    return (
        <PageWrapper>
            <Container>
                <Header>
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
                        Business Licensing & Multi-User Pricing
                    </Title>
                    <Subtitle>
                        Professional software solutions for teams and organizations
                    </Subtitle>
                    <Badge
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Volume Licensing Available
                    </Badge>
                </Header>

                <PricingGrid>
                    {/* Standard Tier */}
                    <PricingCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <TierName>Standard</TierName>
                        <PriceSection>
                            <Price>
                                $125
                                <span>/year</span>
                            </Price>
                            <PriceDescription>One software title, up to 25 users</PriceDescription>
                        </PriceSection>

                        <FeaturesList>
                            <Feature>
                                <FiCheck />
                                <span><strong>1 Software Title</strong> of your choice</span>
                            </Feature>
                            <Feature>
                                <FiUsers />
                                <span><strong>25 User Licenses</strong> included</span>
                            </Feature>
                            <Feature>
                                <FiPackage />
                                <span>Web-based access</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>Email support</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>Annual updates included</span>
                            </Feature>
                        </FeaturesList>

                        <CTAButton onClick={handleContact}>
                            Contact Sales
                        </CTAButton>
                    </PricingCard>

                    {/* Silver Tier */}
                    <PricingCard
                        $featured
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <FeaturedBadge>Popular</FeaturedBadge>
                        <TierName>Silver</TierName>
                        <PriceSection>
                            <Price>
                                $125
                                <span>/year</span>
                            </Price>
                            <PriceDescription>DeskView Series, up to 25 users</PriceDescription>
                        </PriceSection>

                        <FeaturesList>
                            <Feature>
                                <FiCheck />
                                <span><strong>DeskView Series</strong> ({deskViewSeries.length} apps)</span>
                            </Feature>
                            <Feature>
                                <FiUsers />
                                <span><strong>25 User Licenses</strong> included</span>
                            </Feature>
                            <Feature>
                                <FiPackage />
                                <span>Web-based access</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>Priority email support</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>Annual updates included</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>iOS apps (August 2026)</span>
                            </Feature>
                        </FeaturesList>

                        <CTAButton $primary onClick={handleContact}>
                            Contact Sales
                        </CTAButton>
                    </PricingCard>

                    {/* Gold Tier */}
                    <PricingCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <TierName>Gold</TierName>
                        <PriceSection>
                            <Price>
                                $250
                                <span>/year</span>
                            </Price>
                            <PriceDescription>All software titles, up to 50 users</PriceDescription>
                        </PriceSection>

                        <FeaturesList>
                            <Feature>
                                <FiCheck />
                                <span><strong>All 40 Software Titles</strong></span>
                            </Feature>
                            <Feature>
                                <FiUsers />
                                <span><strong>50 User Licenses</strong> included</span>
                            </Feature>
                            <Feature>
                                <FiPackage />
                                <span>Web-based access</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>Premium support (phone & email)</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>Annual updates included</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>iOS apps (August 2026)</span>
                            </Feature>
                            <Feature>
                                <FiCheck />
                                <span>Dedicated account manager</span>
                            </Feature>
                        </FeaturesList>

                        <CTAButton $primary onClick={handleContact}>
                            Contact Sales
                        </CTAButton>
                    </PricingCard>
                </PricingGrid>

                <InfoSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <InfoTitle>DeskView Series Includes:</InfoTitle>
                    <InfoText>
                        The Silver tier includes all {deskViewSeries.length} applications in the DeskView Series:
                    </InfoText>
                    <FeaturesList>
                        {deskViewSeries.map((app, index) => (
                            <Feature key={index}>
                                <FiCheck />
                                <span>{app}</span>
                            </Feature>
                        ))}
                    </FeaturesList>
                </InfoSection>

                <ComparisonTable
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <InfoTitle style={{ marginBottom: '1.5rem' }}>Pricing Comparison</InfoTitle>
                    <Table>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th>Standard</th>
                                <th>Silver</th>
                                <th>Gold</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Software Titles</td>
                                <td>1 title</td>
                                <td>DeskView Series (8 apps)</td>
                                <td>All 40 titles</td>
                            </tr>
                            <tr>
                                <td>User Licenses</td>
                                <td>25 users</td>
                                <td>25 users</td>
                                <td>50 users</td>
                            </tr>
                            <tr>
                                <td>Annual Price</td>
                                <td>$125</td>
                                <td>$125</td>
                                <td>$250</td>
                            </tr>
                            <tr>
                                <td>Price per User</td>
                                <td>$5/user</td>
                                <td>$5/user</td>
                                <td>$5/user</td>
                            </tr>
                            <tr>
                                <td>Support</td>
                                <td>Email</td>
                                <td>Priority Email</td>
                                <td>Phone & Email</td>
                            </tr>
                            <tr>
                                <td>iOS Apps (Aug 2026)</td>
                                <td>—</td>
                                <td>✓</td>
                                <td>✓</td>
                            </tr>
                            <tr>
                                <td>Account Manager</td>
                                <td>—</td>
                                <td>—</td>
                                <td>✓</td>
                            </tr>
                        </tbody>
                    </Table>
                </ComparisonTable>

                <InfoSection
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <InfoTitle>Need More Users?</InfoTitle>
                    <InfoText>
                        For organizations requiring more than 50 user licenses, we offer custom enterprise pricing.
                        Contact our sales team to discuss volume discounts and custom licensing arrangements.
                    </InfoText>
                    <CTAButton $primary onClick={handleContact} style={{ maxWidth: '300px' }}>
                        <FiMail style={{ display: 'inline', marginRight: '8px' }} />
                        Contact Enterprise Sales
                    </CTAButton>
                </InfoSection>
            </Container>
        </PageWrapper>
    );
}
