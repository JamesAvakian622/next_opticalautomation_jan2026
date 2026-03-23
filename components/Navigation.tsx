'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sun,
    Moon,
    Printer,
    Heart,
    User,
    Menu,
    X,
    LogIn,
    Home,
    Grid3X3,
    Cpu,
    Globe,
    FileText,
    Phone,
    ChevronDown,
    Code,
    Database,
    Smartphone,
    Server,
    Layers,
    Layout,
    ShoppingCart,
    Truck,
    DollarSign,
    Book,
    Settings,
    Mail,
    HelpCircle,
    Shield,
    Award,
    TrendingUp,
    Package,
    BarChart2,
    Calendar,
    Users,
    Zap,
    Terminal,
    Video,
    Flag,
    type LucideIcon
} from 'lucide-react';
import { useUser, useClerk } from '@clerk/nextjs';
import { useTheme } from 'next-themes';
import { useFavorites } from '@/contexts/FavoritesContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';

import WhoisLookup from './WhoisLookup';

// Mega Menu Data
import megaMenuDataRaw from '../data/megaMenu.json';

// Icon Map
const iconMap: Record<string, LucideIcon> = {
    FiSun: Sun,
    FiMoon: Moon,
    FiPrinter: Printer,
    FiHeart: Heart,
    FiUser: User,
    FiMenu: Menu,
    FiX: X,
    FiLogIn: LogIn,
    FiHome: Home,
    FiGrid: Grid3X3,
    FiCpu: Cpu,
    FiGlobe: Globe,
    FiFileText: FileText,
    FiPhone: Phone,
    FiChevronDown: ChevronDown,
    FiCode: Code,
    FiDatabase: Database,
    FiSmartphone: Smartphone,
    FiServer: Server,
    FiLayers: Layers,
    FiLayout: Layout,
    FiShoppingCart: ShoppingCart,
    FiTruck: Truck,
    FiDollarSign: DollarSign,
    FiBook: Book,
    FiSettings: Settings,
    FiMail: Mail,
    FiHelpCircle: HelpCircle,
    FiShield: Shield,
    FiAward: Award,
    FiTrendingUp: TrendingUp,
    FiPackage: Package,
    FiBarChart2: BarChart2,
    FiCalendar: Calendar,
    FiUsers: Users,
    FiZap: Zap,
    FiTerminal: Terminal,
    FiVideo: Video,
    FiFlag: Flag
};

interface MenuLink {
    label: string;
    href: string;
    desc?: string;
    icon: LucideIcon;
    requiresAuth?: boolean;
    highlight?: boolean;
    image?: string;
}

interface MenuSection {
    title: string;
    featured?: boolean;
    links: MenuLink[];
}

interface MenuItem {
    title: string;
    icon: LucideIcon;
    sections: MenuSection[];
    isAdminOnly?: boolean;
    directLink?: string;
}

// Process menu data to include actual icon components
const megaMenuData: Record<string, MenuItem> = Object.entries(megaMenuDataRaw).reduce((acc, [key, section]) => {
    const s = section as { icon: string; title: string; isAdminOnly?: boolean; directLink?: string; sections: Array<{ title: string; featured?: boolean; links: Array<{ icon: string; label: string; href: string; desc?: string; requiresAuth?: boolean; highlight?: boolean; image?: string }> }> };
    acc[key] = {
        ...s,
        icon: iconMap[s.icon] || Grid3X3,
        sections: s.sections.map(subSection => ({
            ...subSection,
            links: subSection.links.map(link => ({
                ...link,
                icon: iconMap[link.icon] || Grid3X3
            }))
        }))
    };
    return acc;
}, {} as Record<string, MenuItem>);

interface NavigationViewProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    user: { fullName?: string | null } | null;
    signOut: () => void;
}

/**
 * Public nav with megamenu when Clerk is not available (e.g. ClientLayoutNoClerk on Vercel).
 * Uses same UI as Navigation but with isAuthenticated=false so no Clerk hooks are needed.
 */
export function PublicNavigation() {
    return (
        <NavigationView
            isAuthenticated={false}
            isAdmin={false}
            user={null}
            signOut={() => {}}
        />
    );
}

function NavigationView({ isAuthenticated, isAdmin, user, signOut }: NavigationViewProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [mobileActiveMenu, setMobileActiveMenu] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { favorites } = useFavorites();
    const router = useRouter();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

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
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const toggleMenu = (menuKey: string) => {
        setActiveMenu(activeMenu === menuKey ? null : menuKey);
    };

    const toggleMobileMenu = (menuKey: string) => {
        setMobileActiveMenu(mobileActiveMenu === menuKey ? null : menuKey);
    };

    const handleAuthLink = (e: React.MouseEvent, link: MenuLink) => {
        if (link.requiresAuth && !isAuthenticated) {
            e.preventDefault();
            setActiveMenu(null);
            setMobileMenuOpen(false);
            router.push(`/sign-in?redirect_url=${encodeURIComponent(link.href)}`);
        } else {
            setActiveMenu(null);
            setMobileMenuOpen(false);
        }
    };

    const isDark = theme === 'dark';

    return (
        <>
            {/* Main Navigation */}
            <nav
                ref={navRef}
                className={cn(
                    "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 print:hidden",
                    scrolled
                        ? "bg-card/95 backdrop-blur-lg border-b border-border"
                        : "bg-transparent border-b border-transparent"
                )}
            >
                <div className="w-full max-w-[1680px] mx-auto px-10 py-4 flex items-center justify-between max-md:px-4 max-md:py-2">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 flex-shrink-0"
                        onClick={() => setActiveMenu(null)}
                    >
                        <div className="relative w-10 h-10">
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                        <span className="text-2xl font-bold text-foreground max-[900px]:hidden">
                            Optical Automation
                        </span>
                    </Link>

                    {/* Desktop Nav Links */}
                    <div className="flex items-center gap-1 flex-1 justify-center max-lg:hidden">
                        <Link
                            href="/"
                            className="flex items-center gap-1.5 text-foreground font-semibold text-xl px-4 py-2 rounded-md hover:text-primary hover:bg-primary/10 transition-all"
                        >
                            <Home className="w-5 h-5" />
                            Home
                        </Link>

                        {Object.entries(megaMenuData)
                            .filter(([_, menu]) => !menu.isAdminOnly || (isAuthenticated && isAdmin))
                            .map(([key, menu]) => (
                                <div key={key} className="relative">
                                    {menu.directLink ? (
                                        <Link
                                            href={menu.directLink}
                                            className="flex items-center gap-1.5 text-foreground font-semibold text-xl px-4 py-2 rounded-md hover:text-primary hover:bg-primary/10 transition-all"
                                            onClick={() => setActiveMenu(null)}
                                        >
                                            <menu.icon className="w-5 h-5" />
                                            {menu.title}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => toggleMenu(key)}
                                            className={cn(
                                                "flex items-center gap-1.5 font-semibold text-xl px-4 py-2 rounded-md transition-all",
                                                activeMenu === key
                                                    ? "text-primary bg-primary/15"
                                                    : "text-foreground hover:text-primary hover:bg-primary/10"
                                            )}
                                        >
                                            <menu.icon className="w-5 h-5" />
                                            {menu.title}
                                            <ChevronDown
                                                className={cn(
                                                    "w-3.5 h-3.5 transition-transform duration-300",
                                                    activeMenu === key && "rotate-180"
                                                )}
                                            />
                                        </button>
                                    )}
                                </div>
                            ))}
                    </div>

                    {/* Nav Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handlePrint}
                            title="Print this page"
                            aria-label="Print page"
                            className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground max-[480px]:w-9 max-[480px]:h-9"
                        >
                            <Printer className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground relative max-[480px]:w-9 max-[480px]:h-9"
                        >
                            <Link
                                href="/favorites"
                                title="View favorites"
                                aria-label="View favorites"
                                onClick={() => setActiveMenu(null)}
                            >
                                <Heart className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4" />
                                {favorites.length > 0 && (
                                    <span className="absolute -top-1 -right-1 w-[18px] h-[18px] flex items-center justify-center bg-accent text-white text-[10px] font-bold rounded-full">
                                        {favorites.length}
                                    </span>
                                )}
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(isDark ? 'light' : 'dark')}
                            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            aria-label="Toggle theme"
                            className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground max-[480px]:w-9 max-[480px]:h-9"
                        >
                            {mounted && (
                                isDark ? (
                                    <Sun className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4" />
                                ) : (
                                    <Moon className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4" />
                                )
                            )}
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            asChild
                            className={cn(
                                "w-10 h-10 rounded-full max-[480px]:w-9 max-[480px]:h-9",
                                isAuthenticated
                                    ? "bg-success text-white hover:bg-success/90"
                                    : "bg-muted hover:bg-primary hover:text-primary-foreground"
                            )}
                        >
                            <Link
                                href={isAuthenticated ? '/profile' : '/sign-in'}
                                title={isAuthenticated ? (user?.fullName || 'Profile') : 'Sign In'}
                                aria-label={isAuthenticated ? 'Profile' : 'Sign In'}
                                onClick={() => setActiveMenu(null)}
                            >
                                {isAuthenticated ? (
                                    <User className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4" />
                                ) : (
                                    <LogIn className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4" />
                                )}
                            </Link>
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(true)}
                            aria-label="Open menu"
                            className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground hidden max-lg:flex max-[480px]:w-9 max-[480px]:h-9"
                        >
                            <Menu className="w-[18px] h-[18px] max-[480px]:w-4 max-[480px]:h-4" />
                        </Button>
                    </div>
                </div>

                {/* Mega Menu Dropdowns */}
                <AnimatePresence>
                    {activeMenu && megaMenuData[activeMenu] && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="fixed top-[70px] left-0 right-0 w-full bg-card border-b border-border shadow-xl z-[999] overflow-hidden"
                        >
                            <div className="max-w-[1600px] mx-auto p-10 grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 max-md:grid-cols-1 max-md:p-6">
                                {megaMenuData[activeMenu].sections.map((section, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            section.featured && "gradient-bg rounded-xl p-4 text-white self-start h-fit"
                                        )}
                                    >
                                        <h4
                                            className={cn(
                                                "text-xs font-bold uppercase tracking-widest mb-4 pb-2 pl-4 border-b",
                                                section.featured
                                                    ? "text-white/80 border-white/20"
                                                    : "text-muted-foreground border-border"
                                            )}
                                        >
                                            {section.title}
                                        </h4>
                                        <div className="flex flex-col gap-4">
                                            {section.links.map((link, linkIdx) => (
                                                <Link
                                                    key={linkIdx}
                                                    href={link.requiresAuth && !isAuthenticated ? '#' : link.href}
                                                    onClick={(e) => handleAuthLink(e, link)}
                                                    className={cn(
                                                        "flex items-center gap-4 p-2 px-4 rounded-md transition-all",
                                                        section.featured
                                                            ? "text-white hover:bg-white/10"
                                                            : "text-foreground hover:bg-muted",
                                                        link.highlight && "bg-primary/15",
                                                        "hover:translate-x-1"
                                                    )}
                                                    style={link.image ? { alignItems: 'flex-start' } : {}}
                                                >
                                                    <div
                                                        className={cn(
                                                            "w-9 h-9 flex items-center justify-center rounded-md flex-shrink-0",
                                                            section.featured
                                                                ? "bg-white/10"
                                                                : "bg-muted"
                                                        )}
                                                    >
                                                        <link.icon
                                                            className={cn(
                                                                "w-4 h-4",
                                                                section.featured
                                                                    ? "text-white"
                                                                    : "text-primary"
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="block font-semibold text-xl">
                                                            {link.label}
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                "block text-xs mt-0.5",
                                                                section.featured
                                                                    ? "text-white/60"
                                                                    : "text-muted-foreground"
                                                            )}
                                                        >
                                                            {link.desc}
                                                        </span>
                                                    </div>
                                                    {link.image && (
                                                        <div className="ml-4 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
                                                            <Image
                                                                src={link.image}
                                                                alt={link.label}
                                                                width={200}
                                                                height={200}
                                                                className="block object-cover"
                                                            />
                                                        </div>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                        {section.featured && (
                                            <div className="mt-4">
                                                <WhoisLookup
                                                    placeholder="Domain search..."
                                                    buttonText="GO"
                                                    compact={true}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetContent side="right" className="w-full sm:max-w-md p-6 overflow-y-auto">
                    <SheetHeader className="mb-6">
                        <SheetTitle>
                            <Link
                                href="/"
                                className="flex items-center gap-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <div className="relative w-10 h-10">
                                    <Image
                                        src="/opauto.png"
                                        alt="Optical Automation"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <span className="text-2xl font-bold">Optical Automation</span>
                            </Link>
                        </SheetTitle>
                    </SheetHeader>

                    <div className="flex flex-col gap-2">
                        <Link
                            href="/"
                            className="flex items-center gap-3 text-foreground text-lg font-medium p-4 rounded-lg hover:bg-muted hover:text-primary transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Home className="w-5 h-5" /> Home
                        </Link>

                        {Object.entries(megaMenuData)
                            .filter(([_, menu]) => !menu.isAdminOnly || (isAuthenticated && isAdmin))
                            .map(([key, menu]) => (
                                <div key={key} className="rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => toggleMobileMenu(key)}
                                        className={cn(
                                            "flex items-center justify-between w-full gap-3 text-foreground text-lg font-medium p-4 rounded-lg transition-all",
                                            mobileActiveMenu === key
                                                ? "bg-muted"
                                                : "hover:bg-muted"
                                        )}
                                    >
                                        <span className="flex items-center gap-3">
                                            <menu.icon className="w-5 h-5" /> {menu.title}
                                        </span>
                                        <ChevronDown
                                            className={cn(
                                                "w-4 h-4 transition-transform duration-300",
                                                mobileActiveMenu === key && "rotate-180"
                                            )}
                                        />
                                    </button>
                                    <AnimatePresence>
                                        {mobileActiveMenu === key && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="pl-10 bg-muted rounded-lg mt-1 overflow-hidden"
                                            >
                                                {menu.sections.map((section, idx) => (
                                                    <div key={idx} className="py-4">
                                                        <div className="text-[11px] font-bold uppercase text-muted-foreground/60 mb-2 px-3">
                                                            {section.title}
                                                        </div>
                                                        {section.links.map((link, linkIdx) => (
                                                            <Link
                                                                key={linkIdx}
                                                                href={link.requiresAuth && !isAuthenticated ? '#' : link.href}
                                                                onClick={(e) => handleAuthLink(e, link)}
                                                                className="flex items-center gap-2 px-4 py-2 text-muted-foreground text-sm rounded-md hover:text-primary hover:bg-card transition-all"
                                                            >
                                                                <link.icon className="w-4 h-4" /> {link.label}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}

                        <div className="h-px bg-border my-6" />

                        <Link
                            href="/favorites"
                            className="flex items-center gap-3 text-foreground text-lg font-medium p-4 rounded-lg hover:bg-muted hover:text-primary transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <Heart className="w-5 h-5" />
                            Favorites {favorites.length > 0 && `(${favorites.length})`}
                        </Link>

                        <Link
                            href={isAuthenticated ? '/profile' : '/sign-in'}
                            className="flex items-center gap-3 text-foreground text-lg font-medium p-4 rounded-lg hover:bg-muted hover:text-primary transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {isAuthenticated ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                            {isAuthenticated ? (user?.fullName || 'Profile') : 'Sign In'}
                        </Link>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}

export default function Navigation() {
    const { user, isSignedIn } = useUser();
    const { signOut } = useClerk();
    const isAdmin = user?.primaryEmailAddress?.emailAddress?.toLowerCase() === 'software@opticalautomation.com';
    return (
        <NavigationView
            isAuthenticated={!!isSignedIn}
            isAdmin={!!isAdmin}
            user={user}
            signOut={signOut}
        />
    );
}
