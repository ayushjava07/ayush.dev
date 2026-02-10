import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
    Github,
    Linkedin,
    Twitter,
    Mail,
    ExternalLink,
    ChevronDown,
    ChevronRight,
    Terminal,
    Briefcase,
    FolderGit2,
    Layers,
    ArrowUpRight,
    MapPin,
    Calendar,
    GitBranch,
    GitCommit,
    Star,
    Code2,
    Menu,
    X,
} from 'lucide-react';
import ThemeSelector from './ThemeSelector';

/* ═══════════════════════════════════════════════
   ANIMATION VARIANTS
   ═══════════════════════════════════════════════ */
const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
    }),
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.08 },
    }),
};

const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
    },
};

/* ═══════════════════════════════════════════════
   SECTION WRAPPER (scroll-triggered animation)
   ═══════════════════════════════════════════════ */
const Section = ({ children, id, className = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.section
            ref={ref}
            id={id}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={staggerContainer}
            className={`relative ${className}`}
        >
            {children}
        </motion.section>
    );
};

/* ═══════════════════════════════════════════════
   NAVIGATION BAR
   ═══════════════════════════════════════════════ */
const NAV_LINKS = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'GitHub', href: '#github' },
    { label: 'Stack', href: '#stack' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handle = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handle);
        return () => window.removeEventListener('scroll', handle);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800/60 shadow-sm dark:shadow-none'
                : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="#" className="relative group flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">
                        A
                    </div>
                    <span className="font-semibold text-zinc-900 dark:text-white tracking-tight hidden sm:inline">
                        ayush<span className="text-indigo-400">.dev</span>
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="px-3 py-1.5 text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* CTA + Theme Toggle + Mobile Toggle */}
                <div className="flex items-center gap-3">
                    <a
                        href="mailto:ayushjhasahab07@gmail.com"
                        className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
                    >
                        <Mail size={14} />
                        Get in Touch
                    </a>

                    <ThemeSelector />

                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden bg-white/95 dark:bg-[#0f0f12]/95 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800 px-6 pb-6 pt-2"
                >
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-3 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="mailto:ayushjhasahab07@gmail.com"
                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white"
                    >
                        <Mail size={14} /> Get in Touch
                    </a>
                </motion.div>
            )}
        </header>
    );
};

/* ═══════════════════════════════════════════════
   HERO / ABOUT SECTION — Center-aligned Minimal
   ═══════════════════════════════════════════════ */
const HeroSection = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

    return (
        <section ref={ref} id="about" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
            {/* Ambient background blobs */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-500/20 dark:bg-indigo-600/8 blur-[140px] animate-blob" />
                <div className="absolute top-1/2 -left-20 w-[350px] h-[350px] rounded-full bg-violet-500/20 dark:bg-violet-600/6 blur-[120px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-blue-500/20 dark:bg-blue-600/6 blur-[100px] animate-blob animation-delay-4000" />
            </motion.div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

            {/* Content — all center-aligned */}
            <div className="relative max-w-3xl mx-auto px-6 py-10 md:py-16 w-full flex flex-col items-center text-center">
                {/* Availability badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 mb-6 rounded-full border border-zinc-200 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-sm text-sm text-zinc-600 dark:text-zinc-400 shadow-sm dark:shadow-none"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    Available for opportunities
                </motion.div>

                {/* Name — prominent, center */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
                    className="text-6xl sm:text-7xl md:text-8xl lg:text-[6rem] font-black tracking-tight leading-[1.05] mb-4"
                >
                    <span className="text-zinc-900 dark:text-white">Ayush Kumar</span>{' '}
                    <span className="text-gradient">Jha</span>
                </motion.h1>

                {/* Subtitle — single line */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="text-xl sm:text-2xl md:text-3xl text-zinc-500 dark:text-zinc-400 font-light tracking-wide mb-5"
                >
                    Web Developer & Web3 Enthusiast
                </motion.p>

                {/* Description — max 2 lines */}
                <motion.p
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-500 leading-relaxed max-w-xl mb-8"
                >
                    Building interactive, high-performance web applications with a focus on
                    clean UI/UX, frontend animations, open-source, and Solana-based projects.
                </motion.p>

                {/* CTA Buttons — centered row */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.55 }}
                    className="flex flex-wrap justify-center gap-4 mb-6"
                >
                    <a
                        href="mailto:ayushjhasahab07@gmail.com"
                        className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-medium text-sm hover:from-indigo-500 hover:to-violet-500 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 hover:-translate-y-0.5"
                    >
                        <Mail size={16} />
                        Get in Touch
                    </a>
                    <a
                        href="https://github.com/ayushjava07"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-full border border-zinc-300 dark:border-zinc-700/80 bg-white dark:bg-transparent text-zinc-700 dark:text-zinc-300 font-medium text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/50 hover:border-zinc-400 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        <Github size={16} />
                        View GitHub
                    </a>
                </motion.div>

                {/* Social icons — centered, small */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex items-center justify-center gap-2"
                >
                    {[
                        { icon: <Github size={17} />, href: 'https://github.com/ayushjava07', label: 'GitHub' },
                        { icon: <Linkedin size={17} />, href: 'https://www.linkedin.com/in/ayush-kumar-jha-09257b2b2/', label: 'LinkedIn' },
                        { icon: <Twitter size={17} />, href: 'https://x.com/Ayushdev_01', label: 'X (Twitter)' },
                    ].map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="p-2.5 rounded-full text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-all duration-300"
                        >
                            {s.icon}
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
            >
                <span className="text-[10px] tracking-[0.2em] uppercase font-mono">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <ChevronDown size={14} />
                </motion.div>
            </motion.div>
        </section>
    );
};

/* ═══════════════════════════════════════════════
   EXPERIENCE SECTION
   ═══════════════════════════════════════════════ */
const EXPERIENCES = [
    {
        company: 'DCC (Developer & Coding Club)',
        role: 'Core Web Developer',
        period: 'Oct 2025 – Present',
        type: 'On-Campus',
        logo: 'DC',
        gradient: 'from-indigo-500 to-blue-500',
        bullets: [
            'Core contributor to the club\'s official website and internal tools.',
            'Designed and implemented reusable, responsive UI components.',
            'Collaborated with team members to ship features efficiently.',
            'Optimized frontend performance and code maintainability.',
        ],
        tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'Git', 'Vercel'],
    },
    {
        company: 'Graphixio',
        role: 'Freelance Web Developer',
        period: 'Apr 2025 – Present',
        type: 'Remote',
        logo: 'GX',
        gradient: 'from-violet-500 to-purple-500',
        bullets: [
            'Delivered animated landing pages and interactive product showcases.',
            'Built smooth UI animations focused on user engagement.',
            'Converted Figma designs into pixel-perfect responsive layouts.',
            'Worked directly with clients and iterated based on feedback.',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Spline', 'Figma'],
    },
    {
        company: 'SSOC\'24 (Social Summer of Code)',
        role: 'Open Source Contributor',
        period: 'May 2025 – Present',
        type: 'Remote',
        logo: 'OS',
        gradient: 'from-emerald-500 to-teal-500',
        bullets: [
            'Contributed to multiple open-source projects with merged PRs.',
            'Fixed bugs, added features, and improved documentation.',
            'Followed standard GitHub workflows and best practices.',
        ],
        tech: ['JavaScript', 'Markdown', 'GitHub'],
    },
];

const ExperienceCard = ({ exp, index }) => {
    const [open, setOpen] = useState(index === 0);

    return (
        <motion.div
            variants={fadeUp}
            custom={index}
            className="group relative"
        >
            {/* Timeline connector */}
            {index < EXPERIENCES.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-px bg-gradient-to-b from-zinc-700 to-transparent hidden md:block" />
            )}

            <div
                className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${open
                    ? 'border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-900/60 shadow-xl shadow-zinc-200/50 dark:shadow-black/20'
                    : 'border-zinc-200/60 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/20 hover:border-zinc-300/60 dark:hover:border-zinc-700/60 hover:bg-white/80 dark:hover:bg-zinc-900/40'
                    }`}
            >
                {/* Top gradient bar */}
                <div className={`h-[2px] w-full bg-gradient-to-r ${exp.gradient} opacity-60`} />

                {/* Header */}
                <div
                    className="p-4 sm:p-5 flex items-start justify-between cursor-pointer"
                    onClick={() => setOpen(!open)}
                >
                    <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${exp.gradient} flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg`}>
                            {exp.logo}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2 flex-wrap">
                                {exp.company}
                            </h3>
                            <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm mt-0.5">{exp.role}</p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-zinc-500">
                                <span className="flex items-center gap-1">
                                    <Calendar size={12} /> {exp.period}
                                </span>
                                <span className="flex items-center gap-1">
                                    <MapPin size={12} /> {exp.type}
                                </span>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        animate={{ rotate: open ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-zinc-500 mt-1 shrink-0"
                    >
                        <ChevronDown size={18} />
                    </motion.div>
                </div>

                {/* Expandable content */}
                <motion.div
                    initial={false}
                    animate={{
                        height: open ? 'auto' : 0,
                        opacity: open ? 1 : 0,
                    }}
                    transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
                    className="overflow-hidden"
                >
                    <div className="px-4 sm:px-5 pb-4 sm:pl-[88px]">
                        <ul className="space-y-2 mb-5">
                            {exp.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-zinc-400 leading-relaxed">
                                    <ChevronRight size={14} className="text-indigo-400 mt-0.5 shrink-0" />
                                    {b}
                                </li>
                            ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                            {exp.tech.map((t) => (
                                <span
                                    key={t}
                                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-100/80 dark:bg-zinc-800/80 text-zinc-500 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/50"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

const ExperienceSection = () => (
    <Section id="experience" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center gap-2 text-sm font-mono text-indigo-400 mb-3">
                    <Briefcase size={14} />
                    EXPERIENCE
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
                    Where I've <span className="text-gradient">Contributed</span>
                </h2>
            </motion.div>

            <div className="space-y-5 max-w-3xl">
                {EXPERIENCES.map((exp, i) => (
                    <ExperienceCard key={exp.company} exp={exp} index={i} />
                ))}
            </div>
        </div>
    </Section>
);

/* ═══════════════════════════════════════════════
   PROJECTS SECTION
   ═══════════════════════════════════════════════ */
const PROJECTS = [
    {
        title: 'DripX V2',
        subtitle: 'Solana Wallet Interaction DApp',
        description:
            'Full-featured Solana DApp with wallet connection, Devnet airdrops, balance checking, message signing, and on-chain transaction execution.',
        tech: ['React.js', 'Tailwind CSS', '@solana/web3.js', 'Wallet Adapter', 'Phantom'],
        gradient: 'from-indigo-500 via-violet-500 to-purple-500',
        icon: '◈',
    },
    {
        title: 'Wallify.io',
        subtitle: 'Solana Wallet Generator',
        description:
            'Browser-based wallet generator that creates Solana keypairs and mnemonic seed phrases securely — all client-side.',
        tech: ['React.js', 'Node.js', '@solana/web3.js', 'bs58', 'tweetnacl'],
        gradient: 'from-cyan-500 via-blue-500 to-indigo-500',
        icon: '⬡',
    },
    {
        title: 'Event Covering Website',
        subtitle: 'Interactive Event Landing Page',
        description:
            'Responsive event page featuring countdown timers, smooth scroll-driven animations, and an interactive, engagement-focused UI.',
        tech: ['HTML', 'CSS', 'JavaScript', 'GSAP', 'Locomotive.js'],
        gradient: 'from-amber-500 via-orange-500 to-red-500',
        icon: '◇',
    },
    {
        title: 'Fanta Brand Ad Page',
        subtitle: 'Animated Product Advertisement',
        description:
            'Engaging 2D animated product advertisement page with dynamic visuals and smooth interaction-driven animations.',
        tech: ['HTML', 'CSS', 'JavaScript', 'GSAP'],
        gradient: 'from-green-500 via-emerald-500 to-teal-500',
        icon: '△',
    },
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        variants={fadeUp}
        custom={index}
        className="group relative"
    >
        <div className="relative h-full rounded-2xl border border-zinc-200 dark:border-zinc-800/50 bg-white dark:bg-zinc-900/30 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/60 hover:border-zinc-300 dark:hover:border-zinc-700/60 transition-all duration-500 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 dark:hover:shadow-black/20">
            {/* Top gradient shimmer */}
            <div className={`h-[2px] w-full bg-gradient-to-r ${project.gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-500`} />

            {/* Glow on hover */}
            <div className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${project.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-700 pointer-events-none`} />

            <div className="relative p-4 sm:p-5 flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white text-lg shadow-lg`}>
                        {project.icon}
                    </div>
                    <ExternalLink
                        size={18}
                        className="text-zinc-600 group-hover:text-indigo-400 transition-colors duration-300"
                    />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-gradient transition-all duration-300">
                    {project.title}
                </h3>
                <p className="text-indigo-400/80 text-base font-medium mb-3">{project.subtitle}</p>

                {/* Description */}
                <p className="text-zinc-500 dark:text-zinc-400 text-base leading-relaxed mb-6 flex-grow">
                    {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                        <span
                            key={t}
                            className="px-2 py-1 rounded-md text-[11px] font-mono text-zinc-500 bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800/80"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
);

const ProjectsSection = () => (
    <Section id="projects" className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center gap-2 text-sm font-mono text-indigo-400 mb-3">
                    <FolderGit2 size={14} />
                    FEATURED PROJECTS
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
                    Things I've <span className="text-gradient">Built</span>
                </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6 md:gap-4">
                {PROJECTS.map((p, i) => (
                    <ProjectCard key={p.title} project={p} index={i} />
                ))}
            </div>

            <motion.div variants={fadeUp} className="mt-10 text-center">
                <a
                    href="https://github.com/ayushjava07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-indigo-400 transition-colors duration-300"
                >
                    View all projects on GitHub
                    <ArrowUpRight size={14} />
                </a>
            </motion.div>
        </div>
    </Section>
);

/* ═══════════════════════════════════════════════
   GITHUB SECTION — REAL DATA
   ═══════════════════════════════════════════════ */

const GITHUB_USERNAME = 'ayushjava07';

const useGitHubData = () => {
    const [profile, setProfile] = useState(null);
    const [events, setEvents] = useState([]);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [profileRes, eventsRes, reposRes] = await Promise.all([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`),
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`),
                ]);
                const [profileData, eventsData, reposData] = await Promise.all([
                    profileRes.json(),
                    eventsRes.json(),
                    reposRes.json(),
                ]);
                setProfile(profileData);
                setEvents(Array.isArray(eventsData) ? eventsData : []);
                setRepos(Array.isArray(reposData) ? reposData : []);
            } catch (err) {
                console.error('GitHub API error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    return { profile, events, repos, loading };
};

const getEventDescription = (event) => {
    const repo = event.repo?.name?.replace(`${GITHUB_USERNAME}/`, '') || event.repo?.name;
    switch (event.type) {
        case 'PushEvent': {
            const count = event.payload?.size || event.payload?.commits?.length || 1;
            return { action: `Pushed ${count} commit${count > 1 ? 's' : ''}`, repo, icon: <GitCommit size={14} /> };
        }
        case 'CreateEvent':
            return { action: `Created ${event.payload?.ref_type || 'repository'}`, repo, icon: <GitBranch size={14} /> };
        case 'IssueCommentEvent':
            return { action: 'Commented on issue', repo, icon: <Code2 size={14} /> };
        case 'IssuesEvent':
            return { action: `${event.payload?.action === 'opened' ? 'Opened' : 'Updated'} issue`, repo, icon: <Code2 size={14} /> };
        case 'PullRequestEvent':
            return { action: `${event.payload?.action === 'opened' ? 'Opened' : 'Updated'} PR`, repo, icon: <GitBranch size={14} /> };
        case 'WatchEvent':
            return { action: 'Starred', repo, icon: <Star size={14} /> };
        case 'ForkEvent':
            return { action: 'Forked', repo, icon: <GitBranch size={14} /> };
        case 'PublicEvent':
            return { action: 'Made public', repo, icon: <Code2 size={14} /> };
        default:
            return { action: event.type.replace('Event', ''), repo, icon: <Code2 size={14} /> };
    }
};

const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    return `${months}mo ago`;
};

const langColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Python: '#3572A5',
    'C++': '#f34b7d',
    Dart: '#00B4AB',
    Java: '#b07219',
    Solidity: '#AA6746',
};

/* ── Interactive Contribution Calendar — REAL DATA ── */

const ContributionCalendar = ({ username }) => {
    const [hoveredCell, setHoveredCell] = useState(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
    const [contributionData, setContributionData] = useState([]);
    const [totalContributions, setTotalContributions] = useState(0);
    const [calendarLoading, setCalendarLoading] = useState(true);
    const calendarRef = useRef(null);

    // Fetch real contribution data from GitHub (via proxy to avoid CORS)
    useEffect(() => {
        const fetchContributions = async () => {
            try {
                // Use Vite proxy in dev, CORS proxy in production
                const isDev = window.location.hostname === 'localhost';
                const url = isDev
                    ? `/github-contributions/${username}/contributions`
                    : `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://github.com/users/${username}/contributions`)}`;
                const res = await fetch(url);
                const html = await res.text();

                // Parse total contributions from heading text
                const totalMatch = html.match(/(\d[\d,]*)\s+contributions?\s+in\s+the\s+last\s+year/i);
                if (totalMatch) {
                    setTotalContributions(parseInt(totalMatch[1].replace(/,/g, ''), 10));
                }

                // Parse each contribution day: data-date + data-level
                const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
                const days = [];
                let match;
                while ((match = dayRegex.exec(html)) !== null) {
                    days.push({ date: match[1], level: parseInt(match[2], 10) });
                }

                // Parse tooltip text to get actual counts
                const tooltipRegex = /for="contribution-day-component-[^"]*"[^>]*>(?:No contributions|(\d+)\s+contributions?)\s+on\s+([^<.]+)/g;
                const countMap = {};
                let tm;
                while ((tm = tooltipRegex.exec(html)) !== null) {
                    const count = tm[1] ? parseInt(tm[1], 10) : 0;
                    const dateText = tm[2].trim();
                    countMap[dateText] = count;
                }

                // Match counts to days by formatted date
                const daysWithCounts = days.map(d => {
                    const dateObj = new Date(d.date + 'T00:00:00');
                    const formatted = dateObj.toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric',
                    });
                    // GitHub uses ordinal suffix (e.g., "January 5th"), try matching
                    const dayNum = dateObj.getDate();
                    const suffix = dayNum === 1 || dayNum === 21 || dayNum === 31 ? 'st'
                        : dayNum === 2 || dayNum === 22 ? 'nd'
                            : dayNum === 3 || dayNum === 23 ? 'rd' : 'th';
                    const monthName = dateObj.toLocaleDateString('en-US', { month: 'long' });
                    const ordinalKey = `${monthName} ${dayNum}${suffix}`;

                    const count = countMap[ordinalKey] ?? 0;
                    return { date: dateObj, level: d.level, count };
                });

                // Group into weeks (7 days per column, Sunday=0 start)
                const weeks = [];
                let currentWeek = [];
                daysWithCounts.forEach((day, i) => {
                    currentWeek.push(day);
                    if (currentWeek.length === 7) {
                        weeks.push(currentWeek);
                        currentWeek = [];
                    }
                });
                if (currentWeek.length > 0) {
                    // Pad remaining week with empty cells
                    while (currentWeek.length < 7) {
                        currentWeek.push({ date: new Date(), level: 0, count: 0 });
                    }
                    weeks.push(currentWeek);
                }

                setContributionData(weeks);
            } catch (err) {
                console.error('Failed to fetch contribution data:', err);
            } finally {
                setCalendarLoading(false);
            }
        };
        fetchContributions();
    }, [username]);

    // Get month labels for top axis
    const monthLabels = React.useMemo(() => {
        const labels = [];
        let lastMonth = -1;
        contributionData.forEach((week, i) => {
            const firstDay = week[0]?.date;
            if (firstDay) {
                const month = firstDay.getMonth();
                if (month !== lastMonth) {
                    labels.push({ month, weekIndex: i });
                    lastMonth = month;
                }
            }
        });
        return labels;
    }, [contributionData]);

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const cellColors = [
        'bg-zinc-200/40 dark:bg-zinc-800/40 border-zinc-200/60 dark:border-zinc-800/60',
        'bg-indigo-950/80 border-indigo-900/50',
        'bg-indigo-800/70 border-indigo-700/50',
        'bg-indigo-600/80 border-indigo-500/50',
        'bg-indigo-400 border-indigo-300/50',
    ];

    const cellGlows = [
        '',
        '',
        'shadow-[0_0_4px_rgba(99,102,241,0.15)]',
        'shadow-[0_0_6px_rgba(99,102,241,0.25)]',
        'shadow-[0_0_8px_rgba(129,140,248,0.35)]',
    ];

    const formatDate = (date) => {
        if (!(date instanceof Date) || isNaN(date)) return '';
        return new Intl.DateTimeFormat('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }).format(date);
    };

    const handleMouseMove = (e) => {
        if (calendarRef.current) {
            const rect = calendarRef.current.getBoundingClientRect();
            setTooltipPos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    const cellSize = 13;
    const cellGap = 3;

    // Loading skeleton
    if (calendarLoading) {
        return (
            <div className="w-full">
                <div className="flex gap-[3px] overflow-hidden">
                    {Array.from({ length: 52 }).map((_, w) => (
                        <div key={w} className="flex flex-col gap-[3px]">
                            {Array.from({ length: 7 }).map((_, d) => (
                                <div
                                    key={d}
                                    className="w-[13px] h-[13px] rounded-[3px] bg-zinc-200/50 dark:bg-zinc-800/30 animate-pulse"
                                    style={{ animationDelay: `${w * 20}ms` }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-200/30 dark:border-zinc-800/30">
                    <div className="h-3 w-48 bg-zinc-200/50 dark:bg-zinc-800/30 rounded animate-pulse" />
                </div>
            </div>
        );
    }

    return (
        <div className="relative" ref={calendarRef} onMouseMove={handleMouseMove}>
            {/* Tooltip */}
            {hoveredCell && (
                <div
                    className="absolute z-50 pointer-events-none"
                    style={{
                        left: tooltipPos.x,
                        top: tooltipPos.y - 48,
                        transform: 'translateX(-50%)',
                    }}
                >
                    <div className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-3 py-2 shadow-xl shadow-black/10 dark:shadow-black/40 text-center whitespace-nowrap">
                        <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                            {hoveredCell.count} contribution{hoveredCell.count !== 1 ? 's' : ''}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                            {formatDate(hoveredCell.date)}
                        </p>
                        <div className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2 h-2 bg-white dark:bg-zinc-800 border-b border-r border-zinc-200 dark:border-zinc-700 rotate-45" />
                    </div>
                </div>
            )}

            {/* Scrollable calendar area */}
            <div className="w-full overflow-x-auto pb-2">
                <div className="inline-block min-w-[740px]">
                    {/* Month labels */}
                    <div className="flex ml-[32px] mb-2" style={{ gap: `${cellGap}px` }}>
                        {contributionData.map((_, weekIdx) => {
                            const label = monthLabels.find(l => l.weekIndex === weekIdx);
                            return (
                                <div
                                    key={weekIdx}
                                    style={{ width: `${cellSize}px`, minWidth: `${cellSize}px` }}
                                    className="text-center"
                                >
                                    {label && (
                                        <span className="text-[10px] text-zinc-500 font-mono">
                                            {monthNames[label.month]}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex">
                        {/* Day labels */}
                        <div
                            className="flex flex-col mr-1.5 pt-0"
                            style={{ gap: `${cellGap}px` }}
                        >
                            {dayLabels.map((day, i) => (
                                <div
                                    key={day}
                                    style={{ height: `${cellSize}px` }}
                                    className="flex items-center justify-end pr-1"
                                >
                                    {i % 2 === 1 && (
                                        <span className="text-[9px] text-zinc-600 font-mono leading-none">
                                            {day}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Weeks grid */}
                        <div className="flex" style={{ gap: `${cellGap}px` }}>
                            {contributionData.map((week, weekIdx) => (
                                <div key={weekIdx} className="flex flex-col" style={{ gap: `${cellGap}px` }}>
                                    {week.map((day, dayIdx) => (
                                        <motion.div
                                            key={dayIdx}
                                            initial={{ opacity: 0, scale: 0.3 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: '-20px' }}
                                            transition={{
                                                delay: weekIdx * 0.006 + dayIdx * 0.008,
                                                duration: 0.25,
                                                ease: 'easeOut',
                                            }}
                                            style={{
                                                width: `${cellSize}px`,
                                                height: `${cellSize}px`,
                                            }}
                                            className={`
                                                rounded-[3px] border cursor-pointer
                                                transition-all duration-200
                                                hover:scale-[1.6] hover:z-10 hover:border-indigo-400/60
                                                ${cellColors[day.level] || cellColors[0]}
                                                ${cellGlows[day.level] || ''}
                                            `}
                                            onMouseEnter={() => setHoveredCell(day)}
                                            onMouseLeave={() => setHoveredCell(null)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer: Legend + Total */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-200/30 dark:border-zinc-800/30">
                <div className="flex items-center gap-4">
                    <p className="text-xs text-zinc-600 font-mono">
                        {totalContributions.toLocaleString()} contributions in the last year
                    </p>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-zinc-600 font-mono mr-1">Less</span>
                    {cellColors.map((c, i) => (
                        <div
                            key={i}
                            className={`w-[11px] h-[11px] rounded-[3px] border ${c} ${cellGlows[i]}`}
                        />
                    ))}
                    <span className="text-[10px] text-zinc-600 font-mono ml-1">More</span>
                </div>
            </div>
        </div>
    );
};

const GitHubSection = () => {
    const { profile, events, repos, loading } = useGitHubData();

    // Deduplicate events for display (max 8)
    const recentEvents = events.slice(0, 8);

    return (
        <Section id="github" className="py-12 md:py-16">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div variants={fadeUp} className="mb-8">
                    <span className="inline-flex items-center gap-2 text-sm font-mono text-indigo-400 mb-3">
                        <GitBranch size={14} />
                        OPEN SOURCE
                    </span>
                    <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
                        GitHub <span className="text-gradient">Activity</span>
                    </h2>
                </motion.div>

                {/* Stats Row — real data */}
                <motion.div
                    variants={fadeUp}
                    className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
                >
                    {[
                        { icon: <Code2 size={16} />, label: 'Public Repos', value: loading ? '—' : profile?.public_repos },
                        { icon: <Star size={16} />, label: 'Followers', value: loading ? '—' : profile?.followers },
                        { icon: <GitBranch size={16} />, label: 'Following', value: loading ? '—' : profile?.following },
                        { icon: <GitCommit size={16} />, label: 'Recent Events', value: loading ? '—' : events.length + '+' },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="flex items-center gap-3 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors"
                        >
                            <div className="p-2 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 text-indigo-400">
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xl font-bold text-zinc-900 dark:text-white">{stat.value}</p>
                                <p className="text-xs text-zinc-500">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Contribution Graph — Custom Interactive Calendar */}
                <motion.div
                    variants={fadeUp}
                    className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/30 p-5 sm:p-6 mb-6 overflow-hidden"
                >
                    <div className="flex items-center justify-between mb-5">
                        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                            <GitCommit size={14} className="text-indigo-400" />
                            Contribution Graph
                        </h3>
                        <a
                            href={`https://github.com/${GITHUB_USERNAME}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
                        >
                            <Github size={12} />
                            @{GITHUB_USERNAME}
                            <ArrowUpRight size={10} />
                        </a>
                    </div>
                    <ContributionCalendar username={GITHUB_USERNAME} />
                </motion.div>

                {/* Two-column: Recent Activity + Recent Repos */}
                <div className="grid md:grid-cols-2 gap-6 md:gap-4">
                    {/* Recent Activity */}
                    <motion.div
                        variants={fadeUp}
                        className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/30 p-5 sm:p-6"
                    >
                        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <Terminal size={14} className="text-indigo-400" />
                            Recent Activity
                        </h3>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-10 bg-zinc-200/30 dark:bg-zinc-800/30 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-1">
                                {recentEvents.map((event, i) => {
                                    const { action, repo, icon } = getEventDescription(event);
                                    return (
                                        <div
                                            key={event.id || i}
                                            className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors group"
                                        >
                                            <div className="text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0">
                                                {icon}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm text-zinc-700 dark:text-zinc-300 truncate">
                                                    {action}{' '}
                                                    <span className="text-indigo-400/80 font-mono text-xs">
                                                        {repo}
                                                    </span>
                                                </p>
                                            </div>
                                            <span className="text-[10px] text-zinc-600 font-mono shrink-0">
                                                {timeAgo(event.created_at)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>

                    {/* Recent Repos */}
                    <motion.div
                        variants={fadeUp}
                        className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-50/30 dark:bg-zinc-900/30 p-5 sm:p-6"
                    >
                        <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                            <FolderGit2 size={14} className="text-indigo-400" />
                            Recent Repositories
                        </h3>
                        {loading ? (
                            <div className="space-y-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-14 bg-zinc-200/30 dark:bg-zinc-800/30 rounded-lg animate-pulse" />
                                ))}
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {repos.slice(0, 5).map((repo) => (
                                    <a
                                        key={repo.id}
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block py-3 px-3 rounded-lg hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 transition-colors group"
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 group-hover:text-indigo-400 transition-colors truncate">
                                                {repo.name}
                                            </span>
                                            <ExternalLink size={12} className="text-zinc-600 group-hover:text-indigo-400 transition-colors shrink-0" />
                                        </div>
                                        <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                                            {repo.language && (
                                                <span className="flex items-center gap-1">
                                                    <span
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: langColors[repo.language] || '#8b8b8b' }}
                                                    />
                                                    {repo.language}
                                                </span>
                                            )}
                                            {repo.stargazers_count > 0 && (
                                                <span className="flex items-center gap-0.5">
                                                    <Star size={10} /> {repo.stargazers_count}
                                                </span>
                                            )}
                                            {repo.forks_count > 0 && (
                                                <span className="flex items-center gap-0.5">
                                                    <GitBranch size={10} /> {repo.forks_count}
                                                </span>
                                            )}
                                            <span className="font-mono">{timeAgo(repo.pushed_at)}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </Section>
    );
};

/* ═══════════════════════════════════════════════
   TECH STACK SECTION
   ═══════════════════════════════════════════════ */
const TECH_CATEGORIES = [
    {
        title: 'Frontend',
        icon: <Layers size={20} />,
        gradient: 'from-blue-500 to-cyan-500',
        items: [
            { name: 'HTML', slug: 'html5' },
            { name: 'CSS', slug: 'css3' },
            { name: 'JavaScript', slug: 'javascript' },
            { name: 'React.js', slug: 'react' },
            { name: 'Tailwind CSS', slug: 'tailwindcss' },
            { name: 'GSAP', slug: 'greensock' },
            { name: 'Locomotive.js', slug: 'javascript' }, // No official logo, using JS
            { name: 'Spline', slug: 'threedotjs' }, // Using Three.js as proxy or maybe 'spline' if available (it is not standard in simpleicons yet, keeping threedotjs or just generic) -> actually Spline has no simpleicon, but 3D tools often use similar. Let's use 'webgl' or similar if needed, or just a generic one. Actually, 'spline' is not in simpleicons. Let's stick to 'threedotjs' or maybe 'opengl'. 'threedotjs' is fine as a 3D fallback.
            { name: 'Flutter', slug: 'flutter' },
            { name: 'Dart', slug: 'dart' },
        ],
    },
    {
        title: 'Backend',
        icon: <Terminal size={20} />,
        gradient: 'from-emerald-500 to-green-500',
        items: [
            { name: 'Node.js', slug: 'nodedotjs' },
            { name: 'Express.js', slug: 'express' },
            { name: 'WebSockets', slug: 'socketdotio' }, // Using socket.io as a proxy for WS
        ],
    },
    {
        title: 'Web3',
        icon: <GitBranch size={20} />,
        gradient: 'from-violet-500 to-purple-500',
        items: [
            { name: 'Solana', slug: 'solana' },
            { name: '@solana/web3.js', slug: 'solana' },
            { name: 'Wallet Adapter', slug: 'walletconnect' }, // WalletConnect is a good proxy for adapter
        ],
    },
    {
        title: 'Tools & Platforms',
        icon: <Code2 size={20} />,
        gradient: 'from-orange-500 to-amber-500',
        items: [
            { name: 'Git', slug: 'git' },
            { name: 'GitHub', slug: 'github' },
            { name: 'Docker', slug: 'docker' },
            { name: 'AWS', slug: 'amazonaws' },
            { name: 'Vercel', slug: 'vercel' },
            { name: 'Netlify', slug: 'netlify' },
            { name: 'Figma', slug: 'figma' },
        ],
    },
];

const TechStackSection = () => (
    <Section id="stack" className="py-12 md:py-16 relative">
        <div className="max-w-6xl mx-auto px-6">
            <motion.div variants={fadeUp} className="mb-8 text-center">
                <span className="inline-flex items-center gap-2 text-sm font-mono text-indigo-400 mb-3">
                    <Layers size={14} />
                    TECH STACK
                </span>
                <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white">
                    Tools & <span className="text-gradient">Technologies</span>
                </h2>
                <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto text-base sm:text-lg">
                    The development suite I use to build robust, scalable, and interactive applications.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
                {TECH_CATEGORIES.map((cat, catIdx) => (
                    <motion.div
                        key={cat.title}
                        variants={fadeUp}
                        custom={catIdx}
                        className="group relative rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/30 p-6 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 hover:border-zinc-300/60 dark:hover:border-zinc-700/60 transition-all duration-500 overflow-hidden"
                    >
                        {/* Gradient Glow Background */}
                        <div className={`absolute -inset-2 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />

                        {/* Category Header */}
                        <div className="relative flex items-center gap-3 mb-6">
                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {cat.icon}
                            </div>
                            <h3 className="text-base font-bold text-zinc-700 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors tracking-wide">
                                {cat.title}
                            </h3>
                        </div>

                        {/* Tech Items List */}
                        <div className="relative flex flex-wrap gap-2.5">
                            {cat.items.map((item) => (
                                <div
                                    key={item.name}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-100/40 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800/60 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-600 hover:text-zinc-900 dark:hover:text-white transition-all duration-300 cursor-default group/item"
                                >
                                    <img
                                        src={`https://cdn.simpleicons.org/${item.slug}/${['github', 'express', 'vercel', 'nodedotjs', 'three.js', 'socket.io'].includes(item.slug) ? 'white' : ''}`}
                                        alt={item.name}
                                        className="w-4 h-4 opacity-70 group-hover/item:opacity-100 transition-opacity grayscale group-hover/item:grayscale-0"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.style.display = 'none'; // Fallback if icon fails
                                        }}
                                    />
                                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 group-hover/item:text-zinc-900 dark:group-hover/item:text-zinc-200 transition-colors">
                                        {item.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    </Section>
);

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
const Footer = () => (
    <footer className="relative border-t border-zinc-200/50 dark:border-zinc-800/50">
        <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                {/* Left */}
                <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-[10px]">
                            A
                        </div>
                        <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                            Ayush Kumar Jha
                        </span>
                    </div>
                    <p className="text-xs text-zinc-600">
                        Building for the modern web. Crafted with React & Tailwind CSS.
                    </p>
                </div>

                {/* Center Links */}
                <div className="flex items-center gap-6 text-sm text-zinc-500">
                    {NAV_LINKS.map((l) => (
                        <a key={l.label} href={l.href} className="hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors">
                            {l.label}
                        </a>
                    ))}
                </div>

                {/* Right Social */}
                <div className="flex items-center gap-2">
                    {[
                        { icon: <Github size={16} />, href: 'https://github.com/ayushjava07' },
                        { icon: <Linkedin size={16} />, href: 'https://www.linkedin.com/in/ayush-kumar-jha-09257b2b2/' },
                        { icon: <Twitter size={16} />, href: 'https://x.com/Ayushdev_01' },
                        { icon: <Mail size={16} />, href: 'mailto:ayushjhasahab07@gmail.com' },
                    ].map((s, i) => (
                        <a
                            key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 transition-all duration-300"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200/30 dark:border-zinc-800/30 text-center">
                <p className="text-xs text-zinc-700">
                    © {new Date().getFullYear()} Ayush Kumar Jha. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

/* ═══════════════════════════════════════════════
   MAIN PORTFOLIO COMPONENT
   ═══════════════════════════════════════════════ */
const Portfolio = () => {
    return (
        <div className="relative min-h-screen bg-white dark:bg-[#09090b] text-zinc-900 dark:text-white noise">
            <Navbar />
            <HeroSection />
            <ExperienceSection />
            <ProjectsSection />
            <GitHubSection />
            <TechStackSection />
            <Footer />
        </div>
    );
};

export default Portfolio;
