"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

interface HijriData {
    day: string;
    month: {
        en: string;
        ar: string;
    };
    year: string;
    designation: {
        abbreviated: string;
    };
}

export default function HijriWidget() {
    const [hijriDate, setHijriDate] = useState<HijriData | null>(null);
    const [gregorian, setGregorian] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDate = async () => {
            try {
                // Get today's date formatted for API (DD-MM-YYYY)
                const today = new Date();
                const dd = String(today.getDate()).padStart(2, '0');
                const mm = String(today.getMonth() + 1).padStart(2, '0');
                const yyyy = today.getFullYear();

                // Format Gregorian display
                const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                setGregorian(today.toLocaleDateString('id-ID', options));

                const res = await fetch(`https://api.aladhan.com/v1/gToH/${dd}-${mm}-${yyyy}`);
                const data = await res.json();

                if (data && data.data && data.data.hijri) {
                    setHijriDate(data.data.hijri);
                }
            } catch (err) {
                console.error("Failed to fetch Hijri date:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDate();
    }, []);

    // Determine Theme based on time (Day vs Night aesthetic)
    const isNight = new Date().getHours() >= 18 || new Date().getHours() < 5;

    return (
        <section className="px-4 lg:px-8 max-w-7xl mx-auto mb-8 relative z-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={`rounded-[2rem] p-6 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative group border ${isNight ? 'bg-slate-900 border-white/10' : 'bg-gradient-to-br from-indigo-500 to-sky-500 border-indigo-400'}`}
            >
                {/* Background Decor */}
                <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${isNight ? 'bg-indigo-500/20 mix-blend-screen' : 'bg-white/20'}`} />
                <div className={`absolute -bottom-10 left-10 w-32 h-32 rounded-full blur-2xl pointer-events-none ${isNight ? 'bg-amber-500/10' : 'bg-white/20'}`} />

                <div className="flex items-center gap-6 z-10 w-full md:w-auto">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${isNight ? 'bg-slate-800 text-amber-400' : 'bg-white/20 backdrop-blur-md text-white'}`}>
                        {isNight ? <Moon className="w-8 h-8 fill-current" /> : <Sun className="w-8 h-8 fill-current" />}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border ${isNight ? 'bg-white/10 text-white/80 border-white/5' : 'bg-black/10 text-white border-black/5'}`}>
                                Kalender Hijriah
                            </span>
                        </div>
                        {loading ? (
                            <div className="h-8 w-48 bg-white/20 animate-pulse rounded my-1" />
                        ) : (
                            <h3 className="text-2xl md:text-3xl font-bold font-serif mb-1 group-hover:drop-shadow-lg transition-all">
                                {hijriDate ? `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year} ${hijriDate.designation.abbreviated}` : 'Data tidak tersedia'}
                            </h3>
                        )}
                        <p className={`text-sm ${isNight ? 'text-slate-400' : 'text-white/80'}`}>
                            {gregorian || 'Memuat...'}
                        </p>
                    </div>
                </div>

                {hijriDate && (
                    <div className="flex items-center justify-end z-10 hidden md:flex">
                        <span className={`text-5xl font-amiri font-bold opacity-80 ${isNight ? 'text-white' : 'text-indigo-900'} drop-shadow-sm`}>
                            {hijriDate.month.ar}
                        </span>
                    </div>
                )}
            </motion.div>
        </section>
    );
}
