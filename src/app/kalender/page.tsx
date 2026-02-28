"use client";

import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Moon, Star, CalendarDays, History } from "lucide-react";
import { useState, useEffect } from "react";

// Static mapping of major Islamic Events for a general display
const islamicEvents = [
    { title: "Isra Mi'raj", date: "27 Rajab", desc: "Perjalanan malam Nabi Muhammad SAW" },
    { title: "Nisfu Syaban", date: "15 Syaban", desc: "Malam pengampunan dosa" },
    { title: "Awal Ramadhan", date: "1 Ramadhan", desc: "Hari pertama ibadah puasa" },
    { title: "Nuzulul Quran", date: "17 Ramadhan", desc: "Peringatan turunnya Al-Quran" },
    { title: "Idul Fitri", date: "1 Syawal", desc: "Hari Kemenangan" },
    { title: "Puasa Sunnah Arafah", date: "9 Zulhijjah", desc: "Puasa sunnah sebelum Idul Adha" },
    { title: "Idul Adha", date: "10 Zulhijjah", desc: "Hari Raya Kurban" },
    { title: "Tahun Baru Islam", date: "1 Muharram", desc: "Peringatan hijrahnya Nabi Muhammad SAW" },
    { title: "Maulid Nabi", date: "12 Rabiul Awal", desc: "Hari kelahiran Nabi Muhammad SAW" },
];

export default function KalenderPage() {
    const { t, lang } = useLanguage();
    const [hijriDate, setHijriDate] = useState<string>("");
    const [masehiDate, setMasehiDate] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<string>("");

    useEffect(() => {
        // Safe client side date execution
        const updateDates = () => {
            const now = new Date();

            // Format Masehi (Gregorian)
            const masehi = new Intl.DateTimeFormat(lang === 'ID' ? 'id-ID' : 'en-US', {
                weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
            }).format(now);
            setMasehiDate(masehi);

            // Format Hijri (Islamic)
            const hijri = new Intl.DateTimeFormat('id-ID-u-ca-islamic', {
                day: 'numeric', month: 'long', year: 'numeric'
            }).format(now);
            setHijriDate(hijri);

            // Time
            const timeStr = now.toLocaleTimeString(lang === 'ID' ? 'id-ID' : 'en-US', {
                hour: '2-digit', minute: '2-digit'
            });
            setCurrentTime(timeStr);
        };

        updateDates();
        const interval = setInterval(updateDates, 60000); // update every minute clock
        return () => clearInterval(interval);
    }, [lang]);

    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-6xl mx-auto min-h-screen">
                <div className="text-center mb-16 relative">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-50 to-emerald-50 text-emerald-600 mb-8 border border-white shadow-xl shadow-emerald-900/5 hover:scale-105 transition-transform duration-300">
                        <Calendar className="w-12 h-12" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight mb-6 text-black drop-shadow-sm">Kalender Hijriah</h1>
                    <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
                        Hari ini dan daftar hari besar Islam sesuai penanggalan Hijriah.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Today Widget */}
                    <div className="lg:col-span-1 bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-emerald-900/10 border border-black/5 flex flex-col justify-center items-center text-center relative overflow-hidden group isolate">
                        <Moon className="absolute -bottom-10 -right-10 w-64 h-64 text-emerald-50 opacity-50 group-hover:scale-110 transition-transform duration-700 pointer-events-none z-0" />

                        <div className="relative z-10">
                            <h2 className="text-lg font-bold text-emerald-600 tracking-wider uppercase mb-2">HARI INI</h2>
                            <p className="text-5xl font-black text-black mb-4 font-serif leading-tight">{currentTime || "00:00"}</p>

                            <div className="w-16 h-1 bg-emerald-100 mx-auto my-6 rounded-full" />

                            <p className="text-3xl font-serif font-bold text-black mb-3">{hijriDate || "Memuat..."}</p>
                            <p className="text-lg text-black/60 font-medium">✨ {masehiDate || "Memuat..."}</p>
                        </div>
                    </div>

                    {/* Events List */}
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-black/5">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <History className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-bold font-serif">Hari Besar Islam</h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {islamicEvents.map((event, idx) => (
                                <div key={idx} className="p-5 rounded-3xl border border-black/5 hover:border-black/10 hover:shadow-md transition-all duration-300 bg-[#FAFAFA] hover:bg-white group cursor-default flex flex-col">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-black group-hover:text-indigo-600 transition-colors">{event.title}</h3>
                                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                                            {event.date}
                                        </span>
                                    </div>
                                    <p className="text-sm text-black/60 mt-auto">{event.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
