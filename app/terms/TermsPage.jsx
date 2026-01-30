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

export default function TermsPage() {
    return (
        <PageWrapper>
            <Container>
                <Title
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Terms of Use
                </Title>
                <LastUpdated>Last Updated: December 2024</LastUpdated>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <SectionTitle>1. Acceptance of Terms</SectionTitle>
                    <Paragraph>
                        By accessing and using the Optical Automation, LLC (hereinafter referred to as "The Company") website and services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by these terms, please do not use our services.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionTitle>2. Use License</SectionTitle>
                    <Paragraph>
                        Permission is granted to temporarily access the materials on The Company's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                    </Paragraph>
                    <List>
                        <li>Modify or copy the materials</li>
                        <li>Use the materials for any commercial purpose</li>
                        <li>Attempt to decompile or reverse engineer any software</li>
                        <li>Remove any copyright or proprietary notations</li>
                        <li>Transfer the materials to another person</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <SectionTitle>3. Disclaimer</SectionTitle>
                    <Paragraph>
                        The materials on The Company's website are provided on an 'as is' basis. The Company makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <SectionTitle>4. Limitations</SectionTitle>
                    <Paragraph>
                        In no event shall The Company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on The Company's website.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <SectionTitle>5. Individual Subscription Terms</SectionTitle>
                    <Paragraph>
                        The Company offers individual subscription-based access to our software applications at various tiers: Individual (Free), Silver ($25/year), and Gold ($35/year). By subscribing, you agree to the following terms:
                    </Paragraph>
                    <List>
                        <li>Subscriptions are billed annually and automatically renew unless cancelled</li>
                        <li>You may cancel your subscription at any time through your account settings</li>
                        <li>Access to software is granted for the duration of your active subscription</li>
                        <li>Pricing is subject to change with 30 days notice to existing subscribers</li>
                        <li>All subscription features and software titles are subject to availability</li>
                        <li><strong>All software purchased items are non-refundable according to the Terms Of Usage, Content Policy, and Privacy Policy</strong> - please review your tier selection carefully before purchasing</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <SectionTitle>6. Free Trial</SectionTitle>
                    <Paragraph>
                        All new users receive a 30-day free trial with access to all software applications. The free trial terms are:
                    </Paragraph>
                    <List>
                        <li>30-day access to all software titles in our catalog</li>
                        <li>No credit card required for the free trial period</li>
                        <li>Trial automatically expires after 30 days unless a paid subscription is activated</li>
                        <li>One free trial per user account</li>
                        <li>Full functionality during the trial period with no limitations</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <SectionTitle>7. Business Licensing Terms</SectionTitle>
                    <Paragraph>
                        The Company offers business and multi-user licensing options for organizations. Business licensing includes:
                    </Paragraph>
                    <List>
                        <li><strong>Standard Tier:</strong> $125/year for 1 software title with up to 25 user licenses</li>
                        <li><strong>Silver Tier:</strong> $125/year for DeskView Series (8 applications) with up to 25 user licenses</li>
                        <li><strong>Gold Tier:</strong> $250/year for all 40 software titles with up to 50 user licenses</li>
                        <li>Business licenses are billed annually and automatically renew unless cancelled</li>
                        <li>User licenses may not be shared or transferred between individuals</li>
                        <li>Organizations requiring more than 50 users should contact sales for enterprise pricing</li>
                        <li><strong>All software purchased items are non-refundable according to the Terms Of Usage, Content Policy, and Privacy Policy</strong> - please review your licensing needs carefully</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <SectionTitle>8. Refund Policy</SectionTitle>
                    <Paragraph>
                        <strong>All sales are final. All software purchased items are non-refundable according to the Terms Of Usage, Content Policy, and Privacy Policy.</strong> This applies to both individual subscriptions and business licensing purchases. We do not offer refunds, credits, or prorated billing for any subscription or license purchases. Please carefully review your subscription tier, business licensing option, and selected software before completing your purchase. The 30-day free trial period (for individual users) allows you to evaluate our software before committing to a paid subscription.
                    </Paragraph>
                    <Paragraph>
                        Exceptions may be made at our sole discretion in cases of technical issues that prevent access to purchased services, billing errors, or other extraordinary circumstances.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <SectionTitle>9. Software Access</SectionTitle>
                    <Paragraph>
                        Your subscription or business license grants you access to the software applications included in your selected tier. Software access terms:
                    </Paragraph>
                    <List>
                        <li>Software is provided on an "as-is" basis</li>
                        <li>Web-based applications accessible through supported browsers</li>
                        <li>iOS mobile applications (available August 2026) at no additional cost</li>
                        <li>Regular updates and new features as they become available</li>
                        <li>Technical support appropriate to your subscription tier</li>
                        <li>Access to all current and future software in our catalog during your subscription period</li>
                    </List>
                    <Paragraph>
                        Software access is for personal or business use as specified in your subscription. Sharing account credentials or redistributing software is strictly prohibited.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                >
                    <SectionTitle>9. Revisions</SectionTitle>
                    <Paragraph>
                        The Company may revise these terms of use at any time without notice. By using this website you are agreeing to be bound by the current version of these terms of use.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                >
                    <SectionTitle>10. Contact Information</SectionTitle>
                    <Paragraph>
                        If you have any questions about these Terms of Use, please contact us at opticalautomation2025@gmail.com.
                    </Paragraph>
                </Section>
            </Container>
        </PageWrapper>
    );
}
