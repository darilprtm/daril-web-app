"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Tip {
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
        <section className="py-24 px-4 border-t border-black/5" id="tips">
            <div className="max-w-7xl mx-auto">

                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif font-bold tracking-tight mb-4">{t.dashboardTipsTitle}</h2>
                    <p className="text-black/60 max-w-xl mx-auto">
                        {t.dashboardTipsDesc}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {initialTips.map((tip, idx) => {
                        const showTitle = lang === "EN" && tip.titleEn ? tip.titleEn : tip.title;
                        const showDesc = lang === "EN" && tip.descEn ? tip.descEn : tip.desc;

                        return (
                            <motion.div
                                key={tip.id || idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group p-8 border border-black/10 hover:border-black transition-colors rounded-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    {tip.type === "pahala" ? (
                                        <Check className="w-24 h-24 text-black" strokeWidth={1} />
                                    ) : (
                                        <X className="w-24 h-24 text-black" strokeWidth={1} />
                                    )}
                                </div>

                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div>
                                        <span className={`inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full mb-6 ${tip.type === "pahala"
                                            ? "bg-black text-white"
                                            : "bg-black/5 text-black"
                                            }`}>
                                            {tip.type.toUpperCase()}
                                        </span>

                                        <h3 className="text-2xl font-serif font-bold mb-3">{showTitle}</h3>
                                        <p className="text-black/70 leading-relaxed font-light">
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
