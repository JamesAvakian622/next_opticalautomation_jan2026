'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMail, FiLock, FiUser, FiArrowRight, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.background};
`;

const LoginCard = styled(motion.div)`
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

const TabContainer = styled.div`
    display: flex;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    padding: 4px;
`;

const Tab = styled.button`
    flex: 1;
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-weight: 600;
    transition: all 0.3s ease;
    background: ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
    color: ${({ $active }) => ($active ? 'white' : 'inherit')};

    &:hover {
        color: ${({ $active, theme }) => ($active ? 'white' : theme.colors.primary)};
    }
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

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    padding-left: calc(${({ theme }) => theme.spacing.md} * 3);
    padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? '48px' : 'inherit')};
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

    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const PasswordToggle = styled.button`
    position: absolute;
    right: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    padding: 4px;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
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
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
`;

const ErrorMessage = styled(motion.div)`
    background: ${({ theme }) => `${theme.colors.error}20`};
    border: 1px solid ${({ theme }) => theme.colors.error};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    padding: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.error};
    text-align: center;
    font-size: 0.875rem;
`;

const SuccessMessage = styled(ErrorMessage)`
    background: ${({ theme }) => `${theme.colors.success}20`};
    border-color: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.success};
`;

const DemoCredentials = styled.div`
    margin-top: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;

    strong {
        color: ${({ theme }) => theme.colors.text};
    }
`;

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { login, register } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            if (isLogin) {
                const result = await login(formData.email, formData.password);
                if (result.success) {
                    setSuccess('Login successful! Redirecting...');
                    setTimeout(() => router.push('/select-software'), 1500);
                } else {
                    setError(result.error);
                }
            } else {
                if (!formData.name.trim()) {
                    setError('Please enter your name');
                    setIsLoading(false);
                    return;
                }
                const result = await register(formData.email, formData.password, formData.name);
                if (result.success) {
                    setSuccess('Account created! Redirecting...');
                    setTimeout(() => router.push('/select-software'), 1500);
                } else {
                    setError(result.error);
                }
            }
        } catch (err) {
            setError('An unexpected error occurred');
        }

        setIsLoading(false);
    };

    return (
        <PageWrapper>
            <LoginCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <FormTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</FormTitle>
                <FormSubtitle>
                    {isLogin
                        ? 'Sign in to access your account'
                        : 'Join Optical Automation today'}
                </FormSubtitle>

                <TabContainer>
                    <Tab $active={isLogin} onClick={() => setIsLogin(true)}>
                        Login
                    </Tab>
                    <Tab $active={!isLogin} onClick={() => setIsLogin(false)}>
                        Register
                    </Tab>
                </TabContainer>

                <Form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <InputGroup>
                            <InputIcon>
                                <FiUser />
                            </InputIcon>
                            <Input
                                type="text"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                            />
                        </InputGroup>
                    )}

                    <InputGroup>
                        <InputIcon>
                            <FiMail />
                        </InputIcon>
                        <Input
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                            required
                        />
                    </InputGroup>

                    <InputGroup>
                        <InputIcon>
                            <FiLock />
                        </InputIcon>
                        <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                            required
                            $hasRightIcon
                        />
                        <PasswordToggle
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </PasswordToggle>
                    </InputGroup>

                    {error && (
                        <ErrorMessage
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {error}
                        </ErrorMessage>
                    )}

                    {success && (
                        <SuccessMessage
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {success}
                        </SuccessMessage>
                    )}

                    <SubmitButton
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
                        <FiArrowRight />
                    </SubmitButton>
                </Form>
            </LoginCard>
        </PageWrapper>
    );
}
