'use client';

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  background: #000;
  
  @media (max-width: 768px) {
    height: 500px;
  }
`;

const Slide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0.3) 0%,
      rgba(0,0,0,0) 50%,
      rgba(0,0,0,0.6) 100%
    );
  }
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 60px;
  left: 60px;
  z-index: 5;
  color: white;
  max-width: 600px;
  text-align: left;
  
  @media (max-width: 768px) {
    bottom: 40px;
    left: 30px;
    right: 30px;
  }
`;

const SlideTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 12px;
  text-shadow: 0 4px 10px rgba(0,0,0,0.5);
  
  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;

const SlideDesc = styled(motion.p)`
  font-size: 1.125rem;
  opacity: 0.9;
  text-shadow: 0 2px 5px rgba(0,0,0,0.5);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }
  
  svg {
    font-size: 1.5rem;
  }
  
  &.left { left: 30px; }
  &.right { right: 30px; }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    &.left { left: 15px; }
    &.right { right: 15px; }
  }
`;

const Indicators = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;
`;

const Indicator = styled.button`
  width: ${props => props.$active ? '30px' : '8px'};
  height: 8px;
  border-radius: 4px;
  background: ${props => props.$active ? 'white' : 'rgba(255, 255, 255, 0.4)'};
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
  }
`;

const slides = [
    {
        image: '/modern_office_discussion.png',
        title: 'Innovative Collaboration',
        desc: 'Our team utilizes cutting-edge display technology to visualize complex data and streamline development workflows.'
    },
    {
        image: '/team_meeting_devices.png',
        title: 'Multi-Device Excellence',
        desc: 'From tablets to wall-mounted screens, we ensure your application performs flawlessly across every touchpoint.'
    },
    {
        image: '/working_on_tablet_laptop.png',
        title: 'Agentic AI Workflows',
        desc: 'Harnessing the power of AI to transform tablets and laptops into high-performance engineering workstations.'
    }
];

const HeroCarousel = () => {
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideNext = useCallback(() => {
        setDirection(1);
        setCurrent((prev) => (prev + 1) % slides.length);
    }, []);

    const slidePrev = useCallback(() => {
        setDirection(-1);
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(slideNext, 6000);
        return () => clearInterval(timer);
    }, [slideNext]);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 1.1
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.6 },
                scale: { duration: 0.8 }
            }
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? '100%' : '-100%',
            opacity: 0,
            scale: 0.9,
            transition: {
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 }
            }
        })
    };

    return (
        <CarouselContainer>
            <AnimatePresence initial={false} custom={direction}>
                <Slide
                    key={current}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                >
                    <SlideImage>
                        <Image
                            src={slides[current].image}
                            alt={slides[current].title}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </SlideImage>
                    <SlideContent>
                        <SlideTitle
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {slides[current].title}
                        </SlideTitle>
                        <SlideDesc
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {slides[current].desc}
                        </SlideDesc>
                    </SlideContent>
                </Slide>
            </AnimatePresence>

            <NavButton className="left" onClick={slidePrev} aria-label="Previous slide">
                <FiChevronLeft />
            </NavButton>
            <NavButton className="right" onClick={slideNext} aria-label="Next slide">
                <FiChevronRight />
            </NavButton>

            <Indicators>
                {slides.map((_, idx) => (
                    <Indicator
                        key={idx}
                        $active={idx === current}
                        onClick={() => {
                            setDirection(idx > current ? 1 : -1);
                            setCurrent(idx);
                        }}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </Indicators>
        </CarouselContainer>
    );
};

export default HeroCarousel;
