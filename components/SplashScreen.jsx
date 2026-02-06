'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
`;

const SplashWindow = styled(motion.div)`
    width: 1152px; /* 12 inches at 96 DPI (3x larger) */
    max-width: 95vw;
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 2rem 3rem 3rem;
    gap: 0.5rem;
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.15);
    pointer-events: auto;
    
    @media (max-width: 768px) {
        padding: 1.5rem 2rem 2rem;
    }
`;

const MainTitle = styled.h1`
    color: #000000;
    font-size: 50pt;
    font-weight: 700;
    margin: 0;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 32pt;
    }
`;

const TaglineText = styled.p`
    color: #000000;
    font-size: 1.5rem;
    font-weight: 400;
    font-style: italic;
    margin: 0;
    text-align: center;
    
    @media (max-width: 768px) {
        font-size: 1.125rem;
    }
`;

const WelcomeText = styled.p`
    color: #000000;
    font-size: 3rem;
    font-weight: 300;
    font-style: italic;
    margin: 0;
    align-self: flex-start;
    padding-left: 5%;
    
    @media (max-width: 768px) {
        font-size: 2rem;
        padding-left: 3%;
    }
`;

const ContinueButton = styled(motion.button)`
    padding: 0.5rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: #ffffff;
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
    border: none;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 3px 10px rgba(59, 130, 246, 0.3);
    
    &:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
    }
    
    &:active {
        transform: scale(0.98);
    }
`;

export default function SplashScreen() {
    const [isVisible, setIsVisible] = useState(true);
    const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

    useEffect(() => {
        // Check if user has already seen the splash screen in this session
        const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
        if (hasSeenSplash) {
            setIsVisible(false);
        }
        setHasCheckedStorage(true);
    }, []);

    const handleContinue = () => {
        sessionStorage.setItem('hasSeenSplash', 'true');
        setIsVisible(false);
    };

    // Don't render anything until we've checked storage to prevent flash
    if (!hasCheckedStorage) {
        return null;
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <Overlay
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <SplashWindow
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                        <WelcomeText>Welcome to . . .</WelcomeText>
                        <MainTitle>Optical Automation</MainTitle>
                        <TaglineText>"Information At The Speed Of Light"</TaglineText>

                        <ContinueButton
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4, delay: 0.3 }}
                            onClick={handleContinue}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Continue
                        </ContinueButton>
                    </SplashWindow>
                </Overlay>
            )}
        </AnimatePresence>
    );
}
