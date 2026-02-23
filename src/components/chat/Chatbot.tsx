"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";
import { surahNamesList } from "@/lib/surahNames";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string }[]>([
        { role: "ai", content: "Assalamu'alaikum! Saya DARIL AI. Ada yang bisa dibantu untuk perjalanan spiritualmu hari ini?" }
    ]);
    const [input, setInput] = useState("");

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: "user", content: userMsg }]);
        setInput("");

        // Smart Intent Regex NLP Engine
        setTimeout(() => {
            const lower = userMsg.toLowerCase().replace(/surat/g, "surah");

            // 1. Detect Juz Request
            const juzMatch = lower.match(/juz\s*(\d+)/);
            if (juzMatch && parseInt(juzMatch[1]) >= 1 && parseInt(juzMatch[1]) <= 30) {
                const juzStr = juzMatch[1];
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: `Tentu! Mari membaca Al-Quran Juz ${juzStr}. Silakan klik link berikut: <a href='/quran/juz/${juzStr}' class='text-indigo-600 underline font-bold'>Buka Juz ${juzStr}</a>`
                }]);
                return;
            }

            // 2. Detect Surah Request
            if (lower.includes("baca surah") || lower.includes("surah")) {
                const surahIndex = surahNamesList.findIndex(s => {
                    const normalizedQuery = lower.replace(/[^a-z0-9\s]/g, "");
                    const normalizedSurah = s.replace(/[^a-z0-9\s]/g, "");
                    return normalizedQuery.includes(normalizedSurah);
                });

                if (surahIndex !== -1) {
                    const id = surahIndex + 1;
                    const name = surahNamesList[surahIndex];
                    const capName = name.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

                    setMessages(prev => [...prev, {
                        role: "ai",
                        content: `Subhanallah. Silakan klik link berikut untuk membaca Surah ${capName}: <a href='/quran/${id}' class='text-indigo-600 underline font-bold'>Buka Surah ${capName}</a>`
                    }]);
                    return;
                } else {
                    setMessages(prev => [...prev, {
                        role: "ai",
                        content: "Tentu! Mari membaca Al-Quran. Silakan klik link berikut untuk menuju ke daftar Surah: <a href='/quran' class='text-indigo-600 underline font-bold'>Buka Al-Quran</a>"
                    }]);
                    return;
                }
            }

            // 3. Educational & Path Routing
            if (lower.includes("sholat") || lower.includes("shalat")) {
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Mari jaga kewajiban kita. Anda bisa melihat jadwal Sholat hari ini di sini: <a href='/sholat' class='text-indigo-600 underline font-bold'>Jadwal Sholat</a>"
                }]);
            } else if (lower.includes("kiblat")) {
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Sedang mencari arah kiblat? Silakan gunakan kompas presisi kami: <a href='/kiblat' class='text-indigo-600 underline font-bold'>Buka Kompas Kiblat</a>"
                }]);
            } else if (lower.includes("kalender") || lower.includes("hijriah") || lower.includes("tanggal") || lower.includes("hari apa")) {
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Anda bisa melihat tanggal Hijriah terbaru beserta kalender puasa sunnah di sini: <a href='/kalender' class='text-indigo-600 underline font-bold'>Buka Kalender</a>"
                }]);
            } else if (lower.includes("tata cara") || lower.includes("panduan") || lower.includes("niat") || lower.includes("bacaan")) {
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Daril memiliki panduan Fiqih lengkap (Tata Cara Sholat, Wudhu, Jenazah, dll). Anda bisa menemukannya di sini: <a href='/tata-cara' class='text-indigo-600 underline font-bold'>Buka Panduan/Tata Cara</a>"
                }]);
            } else if (lower.includes("doa") || lower.includes("asmaul husna")) {
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Mari mendekatkan diri kepada Allah. Anda bisa membuka <a href='/asmaul-husna' class='text-indigo-600 underline font-bold'>Asmaul Husna</a> atau mencari doa harian di <a href='/news' class='text-indigo-600 underline font-bold'>Artikel Edukasi</a>."
                }]);
            } else if (lower.includes("game") || lower.includes("kuis") || lower.includes("main") || lower.includes("challenge") || lower.includes("hafalan")) {
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Wah, tertarik menguji hafalanmu? Coba kuis pilihan ganda tak terbatas (Infinite Challenge) kami! Dapatkan skor setinggi mungkin: <a href='/games' class='text-indigo-600 underline font-bold'>Main Quran Challenge</a>"
                }]);
            } else if (lower.includes("dosa") || lower.includes("pahala") || lower.includes("hukum") || lower.includes("haram") || lower.includes("halal") || lower.includes("sedih") || lower.includes("galau")) {
                setMessages(prev => [...prev, {
                    role: "ai",
                    content: "Sebagai Muslim, segala ujian dan kebingungan ada jawabannya di Al-Quran dan As-Sunnah. Allah selalu dekat dengan keraguan kita. Kamu bisa pelajari lebih lanjut seputar hikmah di <a href='/news' class='text-indigo-600 underline font-bold'>Artikel Edukasi</a>."
                }]);
            } else {
                const greetings = ["assalamualaikum", "halo", "hai", "ping", "p"];
                const isGreeting = greetings.some(g => lower.includes(g));
                if (isGreeting) {
                    setMessages(prev => [...prev, {
                        role: "ai",
                        content: "Wa'alaikumsalam warahmatullahi wabarakatuh. Ada yang bisa DARIL bantu hari ini? Ketikkan apa kebutuhanmu (misal: 'Jadwal Sholat', 'Tata Cara Mandi Wajib', atau 'Baca Surah Yasin')."
                    }]);
                } else {
                    setMessages(prev => [...prev, {
                        role: "ai",
                        content: "Masya Allah. Saya siap membantu keseharian Islami mu. Mari kita jelajahi ilmu bersama di <a href='/' class='text-indigo-600 underline font-bold'>Beranda Utama</a> atau pelajari <a href='/tata-cara' class='text-indigo-600 underline font-bold'>Panduan Ibadah</a>."
                    }]);
                }
            }
        }, 800);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform z-50 focus:outline-none"
            >
                <MessageSquare className="w-6 h-6" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 w-[350px] bg-white border border-black/10 shadow-2xl rounded-2xl z-50 flex flex-col overflow-hidden"
                    >
                        <div className="bg-black text-white p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-serif font-bold tracking-wide">DARIL AI</h3>
                                <p className="text-xs text-white/70">Islamic Assistant (Beta)</p>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-md transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 h-[380px] overflow-y-auto flex flex-col gap-4 bg-[#FAFAFA]">
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                                    <div
                                        className={`p-3.5 max-w-[85%] rounded-2xl text-sm leading-relaxed ${m.role === "user" ? "bg-black text-white rounded-br-none" : "bg-white border border-black/5 text-black rounded-bl-none shadow-sm [&_a]:underline [&_a]:text-indigo-600 [&_a]:font-bold"
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: m.content }}
                                    />
                                </div>
                            ))}
                        </div>

                        <form onSubmit={handleSend} className="p-3 border-t border-black/5 bg-white flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                placeholder="Tanyakan seputar Al-Quran, Fiqih, dll..."
                                className="flex-1 px-4 py-2 text-sm bg-black/5 rounded-xl outline-none focus:ring-1 focus:ring-black transition-all"
                            />
                            <button type="submit" className="bg-black text-white p-2 px-3 rounded-xl hover:bg-black/80 transition-colors flex items-center justify-center">
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
