'use client';

import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiPlayCircle, FiUser, FiExternalLink } from 'react-icons/fi';

const PageContainer = styled.div`
    padding-top: 100px;
    padding-bottom: 80px;
    min-height: 100vh;
    background: ${({ theme }) => theme.colors.background};
`;

const ContentWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${({ theme }) => theme.spacing.xl};

    @media (max-width: 768px) {
        padding: 0 ${({ theme }) => theme.spacing.md};
    }
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 60px;
`;

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        flex-direction: column;
        gap: ${({ theme }) => theme.spacing.sm};
    }
`;

const LogoWrapper = styled(motion.div)`
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 0;
    overflow: hidden;
    box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
    flex-shrink: 0;

    @media (max-width: 768px) {
        width: 60px;
        height: 60px;
    }
`;

const Title = styled(motion.h1)`
    font-size: 3rem;
    font-weight: 800;
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled(motion.p)`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.textSecondary};
`;

const VideoGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 30px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

const VideoCard = styled(motion.a)`
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    padding: 30px;
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.colors.border};
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    overflow: hidden;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px ${({ theme }) => theme.colors.shadow};
        border-color: ${({ theme }) => theme.colors.primary};

        .icon-wrapper {
            background: ${({ theme }) => theme.colors.primary};
            color: white;
            transform: scale(1.1);
        }
    }
`;

const IconWrapper = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    color: ${({ theme }) => theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    transition: all 0.3s ease;
    flex-shrink: 0;

    svg {
        font-size: 1.75rem;
    }
`;

const CardContent = styled.div`
    flex: 1;
`;

const CardTitle = styled.h3`
    font-size: 1.5rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 10px;
`;

const Author = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    margin-bottom: 20px;

    svg {
        color: ${({ theme }) => theme.colors.primary};
    }
`;

const LinkDisplay = styled.div`
    margin-top: auto;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    word-break: break-all;
`;

const videos = [
    {
        title: "Optical Automation, Mission Statement 2026",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/4531363/cda30e5828be7aa21757feb47a90aa80"
    },
    {
        title: "Video Index",
        author: "J.L. Avakian",
        url: "http://www.My1Apps.com"
    },
    {
        title: "Pinterest",
        author: "J.L. Avakian",
        url: "https://www.pinterest.com/jamesavakian/my-product-videos/"
    },
    {
        title: "Optical Automation",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3035980/b7b7c1a2ea14509b9b6e152036949f15"
    },
    {
        title: "Optical Automation, Mission Statement 2023",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3036644/5d5e973fde30a409cd59ec9ec36ee406"
    },
    {
        title: "Author, James L. Avakian",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3261325/ac1ef537457524ade58bc73cfe4c7a72"
    },
    {
        title: "Developer, James L. Avakian",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3714125/a539e52ce6ef052bf12e4ce7deb2d60e"
    },
    {
        title: "MyOneUniverse, Videos",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3097407/594a720b62bae68b534951d25eb0dbd3"
    },
    {
        title: "AmericaDiscovered",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3081382/4ca1b6f98216d3de312e043e19c7e477"
    },
    {
        title: "ShopperLady",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3036301/9daa88c0c742444f8edb2a1fd4961fdf"
    },
    {
        title: "MyPersonalOrganizer",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3036416/d13a69fe6ecd6b46d67bfbf36500ceb4"
    },
    {
        title: "MyBusinessOrganizer",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3039291/459a747027c6b92a0e5b3ca30f1ce2d2"
    },
    {
        title: "My Technology House",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3041713/2d4fb91f031c4c0a1344f4456c9204e5"
    },
    {
        title: "Technology and Times",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3041599/7951c6d469fd16c1f488856b2da18915"
    }
];

export default function ProductVideosPage() {
    return (
        <PageContainer>
            <ContentWrapper>
                <Header>
                    <TitleWrapper>
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
                        <Title
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ marginBottom: 0 }}
                        >
                            Company Product Videos
                        </Title>
                    </TitleWrapper>
                    <Subtitle
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Product and Company Videos
                    </Subtitle>
                </Header>

                <VideoGrid>
                    {videos.map((video, index) => (
                        <VideoCard
                            key={index}
                            href={video.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="video-card"
                        >
                            <IconWrapper className="icon-wrapper">
                                <FiPlayCircle />
                            </IconWrapper>
                            <CardContent>
                                <CardTitle>{video.title}</CardTitle>
                                <Author>
                                    <FiUser /> {video.author}
                                </Author>
                                <LinkDisplay>
                                    Watch Video <FiExternalLink />
                                </LinkDisplay>
                            </CardContent>
                        </VideoCard>
                    ))}
                </VideoGrid>
            </ContentWrapper>
        </PageContainer>
    );
}
