"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import confetti from "canvas-confetti";
import { Heart, Trophy, RefreshCcw, Hand, Play, LayoutGrid } from "lucide-react";
import { surahNamesList } from "@/lib/surahNames";
import { motion, AnimatePresence } from "framer-motion";

type QuestionType = "sambung" | "surah" | "juz";

interface Option {
    label: string;
    isCorrect: boolean;
}

interface Question {
    type: QuestionType;
    prompt: string;
    options: Option[];
}

const PRAISE_WORDS = [
    "Masya Allah! 🌟",
    "Luar Biasa! ✨",
    "Barakallah! 🏆",
    "Hebat Sekali! 🔥",
    "Alhamdulillah Benar! 💖",
    "Mumtaz! 💯",
    "Tepat Sekali! 🎯",
];

const ENCOURAGE_WORDS = [
    "Ayo Coba Lagi! 💪",
    "Sayang Sekali 🍂",
    "Jangan Menyerah! ✊",
    "Hampir Benar.. 🥺",
];

export default function AnimatedQuiz() {
    const [status, setStatus] = useState<"menu" | "playing" | "game_over">("menu");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(false);

    // Interaction States
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [isChecking, setIsChecking] = useState(false);
    const [toastMsg, setToastMsg] = useState<{ text: string; type: 'success' | 'error' | null }>({ text: "", type: null });
    const [shake, setShake] = useState(false);

    // For AnimatePresence keying
    const [questionKey, setQuestionKey] = useState(0);

    useEffect(() => {
        const savedBase = localStorage.getItem("daril_highscore");
        if (savedBase) setHighScore(parseInt(savedBase));
    }, []);

    const fetchQuestion = async () => {
        setLoading(true);
        try {
            const randomPage = Math.floor(Math.random() * 603) + 2; // Pages 2 to 604
            const res = await fetch(`https://api.alquran.cloud/v1/page/${randomPage}/quran-uthmani`);
            const data = await res.json();
            const ayahs = data.data.ayahs;

            if (!ayahs || ayahs.length < 5) {
                fetchQuestion(); // Failsafe fallback
                return;
            }

            // Pick a random index for the prompt, must leave room for N+1
            const baseIdx = Math.floor(Math.random() * (ayahs.length - 2));
            const promptAyah = ayahs[baseIdx];

            // Determine question type randomly
            const types: QuestionType[] = ["sambung", "surah", "juz"];
            const type = types[Math.floor(Math.random() * 3)];

            let options: Option[] = [];

            if (type === "sambung") {
                const correct = ayahs[baseIdx + 1];
                options.push({ label: correct.text, isCorrect: true });

                const distractors = ayahs
                    .filter((_: any, i: number) => i !== baseIdx && i !== baseIdx + 1)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map((a: any) => ({ label: a.text, isCorrect: false }));

                options = [...options, ...distractors];
            } else if (type === "surah") {
                const correctSurah = promptAyah.surah.englishName;
                options.push({ label: `Surah ${correctSurah}`, isCorrect: true });

                let distractors: string[] = [];
                while (distractors.length < 3) {
                    const r = surahNamesList[Math.floor(Math.random() * 114)];
                    const cap = r.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
                    const name = `Surah ${cap}`;
                    if (name !== `Surah ${correctSurah}` && !distractors.includes(name)) {
                        distractors.push(name);
                    }
                }
                options = [...options, ...distractors.map(d => ({ label: d, isCorrect: false }))];
            } else if (type === "juz") {
                const correctJuz = promptAyah.juz;
                options.push({ label: `Juz ${correctJuz}`, isCorrect: true });

                let distractors: number[] = [];
                while (distractors.length < 3) {
                    const r = Math.floor(Math.random() * 30) + 1;
                    if (r !== correctJuz && !distractors.includes(r)) distractors.push(r);
                }
                options = [...options, ...distractors.map(d => ({ label: `Juz ${d}`, isCorrect: false }))];
            }

            options = options.sort(() => 0.5 - Math.random());

            setQuestion({ type, prompt: promptAyah.text, options });
            setQuestionKey(prev => prev + 1); // Trigger AnimatePresence Remount

        } catch (error) {
            console.error("Fetch Err", error);
            setTimeout(() => fetchQuestion(), 1500);
        } finally {
            setLoading(false);
            setIsChecking(false);
            setSelectedIdx(null);
            setToastMsg({ text: "", type: null });
            setShake(false);
        }
    };

    const handleStart = () => {
        setScore(0);
        setLives(5);
        setStatus("playing");
        fetchQuestion();
    };

    const handleOptionClick = (idx: number, isCorrect: boolean) => {
        if (isChecking) return;
        setIsChecking(true);
        setSelectedIdx(idx);

        if (isCorrect) {
            const randomPraise = PRAISE_WORDS[Math.floor(Math.random() * PRAISE_WORDS.length)];
            setToastMsg({ text: randomPraise, type: 'success' });

            const newScore = score + 10;
            setScore(newScore);

            if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem("daril_highscore", newScore.toString());
            }

            if (newScore % 50 === 0) {
                confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
            }

        } else {
            const randomEncourage = ENCOURAGE_WORDS[Math.floor(Math.random() * ENCOURAGE_WORDS.length)];
            setToastMsg({ text: randomEncourage, type: 'error' });
            setShake(true); // Trigger CSS shake animation on the container

            const newLives = lives - 1;
            setLives(newLives);

            if (newLives <= 0) {
                setTimeout(() => setStatus("game_over"), 1500);
                return;
            }
        }

        // Delay 1.5s so user sees the color & toast, then move next
        setTimeout(() => {
            fetchQuestion();
        }, 1500);
    };

    return (
        <main className="min-h-[100dvh] bg-slate-50 text-black font-sans relative overflow-hidden flex flex-col">
            <Navbar />

            {/* Dynamic Animated Background based on result */}
            <AnimatePresence>
                {isChecking && toastMsg.type === 'success' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-emerald-500/10 pointer-events-none z-0"
                    />
                )}
                {isChecking && toastMsg.type === 'error' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 bg-red-500/10 pointer-events-none z-0"
                    />
                )}
            </AnimatePresence>

            {/* Praise / Encourage Toast (Floating) */}
            <AnimatePresence>
                {toastMsg.type && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="absolute top-32 left-0 right-0 z-50 flex justify-center pointer-events-none px-4"
                    >
                        <div className={`px-6 py-3 rounded-full shadow-2xl font-black text-xl tracking-wide border-2 ${toastMsg.type === 'success' ? 'bg-emerald-500 text-white border-emerald-400' : 'bg-red-500 text-white border-red-400'
                            }`}>
                            {toastMsg.text}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="pt-32 pb-24 px-4 max-w-2xl mx-auto flex-1 flex flex-col justify-center relative z-10 w-full">

                {status === "menu" && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-indigo-500/10 border border-slate-100"
                    >
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white mb-8 shadow-xl shadow-indigo-500/30">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4">Quran Challenge</h1>
                        <p className="text-lg text-slate-500 font-medium mb-10 max-w-sm mx-auto">
                            Uji hafalanmu. Mode tanpa akhir (<span className="italic">Infinity</span>). 5 Nyawa. Seberapa jauh kamu bertahan?
                        </p>

                        <button
                            onClick={handleStart}
                            className="bg-black text-white px-8 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-3 mx-auto shadow-xl shadow-black/20"
                        >
                            <Play className="w-5 h-5 fill-white" /> Mulai Petualangan
                        </button>

                        {highScore > 0 && (
                            <div className="mt-10 pt-6 border-t border-slate-100">
                                <p className="font-bold text-slate-400 uppercase tracking-widest text-xs mb-1">Skor Tertinggi Anda</p>
                                <p className="text-3xl font-black text-indigo-600 font-serif">{highScore}</p>
                            </div>
                        )}
                    </motion.div>
                )}

                {status === "playing" && (
                    <div className="w-full h-full flex flex-col">
                        <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex gap-1.5">
                                <AnimatePresence>
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div key={i} layout transition={{ type: "spring" }}>
                                            <Heart className={`w-6 h-6 md:w-8 md:h-8 ${i < lives ? "fill-rose-500 text-rose-500 drop-shadow-md" : "fill-slate-200 text-slate-200"} transition-colors`} />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase block mb-1">Score Total</span>
                                <motion.span
                                    key={score}
                                    initial={{ scale: 1.5, color: '#10B981' }}
                                    animate={{ scale: 1, color: '#0f172a' }}
                                    className="font-serif font-black text-3xl block"
                                >
                                    {score}
                                </motion.span>
                            </div>
                        </div>

                        {loading || !question ? (
                            <div className="flex-1 flex flex-col items-center justify-center py-24">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mb-4"
                                />
                                <span className="text-slate-400 font-bold uppercase tracking-widest text-sm animate-pulse">Menyiapkan Soal...</span>
                            </div>
                        ) : (
                            // Use AnimatePresence to slide old question out and new question in
                            <div className="relative flex-1">
                                <AnimatePresence mode="popLayout">
                                    <motion.div
                                        key={questionKey}
                                        initial={{ opacity: 0, x: 100, scale: 0.95 }}
                                        animate={{ opacity: 1, x: 0, scale: 1, ...(shake && { x: [-10, 10, -10, 10, 0] }) }} // Shake effect if wrong
                                        exit={{ opacity: 0, x: -100, scale: 0.9 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: [0.22, 1, 0.36, 1],
                                            x: { duration: shake ? 0.4 : 0.4 } // faster duration for shake
                                        }}
                                        className="w-full"
                                    >
                                        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 mb-6 text-center">
                                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-widest mb-6">
                                                <LayoutGrid className="w-3 h-3" />
                                                {question.type === "sambung" && "Sambung Ayat"}
                                                {question.type === "surah" && "Tebak Nama Surah"}
                                                {question.type === "juz" && "Tebak Letak Juz"}
                                            </span>

                                            <h2 className="text-3xl md:text-5xl font-amiri leading-[1.8] text-slate-900 px-4">
                                                {question.prompt}
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3">
                                            {question.options.map((opt, idx) => {
                                                // Dynamic Styling Logic based on answer state
                                                let btnClass = "bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50";
                                                let iconContent = question.type !== "sambung" ? ["A", "B", "C", "D"][idx] : null;
                                                let iconClass = "bg-slate-100 text-slate-500";

                                                if (isChecking) {
                                                    if (selectedIdx === idx) {
                                                        if (opt.isCorrect) {
                                                            btnClass = "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-[1.02] z-10";
                                                            iconClass = "bg-white text-emerald-600";
                                                        } else {
                                                            btnClass = "bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30 scale-[0.98] opacity-80 z-10";
                                                            iconClass = "bg-white text-red-600";
                                                        }
                                                    } else if (opt.isCorrect) {
                                                        // Always reveal correct answer silently
                                                        btnClass = "bg-emerald-100 border-emerald-400 text-emerald-800 scale-[1.01]";
                                                        iconClass = "bg-emerald-200 text-emerald-800";
                                                    } else {
                                                        // Dim other incorrect distractors
                                                        btnClass = "bg-slate-50 border-slate-100 text-slate-300 opacity-50";
                                                        iconClass = "bg-slate-100 text-slate-300";
                                                    }
                                                }

                                                return (
                                                    <motion.button
                                                        key={idx}
                                                        layout
                                                        disabled={isChecking}
                                                        onClick={() => handleOptionClick(idx, opt.isCorrect)}
                                                        className={`p-5 w-full text-left rounded-2xl border-2 transition-all duration-300 ${btnClass}`}
                                                    >
                                                        <div className={`flex items-center w-full ${question.type === "sambung" ? "justify-end" : "justify-between"}`}>
                                                            {/* Alpha Icon for MCQs */}
                                                            {question.type !== "sambung" && (
                                                                <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-colors ${iconClass}`}>
                                                                    {iconContent}
                                                                </span>
                                                            )}

                                                            {/* Option Text */}
                                                            <span className={`font-medium ${question.type === "sambung" ? "font-amiri text-2xl md:text-3xl text-right leading-[1.6]" : "text-lg md:text-xl pr-4"}`}>
                                                                {opt.label}
                                                            </span>
                                                        </div>
                                                    </motion.button>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        )}
                    </div>
                )}

                {status === "game_over" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 relative overflow-hidden"
                    >
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-rose-50 text-rose-500 mb-8 shadow-inner">
                                <Hand className="w-12 h-12" />
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight mb-2 text-slate-900">Game Over</h1>
                            <p className="text-lg text-slate-500 font-medium mb-8">
                                Hafalanmu terhenti di langkah ini. Istirahat sejenak dan coba lagi.
                            </p>

                            <div className="bg-slate-50 rounded-3xl p-8 mb-10 border border-slate-100">
                                <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-2">Skor Akhir</p>
                                <p className="text-7xl font-black font-serif text-slate-900">{score}</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={handleStart}
                                    className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all flex justify-center items-center gap-2 shadow-xl shadow-black/20"
                                >
                                    <RefreshCcw className="w-5 h-5" /> Main Lagi
                                </button>
                                <button
                                    onClick={() => setStatus("menu")}
                                    className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                                >
                                    Kembali ke Menu
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </section>
        </main>
    );
}
