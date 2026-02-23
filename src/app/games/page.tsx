"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import confetti from "canvas-confetti";
import { Heart, Trophy, RefreshCcw, Hand, Play, ArrowRight, LayoutGrid } from "lucide-react";
import { surahNamesList } from "@/lib/surahNames";

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

export default function InfiniteQuiz() {
    const [status, setStatus] = useState<"menu" | "playing" | "game_over">("menu");
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
    const [isChecking, setIsChecking] = useState(false);

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
                // Failsafe fallback if page is too sparse
                fetchQuestion();
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

                // Construct distractors from same page
                const distractors = ayahs
                    .filter((_: any, i: number) => i !== baseIdx && i !== baseIdx + 1)
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3)
                    .map((a: any) => ({ label: a.text, isCorrect: false }));

                options = [...options, ...distractors];
            } else if (type === "surah") {
                const correctSurah = promptAyah.surah.englishName;
                options.push({ label: `Surah ${correctSurah}`, isCorrect: true });

                // Distractors from surah list
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

            // Shuffle Options
            options = options.sort(() => 0.5 - Math.random());

            setQuestion({
                type,
                prompt: promptAyah.text,
                options
            });
        } catch (error) {
            console.error("Fetch Err", error);
            // Retry softly if network fail
            setTimeout(() => fetchQuestion(), 1500);
        } finally {
            setLoading(false);
            setIsChecking(false);
            setSelectedIdx(null);
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

        setTimeout(() => {
            if (isCorrect) {
                const newScore = score + 10;
                setScore(newScore);

                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem("daril_highscore", newScore.toString());
                }

                if (newScore % 50 === 0) {
                    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                }

                fetchQuestion();
            } else {
                const newLives = lives - 1;
                setLives(newLives);

                if (newLives <= 0) {
                    setStatus("game_over");
                } else {
                    fetchQuestion();
                }
            }
        }, 1500);
    };

    return (
        <main className="min-h-screen bg-white text-black font-sans">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-2xl mx-auto min-h-screen flex flex-col justify-center">
                {status === "menu" && (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-indigo-50 text-indigo-600 mb-8 border-[6px] border-white shadow-xl">
                            <Trophy className="w-10 h-10" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight mb-4">Quran Challenge</h1>
                        <p className="text-xl text-black/60 font-light mb-12">
                            Uji hafalanmu. Infinity mode. 5 Nyawa. Seberapa jauh kamu bisa bertahan?
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleStart}
                                className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/80 hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <Play className="w-4 h-4 fill-white" /> Mulai Main
                            </button>
                        </div>

                        {highScore > 0 && (
                            <p className="mt-8 font-serif font-bold text-black/40">HIGH SCORE: {highScore}</p>
                        )}
                    </div>
                )}

                {status === "playing" && (
                    <div className="w-full">
                        <div className="flex justify-between items-center mb-8 border-b border-black/10 pb-4">
                            <div className="flex gap-1.5">
                                {[...Array(5)].map((_, i) => (
                                    <Heart key={i} className={`w-6 h-6 ${i < lives ? "fill-red-500 text-red-500" : "fill-white text-black/20"} transition-colors`} />
                                ))}
                            </div>
                            <div className="text-right">
                                <span className="text-sm font-bold tracking-widest text-black/40 uppercase block">Score</span>
                                <span className="font-serif font-black text-3xl">{score}</span>
                            </div>
                        </div>

                        {loading || !question ? (
                            <div className="py-24 text-center">
                                <div className="w-10 h-10 border-4 border-black border-t-transparent border-b-transparent rounded-full animate-spin mx-auto opacity-20"></div>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="text-center mb-10">
                                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-bold uppercase tracking-widest mb-6 border border-black/10">
                                        <LayoutGrid className="w-3 h-3" />
                                        {question.type === "sambung" && "Sambung Ayat"}
                                        {question.type === "surah" && "Tebak Surah"}
                                        {question.type === "juz" && "Tebak Juz"}
                                    </span>

                                    <h2 className="text-4xl md:text-5xl font-amiri leading-[1.8] text-black">
                                        {question.prompt}
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 gap-3">
                                    {question.options.map((opt, idx) => {
                                        let btnClass = "bg-white border-black/10 text-black hover:border-black/30 hover:bg-black/5";

                                        if (isChecking) {
                                            if (selectedIdx === idx) {
                                                btnClass = opt.isCorrect
                                                    ? "bg-emerald-50 border-emerald-500 text-emerald-700"
                                                    : "bg-red-50 border-red-500 text-red-700";
                                            } else if (opt.isCorrect) {
                                                // Always reveal correct answer
                                                btnClass = "bg-emerald-50 border-emerald-500 text-emerald-700 opacity-60";
                                            } else {
                                                btnClass = "opacity-40 border-black/5";
                                            }
                                        }

                                        return (
                                            <button
                                                key={idx}
                                                disabled={isChecking}
                                                onClick={() => handleOptionClick(idx, opt.isCorrect)}
                                                className={`p-5 w-full text-left rounded-2xl border-2 transition-all font-medium flex justify-between items-center ${btnClass} ${question.type === "sambung" ? "font-amiri text-2xl text-right leading-[1.6] justify-end" : "text-lg"}`}
                                            >
                                                {question.type !== "sambung" && (
                                                    <span className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center font-bold text-sm">
                                                        {["A", "B", "C", "D"][idx]}
                                                    </span>
                                                )}
                                                <span className={question.type === "sambung" ? "w-full text-right" : ""}>
                                                    {opt.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {status === "game_over" && (
                    <div className="text-center animate-in zoom-in duration-500">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-50 text-red-500 mb-8 border-[6px] border-white shadow-xl">
                            <Hand className="w-10 h-10" />
                        </div>
                        <h1 className="text-5xl font-serif font-black tracking-tight mb-2">Game Over!</h1>
                        <p className="text-xl text-black/60 font-light mb-8">
                            Hafalanmu terhenti di skor:
                        </p>
                        <p className="text-7xl font-black font-serif mb-12">{score}</p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={handleStart}
                                className="bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/80 hover:scale-105 transition-all flex items-center gap-2"
                            >
                                <RefreshCcw className="w-4 h-4" /> Main Lagi
                            </button>
                            <button
                                onClick={() => setStatus("menu")}
                                className="bg-white border border-black/20 text-black px-6 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-black/5 transition-colors"
                            >
                                Menu
                            </button>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
