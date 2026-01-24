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
    FiCheck
} from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    }
`;

const Container = styled.div`
    max-width: 800px;
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


function SummaryTab({ user, onEdit, onLogout }) {
    return (
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
                    <div className="label">Account Type:</div>
                    <div className="value">{user?.role === 'admin' ? 'Administrator' : 'Standard User'}</div>
                </LabelValue>
                <LabelValue>
                    <div className="label">Subscription:</div>
                    <div className="value" style={{ textTransform: 'capitalize' }}>{user?.subscriptionTier || 'Individual'}</div>
                </LabelValue>
            </InfoBox>

            <div style={{ display: 'flex' }}>
                <ActionBtn $primary onClick={onEdit}>
                    <FiEdit2 size={14} /> Edit Profile
                </ActionBtn>
                <ActionBtn onClick={onLogout}>
                    <FiLogOut size={14} /> Log Out
                </ActionBtn>
            </div>
        </div>
    );
}


export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('summary');
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '' });

    React.useEffect(() => {
        if (user) {
            setFormData({ name: user.name });
        }
    }, [user]);

    const handleSave = () => {
        updateProfile({ name: formData.name });
        setIsEditing(false);
    };

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    if (isLoading) {
        return <PageWrapper><Container>Loading...</Container></PageWrapper>;
    }

    if (!isAuthenticated) {
        return (
            <PageWrapper>
                <Container>
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <h2>Please log in to view your account</h2>
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
        { id: 'recommendations', label: 'Recommendations' },
        { id: 'lists', label: 'Saved Lists' },
        { id: 'searches', label: 'Saved Searches' }
    ];

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
                        {activeTab === 'summary' && !isEditing && (
                            <SummaryTab
                                user={user}
                                onEdit={() => setIsEditing(true)}
                                onLogout={handleLogout}
                            />
                        )}

                        {activeTab === 'summary' && isEditing && (
                            <div>
                                <ContentTitle>Edit Profile</ContentTitle>
                                <InfoBox>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>Display Name</label>
                                        <input
                                            value={formData.name}
                                            onChange={(e) => setFormData({ name: e.target.value })}
                                            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
                                        />
                                    </div>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '700' }}>Email (Locked)</label>
                                        <input
                                            value={user.email}
                                            disabled
                                            style={{ width: '100%', padding: '10px', border: '1px solid #eee', background: '#f9f9f9', borderRadius: '4px', cursor: 'not-allowed' }}
                                        />
                                    </div>
                                </InfoBox>
                                <div style={{ display: 'flex' }}>
                                    <ActionBtn $primary onClick={handleSave}>Save Changes</ActionBtn>
                                    <ActionBtn onClick={() => setIsEditing(false)}>Cancel</ActionBtn>
                                </div>
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
                                <p style={{ color: '#666' }}>Recent account activity and log-ins will appear here.</p>
                                <InfoBox>
                                    <div style={{ fontSize: '0.9rem' }}>
                                        <strong>Last Login:</strong> {new Date(user.loginAt).toLocaleString()}
                                    </div>
                                </InfoBox>
                            </div>
                        )}

                        {activeTab === 'recommendations' && (
                            <div>
                                <ContentTitle>Recommendations</ContentTitle>
                                <p style={{ color: '#666' }}>Personalized software and tool recommendations based on your usage.</p>
                                <InfoBox>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <FiStar color="#cc6600" />
                                        <span>Check out our newest AI tools in the Portfolio section!</span>
                                    </div>
                                </InfoBox>
                            </div>
                        )}

                        {activeTab === 'lists' && (
                            <div>
                                <ContentTitle>Saved Lists</ContentTitle>
                                <p style={{ color: '#666' }}>Your bookmarks and saved software configurations.</p>
                                <InfoBox>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <FiList color="#0066cc" />
                                        <span>You haven't saved any lists yet.</span>
                                    </div>
                                </InfoBox>
                            </div>
                        )}

                        {activeTab === 'searches' && (
                            <div>
                                <ContentTitle>Saved Searches</ContentTitle>
                                <p style={{ color: '#666' }}>Quickly access your frequent searches and filters.</p>
                                <InfoBox>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <FiSearch color="#555" />
                                        <span>No saved searches found.</span>
                                    </div>
                                </InfoBox>
                            </div>
                        )}
                    </TabContent>
                </DashboardWrapper>
            </Container>
        </PageWrapper>
    );
}

