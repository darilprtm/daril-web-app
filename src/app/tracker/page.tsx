"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Check, Flame, Calendar as CalIcon, Moon, Sun, BookOpen, Heart, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HABITS = [
    { id: "sholat", label: "Sholat 5 Waktu", icon: Activity, color: "text-blue-500", bg: "bg-blue-50", fill: "bg-blue-500" },
    { id: "tahajjud", label: "Tahajjud", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50", fill: "bg-indigo-500" },
    { id: "dhuha", label: "Dhuha", icon: Sun, color: "text-amber-500", bg: "bg-amber-50", fill: "bg-amber-500" },
    { id: "tilawah", label: "Tilawah Quran", icon: BookOpen, color: "text-emerald-500", bg: "bg-emerald-50", fill: "bg-emerald-500" },
    { id: "sedekah", label: "Sedekah", icon: Heart, color: "text-rose-500", bg: "bg-rose-50", fill: "bg-rose-500" },
];

export default function TrackerPage() {
    const { lang } = useLanguage();
    // 30 Days tracker
    const days = Array.from({ length: 30 }, (_, i) => i + 1);
    const [trackerData, setTrackerData] = useState<Record<string, Record<number, boolean>>>({});
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("daril_tracker");
        if (saved) {
            setTrackerData(JSON.parse(saved));
        } else {
            // Initialize empty
            const init: Record<string, Record<number, boolean>> = {};
            HABITS.forEach(h => {
                init[h.id] = {};
                days.forEach(d => init[h.id][d] = false);
            });
            setTrackerData(init);
        }
    }, []);

    const toggleHabit = (habitId: string, day: number) => {
        setTrackerData(prev => {
            const up = {
                ...prev,
                [habitId]: {
                    ...prev[habitId],
                    [day]: !prev[habitId][day]
                }
            };
            localStorage.setItem("daril_tracker", JSON.stringify(up));
            return up;
        });
    };

    const getStreak = (habitId: string) => {
        if (!trackerData[habitId]) return 0;
        let streak = 0;
        // Count from day 30 backwards
        for (let i = 30; i >= 1; i--) {
            if (trackerData[habitId][i]) streak++;
            else break;
        }
        return streak;
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-white text-black font-sans pb-32">
            <Navbar />

            <section className="pt-32 px-4 max-w-5xl mx-auto">
                <div className="mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-bold uppercase tracking-widest mb-6">
                        <Flame className="w-3 h-3 text-orange-500" />
                        Mutaba'ah Yaumiyah
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-4 leading-tight">
                        Habit<br />Tracker.
                    </h1>
                    <p className="text-xl text-black/50 font-light max-w-xl">
                        {lang === 'ID'
                            ? "Pantau dan pertahankan konsistensi ibadah harianmu. Setiap kotak yang terisi adalah langkah kecil menuju ketakwaan."
                            : "Monitor and maintain your daily worship consistency. Every filled box is a small step towards piety."}
                    </p>
                </div>

                {/* Pohon Pahala (Visual Tracker) */}
                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 shadow-lg shadow-emerald-500/5">
                    <div className="flex-1 text-center md:text-left">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-4">
                            Pohon Pahala
                        </span>
                        <h2 className="text-3xl md:text-4xl font-serif font-black text-emerald-950 mb-4">
                            Rawat Pohon Kebaikanmu.
                        </h2>
                        <p className="text-emerald-800/70 text-lg leading-relaxed mb-6">
                            Ibadah yang konsisten ibarat menyiram bibit tanaman. Semakin sering kamu beribadah, semakin rindang pohon pahalamu tumbuh.
                        </p>

                        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white inline-block w-full md:w-auto">
                            <div className="flex items-center justify-between gap-12">
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600/70 mb-1">Total Amal</p>
                                    <p className="text-4xl font-black text-emerald-600">
                                        {Object.values(trackerData).reduce((acc, habit) => acc + Object.values(habit).filter(Boolean).length, 0)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-emerald-600/70 mb-1">Fase Tumbuh</p>
                                    <p className="text-xl font-bold text-emerald-800">
                                        {(() => {
                                            const total = Object.values(trackerData).reduce((acc, habit) => acc + Object.values(habit).filter(Boolean).length, 0);
                                            if (total < 10) return "Bibit Unggul";
                                            if (total < 40) return "Tunas Harapan";
                                            if (total < 80) return "Pohon Muda";
                                            if (total < 120) return "Pohon Rindang";
                                            return "Pohon Berbuah";
                                        })()}
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full h-3 bg-emerald-900/10 rounded-full mt-6 overflow-hidden">
                                <div
                                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                    style={{ width: `${Math.min(100, (Object.values(trackerData).reduce((acc, habit) => acc + Object.values(habit).filter(Boolean).length, 0) / 150) * 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Visual Tree Representation Area */}
                    <div className="w-full md:w-72 h-72 bg-white rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.15)] relative overflow-hidden flex-shrink-0 border-8 border-emerald-50">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-100/50 to-transparent" />

                        {(() => {
                            const total = Object.values(trackerData).reduce((acc, habit) => acc + Object.values(habit).filter(Boolean).length, 0);

                            if (total < 10) return (
                                <div className="text-center relative z-10 animate-bounce-slow">
                                    <span className="text-6xl drop-shadow-md">🌱</span>
                                </div>
                            );
                            if (total < 40) return (
                                <div className="text-center relative z-10 animate-bounce-slow">
                                    <span className="text-8xl drop-shadow-md">🌿</span>
                                </div>
                            );
                            if (total < 80) return (
                                <div className="text-center relative z-10 animate-bounce-slow">
                                    <span className="text-9xl drop-shadow-md">🪴</span>
                                </div>
                            );
                            if (total < 120) return (
                                <div className="text-center relative z-10 animate-bounce-slow">
                                    <span className="text-[140px] drop-shadow-2xl">🌳</span>
                                </div>
                            );
                            return (
                                <div className="text-center relative z-10 animate-pulse-slow">
                                    <span className="text-[150px] drop-shadow-2xl">🍎</span>
                                </div>
                            );
                        })()}
                    </div>
                </div>

                <div className="space-y-12">
                    {HABITS.map(habit => {
                        const Icon = habit.icon;
                        const streak = getStreak(habit.id);

                        return (
                            <div key={habit.id} className="group">
                                <div className="flex items-end justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${habit.bg}`}>
                                            <Icon className={`w-5 h-5 ${habit.color}`} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-bold text-xl">{habit.label}</h3>
                                            <p className="text-xs font-bold tracking-widest uppercase text-black/40">30 Hari Terakhir</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-1.5 justify-end text-orange-500">
                                            <Flame className="w-4 h-4 fill-orange-500" />
                                            <span className="font-black text-xl">{streak}</span>
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-black/40">Day Streak</span>
                                    </div>
                                </div>

                                <div className="overflow-x-auto pb-4 hide-scrollbar">
                                    <div className="flex gap-2 min-w-max">
                                        {days.map(day => {
                                            const isDone = trackerData[habit.id]?.[day];
                                            return (
                                                <button
                                                    key={day}
                                                    onClick={() => toggleHabit(habit.id, day)}
                                                    className={`w-12 h-12 md:w-14 md:h-14 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${isDone
                                                        ? `${habit.fill} shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-105 border-transparent`
                                                        : "bg-white border-2 border-black/5 hover:border-black/20 hover:bg-black/5"
                                                        }`}
                                                >
                                                    <span className={`text-[10px] font-bold ${isDone ? "text-white/80" : "text-black/30"}`}>H{day}</span>
                                                    {isDone ? (
                                                        <Check className="w-5 h-5 text-white mt-0.5" />
                                                    ) : (
                                                        <div className="w-5 h-5 mt-0.5" />
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
