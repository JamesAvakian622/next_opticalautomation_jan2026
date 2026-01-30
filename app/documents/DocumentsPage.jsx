'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
    FiFileText,
    FiDownload,
    FiEye,
    FiCalendar,
    FiFile,
    FiFolder,
    FiSearch,
    FiFilter,
    FiMail
} from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.background};

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
    }
`;

const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;

const HeroSection = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;


const LogoWrapper = styled(motion.div)`
width: 60px;
height: 60px;
position: relative;
border-radius: 0;
overflow: hidden;
flex-shrink: 0;

@media(max-width: 768px) {
    width: 40px;
    height: 40px;
}
`;

const Title = styled(motion.h1)`
font-size: 3rem;
margin-bottom: ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.colors.gradient};
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
display: inline-flex;
align-items: center;
gap: ${({ theme }) => theme.spacing.md};

@media(max-width: 768px) {
    font-size: 2rem;
}
`;

const Subtitle = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 1.125rem;
max-width: 600px;
margin: 0 auto;
`;

const SearchBar = styled.div`
display: flex;
gap: ${({ theme }) => theme.spacing.md};
margin-bottom: ${({ theme }) => theme.spacing.xl};
flex-wrap: wrap;

@media(max-width: 600px) {
    flex-direction: column;
}
`;

const SearchInput = styled.div`
flex: 1;
position: relative;
min-width: 200px;

    svg {
    position: absolute;
    left: ${({ theme }) => theme.spacing.md};
    top: 50%;
    transform: translateY(-50%);
    color: ${({ theme }) => theme.colors.textSecondary};
}
`;

const Input = styled.input`
width: 100%;
padding: ${({ theme }) => theme.spacing.md};
padding-left: calc(${({ theme }) => theme.spacing.md} * 3);
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.lg};
color: ${({ theme }) => theme.colors.text};
font-size: 1rem;
transition: all 0.3s ease;

    &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
}
`;

const FilterSelect = styled.select`
padding: ${({ theme }) => theme.spacing.md};
padding-right: ${({ theme }) => theme.spacing.xl};
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.lg};
color: ${({ theme }) => theme.colors.text};
font-size: 1rem;
cursor: pointer;
min-width: 150px;

    &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
}
`;

const CategoriesNav = styled.div`
display: flex;
gap: ${({ theme }) => theme.spacing.sm};
margin-bottom: ${({ theme }) => theme.spacing.xl};
flex-wrap: wrap;
justify-content: center;
`;

const CategoryButton = styled.button`
padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
background: ${({ $active, theme }) =>
        $active ? theme.colors.gradient : theme.colors.surface
    };
border: 1px solid ${({ $active, theme }) =>
        $active ? 'transparent' : theme.colors.border
    };
border-radius: ${({ theme }) => theme.borderRadius.full};
color: ${({ $active }) => ($active ? 'white' : 'inherit')};
font-weight: 500;
transition: all 0.3s ease;

    &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
}
`;

const DocumentsGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
gap: ${({ theme }) => theme.spacing.lg};

@media(max-width: 400px) {
    grid-template-columns: 1fr;
}
`;

const DocumentCard = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xl};
transition: all 0.3s ease;

    &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: 0 12px 40px ${({ theme }) => theme.colors.shadow};
}
`;

const DocumentHeader = styled.div`
display: flex;
align-items: flex-start;
gap: ${({ theme }) => theme.spacing.md};
margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DocumentIcon = styled.div`
width: 48px;
height: 48px;
border-radius: ${({ theme }) => theme.borderRadius.lg};
background: ${({ $color }) => `${$color}20`};
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;

    svg {
    font-size: 1.5rem;
    color: ${({ $color }) => $color};
}
`;

const DocumentInfo = styled.div`
flex: 1;
`;

const DocumentTitle = styled.h3`
font-size: 1.125rem;
color: ${({ theme }) => theme.colors.text};
margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DocumentMeta = styled.div`
display: flex;
align-items: center;
gap: ${({ theme }) => theme.spacing.md};
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 0.75rem;
`;

const MetaItem = styled.span`
display: flex;
align-items: center;
gap: 4px;

    svg {
    font-size: 0.875rem;
}
`;

const DocumentCategory = styled.span`
padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
background: ${({ theme }) => theme.colors.backgroundAlt};
border-radius: ${({ theme }) => theme.borderRadius.sm};
font-size: 0.75rem;
color: ${({ theme }) => theme.colors.primary};
font-weight: 500;
`;

const DocumentDescription = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 0.9rem;
line-height: 1.6;
margin: ${({ theme }) => theme.spacing.md} 0;
`;

const DocumentActions = styled.div`
display: flex;
gap: ${({ theme }) => theme.spacing.sm};
`;

const ActionButton = styled.button`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
gap: 6px;
padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
background: ${({ $primary, theme }) =>
        $primary ? theme.colors.gradient : theme.colors.backgroundAlt
    };
color: ${({ $primary }) => ($primary ? 'white' : 'inherit')};
border-radius: ${({ theme }) => theme.borderRadius.md};
font-size: 0.875rem;
font-weight: 500;
transition: all 0.3s ease;

    &:hover {
    transform: translateY(-2px);
}

    svg {
    font-size: 1rem;
}
`;

const EmptyState = styled.div`
text-align: center;
padding: ${({ theme }) => theme.spacing.xxl};
color: ${({ theme }) => theme.colors.textSecondary};
`;

const documents = [
    {
        id: 1,
        title: 'Getting Started Guide',
        category: 'Guides',
        description: 'Complete guide for new clients to get started with Optical Automation services.',
        fileType: 'PDF',
        fileSize: '2.4 MB',
        date: '2024-12-01',
        color: '#6366f1'
    },
    {
        id: 2,
        title: 'API Documentation',
        category: 'Technical',
        description: 'Comprehensive API reference for integrating with our services and platforms.',
        fileType: 'HTML',
        fileSize: 'Online',
        date: '2024-12-15',
        color: '#10B981'
    },
    {
        id: 5,
        title: 'Project Proposal Template',
        category: 'Templates',
        description: 'Standard template for project proposals and statements of work.',
        fileType: 'DOCX',
        fileSize: '156 KB',
        date: '2024-12-10',
        color: '#8B5CF6'
    },
    {
        id: 7,
        title: 'Development Best Practices',
        category: 'Technical',
        description: 'Coding standards and best practices for web development projects.',
        fileType: 'MD',
        fileSize: '120 KB',
        date: '2024-12-05',
        color: '#10B981'
    },
    {
        id: 23,
        title: 'Master Service Agreement',
        category: 'Legal',
        description: 'Comprehensive legal document covering Terms of Use, Content Policy, and Privacy Policy for all Optical Automation services.',
        fileType: 'PDF',
        fileSize: '1.4 MB',
        date: '2025-01-24',
        color: '#EF4444'
    },
    {
        id: 24,
        title: 'Intellectual Property Rights',
        category: 'Legal',
        description: 'Official documentation regarding our Copyrights, Trademarks, and the protection of proprietary technology and designs.',
        fileType: 'PDF',
        fileSize: '1.1 MB',
        date: '2025-01-24',
        color: '#EF4444'
    },
    {
        id: 34,
        title: 'Standard Non-Disclosure Statement',
        category: 'Legal',
        description: 'Standard Non-Disclosure Statement (General Use). The Receiving Party agrees to treat all information disclosed by the Disclosing Party as strictly confidential.',
        fileType: 'TXT',
        fileSize: '3 KB',
        date: '2026-01-26',
        color: '#EF4444'
    },
    {
        id: 9,
        title: 'Annual Report 2024',
        category: 'Company',
        description: 'Comprehensive overview of our financial performance and strategic achievements over the past year.',
        fileType: 'PDF',
        fileSize: '12.5 MB',
        date: '2024-12-20',
        color: '#6366f1',
        isRequest: true
    },
    {
        id: 10,
        title: 'Business Plan 2025',
        category: 'Company',
        description: 'Strategic roadmap outlining our vision, targets, and growth strategy for the upcoming year.',
        fileType: 'PDF',
        fileSize: '4.2 MB',
        date: '2024-12-18',
        color: '#10B981',
        isRequest: true
    },
    {
        id: 11,
        title: 'Company Prospectus',
        category: 'Company',
        description: 'Detailed formal document describing our company, business model, and investment highlights.',
        fileType: 'PDF',
        fileSize: '15.8 MB',
        date: '2024-12-10',
        color: '#F59E0B'
    },
    {
        id: 12,
        title: 'Q1 Financial Report',
        category: 'Company',
        description: 'First quarter financial results and performance analysis.',
        fileType: 'PDF',
        fileSize: '2.1 MB',
        date: '2024-03-31',
        color: '#06B6D4'
    },
    {
        id: 13,
        title: 'Q2 Financial Report',
        category: 'Company',
        description: 'Second quarter financial results and performance analysis.',
        fileType: 'PDF',
        fileSize: '2.3 MB',
        date: '2024-06-30',
        color: '#8B5CF6'
    },
    {
        id: 14,
        title: 'Q3 Financial Report',
        category: 'Company',
        description: 'Third quarter financial results and performance analysis.',
        fileType: 'PDF',
        fileSize: '2.2 MB',
        date: '2024-09-30',
        color: '#EC4899'
    },
    {
        id: 15,
        title: 'Q4 Financial Report',
        category: 'Company',
        description: 'Fourth quarter financial results and preliminary year-end analysis.',
        fileType: 'PDF',
        fileSize: '2.5 MB',
        date: '2024-12-31',
        color: '#10B981'
    },
    {
        id: 17,
        title: 'Deployment Guide',
        category: 'Technical',
        description: 'Step-by-step instructions for automating deployments across various environments.',
        fileType: 'MD',
        fileSize: '85 KB',
        date: '2024-12-05',
        color: '#06B6D4'
    },
    {
        id: 18,
        title: 'Support Portal Guide',
        category: 'Guides',
        description: 'User manual for navigating and utilizing our technical support ticketing system and resources.',
        fileType: 'PDF',
        fileSize: '1.2 MB',
        date: '2024-12-12',
        color: '#8B5CF6'
    },
    {
        id: 20,
        title: 'Agentic AI Development',
        category: 'Design',
        description: 'Architectural standards and best practices for building autonomous AI agents and integrated agentic workflows.',
        fileType: 'PDF',
        fileSize: '3.8 MB',
        date: '2025-01-20',
        color: '#6366f1'
    },
    {
        id: 21,
        title: 'eCommerce Solutions',
        category: 'Design',
        description: 'Comprehensive design patterns for high-conversion eCommerce platforms, including checkout optimization and product discovery.',
        fileType: 'PDF',
        fileSize: '5.2 MB',
        date: '2025-01-22',
        color: '#10B981'
    },
    {
        id: 22,
        title: 'Mobile App Development',
        category: 'Design',
        description: 'Universal design principles for iOS and Android applications, focusing on native performance and user engagement.',
        fileType: 'PDF',
        fileSize: '4.5 MB',
        date: '2025-01-24',
        color: '#EC4899'
    },
    {
        id: 25,
        title: 'MongoDB Database Read-Write Between ReactJS Website and Apple SwiftUI Apps',
        category: 'Technical',
        description: 'In-depth analysis of data synchronization techniques between web and mobile ecosystems using MongoDB.',
        fileType: 'PDF',
        fileSize: '3.2 MB',
        date: '2025-01-25',
        color: '#10B981',
        author: 'Avakian, J. L.'
    },
    {
        id: 26,
        title: 'My One Universe, Technical Description and Usage',
        category: 'Technical',
        description: 'Architectural overview and functional guide for the My One Universe integrated information system.',
        fileType: 'PDF',
        fileSize: '4.8 MB',
        date: '2025-01-25',
        color: '#6366f1',
        author: 'Avakian, J. L.'
    },
    {
        id: 27,
        title: 'LogView, A MERN Application Website Accounting App',
        category: 'Technical',
        description: 'Detailed documentation of the LogView accounting platform, covering MERN stack implementation and data modeling.',
        fileType: 'PDF',
        fileSize: '2.9 MB',
        date: '2025-01-25',
        color: '#8B5CF6',
        author: 'Avakian, J. L.'
    },
    {
        id: 28,
        title: 'An International Marvel – MyTelephonePhonebook.com',
        category: 'Technical',
        description: 'Case study on the development and scaling of a global contact management platform.',
        fileType: 'PDF',
        fileSize: '3.5 MB',
        date: '2025-01-25',
        color: '#0EA5E9',
        author: 'Avakian, J. L.'
    },
    {
        id: 29,
        title: 'The Importance of Responsive Web Design Websites',
        category: 'Design',
        description: 'Technical exploration of responsive design principles and their impact on user experience and SEO.',
        fileType: 'PDF',
        fileSize: '1.8 MB',
        date: '2025-01-25',
        color: '#EC4899',
        author: 'Avakian, J. L.'
    },
    {
        id: 30,
        title: 'The Benefits of eCommerce Websites',
        category: 'Design',
        description: 'Analysis of eCommerce business models, technical requirements, and growth opportunities.',
        fileType: 'PDF',
        fileSize: '2.2 MB',
        date: '2025-01-25',
        color: '#10B981',
        author: 'Avakian, J. L.'
    },
    {
        id: 31,
        title: 'Website Product Marketing, Price, and Planning',
        category: 'Company',
        description: 'Strategic guide to digital product positioning, pricing strategies, and marketing planning.',
        fileType: 'PPTX',
        fileSize: '5.6 MB',
        date: '2025-01-25',
        color: '#F59E0B',
        author: 'Avakian, J. L.'
    },
    {
        id: 32,
        title: 'James L. Avakian, Software Developer',
        category: 'Company',
        description: 'Professional summary and technical portfolio of James L. Avakian, showcasing key achievements and expertise.',
        fileType: 'PDF',
        fileSize: '2.1 MB',
        date: '2025-01-25',
        color: '#6366f1',
        author: 'Avakian, J. L.'
    },
    {
        id: 33,
        title: 'Agentic AI Software Development',
        category: 'Technical',
        description: 'Advanced exploration of autonomous AI agent architectures and their integration into modern software workflows.',
        fileType: 'PPTX',
        fileSize: '4.2 MB',
        date: '2025-01-25',
        color: '#14B8A6',
        author: 'Avakian, J. L.'
    }
];

const categories = ['All', 'Company', 'Guides', 'Technical', 'Design', 'Templates', 'Legal'];

export default function DocumentsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('date');

    const filteredDocuments = documents
        .filter((doc) => {
            const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                doc.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
            if (sortBy === 'name') return a.title.localeCompare(b.title);
            return 0;
        });

    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <LogoWrapper>
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </LogoWrapper>
                        Documents
                    </Title>
                    <Subtitle>
                        Access guides, templates, technical documentation, and resources
                    </Subtitle>
                </HeroSection>

                <SearchBar>
                    <SearchInput>
                        <FiSearch />
                        <Input
                            type="text"
                            placeholder="Search documents..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchInput>
                    <FilterSelect
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="date">Sort by Date</option>
                        <option value="name">Sort by Name</option>
                    </FilterSelect>
                </SearchBar>

                <CategoriesNav>
                    {categories.map((category) => (
                        <CategoryButton
                            key={category}
                            $active={selectedCategory === category}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </CategoryButton>
                    ))}
                </CategoriesNav>

                {filteredDocuments.length > 0 ? (
                    <DocumentsGrid>
                        {filteredDocuments.map((doc, index) => (
                            <DocumentCard
                                key={doc.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <DocumentHeader>
                                    <DocumentIcon $color={doc.color}>
                                        <FiFile />
                                    </DocumentIcon>
                                    <DocumentInfo>
                                        <DocumentTitle>{doc.title}</DocumentTitle>
                                        <DocumentMeta>
                                            <MetaItem>
                                                <FiFolder /> {doc.fileType}
                                            </MetaItem>
                                            <MetaItem>{doc.fileSize}</MetaItem>
                                            <MetaItem>
                                                <FiCalendar /> {new Date(doc.date).toLocaleDateString()}
                                            </MetaItem>
                                        </DocumentMeta>
                                    </DocumentInfo>
                                </DocumentHeader>
                                <DocumentCategory>{doc.category}</DocumentCategory>
                                <DocumentDescription>{doc.description}</DocumentDescription>
                                <DocumentActions>
                                    <ActionButton
                                        onClick={() => {
                                            if (doc.isRequest) {
                                                window.location.href = `/ support ? subject = Document Request: ${doc.title} #contact`;
                                            }
                                        }}
                                    >
                                        <FiEye /> {doc.isRequest ? 'Request Access' : 'Preview'}
                                    </ActionButton>
                                    {doc.isRequest ? (
                                        <ActionButton
                                            $primary
                                            onClick={() => window.location.href = `/ support ? subject = Document Request: ${doc.title} #contact`}
                                        >
                                            <FiMail /> Request via Email
                                        </ActionButton>
                                    ) : (
                                        <ActionButton $primary>
                                            <FiDownload /> Download
                                        </ActionButton>
                                    )}
                                </DocumentActions>
                            </DocumentCard>
                        ))}
                    </DocumentsGrid>
                ) : (
                    <EmptyState>
                        <FiFileText size={48} />
                        <h3>No documents found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </EmptyState>
                )}
            </Container>
        </PageWrapper>
    );
}
