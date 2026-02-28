"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import storiesData from "@/data/stories.json";

const DURATION_PER_SLIDE = 8000; // 8 seconds

export default function StoryViewer() {
    const params = useParams();
    const router = useRouter();
    const storyId = params.id as string;

    const story = storiesData.find(s => s.id === storyId);

    const [currentSlide, setCurrentSlide] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    // Animation frame reference for smooth progress bar
    const lastUpdateRef = useRef<number>(0);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        if (!story) return;

        const animate = (time: number) => {
            if (!lastUpdateRef.current) lastUpdateRef.current = time;

            if (!isPaused) {
                const delta = time - lastUpdateRef.current;

                setProgress(prev => {
                    const nextProgress = prev + (delta / DURATION_PER_SLIDE) * 100;
                    if (nextProgress >= 100) {
                        // Slide completed
                        if (currentSlide < story.slides.length - 1) {
                            setCurrentSlide(c => c + 1);
                            return 0; // Reset progress for next slide
                        } else {
                            // Story finished
                            router.push('/stories');
                            return 100;
                        }
                    }
                    return nextProgress;
                });
            }

            lastUpdateRef.current = time;
            rafRef.current = requestAnimationFrame(animate);
        };

        rafRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(rafRef.current);
    }, [currentSlide, isPaused, story, router]);

    const handleNext = () => {
        if (!story) return;
        if (currentSlide < story.slides.length - 1) {
            setCurrentSlide(c => c + 1);
            setProgress(0);
        } else {
            router.push('/stories');
        }
    };

    const handlePrev = () => {
        if (currentSlide > 0) {
            setCurrentSlide(c => c - 1);
            setProgress(0);
        } else {
            setProgress(0);
        }
    };

    if (!story) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center font-bold">Story tidak ditemukan.</div>;
    }

    const slide = story.slides[currentSlide];

    return (
        <main className="fixed inset-0 bg-black text-white z-50 flex justify-center selection:bg-transparent">
            {/* Aspect Ratio Container (simulating mobile phone display on desktop, full screen on mobile) */}
            <div
                className="relative w-full h-[100dvh] max-w-md bg-black overflow-hidden flex flex-col"
                onMouseDown={() => setIsPaused(true)}
                onMouseUp={() => setIsPaused(false)}
                onMouseLeave={() => setIsPaused(false)}
                onTouchStart={() => setIsPaused(true)}
                onTouchEnd={() => setIsPaused(false)}
            >
                {/* Background Image / Media */}
                <AnimatePresence mode="wait">
                    <motion.img
                        key={slide.id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={slide.image}
                        alt="Story background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Gradient Overlays for Readability */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-10" />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

                {/* Segmented Progress Bars */}
                <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
                    {story.slides.map((s, idx) => (
                        <div key={s.id} className="h-1 bg-white/30 rounded-full flex-1 overflow-hidden backdrop-blur-sm">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-75 ease-linear"
                                style={{
                                    width: idx < currentSlide ? '100%' : idx === currentSlide ? `${progress}%` : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header (Close button & Info) */}
                <div className="absolute top-8 left-4 right-4 flex items-center justify-between z-20">
                    <div className="flex items-center gap-2 drop-shadow-md">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-black">
                            S
                        </div>
                        <span className="font-bold text-sm tracking-wide shadow-black">Sasuke.id</span>
                        <span className="text-white/60 text-xs shadow-black">• {currentSlide + 1}h</span>
                    </div>
                    <button
                        onClick={() => router.push('/stories')}
                        className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Invisible Tap Zones */}
                <div className="absolute inset-0 z-30 flex">
                    <div className="w-1/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                    <div className="w-2/3 h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }} />
                </div>

                {/* Content Area */}
                <div className="absolute inset-x-0 bottom-0 z-40 p-6 md:p-8 flex flex-col justify-end min-h-[40vh] pointer-events-none">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-serif font-black mb-4 drop-shadow-2xl leading-tight">
                                {slide.title}
                            </h2>
                            <p className="text-white/90 text-lg md:text-xl leading-relaxed drop-shadow-lg font-medium">
                                {slide.content}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
