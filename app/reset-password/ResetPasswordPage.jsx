'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiLock, FiEye, FiEyeOff, FiArrowLeft, FiCheck, FiShield, FiAlertCircle } from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.background};
`;

const ResetCard = styled(motion.div)`
    width: 100%;
    max-width: 440px;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xxl};
    box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
`;

const FormTitle = styled.h1`
    font-size: 2rem;
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const FormSubtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.lg};
`;

const InputGroup = styled.div`
    position: relative;
`;

const InputIcon = styled.div`
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
`;

const TogglePassword = styled.button`
    position: absolute;
    right: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    padding-left: calc(${({ theme }) => theme.spacing.md} * 3);
    padding-right: calc(${({ theme }) => theme.spacing.md} * 3);
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border: 2px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    transition: all 0.3s ease;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 0 0 3px ${({ theme }) => `${theme.colors.primary}30`};
    }
`;

const SubmitButton = styled(motion.button)`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    color: white;
    font-size: 1rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.sm};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px ${({ theme }) => theme.colors.shadow};
    }

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
    }
`;

const BackLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const StatusIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: ${({ $success, theme }) => $success ? `${theme.colors.success}15` : '#EF444415'};
    color: ${({ $success, theme }) => $success ? theme.colors.success : '#EF4444'};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

const ErrorText = styled.p`
    color: #EF4444;
    font-size: 0.875rem;
    margin: 0;
    text-align: center;
`;

const PasswordStrength = styled.div`
    display: flex;
    gap: 4px;
    margin-top: 4px;
`;

const StrengthBar = styled.div`
    height: 3px;
    flex: 1;
    border-radius: 2px;
    background: ${({ $active, $color }) => $active ? $color : '#2d2d5e'};
    transition: all 0.3s ease;
`;

const StrengthLabel = styled.span`
    font-size: 0.75rem;
    color: ${({ $color }) => $color};
    margin-top: 2px;
    display: block;
`;

function getPasswordStrength(password) {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { level: 1, label: 'Weak', color: '#EF4444' };
    if (score <= 2) return { level: 2, label: 'Fair', color: '#F59E0B' };
    if (score <= 3) return { level: 3, label: 'Good', color: '#3B82F6' };
    if (score <= 4) return { level: 4, label: 'Strong', color: '#10B981' };
    return { level: 5, label: 'Very Strong', color: '#10B981' };
}

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const strength = getPasswordStrength(password);

    if (!token) {
        return (
            <PageWrapper>
                <ResetCard
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <StatusIcon $success={false}>
                        <FiAlertCircle />
                    </StatusIcon>
                    <FormTitle>Invalid Link</FormTitle>
                    <FormSubtitle>
                        This password reset link is invalid or has expired. Please request a new one.
                    </FormSubtitle>
                    <BackLink href="/forgot-password">
                        <FiArrowLeft /> Request New Reset Link
                    </BackLink>
                </ResetCard>
            </PageWrapper>
        );
    }

    if (isSuccess) {
        return (
            <PageWrapper>
                <ResetCard
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <StatusIcon $success={true}>
                        <FiCheck />
                    </StatusIcon>
                    <FormTitle>Password Reset!</FormTitle>
                    <FormSubtitle>
                        Your password has been updated successfully. You can now sign in with your new password.
                    </FormSubtitle>
                    <SubmitButton
                        as={Link}
                        href="/login"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ textDecoration: 'none', justifyContent: 'center' }}
                    >
                        <FiShield /> Sign In
                    </SubmitButton>
                </ResetCard>
            </PageWrapper>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            });

            const data = await response.json();

            if (data.success) {
                setIsSuccess(true);
            } else {
                setError(data.error || 'Failed to reset password. Please try again.');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <PageWrapper>
            <ResetCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <FormTitle>New Password</FormTitle>
                <FormSubtitle>
                    Enter your new password below.
                </FormSubtitle>

                <Form onSubmit={handleSubmit}>
                    <div>
                        <InputGroup>
                            <InputIcon>
                                <FiLock />
                            </InputIcon>
                            <Input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                            />
                            <TogglePassword type="button" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </TogglePassword>
                        </InputGroup>
                        {password && (
                            <>
                                <PasswordStrength>
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <StrengthBar key={i} $active={i <= strength.level} $color={strength.color} />
                                    ))}
                                </PasswordStrength>
                                <StrengthLabel $color={strength.color}>{strength.label}</StrengthLabel>
                            </>
                        )}
                    </div>

                    <InputGroup>
                        <InputIcon>
                            <FiLock />
                        </InputIcon>
                        <Input
                            type={showConfirm ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                        <TogglePassword type="button" onClick={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? <FiEyeOff /> : <FiEye />}
                        </TogglePassword>
                    </InputGroup>

                    {error && <ErrorText>{error}</ErrorText>}

                    <SubmitButton
                        type="submit"
                        disabled={isLoading || password.length < 6}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? 'Resetting...' : 'Reset Password'}
                        <FiShield />
                    </SubmitButton>
                </Form>

                <BackLink href="/login">
                    <FiArrowLeft /> Back to Login
                </BackLink>
            </ResetCard>
        </PageWrapper>
    );
}
