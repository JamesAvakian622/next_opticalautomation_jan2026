'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import HeroCarousel from '@/components/HeroCarousel';
import InfoCards from '@/components/InfoCards';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Code,
    Server,
    Smartphone,
    Zap,
    Shield,
    TrendingUp,
    Grid3X3,
    Cpu,
    Globe,
    FileText,
    DollarSign,
    type LucideIcon
} from 'lucide-react';

interface Feature {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
}

interface QuickLink {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: Code,
        title: 'Modern Development',
        description: 'Cutting-edge development using React, Next.js, and the full MERN stack to build fast, scalable, and future-ready web applications. From dynamic frontends to robust backend architectures, every project is engineered with modern best practices and long-term maintainability in mind.',
        color: '#6366f1'
    },
    {
        icon: Zap,
        title: 'AI-Assisted',
        description: 'Intelligent development workflows powered by AI tools to accelerate delivery, improve code quality, and streamline complex tasks. This means faster iterations, cleaner architecture, and smarter solutions tailored to your business needs.',
        color: '#F59E0B'
    },
    {
        icon: Smartphone,
        title: 'Responsive Design',
        description: 'Pixel-perfect, mobile-first interfaces that adapt beautifully to any screen size. Whether on phones, tablets, or desktops, your users enjoy a seamless, intuitive experience designed for maximum engagement.',
        color: '#EC4899'
    },
    {
        icon: Server,
        title: 'Full-Stack Solutions',
        description: 'Complete end-to-end development covering frontend, backend, databases, and API integrations. From concept to deployment, every layer of your application is built to work together smoothly and efficiently.',
        color: '#10B981'
    },
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Industry-standard security practices, hardened infrastructure, and reliable deployment pipelines that protect your data and keep your application running smoothly. Peace of mind is built into every project.',
        color: '#EF4444'
    },
    {
        icon: TrendingUp,
        title: 'SEO Optimized',
        description: 'Search-engine-friendly architecture, clean semantic markup, and performance-focused optimizations that help your site rank higher and attract more organic traffic from day one.',
        color: '#06B6D4'
    }
];

const quickLinks: QuickLink[] = [
    {
        href: '/portfolio',
        icon: Grid3X3,
        title: 'Portfolio',
        description: 'View our work'
    },
    {
        href: '/tech',
        icon: Cpu,
        title: 'Technology',
        description: 'Our tech stack'
    },
    {
        href: '/products',
        icon: Globe,
        title: 'Products',
        description: 'Our platforms'
    },
    {
        href: '/documents',
        icon: FileText,
        title: 'Documents',
        description: 'Resources & guides'
    },
    {
        href: '/forgot-password',
        icon: Shield,
        title: 'Password Reset',
        description: 'Recover your account'
    },
    {
        href: '/pricing',
        icon: DollarSign,
        title: 'Pricing',
        description: 'Plans & packages'
    }
];

export default function HomePage() {
    return (
        <div className="min-h-[calc(100vh-70px)]">
            <HeroCarousel />
            
            {/* Hero Section */}
            <section className="min-h-[500px] flex items-center justify-center px-6 py-10 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,hsl(var(--primary)/0.15)_0%,transparent_70%)]" />
                
                <div className="max-w-[1200px] mx-0 text-center relative z-10 w-full flex flex-col items-center">
                    {/* Hero Header */}
                    <div className="flex items-center justify-center gap-10 mb-10 max-md:gap-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="relative w-20 h-20 max-md:w-[60px] max-md:h-[60px] flex-shrink-0 shadow-xl"
                        >
                            <Image
                                src="/opauto.png"
                                alt="Optical Automation"
                                fill
                                className="object-contain"
                                priority
                            />
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl max-md:text-[2rem] max-[480px]:text-[1.75rem] font-extrabold leading-tight"
                        >
                            <span className="gradient-text">Optical Automation</span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="text-xl max-md:text-lg text-foreground italic text-center mb-4 leading-relaxed"
                    >
                        We Produce App and Website Shared Database Applications!
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl max-md:text-base text-muted-foreground max-w-[900px] mb-10 leading-relaxed text-left"
                    >
                        We are a software development production company that uses Artificial Intelligence
                        to find information, research code, and use artificial intelligence for SEO Optimization
                        and Full Stack website, database, and mobile app performance as a system of all files.
                        We transform your ideas into powerful digital experiences with our talent and experience.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="text-xl max-md:text-lg text-foreground italic text-center mb-16 leading-relaxed max-w-[50%] max-md:max-w-full mx-auto"
                    >
                        &ldquo;When You Use Software, Mobile Apps Or Websites, ever forget which App or Website has the Information. With Our Software always know your Information Is stored !&rdquo;
                        <br />
                        <br />
                        James Avakian, Lead Developer, Optical Automation.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex gap-4 justify-center flex-wrap"
                    >
                        <Button asChild variant="gradient" size="xl">
                            <Link href="/portfolio" className="gap-2">
                                View Our Work <ArrowRight className="w-4 h-4" />
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="xl">
                            <Link href="/support">
                                Get In Touch
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 px-6 bg-card">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl max-md:text-[2rem] font-bold mb-4 text-center"
                        >
                            What We Offer
                        </motion.h2>
                        <p className="text-muted-foreground text-lg max-w-[900px] leading-relaxed text-left">
                            We provide MongoDB database solutions and full-stack development for web and mobile software applications. We develop your project from concept to deployment with application data sharing. Our services prioritize a convenient user experience, featuring visually intuitive automation to ensure seamless usability across app and website. With Agentic AI integration and SEO optimization, we build digital products that are as easy to use and discoverable making them powerful information technology solutions for our customers.
                        </p>
                    </div>

                    <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="h-full hover:border-primary hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                                    <CardContent className="p-10">
                                        <div
                                            className="w-[60px] h-[60px] rounded-lg flex items-center justify-center mb-6"
                                            style={{ backgroundColor: `${feature.color}20` }}
                                        >
                                            <feature.icon
                                                className="w-7 h-7"
                                                style={{ color: feature.color }}
                                            />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-6 gradient-bg">
                <div className="max-w-[1000px] mx-auto grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-10 text-left">
                    {[
                        { value: '36+', label: 'Projects Completed', delay: 0 },
                        { value: '99%', label: 'Client Satisfaction', delay: 0.1 },
                        { value: '24/7', label: 'Support Available', delay: 0.2 },
                        { value: '6+', label: 'Years Experience', delay: 0.3 }
                    ].map((stat) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: stat.delay }}
                            className="text-white"
                        >
                            <div className="text-5xl max-md:text-4xl font-extrabold mb-1">
                                {stat.value}
                            </div>
                            <div className="text-base opacity-90">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="py-16 px-6">
                <div className="max-w-[1000px] mx-auto px-10 flex flex-col items-center">
                    <div className="text-center mb-16 flex flex-col items-center">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl max-md:text-[2rem] font-bold mb-4 text-center"
                        >
                            Explore More
                        </motion.h2>
                        <p className="text-muted-foreground text-lg max-w-[900px] leading-relaxed text-left">
                            Discover our full range of services and resources.
                        </p>
                    </div>

                    <div className="grid grid-cols-3 gap-6 w-full max-[900px]:grid-cols-2 max-[500px]:grid-cols-1">
                        {quickLinks.map((link, index) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={link.href}
                                    className="group flex items-center gap-6 p-10 bg-card border border-border rounded-xl hover:border-primary hover:translate-x-2 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="w-14 h-14 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0">
                                        <link.icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-foreground mb-1">
                                            {link.title}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {link.description}
                                        </p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <InfoCards />

            {/* Testimonial Section */}
            <section className="py-16 px-6 bg-muted">
                <div className="max-w-[900px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <Card className="relative overflow-hidden">
                            {/* Top gradient bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 gradient-bg" />
                            
                            <CardContent className="p-16 max-md:p-10 text-center">
                                <div className="text-[1.75rem] mb-4 tracking-widest">
                                    {/* Using unicode stars instead of emoji */}
                                    {'★★★★★'}
                                </div>
                                <h3 className="text-lg font-bold uppercase tracking-widest mb-6 gradient-text">
                                    Marketing Testimonial
                                </h3>
                                <blockquote className="text-muted-foreground text-lg max-md:text-base leading-loose italic">
                                    &ldquo;Optical Automation doesn&rsquo;t just build apps&nbsp;&mdash; they build the systems that power entire businesses. Their team delivers lightning&#8209;fast, AI&#8209;driven, cross&#8209;platform platforms that feel like they were pulled straight from the future. While others ship interfaces, Optical Automation ships intelligence: agentic workflows, automated pipelines, and architecture that scales without breaking a sweat. If you want software that&rsquo;s smarter, faster, and engineered to last, Optical Automation is the team that makes it happen.&rdquo;
                                </blockquote>
                                <p className="text-foreground text-base font-semibold mt-6 tracking-wide">
                                    &mdash; Anonymous, Copilot.Microsoft.Com Reply
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
