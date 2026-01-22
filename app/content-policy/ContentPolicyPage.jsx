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

export default function ContentPolicyPage() {
    return (
        <PageWrapper>
            <Container>
                <Title
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Content Policy
                </Title>
                <LastUpdated>Last Updated: December 2024</LastUpdated>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <SectionTitle>1. Overview</SectionTitle>
                    <Paragraph>
                        This Content Policy outlines the guidelines and standards for all content displayed on the Optical Automation, LLC (hereinafter referred to as "The Company") platform. Our goal is to maintain a professional, inclusive, and respectful environment for all users.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionTitle>2. Prohibited Content</SectionTitle>
                    <Paragraph>
                        The following types of content are strictly prohibited on our platform:
                    </Paragraph>
                    <List>
                        <li>Content that promotes violence, harassment, or discrimination</li>
                        <li>Misleading or deceptive information</li>
                        <li>Content that infringes on intellectual property rights</li>
                        <li>Spam or malicious content</li>
                        <li>Adult or explicit material</li>
                        <li>Content that violates any applicable laws</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <SectionTitle>3. User-Generated Content</SectionTitle>
                    <Paragraph>
                        If you submit content to our platform, you represent and warrant that you have the necessary rights to share that content. By submitting content, you grant The Company a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <SectionTitle>4. Intellectual Property</SectionTitle>
                    <Paragraph>
                        All content on this website, including but not limited to text, graphics, logos, images, and software, is the property of The Company or its content suppliers and is protected by copyright and other intellectual property laws.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <SectionTitle>5. Content Moderation</SectionTitle>
                    <Paragraph>
                        We reserve the right to review, modify, or remove any content that violates this policy or that we deem inappropriate. Users who repeatedly violate this policy may have their accounts suspended or terminated.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <SectionTitle>5. Individual Subscription Content</SectionTitle>
                    <Paragraph>
                        Content available through our individual subscription service is provided for the exclusive use of subscribers. Subscribers agree to the following:
                    </Paragraph>
                    <List>
                        <li>Content and software access is limited to the subscription period</li>
                        <li>Sharing subscription credentials or access with non-subscribers is prohibited</li>
                        <li>Screenshots, recordings, or redistribution of subscription content is not permitted</li>
                        <li>All software and content remains the intellectual property of The Company</li>
                        <li>All software purchased items are non-refundable according to the Terms Of Usage, Content Policy, and Privacy Policy</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <SectionTitle>6. Business Licensing Content</SectionTitle>
                    <Paragraph>
                        Organizations with business licenses must adhere to additional usage terms:
                    </Paragraph>
                    <List>
                        <li>Software access is limited to the number of licensed users (25 or 50 depending on tier)</li>
                        <li>User licenses are non-transferable and must be assigned to specific individuals</li>
                        <li>Sharing login credentials between users is strictly prohibited</li>
                        <li>Business licenses do not permit resale or sublicensing of software access</li>
                        <li>All software purchased items are non-refundable according to the Terms Of Usage, Content Policy, and Privacy Policy</li>
                        <li>Organizations must maintain accurate records of licensed users</li>
                    </List>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <SectionTitle>7. Software Usage</SectionTitle>
                    <Paragraph>
                        Subscribers must use our software applications in accordance with the following acceptable use policy:
                    </Paragraph>
                    <List>
                        <li>Software is for personal or business use only, as specified in your subscription</li>
                        <li>Do not attempt to reverse engineer, decompile, or extract source code</li>
                        <li>Do not use software for illegal activities or to violate any laws</li>
                        <li>Do not attempt to bypass security measures or access restrictions</li>
                        <li>Do not use software in a way that could damage, disable, or impair our services</li>
                        <li>Respect the intended use and limitations of each application</li>
                    </List>
                    <Paragraph>
                        Violations of this software usage policy may result in immediate suspension or termination of your subscription without refund.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <SectionTitle>7. Content Moderation</SectionTitle>
                    <Paragraph>
                        We reserve the right to review, modify, or remove any content that violates this policy or that we deem inappropriate. Users who repeatedly violate this policy may have their accounts suspended or terminated.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <SectionTitle>8. Reporting Violations</SectionTitle>
                    <Paragraph>
                        If you encounter content that you believe violates this policy, please report it to us at opticalautomation2025@gmail.com. We take all reports seriously and will investigate promptly.
                    </Paragraph>
                </Section>
            </Container>
        </PageWrapper >
    );
}
