"use client";

import Link from "next/link";
import { BookOpen, Navigation, ArrowRight, Target, Newspaper, HeartHandshake, Sparkles, Calendar, Compass, ListChecks, Activity, TrendingUp, Moon, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function FeatureShortcuts() {
    const { t, lang } = useLanguage();

    // Separate features based on priority for the Bento-Box layout
    const primaryFeatures = [
        {
            title: "Al-Quran",
            desc: "Platform baca interaktif dengan Murottal, Transliterasi, dan bookmark cerdas.",
            icon: BookOpen,
            href: "/quran",
            className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-emerald-800 to-emerald-950 text-white border-none",
            hoverClass: "hover:scale-[1.02] shadow-[0_20px_40px_rgba(4,120,87,0.2)]",
            iconClass: "text-emerald-300 bg-emerald-700/30",
            arrowClass: "text-emerald-200 group-hover:text-white"
        },
        {
            title: lang === 'ID' ? "Mutaba'ah Yaumiyah" : "Habit Tracker",
            desc: lang === 'ID' ? "Pantau & tingkatkan konsistensi ibadah harianmu." : "Monitor your daily worship progress.",
            icon: Activity,
            href: "/tracker",
            className: "md:col-span-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100",
            hoverClass: "hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10",
            iconClass: "text-blue-600 bg-blue-500/10",
            arrowClass: "text-blue-400 group-hover:text-blue-600"
        }
    ];

    const secondaryFeatures = [
        {
            title: t.navSholat,
            desc: "Jadwal real-time.",
            icon: Navigation,
            href: "/sholat",
            className: "bg-white border-black/5",
            hoverClass: "hover:-translate-y-1 hover:shadow-lg hover:border-black/10",
            iconClass: "text-indigo-500 bg-indigo-50",
            arrowClass: "text-black/30 group-hover:text-black"
        },
        {
            title: lang === 'ID' ? "Tata Cara" : "Fiqh Guides",
            desc: "Panduan ibadah rutin.",
            icon: ListChecks,
            href: "/tata-cara",
            className: "bg-white border-black/5",
            hoverClass: "hover:-translate-y-1 hover:shadow-lg hover:border-black/10",
            iconClass: "text-blue-500 bg-blue-50",
            arrowClass: "text-black/30 group-hover:text-black"
        },
        {
            title: lang === 'ID' ? "Tahajjud" : "Tahajjud Mode",
            desc: "Fokus malam anti-mati layar.",
            icon: Moon,
            href: "/tahajjud",
            className: "bg-black text-white border-none md:col-span-2",
            hoverClass: "hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/20",
            iconClass: "text-white bg-white/10",
            arrowClass: "text-white/50 group-hover:text-white"
        },
        {
            title: lang === 'ID' ? "Kalkulator Khatam" : "Khatam Planner",
            desc: "Target harian Al-Quran.",
            icon: TrendingUp,
            href: "/khatam",
            className: "bg-white border-black/5 md:col-span-2",
            hoverClass: "hover:-translate-y-1 hover:shadow-lg hover:border-black/10",
            iconClass: "text-teal-500 bg-teal-50",
            arrowClass: "text-black/30 group-hover:text-black"
        },
    ];

    const compactFeatures = [
        { title: t.navDoa, icon: HeartHandshake, href: "/doa", color: "text-rose-600", bg: "bg-rose-50" },
        { title: t.navAsmaulHusna || "Asmaul Husna", icon: Sparkles, href: "/asmaul-husna", color: "text-fuchsia-600", bg: "bg-fuchsia-50" },
        { title: t.navMisi, icon: Target, href: "/games", color: "text-amber-600", bg: "bg-amber-50" },
        { title: t.navKalender || "Kalender", icon: Calendar, href: "/kalender", color: "text-orange-600", bg: "bg-orange-50" },
        { title: t.navKiblat || "Kiblat", icon: Compass, href: "/kiblat", color: "text-sky-600", bg: "bg-sky-50" },
        { title: t.navNews, icon: Newspaper, href: "/news", color: "text-slate-600", bg: "bg-slate-50" },
    ];

    return (
        <section className="px-4 max-w-7xl mx-auto py-16 mb-12 border-t border-black/5">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
                <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs font-bold uppercase tracking-widest mb-4">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        Jelajahi Fitur Kunci
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-3">Ekosistem Daril.</h2>
                    <p className="text-black/50 text-lg max-w-xl">Semua alat yang Anda butuhkan untuk rutinitas Ibadah digital, didesain ulang untuk kenyamanan ekstra.</p>
                </div>
            </div>

            {/* Asymmetrical Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Primary Large Cards */}
                {primaryFeatures.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        className={`group relative rounded-[2rem] p-8 transition-all duration-500 overflow-hidden flex flex-col justify-between min-h-[220px] md:min-h-[240px] border ${item.className} ${item.hoverClass}`}
                    >
                        {i === 0 && (
                            <div className="absolute -right-12 -bottom-12 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                                <BookOpen className="w-64 h-64 text-white" />
                            </div>
                        )}
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm transition-colors ${item.iconClass}`}>
                            <item.icon className="w-7 h-7" />
                        </div>
                        <div className="relative z-10 mt-auto">
                            <h3 className={`text-2xl md:text-4xl font-black font-serif mb-2 leading-tight ${i === 0 ? "text-white" : "text-black"}`}>{item.title}</h3>
                            <p className={`text-sm md:text-base leading-relaxed max-w-sm ${i === 0 ? "text-emerald-100" : "text-black/60"}`}>{item.desc}</p>
                        </div>
                        <div className={`absolute top-8 right-8 ${item.arrowClass}`}>
                            <ArrowRight className="w-6 h-6 transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                        </div>
                    </Link>
                ))}

                {/* Secondary Cards */}
                {secondaryFeatures.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        className={`group relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between min-h-[200px] border ${item.className} ${item.hoverClass}`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors ${item.iconClass}`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-serif mb-1 leading-tight">{item.title}</h3>
                            <p className={`text-xs leading-relaxed ${item.className.includes("bg-black") ? "text-white/60" : "text-black/50"}`}>{item.desc}</p>
                        </div>
                        <div className={`absolute top-6 right-6 ${item.arrowClass}`}>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Links Row */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {compactFeatures.map((item, i) => (
                    <Link
                        key={i}
                        href={item.href}
                        className="group flex flex-col items-center text-center p-4 rounded-2xl bg-[#fafafa] border border-black/[0.03] hover:bg-white hover:border-black/10 hover:shadow-sm transition-all"
                    >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${item.bg}`}>
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                        </div>
                        <span className="text-xs font-bold text-black/70 group-hover:text-black">{item.title}</span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
