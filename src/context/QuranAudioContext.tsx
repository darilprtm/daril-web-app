"use client";

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from "react";

interface AyahAudio {
    ayahKey: string;     // e.g., "1:1"
    audioUrl: string;
    surahId: number;
    ayahNumber: number;
    text: string;        // for display
}

interface QuranAudioContextType {
    playlist: AyahAudio[];
    currentIndex: number;
    isPlaying: boolean;
    setPlaylistAndPlay: (playlist: AyahAudio[], startIndex?: number) => void;
    play: () => void;
    pause: () => void;
    next: () => void;
    prev: () => void;
    stop: () => void;
    currentAudio: AyahAudio | null;
}

const QuranAudioContext = createContext<QuranAudioContextType | undefined>(undefined);

export function QuranAudioProvider({ children }: { children: ReactNode }) {
    const [playlist, setPlaylist] = useState<AyahAudio[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    // We use a ref to hold the HTMLAudioElement
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Initialize audio element
    useEffect(() => {
        audioRef.current = new window.Audio();

        const handleEnded = () => {
            // Auto play next
            setCurrentIndex((prev) => {
                if (prev < playlist.length - 1) {
                    return prev + 1;
                } else {
                    setIsPlaying(false);
                    return prev;
                }
            });
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audioRef.current.addEventListener('ended', handleEnded);
        audioRef.current.addEventListener('play', handlePlay);
        audioRef.current.addEventListener('pause', handlePause);

        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('ended', handleEnded);
                audioRef.current.removeEventListener('play', handlePlay);
                audioRef.current.removeEventListener('pause', handlePause);
                audioRef.current.pause();
            }
        };
    }, [playlist.length]);

    // When currentIndex or playlist changes, load and play
    useEffect(() => {
        if (currentIndex >= 0 && currentIndex < playlist.length && audioRef.current) {
            audioRef.current.src = playlist[currentIndex].audioUrl;
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Audio play error", e));
            }
        }
    }, [currentIndex, playlist]);

    // Handle auto-scroll to the active ayah
    useEffect(() => {
        if (isPlaying && currentIndex >= 0 && currentIndex < playlist.length) {
            const activeAyah = playlist[currentIndex];
            const el = document.getElementById(`ayah-${activeAyah.ayahKey}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [currentIndex, isPlaying, playlist]);

    const setPlaylistAndPlay = (newPlaylist: AyahAudio[], startIndex = 0) => {
        if (newPlaylist.length === 0) return;
        setPlaylist(newPlaylist);
        setCurrentIndex(startIndex);
        setIsPlaying(true);
        if (audioRef.current) {
            audioRef.current.src = newPlaylist[startIndex].audioUrl;
            audioRef.current.play().catch(e => console.error(e));
        }
    };

    const play = () => {
        if (audioRef.current && playlist.length > 0) {
            audioRef.current.play();
        }
    };

    const pause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    const next = () => {
        if (currentIndex < playlist.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsPlaying(true); // Ensure it plays when skipping
        }
    };

    const prev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
            setIsPlaying(true);
        }
    };

    const stop = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setIsPlaying(false);
        setPlaylist([]);
        setCurrentIndex(-1);
    };

    const currentAudio = currentIndex >= 0 && currentIndex < playlist.length ? playlist[currentIndex] : null;

    return (
        <QuranAudioContext.Provider value={{
            playlist,
            currentIndex,
            isPlaying,
            setPlaylistAndPlay,
            play,
            pause,
            next,
            prev,
            stop,
            currentAudio
        }}>
            {children}
        </QuranAudioContext.Provider>
    );
}

export function useQuranAudio() {
    const context = useContext(QuranAudioContext);
    if (!context) throw new Error("useQuranAudio must be used within a QuranAudioProvider");
    return context;
}
