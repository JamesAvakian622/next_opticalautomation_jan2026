'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Cookies from 'js-cookie';
import styled from 'styled-components';

const ConsentBanner = styled(motion.div)`
  position: fixed;
  bottom: 24px;
  left: 24px;
  right: 24px;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 16px;
  padding: 24px;
  z-index: 1000;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3);
  max-width: 600px;
  margin: 0 auto;

  @media (min-width: 768px) {
    bottom: 32px;
    right: 32px;
    left: auto;
    width: 400px;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h3`
  color: #fff;
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: #6366f1;
  }
`;

const Description = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  line-height: 1.5;
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  &.primary {
    background: #6366f1;
    color: white;
    border: none;
    &:hover {
      background: #4f46e5;
      transform: translateY(-1px);
    }
  }

  &.secondary {
    background: transparent;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.1);
    &:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
`;

const Links = styled.div`
  display: flex;
  gap: 12px;
  font-size: 0.75rem;
  color: #64748b;
  
  a {
    color: #6366f1;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 });
    // Here you would typically initialize your analytics (GA, etc.)
    setIsVisible(false);
  };

  const handleDecline = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 });
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <ConsentBanner
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Content>
            <Title>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                <path d="M8.5 8.5v.01" />
                <path d="M16 15.5v.01" />
                <path d="M12 12v.01" />
                <path d="M11 17v.01" />
                <path d="M7 14v.01" />
              </svg>
              Cookie Preference
            </Title>
            <Description>
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </Description>
            <ButtonGroup>
              <Button className="primary" onClick={handleAccept}>
                Accept All
              </Button>
              <Button className="secondary" onClick={handleDecline}>
                Decline
              </Button>
            </ButtonGroup>
            <Links>
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Use</a>
            </Links>
          </Content>
        </ConsentBanner>
      )}
    </AnimatePresence>
  );
}
