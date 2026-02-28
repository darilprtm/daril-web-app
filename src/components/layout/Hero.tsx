"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { t } = useLanguage();

    return (
        <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 text-center overflow-hidden">

            {/* Background purely white with subtle noise or clean empty space */}
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-black/5 via-white to-white" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-4xl mx-auto space-y-8"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 bg-black/5 text-xs font-medium tracking-wide">
                    <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
                    {t.heroTagline}
                </div>

                <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight leading-[1.1] whitespace-pre-line">
                    {t.heroTitle}
                </h1>

                <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto font-light leading-relaxed">
                    {t.heroDesc}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                    <Link
                        href="/quran"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-black px-8 font-medium text-white transition-all hover:bg-black/90"
                    >
                        <span className="mr-2">{t.heroBtnQuran}</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>

                    <Link
                        href="/sholat"
                        className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-transparent border border-black px-8 font-medium text-black hover:bg-black/5 transition-all"
                    >
                        {t.heroBtnSholat}
                    </Link>
                </div>
            </motion.div>

        </section>
    );
}
