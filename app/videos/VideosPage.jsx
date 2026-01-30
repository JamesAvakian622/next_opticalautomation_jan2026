'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiPlay,
    FiExternalLink,
    FiVideo,
    FiSearch,
    FiFilter,
    FiYoutube,
    FiLayout,
    FiTv
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
    max-width: 1400px;
    margin: 0 auto;
`;

const HeroSection = styled.div`
    text-align: center;
    margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const Title = styled(motion.h1)`
    font-size: 3.5rem;
    margin-bottom: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: inline-flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }
`;

const Subtitle = styled.p`
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 1.25rem;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
`;

const SearchBar = styled.div`
    display: flex;
    gap: ${({ theme }) => theme.spacing.md};
    margin-bottom: ${({ theme }) => theme.spacing.xl};
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;

    @media (max-width: 600px) {
        flex-direction: column;
    }
`;

const SearchInputWrapper = styled.div`
    flex: 1;
    position: relative;

    svg {
        position: absolute;
        left: ${({ theme }) => theme.spacing.md};
        top: 50%;
        transform: translateY(-50%);
        color: ${({ theme }) => theme.colors.textSecondary};
    }
`;

const SearchInput = styled.input`
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
        box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}20;
    }
`;

const VideosGrid = styled(motion.div)`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};
`;

const VideoCard = styled(motion.div)`
    background: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.borderRadius.xl};
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px ${({ theme }) => theme.colors.shadow};
        border-color: ${({ theme }) => theme.colors.primary};
    }
`;

const VideoThumbnail = styled.div`
    position: relative;
    aspect-ratio: 16 / 9;
    background: ${({ $color }) => $color || '#1a1a1a'};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    &::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6));
    }

    svg.play-icon {
        font-size: 3rem;
        color: white;
        opacity: 0.8;
        z-index: 1;
        transition: all 0.3s ease;
    }

    ${VideoCard}:hover & svg.play-icon {
        transform: scale(1.2);
        opacity: 1;
    }
`;

const VideoInfo = styled.div`
    padding: ${({ theme }) => theme.spacing.lg};
`;

const VideoCategory = styled.span`
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 600;
    display: block;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const VideoTitle = styled.h3`
    font-size: 1.25rem;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.4;
`;

const VideoAuthor = styled.p`
    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const VideoLink = styled.a`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
    background: ${({ theme }) => theme.colors.gradient};
    color: white;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: 0.875rem;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px ${({ theme }) => theme.colors.shadow};
    }
`;

const videos = [
    {
        id: 1,
        title: "Video Index",
        category: "Collections",
        author: "J.L. Avakian",
        url: "http://www.My1Apps.com",
        color: "#6366f1",
        platform: "Web"
    },
    {
        id: 2,
        title: "Pinterest Video Collection",
        category: "Social",
        author: "J.L. Avakian",
        url: "https://www.pinterest.com/jamesavakian/my-product-videos/",
        color: "#E60023",
        platform: "Pinterest"
    },
    {
        id: 3,
        title: "Optical Automation",
        category: "Company",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3035980/b7b7c1a2ea14509b9b6e152036949f15",
        color: "#14B8A6",
        platform: "Biteable"
    },
    {
        id: 4,
        title: "Optical Automation, Mission Statement 2023",
        category: "Company",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3036644/5d5e973fde30a409cd59ec9ec36ee406",
        color: "#0EA5E9",
        platform: "Biteable"
    },
    {
        id: 5,
        title: "Author, James L. Avakian",
        category: "Bio",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3261325/ac1ef537457524ade58bc73cfe4c7a72",
        color: "#8B5CF6",
        platform: "Biteable"
    },
    {
        id: 6,
        title: "Developer, James L. Avakian",
        category: "Bio",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3714125/a539e52ce6ef052bf12e4ce7deb2d60e",
        color: "#EC4899",
        platform: "Biteable"
    },
    {
        id: 7,
        title: "MyOneUniverse, Videos",
        category: "Product",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3097407/594a720b62bae68b534951d25eb0dbd3",
        color: "#F59E0B",
        platform: "Biteable"
    },
    {
        id: 8,
        title: "AmericanaDiscovered",
        category: "Project",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3081382/4ca1b6f98216d3de312e043e19c7e477",
        color: "#F97316",
        platform: "Biteable"
    },
    {
        id: 9,
        title: "ShopperLady",
        category: "Product",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3036301/9daa88c0c742444f8edb2a1fd4961fdf",
        color: "#DB2777",
        platform: "Biteable"
    },
    {
        id: 10,
        title: "PersonalOrganizer",
        category: "Product",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3036416/d13a69fe6ecd6b46d67bfbf36500ceb4",
        color: "#4F46E5",
        platform: "Biteable"
    },
    {
        id: 11,
        title: "BusinessOrganizer",
        category: "Product",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3039291/459a747027c6b92a0e5b3ca30f1ce2d2",
        color: "#7C3AED",
        platform: "Biteable"
    },
    {
        id: 12,
        title: "My Technology House",
        category: "Company",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3041713/2d4fb91f031c4c0a1344f4456c9204e5",
        color: "#059669",
        platform: "Biteable"
    },
    {
        id: 13,
        title: "Technology and Times",
        category: "Media",
        author: "J.L. Avakian",
        url: "https://biteable.com/watch/3041599/7951c6d469fd16c1f488856b2da18915",
        color: "#06B6D4",
        platform: "Biteable"
    }
];

export default function VideosPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        video.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <PageWrapper>
            <Container>
                <HeroSection>
                    <Title
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <FiTv /> Product Videos
                    </Title>
                    <Subtitle>
                        Explore our collection of product demonstrations, company mission statements, and developer showcases.
                    </Subtitle>
                </HeroSection>

                <SearchBar>
                    <SearchInputWrapper>
                        <FiSearch />
                        <SearchInput
                            type="text"
                            placeholder="Search videos by title or category..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </SearchInputWrapper>
                </SearchBar>

                <VideosGrid
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                >
                    <AnimatePresence>
                        {filteredVideos.map((video) => (
                            <VideoCard
                                key={video.id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                layout
                            >
                                <VideoThumbnail $color={video.color}>
                                    <FiPlay className="play-icon" />
                                </VideoThumbnail>
                                <VideoInfo>
                                    <VideoCategory>{video.category} • {video.platform}</VideoCategory>
                                    <VideoTitle>{video.title}</VideoTitle>
                                    <VideoAuthor>{video.author}</VideoAuthor>
                                    <VideoLink
                                        href={video.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <FiExternalLink /> Watch Video
                                    </VideoLink>
                                </VideoInfo>
                            </VideoCard>
                        ))}
                    </AnimatePresence>
                </VideosGrid>
            </Container>
        </PageWrapper>
    );
}
