"use client";

import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { BookOpen, Droplets, Heart, Users, Waves, ArrowRight } from "lucide-react";
import { tataCaraGuides } from "@/lib/tataCaraData";

const iconMap: Record<string, any> = {
    Droplets: Droplets,
    Heart: Heart,
    Waves: Waves,
    Users: Users
};

export default function TataCaraPage() {
    return (
        <main className="min-h-screen bg-[#FAFAFA]">
            <Navbar />
            <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto min-h-screen">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-[2rem] bg-indigo-50 text-indigo-600 mb-6 shadow-sm">
                        <BookOpen className="w-10 h-10" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black tracking-tight mb-4 text-black">Panduan Ibadah</h1>
                    <p className="text-lg text-black/60 max-w-2xl mx-auto">
                        Pelajari tata cara ibadah harian (Fiqih) yang benar sesuai sunnah, lengkap dengan niat, gerakan, dan doa.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {tataCaraGuides.map((guide) => {
                        const Icon = iconMap[guide.icon] || BookOpen;

                        return (
                            <Link
                                href={`/tata-cara/${guide.id}`}
                                key={guide.id}
                                className="group bg-white p-8 rounded-[2rem] border border-black/5 hover:border-black/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-4 group-hover:translate-x-0">
                                    <ArrowRight className="w-6 h-6 text-black/20" />
                                </div>
                                <div className="w-16 h-16 rounded-2xl bg-black/5 text-black/60 flex items-center justify-center mb-6 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-300">
                                    <Icon className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-bold font-serif text-black mb-3">{guide.title}</h2>
                                <p className="text-black/60 leading-relaxed font-medium">
                                    {guide.shortDesc}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
