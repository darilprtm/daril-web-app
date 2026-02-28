"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Sparkles, Heart } from "lucide-react";

export default function Footer() {
    const { lang } = useLanguage();

    return (
        <footer className="bg-slate-900 border-t border-white/10 pt-20 pb-10 px-4 mt-auto relative overflow-hidden text-slate-300">
            {/* Ambient Glow */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

                {/* Brand Column */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-indigo-400" />
                        <h2 className="text-2xl font-sans font-black tracking-tight text-white">SASUKE.ID</h2>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        {lang === "ID"
                            ? "Platform Islami premium untuk menemani perjalanan spiritual dan ibadah harian Anda dengan nyaman dan khusyuk."
                            : "A premium Islamic platform to accompany your spiritual journey and daily worship comfortably and devoutly."}
                    </p>
                </div>

                {/* Features Column */}
                <div>
                    <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Fitur Utama</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/quran" className="hover:text-white hover:translate-x-1 transition-all inline-block">Al-Quran Digital</Link></li>
                        <li><Link href="/audio" className="hover:text-white hover:translate-x-1 transition-all inline-block">Murottal Audio</Link></li>
                        <li><Link href="/sholat" className="hover:text-white hover:translate-x-1 transition-all inline-block">Jadwal Sholat</Link></li>
                        <li><Link href="/kiblat" className="hover:text-white hover:translate-x-1 transition-all inline-block">Kompas Kiblat</Link></li>
                        <li><Link href="/tracker" className="hover:text-white hover:translate-x-1 transition-all inline-block">Mutaba&apos;ah (Tracker)</Link></li>
                    </ul>
                </div>

                {/* Education Column */}
                <div>
                    <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Edukasi & Hikmah</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/news" className="hover:text-white hover:translate-x-1 transition-all inline-block">Artikel Islami</Link></li>
                        <li><Link href="/stories" className="hover:text-white hover:translate-x-1 transition-all inline-block">Kisah Nabi & Sahabat</Link></li>
                        <li><Link href="/asmaul-husna" className="hover:text-white hover:translate-x-1 transition-all inline-block">Asmaul Husna</Link></li>
                        <li><Link href="/doa" className="hover:text-white hover:translate-x-1 transition-all inline-block">Kumpulan Doa</Link></li>
                        <li><Link href="/games" className="hover:text-white hover:translate-x-1 transition-all inline-block">Kuis Islami</Link></li>
                    </ul>
                </div>

                {/* Legal Column */}
                <div>
                    <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Informasi</h3>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-all inline-block">Tentang Kami</Link></li>
                        <li><Link href="/disclaimer" className="hover:text-white hover:translate-x-1 transition-all inline-block">Sangkalan (Disclaimer)</Link></li>
                        <li><Link href="/terms-conditions" className="hover:text-white hover:translate-x-1 transition-all inline-block">Syarat & Ketentuan</Link></li>
                        <li><Link href="/contact" className="hover:text-white hover:translate-x-1 transition-all inline-block">Hubungi Kami</Link></li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium text-slate-500 relative z-10">
                <p>&copy; {new Date().getFullYear()} Sasuke.id. Hak Cipta Dilindungi.</p>
                <p className="flex items-center gap-1">
                    Dibuat dengan <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> untuk umat.
                </p>
            </div>
        </footer>
    );
}
