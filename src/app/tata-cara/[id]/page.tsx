import Navbar from "@/components/layout/Navbar";
import { tataCaraGuides } from "@/lib/tataCaraData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Metadata } from "next";

export async function generateStaticParams() {
    return tataCaraGuides.map((guide) => ({
        id: guide.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const guide = tataCaraGuides.find(g => g.id === id);

    if (!guide) return { title: 'Not Found - Daril' };

    return {
        title: `${guide.title} - Daril Fiqih`,
        description: guide.shortDesc,
        openGraph: {
            title: `${guide.title} - Daril`,
            description: guide.shortDesc,
            type: 'article',
        }
    };
}

export default async function TataCaraDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const guide = tataCaraGuides.find(g => g.id === id);

    if (!guide) return notFound();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-3xl mx-auto min-h-screen">
                <Link href="/tata-cara" className="inline-flex items-center gap-2 text-black/60 hover:text-black mb-12 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4" /> Kembali ke Panduan Ibadah
                </Link>

                <div className="mb-16 pb-12 border-b border-black/5">
                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4">{guide.title}</h1>
                    <p className="text-xl text-black/60 font-light leading-relaxed">{guide.shortDesc}</p>
                </div>

                <div className="space-y-12">
                    {guide.steps.map((step, idx) => (
                        <div key={idx} className="bg-[#FAFAFA] p-8 md:p-10 rounded-[2rem] border border-black/5 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <span className="font-serif font-black text-6xl text-black">{idx + 1}</span>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold font-serif mb-4 text-black flex items-center gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
                                    {step.title}
                                </h3>

                                <p className="text-lg text-black/70 mb-6 leading-relaxed">
                                    {step.desc}
                                </p>

                                {step.arabic && (
                                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-black/5 shadow-sm text-right mt-6">
                                        <p className="font-amiri text-3xl md:text-4xl leading-[2.5] text-black mb-6">
                                            {step.arabic}
                                        </p>
                                        {(step.latin || step.translation) && (
                                            <div className="text-left pt-6 border-t border-black/5 space-y-4">
                                                {step.latin && (
                                                    <p className="text-indigo-600 font-medium tracking-wide">
                                                        "{step.latin}"
                                                    </p>
                                                )}
                                                {step.translation && (
                                                    <p className="text-black/70 text-sm leading-relaxed">
                                                        Artinya: {step.translation}
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}
