"use client";

import { motion } from "framer-motion";
import { Check, X, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface Tip {
    id: string;
    type: string;
    title: string;
    titleEn?: string;
    desc: string;
    descEn?: string;
}

export default function DailyTips({ initialTips }: { initialTips: Tip[] }) {
    const { t, lang } = useLanguage();

    return (
        <section className="py-24 px-4 relative overflow-hidden bg-slate-50" id="tips">
            {/* Elegant Background Blobs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-16 md:mb-24">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-black/5 bg-white shadow-sm mb-6"
                    >
                        <Quote className="w-4 h-4 text-indigo-500" />
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-600">Inspirasi Harian</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4 text-slate-900"
                    >
                        {t.dashboardTipsTitle}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 max-w-xl mx-auto text-lg"
                    >
                        {t.dashboardTipsDesc}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {initialTips.map((tip, idx) => {
                        const showTitle = lang === "EN" && tip.titleEn ? tip.titleEn : tip.title;
                        const showDesc = lang === "EN" && tip.descEn ? tip.descEn : tip.desc;
                        const isGood = tip.type === "pahala";

                        return (
                            <motion.div
                                key={tip.id || idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: idx * 0.15, duration: 0.6, type: "spring" }}
                                className="group relative"
                            >
                                {/* Glassmorphism Card */}
                                <div className={`h-full p-8 md:p-10 rounded-[2rem] border transition-all duration-500 relative overflow-hidden backdrop-blur-xl ${isGood
                                        ? "bg-white/80 border-emerald-100 hover:border-emerald-300 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] hover:-translate-y-2"
                                        : "bg-white/80 border-rose-100 hover:border-rose-300 hover:shadow-[0_20px_40px_-15px_rgba(244,63,94,0.15)] hover:-translate-y-2"
                                    }`}>

                                    {/* Giant Faded Icon Background */}
                                    <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                                        {isGood ? (
                                            <Check className="w-48 h-48 text-emerald-900" strokeWidth={1} />
                                        ) : (
                                            <X className="w-48 h-48 text-rose-900" strokeWidth={1} />
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="mb-8 flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${isGood ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"
                                                }`}>
                                                {isGood ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                                            </div>
                                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${isGood ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                                                }`}>
                                                {tip.type}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-serif font-bold mb-4 text-slate-900 leading-tight">
                                            {showTitle}
                                        </h3>

                                        <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium flex-1">
                                            {showDesc}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
