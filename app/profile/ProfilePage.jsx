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
    FiSettings
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

const ProfileHeader = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xxl};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Avatar = styled.div`
    width: 100px;
    height: 100px;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.gradient};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 3rem;
        color: white;
    }
`;

const UserName = styled.h1`
    font-size: 2rem;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    color: ${({ theme }) => theme.colors.text};
`;

const UserEmail = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};

    svg {
        font-size: 1rem;
    }
`;

const UserMeta = styled.div`
    display: flex;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.xl};
    margin-top: ${({ theme }) => theme.spacing.lg};
    flex-wrap: wrap;
`;

const MetaItem = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;

    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const RoleBadge = styled.span`
    padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
    background: ${({ $isAdmin, theme }) =>
        $isAdmin ? theme.colors.gradient : `${theme.colors.primary}20`};
    color: ${({ $isAdmin, theme }) => ($isAdmin ? 'white' : theme.colors.primary)};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
`;

const SectionCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.text};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const EditButton = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    color: ${({ theme }) => theme.colors.text};
    font-size: 0.875rem;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
    }
`;

const FormGroup = styled.div`
    margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    color: ${({ theme }) => theme.colors.text};
    font-weight: 500;
`;

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${({ theme }) => theme.spacing.md};
`;

const StatItem = styled.div`
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    text-align: center;
`;

const StatValue = styled.div`
    font-size: 2rem;
    font-weight: 700;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const StatLabel = styled.div`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ActionButtons = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    flex-wrap: wrap;
`;

const Button = styled(motion.button)`
    flex: 1;
    min-width: 150px;
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ $danger, $primary, theme }) =>
        $danger ? theme.colors.error : $primary ? theme.colors.gradient : theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    color: ${({ $danger, $primary }) => ($danger || $primary ? 'white' : 'inherit')};
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const LoginPrompt = styled(motion.div)`
    text-align: center;
    padding: ${({ theme }) => theme.spacing.xxl};
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
`;

const PromptTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
`;

const PromptText = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
    const { favorites } = useFavorites();
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });

    React.useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email });
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
        return (
            <PageWrapper>
                <Container>
                    <ProfileHeader>
                        <p>Loading...</p>
                    </ProfileHeader>
                </Container>
            </PageWrapper>
        );
    }

    if (!isAuthenticated) {
        return (
            <PageWrapper>
                <Container>
                    <LoginPrompt
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Avatar>
                            <FiUser />
                        </Avatar>
                        <PromptTitle>Not Logged In</PromptTitle>
                        <PromptText>
                            Please log in to view your profile and account settings.
                        </PromptText>
                        <Button
                            $primary
                            onClick={() => router.push('/login')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiUser /> Login / Register
                        </Button>
                    </LoginPrompt>
                </Container>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <Container>
                <ProfileHeader
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Avatar>
                        <FiUser />
                    </Avatar>
                    <UserName>{user.name}</UserName>
                    <UserEmail>
                        <FiMail /> {user.email}
                    </UserEmail>
                    <UserMeta>
                        <MetaItem>
                            <FiCalendar />
                            Joined {new Date(user.loginAt).toLocaleDateString()}
                        </MetaItem>
                        <RoleBadge $isAdmin={user.role === 'admin'}>
                            {user.role}
                        </RoleBadge>
                    </UserMeta>
                </ProfileHeader>

                <SectionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <SectionHeader>
                        <SectionTitle>
                            <FiSettings /> Account Settings
                        </SectionTitle>
                        <EditButton onClick={() => setIsEditing(!isEditing)}>
                            {isEditing ? <FiSave /> : <FiEdit2 />}
                            {isEditing ? 'Cancel' : 'Edit'}
                        </EditButton>
                    </SectionHeader>

                    <FormGroup>
                        <Label>Display Name</Label>
                        <Input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            disabled={!isEditing}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label>Email Address</Label>
                        <Input
                            type="email"
                            value={formData.email}
                            disabled
                        />
                    </FormGroup>

                    {isEditing && (
                        <Button
                            $primary
                            onClick={handleSave}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiSave /> Save Changes
                        </Button>
                    )}
                </SectionCard>

                <SectionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionTitle>
                        <FiHeart /> Activity
                    </SectionTitle>
                    <StatsGrid>
                        <StatItem>
                            <StatValue>{favorites.length}</StatValue>
                            <StatLabel>Favorites</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>1</StatValue>
                            <StatLabel>Sessions</StatLabel>
                        </StatItem>
                        <StatItem>
                            <StatValue>{user.role === 'admin' ? 'Full' : 'Standard'}</StatValue>
                            <StatLabel>Access Level</StatLabel>
                        </StatItem>
                    </StatsGrid>
                </SectionCard>

                <SectionCard
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <SectionTitle>
                        <FiShield /> Account Actions
                    </SectionTitle>
                    <ActionButtons>
                        <Button
                            onClick={() => router.push('/favorites')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiHeart /> View Favorites
                        </Button>
                        <Button
                            $danger
                            onClick={handleLogout}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiLogOut /> Sign Out
                        </Button>
                    </ActionButtons>
                </SectionCard>
            </Container>
        </PageWrapper>
    );
}
