import { getArticles } from "@/app/actions/cms";
import Navbar from "@/components/layout/Navbar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const articles = await getArticles();
    const article = articles.find((a: any) => a.id === id);

    if (!article) return { title: 'Not Found - Daril' };

    return {
        title: `${article.title} - Daril`,
        description: article.content.substring(0, 160) + '...', // First 160 chars for SEO description
        openGraph: {
            title: `${article.title} - Daril`,
            description: article.content.substring(0, 160) + '...',
            type: 'article',
        },
    };
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const articles = await getArticles();
    const article = articles.find((a: any) => a.id === id);

    if (!article) return notFound();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <article className="pt-32 pb-24 px-4 max-w-3xl mx-auto min-h-screen">
                <Link href="/news" className="inline-flex items-center gap-2 text-black/60 hover:text-black mb-8 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> Back to News
                </Link>
                <div className="mb-12">
                    <time className="text-sm font-bold tracking-widest text-black/40 uppercase block mb-4">{article.date}</time>
                    <h1 className="text-4xl md:text-6xl font-serif font-black tracking-tight leading-[1.1]">{article.title}</h1>
                </div>
                <div className="prose prose-lg prose-black max-w-none prose-p:leading-relaxed prose-headings:font-serif">
                    {article.content.split('\n').map((paragraph: string, idx: number) => (
                        <p key={idx} className="mb-6 font-light text-black/80">{paragraph}</p>
                    ))}
                </div>
            </article>
        </main>
    );
}
