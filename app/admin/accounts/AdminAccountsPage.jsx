'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiUsers,
    FiShield,
    FiActivity,
    FiTrendingUp,
    FiSearch,
    FiFilter,
    FiMoreVertical,
    FiCheckCircle,
    FiClock,
    FiAlertCircle,
    FiEdit2,
    FiTrash2,
    FiChevronRight,
    FiArrowUpRight
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
    max-width: 1400px;
    margin: 0 auto;
`;

const Header = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.125rem;
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const StatCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.lg};
    transition: all 0.3s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 8px 30px ${({ theme }) => theme.colors.shadow};
        transform: translateY(-4px);
    }
`;

const StatIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ $color }) => `${$color}15`};
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
`;

const StatInfo = styled.div`
    flex: 1;
`;

const StatLabel = styled.div`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 4px;
    font-weight: 500;
`;

const StatValue = styled.div`
    font-size: 1.75rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const StatTrend = styled.div`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.success};
    display: flex;
    align-items: center;
    gap: 4px;
    margin-top: 4px;
`;

const ContentPanel = styled.div`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xxl};
    overflow: hidden;
`;

const PanelHeader = styled.div`
    padding: ${({ theme }) => theme.spacing.xl};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing.md};
`;

const SearchBox = styled.div`
    position: relative;
    max-width: 400px;
    width: 100%;

    svg {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: ${({ theme }) => theme.colors.textSecondary};
    }

    input {
        width: 100%;
        padding: 12px 16px 12px 48px;
        background: ${({ theme }) => theme.colors.backgroundAlt};
        border: 1px solid ${({ theme }) => theme.colors.border};
        border-radius: ${({ theme }) => theme.borderRadius.lg};
        color: ${({ theme }) => theme.colors.text};
        font-size: 0.95rem;
        transition: all 0.3s ease;

        &:focus {
            outline: none;
            border-color: ${({ theme }) => theme.colors.primary};
            background: ${({ theme }) => theme.colors.surface};
        }
    }
`;

const ActionGroup = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const IconButton = styled.button`
    width: 42px;
    height: 42px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primary}10;
        color: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const TableWrapper = styled.div`
    overflow-x: auto;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    min-width: 1000px;
`;

const Th = styled.th`
    text-align: left;
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.backgroundAlt}50;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Td = styled.td`
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
    vertical-align: middle;
`;

const UserCell = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
`;

const UserAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gradient};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 0.9rem;
`;

const UserInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const UserName = styled.span`
    font-weight: 600;
    font-size: 0.95rem;
`;

const UserEmail = styled.span`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const TierBadge = styled.span`
    padding: 6px 12px;
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    background: ${({ $tier, theme }) =>
        $tier === 'gold' ? theme.colors.gradient :
            $tier === 'silver' ? `${theme.colors.primary}20` :
                theme.colors.backgroundAlt};
    color: ${({ $tier, theme }) =>
        $tier === 'gold' ? 'white' :
            $tier === 'silver' ? theme.colors.primary :
                theme.colors.textSecondary};
`;

const StatusBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.75rem;
    font-weight: 600;
    background: ${({ $status, theme }) =>
        $status === 'active' ? `${theme.colors.success}15` :
            $status === 'trial' ? `${theme.colors.warning}15` :
                `${theme.colors.error}15`};
    color: ${({ $status, theme }) =>
        $status === 'active' ? theme.colors.success :
            $status === 'trial' ? theme.colors.warning :
                theme.colors.error};
`;

const TableRow = styled(motion.tr)`
    transition: background 0.3s ease;
    
    &:hover {
        background: ${({ theme }) => theme.colors.backgroundAlt}50;
    }
`;

const ActionButton = styled.button`
    padding: 6px 16px;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ $primary, theme }) => $primary ? theme.colors.gradient : theme.colors.backgroundAlt};
    color: ${({ $primary }) => $primary ? 'white' : 'inherit'};
    border: none;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const demoUsers = [
    {
        id: '1',
        name: 'James Avakian',
        email: 'james@opticalautomation.com',
        tier: 'gold',
        status: 'active',
        lastLogin: '2026-01-24T08:30:00Z',
        clientId: 'OPT-001'
    },
    {
        id: '2',
        name: 'John Smith',
        email: 'john.smith@demo.com',
        tier: 'silver',
        status: 'active',
        lastLogin: '2026-01-23T15:45:00Z',
        clientId: 'OPT-042'
    },
    {
        id: '3',
        name: 'Sarah Wilson',
        email: 'sarah.w@test.io',
        tier: 'individual',
        status: 'trial',
        lastLogin: '2026-01-24T09:12:00Z',
        clientId: 'OPT-089'
    },
    {
        id: '4',
        name: 'Michael Chen',
        email: 'm.chen@enterprise.com',
        tier: 'gold',
        status: 'active',
        lastLogin: '2026-01-22T10:20:00Z',
        clientId: 'OPT-012'
    },
    {
        id: '5',
        name: 'Emma Davis',
        email: 'emma@davis.co',
        tier: 'silver',
        status: 'expired',
        lastLogin: '2026-01-10T14:30:00Z',
        clientId: 'OPT-055'
    }
];

export default function AdminAccountsPage() {
    const { user: currentUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState(demoUsers);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.clientId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <PageWrapper>
            <Container>
                <Header>
                    <Title
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <FiShield /> Admin Management
                    </Title>
                    <Subtitle>Manage platform users, subscriptions, and system health</Subtitle>
                </Header>

                <StatsGrid>
                    <StatCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <StatIcon $color="#6366f1">
                            <FiUsers />
                        </StatIcon>
                        <StatInfo>
                            <StatLabel>Total Users</StatLabel>
                            <StatValue>1,284</StatValue>
                            <StatTrend>
                                <FiTrendingUp /> +12% this month
                            </StatTrend>
                        </StatInfo>
                    </StatCard>

                    <StatCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <StatIcon $color="#10b981">
                            <FiCheckCircle />
                        </StatIcon>
                        <StatInfo>
                            <StatLabel>Active Subscriptions</StatLabel>
                            <StatValue>892</StatValue>
                            <StatTrend>
                                <FiArrowUpRight /> 32% Gold Tier
                            </StatTrend>
                        </StatInfo>
                    </StatCard>

                    <StatCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <StatIcon $color="#f59e0b">
                            <FiActivity />
                        </StatIcon>
                        <StatInfo>
                            <StatLabel>System Health</StatLabel>
                            <StatValue>99.9%</StatValue>
                            <StatTrend style={{ color: '#10b981' }}>
                                All systems operational
                            </StatTrend>
                        </StatInfo>
                    </StatCard>

                    <StatCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <StatIcon $color="#ec4899">
                            <FiActivity />
                        </StatIcon>
                        <StatInfo>
                            <StatLabel>Daily Active</StatLabel>
                            <StatValue>425</StatValue>
                            <StatTrend>
                                <FiClock /> Peak at 10 AM EST
                            </StatTrend>
                        </StatInfo>
                    </StatCard>
                </StatsGrid>

                <ContentPanel>
                    <PanelHeader>
                        <SearchBox>
                            <FiSearch />
                            <input
                                type="text"
                                placeholder="Search by name, email, or client ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </SearchBox>
                        <ActionGroup>
                            <IconButton title="Filter Users">
                                <FiFilter />
                            </IconButton>
                            <IconButton title="Export Data">
                                <FiArrowUpRight />
                            </IconButton>
                            <ActionButton $primary>
                                <FiUsers /> Add New User
                            </ActionButton>
                        </ActionGroup>
                    </PanelHeader>

                    <TableWrapper>
                        <Table>
                            <thead>
                                <tr>
                                    <Th>User / Client ID</Th>
                                    <Th>Account Tier</Th>
                                    <Th>Status</Th>
                                    <Th>Last Login</Th>
                                    <Th>Actions</Th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {filteredUsers.map((user, index) => (
                                        <TableRow
                                            key={user.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Td>
                                                <UserCell>
                                                    <UserAvatar>
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </UserAvatar>
                                                    <UserInfo>
                                                        <UserName>{user.name}</UserName>
                                                        <UserEmail>{user.clientId} • {user.email}</UserEmail>
                                                    </UserInfo>
                                                </UserCell>
                                            </Td>
                                            <Td>
                                                <TierBadge $tier={user.tier}>{user.tier}</TierBadge>
                                            </Td>
                                            <Td>
                                                <StatusBadge $status={user.status}>
                                                    {user.status === 'active' && <FiCheckCircle />}
                                                    {user.status === 'trial' && <FiClock />}
                                                    {user.status === 'expired' && <FiAlertCircle />}
                                                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                                </StatusBadge>
                                            </Td>
                                            <Td>
                                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>
                                                        {formatDate(user.lastLogin).split(',')[0]}
                                                    </span>
                                                    <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                                                        {formatDate(user.lastLogin).split(',')[1]}
                                                    </span>
                                                </div>
                                            </Td>
                                            <Td>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <IconButton title="Edit User">
                                                        <FiEdit2 size={14} />
                                                    </IconButton>
                                                    <IconButton title="Management">
                                                        <FiMoreVertical size={14} />
                                                    </IconButton>
                                                </div>
                                            </Td>
                                        </TableRow>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </Table>
                    </TableWrapper>
                    {filteredUsers.length === 0 && (
                        <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>
                            <FiAlertCircle size={40} style={{ marginBottom: '16px' }} />
                            <p>No users found matching your search.</p>
                        </div>
                    )}
                </ContentPanel>
            </Container>
        </PageWrapper>
    );
}
