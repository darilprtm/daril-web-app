"use client";

import Navbar from "@/components/layout/Navbar";
import { AlertTriangle } from "lucide-react";

export default function DisclaimerPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <section className="pt-32 pb-24 px-4 max-w-3xl mx-auto">
                <div className="mb-12">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm font-bold uppercase tracking-widest mb-4">
                        <AlertTriangle className="w-4 h-4" /> Perhatian Penuh
                    </span>
                    <h1 className="text-4xl md:text-5xl font-black font-serif tracking-tight mb-6">Disclaimer (Sangkalan)</h1>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>

                <div className="prose prose-lg text-slate-700 max-w-none">
                    <p>
                        Segala informasi yang disediakan di situs web <strong>Sasuke.id</strong> ("kami", "milik kami", atau "situs ini") diterbitkan dengan itikad baik dan semata-mata untuk tujuan informasi dan edukasi keagamaan umum.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-black">Akurasi Jadwal Sholat dan Kiblat</h3>
                    <p>
                        Meskipun kami menggunakan API astronomi (AlAdhan) yang diakui secara global untuk menghitung jadwal waktu sholat dan arah kiblat berdasarkan koordinat GPS perangkat Anda, <strong>Sasuke.id tidak menjamin akurasi absolut hingga hitungan detik</strong>.
                        Terdapat kemungkinan distorsi lokasi, pergeseran magnetometer perangkat keras HP Anda, dan perbedaan waktu kalibrasi. Kami menyarankan Anda untuk selalu merujuk pada jadwal adzan dari masjid setempat atau Kementerian Agama Republik Indonesia (Kemenag) untuk keabsahan final.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-black">Konten Teks dan Terjemahan Al-Quran</h3>
                    <p>
                        Teks Arab, transliterasi Latin, dan terjemahan ayat-ayat Al-Quran diambil dari API pihak ketiga. Meskipun kami berusaha semaksimal mungkin mengintegrasikan sumber data yang bebas kesalahan, <strong>kesalahan pengetikan digital (typo) mungkin dapat terjadi</strong> pada API sumber.
                        Sasuke.id tidak bertanggung jawab secara hukum maupun syari'at atas kekeliruan mutlak yang mungkin timbul. Jika menemukan kesalahan teks, harap hubungi kami atau periksa ayat tersebut pada Mushaf cetak Al-Quran resmi.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-black">Tafsir, Hadis, dan Artikel Fiqh</h3>
                    <p>
                        Artikel seputar fatwa, tips ibadah harian, dan ringkasan tafsir (“Tata Cara”) yang disediakan oleh AI Chatbot atau halaman edukasi kami hanyalah ringkasan umum. Konten tersebut <strong>bukanlah penentu fatwa legal agama</strong>. Untuk urusan hukum Fiqh harian yang spesifik dan kompleks, harap berkonsultasi langsung dengan ulama, ustadz, atau kyai yang kredibel.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-black">Tautan Eksternal</h3>
                    <p>
                        Melalui situs web ini, Anda dapat terhubung ke situs web lain melalui *hyperlink* (seperti platform audio penyedia Murottal). Kami tidak memiliki kontrol atas sifat, konten, dan ketersediaan situs-situs tersebut.
                    </p>

                    <h3 className="text-xl font-bold mt-8 mb-4 text-black">Persetujuan</h3>
                    <p>
                        Dengan menggunakan situs web kami, Anda dengan ini menyetujui Sangkalan (Disclaimer) kami beserta ketentuannya. Jika Anda memerlukan informasi lebih lanjut atau memiliki pertanyaan tentang pelepasan tanggung jawab situs kami, silakan hubungi kami melalui email di <strong>darilpsr@gmail.com</strong>.
                    </p>
                </div>
            </section>
        </main>
    );
}
