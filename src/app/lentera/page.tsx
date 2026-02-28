"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Heart, Sparkles, Send, ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

interface Prayer {
    id: string;
    text: string;
    author: string;
    hearts: number;
    speed: number;
    delay: number;
    left: number;
    scale: number;
}

const DUMMY_PRAYERS: Prayer[] = [
    { id: "1", text: "Ya Allah, lancarkanlah sidang skripsiku besok pagi. Aamiin.", author: "Hamba Allah", hearts: 12, speed: 25, delay: 0, left: 10, scale: 0.8 },
    { id: "2", text: "Semoga ibuku lekas sembuh dari penyakitnya. Mohon doanya kawan-kawan.", author: "Anonim", hearts: 45, speed: 30, delay: 2, left: 30, scale: 1 },
    { id: "3", text: "Ya Rabb, berikanlah aku rezeki yang halal dan barokah untuk keluargaku.", author: "Fulan", hearts: 8, speed: 20, delay: 5, left: 60, scale: 0.6 },
    { id: "4", text: "Semoga tahun ini aku bisa segera berangkat Umroh bersamanya.", author: "Hamba Allah", hearts: 33, speed: 35, delay: 1, left: 80, scale: 1.2 },
    { id: "5", text: "Kuatkanlah hatiku menerima ujian ini, Ya Allah.", author: "Anonim", hearts: 56, speed: 28, delay: 7, left: 45, scale: 0.9 },
    { id: "6", text: "Semoga diterima di kampus impian UI. Aamiin Ya Rabbal Alamin.", author: "Pejuang PTN", hearts: 21, speed: 22, delay: 4, left: 20, scale: 0.7 },
    { id: "7", text: "Ya Allah jadikanlah anak-anakku hamba yang sholeh dan sholehah.", author: "Seorang Ibu", hearts: 89, speed: 40, delay: 8, left: 70, scale: 1.1 },
];

export default function LenteraDoaPage() {
    const [prayers, setPrayers] = useState<Prayer[]>([]);
    const [activePrayer, setActivePrayer] = useState<Prayer | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [newPrayerText, setNewPrayerText] = useState("");
    const [newPrayerAuthor, setNewPrayerAuthor] = useState("");

    useEffect(() => {
        // Load from local storage or use dummy data
        const localPrayers = localStorage.getItem("daril_lentera_prayers");
        if (localPrayers) {
            setPrayers(JSON.parse(localPrayers));
        } else {
            setPrayers(DUMMY_PRAYERS);
            localStorage.setItem("daril_lentera_prayers", JSON.stringify(DUMMY_PRAYERS));
        }
    }, []);

    const handleHeart = (id: string) => {
        const updated = prayers.map(p => {
            if (p.id === id) return { ...p, hearts: p.hearts + 1 };
            return p;
        });
        setPrayers(updated);
        localStorage.setItem("daril_lentera_prayers", JSON.stringify(updated));

        if (activePrayer && activePrayer.id === id) {
            setActivePrayer({ ...activePrayer, hearts: activePrayer.hearts + 1 });
        }
    };

    const submitPrayer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPrayerText.trim()) return;

        const newP: Prayer = {
            id: Date.now().toString(),
            text: newPrayerText,
            author: newPrayerAuthor || "Hamba Allah",
            hearts: 1, // Start with 1 heart (from sender)
            speed: Math.random() * 20 + 20, // 20s to 40s duration
            delay: 0,
            left: Math.random() * 80 + 10, // 10% to 90%
            scale: Math.random() * 0.6 + 0.6 // 0.6x to 1.2x
        };

        const updated = [...prayers, newP];
        setPrayers(updated);
        localStorage.setItem("daril_lentera_prayers", JSON.stringify(updated));

        setNewPrayerText("");
        setNewPrayerAuthor("");
        setShowForm(false);
    };

    return (
        <main className="min-h-[100dvh] bg-slate-950 overflow-hidden relative font-sans select-none">
            {/* Dark Sky Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0C10] via-[#1F2833] to-[#0B0C10]" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />

                {/* Glowing Horizon */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-orange-500/10 via-amber-500/5 to-transparent blur-3xl" />
            </div>

            {/* Header / Nav */}
            <header className="relative z-20 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/" className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-all text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-amber-400" /> Lentera Doa
                        </h1>
                        <p className="text-xs text-white/50 uppercase tracking-widest font-medium">Bumi berbisik, Langit mendengar.</p>
                    </div>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" /> Terbangkan Doa
                </button>
            </header>

            {/* Canvas Area for Lanterns */}
            <div className="fixed inset-0 z-10 pointer-events-none">
                {prayers.map((prayer) => (
                    <motion.div
                        key={prayer.id}
                        initial={{ y: "10vh", opacity: 0 }}
                        animate={{
                            y: "-120vh",
                            opacity: [0, 1, 1, 0],
                            x: [0, Math.sin(prayer.delay) * 50, -Math.sin(prayer.delay) * 50, 0] // Gentle swaying
                        }}
                        transition={{
                            duration: prayer.speed,
                            ease: "linear",
                            repeat: Infinity,
                            delay: prayer.delay,
                            opacity: { duration: prayer.speed, times: [0, 0.1, 0.8, 1] }
                        }}
                        style={{ left: `${prayer.left}%`, transform: `scale(${prayer.scale})` }}
                        className="absolute bottom-0 cursor-pointer pointer-events-auto group"
                        onClick={() => setActivePrayer(prayer)}
                    >
                        {/* Lantern SVG / Div */}
                        <div className="relative w-12 h-16 flex items-center justify-center">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-amber-500 rounded-full blur-xl opacity-40 group-hover:opacity-80 transition-opacity group-hover:bg-orange-400 animate-pulse" />

                            {/* Lantern Body */}
                            <div className="w-10 h-14 bg-gradient-to-b from-amber-200/90 to-orange-500/80 rounded-t-xl rounded-b-md shadow-inner relative flex justify-center items-end pb-1 border border-amber-300/50">
                                {/* Flame */}
                                <div className="w-3 h-4 bg-white rounded-full blur-[1px] animate-pulse" />
                                {/* Detail lines */}
                                <div className="absolute inset-0 flex justify-between px-2 py-1 opacity-20">
                                    <div className="w-[1px] h-full bg-black/50" />
                                    <div className="w-[1px] h-full bg-black/50" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal for viewing active prayer */}
            <AnimatePresence>
                {activePrayer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setActivePrayer(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-slate-900 border border-white/10 p-8 rounded-[2rem] max-w-lg w-full shadow-2xl relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

                            <p className="text-2xl md:text-3xl text-white font-serif leading-relaxed mb-8">
                                "{activePrayer.text}"
                            </p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-white/10 pt-6 gap-4 sm:gap-0">
                                <div className="w-full sm:w-auto">
                                    <p className="text-white/40 text-sm uppercase tracking-widest font-bold">Pengirim</p>
                                    <p className="text-white/80 font-medium truncate max-w-full sm:max-w-[200px]">{activePrayer.author}</p>
                                </div>
                                <button
                                    onClick={() => handleHeart(activePrayer.id)}
                                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 rounded-full transition-colors group"
                                >
                                    <Heart className="w-5 h-5 group-hover:scale-110 transition-transform fill-current" />
                                    <span className="font-bold">Aamiin ({activePrayer.hearts})</span>
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modal for sending prayer */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex flex-col justify-end md:justify-center items-center p-0 md:p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setShowForm(false)}
                    >
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="bg-white p-8 rounded-t-[2rem] md:rounded-[2rem] w-full max-w-xl shadow-2xl text-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="w-16 h-1 bg-black/10 rounded-full mx-auto mb-8 md:hidden" />
                            <h2 className="text-3xl font-black font-serif mb-2">Terbangkan Harapan</h2>
                            <p className="text-black/60 mb-8">Tuliskan doa atau harapanmu hari ini. Ribuan orang yang membaca mungkin akan mengaminkannya untukmu.</p>

                            <form onSubmit={submitPrayer} className="space-y-6">
                                <div>
                                    <textarea
                                        rows={4}
                                        placeholder="Ya Allah, mudahkanlah urusanku hari ini..."
                                        value={newPrayerText}
                                        onChange={(e) => setNewPrayerText(e.target.value)}
                                        className="w-full p-4 rounded-2xl bg-slate-50 border border-black/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none resize-none transition-all text-lg font-serif"
                                        required
                                        autoFocus
                                    />
                                </div>
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Nama / Inisial (Opsional)"
                                        value={newPrayerAuthor}
                                        onChange={(e) => setNewPrayerAuthor(e.target.value)}
                                        maxLength={30}
                                        className="w-full p-4 rounded-2xl bg-slate-50 border border-black/10 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-medium"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!newPrayerText.trim()}
                                    className="w-full flex items-center justify-center gap-3 py-4 bg-black text-white rounded-2xl font-bold hover:bg-black/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg group"
                                >
                                    Selipkan ke Langit <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}
