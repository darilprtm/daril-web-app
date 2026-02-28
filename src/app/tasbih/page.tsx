"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Volume2, VolumeX, History, Sparkles } from "lucide-react";

const DZIKIR_PRESETS = [
    { id: "subhanallah", name: "Subhanallah", arabic: "سُبْحَانَ اللَّهِ", translation: "Maha Suci Allah", count: 33 },
    { id: "alhamdulillah", name: "Alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", translation: "Segala puji bagi Allah", count: 33 },
    { id: "allahuakbar", name: "Allahu Akbar", arabic: "اللَّهُ أَكْبَرُ", translation: "Allah Maha Besar", count: 33 },
    { id: "lailahaillallah", name: "La ilaha illallah", arabic: "لَا إِلٰهَ إِلَّا اللَّٰهُ", translation: "Tiada Tuhan selain Allah", count: 100 },
    { id: "istighfar", name: "Istighfar", arabic: "أَسْتَغْفِرُ اللَّهَ", translation: "Aku memohon ampun kepada Allah", count: 100 },
];

export default function TasbihPage() {
    const [count, setCount] = useState(0);
    const [totalCount, setTotalCount] = useState(0);
    const [activePreset, setActivePreset] = useState(DZIKIR_PRESETS[0]);
    const [hapticEnabled, setHapticEnabled] = useState(true);
    const [showTargetAnimation, setShowTargetAnimation] = useState(false);

    // Load from LocalStorage
    useEffect(() => {
        const savedCount = localStorage.getItem('tasbih_count');
        const savedTotal = localStorage.getItem('tasbih_total');
        if (savedCount) setCount(parseInt(savedCount));
        if (savedTotal) setTotalCount(parseInt(savedTotal));
    }, []);

    // Save to LocalStorage
    useEffect(() => {
        localStorage.setItem('tasbih_count', count.toString());
        localStorage.setItem('tasbih_total', totalCount.toString());
    }, [count, totalCount]);

    const triggerHaptic = (type: "light" | "heavy") => {
        if (!hapticEnabled || !window.navigator.vibrate) return;

        if (type === "light") {
            window.navigator.vibrate(40);
        } else {
            window.navigator.vibrate([100, 50, 100]); // stronger pattern for reaching target
        }
    };

    const handleTap = () => {
        const newCount = count + 1;
        setCount(newCount);
        setTotalCount(prev => prev + 1);

        if (newCount === activePreset.count) {
            triggerHaptic("heavy");
            setShowTargetAnimation(true);
            setTimeout(() => setShowTargetAnimation(false), 2000);
        } else {
            triggerHaptic("light");
        }
    };

    const resetCount = () => {
        if (confirm("Reset hitungan saat ini?")) {
            setCount(0);
        }
    };

    return (
        <main className="min-h-[90vh] bg-slate-50 relative overflow-hidden flex flex-col items-center justify-center p-4 pt-20">
            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-md w-full relative z-10 flex flex-col items-center">

                {/* Header Section */}
                <div className="text-center mb-8 relative">
                    <motion.div
                        key={activePreset.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-2"
                    >
                        <h1 className="text-4xl md:text-5xl font-amiri font-bold text-slate-800 mb-2 leading-relaxed h-[80px] flex items-center justify-center">
                            {activePreset.arabic}
                        </h1>
                        <h2 className="text-xl font-bold font-serif text-indigo-900">{activePreset.name}</h2>
                        <p className="text-sm text-slate-500">{activePreset.translation}</p>
                    </motion.div>
                </div>

                {/* Main Tasbih Button */}
                <div className="relative mb-12">
                    {/* Ring Target Glow */}
                    <AnimatePresence>
                        {showTargetAnimation && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1.5, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="absolute inset-0 bg-emerald-400 rounded-full z-0 pointer-events-none"
                            />
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTap}
                        className="relative z-10 w-64 h-64 md:w-72 md:h-72 rounded-full bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 flex flex-col items-center justify-center group touch-manipulation"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                        {/* Progress Border SVG */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none drop-shadow-md">
                            <circle
                                cx="50%"
                                cy="50%"
                                r="48%"
                                className="stroke-slate-100"
                                strokeWidth="8"
                                fill="none"
                            />
                            <motion.circle
                                cx="50%"
                                cy="50%"
                                r="48%"
                                className="stroke-indigo-500"
                                strokeWidth="8"
                                fill="none"
                                strokeLinecap="round"
                                initial={{ strokeDasharray: "0 1000" }}
                                animate={{ strokeDasharray: `${(count / activePreset.count) * 100 * 8.5} 1000` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                            />
                        </svg>

                        <span className="text-7xl font-sans font-black text-slate-800 tracking-tighter mb-2 group-active:scale-95 transition-transform">
                            {count}
                        </span>
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest px-4 py-1 rounded-full bg-slate-50">
                            Target: {activePreset.count}
                        </span>
                    </motion.button>
                </div>

                {/* Controls Area */}
                <div className="w-full bg-white rounded-[2rem] p-6 shadow-xl border border-slate-100/50 mb-8 max-w-sm">
                    {/* Presets Grid */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                        {DZIKIR_PRESETS.map((preset) => (
                            <button
                                key={preset.id}
                                onClick={() => { setActivePreset(preset); setCount(0); }}
                                className={`py-2 px-1 text-xs font-bold rounded-xl transition-all ${activePreset.id === preset.id
                                        ? "bg-indigo-500 text-white shadow-md shadow-indigo-500/20"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                                    }`}
                            >
                                {preset.name.split(" ")[0]}
                            </button>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between border-t border-slate-100 pt-6">
                        <button
                            onClick={resetCount}
                            className="flex flex-col items-center gap-2 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center">
                                <RotateCcw className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Reset</span>
                        </button>

                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xl font-bold text-indigo-900">{totalCount}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Hari Ini</span>
                        </div>

                        <button
                            onClick={() => setHapticEnabled(!hapticEnabled)}
                            className={`flex flex-col items-center gap-2 transition-colors ${hapticEnabled ? "text-indigo-500" : "text-slate-400"}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${hapticEnabled ? "bg-indigo-50" : "bg-slate-50"}`}>
                                {hapticEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">Getar</span>
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
