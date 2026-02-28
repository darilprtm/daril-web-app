"use client";

import { useEffect, useState } from "react";
import { getArticles } from "@/app/actions/cms";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function NewsList() {
    const { t, lang } = useLanguage();
    const [articles, setArticles] = useState<any[]>([]);

    useEffect(() => {
        async function fetchArticles() {
            try {
                const data = await getArticles();
                setArticles(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchArticles();
    }, []);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto min-h-screen">
                <h1 className="text-5xl font-serif font-black tracking-tight mb-4">{t.newsTitle}</h1>
                <p className="text-black/60 mb-16 text-lg">{t.newsDesc}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {articles.map((art: any) => {
                        const showTitle = lang === "EN" && art.titleEn ? art.titleEn : art.title;
                        const showContent = lang === "EN" && art.contentEn ? art.contentEn : art.content;

                        return (
                            <Link key={art.id} href={`/news/${art.id}`} className="group block p-8 border border-black/10 hover:border-black transition-all bg-white hover:shadow-[8px_8px_0_0_#000]">
                                <p className="text-sm font-bold tracking-widest text-black/40 mb-4">{art.date}</p>
                                <h2 className="text-2xl font-serif font-bold mb-4 group-hover:underline decoration-2 underline-offset-4">{showTitle}</h2>
                                <p className="text-black/60 line-clamp-3 leading-relaxed">{showContent}</p>
                                <div className="mt-6 flex items-center gap-2 font-medium">
                                    {t.btnRead} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
