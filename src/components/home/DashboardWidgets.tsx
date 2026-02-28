"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Navigation, Bookmark, ArrowRight, BookOpen } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { surahTranslations } from "@/lib/surahNames";

export default function DashboardWidgets() {
    const { t } = useLanguage();

    // Prayer & Time State
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [nextPrayer, setNextPrayer] = useState<{ name: string, time: string, timestamp: number } | null>(null);
    const [prayerLoading, setPrayerLoading] = useState(true);
    const [countdown, setCountdown] = useState<string>("");
    const [locationName, setLocationName] = useState<string>("");

    // Bookmark State
    const [lastSurahBookmark, setLastSurahBookmark] = useState<{ surah: string, ayah: string } | null>(null);
    const [lastJuzBookmark, setLastJuzBookmark] = useState<{ juz: string, surah: string, ayah: string } | null>(null);

    useEffect(() => {
        // 1. Fetch Location & Prayer locally for dashboard
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    try {
                        const date = new Date();
                        const timestamp = Math.floor(date.getTime() / 1000);
                        const res = await fetch(`https://api.aladhan.com/v1/timings/${timestamp}?latitude=${lat}&longitude=${lon}&method=2`);
                        const data = await res.json();
                        const timings = data.data.timings;

                        // Find the next prayer
                        const now = new Date();
                        let nextName = "Fajr";
                        let nextTime = timings.Fajr;
                        let nextDate = new Date();

                        // Prayers in order
                        const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
                        for (let p of prayers) {
                            const [h, m] = timings[p].split(':');
                            const pTime = new Date();
                            pTime.setHours(Number(h), Number(m), 0, 0);

                            if (pTime > now) {
                                nextName = p;
                                nextTime = timings[p];
                                nextDate = pTime;
                                break;
                            }
                        }

                        // If all prayers today passed, set to Fajr tomorrow
                        if (nextName === "Fajr" && nextTime === timings.Fajr && now.getHours() >= 12) {
                            const [h, m] = timings.Fajr.split(':');
                            nextDate.setDate(nextDate.getDate() + 1);
                            nextDate.setHours(Number(h), Number(m), 0, 0);
                        }

                        // Reverse Geocoding
                        try {
                            const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=id`);
                            const geoData = await geoRes.json();
                            setLocationName(geoData.city || geoData.locality || "");
                        } catch (e) {
                            console.error("Reverse geocoding failed", e);
                        }

                        setNextPrayer({ name: nextName, time: nextTime, timestamp: nextDate.getTime() });
                    } catch (err) {
                        console.error(err);
                    } finally {
                        setPrayerLoading(false);
                    }
                },
                () => {
                    setPrayerLoading(false); // Silent fail on dash if no GPS
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            setPrayerLoading(false);
        }

        // Live Clock Tick
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (nextPrayer && currentTime) {
            const diff = nextPrayer.timestamp - currentTime.getTime();
            if (diff > 0) {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((diff % (1000 * 60)) / 1000);

                let str = "- ";
                if (hours > 0) str += `${hours} jam `;
                if (mins > 0 || hours > 0) str += `${mins} menit `;
                str += `${secs} detik`;
                setCountdown(str);
            } else {
                setCountdown("Waktu Sholat!");
                // Optionally could trigger a refetch here
            }
        }
    }, [nextPrayer, currentTime]);

    useEffect(() => {
        // 2. Fetch Latest Surah Bookmark
        const savedSurah = localStorage.getItem("daril_bookmarks");
        if (savedSurah) {
            const parsed = JSON.parse(savedSurah);
            if (parsed.length > 0) {
                const last = parsed[parsed.length - 1];
                const [s, a] = last.split(":");
                setLastSurahBookmark({ surah: s, ayah: a });
            }
        }

        // 3. Fetch Latest Juz Bookmark
        const savedJuz = localStorage.getItem("daril_bookmarks_juz");
        if (savedJuz) {
            const parsed = JSON.parse(savedJuz);
            if (parsed.length > 0) {
                const last = parsed[parsed.length - 1]; // "Juz:Surah:Ayah"
                const parts = last.split(":");
                if (parts.length === 3) {
                    setLastJuzBookmark({ juz: parts[0], surah: parts[1], ayah: parts[2] });
                }
            }
        }
    }, []);

    // Helper to get translated Surah name safely
    const getSurahName = (numStr: string) => surahTranslations[Number(numStr)] || `Surah ${numStr}`;

    return (
        <section className="px-4 max-w-5xl mx-auto -mt-24 relative z-10 pb-12 space-y-6">

            {/* 1. Full-Width Standalone Live Prayer Widget */}
            <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-white p-6 sm:p-8 md:p-12 rounded-[2rem] relative overflow-hidden group shadow-2xl shadow-indigo-900/20 border border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 md:gap-12">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                    <Clock className="w-48 h-48 md:w-64 md:h-64 text-indigo-300" />
                </div>

                <div className="relative z-10 max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/5 shadow-inner backdrop-blur-sm">
                        <Navigation className="w-3 h-3 text-indigo-300" /> {locationName ? locationName : t.dashboardPrayerGps}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-indigo-50 leading-tight">{t.dashboardPrayerTitle}</h3>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed">{t.dashboardPrayerDesc}</p>
                </div>

                <div className="relative z-10 flex flex-col items-stretch lg:items-end gap-6 bg-white/5 p-6 md:p-8 rounded-3xl border border-white/10 backdrop-blur-md min-w-full lg:min-w-[320px]">
                    {prayerLoading ? (
                        <div className="animate-pulse w-32 h-12 bg-white/20 rounded-lg self-end" />
                    ) : nextPrayer ? (
                        <div className="text-left lg:text-right">
                            <p className="text-sm font-bold tracking-widest text-indigo-300 uppercase mb-2">Selanjutnya: {nextPrayer.name}</p>
                            <p className="text-5xl md:text-6xl font-serif font-black tracking-tight mb-2">{nextPrayer.time}</p>
                            {countdown && (
                                <p className="text-xs md:text-sm font-bold text-white/90 mt-2 bg-indigo-500/20 border border-indigo-500/30 px-4 py-2 rounded-full inline-block tracking-wide">
                                    {countdown}
                                </p>
                            )}
                        </div>
                    ) : (
                        <div className="text-sm text-white/50 border border-white/20 px-4 py-2 rounded-full self-end">
                            {t.dashboardPrayerNoGps}
                        </div>
                    )}
                    <Link href="/sholat" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-indigo-500 text-white font-medium hover:scale-105 hover:bg-indigo-400 shadow-lg shadow-indigo-500/50 transition-all w-full md:w-auto">
                        Lihat Jadwal <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>

            {/* Bookmarks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* 2A. Continue Reading Widget (Surah) */}
                <div className="bg-gradient-to-br from-emerald-50 via-teal-50/50 to-white p-6 sm:p-8 rounded-[2rem] border border-teal-100/50 relative overflow-hidden group shadow-xl shadow-teal-900/5 hover:border-teal-200 transition-colors">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <BookOpen className="w-40 h-40 text-teal-900" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 text-teal-900 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-teal-500/20">
                                <Bookmark className="w-3 h-3" /> {t.dashboardContinueSurahLabel}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-teal-950">Bacaan Surah</h3>
                            <p className="text-teal-900/70 leading-relaxed">{t.dashboardContinueDesc}</p>
                        </div>

                        <div className="flex items-end justify-between">
                            {lastSurahBookmark ? (
                                <div>
                                    <p className="text-sm font-bold tracking-widest text-teal-800/60 uppercase mb-2">{getSurahName(lastSurahBookmark.surah)}</p>
                                    <p className="text-4xl font-serif font-black text-teal-950 tracking-tight">{t.dashboardContinueAyah} {lastSurahBookmark.ayah}</p>
                                </div>
                            ) : (
                                <p className="text-teal-900/50 italic text-sm border-l-2 border-teal-200 pl-4 py-2">{t.dashboardContinueEmpty}</p>
                            )}

                            <Link href={lastSurahBookmark ? `/quran/${lastSurahBookmark.surah}#ayah-${lastSurahBookmark.surah}:${lastSurahBookmark.ayah}` : "/quran"} className="w-14 h-14 rounded-full bg-teal-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-teal-600/30 hover:bg-teal-500 flex-shrink-0">
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* 2B. Continue Reading Widget (Juz) */}
                <div className="bg-gradient-to-br from-amber-50 via-orange-50/50 to-white p-6 sm:p-8 rounded-[2rem] border border-amber-100/50 relative overflow-hidden group shadow-xl shadow-amber-900/5 hover:border-amber-200 transition-colors">
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Bookmark className="w-40 h-40 text-amber-900" />
                    </div>
                    <div className="relative z-10 flex flex-col h-full justify-between gap-10">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-900 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-amber-500/20">
                                <Bookmark className="w-3 h-3" /> {t.dashboardContinueJuzLabel}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-amber-950">Bacaan Juz</h3>
                            <p className="text-amber-900/70 leading-relaxed">Lanjutkan progres khataman Anda.</p>
                        </div>

                        <div className="flex items-end justify-between">
                            {lastJuzBookmark ? (
                                <div>
                                    <p className="text-sm font-bold tracking-widest text-amber-800/60 uppercase mb-2">Juz {lastJuzBookmark.juz} • {getSurahName(lastJuzBookmark.surah)}</p>
                                    <p className="text-4xl font-serif font-black text-amber-950 tracking-tight">{t.dashboardContinueAyah} {lastJuzBookmark.ayah}</p>
                                </div>
                            ) : (
                                <p className="text-amber-900/50 italic text-sm border-l-2 border-amber-200 pl-4 py-2">{t.dashboardContinueEmpty}</p>
                            )}

                            <Link href={lastJuzBookmark ? `/quran/juz/${lastJuzBookmark.juz}#ayah-${lastJuzBookmark.juz}:${lastJuzBookmark.surah}:${lastJuzBookmark.ayah}` : "/quran/juz"} className="w-14 h-14 rounded-full bg-amber-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-amber-600/30 hover:bg-amber-500 flex-shrink-0">
                                <ArrowRight className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
