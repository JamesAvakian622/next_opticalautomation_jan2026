'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiSend, FiShield } from 'react-icons/fi';

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

const Input = styled.input`
    width: 100%;
    padding: ${({ theme }) => theme.spacing.md};
    padding-left: calc(${({ theme }) => theme.spacing.md} * 3);
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

const SuccessView = styled(motion.div)`
    text-align: center;
`;

const SuccessIcon = styled.div`
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: ${({ theme }) => `${theme.colors.success}15`};
    color: ${({ theme }) => theme.colors.success};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
`;

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitted(true);
        setIsLoading(false);
    };

    if (isSubmitted) {
        return (
            <PageWrapper>
                <ResetCard
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <SuccessView>
                        <SuccessIcon>
                            <FiShield />
                        </SuccessIcon>
                        <FormTitle>Email Sent</FormTitle>
                        <FormSubtitle>
                            We've sent password reset instructions to <strong>{email}</strong>
                        </FormSubtitle>
                        <BackLink href="/login">
                            <FiArrowLeft /> Back to Login
                        </BackLink>
                    </SuccessView>
                </ResetCard>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <ResetCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <FormTitle>Reset Password</FormTitle>
                <FormSubtitle>
                    Enter your email address and we'll send you instructions to reset your password.
                </FormSubtitle>

                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputIcon>
                            <FiMail />
                        </InputIcon>
                        <Input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </InputGroup>

                    <SubmitButton
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                        <FiSend />
                    </SubmitButton>
                </Form>

                <BackLink href="/login">
                    <FiArrowLeft /> Back to Login
                </BackLink>
            </ResetCard>
        </PageWrapper>
    );
}
