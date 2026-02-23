"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import doaData from "@/data/doa.json";
import DoaCard from "@/components/doa/DoaCard";
import { HeartHandshake } from "lucide-react";

export default function DoaPage() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<string>("Semua");

    const categories = ["Semua", "Doa Harian", "Zikir Pagi", "Zikir Petang", "Hadits Pilihan"];

    const filteredDoas = activeTab === "Semua"
        ? doaData
        : doaData.filter((d: any) => d.category.trim().toLowerCase() === activeTab.trim().toLowerCase());

    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto min-h-screen">
                <div className="text-center mb-10 relative">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-rose-100 text-rose-600 mb-6 shadow-inner">
                        <HeartHandshake className="w-10 h-10" />
                    </div>
                    <h1 className="text-5xl font-serif font-black tracking-tight mb-4">{t.doaPageTitle || "Doa & Zikir"}</h1>
                    <p className="text-xl text-black/60 max-w-2xl mx-auto">{t.doaPageDesc || "Kumpulan doa harian, zikir, dan hadits pilihan."}</p>
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveTab(cat)}
                            className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all ${activeTab === cat ? 'bg-black text-white shadow-xl shadow-black/20 scale-105' : 'bg-white text-black/60 hover:bg-black/5 hover:text-black border border-black/10'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="space-y-8">
                    {filteredDoas.length > 0 ? (
                        filteredDoas.map((doa: any) => (
                            <DoaCard key={doa.id} doa={doa} />
                        ))
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl border border-black/10">
                            <p className="text-black/40 font-medium">Belum ada data untuk kategori ini.</p>
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
