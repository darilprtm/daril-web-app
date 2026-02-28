import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ScalableAyah from "@/components/quran/ScalableAyah";
import { toIndoLatin } from "@/lib/transliteration";
import { surahTranslations } from "@/lib/surahNames";

async function getSurahData(id: string) {
    // Fetch Arabic, Indo, English, Latin Transliteration, and Audio
    const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/editions/quran-uthmani,id.indonesian,en.asad,en.transliteration,ar.alafasy`, {
        next: { revalidate: 3600 }
    });
    const data = await res.json();
    return data.data; // Array with five items
}

import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}`);
        const data = await res.json();
        const surah = data.data;
        const translatedName = surahTranslations[Number(id)] || surah.englishNameTranslation;

        return {
            title: `Surah ${surah.englishName} (${translatedName}) - Al-Quran Online Daril`,
            description: `Baca dan dengarkan Surah ${surah.englishName} beserta terjemahan Indonesia dan pelafalan (Murottal). Pembuka Al-Quran, ${translatedName}.`,
            openGraph: {
                title: `Surah ${surah.englishName} - Daril`,
                description: `Baca Surah ${surah.englishName} (${translatedName}) dengan terjemahan dan audio.`,
            }
        };
    } catch (e) {
        return { title: 'Surah - Daril' };
    }
}

export default async function SurahPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const data = await getSurahData(id);
    const arabic = data[0];
    const indonesian = data[1];
    const english = data[2];
    const latin = data[3];
    const audio = data[4];

    // Determine starting Juz for the header
    const startingJuz = arabic.ayahs[0]?.juz;
    const translatedName = surahTranslations[Number(id)] || arabic.englishNameTranslation;
    const translatedRevelation = arabic.revelationType === "Meccan" ? "Makkiyah" : "Madaniyah";

    // Build the Playlist for this Surah
    const playlist = arabic.ayahs.map((ayah: any, idx: number) => ({
        ayahKey: `${id}:${ayah.numberInSurah}`,
        audioUrl: audio.ayahs[idx].audio,
        surahId: Number(id),
        ayahNumber: ayah.numberInSurah,
        text: indonesian.ayahs[idx].text,
    }));

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section className="pt-32 pb-24 px-4 max-w-4xl mx-auto min-h-screen">
                <div className="flex justify-between items-center mb-12">
                    <Link href="/quran/surah" className="inline-flex items-center gap-2 text-black/60 hover:text-black transition-colors font-medium">
                        <ArrowLeft className="w-4 h-4" /> Back to Surahs
                    </Link>
                    <Link href={`/quran/${id}/cinematic`} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full font-bold hover:bg-indigo-100 transition-colors shadow-sm text-sm">
                        Mode Sinematik
                    </Link>
                </div>

                <div className="text-center mb-16 border-b border-black/10 pb-12">
                    <h1 className="text-5xl font-serif font-black tracking-tight mb-4">{arabic.englishName}</h1>
                    <p className="text-4xl font-serif mb-4 pt-4 arabic leading-relaxed">{arabic.name}</p>
                    <p className="text-black/60 uppercase tracking-widest text-sm mb-2">{translatedName} • {translatedRevelation}</p>
                    <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full text-xs font-bold text-black/60">
                        Juz {startingJuz}
                    </div>
                </div>

                <div className="space-y-16">
                    {arabic.ayahs.map((ayah: any, idx: number) => {
                        const indoText = indonesian.ayahs[idx].text;
                        const enText = english.ayahs[idx].text;
                        const latinText = toIndoLatin(latin.ayahs[idx].text);
                        const ayahKey = `${id}:${ayah.numberInSurah}`; // SurahID:AyahNumber

                        return (
                            <ScalableAyah
                                key={ayah.number}
                                ayah={ayah}
                                indoText={indoText}
                                enText={enText}
                                latinText={latinText}
                                ayahKey={ayahKey}
                                bookmarkMode="surah"
                                playlist={playlist}
                                audioIndex={idx}
                            />
                        );
                    })}
                </div>

                {/* Pagination Navigation */}
                <div className="flex justify-between items-center mt-16 pt-8 border-t border-black/10">
                    {Number(id) > 1 ? (
                        <Link href={`/quran/${Number(id) - 1}`} className="px-6 py-3 rounded-full border border-black/10 hover:border-black transition-all font-medium text-black">
                            &larr; Surah Sebelumnya
                        </Link>
                    ) : (
                        <div />
                    )}

                    {Number(id) < 114 ? (
                        <Link href={`/quran/${Number(id) + 1}`} className="px-6 py-3 rounded-full bg-black text-white hover:bg-black/80 transition-all font-medium">
                            Surah Selanjutnya &rarr;
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </section>
        </main>
    );
}
