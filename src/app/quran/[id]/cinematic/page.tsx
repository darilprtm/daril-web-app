"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Play, Pause, ArrowLeft, Volume2, SkipForward, SkipBack } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CinematicPlayer() {
    const params = useParams();
    const router = useRouter();
    const surahId = params.id as string;

    const [surah, setSurah] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [currentAyahIndex, setCurrentAyahIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const fetchSurah = async () => {
            try {
                // Fetch basic Arabic data and audio (using ar.alafasy as default)
                const resAr = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/ar.alafasy`);
                // Fetch translations (Indonesian)
                const resId = await fetch(`https://api.alquran.cloud/v1/surah/${surahId}/id.indonesian`);

                const dataAr = await resAr.json();
                const dataId = await resId.json();

                if (dataAr.code === 200 && dataId.code === 200) {
                    const combined = dataAr.data.ayahs.map((ayah: any, index: number) => ({
                        number: ayah.numberInSurah,
                        arabic: ayah.text,
                        audio: ayah.audio,
                        translation: dataId.data.ayahs[index].text
                    }));

                    setSurah({
                        name: dataAr.data.englishName,
                        nameAr: dataAr.data.name,
                        translation: dataId.data.englishNameTranslation, // or ID meaning if available
                        ayahs: combined
                    });
                }
            } catch (err) {
                console.error("Failed to load cinematic surah", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSurah();
    }, [surahId]);

    // Handle Audio Playback
    useEffect(() => {
        if (!surah || !surah.ayahs[currentAyahIndex]) return;

        if (audioRef.current) {
            audioRef.current.pause();
        }

        const audioUrl = surah.ayahs[currentAyahIndex].audio;
        audioRef.current = new Audio(audioUrl);

        if (isPlaying) {
            audioRef.current.play().catch(e => console.log("Auto-play prevented", e));
        }

        audioRef.current.onended = () => {
            if (currentAyahIndex < surah.ayahs.length - 1) {
                setCurrentAyahIndex(prev => prev + 1);
            } else {
                setIsPlaying(false); // Finished Surah
            }
        };

        // Auto-scroll to current Ayah
        if (ayahRefs.current[currentAyahIndex]) {
            ayahRefs.current[currentAyahIndex]?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.onended = null;
            }
        };
    }, [currentAyahIndex, surah, isPlaying]);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const nextAyah = () => {
        if (surah && currentAyahIndex < surah.ayahs.length - 1) {
            setCurrentAyahIndex(prev => prev + 1);
        }
    };

    const prevAyah = () => {
        if (currentAyahIndex > 0) {
            setCurrentAyahIndex(prev => prev - 1);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!surah) return <div className="min-h-screen bg-black text-white p-8">Gagal memuat Surah.</div>;

    return (
        <main className="min-h-[100dvh] bg-black text-white overflow-hidden relative font-sans flex flex-col">
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/40 via-black to-emerald-950/40 opacity-80" />
                <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-black via-black/50 to-transparent z-10" />
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                {/* Slow moving orb for aesthetic */}
                <motion.div
                    animate={{
                        x: [0, 50, -50, 0],
                        y: [0, -50, 50, 0],
                        scale: [1, 1.2, 0.8, 1]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"
                />
            </div>

            {/* Header */}
            <header className="relative z-20 p-6 flex items-center justify-between">
                <button
                    onClick={() => router.back()}
                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-all"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div className="text-center">
                    <h1 className="text-xl font-bold tracking-widest">{surah.name}</h1>
                    <p className="text-xs text-white/50 uppercase tracking-widest">{surah.translation}</p>
                </div>
                <div className="w-12 h-12" /> {/* Spacer */}
            </header>

            {/* Lyrics Area */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto hide-scrollbar relative z-10 px-4 md:px-12 lg:px-24 py-[40vh]"
                style={{ scrollBehavior: 'smooth' }}
            >
                <div className="max-w-4xl mx-auto space-y-24">
                    {surah.ayahs.map((ayah: any, index: number) => {
                        const isActive = index === currentAyahIndex;
                        return (
                            <div
                                key={ayah.number}
                                ref={(el: any) => ayahRefs.current[index] = el}
                                onClick={() => {
                                    setCurrentAyahIndex(index);
                                    if (!isPlaying) setIsPlaying(true);
                                }}
                                className={`transition-all duration-1000 cursor-pointer ${isActive ? 'opacity-100 scale-100' : 'opacity-20 scale-95 blur-[2px] hover:opacity-50 hover:blur-[1px]'}`}
                            >
                                <p className="text-5xl md:text-6xl lg:text-7xl font-amiri leading-[1.8] text-center mb-8 drop-shadow-2xl" dir="rtl">
                                    {ayah.arabic}
                                </p>
                                <p className="text-xl md:text-2xl text-center text-indigo-200/90 font-serif leading-relaxed max-w-2xl mx-auto">
                                    {ayah.translation}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Player Controls */}
            <div className="relative z-20 pb-8 pt-4 px-6 md:px-12 bg-gradient-to-t from-black via-black/90 to-transparent">
                <div className="max-w-md mx-auto flex items-center justify-between">
                    <button
                        onClick={prevAyah}
                        className="text-white/50 hover:text-white transition-colors p-4"
                    >
                        <SkipBack className="w-8 h-8" />
                    </button>

                    <button
                        onClick={togglePlay}
                        className="w-20 h-20 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        {isPlaying ? <Pause className="w-8 h-8 fill-black" /> : <Play className="w-8 h-8 fill-black ml-1" />}
                    </button>

                    <button
                        onClick={nextAyah}
                        className="text-white/50 hover:text-white transition-colors p-4"
                    >
                        <SkipForward className="w-8 h-8" />
                    </button>
                </div>
                <div className="text-center mt-4">
                    <span className="text-xs font-bold tracking-widest text-white/30 uppercase">
                        Syeikh Mishary Rashid Alafasy
                    </span>
                </div>
            </div>
        </main>
    );
}
