'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiBook, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import Footer from '@/components/Footer';

// Comprehensive technology glossary - alphabetized
const glossaryTerms = [
    { term: "Agentic Programming", definition: "A paradigm where AI agents autonomously write, test, and debug code with minimal human intervention, using large language models to understand requirements and generate solutions.", category: "AI" },
    { term: "Agents", definition: "Autonomous AI systems that can perceive their environment, make decisions, and take actions to achieve specific goals without continuous human guidance.", category: "AI" },
    { term: "Anthropic", definition: "An AI safety company and creator of Claude AI, focused on building reliable, interpretable, and steerable AI systems with a strong emphasis on AI safety research.", category: "AI" },
    { term: "Antigravity", definition: "Google DeepMind's advanced AI-powered coding assistant that enables agentic programming, autonomous code generation, and intelligent development workflows within modern IDEs.", category: "Tools" },
    { term: "API", definition: "Application Programming Interface - A set of protocols and tools for building software applications that allows different software systems to communicate with each other.", category: "Development" },
    { term: "AWS", definition: "Amazon Web Services - A comprehensive cloud computing platform offering infrastructure as a service (IaaS), platform as a service (PaaS), and software as a service (SaaS).", category: "Cloud" },
    { term: "Backend", definition: "The server-side of an application that handles data processing, storage, and business logic, typically not visible to end users.", category: "Development" },
    { term: "Bootstrap", definition: "A popular open-source CSS framework for building responsive, mobile-first websites and web applications.", category: "Frontend" },
    { term: "Cache", definition: "A hardware or software component that stores data for faster future access, improving application performance.", category: "Performance" },
    { term: "ChatGPT", definition: "OpenAI's conversational AI model based on GPT architecture, capable of generating human-like text responses, answering questions, writing code, and assisting with various tasks.", category: "AI" },
    { term: "CI/CD", definition: "Continuous Integration/Continuous Deployment - DevOps practices that automate code testing, building, and deployment processes.", category: "DevOps" },
    { term: "Claude AI", definition: "Anthropic's advanced AI assistant known for its helpfulness, harmlessness, and honesty, capable of complex reasoning, coding assistance, and natural language understanding.", category: "AI" },
    { term: "Cloud Computing", definition: "The delivery of computing services over the internet, including servers, storage, databases, networking, and software.", category: "Cloud" },
    { term: "Component", definition: "A reusable, self-contained piece of code that encapsulates functionality and can be composed with other components.", category: "Development" },
    { term: "CSS", definition: "Cascading Style Sheets - A stylesheet language used to describe the presentation and visual styling of HTML documents.", category: "Frontend" },
    { term: "Cursor", definition: "An AI-first code editor built on VS Code that integrates AI capabilities directly into the development workflow, enabling intelligent code completion, refactoring, and natural language programming.", category: "Tools" },
    { term: "Database", definition: "An organized collection of structured data stored electronically, typically managed by a database management system (DBMS).", category: "Backend" },
    { term: "Docker", definition: "A platform for developing, shipping, and running applications in isolated containers, ensuring consistency across environments.", category: "DevOps" },
    { term: "DOM", definition: "Document Object Model - A programming interface for web documents that represents the page structure as a tree of objects.", category: "Frontend" },
    { term: "Express.js", definition: "A minimal and flexible Node.js web application framework providing robust features for web and mobile applications.", category: "Backend" },
    { term: "Firebase", definition: "Google's platform for mobile and web application development, offering authentication, databases, hosting, and analytics.", category: "Cloud" },
    { term: "Frontend", definition: "The client-side of an application that users interact with directly, including the visual interface and user experience.", category: "Development" },
    { term: "Full-Stack", definition: "Development approach covering both frontend (client-side) and backend (server-side) technologies.", category: "Development" },
    { term: "Gemini AI", definition: "Google DeepMind's multimodal AI model capable of understanding and generating text, code, images, and audio, powering products like Google Bard and various development tools.", category: "AI" },
    { term: "Git", definition: "A distributed version control system for tracking changes in source code during software development.", category: "DevOps" },
    { term: "GitHub", definition: "A web-based platform for version control and collaboration using Git, hosting millions of repositories.", category: "DevOps" },
    { term: "GraphQL", definition: "A query language for APIs that allows clients to request exactly the data they need, reducing over-fetching.", category: "API" },
    { term: "Hook", definition: "In React, functions that let you use state and other React features in functional components.", category: "React" },
    { term: "HTML", definition: "HyperText Markup Language - The standard markup language for creating web pages and web applications.", category: "Frontend" },
    { term: "HTTP/HTTPS", definition: "HyperText Transfer Protocol (Secure) - The foundation of data communication on the web, with HTTPS adding encryption.", category: "Networking" },
    { term: "IDE", definition: "Integrated Development Environment - A software application providing comprehensive facilities for software development.", category: "Tools" },
    { term: "ISO8601", definition: "An international standard for representing dates and times in a clear, unambiguous format (e.g., 2024-01-15T14:30:00Z), widely used in APIs and data interchange.", category: "Standards" },
    { term: "JavaScript", definition: "A high-level, interpreted programming language that enables interactive web pages and is essential for web development.", category: "Languages" },
    { term: "JSON", definition: "JavaScript Object Notation - A lightweight data-interchange format that is easy for humans to read and write.", category: "Data" },
    { term: "JSON-LD", definition: "JSON for Linking Data - A method of encoding linked data using JSON, commonly used for structured data markup on websites to improve SEO and enable rich search results.", category: "Data" },
    { term: "JWT", definition: "JSON Web Token - A compact, URL-safe means of representing claims to be transferred between two parties.", category: "Security" },
    { term: "Kubernetes", definition: "An open-source container orchestration platform for automating deployment, scaling, and management of containerized applications.", category: "DevOps" },
    { term: "Library", definition: "A collection of pre-written code that developers can use to optimize tasks without writing code from scratch.", category: "Development" },
    { term: "Linux", definition: "An open-source operating system kernel widely used in servers, cloud infrastructure, and development environments.", category: "Systems" },
    { term: "macOS", definition: "Apple's desktop operating system for Mac computers, known for its Unix-based architecture, security, and seamless integration with Apple's ecosystem and development tools.", category: "Systems" },
    { term: "Machine Learning", definition: "A subset of artificial intelligence where systems learn and improve from experience without being explicitly programmed.", category: "AI" },
    { term: "MERN Stack", definition: "A JavaScript technology stack comprising MongoDB, Express.js, React, and Node.js for full-stack development.", category: "Development" },
    { term: "Meta Tags", definition: "HTML elements that provide metadata about a web page, including title, description, keywords, and Open Graph tags used for SEO and social media sharing.", category: "SEO" },
    { term: "Microservices", definition: "An architectural style that structures an application as a collection of loosely coupled, independently deployable services.", category: "Architecture" },
    { term: "MongoDB", definition: "A popular NoSQL database that stores data in flexible, JSON-like documents with dynamic schemas, commonly used in full-stack JavaScript applications.", category: "Backend" },
    { term: "MVC", definition: "Model-View-Controller - A software design pattern separating application logic into three interconnected components.", category: "Architecture" },
    { term: "Next.js", definition: "A React framework for building full-stack web applications with server-side rendering and static site generation.", category: "React" },
    { term: "Node.js", definition: "A JavaScript runtime built on Chrome's V8 engine that enables server-side JavaScript execution.", category: "Backend" },
    { term: "NoSQL", definition: "A category of databases that store data in formats other than traditional relational tables, like documents or key-value pairs.", category: "Database" },
    { term: "NPM", definition: "Node Package Manager - The default package manager for Node.js, providing access to thousands of open-source packages.", category: "Tools" },
    { term: "OAuth", definition: "An open standard for access delegation, commonly used to grant websites limited access to user information.", category: "Security" },
    { term: "ORM", definition: "Object-Relational Mapping - A technique for converting data between incompatible type systems in object-oriented programming.", category: "Database" },
    { term: "PostgreSQL", definition: "A powerful, open-source object-relational database system with a strong reputation for reliability and features.", category: "Database" },
    { term: "Progressive Web App", definition: "Web applications that use modern web capabilities to deliver app-like experiences to users.", category: "Frontend" },
    { term: "Python", definition: "A high-level, interpreted programming language known for its readability and versatility in web, data science, and AI.", category: "Languages" },
    { term: "React", definition: "A JavaScript library for building user interfaces, particularly single-page applications with reusable UI components.", category: "React" },
    { term: "React Native", definition: "A framework for building native mobile applications using React and JavaScript.", category: "Mobile" },
    { term: "Redux", definition: "A predictable state container for JavaScript apps, commonly used with React for complex state management.", category: "React" },
    { term: "REST API", definition: "Representational State Transfer - An architectural style for designing networked applications using HTTP methods.", category: "API" },
    { term: "SaaS", definition: "Software as a Service - A software distribution model where applications are hosted in the cloud and accessed via subscription.", category: "Cloud" },
    { term: "Sass/SCSS", definition: "A CSS preprocessor that extends CSS with variables, nesting, mixins, and other programming features.", category: "Frontend" },
    { term: "SDK", definition: "Software Development Kit - A collection of tools, libraries, and documentation for building applications for a specific platform.", category: "Development" },
    { term: "SEO", definition: "Search Engine Optimization - The practice of improving website visibility and ranking in search engine results.", category: "Marketing" },
    { term: "SOC2 Compliance", definition: "Service Organization Control 2 - A framework for managing customer data based on five trust service principles: security, availability, processing integrity, confidentiality, and privacy.", category: "Standards" },
    { term: "Server", definition: "A computer or program that provides functionality and resources to other programs or devices (clients).", category: "Infrastructure" },
    { term: "SQL", definition: "Structured Query Language - A standard language for storing, manipulating, and retrieving data in relational databases.", category: "Database" },
    { term: "SSL/TLS", definition: "Secure Sockets Layer/Transport Layer Security - Cryptographic protocols for secure communications over networks.", category: "Security" },
    { term: "Styled Components", definition: "A CSS-in-JS library for React that allows writing actual CSS code to style components.", category: "React" },
    { term: "SwiftUI", definition: "Apple's modern UI framework for building user interfaces across all Apple platforms using Swift.", category: "Mobile" },
    { term: "Tailwind CSS", definition: "A utility-first CSS framework for rapidly building custom user interfaces with pre-defined classes.", category: "Frontend" },
    { term: "TypeScript", definition: "A typed superset of JavaScript that compiles to plain JavaScript, adding optional static typing.", category: "Languages" },
    { term: "UI/UX", definition: "User Interface/User Experience - Design disciplines focused on creating intuitive, efficient, and enjoyable user interactions.", category: "Design" },
    { term: "Unit Testing", definition: "A software testing method where individual units of source code are tested to determine if they work correctly.", category: "Testing" },
    { term: "Version Control", definition: "A system for recording changes to files over time, enabling collaboration and tracking of code history.", category: "DevOps" },
    { term: "Virtual DOM", definition: "A lightweight copy of the actual DOM used by React to optimize updates and improve performance.", category: "React" },
    { term: "Webpack", definition: "A static module bundler for JavaScript applications that processes and bundles assets like JavaScript, CSS, and images.", category: "Tools" },
    { term: "WebSocket", definition: "A communication protocol providing full-duplex communication channels over a single TCP connection.", category: "Networking" },
    { term: "Windows", definition: "Microsoft's widely-used desktop operating system, supporting a vast range of software applications and development tools across enterprise and consumer markets.", category: "Systems" },
    { term: "XML", definition: "Extensible Markup Language - A markup language that defines rules for encoding documents in a format readable by humans and machines.", category: "Data" },
    { term: "YAML", definition: "YAML Ain't Markup Language - A human-readable data serialization format commonly used for configuration files.", category: "Data" }
];


// Get unique categories
const categories = [...new Set(glossaryTerms.map(t => t.category))].sort();

// Get unique letters that have terms
const alphabet = [...new Set(glossaryTerms.map(t => t.term[0].toUpperCase()))].sort();

const GlossaryPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [expandedTerms, setExpandedTerms] = useState({});

    const filteredTerms = glossaryTerms.filter(item => {
        const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.definition.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesLetter = !selectedLetter || item.term[0].toUpperCase() === selectedLetter;
        return matchesSearch && matchesCategory && matchesLetter;
    });

    const toggleTerm = (term) => {
        setExpandedTerms(prev => ({
            ...prev,
            [term]: !prev[term]
        }));
    };

    return (
        <PageContainer>
            <HeroSection>
                <HeroContent>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <HeroIcon>
                            <FiBook />
                        </HeroIcon>
                        <Title>Technology Glossary</Title>
                        <Subtitle>
                            Comprehensive definitions of technology terms, frameworks, and concepts used in modern software development
                        </Subtitle>
                    </motion.div>
                </HeroContent>
            </HeroSection>

            <ContentSection>
                <FiltersContainer>
                    <SearchBox>
                        <FiSearch />
                        <SearchInput
                            type="text"
                            placeholder="Search terms..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </SearchBox>

                    <CategoryFilter>
                        <FilterButton
                            $active={selectedCategory === 'All'}
                            onClick={() => setSelectedCategory('All')}
                        >
                            All
                        </FilterButton>
                        {categories.map(cat => (
                            <FilterButton
                                key={cat}
                                $active={selectedCategory === cat}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </FilterButton>
                        ))}
                    </CategoryFilter>

                    <AlphabetFilter>
                        {alphabet.map(letter => (
                            <LetterButton
                                key={letter}
                                $active={selectedLetter === letter}
                                onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                            >
                                {letter}
                            </LetterButton>
                        ))}
                    </AlphabetFilter>
                </FiltersContainer>

                <TermsCount>{filteredTerms.length} terms found</TermsCount>

                <GlossaryList>
                    <AnimatePresence>
                        {filteredTerms.map((item, index) => (
                            <GlossaryItem
                                key={item.term}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3, delay: index * 0.02 }}
                                onClick={() => toggleTerm(item.term)}
                            >
                                <TermHeader>
                                    <TermTitle>{item.term}</TermTitle>
                                    <TermMeta>
                                        <CategoryBadge $category={item.category}>
                                            {item.category}
                                        </CategoryBadge>
                                        <ExpandIcon>
                                            {expandedTerms[item.term] ? <FiChevronUp /> : <FiChevronDown />}
                                        </ExpandIcon>
                                    </TermMeta>
                                </TermHeader>
                                <AnimatePresence>
                                    {expandedTerms[item.term] && (
                                        <TermDefinition
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            {item.definition}
                                        </TermDefinition>
                                    )}
                                </AnimatePresence>
                            </GlossaryItem>
                        ))}
                    </AnimatePresence>
                </GlossaryList>
            </ContentSection>

            <Footer />
        </PageContainer>
    );
};

export default GlossaryPage;

// Styled Components
const PageContainer = styled.div`
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.section`
    background: linear-gradient(135deg, 
        ${({ theme }) => theme.colors.primary}15 0%,
        ${({ theme }) => theme.colors.secondary}15 50%,
        ${({ theme }) => theme.colors.accent}15 100%
    );
    padding: 120px 20px 80px;
    text-align: center;
`;

const HeroContent = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const HeroIcon = styled.div`
    width: 80px;
    height: 80px;
    margin: 0 auto 24px;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    svg {
        font-size: 40px;
        color: white;
    }
`;

const Title = styled.h1`
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 800;
    background: linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 20px;
`;

const Subtitle = styled.p`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
`;

const ContentSection = styled.section`
    max-width: 1000px;
    margin: 0 auto;
    padding: 60px 20px;
`;

const FiltersContainer = styled.div`
    margin-bottom: 40px;
`;

const SearchBox = styled.div`
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 12px 20px;
    margin-bottom: 20px;
    
    svg {
        color: ${({ theme }) => theme.colors.textSecondary};
        font-size: 20px;
        margin-right: 12px;
    }
`;

const SearchInput = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.text};
    
    &::placeholder {
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const CategoryFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 16px;
`;

const FilterButton = styled.button`
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
    background: ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
    color: ${({ theme, $active }) => $active ? 'white' : theme.colors.text};
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const AlphabetFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
`;

const LetterButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid ${({ theme, $active }) => $active ? theme.colors.primary : theme.colors.border};
    background: ${({ theme, $active }) => $active ? theme.colors.primary : 'transparent'};
    color: ${({ theme, $active }) => $active ? 'white' : theme.colors.text};
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const TermsCount = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.875rem;
    margin-bottom: 20px;
`;

const GlossaryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const GlossaryItem = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        border-color: ${({ theme }) => theme.colors.primary};
        box-shadow: 0 4px 20px rgba(99, 102, 241, 0.1);
    }
`;

const TermHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TermTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
`;

const TermMeta = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;

const CategoryBadge = styled.span`
    padding: 6px 14px;
    border-radius: 12px;
    font-size: 1.15rem;
    font-weight: 600;
    background: ${({ $category }) => {
        const colors = {
            'Development': '#6366f1',
            'Frontend': '#ec4899',
            'Backend': '#8b5cf6',
            'React': '#3b82f6',
            'Database': '#10b981',
            'Cloud': '#f59e0b',
            'DevOps': '#ef4444',
            'Security': '#14b8a6',
            'Mobile': '#f97316',
            'API': '#06b6d4',
            'Languages': '#a855f7',
            'Tools': '#64748b',
            'AI': '#22c55e',
            'Architecture': '#0ea5e9',
            'Design': '#d946ef',
            'Testing': '#84cc16',
            'Data': '#0891b2',
            'Systems': '#7c3aed',
            'Infrastructure': '#475569',
            'Marketing': '#f43f5e',
            'Performance': '#eab308',
            'Networking': '#2563eb'
        };
        return colors[$category] || '#6366f1';
    }}20;
    color: ${({ $category }) => {
        const colors = {
            'Development': '#6366f1',
            'Frontend': '#ec4899',
            'Backend': '#8b5cf6',
            'React': '#3b82f6',
            'Database': '#10b981',
            'Cloud': '#f59e0b',
            'DevOps': '#ef4444',
            'Security': '#14b8a6',
            'Mobile': '#f97316',
            'API': '#06b6d4',
            'Languages': '#a855f7',
            'Tools': '#64748b',
            'AI': '#22c55e',
            'Architecture': '#0ea5e9',
            'Design': '#d946ef',
            'Testing': '#84cc16',
            'Data': '#0891b2',
            'Systems': '#7c3aed',
            'Infrastructure': '#475569',
            'Marketing': '#f43f5e',
            'Performance': '#eab308',
            'Networking': '#2563eb'
        };
        return colors[$category] || '#6366f1';
    }};
`;

const ExpandIcon = styled.span`
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
`;

const TermDefinition = styled(motion.p)`
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
    font-size: 1.5rem;
`;
