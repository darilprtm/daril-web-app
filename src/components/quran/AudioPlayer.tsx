"use client";

import { useQuranAudio } from "@/context/QuranAudioContext";
import { Play, Pause, SkipForward, SkipBack, X, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AudioPlayer() {
    const { isPlaying, currentAudio, play, pause, next, prev, stop, playlist, currentIndex } = useQuranAudio();
    const [isVisible, setIsVisible] = useState(false);

    // Show player if there is an active playlist
    useEffect(() => {
        if (playlist.length > 0) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [playlist.length]);

    if (!isVisible || !currentAudio) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 md:pb-6 pointer-events-none">
            <div className="max-w-2xl mx-auto bg-black text-white rounded-3xl p-4 shadow-2xl flex items-center justify-between pointer-events-auto border border-white/10 backdrop-blur-xl bg-black/90">
                {/* Left: Info */}
                <div className="flex items-center gap-4 flex-1 overflow-hidden">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 relative overflow-hidden group">
                        {isPlaying ? (
                            <Volume2 className="w-5 h-5 text-emerald-400 animate-pulse" />
                        ) : (
                            <Play className="w-5 h-5 text-white/50" />
                        )}
                        <div className="absolute inset-0 bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex flex-col truncate pr-4">
                        <span className="font-bold text-sm uppercase tracking-widest text-emerald-400">
                            Ayat {currentAudio.ayahNumber}
                        </span>
                        <span className="text-white/70 text-xs truncate">
                            {currentAudio.text}
                        </span>
                    </div>
                </div>

                {/* Center: Controls */}
                <div className="flex items-center gap-2 md:gap-4 shrink-0 px-2">
                    <button
                        onClick={prev}
                        disabled={currentIndex === 0}
                        className="p-2 text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors"
                        aria-label="Previous Ayah"
                    >
                        <SkipBack className="w-5 h-5" />
                    </button>

                    <button
                        onClick={isPlaying ? pause : play}
                        className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                        aria-label={isPlaying ? "Pause" : "Play"}
                    >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                    </button>

                    <button
                        onClick={next}
                        disabled={currentIndex === playlist.length - 1}
                        className="p-2 text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 transition-colors"
                        aria-label="Next Ayah"
                    >
                        <SkipForward className="w-5 h-5" />
                    </button>
                </div>

                {/* Right: Close/Stop */}
                <div className="flex justify-end pl-4 border-l border-white/10 shrink-0">
                    <button
                        onClick={stop}
                        className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                        aria-label="Stop and Close Player"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
