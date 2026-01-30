'use client';

import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPhone,
    FiMail,
    FiMessageCircle,
    FiClock,
    FiChevronDown,
    FiChevronUp,
    FiSend,
    FiCheckCircle,
    FiAlertCircle,
    FiLoader,
    FiX
} from 'react-icons/fi';

const PageWrapper = styled.div`
    min-height: calc(100vh-70px);
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

const ContactCards = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
gap: ${({ theme }) => theme.spacing.lg};
margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const ContactCard = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xl};
text-align: center;
transition: all 0.3s ease;

    &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-4px);
}
`;

const CardIcon = styled.div`
width: 60px;
height: 60px;
margin: 0 auto ${({ theme }) => theme.spacing.md};
border-radius: ${({ theme }) => theme.borderRadius.full};
background: ${({ theme }) => theme.colors.gradient};
display: flex;
align-items: center;
justify-content: center;

    svg {
    font-size: 1.5rem;
    color: white;
}
`;

const CardTitle = styled.h3`
font-size: 1.25rem;
margin-bottom: ${({ theme }) => theme.spacing.sm};
color: ${({ theme }) => theme.colors.text};
`;

const CardInfo = styled.p`
color: ${({ theme }) => theme.colors.primary};
font-weight: 500;
`;

const CardSubInfo = styled.p`
color: ${({ theme }) => theme.colors.textSecondary};
font-size: 0.875rem;
margin-top: ${({ theme }) => theme.spacing.xs};
`;

const ContentGrid = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
gap: ${({ theme }) => theme.spacing.xxl};

@media(max-width: 900px) {
    grid-template-columns: 1fr;
}
`;

const FAQSection = styled.div`
scroll-margin-top: 100px;
`;

const SectionTitle = styled.h2`
font-size: 2rem;
margin-bottom: ${({ theme }) => theme.spacing.xl};
color: ${({ theme }) => theme.colors.text};
`;

const FAQItem = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.lg};
margin-bottom: ${({ theme }) => theme.spacing.md};
overflow: hidden;
`;

const FAQQuestion = styled.button`
width: 100 %;
padding: ${({ theme }) => theme.spacing.lg};
display: flex;
justify-content: space-between;
align-items: center;
text-align: left;
color: ${({ theme }) => theme.colors.text};
font-weight: 600;
font-size: 1rem;

    svg {
    color: ${({ theme }) => theme.colors.primary};
    flex-shrink: 0;
}
`;

const FAQAnswer = styled(motion.div)`
padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
color: ${({ theme }) => theme.colors.textSecondary};
line-height: 1.7;
`;

const ContactForm = styled.form`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
padding: ${({ theme }) => theme.spacing.xl};
scroll-margin-top: 100px;
`;

const FormGroup = styled.div`
margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Label = styled.label`
display: block;
margin-bottom: ${({ theme }) => theme.spacing.sm};
color: ${({ theme }) => theme.colors.text};
font-weight: 500;
`;

const Input = styled.input`
width: 100 %;
padding: ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.colors.backgroundAlt};
border: 2px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.lg};
color: ${({ theme }) => theme.colors.text};
font-size: 1rem;
transition: all 0.3s ease;

    &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
}
`;

const TextArea = styled.textarea`
width: 100 %;
padding: ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.colors.backgroundAlt};
border: 2px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.lg};
color: ${({ theme }) => theme.colors.text};
font-size: 1rem;
min-height: 150px;
resize: vertical;
transition: all 0.3s ease;

    &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
}
`;

const SubmitButton = styled(motion.button)`
width: 100 %;
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
}
`;

const SuccessMessage = styled(motion.div)`
background: ${({ theme }) => `${theme.colors.success}20`};
border: 1px solid ${({ theme }) => theme.colors.success};
border-radius: ${({ theme }) => theme.borderRadius.lg};
padding: ${({ theme }) => theme.spacing.lg};
text-align: center;
color: ${({ theme }) => theme.colors.success};
display: flex;
align-items: center;
justify-content: center;
gap: ${({ theme }) => theme.spacing.sm};

    svg {
    font-size: 1.25rem;
}
`;

const ErrorMessage = styled(motion.div)`
background: ${({ theme }) => `${theme.colors.error || '#ef4444'}20`};
border: 1px solid ${({ theme }) => theme.colors.error || '#ef4444'};
border-radius: ${({ theme }) => theme.borderRadius.lg};
padding: ${({ theme }) => theme.spacing.lg};
text-align: center;
color: ${({ theme }) => theme.colors.error || '#ef4444'};
display: flex;
align-items: center;
justify-content: center;
gap: ${({ theme }) => theme.spacing.sm};
margin-bottom: ${({ theme }) => theme.spacing.lg};

    svg {
    font-size: 1.25rem;
}
`;

const ChatOverlay = styled(motion.div)`
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0, 0, 0, 0.5);
z-index: 1000;
display: flex;
align-items: center;
justify-content: center;
padding: ${({ theme }) => theme.spacing.lg};
`;

const ChatModal = styled(motion.div)`
background: ${({ theme }) => theme.colors.surface};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.xl};
width: 100 %;
max-width: 450px;
max-height: 600px;
display: flex;
flex-direction: column;
overflow: hidden;
`;

const ChatHeader = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: ${({ theme }) => theme.spacing.lg};
background: ${({ theme }) => theme.colors.gradient};
color: white;
`;

const ChatTitle = styled.h3`
font-size: 1.125rem;
display: flex;
align-items: center;
gap: ${({ theme }) => theme.spacing.sm};

    svg {
    font-size: 1.25rem;
}
`;

const ChatCloseButton = styled.button`
width: 32px;
height: 32px;
border-radius: 50 %;
background: rgba(255, 255, 255, 0.2);
color: white;
display: flex;
align-items: center;
justify-content: center;
border: none;
cursor: pointer;
transition: all 0.3s ease;

    &:hover {
    background: rgba(255, 255, 255, 0.3);
}
`;

const ChatMessages = styled.div`
flex: 1;
padding: ${({ theme }) => theme.spacing.lg};
overflow-y: auto;
display: flex;
flex-direction: column;
gap: ${({ theme }) => theme.spacing.md};
min-height: 300px;
max-height: 400px;
`;

const ChatMessage = styled.div`
max-width: 80 %;
padding: ${({ theme }) => theme.spacing.md};
border-radius: ${({ theme }) => theme.borderRadius.lg};
line-height: 1.5;
font-size: 0.9rem;

    ${({ $from, theme }) => $from === 'bot' ? `
        background: ${theme.colors.backgroundAlt};
        color: ${theme.colors.text};
        align-self: flex-start;
        border-bottom-left-radius: 4px;
    ` : `
        background: ${theme.colors.primary};
        color: white;
        align-self: flex-end;
        border-bottom-right-radius: 4px;
    `}
`;

const ChatInputContainer = styled.div`
display: flex;
gap: ${({ theme }) => theme.spacing.sm};
padding: ${({ theme }) => theme.spacing.lg};
border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const ChatInput = styled.input`
flex: 1;
padding: ${({ theme }) => theme.spacing.md};
background: ${({ theme }) => theme.colors.backgroundAlt};
border: 1px solid ${({ theme }) => theme.colors.border};
border-radius: ${({ theme }) => theme.borderRadius.lg};
color: ${({ theme }) => theme.colors.text};
font-size: 0.9rem;

    &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
}
`;

const ChatSendButton = styled.button`
width: 44px;
height: 44px;
background: ${({ theme }) => theme.colors.gradient};
border: none;
border-radius: ${({ theme }) => theme.borderRadius.lg};
color: white;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
transition: all 0.3s ease;

    &:hover {
    transform: scale(1.05);
}

    svg {
    font-size: 1rem;
}
`;

const faqs = [
    {
        question: 'What technologies do you specialize in?',
        answer: 'We specialize in modern web technologies including React, Next.js, Node.js, and the full MERN stack. We also leverage AI-assisted development tools to enhance productivity and code quality.'
    },
    {
        question: 'How long does a typical project take?',
        answer: 'Project timelines vary based on scope and complexity. A simple website might take 2-4 weeks, while a full-featured web application can take 2-3 months. We provide detailed timelines during our initial consultation.'
    },
    {
        question: 'Do you offer ongoing support and maintenance?',
        answer: 'Yes! We offer comprehensive support and maintenance packages to keep your applications running smoothly. This includes bug fixes, security updates, and feature enhancements.'
    },
    {
        question: 'What is your pricing structure?',
        answer: 'We offer flexible pricing including fixed-price projects and hourly consulting. Contact us for a detailed quote based on your specific requirements.'
    },
    {
        question: 'Can you work with existing codebases?',
        answer: 'Absolutely. We regularly work with existing projects, whether it\'s adding features, optimizing performance, or modernizing legacy code.'
    }
];

export default function SupportPage() {
    const [openFAQ, setOpenFAQ] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        { from: 'bot', text: 'Hello! Welcome to Optical Automation support. How can I help you today?' }
    ]);
    const [chatInput, setChatInput] = useState('');

    const handleChatSend = () => {
        if (!chatInput.trim()) return;

        const userMessage = chatInput.trim();
        setChatMessages(prev => [...prev, { from: 'user', text: userMessage }]);
        setChatInput('');

        // Simple bot responses
        setTimeout(() => {
            let botResponse = '';
            const lowerMessage = userMessage.toLowerCase();

            if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('pricing')) {
                botResponse = 'For pricing information, please visit our Pricing page or contact us directly at +1(747)354-2925. We offer flexible plans for all project sizes!';
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('call')) {
                botResponse = 'You can reach us at +1(747)354-2925 (Mon-Fri 9AM-6PM PST) or email opticalautomation2025@gmail.com. We typically respond within 24-48 hours.';
            } else if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('open')) {
                botResponse = 'Our business hours are Monday through Friday, 9AM to 6PM PST. For urgent matters, please leave a message and we\'ll get back to you as soon as possible.';
            } else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('develop')) {
                botResponse = 'We specialize in React, Next.js, Node.js, and MERN stack development. Tell us about your project and we\'ll help you get started!';
            } else if (lowerMessage.includes('thank') || lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
                botResponse = 'Thank you for chatting with us! If you have any more questions, feel free to reach out anytime. Have a great day!';
            } else {
                botResponse = 'Thank you for your message! For detailed assistance, please fill out our contact form or call us at +1(747)354-2925. Our team will be happy to help!';
            }

            setChatMessages(prev => [...prev, { from: 'bot', text: botResponse }]);
        }, 1000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

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
                        Technical Support
                    </Title>
                    <Subtitle>
                        We're here to help! Get in touch with our support team for any questions or assistance.
                    </Subtitle>
                </HeroSection>

                <ContactCards>
                    <ContactCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <CardIcon>
                            <FiPhone />
                        </CardIcon>
                        <CardTitle>Phone Support</CardTitle>
                        <CardInfo>+1(747)354-2925</CardInfo>
                        <CardSubInfo>Mon-Fri 9AM-6PM PST</CardSubInfo>
                    </ContactCard>

                    <ContactCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <CardIcon>
                            <FiMail />
                        </CardIcon>
                        <CardTitle>Email Support</CardTitle>
                        <CardInfo>opticalautomation2025@gmail.com</CardInfo>
                        <CardSubInfo>24-48 hour response time</CardSubInfo>
                    </ContactCard>

                    <ContactCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => setIsChatOpen(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <CardIcon>
                            <FiMessageCircle />
                        </CardIcon>
                        <CardTitle>Live Chat</CardTitle>
                        <CardInfo>Click to Start Chat</CardInfo>
                        <CardSubInfo>Instant support</CardSubInfo>
                    </ContactCard>

                    <ContactCard
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <CardIcon>
                            <FiClock />
                        </CardIcon>
                        <CardTitle>Business Hours</CardTitle>
                        <CardInfo>Mon-Fri 9AM-6PM</CardInfo>
                        <CardSubInfo>PST Timezone</CardSubInfo>
                    </ContactCard>
                </ContactCards>

                <ContentGrid>
                    <FAQSection id="faq">
                        <SectionTitle>Frequently Asked Questions</SectionTitle>
                        {faqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <FAQQuestion onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
                                    {faq.question}
                                    {openFAQ === index ? <FiChevronUp /> : <FiChevronDown />}
                                </FAQQuestion>
                                {openFAQ === index && (
                                    <FAQAnswer
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        {faq.answer}
                                    </FAQAnswer>
                                )}
                            </FAQItem>
                        ))}
                    </FAQSection>

                    <div id="contact">
                        <SectionTitle>Contact Us</SectionTitle>
                        <ContactForm onSubmit={handleSubmit}>
                            {isSubmitted ? (
                                <SuccessMessage
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <FiCheckCircle />
                                    Message sent successfully! We'll get back to you soon.
                                </SuccessMessage>
                            ) : (
                                <>
                                    {error && (
                                        <ErrorMessage
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                        >
                                            <FiAlertCircle />
                                            {error}
                                        </ErrorMessage>
                                    )}
                                    <FormGroup>
                                        <Label>Your Name</Label>
                                        <Input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            disabled={isLoading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Email Address</Label>
                                        <Input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            disabled={isLoading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Subject</Label>
                                        <Input
                                            type="text"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            disabled={isLoading}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Message</Label>
                                        <TextArea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            disabled={isLoading}
                                        />
                                    </FormGroup>
                                    <SubmitButton
                                        type="submit"
                                        whileHover={{ scale: isLoading ? 1 : 1.02 }}
                                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <FiLoader style={{ animation: 'spin 1s linear infinite' }} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <FiSend /> Send Message
                                            </>
                                        )}
                                    </SubmitButton>
                                </>
                            )}
                        </ContactForm>
                    </div>
                </ContentGrid>
            </Container>

            {/* Chat Bot Modal */}
            <AnimatePresence>
                {isChatOpen && (
                    <ChatOverlay
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsChatOpen(false)}
                    >
                        <ChatModal
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ChatHeader>
                                <ChatTitle>
                                    <FiMessageCircle /> Support Chat
                                </ChatTitle>
                                <ChatCloseButton onClick={() => setIsChatOpen(false)}>
                                    <FiX />
                                </ChatCloseButton>
                            </ChatHeader>
                            <ChatMessages>
                                {chatMessages.map((msg, index) => (
                                    <ChatMessage key={index} $from={msg.from}>
                                        {msg.text}
                                    </ChatMessage>
                                ))}
                            </ChatMessages>
                            <ChatInputContainer>
                                <ChatInput
                                    type="text"
                                    placeholder="Type your message..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                                />
                                <ChatSendButton onClick={handleChatSend}>
                                    <FiSend />
                                </ChatSendButton>
                            </ChatInputContainer>
                        </ChatModal>
                    </ChatOverlay>
                )}
            </AnimatePresence>
        </PageWrapper>
    );
}
