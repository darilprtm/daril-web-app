"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Type, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { usePathname } from "next/navigation";

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
        { label: t.navHome || "Beranda", href: "/" },
        { label: t.navQuran || "Al-Quran", href: "/quran" },
        { label: t.navSholat || "Jadwal Sholat", href: "/sholat" },
        { label: lang === 'ID' ? "Tata Cara" : "Fiqh Guides", href: "/tata-cara" },
        { label: t.navDoa || "Doa", href: "/doa" },
        { label: t.navAsmaulHusna || "Asmaul Husna", href: "/asmaul-husna" },
        { label: t.navKalender || "Kalender", href: "/kalender" },
        { label: t.navKiblat || "Kiblat", href: "/kiblat" },
        { label: lang === 'ID' ? "Mutaba'ah" : "Tracker", href: "/tracker" },
        { label: lang === 'ID' ? "Kalkulator Khatam" : "Khatam Planner", href: "/khatam" },
        { label: lang === 'ID' ? "Mode Tahajjud" : "Tahajjud Mode", href: "/tahajjud" },
        { label: t.navMisi || "Challenge", href: "/games" },
        { label: t.navNews || "Artikel", href: "/news" },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.5, ease: "easeInOut" as const }
        },
        open: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" as const }
        }
    };

    const linkVariants = {
        closed: { opacity: 0, y: 20 },
        open: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 0.1 + (i * 0.05), duration: 0.4, ease: "easeOut" as const }
        })
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-2 shadow-sm" : "bg-transparent py-4"}`}
            >
                <div className="max-w-7xl mx-auto px-4 lg:px-8 flex items-center justify-between">
                    {/* Left: Menu Toggle */}
                    <div className="flex-1 flex justify-start">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="group flex items-center gap-3 p-2 hover:bg-black/5 rounded-full transition-colors"
                            aria-label="Open Menu"
                        >
                            <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/5 group-hover:bg-black group-hover:text-white transition-all duration-300">
                                <Menu className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className="text-xs font-bold tracking-widest uppercase hidden md:block">Menu</span>
                        </button>
                    </div>

                    {/* Center: Logo */}
                    <Link
                        href="/"
                        className="flex-1 text-center font-logo text-4xl md:text-5xl text-black hover:scale-105 transition-transform duration-300"
                    >
                        SASUKE.ID
                    </Link>

                    {/* Right: Actions */}
                    <div className="flex-1 flex justify-end gap-2 md:gap-3">
                        <button
                            onClick={cycleScale}
                            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/5 hover:bg-black hover:text-white transition-all duration-300 group"
                            title={`Teks: ${scale}`}
                        >
                            <Type className={`w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:scale-110 ${scale === "xlarge" ? "scale-125 font-bold" : scale === "large" ? "scale-110" : ""}`} />
                        </button>
                        <button
                            onClick={toggleLang}
                            className="flex items-center justify-center w-10 h-10 md:w-fit md:px-5 md:py-2.5 rounded-full border border-black/10 hover:border-black/30 hover:bg-black hover:text-white transition-all duration-300 gap-2 group"
                        >
                            <Globe className="w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform duration-300" />
                            <span className="hidden md:block text-xs font-bold tracking-widest uppercase">{lang}</span>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Full Screen Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex flex-col h-[100dvh]"
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white"
                        />

                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="relative z-10 flex flex-col h-full w-full max-w-7xl mx-auto"
                        >
                            {/* Menu Header */}
                            <div className="flex justify-between items-center p-6 lg:p-10">
                                <span className="font-logo text-3xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-black to-black/60">SASUKE.ID</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="group w-12 h-12 rounded-full border border-black/10 hover:border-black/30 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 shadow-sm"
                                >
                                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Menu Links */}
                            <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-y-auto pb-24 hide-scrollbar">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-12 w-full">
                                    {menuLinks.map((item, i) => (
                                        <motion.div
                                            key={item.label}
                                            custom={i}
                                            variants={linkVariants}
                                            className="border-b border-black/5 pb-3 group as-link cursor-pointer hover:border-black/20 transition-colors"
                                        >
                                            <Link
                                                href={item.href}
                                                className="flex items-center justify-between text-2xl md:text-3xl lg:text-4xl font-serif font-medium text-black/50 hover:text-black transition-all duration-300"
                                            >
                                                <span className="group-hover:translate-x-3 transition-transform duration-300 drop-shadow-sm">{item.label}</span>
                                                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 opacity-0 group-hover:opacity-100 group-hover:-translate-x-3 transition-all duration-300 text-black/40" />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="absolute bottom-8 left-0 w-full text-center px-6"
                            >
                                <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-black/40">© 2026 SASUKE.ID WEB INDONESIA. ALL RIGHTS RESERVED.</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
