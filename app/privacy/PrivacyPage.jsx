'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

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

const Title = styled(motion.h1)`
    font-size: 3rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-align: center;

    @media (max-width: 768px) {
        font-size: 2rem;
    }
`;

const LastUpdated = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Section = styled(motion.section)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Paragraph = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    &:last-child {
        margin-bottom: 0;
    }
`;

const List = styled.ul`
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
    margin-left: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    li {
        margin-bottom: ${({ theme }) => theme.spacing.sm};
    }
`;

export default function PrivacyPage() {
    return (
        <PageWrapper>
            <Container>
                <Title
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Privacy Policy
                </Title>
                <LastUpdated>Last Updated: December 2024</LastUpdated>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <SectionTitle>1. Information We Collect</SectionTitle>
                    <Paragraph>
                        At Optical Automation, LLC (hereinafter referred to as "The Company"), we collect information to provide and improve our services. The types of information we collect include:
                    </Paragraph>
                    <List>
                        <li>Personal information you provide (name, email address)</li>
                        <li>Account preferences and settings</li>
                        <li>Usage data and analytics</li>
                        <li>Device and browser information</li>
                        <li>Cookies and similar tracking technologies</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionTitle>2. How We Use Your Information</SectionTitle>
                    <Paragraph>
                        We use the information we collect to:
                    </Paragraph>
                    <List>
                        <li>Provide, maintain, and improve our services</li>
                        <li>Personalize your experience</li>
                        <li>Communicate with you about updates and offers</li>
                        <li>Analyze usage patterns and trends</li>
                        <li>Protect against fraud and abuse</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <SectionTitle>6. Payment Information</SectionTitle>
                    <Paragraph>
                        When you subscribe to our paid services (individual subscriptions or business licensing), payment processing is handled securely by Stripe, our third-party payment processor. We do not store your complete credit card information on our servers.
                    </Paragraph>
                    <Paragraph>
                        Information collected during payment includes:
                    </Paragraph>
                    <List>
                        <li>Billing name and address</li>
                        <li>Last four digits of your credit card (for reference)</li>
                        <li>Payment transaction history</li>
                        <li>Subscription tier or business licensing level</li>
                        <li><strong>All software purchased items are non-refundable according to the Terms Of Usage, Content Policy, and Privacy Policy</strong></li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <SectionTitle>7. Individual Subscription Data</SectionTitle>
                    <Paragraph>
                        For individual subscribers, we collect and store:
                    </Paragraph>
                    <List>
                        <li>Selected subscription tier (Individual, Silver, or Gold)</li>
                        <li>Software applications you have selected to access</li>
                        <li>Subscription start and end dates</li>
                        <li>Usage statistics for selected applications</li>
                        <li>Payment history (all software purchased items are non-refundable)</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <SectionTitle>8. Business Licensing Data</SectionTitle>
                    <Paragraph>
                        For organizations with business licenses, we additionally collect:
                    </Paragraph>
                    <List>
                        <li>Organization name and contact information</li>
                        <li>Business licensing tier (Standard, Silver, or Gold)</li>
                        <li>Number of user licenses purchased (25 or 50)</li>
                        <li>Individual user accounts associated with the business license</li>
                        <li>Software titles included in the business license</li>
                        <li>Payment and billing information (all software purchased items are non-refundable)</li>
                        <li>Usage statistics across all licensed users</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <SectionTitle>9. Third-Party Services</SectionTitle>
                    <Paragraph>
                        We use the following third-party services that may collect information about you:
                    </Paragraph>
                    <List>
                        <li><strong>Stripe</strong> - Payment processing and subscription management</li>
                        <li><strong>Analytics Services</strong> - To understand how users interact with our software</li>
                        <li><strong>Cloud Hosting</strong> - To store and deliver our applications and content</li>
                    </List>
                    <Paragraph>
                        These third-party services have their own privacy policies and we encourage you to review them. We only share information necessary for these services to function and require them to protect your data.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <SectionTitle>9. Your Rights</SectionTitle>
                    <Paragraph>
                        You have the right to:
                    </Paragraph>
                    <List>
                        <li>Access and receive a copy of your personal data</li>
                        <li>Rectify or update your personal information</li>
                        <li>Request deletion of your personal data</li>
                        <li>Object to processing of your personal data</li>
                        <li>Withdraw consent at any time</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                >
                    <SectionTitle>10. Contact Us</SectionTitle>
                    <Paragraph>
                        If you have any questions about this Privacy Policy, please contact us at opticalautomation2025@gmail.com.
                    </Paragraph>
                </Section>
            </Container>
        </PageWrapper>
    );
}
