'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiBook, FiFileText, FiLayout, FiShield, FiCpu, FiAlertTriangle, FiCheckCircle, FiClock, FiGlobe, FiTarget, FiAward, FiLayers, FiTrendingUp } from 'react-icons/fi';

const PageContainer = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
    padding: 120px 20px 60px;
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const Header = styled.header`
    text-align: center;
    margin-bottom: 60px;
`;

const Badge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${({ theme }) => `${theme.colors.primary}20`};
    color: ${({ theme }) => theme.colors.primary};
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 15px;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
`;

const Subtitle = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 700px;
    margin: 0 auto;
`;

const TabContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 40px;
    flex-wrap: wrap;
`;

const TabButton = styled.button`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1rem;
    border: 2px solid ${({ $active, theme }) => $active ? theme.colors.primary : theme.colors.border};
    background: ${({ $active, theme }) => $active ? theme.colors.primary : 'transparent'};
    color: ${({ $active, theme }) => $active ? '#fff' : theme.colors.text};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        background: ${({ $active, theme }) => $active ? theme.colors.primary : `${theme.colors.primary}10`};
    }

    svg {
        font-size: 1.2rem;
    }
`;

const ContentSection = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border-radius: 20px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 40px;
    margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const SlideGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
`;

const SlideCard = styled.div`
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 16px;
    padding: 25px;
    border-left: 4px solid ${({ $color }) => $color || '#6366f1'};
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    }
`;

const SlideNumber = styled.span`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: ${({ $color }) => $color || '#6366f1'};
    color: #fff;
    border-radius: 8px;
    font-weight: 700;
    font-size: 0.9rem;
    margin-bottom: 12px;
`;

const SlideTitle = styled.h3`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 12px;
`;

const SlidePoints = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const SlidePoint = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.1rem;
    line-height: 1.6;

    svg {
        color: ${({ $color }) => $color || '#6366f1'};
        font-size: 0.5rem;
        margin-top: 8px;
        flex-shrink: 0;
    }
`;

const PartSection = styled.div`
    margin-bottom: 40px;
`;

const PartHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
    margin-bottom: 25px;
    padding: 20px;
    background: ${({ $gradient }) => $gradient || 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'};
    border-radius: 16px;
    color: #fff;
`;

const PartIcon = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,0.2);
    border-radius: 12px;
    font-size: 1.5rem;
`;

const PartTitle = styled.div`
    h3 {
        font-size: 1.3rem;
        font-weight: 700;
        margin-bottom: 4px;
    }
    span {
        font-size: 0.85rem;
        opacity: 0.8;
    }
`;

const ChapterList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const ChapterCard = styled.div`
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 12px;
    padding: 20px;
    border-left: 4px solid ${({ $color }) => $color || '#6366f1'};
`;

const ChapterHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 15px;
`;

const ChapterNum = styled.span`
    background: ${({ $color }) => `${$color}30` || '#6366f130'};
    color: ${({ $color }) => $color || '#6366f1'};
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
`;

const ChapterTitle = styled.h4`
    font-size: 1.05rem;
    color: ${({ theme }) => theme.colors.text};
    flex: 1;
`;

const ChapterPages = styled.span`
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const TopicGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px 20px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const TopicItem = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 1.15rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 6px 0;
    line-height: 1.6;

    svg {
        color: ${({ $color }) => $color || '#6366f1'};
        font-size: 0.5rem;
        margin-top: 8px;
        flex-shrink: 0;
    }
`;

const TimelineSection = styled.div`
    position: relative;
    padding-left: 30px;
`;

const TimelineLine = styled.div`
    position: absolute;
    left: 8px;
    top: 10px;
    bottom: 10px;
    width: 3px;
    background: ${({ theme }) => theme.colors.gradient};
    border-radius: 2px;
`;

const TimelineItem = styled.div`
    position: relative;
    padding: 15px 0;
`;

const TimelineDot = styled.div`
    position: absolute;
    left: -26px;
    top: 20px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${({ $color }) => $color || '#6366f1'};
    border: 3px solid ${({ theme }) => theme.colors.surface};
`;

const TimelineLabel = styled.div`
    font-weight: 700;
    color: ${({ $color }) => $color || '#6366f1'};
    font-size: 1.2rem;
    margin-bottom: 8px;
`;

const TimelineContent = styled.div`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.1rem;
    line-height: 1.7;
`;

const DefinitionCard = styled.div`
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 15px;
    border-left: 4px solid ${({ $safe }) => $safe ? '#10b981' : '#ef4444'};
`;

const DefinitionTitle = styled.h4`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 12px;

    svg {
        color: ${({ $safe }) => $safe ? '#10b981' : '#ef4444'};
    }
`;

const DefinitionList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const DefinitionItem = styled.li`
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 8px 0;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.1rem;
    line-height: 1.6;

    svg {
        color: ${({ $safe }) => $safe ? '#10b981' : '#ef4444'};
        font-size: 1rem;
        margin-top: 4px;
    }
`;

// Data for Appendix A - Slide Deck
const slideData = [
    { num: 1, title: 'Title Slide', color: '#6366f1', points: ['Intellectual Property Responsibilities in the Age of No‑Code and AI'] },
    { num: 2, title: 'The New Creative Landscape', color: '#06b6d4', points: ['No‑code tools', 'AI‑assisted development', 'Market saturation', 'Lower barriers, higher competition'] },
    { num: 3, title: 'Why Responsibility Matters', color: '#10b981', points: ['Economic value of creative assets', 'Legal risks', 'Ethical obligations'] },
    { num: 4, title: 'Copyright Basics', color: '#f59e0b', points: ["What's protected", 'Automatic protection', 'Benefits of registration'] },
    { num: 5, title: 'Trademark Essentials', color: '#ef4444', points: ['Names, logos, slogans', 'Registration process', 'Long‑term brand protection'] },
    { num: 6, title: 'Application Requirements', color: '#8b5cf6', points: ['Copyright', 'Trademark', 'Timelines'] },
    { num: 7, title: 'Risks of Delaying Registration', color: '#ec4899', points: ['Lost rights', 'Investor hesitation', 'Copycats', 'International issues'] },
    { num: 8, title: 'AI‑Driven Development', color: '#14b8a6', points: ['Licensing', 'Data privacy', 'Transparency', 'Maintenance'] },
    { num: 9, title: 'Long‑Term IP Strategy', color: '#f97316', points: ['Register assets', 'Use NDAs', 'Track ownership', 'Respect open‑source licenses'] },
    { num: 10, title: 'Maintenance Plan', color: '#06b6d4', points: ['Day One', 'Days 3–6', 'Week 1–2', 'Six‑Year Trademark Renewal'] },
    { num: 11, title: 'Closing', color: '#10b981', points: ['The future belongs to responsible creators.'] }
];

// Data for Appendix B - Book Outline
const bookParts = [
    {
        title: 'Foundations of Intellectual Property',
        num: 'I',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        icon: FiShield,
        color: '#8b5cf6',
        chapters: [
            { num: 1, title: 'Why Responsibility Matters', pages: '10–20', topics: ['Economic value of digital creation', 'How digital distribution changed ownership', 'Why responsibility is the new professional currency', 'Case studies of IP misuse', 'The dual responsibility', 'Ethics of creation in a global market', 'Client perception through IP behavior', 'Hidden risks of "move fast" culture', 'Responsibility differentiates you', 'Future of responsibility in AI'] },
            { num: 2, title: 'Copyright Essentials', pages: '10–20', topics: ['What copyright protects (deep dive)', 'What copyright does not protect', 'Copyright in software vs. creative', 'How copyright arises automatically', 'Why registration matters', 'Copyright in AI‑generated content', 'Copyright in collaborative work', 'Copyright in derivative works', 'International copyright', 'Copyright myths'] },
            { num: 3, title: 'Trademark Protection', pages: '10–20', topics: ['What trademarks protect', 'Psychology of brand identity', 'Trademarks build trust & value', 'Difference between ™ and ®', 'Choosing a strong name', 'Trademark classes', 'Global trademark strategy', 'Common conflicts', 'Monitor and enforce', 'Case studies'] },
            { num: 4, title: 'The Application Process', pages: '10–20', topics: ['Copyright application walkthrough', 'Trademark application walkthrough', 'Filing fees & timelines', 'Prepare your materials', 'Avoid office actions', 'Respond to objections', 'When to hire an attorney', 'Track your applications', 'International filings', 'Pre vs. post‑publication filing'] }
        ]
    },
    {
        title: 'The Modern Creative Landscape',
        num: 'II',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
        icon: FiCpu,
        color: '#06b6d4',
        chapters: [
            { num: 5, title: 'The Rise of No‑Code and AI', pages: '10–20', topics: ['Democratization of software', 'No‑code changed talent landscape', 'Rise of AI‑assisted creation', 'New competition: millions of creators', 'Benefits and dangers of speed', 'No‑code requires more responsibility', 'AI changes authorship & ownership', 'New professional hierarchy', 'Future of no‑code and AI', 'Stand out in saturated market'] },
            { num: 6, title: 'Ethical Responsibilities in AI Development', pages: '10–20', topics: ['Ethics of AI‑generated content', 'Unintentional plagiarism', 'Bias, fairness, transparency', 'Responsibility to validate AI', 'Ethics of client communication', 'Ethics of automation', 'Ethics of data usage', 'Ethics of training data', 'Ethics of attribution', 'Building ethical AI practice'] },
            { num: 7, title: 'The Risks of Neglect', pages: '10–20', topics: ['Legal risks', 'Financial risks', 'Reputational risks', 'Client trust risks', 'Platform dependency risks', 'Open‑source misuse risks', 'Trademark conflict risks', 'Copyright infringement risks', 'Case studies of creators who lost', 'Avoid every major category of risk'] }
        ]
    },
    {
        title: 'Building a Professional IP Strategy',
        num: 'III',
        gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        icon: FiTarget,
        color: '#10b981',
        chapters: [
            { num: 8, title: 'Long‑Term IP Strategy', pages: '10–20', topics: ['Build an IP portfolio', 'Prioritize what to register', 'Track your assets', 'Create an IP calendar', 'Build a defensible brand', 'Create licensing opportunities', 'Protect internationally', 'Build a long‑term legal moat', 'Integrate IP into business model', 'Future‑proof your IP strategy'] },
            { num: 9, title: 'Licensing, Ownership, and Documentation', pages: '10–20', topics: ['Types of licenses (MIT, GPL, etc.)', 'Choose the right license', 'Write your own license', 'Document ownership', 'Track contributions', 'Manage client IP', 'Avoid ownership disputes', 'Structure contracts', 'Handle joint ownership', 'Licensing in AI content'] },
            { num: 10, title: 'Open‑Source and Third‑Party Compliance', pages: '10–20', topics: ['Understanding open‑source licenses', 'Dangers of license incompatibility', 'Audit your codebase', 'Track third‑party components', 'Comply with attribution', 'Avoid viral license contamination', 'Use open‑source safely', 'Build compliance checklist', 'Handle license violations', 'Case studies of lawsuits'] }
        ]
    },
    {
        title: 'Business Formation & Digital Infrastructure',
        num: 'IV',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        icon: FiLayers,
        color: '#f59e0b',
        chapters: [
            { num: 11, title: 'LLC Formation and Legal Readiness', pages: '10–20', topics: ['Why form an LLC', 'Liability protection', 'Tax considerations', 'How to form an LLC', 'Operating agreements', 'EIN, bank accounts, compliance', 'How LLCs protect IP', 'Structure ownership', 'Prepare for investors', 'Maintain legal readiness'] },
            { num: 12, title: 'Domain Strategy and Brand Value', pages: '10–20', topics: ['Domains create brand value', 'Choose a strong domain', 'Evaluate domain worth', 'Negotiate domain purchases', 'Protect your domains', 'Build a domain portfolio', 'Avoid cybersquatting', 'Use domains in branding', 'Integrate domains with trademarks', 'Case studies of million‑dollar domains'] },
            { num: 13, title: 'Pre‑Publication Steps', pages: '10–20', topics: ['Pre‑launch legal checklist', 'Pre‑launch branding checklist', 'Pre‑launch domain checklist', 'Pre‑launch copyright checklist', 'Pre‑launch trademark checklist', 'Prepare your product legally', 'Avoid pre‑launch conflicts', 'Prepare for public release', 'Secure early protection', 'Build a launch‑ready legal foundation'] }
        ]
    },
    {
        title: 'Maintenance, Renewal, and Longevity',
        num: 'V',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
        icon: FiTrendingUp,
        color: '#ec4899',
        chapters: [
            { num: 14, title: 'Maintenance Planning for No‑Code Systems', pages: '10–20', topics: ['Why no‑code systems break', 'Build a maintenance plan', 'Track dependencies', 'Handle platform updates', 'Document workflows', 'Create fallback systems', 'Build long‑term stability', 'Maintain client systems', 'Price maintenance packages', 'Future‑proof no‑code builds'] },
            { num: 15, title: 'Six‑Year Trademark Renewal', pages: '10–20', topics: ['Why renewal matters', 'Renewal timelines', 'Renewal documentation', 'Maintain active use', 'Avoid abandonment', 'Monitor infringement', 'Enforce your mark', 'Prepare for renewal', 'Maintain brand value', 'International renewal'] },
            { num: 16, title: 'Sustaining Your Digital Assets', pages: '10–20', topics: ['Maintain your IP portfolio', 'Track renewals', 'Update your assets', 'Protect your brand long‑term', 'Evolve your strategy', 'Maintain legal compliance', 'Monitor the market', 'Protect against copycats', 'Build a legacy brand', 'Future of digital asset protection'] }
        ]
    }
];

// Data for Appendix C - Maintenance Plan & Definitions
const maintenanceTimeline = [
    { label: 'Day One', color: '#6366f1', content: 'Build initial structure: Header, Menu, Categories, Sub-categories. Create Terms of Usage, Privacy Policy, Content Policy. Establish Copyright as LLC (LegalZoom recommended).' },
    { label: 'Days 3–6', color: '#06b6d4', content: 'Register as LLC. Complete business plans and Use of Funds. Check domain availability (.com, .net). Evaluate domain worth. Research ownership costs ($200 – $50,000+). Polish software and add details.' },
    { label: 'Week 1–2', color: '#10b981', content: 'Collect funds and pay for software/domains. Submit Pre-publish U.S. Copyright and Trademarks. In 6–9 months, applications will be accepted or denied. Check for trademark conflicts.' },
    { label: 'Six Years', color: '#f59e0b', content: 'Pay U.S. Patent and Trademark Office to renew. Keep displayed work and marks active or they expire. Registration stays available for public viewing permanently.' }
];

export default function GuidesPage() {
    const [activeTab, setActiveTab] = useState('appendix-a');

    return (
        <PageContainer>
            <Container>
                <Header>
                    <Badge><FiBook /> IP GUIDES</Badge>
                    <Title>Intellectual Property Guides</Title>
                    <Subtitle>Comprehensive resources for understanding and protecting your intellectual property in the age of no-code and AI development.</Subtitle>
                </Header>

                <TabContainer>
                    <TabButton $active={activeTab === 'appendix-a'} onClick={() => setActiveTab('appendix-a')}>
                        <FiLayout /> Appendix A — Slide Deck
                    </TabButton>
                    <TabButton $active={activeTab === 'appendix-b'} onClick={() => setActiveTab('appendix-b')}>
                        <FiBook /> Appendix B — Book Outline
                    </TabButton>
                    <TabButton $active={activeTab === 'appendix-c'} onClick={() => setActiveTab('appendix-c')}>
                        <FiFileText /> Appendix C — Plan & Definitions
                    </TabButton>
                </TabContainer>

                {/* Appendix A - Slide Deck */}
                {activeTab === 'appendix-a' && (
                    <ContentSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <SectionTitle><FiLayout /> Appendix A — Presentation Slide Deck Outline</SectionTitle>
                        <SlideGrid>
                            {slideData.map(slide => (
                                <SlideCard key={slide.num} $color={slide.color}>
                                    <SlideNumber $color={slide.color}>{slide.num}</SlideNumber>
                                    <SlideTitle>{slide.title}</SlideTitle>
                                    <SlidePoints>
                                        {slide.points.map((point, idx) => (
                                            <SlidePoint key={idx} $color={slide.color}>
                                                {point}
                                            </SlidePoint>
                                        ))}
                                    </SlidePoints>
                                </SlideCard>
                            ))}
                        </SlideGrid>
                    </ContentSection>
                )}

                {/* Appendix B - Book Outline */}
                {activeTab === 'appendix-b' && (
                    <ContentSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <SectionTitle><FiBook /> Appendix B — Complete Book Outline</SectionTitle>
                        {bookParts.map(part => (
                            <PartSection key={part.num}>
                                <PartHeader $gradient={part.gradient}>
                                    <PartIcon><part.icon /></PartIcon>
                                    <PartTitle>
                                        <span>PART {part.num}</span>
                                        <h3>{part.title}</h3>
                                    </PartTitle>
                                </PartHeader>
                                <ChapterList>
                                    {part.chapters.map(chapter => (
                                        <ChapterCard key={chapter.num} $color={part.color}>
                                            <ChapterHeader>
                                                <ChapterNum $color={part.color}>CH {chapter.num}</ChapterNum>
                                                <ChapterTitle>{chapter.title}</ChapterTitle>
                                                <ChapterPages>{chapter.pages} pages</ChapterPages>
                                            </ChapterHeader>
                                            <TopicGrid>
                                                {chapter.topics.map((topic, idx) => (
                                                    <TopicItem key={idx} $color={part.color}>
                                                        {topic}
                                                    </TopicItem>
                                                ))}
                                            </TopicGrid>
                                        </ChapterCard>
                                    ))}
                                </ChapterList>
                            </PartSection>
                        ))}
                    </ContentSection>
                )}

                {/* Appendix C - Plan & Definitions */}
                {activeTab === 'appendix-c' && (
                    <ContentSection initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <SectionTitle><FiFileText /> Appendix C — Maintenance Plan & Copyright Definitions</SectionTitle>

                        <h3 style={{ color: 'inherit', marginBottom: '20px', fontSize: '1.3rem' }}>
                            <FiClock style={{ marginRight: '10px', color: '#6366f1' }} />
                            Maintenance Timeline
                        </h3>
                        <TimelineSection>
                            <TimelineLine />
                            {maintenanceTimeline.map((item, idx) => (
                                <TimelineItem key={idx}>
                                    <TimelineDot $color={item.color} />
                                    <TimelineLabel $color={item.color}>{item.label}</TimelineLabel>
                                    <TimelineContent>{item.content}</TimelineContent>
                                </TimelineItem>
                            ))}
                        </TimelineSection>

                        <div style={{ marginTop: '50px' }}>
                            <h3 style={{ color: 'inherit', marginBottom: '20px', fontSize: '1.3rem' }}>
                                <FiGlobe style={{ marginRight: '10px', color: '#10b981' }} />
                                Copyright Definitions — Building a Legally Safe History Website
                            </h3>

                            <DefinitionCard $safe={true}>
                                <DefinitionTitle $safe={true}><FiCheckCircle /> What You Can Use Without Infringement</DefinitionTitle>
                                <DefinitionList>
                                    <DefinitionItem $safe={true}><FiCheckCircle /> Historical facts — Dates, events, timelines, inventions, wars, discoveries are public domain</DefinitionItem>
                                    <DefinitionItem $safe={true}><FiCheckCircle /> Your own writing — Original text you or your AI software writes is yours</DefinitionItem>
                                    <DefinitionItem $safe={true}><FiCheckCircle /> Public domain sources — Anything published in the U.S. before 1929 (as of 2025)</DefinitionItem>
                                </DefinitionList>
                            </DefinitionCard>

                            <DefinitionCard $safe={false}>
                                <DefinitionTitle $safe={false}><FiAlertTriangle /> What You Must Avoid</DefinitionTitle>
                                <DefinitionList>
                                    <DefinitionItem $safe={false}><FiAlertTriangle /> Copying text from modern history books — wording, structure, narrative style are protected</DefinitionItem>
                                    <DefinitionItem $safe={false}><FiAlertTriangle /> Copying unique analysis or creative interpretation — unique arguments are protected</DefinitionItem>
                                    <DefinitionItem $safe={false}><FiAlertTriangle /> Copying images, maps, or charts without permission — most modern visuals are copyrighted</DefinitionItem>
                                </DefinitionList>
                            </DefinitionCard>

                            <DefinitionCard $safe={true}>
                                <DefinitionTitle $safe={true}><FiCheckCircle /> How to Build a Legally Safe History Website</DefinitionTitle>
                                <DefinitionList>
                                    <DefinitionItem $safe={true}><FiCheckCircle /> Write original summaries — Use facts, express them in your own words</DefinitionItem>
                                    <DefinitionItem $safe={true}><FiCheckCircle /> Cite your sources — Builds credibility and protects from accusations</DefinitionItem>
                                    <DefinitionItem $safe={true}><FiCheckCircle /> Use public domain or licensed images — Library of Congress, National Archives, Creative Commons</DefinitionItem>
                                    <DefinitionItem $safe={true}><FiCheckCircle /> Avoid copying modern text — Even a few sentences can be infringement</DefinitionItem>
                                </DefinitionList>
                            </DefinitionCard>
                        </div>
                    </ContentSection>
                )}
            </Container>
        </PageContainer>
    );
}
