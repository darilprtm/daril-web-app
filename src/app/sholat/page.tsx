"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { MapPin, Clock, MoonStar, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function SholatPage() {
    const { t } = useLanguage();
    const [times, setTimes] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [errorMSG, setErrorMSG] = useState("");
    const [locationName, setLocationName] = useState(t.loading);

    useEffect(() => {
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
                        setTimes(data.data.timings);
                        setLocationName(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`); // Fallback if reverse geocoding is skipped for MVP
                    } catch (err) {
                        setErrorMSG(t.error);
                    } finally {
                        setLoading(false);
                    }
                },
                (error) => {
                    setErrorMSG("Izin lokasi ditolak. Aktifkan GPS untuk melihat jadwal akurat.");
                    setLoading(false);
                }
            );
        } else {
            setErrorMSG(t.error);
            setLoading(false);
        }
    }, [t]);

    const prayerList = times ? [
        { name: "Imsak", time: times.Imsak, icon: <Sun className="w-5 h-5" /> },
        { name: "Subuh", time: times.Fajr, icon: <Sun className="w-5 h-5 text-black/60" /> },
        { name: "Dzuhur", time: times.Dhuhr, icon: <Sun className="w-5 h-5 text-black" /> },
        { name: "Ashar", time: times.Asr, icon: <Sun className="w-5 h-5 text-black/80" /> },
        { name: "Maghrib", time: times.Maghrib, icon: <MoonStar className="w-5 h-5 text-black" /> },
        { name: "Isya", time: times.Isha, icon: <MoonStar className="w-5 h-5 text-black/80" /> },
    ] : [];

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto min-h-screen relative overflow-hidden">

                {/* Subtle Elegant Mosque Graphic Background */}
                <div className="absolute bottom-0 left-0 right-0 h-64 opacity-5 pointer-events-none z-0 flex justify-center items-end">
                    <svg viewBox="0 0 100 50" className="w-full max-w-3xl h-full fill-black">
                        {/* Dome Center */}
                        <path d="M50 10 Q40 30 40 50 L60 50 Q60 30 50 10" />
                        <rect x="48" y="5" width="4" height="15" />
                        <circle cx="50" cy="5" r="2" />
                        {/* Minarets */}
                        <rect x="25" y="20" width="4" height="30" />
                        <polygon points="27,10 23,20 31,20" />
                        <rect x="71" y="20" width="4" height="30" />
                        <polygon points="73,10 69,20 77,20" />
                    </svg>
                </div>

                <div className="text-center mb-16 relative z-10">
                    <Clock className="w-12 h-12 mx-auto mb-6 text-black" />
                    <h1 className="text-5xl font-serif font-black tracking-tight mb-4">{t.sholatTitle}</h1>
                    <p className="text-black/60 mb-6 font-medium">{t.sholatDesc}</p>
                    <div className="flex items-center justify-center gap-2 text-black/60 font-medium">
                        <MapPin className="w-4 h-4" />
                        <span>{t.sholatLocation}: {locationName}</span>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center z-10 relative">
                        <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
                    </div>
                ) : errorMSG ? (
                    <div className="bg-black/5 border border-black/10 p-6 rounded-2xl text-center max-w-md mx-auto z-10 relative">
                        <p className="text-black/80">{errorMSG}</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8 z-10 relative px-4 sm:px-0">
                        {prayerList.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center justify-center p-8 bg-white border border-black/10 hover:border-black rounded-2xl transition-all hover:shadow-[8px_8px_0_0_#000] cursor-default"
                            >
                                <div className="mb-4 text-black/40">
                                    {p.icon}
                                </div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-black/50 mb-2">{p.name}</h3>
                                <p className="text-3xl font-serif font-black">{p.time}</p>
                            </motion.div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
