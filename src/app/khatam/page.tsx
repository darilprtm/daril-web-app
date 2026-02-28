"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { BookOpen, Calendar, Target, Award, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function KhatamPlanner() {
    const { lang } = useLanguage();
    const [targetDays, setTargetDays] = useState<number>(30);

    // Core Logic
    const TOTAL_PAGES = 604;
    const pagesPerDay = Math.ceil(TOTAL_PAGES / targetDays);
    const pagesPerWaktu = Math.ceil(pagesPerDay / 5);

    return (
        <main className="min-h-screen bg-white text-black font-sans pb-32">
            <Navbar />

            <section className="pt-32 px-4 max-w-4xl mx-auto">
                <div className="mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-bold uppercase tracking-widest mb-6">
                        <Target className="w-3 h-3 text-indigo-500" />
                        Target Khatam
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-4 leading-tight">
                        Kalkulator<br />Khatam.
                    </h1>
                    <p className="text-xl text-black/50 font-light max-w-xl mb-12">
                        {lang === 'ID'
                            ? "Rencanakan target khatam Al-Quran Anda. Masukkan durasi hari, dan sistem akan menghitung jadwal bacaan harian yang optimal."
                            : "Plan your Al-Quran completion target. Enter the duration in days, and the system will calculate the optimal daily reading schedule."}
                    </p>

                    <div className="bg-black/5 rounded-3xl p-8 md:p-12">
                        <label className="block text-sm font-bold tracking-widest uppercase text-black/40 mb-4">
                            Target Waktu (Hari)
                        </label>
                        <div className="flex items-center gap-6">
                            <input
                                type="range"
                                min="1"
                                max="365"
                                value={targetDays}
                                onChange={(e) => setTargetDays(Number(e.target.value))}
                                className="w-full h-2 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                            />
                            <div className="w-24 text-center">
                                <span className="text-4xl font-black font-serif">{targetDays}</span>
                            </div>
                        </div>
                        <div className="flex justify-between mt-2 px-1 text-xs font-bold tracking-widest text-black/30">
                            <span>1 Hari</span>
                            <span>365 Hari</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="border border-black/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-black/30 transition-colors">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-8">
                            <Calendar className="w-6 h-6 text-indigo-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold tracking-widest uppercase text-black/40 mb-2">Target Harian</p>
                            <h2 className="text-5xl font-black font-serif flex items-end gap-3">
                                {pagesPerDay} <span className="text-lg font-sans font-medium text-black/40 mb-1">Halaman / Hari</span>
                            </h2>
                        </div>
                    </div>

                    <div className="border border-black/10 rounded-3xl p-8 flex flex-col justify-between group hover:border-black/30 transition-colors bg-black text-white">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <p className="text-sm font-bold tracking-widest uppercase text-white/40 mb-2">Setiap Selesai Sholat</p>
                            <h2 className="text-5xl font-black font-serif flex items-end gap-3">
                                {pagesPerWaktu} <span className="text-lg font-sans font-medium text-white/40 mb-1">Halaman / Waktu</span>
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/quran"
                        className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 hover:bg-black/80 transition-all"
                    >
                        Mulai Membaca Sekarang <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
