"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, SkipBack, Volume2, Maximize2, Disc3 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AudioWidget() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Dummy data for the widget (since it's a teaser for the full /audio page)
    const surah = {
        number: 55,
        name: "Ar-Rahman",
        englishNameTranslation: "The Beneficent",
        revelationType: "Makkiyah",
        audioUrl: "https://server8.mp3quran.net/afs/055.mp3" // Mishary Rashid Alafasy
    };

    useEffect(() => {
        if (!audioRef.current) {
            audioRef.current = new Audio(surah.audioUrl);
            audioRef.current.addEventListener('timeupdate', updateProgress);
            audioRef.current.addEventListener('loadedmetadata', () => {
                if (audioRef.current) setDuration(audioRef.current.duration);
            });
            audioRef.current.addEventListener('ended', () => setIsPlaying(false));
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.removeEventListener('timeupdate', updateProgress);
            }
        };
    }, []);

    const updateProgress = () => {
        if (audioRef.current) {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
    };

    const togglePlay = () => {
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

    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <section className="px-4 lg:px-8 max-w-7xl mx-auto -mt-16 relative z-20 mb-12">
            <div className="bg-[#121212] rounded-[2rem] p-6 text-white shadow-2xl flex flex-col md:flex-row items-center gap-6 overflow-hidden relative group border border-white/5">
                {/* Background Ambient Glow */}
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none" />

                {/* Explore Link Overlay */}
                <Link
                    href="/audio"
                    className="absolute top-4 right-6 text-xs font-bold text-white/50 hover:text-white transition-colors z-30 hidden md:flex items-center gap-1 group"
                >
                    Cari Audio Lain <span className="group-hover:translate-x-1 transition-transform">➔</span>
                </Link>

                <div className="flex-1 flex items-center gap-6 w-full z-10 mt-4 md:mt-0">
                    {/* Album Art replacement -> Spinning Disc */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-black flex items-center justify-center shadow-2xl shrink-0 overflow-hidden">
                        <motion.div
                            animate={{ rotate: isPlaying ? 360 : 0 }}
                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        >
                            <Disc3 className={`w-12 h-12 md:w-16 md:h-16 ${isPlaying ? 'text-emerald-400' : 'text-slate-500'} transition-colors duration-500`} />
                        </motion.div>
                        {/* Center Hole */}
                        <div className="absolute inset-0 m-auto w-4 h-4 bg-[#121212] rounded-full border border-slate-700" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/80 uppercase tracking-widest backdrop-blur-md border border-white/5">
                                Pilihan Hari Ini
                            </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold font-serif mb-1 truncate group-hover:text-emerald-400 transition-colors">
                            {surah.name}
                        </h3>
                        <p className="text-sm text-slate-400 truncate opacity-80">
                            {surah.englishNameTranslation} • {surah.revelationType}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-3 w-full md:w-auto md:min-w-[300px] z-10">
                    <div className="flex items-center gap-6">
                        <button className="text-white/50 hover:text-white transition-colors" disabled>
                            <SkipBack className="w-6 h-6 fill-current" />
                        </button>
                        <button
                            onClick={togglePlay}
                            className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/10"
                        >
                            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
                        </button>
                        <button className="text-white/50 hover:text-white transition-colors" disabled>
                            <SkipForward className="w-6 h-6 fill-current" />
                        </button>
                    </div>

                    <div className="flex items-center gap-3 w-full max-w-xs text-xs font-medium text-slate-400">
                        <span className="w-10 text-right">{formatTime(audioRef.current?.currentTime || 0)}</span>
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full relative group cursor-pointer">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress || 0}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="h-full bg-emerald-500 rounded-full relative transition-all" style={{ width: `${progress}%` }}>
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" />
                            </div>
                        </div>
                        <span className="w-10">{formatTime(duration)}</span>
                    </div>
                </div>

                <div className="hidden lg:flex items-center justify-end w-32 gap-4 z-10">
                    <Volume2 className="w-5 h-5 text-slate-400" />
                    <Link
                        href="/audio"
                        className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/5 group-hover:border-white/20"
                        title="Buka Murottal Hub"
                    >
                        <Maximize2 className="w-4 h-4 text-white" />
                    </Link>
                </div>

                {/* Mobile Link Overlay */}
                <Link href="/audio" className="absolute inset-0 z-0 lg:hidden" aria-label="Open Murottal Hub" />
            </div>
        </section>
    );
}
