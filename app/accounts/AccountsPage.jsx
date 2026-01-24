'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
    FiUser,
    FiMail,
    FiCalendar,
    FiShield,
    FiEdit2,
    FiSave,
    FiLogOut,
    FiHeart,
    FiSettings,
    FiPrinter,
    FiSearch,
    FiList,
    FiActivity,
    FiStar,
    FiGlobe,
    FiExternalLink,
    FiPackage,
    FiCheck
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    }
`;

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

const DashboardWrapper = styled.div`
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 20px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
`;

const DashboardHeader = styled.div`
    background: #f1f1f1;
    padding: 15px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
`;

const AccountTitle = styled.h2`
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0;
    color: #444;
    
    span {
        font-weight: 400;
        font-size: 0.85rem;
        margin-left: 8px;
        color: #0066cc;
        cursor: pointer;
        
        &:hover {
            text-decoration: underline;
        }
    }
`;

const AccountStatus = styled.div`
    font-size: 0.95rem;
    color: #333;
    
    strong {
        font-weight: 700;
    }
`;

const TabBar = styled.div`
    display: flex;
    background: #f9f9f9;
    border-bottom: 1px solid #ddd;
    overflow-x: auto;
`;

const TabButton = styled.button`
    padding: 15px 25px;
    font-size: 0.95rem;
    font-weight: 500;
    color: ${({ $active }) => ($active ? '#004a80' : '#0066cc')};
    background: ${({ $active }) => ($active ? '#e1effa' : 'transparent')};
    border: none;
    border-right: 1px solid #ddd;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    
    &:hover {
        background: ${({ $active }) => ($active ? '#e1effa' : '#f0f0f0')};
    }
    
    ${({ $active }) => $active && `
        border-bottom: 3px solid #004a80;
    `}
`;

const TabContent = styled.div`
    padding: 30px;
    min-height: 400px;
`;

const SummaryActions = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 15px;
`;

const PrintLink = styled.button`
    background: none;
    border: none;
    color: #0066cc;
    font-size: 0.85rem;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`;

const ContentTitle = styled.h3`
    font-size: 1.2rem;
    font-weight: 700;
    color: #cc6600;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
`;

const InfoBox = styled.div`
    background: #fdfdfd;
    border: 1px solid #eee;
    padding: 20px;
    border-radius: 4px;
    margin-bottom: 20px;
`;

const LabelValue = styled.div`
    display: flex;
    margin-bottom: 15px;
    font-size: 0.95rem;
    
    .label {
        font-weight: 700;
        width: 150px;
        color: #555;
    }
    
    .value {
        color: #333;
    }
`;

const ActionBtn = styled.button`
    background: ${({ $primary }) => ($primary ? '#0066cc' : '#f1f1f1')};
    color: ${({ $primary }) => ($primary ? 'white' : '#333')};
    border: 1px solid ${({ $primary }) => ($primary ? '#004a80' : '#ccc')};
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 10px;
    
    &:hover {
        background: ${({ $primary }) => ($primary ? '#004a80' : '#e0e0e0')};
    }
`;

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
`;

const ProductCard = styled.div`
    border: 1px solid #eee;
    padding: 15px;
    border-radius: 4px;
    background: #fff;
    
    h4 {
        margin: 0 0 10px 0;
        color: #004a80;
    }
    
    p {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 10px;
    }
`;

const PricingGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 25px;
    margin-top: 10px;
`;

const PricingCard = styled.div`
    background: white;
    border: 2px solid ${({ $featured }) => ($featured ? '#0066cc' : '#eee')};
    border-radius: 8px;
    padding: 25px;
    position: relative;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    ${({ $featured }) => $featured && `
        &::after {
            content: 'MOST POPULAR';
            position: absolute;
            top: -12px;
            left: 50%;
            transform: translateX(-50%);
            background: #0066cc;
            color: white;
            font-size: 0.65rem;
            font-weight: 800;
            padding: 4px 12px;
            border-radius: 20px;
            letter-spacing: 1px;
        }
    `}
`;

const PriceTitle = styled.h4`
    font-size: 1.1rem;
    color: #333;
    margin-bottom: 5px;
    font-weight: 700;
`;

const PriceValue = styled.div`
    font-size: 2.5rem;
    font-weight: 800;
    color: #004a80;
    margin: 15px 0;
    
    span {
        font-size: 1rem;
        color: #666;
        font-weight: 400;
        margin-left: 4px;
    }
`;

const PriceDetail = styled.div`
    font-size: 0.9rem;
    color: #dd6600;
    font-weight: 700;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 6px;
`;

const PricingFeature = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 0.85rem;
    color: #555;
    
    svg {
        color: #10b981;
        flex-shrink: 0;
        margin-top: 2px;
    }
`;


const products = [
    {
        name: 'Optical Automation',
        url: 'opticalautomation.com',
        description: 'Flagship services & portfolio.',
    },
    {
        name: 'Client Portal',
        url: 'portal.opticalautomation.com',
        description: 'Project management & files.',
    },
    {
        name: 'Documentation Hub',
        url: 'docs.opticalautomation.com',
        description: 'Technical API & guides.',
    }
];

export default function AccountsPage() {
    const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('summary');

    if (isLoading) {
        return <PageWrapper><Container>Loading...</Container></PageWrapper>;
    }

    if (!isAuthenticated) {
        return (
            <PageWrapper>
                <Container>
                    <div style={{ textAlign: 'center', padding: '50px', background: 'white', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <h2>Please log in to manage your account</h2>
                        <ActionBtn $primary onClick={() => router.push('/login')} style={{ margin: '20px auto' }}>
                            Go to Login
                        </ActionBtn>
                    </div>
                </Container>
            </PageWrapper>
        );
    }

    const tabs = [
        { id: 'summary', label: 'Account Summary' },
        { id: 'pricing', label: 'Website Pricing' },
        { id: 'activity', label: 'Account Activity' },
        { id: 'products', label: 'Products & Platforms' },
        { id: 'recommendations', label: 'Recommendations' },
        { id: 'lists', label: 'Saved Lists' },
        { id: 'searches', label: 'Saved Searches' }
    ];

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    return (
        <PageWrapper>
            <Container>
                <DashboardWrapper>
                    <DashboardHeader>
                        <AccountTitle>
                            {user.name.toUpperCase()}'s ACCOUNT <span onClick={handleLogout}>(Log Out)</span>
                        </AccountTitle>
                        <AccountStatus>
                            Status: <strong>Good</strong>
                        </AccountStatus>
                    </DashboardHeader>

                    <TabBar>
                        {tabs.map(tab => (
                            <TabButton
                                key={tab.id}
                                $active={activeTab === tab.id}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </TabButton>
                        ))}
                    </TabBar>

                    <TabContent>
                        {activeTab === 'summary' && (
                            <div>
                                <SummaryActions>
                                    <PrintLink onClick={() => window.print()}>
                                        <FiPrinter /> Print Account Summary
                                    </PrintLink>
                                </SummaryActions>
                                <ContentTitle>Summary</ContentTitle>
                                <InfoBox>
                                    <LabelValue>
                                        <div className="label">Name:</div>
                                        <div className="value">{user?.name}</div>
                                    </LabelValue>
                                    <LabelValue>
                                        <div className="label">Email:</div>
                                        <div className="value">{user?.email}</div>
                                    </LabelValue>
                                    <LabelValue>
                                        <div className="label">Client ID:</div>
                                        <div className="value">{user?.clientId || 'N/A'}</div>
                                    </LabelValue>
                                    <LabelValue>
                                        <div className="label">Access Level:</div>
                                        <div className="value">{user?.role === 'admin' ? 'Administrator' : 'Standard User'}</div>
                                    </LabelValue>
                                </InfoBox>
                                <ActionBtn $primary onClick={() => router.push('/profile')}>
                                    <FiSettings size={14} /> Full Account Settings
                                </ActionBtn>
                            </div>
                        )}

                        {activeTab === 'pricing' && (
                            <div>
                                <ContentTitle>Website Database Production Pricing</ContentTitle>
                                <p style={{ color: '#666', marginBottom: '25px' }}>Tailored solutions for your digital ecosystem. Each plan includes continuous support and updates.</p>

                                <PricingGrid>
                                    <PricingCard>
                                        <PriceTitle>Website Only</PriceTitle>
                                        <PriceValue>$499 <span>One-time</span></PriceValue>
                                        <PriceDetail><FiShield /> $499/mo Monthly Updates</PriceDetail>
                                        <PricingFeature><FiCheck /> Full SEO Optimization</PricingFeature>
                                        <PricingFeature><FiCheck /> Responsive Web Design</PricingFeature>
                                        <PricingFeature><FiCheck /> Secure Hosting & CDN</PricingFeature>
                                        <PricingFeature><FiCheck /> Database Integration</PricingFeature>
                                    </PricingCard>

                                    <PricingCard $featured>
                                        <PriceTitle>Website + 1 App</PriceTitle>
                                        <PriceValue>$750 <span>One-time</span></PriceValue>
                                        <PriceDetail><FiShield /> $499/mo Monthly Updates</PriceDetail>
                                        <PricingFeature><FiCheck /> iOS or Android Mobile App</PricingFeature>
                                        <PricingFeature><FiCheck /> App Store Store Submission</PricingFeature>
                                        <PricingFeature><FiCheck /> Real-time Data Sync</PricingFeature>
                                        <PricingFeature><FiCheck /> Push Notifications</PricingFeature>
                                    </PricingCard>

                                    <PricingCard>
                                        <PriceTitle>Website + 2 Apps</PriceTitle>
                                        <PriceValue>$1,250 <span>One-time</span></PriceValue>
                                        <PriceDetail><FiShield /> $499/mo Monthly Updates</PriceDetail>
                                        <PricingFeature><FiCheck /> iOS & Android Mobile Apps</PricingFeature>
                                        <PricingFeature><FiCheck /> Store Submissions Included</PricingFeature>
                                        <PricingFeature><FiCheck /> Multi-platform Analytics</PricingFeature>
                                        <PricingFeature><FiCheck /> Priority Technical Support</PricingFeature>
                                    </PricingCard>
                                </PricingGrid>
                            </div>
                        )}


                        {activeTab === 'activity' && (
                            <div>
                                <ContentTitle>Account Activity</ContentTitle>
                                <p style={{ color: '#666' }}>Recent activities associated with your account.</p>
                                <InfoBox>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        <strong>Joined:</strong> {new Date(user.loginAt).toLocaleDateString()}
                                    </div>
                                </InfoBox>
                            </div>
                        )}

                        {activeTab === 'products' && (
                            <div>
                                <ContentTitle>Your Platforms</ContentTitle>
                                <ProductsGrid>
                                    {products.map(p => (
                                        <ProductCard key={p.url}>
                                            <h4>{p.name}</h4>
                                            <p>{p.description}</p>
                                            <a href={`https://${p.url}`} target="_blank" style={{ color: '#0066cc', fontSize: '0.85rem' }}>Visit <FiExternalLink size={12} /></a>
                                        </ProductCard>
                                    ))}
                                </ProductsGrid>
                            </div>
                        )}

                        {/* Other tabs follow the same simple layout as ProfilePage */}
                        {['recommendations', 'lists', 'searches'].includes(activeTab) && (
                            <div>
                                <ContentTitle>{tabs.find(t => t.id === activeTab).label}</ContentTitle>
                                <InfoBox>
                                    <p style={{ color: '#666' }}>No entries found for this section.</p>
                                </InfoBox>
                            </div>
                        )}
                    </TabContent>
                </DashboardWrapper>
            </Container>
        </PageWrapper>
    );
}
