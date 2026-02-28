"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, ListVideo, Disc3, Search, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { surahNamesList } from "@/lib/surahNames"; // Useful for searching if needed

interface Surah {
    number: number;
    name: string;
    englishName: string;
    englishNameTranslation: string;
    numberOfAyahs: number;
    revelationType: string;
}

export default function AudioHub() {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // Audio Player State
    const [currentSurah, setCurrentSurah] = useState<Surah | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Reciter ID (Default: Mishary Rashid Alafasy)
    const reciterId = "ar.alafasy";

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const res = await fetch("https://api.alquran.cloud/v1/surah");
                const data = await res.json();
                setSurahs(data.data);
            } catch (err) {
                console.error("Failed to fetch surahs", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSurahs();
    }, []);

    // Audio Event Bindings
    useEffect(() => {
        if (!currentSurah) return;

        // Cleanup previous audio instance
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            audioRef.current.src = "";
            audioRef.current = null;
        }

        const audioUrl = `https://cdn.islamic.network/quran/audio-surah/128/${reciterId}/${currentSurah.number}.mp3`;
        audioRef.current = new Audio(audioUrl);

        audioRef.current.addEventListener('timeupdate', updateProgress);
        audioRef.current.addEventListener('loadedmetadata', () => {
            if (audioRef.current) setDuration(audioRef.current.duration);
        });
        audioRef.current.addEventListener('ended', handleNext);

        // Auto-play when a new surah is selected
        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch(err => {
            console.error("Auto-play failed:", err);
            setIsPlaying(false);
        });

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('timeupdate', updateProgress);
                audioRef.current.removeEventListener('ended', handleNext);
            }
        };
    }, [currentSurah]);

    const updateProgress = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const togglePlay = () => {
        if (!currentSurah && surahs.length > 0) {
            setCurrentSurah(surahs[0]); // Play Al-Fatihah if nothing is selected
            return;
        }

        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const manualChange = Number(e.target.value);
        if (audioRef.current && duration) {
            audioRef.current.currentTime = (manualChange / 100) * duration;
            setProgress(manualChange);
        }
    };

    const handleNext = () => {
        if (!currentSurah) return;
        const nextIdx = surahs.findIndex(s => s.number === currentSurah.number) + 1;
        if (nextIdx < surahs.length) {
            setCurrentSurah(surahs[nextIdx]);
        }
    };

    const handlePrev = () => {
        if (!currentSurah) return;
        const prevIdx = surahs.findIndex(s => s.number === currentSurah.number) - 1;
        if (prevIdx >= 0) {
            setCurrentSurah(surahs[prevIdx]);
        }
    };

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    const filteredSurahs = surahs.filter(s =>
        s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.englishNameTranslation.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="min-h-[100dvh] bg-[#121212] flex flex-col font-sans text-white overflow-hidden pb-32">
            {/* Header / Top Bar */}
            <header className="sticky top-0 z-40 bg-[#121212]/90 backdrop-blur-xl border-b border-white/5 py-4 px-4 flex items-center justify-between shadow-2xl">
                <Link href="/" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5 group">
                    <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
                <div className="flex-1 max-w-md mx-4 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                        type="text"
                        placeholder="Cari Surah..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
                <div className="w-10" /> {/* Spacer */}
            </header>

            {/* Playlist Container */}
            <section className="flex-1 overflow-y-auto px-4 py-6 md:p-8 space-y-2 relative">
                {/* Spotlight Background FX */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

                <div className="max-w-4xl mx-auto flex flex-col gap-2 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 font-serif text-white">Murottal</h1>
                    <p className="text-white/50 text-sm md:text-base mb-8 pb-8 border-b border-white/10">Dengarkan 114 Surah Al-Quran dengan Suara Merdu Syeikh Mishary</p>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full" />
                        </div>
                    ) : (
                        filteredSurahs.map((s, idx) => {
                            const isSelected = currentSurah?.number === s.number;

                            return (
                                <motion.button
                                    key={s.number}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.02 }}
                                    onClick={() => setCurrentSurah(s)}
                                    className={`w-full text-left p-4 rounded-2xl flex items-center justify-between group transition-all duration-300 ${isSelected ? 'bg-white/10 border border-white/20 shadow-lg' : 'bg-transparent border border-transparent hover:bg-white/5'}`}
                                >
                                    <div className="flex items-center gap-4 md:gap-6">
                                        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-slate-800 to-black flex items-center justify-center shrink-0 border border-white/5 overflow-hidden">
                                            {isSelected && isPlaying ? (
                                                <div className="flex items-end gap-1 h-4">
                                                    <motion.div animate={{ height: ["4px", "16px", "8px"] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-emerald-400 rounded-full" />
                                                    <motion.div animate={{ height: ["8px", "4px", "14px"] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-emerald-400 rounded-full" />
                                                    <motion.div animate={{ height: ["14px", "10px", "6px"] }} transition={{ repeat: Infinity, duration: 0.4 }} className="w-1 bg-emerald-400 rounded-full" />
                                                </div>
                                            ) : (
                                                <span className={`font-bold font-serif ${isSelected ? 'text-emerald-400' : 'text-white/40 group-hover:text-white'}`}>{s.number}</span>
                                            )}
                                        </div>

                                        <div>
                                            <h3 className={`text-lg md:text-xl font-bold font-serif mb-1 truncate ${isSelected ? 'text-emerald-400' : 'text-white group-hover:text-emerald-300'} transition-colors`}>{s.englishName}</h3>
                                            <p className="text-xs md:text-sm text-white/50">
                                                {s.englishNameTranslation} • {s.revelationType === "Meccan" ? "Makkiyah" : s.revelationType === "Medinan" ? "Madaniyah" : s.revelationType}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="text-right hidden sm:block">
                                        <span className={`text-2xl md:text-3xl font-amiri block leading-none opacity-80 ${isSelected ? 'text-emerald-400' : 'text-white'} mb-1`}>{s.name}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-white/30">{s.numberOfAyahs} Ayat</span>
                                    </div>
                                </motion.button>
                            );
                        })
                    )}
                </div>
            </section>

            {/* Sticky "Now Playing" Bottom Bar */}
            <AnimatePresence>
                {currentSurah && (
                    <motion.div
                        initial={{ y: "100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="fixed bottom-0 left-0 w-full z-50 p-2 md:p-4"
                    >
                        <div className="max-w-4xl mx-auto bg-black border border-white/10 rounded-3xl p-4 md:p-6 shadow-[0_-20px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl flex flex-col md:flex-row items-center gap-4 md:gap-8">

                            {/* Track Info */}
                            <div className="flex items-center w-full md:w-1/3 gap-4">
                                <div className="relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-emerald-900 to-black flex items-center justify-center shrink-0 border border-emerald-500/20 shadow-emerald-500/20 shadow-xl overflow-hidden">
                                    <motion.div
                                        animate={{ rotate: isPlaying ? 360 : 0 }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Disc3 className="w-8 h-8 text-emerald-400 opacity-80" />
                                    </motion.div>
                                    <div className="absolute inset-0 m-auto w-3 h-3 bg-black rounded-full border border-emerald-500/30" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-bold text-white text-base md:text-lg truncate font-serif">{currentSurah.englishName}</h4>
                                    <p className="text-xs text-emerald-400 truncate">Mishary Rashid Alafasy</p>
                                </div>
                            </div>

                            {/* Controls & Progress */}
                            <div className="flex-1 flex flex-col items-center justify-center w-full gap-2">
                                <div className="flex items-center gap-6 md:gap-8">
                                    <button onClick={handlePrev} className="text-white/50 hover:text-white transition-colors" aria-label="Previous Surah">
                                        <SkipBack className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/20"
                                        aria-label={isPlaying ? "Pause" : "Play"}
                                    >
                                        {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                                    </button>
                                    <button onClick={handleNext} className="text-white/50 hover:text-white transition-colors" aria-label="Next Surah">
                                        <SkipForward className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                                    </button>
                                </div>

                                <div className="flex items-center gap-3 w-full max-w-md text-[10px] md:text-xs font-medium text-white/50">
                                    <span className="w-8 text-right">{formatTime(audioRef.current?.currentTime || 0)}</span>
                                    <div className="flex-1 h-1.5 md:h-2 bg-white/10 rounded-full relative group cursor-pointer">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={progress || 0}
                                            onChange={handleSeek}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="h-full bg-emerald-500 rounded-full relative transition-all" style={{ width: `${progress}%` }}>
                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                        </div>
                                    </div>
                                    <span className="w-8">{formatTime(duration)}</span>
                                </div>
                            </div>

                            {/* Extra Desktop Controls */}
                            <div className="hidden md:flex w-1/3 justify-end items-center gap-4">
                                <ListVideo className="w-5 h-5 text-white/50 hover:text-white transition-colors cursor-pointer" />
                                <Volume2 className="w-5 h-5 text-white/50 hover:text-white transition-colors cursor-pointer" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
