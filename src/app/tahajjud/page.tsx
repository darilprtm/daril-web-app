"use client";

import { useState, useEffect } from "react";
import { Moon, ArrowLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function TahajjudMode() {
    const { lang } = useLanguage();
    const [wakeLock, setWakeLock] = useState<any>(null);
    const [time, setTime] = useState<string>("00:00:00");
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        let lock: any = null;

        // Request WakeLock
        const requestWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    lock = await (navigator as any).wakeLock.request('screen');
                    setWakeLock(lock);
                } else {
                    setIsSupported(false);
                }
            } catch (err) {
                console.error("WakeLock Error:", err);
            }
        };

        requestWakeLock();

        // Timer
        const interval = setInterval(() => {
            const now = new Date();
            // Use en-GB to enforce 24-hour HH:MM:SS format
            setTime(now.toLocaleTimeString("en-GB"));
        }, 1000);

        // Handle visibility change (reclaim lock if switching tabs)
        const handleVisibilityChange = async () => {
            if (lock !== null && document.visibilityState === 'visible') {
                requestWakeLock();
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            clearInterval(interval);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            if (lock) {
                lock.release().catch(console.error);
            }
        };
    }, []);

    return (
        <main className="min-h-screen bg-black text-white font-sans flex flex-col justify-between p-6 md:p-12 selection:bg-white/20">
            {/* Top Navigation */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto transition-opacity hover:opacity-100 opacity-60">
                <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase">
                    <ArrowLeft className="w-4 h-4" /> Keluar
                </Link>
                <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-emerald-500 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                    <Moon className="w-3 h-3" /> Focus Mode
                </div>
            </div>

            {/* Center Content */}
            <div className="flex flex-col items-center justify-center flex-1 text-center max-w-4xl mx-auto w-full py-12">
                <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-[1px] border-white/10 flex items-center justify-center mb-12 relative group">
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-full flex items-center justify-center absolute transition-all duration-1000">
                        <Moon className="w-10 h-10 md:w-16 md:h-16 text-white/30" />
                    </div>
                    {/* Ripple rings */}
                    <div className="w-full h-full rounded-full border border-white/5 absolute animate-[ping_3s_ease-out_infinite] duration-1000"></div>
                </div>

                <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter tabular-nums mb-6 font-serif opacity-90">
                    {time}
                </h1>

                <p className="text-lg md:text-2xl text-white/40 font-light max-w-2xl px-4 leading-relaxed">
                    {lang === 'ID'
                        ? "Layar Anda tidak akan mati selama mode ini aktif. Fokuslah pada malam Anda."
                        : "Your screen will not sleep while this mode is active. Focus on your night prayer."}
                </p>

                {!isSupported && (
                    <div className="mt-8 flex items-center gap-2 text-rose-500/80 text-sm font-medium bg-rose-500/10 px-4 py-2 rounded-lg border border-rose-500/20">
                        <ShieldAlert className="w-4 h-4" /> Browser Anda tidak mendukung fitur Anti-Mati (WakeLock API) otomatis.
                    </div>
                )}
            </div>

            {/* Bottom Info */}
            <div className="text-center w-full max-w-7xl mx-auto opacity-30">
                <p className="text-xs font-bold tracking-[0.3em] uppercase">Redupkan kecerahan layar Anda untuk kenyamanan</p>
            </div>
        </main>
    );
}
