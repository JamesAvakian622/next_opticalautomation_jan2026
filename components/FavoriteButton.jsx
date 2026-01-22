'use client';

import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiHeart } from 'react-icons/fi';
import { useFavorites } from '@/contexts/FavoritesContext';

const Button = styled(motion.button)`
    width: ${({ $size }) => $size === 'large' ? '48px' : '36px'};
    height: ${({ $size }) => $size === 'large' ? '48px' : '36px'};
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme, $isFavorite }) =>
        $isFavorite ? theme.colors.accent : theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    color: ${({ $isFavorite }) => ($isFavorite ? 'white' : 'inherit')};
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
        background: ${({ theme }) => theme.colors.accent};
        color: white;
    }

    svg {
        font-size: ${({ $size }) => $size === 'large' ? '1.25rem' : '1rem'};
        fill: ${({ $isFavorite }) => ($isFavorite ? 'currentColor' : 'none')};
    }
`;

export default function FavoriteButton({ item, size = 'medium' }) {
    const { isFavorite, toggleFavorite } = useFavorites();
    const isActive = isFavorite(item.id);

    const handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(item);
    };

    return (
        <Button
            onClick={handleClick}
            $isFavorite={isActive}
            $size={size}
            whileTap={{ scale: 0.9 }}
            title={isActive ? 'Remove from favorites' : 'Add to favorites'}
            aria-label={isActive ? 'Remove from favorites' : 'Add to favorites'}
        >
            <FiHeart />
        </Button>
    );
}
