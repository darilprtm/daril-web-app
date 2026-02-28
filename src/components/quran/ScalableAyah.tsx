"use client";

import { useState } from "react";
import BookmarkButton from "./BookmarkButton";
import { useAccessibility } from "@/context/AccessibilityContext";
import { useQuranAudio } from "@/context/QuranAudioContext";
import { Play, Volume2, BookText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ScalableAyahProps {
    ayah: any;
    indoText: string;
    enText: string;
    latinText: string;
    ayahKey: string;
    surahName?: string;
    bookmarkMode?: "surah" | "juz";
    playlist?: any[];
    audioIndex?: number;
}

export default function ScalableAyah({ ayah, indoText, enText, latinText, ayahKey, surahName, bookmarkMode = "surah", playlist, audioIndex }: ScalableAyahProps) {
    const { scale } = useAccessibility();
    const { setPlaylistAndPlay, currentAudio, isPlaying, play, pause } = useQuranAudio();

    const [showTafsir, setShowTafsir] = useState(false);
    const [tafsirData, setTafsirData] = useState<string | null>(null);
    const [loadingTafsir, setLoadingTafsir] = useState(false);

    const isThisAyahPlaying = isPlaying && currentAudio?.ayahKey === ayahKey;
    const isThisAyahSelected = currentAudio?.ayahKey === ayahKey;

    const togglePlay = () => {
        if (!playlist || audioIndex === undefined) return;

        if (isThisAyahSelected) {
            isPlaying ? pause() : play();
        } else {
            setPlaylistAndPlay(playlist, audioIndex);
        }
    };

    const handleTafsir = async () => {
        setShowTafsir(!showTafsir);
        if (!tafsirData && !showTafsir) {
            setLoadingTafsir(true);
            try {
                const [surahId, ayahNum] = ayahKey.split(":");
                const res = await fetch(`https://equran.id/api/v2/tafsir/${surahId}`);
                const json = await res.json();
                const t = json.data.tafsir.find((x: any) => x.ayat === Number(ayahNum));
                if (t) setTafsirData(t.teks);
                else setTafsirData("Tafsir tidak ditemukan untuk ayat ini.");
            } catch (error) {
                setTafsirData("Gagal memuat tafsir. Periksa koneksi internet.");
            } finally {
                setLoadingTafsir(false);
            }
        }
    };

    // Precise Tailwind class mapping based on scale
    const sizes = {
        small: { arabic: "text-xl leading-[2.5]", latin: "text-xs", trans: "text-xs", idTrans: "text-sm" },
        normal: { arabic: "text-4xl leading-[2.5]", latin: "text-lg", trans: "text-lg", idTrans: "text-xl" },
        large: { arabic: "text-5xl leading-loose", latin: "text-xl", trans: "text-xl", idTrans: "text-2xl" },
        xlarge: { arabic: "text-7xl leading-loose", latin: "text-2xl", trans: "text-2xl", idTrans: "text-3xl" }
    };

    const currentSizes = sizes[scale as keyof typeof sizes] || sizes.normal;

    return (
        <div className="relative group p-6 rounded-2xl hover:bg-black/5 transition-colors" id={`ayah-${ayahKey}`}>
            <div className="absolute top-6 left-6 flex flex-col gap-4">
                <div className="w-8 h-8 rounded-full border border-black/20 flex items-center justify-center font-bold text-xs text-black/40 group-hover:border-black group-hover:text-black transition-colors" title="Nomor Ayat">
                    {ayah.numberInSurah}
                </div>
                <BookmarkButton ayahKey={ayahKey} mode={bookmarkMode} />
                {playlist && audioIndex !== undefined && (
                    <button
                        onClick={togglePlay}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isThisAyahPlaying ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'bg-black/5 text-black/40 hover:bg-emerald-50 hover:text-emerald-600'}`}
                        title="Putar Audio"
                    >
                        {isThisAyahPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Play className="w-4 h-4 ml-0.5" />}
                    </button>
                )}
            </div>

            <div className="pl-16">
                {surahName && (
                    <div className="flex justify-between items-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-widest text-black/40">{surahName}</span>
                    </div>
                )}

                {/* Arabic Text */}
                <p className={`${currentSizes.arabic} font-serif text-right arabic mb-6 transition-all duration-300`}>
                    {ayah.text}
                </p>

                {/* Latin Transliteration */}
                <p className={`${currentSizes.latin} text-black/60 italic mb-8 border-l-2 border-black/10 pl-4 py-1 leading-relaxed transition-all duration-300`}>
                    {latinText}
                </p>

                {/* Translations */}
                <div className="space-y-4">
                    <div>
                        <span className="text-xs uppercase tracking-widest text-black/40 font-bold mb-1 block">ID</span>
                        <p className={`${currentSizes.idTrans} text-black font-bold leading-relaxed transition-all duration-300`}>
                            {indoText}
                        </p>
                    </div>
                    <div>
                        <span className="text-xs uppercase tracking-widest text-black/40 font-bold mb-1 block">EN</span>
                        <p className={`${currentSizes.trans} text-black/70 font-semibold leading-relaxed transition-all duration-300`}>
                            {enText}
                        </p>
                    </div>
                </div>

                {/* Tafsir Toggle & Drawer */}
                <div className="mt-8 pt-6 border-t border-black/5">
                    <button
                        onClick={handleTafsir}
                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors"
                    >
                        <BookText className="w-4 h-4" />
                        {showTafsir ? "Tutup Tafsir" : "Baca Tafsir Kemenag"}
                    </button>

                    <AnimatePresence>
                        {showTafsir && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="mt-6 p-6 md:p-8 bg-black/5 rounded-2xl border border-black/10">
                                    <span className="text-xs uppercase tracking-widest text-black/40 font-bold mb-4 flex items-center gap-2">
                                        <BookText className="w-3 h-3 text-emerald-600" /> Tafsir Tahlili Kemenag RI
                                    </span>
                                    {loadingTafsir ? (
                                        <div className="space-y-3">
                                            <div className="animate-pulse h-4 bg-black/10 rounded w-full"></div>
                                            <div className="animate-pulse h-4 bg-black/10 rounded w-5/6"></div>
                                            <div className="animate-pulse h-4 bg-black/10 rounded w-4/6"></div>
                                        </div>
                                    ) : (
                                        <p className="text-sm md:text-base leading-loose text-black/80 font-medium whitespace-pre-line">
                                            {tafsirData}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
