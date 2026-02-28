"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScalableAyah from "@/components/quran/ScalableAyah";
import { toIndoLatin } from "@/lib/transliteration";
import { surahTranslations } from "@/lib/surahNames";

export default function JuzClientReader({ id }: { id: string }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        async function fetchJuz() {
            try {
                // Fetch Arabic, Indo, English, Latin Transliteration
                const resArray = await Promise.all([
                    fetch(`https://api.alquran.cloud/v1/juz/${id}/quran-uthmani`).then(r => r.json()),
                    fetch(`https://api.alquran.cloud/v1/juz/${id}/id.indonesian`).then(r => r.json()),
                    fetch(`https://api.alquran.cloud/v1/juz/${id}/en.asad`).then(r => r.json()),
                    fetch(`https://api.alquran.cloud/v1/juz/${id}/en.transliteration`).then(r => r.json()),
                    fetch(`https://api.alquran.cloud/v1/juz/${id}/ar.alafasy`).then(r => r.json())
                ]);

                setData({
                    arabic: resArray[0].data,
                    indo: resArray[1].data,
                    en: resArray[2].data,
                    latin: resArray[3].data,
                    audio: resArray[4].data
                });
            } catch (err) {
                console.error("Error fetching Juz:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchJuz();
    }, [id]);

    if (loading || !mounted) return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-black border-t-transparent animate-spin" />
        </div>
    );

    return (
        <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto min-h-screen">
            <Link href="/quran/juz" className="inline-flex items-center gap-2 text-black/60 hover:text-black mb-12 transition-colors font-medium">
                <ArrowLeft className="w-4 h-4" /> Kembali ke Daftar Juz
            </Link>

            <div className="text-center mb-16 border-b border-black/10 pb-12">
                <h1 className="text-5xl font-serif font-black tracking-tight mb-4">Juz {id}</h1>
                <p className="text-black/60 uppercase tracking-widest text-sm">Pembacaan Berkesinambungan</p>
            </div>

            <div className="space-y-16">
                {(() => {
                    // Build the Playlist for this Juz
                    const playlist = data.arabic.ayahs.map((ayah: any, idx: number) => ({
                        ayahKey: `${id}:${ayah.surah.number}:${ayah.numberInSurah}`,
                        audioUrl: data.audio.ayahs[idx].audio,
                        surahId: ayah.surah.number,
                        ayahNumber: ayah.numberInSurah,
                        text: data.indo.ayahs[idx].text,
                    }));

                    return data.arabic.ayahs.map((ayah: any, idx: number) => {
                        const indoText = data.indo.ayahs[idx].text;
                        const enText = data.en.ayahs[idx].text;
                        const latinText = toIndoLatin(data.latin.ayahs[idx].text);

                        // Structure: Juz:Surah:Ayah
                        const ayahKey = `${id}:${ayah.surah.number}:${ayah.numberInSurah}`;
                        const indoSurah = surahTranslations[ayah.surah.number];
                        const surahName = indoSurah ? `${ayah.surah.englishName} (${indoSurah})` : ayah.surah.englishName;

                        return (
                            <ScalableAyah
                                key={ayah.number}
                                ayah={ayah}
                                indoText={indoText}
                                enText={enText}
                                latinText={latinText}
                                ayahKey={ayahKey}
                                surahName={surahName}
                                bookmarkMode="juz"
                                playlist={playlist}
                                audioIndex={idx}
                            />
                        );
                    });
                })()}
            </div>

            {/* Pagination Navigation */}
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-black/10">
                {Number(id) > 1 ? (
                    <Link href={`/quran/juz/${Number(id) - 1}`} className="px-6 py-3 rounded-full border border-black/10 hover:border-black transition-all font-medium text-black">
                        &larr; Juz Sebelumnya
                    </Link>
                ) : (
                    <div />
                )}

                {Number(id) < 30 ? (
                    <Link href={`/quran/juz/${Number(id) + 1}`} className="px-6 py-3 rounded-full bg-black text-white hover:bg-black/80 transition-all font-medium">
                        Juz Selanjutnya &rarr;
                    </Link>
                ) : (
                    <div />
                )}
            </div>
        </section>
    );
}
