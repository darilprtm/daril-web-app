"use client";

import Navbar from "@/components/layout/Navbar";
import { useLanguage } from "@/context/LanguageContext";
import asmaulHusnaData from "@/data/asmaulhusna.json";
import { Sparkles, Play, Volume2 } from "lucide-react";
import { useState } from "react";

const AudioButton = ({ text }: { text: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    const playAudio = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isPlaying) return;
        setIsPlaying(true);
        const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(text)}&tl=ar&client=tw-ob`;
        const audio = new Audio(url);
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => setIsPlaying(false);
        audio.play().catch(() => setIsPlaying(false));
    };

    return (
        <button
            onClick={playAudio}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 absolute top-8 right-8 z-20 ${isPlaying ? 'bg-indigo-600 text-white animate-pulse shadow-lg shadow-indigo-500/30' : 'bg-black/5 text-black/40 hover:bg-indigo-100 hover:text-indigo-600'}`}
            title="Dengarkan Pelafalan"
        >
            {isPlaying ? <Volume2 className="w-6 h-6" /> : <Play className="w-5 h-5 ml-1" />}
        </button>
    );
};

export default function AsmaulHusnaPage() {
    const { t, lang } = useLanguage();

    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-7xl mx-auto min-h-screen">
                <div className="text-center mb-20 relative">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-50 to-purple-50 text-indigo-600 mb-8 border border-white shadow-xl shadow-indigo-900/5 hover:scale-105 transition-transform duration-300">
                        <Sparkles className="w-12 h-12" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-serif font-black tracking-tight mb-6 text-black drop-shadow-sm">Asmaul Husna</h1>
                    <p className="text-xl text-black/60 max-w-2xl mx-auto leading-relaxed">
                        Mengenal 99 Nama Allah yang Maha Agung dan Mulia berserta maknanya untuk meningkatkan keimanan kita.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {asmaulHusnaData.map((husna) => (
                        <div
                            key={husna.number}
                            className="group relative overflow-hidden bg-white rounded-[2.5rem] p-8 border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-indigo-900/10 hover:border-indigo-500/20 transition-all duration-500 flex flex-col items-center text-center isolate"
                        >
                            {/* Watermark */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[10rem] font-serif arabic text-black/5 opacity-40 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none select-none z-0" aria-hidden="true">
                                {husna.arabic}
                            </div>

                            {/* Audio Play Button */}
                            <AudioButton text={husna.arabic} />

                            {/* Number Badge */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center font-bold text-xl text-indigo-600 mb-8 border border-indigo-100 group-hover:rotate-12 group-hover:bg-gradient-to-br group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:border-transparent group-hover:text-white transition-all duration-500 shadow-sm relative z-10 self-start mt-[-0.5rem] ml-[-0.5rem]">
                                {husna.number}
                            </div>

                            {/* Arabic Name */}
                            <h3 className="text-4xl md:text-5xl font-serif arabic text-black mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 transition-all duration-500 leading-normal relative z-10 drop-shadow-sm py-2">
                                {husna.arabic}
                            </h3>

                            {/* Info Section */}
                            <div className="mt-auto relative z-10 w-full pt-6 border-t border-black/5 group-hover:border-indigo-100/50 transition-colors">
                                <p className="text-xl font-black mb-2 tracking-wide text-black group-hover:text-indigo-900 transition-colors">{husna.latin}</p>
                                <p className="text-sm text-black/60 font-medium leading-relaxed group-hover:text-black/80 transition-colors">
                                    {(husna as any).meaningId}
                                </p>
                            </div>

                            {/* Decorative Frame */}
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-500/0 group-hover:border-indigo-500/10 rounded-[2.5rem] transition-all duration-700 pointer-events-none z-20" />
                            <div className="absolute top-3 left-3 w-4 h-4 rounded-full border border-indigo-500/0 group-hover:border-indigo-500/30 transition-all duration-500 blur-sm group-hover:blur-0" />
                            <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full border border-purple-500/0 group-hover:border-purple-500/30 transition-all duration-500 blur-sm group-hover:blur-0" />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
