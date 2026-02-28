"use client"

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { BookOpen, Layers } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function QuranHubPage() {
    const { t } = useLanguage();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight mb-4 text-black">{t.qhubTitle}</h1>
                    <p className="text-black/60 text-lg md:text-xl">{t.qhubDesc}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
                    <Link
                        href="/quran/surah"
                        className="group flex flex-col items-center p-12 text-center rounded-3xl border border-black/10 hover:border-black hover:bg-black/5 transition-all outline-none focus:ring-2 focus:ring-black"
                    >
                        <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                            <BookOpen className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{t.qhubSurah}</h2>
                        <p className="text-black/60">{t.qhubSurahDesc}</p>
                    </Link>

                    <Link
                        href="/quran/juz"
                        className="group flex flex-col items-center p-12 text-center rounded-3xl border border-black/10 hover:border-black hover:bg-black/5 transition-all outline-none focus:ring-2 focus:ring-black"
                    >
                        <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-colors">
                            <Layers className="w-10 h-10" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">{t.qhubJuz}</h2>
                        <p className="text-black/60">{t.qhubJuzDesc}</p>
                    </Link>
                </div>
            </section>
        </main>
    );
}
