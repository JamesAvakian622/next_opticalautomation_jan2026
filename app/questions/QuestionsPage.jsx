'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiPlus, FiMinus, FiHelpCircle } from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh - 70px);
    background: ${({ theme }) => theme.colors.background};
`;

const HeroSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.gradient};
    text-align: center;
    position: relative;
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -20%;
        width: 60%;
        height: 150%;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        filter: blur(80px);
    }
`;

const HeroContent = styled.div`
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
`;

const LogoWrapper = styled(motion.div)`
    width: 80px;
    height: 80px;
    margin: 0 auto ${({ theme }) => theme.spacing.lg};
    position: relative;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    border-radius: 0;

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

const PageTitle = styled(motion.h1)`
    font-size: 3.5rem;
    color: white;
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled(motion.p)`
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    max-width: 700px;
    margin: 0 auto;
    line-height: 1.7;
`;

const ContentSection = styled.section`
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
`;

const Container = styled.div`
    max-width: 1000px;
    margin: 0 auto;
`;

const QuestionList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const QuestionItem = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme, $isOpen }) => $isOpen ? theme.colors.primary : theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    overflow: hidden;
    transition: all 0.3s ease;
    box-shadow: ${({ theme, $isOpen }) => $isOpen ? `0 10px 30px ${theme.colors.shadow}` : 'none'};
`;

const QuestionHeader = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${({ theme }) => theme.spacing.xl};
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.25rem;
    font-weight: 600;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const QuestionIcon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: ${({ theme, $isOpen }) => $isOpen ? theme.colors.primary : theme.colors.backgroundAlt};
    color: ${({ theme, $isOpen }) => $isOpen ? 'white' : theme.colors.text};
    border-radius: 50%;
    margin-left: ${({ theme }) => theme.spacing.md};
    flex-shrink: 0;
    transition: all 0.3s ease;
`;

const AnswerContent = styled(motion.div)`
    padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.8;
    font-size: 1.05rem;
`;

const questions = [
    {
        question: "What makes a great website?",
        answer: "A great website has a clear purpose and aligns with the goals of the business or organization it represents. Whether it's to provide information, sell products, generate leads, or entertain, the website should communicate its purpose effectively and guide visitors towards desired actions."
    },
    {
        question: "What are questions you ask a client when starting a new project?",
        answer: (
            <>
                <p>When starting a new web development project for a client, it's essential to gather all the necessary information to ensure a clear understanding of their requirements and expectations. It is always a good plan to have a budget in mind before meeting on the phone or in person.</p>
                <p>Here are some questions you might ask:</p>
                <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
                    <li>What is the purpose of your website?</li>
                    <li>Who is your target audience? What are their demographics and preferences?</li>
                    <li>Do you have any specific design preferences or existing branding guidelines?</li>
                    <li>What are the key features and functionality you require for the website?</li>
                    <li>What is your budget and timeline for the project?</li>
                    <li>Will you require ongoing maintenance and support for the website after it's launched?</li>
                </ul>
            </>
        )
    },
    {
        question: "What do you love most about your job or business?",
        answer: "Software development is a field that is constantly evolving, with new technologies and frameworks emerging regularly. Software provides communication and portrays a message. If you have a passion for this art and science it is a wonderful."
    },
    {
        question: "What inspired you to start your own business?",
        answer: "Many entrepreneurs start their own web development businesses because they have a genuine passion for the field. They love coding, designing, and creating digital solutions, and starting a business allows them to turn their passion into a career. Also some individuals have a strong entrepreneurial spirit and desire to build something of their own. They are motivated by the challenge of starting and growing a successful business and the potential for financial rewards and personal fulfillment that come with it."
    },
    {
        question: "Why should a client choose us?",
        answer: "We emphasize our commitments to providing customized solutions tailored to each client's unique needs. We discuss their collaborative approach, where we take the time to understand their goals, target audience, and brand identity to create a website that aligns perfectly with their vision."
    },
    {
        question: "Can you provide your services online or remotely?",
        answer: "Yes, we provide our services online and remotely, allowing us to serve clients from anywhere in America. Virtual Communication: We utilize various communication channels such as email, audio conferencing, and instant messaging to communicate with our clients. This ensures effective and timely collaboration throughout the project lifecycle."
    },
    {
        question: "What changes have you made to keep your customers safe from Covid-19?",
        answer: "Our entire business operates through online information access and communication. Remote Work: Many have transitioned to remote work setups, allowing us to work from home and minimize physical contact. So this eventually helped us to keep our customers safe from Covid-19."
    }
];

export default function QuestionsPage() {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <PageWrapper>
            <HeroSection>
                <HeroContent>
                    <LogoWrapper
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src="/opauto.png"
                            alt="Optical Automation"
                            fill
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </LogoWrapper>
                    <PageTitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Questions & Answers
                    </PageTitle>
                    <Subtitle
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Frequently asked questions about our services, process, and vision.
                    </Subtitle>
                </HeroContent>
            </HeroSection>

            <ContentSection>
                <Container>
                    <QuestionList>
                        {questions.map((item, index) => (
                            <QuestionItem
                                key={index}
                                $isOpen={openIndex === index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <QuestionHeader onClick={() => toggleQuestion(index)}>
                                    {item.question}
                                    <QuestionIcon $isOpen={openIndex === index}>
                                        {openIndex === index ? <FiMinus /> : <FiPlus />}
                                    </QuestionIcon>
                                </QuestionHeader>
                                <AnimatePresence>
                                    {openIndex === index && (
                                        <AnswerContent
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {item.answer}
                                        </AnswerContent>
                                    )}
                                </AnimatePresence>
                            </QuestionItem>
                        ))}
                    </QuestionList>
                </Container>
            </ContentSection>
        </PageWrapper>
    );
}
