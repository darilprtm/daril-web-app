"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useAccessibility } from "@/context/AccessibilityContext";
import { HeartHandshake } from "lucide-react";

interface DoaItem {
    id: string;
    category: string;
    title_id: string;
    title_en: string;
    arabic: string;
    latin: string;
    id_translation: string;
    en_translation: string;
    reference: string;
}

export default function DoaCard({ doa }: { doa: DoaItem }) {
    const { lang, t } = useLanguage();
    const { scale } = useAccessibility();

    const sizes = {
        small: { arabic: "text-2xl leading-[2.5]", latin: "text-sm", trans: "text-sm" },
        normal: { arabic: "text-4xl leading-[2.5]", latin: "text-lg", trans: "text-lg" },
        large: { arabic: "text-5xl leading-loose", latin: "text-xl", trans: "text-xl" },
        xlarge: { arabic: "text-7xl leading-loose", latin: "text-2xl", trans: "text-2xl" }
    };
    const currentSizes = sizes[scale as keyof typeof sizes] || sizes.normal;

    const title = lang === "ID" ? doa.title_id : doa.title_en;
    const translation = lang === "ID" ? doa.id_translation : doa.en_translation;

    return (
        <div className="bg-white border border-black/10 rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
            {/* Category Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full text-xs font-bold uppercase tracking-widest mb-6 text-rose-600 border border-rose-100">
                <HeartHandshake className="w-3 h-3" /> {doa.category}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-serif font-bold text-black mb-8 border-b border-black/5 pb-4">{title}</h3>

            {/* Content Area */}
            <div className="space-y-6 md:space-y-8">
                {/* Arabic */}
                <p className={`${currentSizes.arabic} font-serif text-right arabic transition-all duration-300`}>
                    {doa.arabic}
                </p>

                {/* Latin */}
                <p className={`${currentSizes.latin} text-black/60 italic border-l-2 border-black/10 pl-4 py-2 transition-all duration-300`}>
                    {doa.latin}
                </p>

                {/* Translation */}
                <p className={`${currentSizes.trans} text-black font-semibold bg-black/5 p-4 md:p-6 rounded-2xl transition-all duration-300`}>
                    {translation}
                </p>

                {/* Reference */}
                <p className="text-xs text-black/40 font-bold uppercase tracking-widest text-right mt-4">
                    {t.doaSource || "Sumber:"} {doa.reference}
                </p>
            </div>
        </div>
    );
}
