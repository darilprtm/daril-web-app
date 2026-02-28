"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { BookOpen, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { surahTranslations } from "@/lib/surahNames";

export default function QuranSurahPage() {
    const { t } = useLanguage();
    const [surahs, setSurahs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchSurahs() {
            try {
                const res = await fetch("https://api.alquran.cloud/v1/surah");
                const data = await res.json();
                setSurahs(data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchSurahs();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-white flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto min-h-screen">
                <Link href="/quran" className="inline-flex items-center gap-2 text-black/60 hover:text-black mb-8 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> {t.backPrev}
                </Link>

                <div className="text-center mb-16">
                    <BookOpen className="w-12 h-12 mx-auto mb-6 text-black" />
                    <h1 className="text-5xl font-serif font-black tracking-tight mb-4 text-black">{t.qhubTitle} ({t.qhubSurah})</h1>
                    <p className="text-black/60 text-lg">{t.qhubSurahDesc}</p>
                </div>

                <div className="flex justify-center gap-4 mb-12">
                    <div className="px-6 py-2 rounded-full bg-black text-white font-medium">{t.qhubSurah}</div>
                    <Link href="/quran/juz" className="px-6 py-2 rounded-full border border-black/10 hover:border-black transition-colors font-medium">{t.qhubJuz}</Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {surahs.map((surah: any) => {
                        const indoName = surahTranslations[surah.number] || surah.englishNameTranslation;
                        const indoRev = surah.revelationType === "Meccan" ? "Makkiyah" : "Madaniyah";

                        return (
                            <Link
                                key={surah.number}
                                href={`/quran/${surah.number}`}
                                className="flex items-center justify-between p-6 border border-black/10 hover:border-black transition-colors rounded-xl group relative overflow-hidden bg-white"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                                    <span className="font-serif text-8xl arabic block -mt-8">{surah.name}</span>
                                </div>

                                <div className="flex gap-4 items-center z-10">
                                    <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center font-bold text-sm group-hover:bg-black group-hover:text-white transition-colors">
                                        {surah.number}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{surah.englishName}</h3>
                                        <p className="text-sm text-black/60 uppercase tracking-widest">{indoRev} • {surah.numberOfAyahs} Ayat</p>
                                    </div>
                                </div>
                                <div className="text-right z-10">
                                    <p className="text-xl font-serif arabic group-hover:text-black/70 transition-colors">{surah.name}</p>
                                    <p className="text-xs text-black/40 mt-1">{indoName}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
