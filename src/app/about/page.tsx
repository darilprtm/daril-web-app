"use client";

import Navbar from "@/components/layout/Navbar";
import { Info, Target, Zap, Shield, HelpCircle } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-32 pb-16 px-4 max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                        <Info className="w-4 h-4" /> Tentang Kami
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-6">Mengenal Sasuke.id</h1>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Sasuke.id didirikan dengan satu tujuan: Menyediakan ekosistem ibadah digital yang modern, akurat, dan dapat dipercaya oleh umat Islam di seluruh dunia.
                    </p>
                </div>

                {/* Manfaat */}
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 mb-12">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <Target className="w-8 h-8 text-indigo-600" /> Manfaat Sasuke.id
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-emerald-500" /> Sumber Terpercaya
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Seluruh data teks Al-Quran, terjemahan, dan jadwal sholat diambil dari API resmi yang selaras dengan Kementerian Agama RI dan standar global ustadz/ulama.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Zap className="w-5 h-5 text-amber-500" /> Super Cepat & Tanpa Gangguan
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Dibangun dengan teknologi web modern (Next.js) yang menjamin antarmuka yang sangat cepat, responsif di HP, dan tanpa pop-up iklan yang mengganggu kekhusyukan ibadah.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Cara Kerja */}
                <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 mb-12 border-l-4 border-indigo-600">
                    <h2 className="text-3xl font-bold mb-6">Cara Kerja Fitur Kami</h2>
                    <div className="space-y-6 text-slate-700 leading-relaxed">
                        <p>
                            <strong>Jadwal Sholat & Kiblat:</strong> Kami menggunakan API geolokasi standar tinggi yang membaca koordinat perangkat Anda secara anonim, lalu mencocokkannya dengan algoritma astronomi AlAdhan untuk menghitung jadwal sholat dan sudut kompas Mekkah secara presisi.
                        </p>
                        <p>
                            <strong>Al-Quran & Audio:</strong> Seluruh 114 Surah ditarik secara real-time dari Al-Quran Cloud API, beserta audio murottal dari qari internasional terkemuka. Data <em>bookmark</em> atau penanda bacaan hanya disimpan di dalam memori internal peramban (Local Storage) ponsel Anda, sehingga privasi Anda 100% aman.
                        </p>
                    </div>
                </div>

                {/* FAQ */}
                <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2rem] shadow-2xl">
                    <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                        <HelpCircle className="w-8 h-8 text-indigo-400" /> FAQ (Tanya Jawab)
                    </h2>

                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-indigo-200">Apakah Sasuke.id 100% gratis?</h3>
                            <p className="text-slate-300">Ya, seluruh fitur Islami di dalam Sasuke.id disediakan secara gratis untuk ummat.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-indigo-200">Bagaimana dengan privasi data lokasi saya?</h3>
                            <p className="text-slate-300">Data GPS hanya digunakan sementara oleh perangkat Anda untuk menghitung Kiblat dan Waktu Sholat. Kami tidak pernah merekam atau menyimpan lokasi presisi Anda di database server kami.</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-indigo-200">Apakah terjemahan Al-Quran sudah sesuai standar Kemenag?</h3>
                            <p className="text-slate-300">Terjemahan bahasa Indonesia di platform ini menggunakan endpoint resmi yang merujuk pada terjemahan standar Kementerian Agama Republik Indonesia.</p>
                        </div>
                    </div>
                </div>

            </section>
        </main>
    );
}
