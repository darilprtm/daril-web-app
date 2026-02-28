"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Sparkles, ArrowLeft, Heart, BookOpen, MessageCircle } from "lucide-react";
import moodData from "@/data/mood.json";

export default function HealingPage() {
    const [selectedMood, setSelectedMood] = useState<typeof moodData[0] | null>(null);

    return (
        <main className={`min-h-[100dvh] transition-colors duration-700 ${selectedMood ? 'bg-black' : 'bg-slate-50'}`}>
            <Navbar />

            {/* Ambient Background Glow when a mood is selected */}
            <div className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 ${selectedMood ? 'opacity-100' : 'opacity-0'}`}>
                {selectedMood && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${selectedMood.bgGradient} opacity-40`} />
                )}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay" />
            </div>

            <section className="relative z-10 pt-32 pb-24 px-4 max-w-4xl mx-auto flex flex-col justify-center min-h-[100dvh]">
                <AnimatePresence mode="wait">
                    {!selectedMood ? (
                        // 1. Grid Selection State
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                        >
                            <div className="text-center mb-12 md:mb-16">
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6"
                                >
                                    <Sparkles className="w-4 h-4" /> Ruang Tenang
                                </motion.span>
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-tight mb-4 text-slate-900"
                                >
                                    Apa yang sedang<br />hati Anda rasakan?
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-slate-500 text-lg md:text-xl max-w-xl mx-auto"
                                >
                                    Pilih satu perasaan di bawah ini. Biarkan Al-Quran dan Sabda Nabi memeluk resahmu hari ini.
                                </motion.p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                                {moodData.map((mood, idx) => (
                                    <motion.button
                                        key={mood.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (idx * 0.1) }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSelectedMood(mood)}
                                        className={`flex flex-col items-center justify-center p-6 md:p-8 rounded-3xl border-2 transition-all shadow-sm ${mood.color}`}
                                    >
                                        <span className="text-5xl md:text-6xl mb-4 drop-shadow-sm">{mood.emoji}</span>
                                        <span className="font-bold tracking-wide text-sm md:text-base">{mood.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </motion.div>
                    ) : (
                        // 2. Result Therapy State
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                            className="w-full max-w-2xl mx-auto text-white"
                        >
                            <button
                                onClick={() => setSelectedMood(null)}
                                className="group mb-12 flex items-center gap-3 text-white/50 hover:text-white transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                </div>
                                <span className="text-sm font-bold tracking-widest uppercase">Kembali</span>
                            </button>

                            <div className="text-center mb-12">
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3, type: 'spring' }}
                                    className="text-7xl md:text-8xl inline-block mb-6 drop-shadow-2xl"
                                >
                                    {selectedMood.emoji}
                                </motion.span>
                                <h2 className="text-2xl md:text-3xl text-white/80 font-medium">
                                    Untuk hati yang sedang <span className="font-bold text-white shadow-white/20 drop-shadow-md">{selectedMood.label.toLowerCase()}</span>...
                                </h2>
                            </div>

                            <div className="space-y-6">
                                {/* Ayah Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 md:p-10 rounded-[2rem] shadow-2xl"
                                >
                                    <div className="flex items-center gap-3 text-white/50 mb-6">
                                        <BookOpen className="w-5 h-5" />
                                        <span className="text-xs font-bold tracking-widest uppercase text-white/70">Firman Allah</span>
                                    </div>
                                    <p className="text-4xl md:text-5xl font-amiri leading-loose mb-6 text-right" dir="rtl">
                                        {selectedMood.ayah.arabic}
                                    </p>
                                    <p className="text-white/60 font-medium text-lg leading-relaxed mb-4 italic">
                                        {selectedMood.ayah.latin}
                                    </p>
                                    <p className="text-white/90 text-lg md:text-xl font-serif leading-relaxed">
                                        "{selectedMood.ayah.translation}"
                                    </p>
                                    <div className="mt-6 pt-6 border-t border-white/10 text-right">
                                        <span className="text-sm font-bold tracking-widest uppercase text-white/40">
                                            QS. {selectedMood.ayah.surah}: {selectedMood.ayah.verse}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Hadith Card */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 md:p-8 rounded-3xl"
                                >
                                    <div className="flex items-center gap-3 text-white/50 mb-4">
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="text-xs font-bold tracking-widest uppercase text-white/60">Pesan Nabi ﷺ</span>
                                    </div>
                                    <p className="text-white/80 leading-relaxed text-base md:text-lg">
                                        "{selectedMood.hadith}"
                                    </p>
                                </motion.div>

                                {/* Doa Card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9 }}
                                    className="bg-gradient-to-br from-white/10 to-transparent border border-white/20 p-8 rounded-3xl relative overflow-hidden group"
                                >
                                    <div className="absolute -right-4 -bottom-4 opacity-10 blur-sm group-hover:opacity-20 transition-opacity">
                                        <Heart className="w-40 h-40" />
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 text-white/50 mb-6">
                                            <Heart className="w-5 h-5 text-rose-400" />
                                            <span className="text-xs font-bold tracking-widest uppercase text-white/80">Amalkan Doa Ini</span>
                                        </div>
                                        <p className="text-3xl font-amiri leading-relaxed mb-4 text-right" dir="rtl">
                                            {selectedMood.doa.arabic}
                                        </p>
                                        <p className="text-white/60 font-medium mb-3 italic">
                                            {selectedMood.doa.latin}
                                        </p>
                                        <p className="text-white/90 font-serif leading-relaxed">
                                            "{selectedMood.doa.translation}"
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.5 }}
                                className="text-center mt-12 mb-8"
                            >
                                <p className="text-white/40 text-sm font-medium">Tarik napas perlahan... Allah selalu bersamamu.</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </section>
        </main>
    );
}
