'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    }
`;

const Container = styled.div`
    max-width: 900px;
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

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    text-align: center;
    font-size: 1.25rem;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    line-height: 1.7;
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
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};

    svg {
        font-size: 1.25rem;
    }
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

const ExampleBox = styled.div`
    background: ${({ theme, $type }) =>
        $type === 'do' ? 'rgba(16, 185, 129, 0.1)' :
            $type === 'dont' ? 'rgba(239, 68, 68, 0.1)' :
                theme.colors.backgroundAlt};
    border: 1px solid ${({ theme, $type }) =>
        $type === 'do' ? 'rgba(16, 185, 129, 0.3)' :
            $type === 'dont' ? 'rgba(239, 68, 68, 0.3)' :
                theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ExampleTitle = styled.h4`
    font-size: 1rem;
    color: ${({ $type }) =>
        $type === 'do' ? '#10B981' :
            $type === 'dont' ? '#EF4444' :
                'inherit'};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const ExampleText = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    line-height: 1.6;
    font-style: italic;
`;

const TwoColumnGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing.lg};
    margin-top: ${({ theme }) => theme.spacing.lg};

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const BrandAssetCard = styled.div`
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: ${({ theme }) => theme.spacing.lg};
    text-align: center;
`;

const BrandAssetTitle = styled.h4`
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const BrandAssetDesc = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
`;

export default function TrademarksPage() {
    return (
        <PageWrapper>
            <Container>
                <Title
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Trademark and Brand Guidelines
                </Title>
                <Subtitle>
                    Thank you for helping us protect our trademarks and brand assets
                </Subtitle>
                <LastUpdated>Last Updated: December 2024</LastUpdated>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <SectionTitle>
                        <FiInfo /> Introduction
                    </SectionTitle>
                    <Paragraph>
                        Optical Automation is grateful for the trust that people place in our products, services, and experiences. These Trademark and Brand Guidelines ("Trademark Guidelines") detail how you can help us protect Optical Automation's brand assets, including logos, names, app and product icons, and the trust that they represent. We have created these Trademark Guidelines to help clarify proper usage of our brand assets. Optical Automation reserves the right to take action as necessary to protect them and, as a result, protect its customers and the public.
                    </Paragraph>
                    <Paragraph>
                        Optical Automation's brand assets—including the Optical Automation Trademarks (as updated from time to time), logos, icons, designs, trade dress, fonts, names of Optical Automation software, products, services, sounds, emojis, and any other brand features and elements, whether registered or unregistered ("Brand Assets")—are proprietary assets owned exclusively by Optical Automation and its group of companies. These Trademark Guidelines, which may be updated from time to time, detail how our Brand Assets can be used under specific circumstances. Many uses, including our logos, app and product icons, and other designs, will require a license first. Unless you have an express license from Optical Automation, these Trademark Guidelines will exclusively govern your use of our Brand Assets.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <SectionTitle>
                        <FiX style={{ color: '#EF4444' }} /> Don'ts - Prohibited Uses
                    </SectionTitle>
                    <Paragraph>
                        Without a written license or express permission, don't do the following:
                    </Paragraph>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Business Names</ExampleTitle>
                        <ExampleText>
                            Don't use Optical Automation's Brand Assets in the name of your business, product, service, app, domain name, social media account, other offering, or business indicator.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Logos & Icons</ExampleTitle>
                        <ExampleText>
                            Don't use Optical Automation's logos, icons, or designs, in any manner without authorization.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> False Affiliation</ExampleTitle>
                        <ExampleText>
                            Don't imply an affiliation, endorsement, sponsorship, or approval with or by Optical Automation.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Alterations</ExampleTitle>
                        <ExampleText>
                            Don't alter, animate, distort, or misappropriate Optical Automation's Brand Assets, for example, by combining them with other terms, misspellings, or incorporating them into a tagline or slogan.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Nouns or Verbs</ExampleTitle>
                        <ExampleText>
                            Don't use Optical Automation's Brand Assets as nouns or verbs.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Entertainment Titles</ExampleTitle>
                        <ExampleText>
                            Don't use Optical Automation's Brand Assets in entertainment titles (including books, films, and magazines).
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Prominent Use</ExampleTitle>
                        <ExampleText>
                            Don't use Optical Automation's Brand Assets more prominently than your own brand(s) or company name.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Group Names</ExampleTitle>
                        <ExampleText>
                            Don't use Optical Automation's Brand Assets in the name of a user group, fan group, tech communities, or other organization name, irrespective of whether the group or organization is a non-profit.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Physical Products</ExampleTitle>
                        <ExampleText>
                            Don't use Optical Automation's Brand Assets on any tangible goods or packaging, including any promotional, marketing, swag, or other items.
                        </ExampleText>
                    </ExampleBox>

                    <ExampleBox $type="dont">
                        <ExampleTitle $type="dont"><FiX /> Trademark Registration</ExampleTitle>
                        <ExampleText>
                            Don't file any application or recordation to register terms or logos identical or similar to Optical Automation's Brand Assets as a trademark, service mark, trade name, or any other proprietary right.
                        </ExampleText>
                    </ExampleBox>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <SectionTitle>
                        <FiAlertCircle /> App Guidelines
                    </SectionTitle>
                    <Paragraph>
                        Without a license arrangement with Optical Automation, everything about your app (including developer name, app name, logo, description, screenshots, and other app collateral) must be unique to you and free of Optical Automation's Brand Assets. The only exception is that you may truthfully state whether your app is compatible or interoperable with an Optical Automation product or service within the text description about your app.
                    </Paragraph>
                    <Paragraph>
                        You may not use Optical Automation's Brand Assets in a manner that implies Optical Automation published, developed, endorsed, is affiliated with, or is otherwise connected with your app. Furthermore, Optical Automation's logos, designs, and icons can never be used as your app icon and can only be used in your app advertisements with a license agreement in place.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                >
                    <SectionTitle>Legal Notice</SectionTitle>
                    <Paragraph>
                        Any use of Optical Automation's Brand Assets inures solely to Optical Automation's benefit and all use must comply with these Trademark Guidelines, or other licensing/contractual arrangements with Optical Automation. Third parties, including licensees, may never claim ownership rights in Optical Automation's Brand Assets, or brands that are confusingly similar to Optical Automation's Brand Assets, in any manner, including without limitation as a trademark, service mark, company name or designation, domain name, social media profile/handle, or in any other manner.
                    </Paragraph>
                    <Paragraph>
                        Optical Automation expressly reserves the right in its sole discretion to terminate, revoke, modify, or otherwise change permission to use its Brand Assets at any time and expressly reserves the right to object to any use or misuse of its Brand Assets in any jurisdiction worldwide.
                    </Paragraph>
                </Section>

                <Section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <SectionTitle>Contact Information</SectionTitle>
                    <Paragraph>
                        If your proposed use falls outside of these Trademark Guidelines, the use is not permitted unless you seek approval from an appropriate contact within Optical Automation. If you have a question, please contact your legal counsel, Optical Automation business contact, or opticalautomation2025@gmail.com.
                    </Paragraph>
                </Section>
            </Container>
        </PageWrapper>
    );
}
