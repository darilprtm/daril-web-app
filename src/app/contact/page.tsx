"use client";

import Navbar from "@/components/layout/Navbar";
import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                        <Mail className="w-4 h-4" /> Hubungi Kami
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-6">Pusat Bantuan Sasuke.id</h1>
                    <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                        Punya saran fitur, melaporkan *bug*, atau pertanyaan terkait kerja sama? Tim kami siap mendengarkan pesan Anda.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-serif">Email Resmi</h3>
                            <p className="text-slate-600 mb-4">Waktu respons rata-rata kami adalah 1-2 hari kerja.</p>
                            <a href="mailto:darilpsr@gmail.com" className="text-indigo-600 font-bold hover:underline text-lg">darilpsr@gmail.com</a>
                        </div>

                        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2 font-serif">Markas Operasional</h3>
                            <p className="text-slate-600">
                                Sasuke.id Development Studio<br />
                                Indonesia (Remote)
                            </p>
                        </div>
                    </div>

                    {/* Contact Form Mock */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                        <h3 className="text-2xl font-bold mb-6">Kirim Pesan Langsung</h3>
                        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Pesan sedang tidak aktif di mode lokal. Silakan gunakan tautan Email secara langsung."); }}>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Nama Lengkap</label>
                                <input type="text" placeholder="Fulani bin Fulan" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Alamat Email</label>
                                <input type="email" placeholder="nama@email.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors" required />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Pesan Anda</label>
                                <textarea placeholder="Tulis masukan, kritik, atau saran Anda di sini..." rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 focus:bg-white transition-colors resize-none" required></textarea>
                            </div>
                            <button type="submit" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-bold py-4 px-8 rounded-xl hover:bg-indigo-700 transition-colors">
                                Kirim Pesan <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>
                </div>

            </section>
        </main>
    );
}
