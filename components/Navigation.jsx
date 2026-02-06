'use client';

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiSun,
    FiMoon,
    FiPrinter,
    FiHeart,
    FiUser,
    FiMenu,
    FiX,
    FiLogIn,
    FiHome,
    FiGrid,
    FiCpu,
    FiGlobe,
    FiFileText,
    FiPhone,
    FiChevronDown,
    FiCode,
    FiDatabase,
    FiSmartphone,
    FiServer,
    FiLayers,
    FiLayout,
    FiShoppingCart,
    FiTruck,
    FiDollarSign,
    FiBook,
    FiSettings,
    FiMail,
    FiHelpCircle,
    FiShield,
    FiAward,
    FiTrendingUp,
    FiPackage,
    FiBarChart2,
    FiCalendar,
    FiUsers,
    FiZap,
    FiTerminal,
    FiVideo
} from 'react-icons/fi';
import { useTheme } from './ThemeProvider';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';

import WhoisLookup from './WhoisLookup';

// Mega Menu Data
import megaMenuDataRaw from '../data/megaMenu.json';

// Icon Map
const iconMap = {
    FiSun, FiMoon, FiPrinter, FiHeart, FiUser, FiMenu, FiX, FiLogIn,
    FiHome, FiGrid, FiCpu, FiGlobe, FiFileText, FiPhone, FiChevronDown,
    FiCode, FiDatabase, FiSmartphone, FiServer, FiLayers, FiLayout,
    FiShoppingCart, FiTruck, FiDollarSign, FiBook, FiSettings, FiMail,
    FiHelpCircle, FiShield, FiAward, FiTrendingUp, FiPackage,
    FiBarChart2, FiCalendar, FiUsers, FiZap, FiTerminal, FiVideo
};

// Process menu data to include actual icon components
const megaMenuData = Object.entries(megaMenuDataRaw).reduce((acc, [key, section]) => {
    acc[key] = {
        ...section,
        icon: iconMap[section.icon] || FiGrid, // Fallback icon
        sections: section.sections.map(subSection => ({
            ...subSection,
            links: subSection.links.map(link => ({
                ...link,
                icon: iconMap[link.icon] || FiGrid // Fallback icon
            }))
        }))
    };
    return acc;
}, {});

// Styled Components
const Nav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: ${({ theme, $scrolled }) =>
        $scrolled ? theme.colors.surface : 'transparent'};
    backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(10px)' : 'none')};
    border-bottom: 1px solid
        ${({ theme, $scrolled }) =>
        $scrolled ? theme.colors.border : 'transparent'};
    transition: all 0.3s ease;

    @media print {
        display: none;
    }
`;

const NavContainer = styled.div`
    width: 100%;
    max-width: 1680px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    }
`;

const LogoLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    text-decoration: none;
    flex-shrink: 0;
`;

const LogoImage = styled.div`
    width: 40px;
    height: 40px;
    position: relative;
    border-radius: 0;
    overflow: hidden;
`;

const LogoText = styled.span`
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.text};

    @media (max-width: 900px) {
        display: none;
    }
`;

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.xs};
    flex: 1;
    justify-content: center;

    @media (max-width: 1024px) {
        display: none;
    }
`;

const NavItem = styled.div`
    position: relative;
`;

const NavLink = styled.button`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme, $isActive }) => $isActive ? theme.colors.primary : theme.colors.text};
    font-weight: 600;
    font-size: 1.25rem;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme, $isActive }) => $isActive ? `${theme.colors.primary}15` : 'transparent'};
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => `${theme.colors.primary}10`};
    }

    svg {
        font-size: 1.25rem;
        transition: transform 0.3s ease;
    }

    svg.chevron {
        font-size: 0.875rem;
        transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    }
`;

const SimpleNavLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    font-size: 1.25rem;
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => `${theme.colors.primary}10`};
    }

    svg {
        font-size: 1.25rem;
    }
`;

// Mega Menu Dropdown
const MegaMenuDropdown = styled(motion.div)`
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.surface};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 20px 60px ${({ theme }) => theme.colors.shadow};
    z-index: 999;
    overflow: hidden;
`;

const MegaMenuInner = styled.div`
    max-width: 1600px;
    margin: 0 auto;
    padding: ${({ theme }) => theme.spacing.xl};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${({ theme }) => theme.spacing.xl};

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: ${({ theme }) => theme.spacing.lg};
    }
`;

const MegaMenuSection = styled.div`
    ${({ $featured, theme }) => $featured && `
        background: ${theme.colors.gradient};
        border-radius: ${theme.borderRadius.xl};
        padding: ${theme.spacing.md};
        color: white;
        align-self: start;
        height: fit-content;
    `}
`;

const MegaMenuSectionTitle = styled.h4`
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.8)' : theme.colors.textSecondary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    padding-bottom: ${({ theme }) => theme.spacing.sm};
    padding-left: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ $featured, theme }) => $featured ? 'rgba(255,255,255,0.2)' : theme.colors.border};
`;

const MegaMenuLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
`;

const MegaMenuLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all 0.3s ease;
    color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.text};
    background: ${({ $highlight, theme }) => $highlight ? `${theme.colors.primary}15` : 'transparent'};

    &:hover {
        background: ${({ $featured, theme }) => $featured ? 'rgba(255, 255, 255, 0.1)' : theme.colors.backgroundAlt};
        transform: translateX(4px);
    }
`;

const MegaMenuLinkIcon = styled.div`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $featured, theme }) => $featured ? 'rgba(255, 255, 255, 0.1)' : theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    flex-shrink: 0;

    svg {
        font-size: 1rem;
        color: ${({ $featured, theme }) => $featured ? 'white' : theme.colors.primary};
    }
`;

const MegaMenuLinkContent = styled.div`
    flex: 1;
`;

const MegaMenuLinkTitle = styled.span`
    display: block;
    font-weight: 600;
    font-size: 1.25rem;
    color: inherit;
`;

const MegaMenuLinkDesc = styled.span`
    display: block;
    font-size: 0.75rem;
    color: ${({ $featured, theme }) => $featured ? 'rgba(255, 255, 255, 0.6)' : theme.colors.textSecondary};
    margin-top: 2px;
`;

const NavActions = styled.div`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    flex-shrink: 0;
`;

const ActionButton = styled.button`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:hover {
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        transform: scale(1.05);
    }

    svg {
        font-size: 1.125rem;
    }

    @media (max-width: 480px) {
        width: 36px;
        height: 36px;
        
        svg {
            font-size: 1rem;
        }
    }
`;

const FavoritesBadge = styled.span`
    position: absolute;
    top: -4px;
    right: -4px;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.accent};
    color: white;
    font-size: 0.625rem;
    font-weight: 700;
    border-radius: 50%;
`;

const UserButton = styled(ActionButton)`
    background: ${({ $isLoggedIn, theme }) =>
        $isLoggedIn ? theme.colors.success : theme.colors.backgroundAlt};
    color: ${({ $isLoggedIn }) => ($isLoggedIn ? 'white' : 'inherit')};
`;

const MobileMenuButton = styled(ActionButton)`
    display: none;

    @media (max-width: 1024px) {
        display: flex;
    }
`;

// Mobile Menu
const MobileMenu = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.background};
    z-index: 999;
    padding: ${({ theme }) => theme.spacing.xxl} ${({ theme }) => theme.spacing.lg};
    display: flex;
    flex-direction: column;
    overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const MobileNavLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
`;

const MobileNavItem = styled.div`
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    overflow: hidden;
`;

const MobileNavButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    gap: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.125rem;
    font-weight: 500;
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme, $isOpen }) => $isOpen ? theme.colors.backgroundAlt : 'transparent'};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.backgroundAlt};
    }

    svg.chevron {
        transition: transform 0.3s ease;
        transform: ${({ $isOpen }) => $isOpen ? 'rotate(180deg)' : 'rotate(0)'};
    }
`;

const MobileNavLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.125rem;
    font-weight: 500;
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    transition: all 0.3s ease;

    &:hover {
        background: ${({ theme }) => theme.colors.backgroundAlt};
        color: ${({ theme }) => theme.colors.primary};
    }

    svg {
        font-size: 1.25rem;
    }
`;

const MobileSubMenu = styled(motion.div)`
    padding: ${({ theme }) => theme.spacing.sm};
    padding-left: ${({ theme }) => theme.spacing.xl};
    background: ${({ theme }) => theme.colors.backgroundAlt};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    margin-top: ${({ theme }) => theme.spacing.xs};
`;

const MobileSubLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing.sm};
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 0.9rem;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.colors.primary};
        background: ${({ theme }) => theme.colors.surface};
    }

    svg {
        font-size: 1rem;
    }
`;

const MobileMenuDivider = styled.div`
    height: 1px;
    background: ${({ theme }) => theme.colors.border};
    margin: ${({ theme }) => theme.spacing.lg} 0;
`;

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState(null);
    const [mobileActiveMenu, setMobileActiveMenu] = useState(null);
    const { isDark, toggleTheme } = useTheme();
    const { favorites } = useFavorites();
    const { user, isAuthenticated } = useAuth();
    const navRef = useRef(null);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const toggleMenu = (menuKey) => {
        setActiveMenu(activeMenu === menuKey ? null : menuKey);
    };

    const toggleMobileMenu = (menuKey) => {
        setMobileActiveMenu(mobileActiveMenu === menuKey ? null : menuKey);
    };

    return (
        <>
            <Nav $scrolled={scrolled} ref={navRef}>
                <NavContainer>
                    <LogoLink href="/" onClick={() => setActiveMenu(null)}>
                        <LogoImage>
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                style={{ objectFit: 'contain' }}
                                priority
                            />
                        </LogoImage>
                        <LogoText>Optical Automation</LogoText>
                    </LogoLink>

                    <NavLinks>
                        <SimpleNavLink href="/">
                            <FiHome />
                            Home
                        </SimpleNavLink>

                        {Object.entries(megaMenuData)
                            .filter(([_, menu]) => !menu.isAdminOnly || (isAuthenticated && user?.role === 'admin'))
                            .map(([key, menu]) => (
                                <NavItem key={key}>
                                    {menu.directLink ? (
                                        <SimpleNavLink
                                            href={menu.directLink}
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            <menu.icon />
                                            {menu.title}
                                        </SimpleNavLink>
                                    ) : (
                                        <NavLink
                                            onClick={() => toggleMenu(key)}
                                            $isActive={activeMenu === key}
                                            $isOpen={activeMenu === key}
                                        >
                                            <menu.icon />
                                            {menu.title}
                                            <FiChevronDown className="chevron" />
                                        </NavLink>
                                    )}
                                </NavItem>
                            ))}
                    </NavLinks>

                    <NavActions>
                        <ActionButton
                            onClick={handlePrint}
                            title="Print this page"
                            aria-label="Print page"
                        >
                            <FiPrinter />
                        </ActionButton>

                        <ActionButton
                            as={Link}
                            href="/favorites"
                            title="View favorites"
                            aria-label="View favorites"
                            onClick={() => setActiveMenu(null)}
                        >
                            <FiHeart />
                            {favorites.length > 0 && (
                                <FavoritesBadge>{favorites.length}</FavoritesBadge>
                            )}
                        </ActionButton>

                        <ActionButton
                            onClick={toggleTheme}
                            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <FiSun /> : <FiMoon />}
                        </ActionButton>

                        <UserButton
                            as={Link}
                            href={isAuthenticated ? '/profile' : '/login'}
                            $isLoggedIn={isAuthenticated}
                            title={isAuthenticated ? user?.name : 'Login'}
                            aria-label={isAuthenticated ? 'Profile' : 'Login'}
                            onClick={() => setActiveMenu(null)}
                        >
                            {isAuthenticated ? <FiUser /> : <FiLogIn />}
                        </UserButton>

                        <MobileMenuButton
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <FiMenu />
                        </MobileMenuButton>
                    </NavActions>
                </NavContainer>

                {/* Mega Menu Dropdowns */}
                <AnimatePresence>
                    {activeMenu && megaMenuData[activeMenu] && (
                        <MegaMenuDropdown
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <MegaMenuInner>
                                {megaMenuData[activeMenu].sections.map((section, idx) => (
                                    <MegaMenuSection key={idx} $featured={section.featured}>
                                        <MegaMenuSectionTitle $featured={section.featured}>
                                            {section.title}
                                        </MegaMenuSectionTitle>
                                        <MegaMenuLinks>
                                            {section.links.map((link, linkIdx) => (
                                                <MegaMenuLink
                                                    key={linkIdx}
                                                    href={link.href}
                                                    onClick={() => setActiveMenu(null)}
                                                    $featured={section.featured}
                                                    $highlight={link.highlight}
                                                    style={link.image ? { display: 'flex', alignItems: 'flex-start' } : {}}
                                                >
                                                    <MegaMenuLinkIcon $featured={section.featured}>
                                                        <link.icon />
                                                    </MegaMenuLinkIcon>
                                                    <MegaMenuLinkContent>
                                                        <MegaMenuLinkTitle $highlight={link.highlight}>{link.label}</MegaMenuLinkTitle>
                                                        <MegaMenuLinkDesc $featured={section.featured}>
                                                            {link.desc}
                                                        </MegaMenuLinkDesc>
                                                    </MegaMenuLinkContent>
                                                    {link.image && (
                                                        <div style={{
                                                            marginLeft: '16px',
                                                            borderRadius: '8px',
                                                            overflow: 'hidden',
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                            flexShrink: 0
                                                        }}>
                                                            <Image
                                                                src={link.image}
                                                                alt={link.label}
                                                                width={200}
                                                                height={200}
                                                                style={{ display: 'block', objectFit: 'cover' }}
                                                            />
                                                        </div>
                                                    )}
                                                </MegaMenuLink>
                                            ))}
                                        </MegaMenuLinks>
                                        {section.featured && (
                                            <div style={{ marginTop: '1rem' }}>
                                                <WhoisLookup
                                                    placeholder="Domain search..."
                                                    buttonText="GO"
                                                    compact={true}
                                                />
                                            </div>
                                        )}
                                    </MegaMenuSection>
                                ))}
                            </MegaMenuInner>
                        </MegaMenuDropdown>
                    )}
                </AnimatePresence>
            </Nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <MobileMenu
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <MobileMenuHeader>
                            <LogoLink href="/" onClick={() => setMobileMenuOpen(false)}>
                                <LogoImage>
                                    <Image
                                        src="/opauto.png"
                                        alt="Optical Automation"
                                        fill
                                        style={{ objectFit: 'contain' }}
                                    />
                                </LogoImage>
                                <LogoText style={{ display: 'block' }}>Optical Automation</LogoText>
                            </LogoLink>
                            <ActionButton onClick={() => setMobileMenuOpen(false)}>
                                <FiX />
                            </ActionButton>
                        </MobileMenuHeader>

                        <MobileNavLinks>
                            <MobileNavLink href="/" onClick={() => setMobileMenuOpen(false)}>
                                <FiHome /> Home
                            </MobileNavLink>

                            {Object.entries(megaMenuData)
                                .filter(([_, menu]) => !menu.isAdminOnly || (isAuthenticated && user?.role === 'admin'))
                                .map(([key, menu]) => (
                                    <MobileNavItem key={key}>
                                        <MobileNavButton
                                            onClick={() => toggleMobileMenu(key)}
                                            $isOpen={mobileActiveMenu === key}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <menu.icon /> {menu.title}
                                            </span>
                                            <FiChevronDown className="chevron" />
                                        </MobileNavButton>
                                        <AnimatePresence>
                                            {mobileActiveMenu === key && (
                                                <MobileSubMenu
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                >
                                                    {menu.sections.map((section, idx) => (
                                                        <div key={idx} style={{ marginBottom: '16px' }}>
                                                            <div style={{
                                                                fontSize: '0.7rem',
                                                                fontWeight: '700',
                                                                textTransform: 'uppercase',
                                                                color: 'rgba(255,255,255,0.4)',
                                                                marginBottom: '8px',
                                                                paddingLeft: '12px'
                                                            }}>
                                                                {section.title}
                                                            </div>
                                                            {section.links.map((link, linkIdx) => (
                                                                <MobileSubLink
                                                                    key={linkIdx}
                                                                    href={link.href}
                                                                    onClick={() => setMobileMenuOpen(false)}
                                                                >
                                                                    <link.icon /> {link.label}
                                                                </MobileSubLink>
                                                            ))}
                                                        </div>
                                                    ))}
                                                </MobileSubMenu>
                                            )}
                                        </AnimatePresence>
                                    </MobileNavItem>
                                ))}

                            <MobileMenuDivider />

                            <MobileNavLink
                                href="/favorites"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <FiHeart />
                                Favorites {favorites.length > 0 && `(${favorites.length})`}
                            </MobileNavLink>

                            <MobileNavLink
                                href={isAuthenticated ? '/profile' : '/login'}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {isAuthenticated ? <FiUser /> : <FiLogIn />}
                                {isAuthenticated ? user?.name : 'Login / Register'}
                            </MobileNavLink>
                        </MobileNavLinks>
                    </MobileMenu>
                )}
            </AnimatePresence>
        </>
    );
}
