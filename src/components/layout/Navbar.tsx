"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Type, ChevronRight, Home, BookOpen, Clock, ListChecks, HeartHandshake, Sparkles, CalendarDays, Headphones, Compass, Activity, TrendingUp, Moon, Target, Newspaper } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { usePathname } from "next/navigation";
import InstallPWA from "./InstallPWA";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { lang, toggleLang, t } = useLanguage();
    const { scale, cycleScale } = useAccessibility();
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const menuLinks = [
        { label: t.navHome || "Beranda", href: "/", icon: Home },
        { label: t.navQuran || "Al-Quran", href: "/quran", icon: BookOpen },
        { label: t.navSholat || "Jadwal Sholat", href: "/sholat", icon: Clock },
        { label: lang === 'ID' ? "Tata Cara" : "Fiqh Guides", href: "/tata-cara", icon: ListChecks },
        { label: t.navDoa || "Doa", href: "/doa", icon: HeartHandshake },
        { label: t.navAsmaulHusna || "Asmaul Husna", href: "/asmaul-husna", icon: Sparkles },
        { label: t.navKalender || "Kalender", href: "/kalender", icon: CalendarDays },
        { label: "Murottal", href: "/audio", icon: Headphones },
        { label: "Tasbih Digital", href: "/tasbih", icon: Target },
        { label: t.navKiblat || "Kiblat", href: "/kiblat", icon: Compass },
        { label: lang === 'ID' ? "Mutaba'ah" : "Tracker", href: "/tracker", icon: Activity },
        { label: lang === 'ID' ? "Kalkulator Khatam" : "Khatam Planner", href: "/khatam", icon: TrendingUp },
        { label: lang === 'ID' ? "Mode Tahajjud" : "Tahajjud Mode", href: "/tahajjud", icon: Moon },
        { label: t.navMisi || "Challenge", href: "/games", icon: Target },
        { label: t.navNews || "Artikel", href: "/news", icon: Newspaper },
    ];

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95, filter: "blur(10px)", transition: { duration: 0.4, ease: "easeInOut" as const } },
        open: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.4, ease: "easeOut" as const } }
    };

    const linkVariants = {
        closed: { opacity: 0, x: -20 },
        open: (i: number) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.1 + (i * 0.03), duration: 0.3, ease: "easeOut" as const }
        })
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3 shadow-sm" : "bg-transparent py-5"}`}
            >
                <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
                    {/* Left: Menu Toggle */}
                    <div className="flex-1 flex justify-start">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="flex items-center gap-2 group hover:opacity-70 transition-opacity"
                            aria-label="Open Menu"
                        >
                            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/80 text-slate-700 group-hover:bg-slate-200 transition-colors">
                                <Menu className="w-5 h-5" />
                            </div>
                            <span className="text-xs font-bold tracking-widest uppercase text-slate-600 hidden md:block">Eksplor</span>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <Link
                        href="/"
                        className="flex-1 text-center flex justify-center items-center gap-2 hover:opacity-80 transition-opacity"
                    >
                        <Sparkles className="w-5 h-5 text-indigo-500" />
                        <span className="font-logo text-xl md:text-2xl text-slate-900 tracking-wide">SASUKE.ID</span>
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex-1 flex justify-end gap-2 md:gap-3">
                        <InstallPWA />
                        <button
                            onClick={cycleScale}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/80 text-slate-700 hover:bg-slate-200 transition-colors group"
                            title={`Teks: ${scale}`}
                        >
                            <Type className={`w-4 h-4 transition-transform duration-300 group-hover:scale-110 ${scale === "xlarge" ? "scale-125 font-bold text-indigo-600" : scale === "large" ? "scale-110 text-indigo-500" : ""}`} />
                        </button>
                        <button
                            onClick={toggleLang}
                            className="flex items-center justify-center w-10 h-10 md:w-fit md:px-4 md:py-2 rounded-full bg-slate-100/80 text-slate-700 hover:bg-slate-200 transition-colors gap-2 group"
                        >
                            <Globe className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                            <span className="hidden md:block text-[10px] font-bold tracking-widest uppercase">{lang}</span>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div className="fixed inset-0 z-[100] flex">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="relative z-10 w-full max-w-md h-full bg-white shadow-2xl flex flex-col ml-auto"
                        >
                            {/* Menu Header */}
                            <div className="flex justify-between items-center p-6 border-b border-slate-100">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-500" />
                                    <span className="font-sans font-black text-xl text-slate-800 tracking-wide">SASUKE.ID</span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 text-slate-600 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Menu Links */}
                            <div className="flex-1 overflow-y-auto px-6 py-8 hide-scrollbar">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 px-4">Menu Utama</p>
                                <div className="flex flex-col gap-2">
                                    {menuLinks.map((item, i) => {
                                        const Icon = item.icon;
                                        return (
                                            <motion.div key={item.label} custom={i} variants={linkVariants}>
                                                <Link
                                                    href={item.href}
                                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-indigo-50/80 text-slate-600 hover:text-indigo-700 transition-all duration-300 group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                                                            <Icon className="w-5 h-5 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                                                        </div>
                                                        <span className="text-[15px] font-bold">{item.label}</span>
                                                    </div>
                                                    <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                                                </Link>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
