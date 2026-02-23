import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function JuzPage() {
    const juzList = Array.from({ length: 30 }, (_, i) => i + 1);

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section className="pt-32 pb-24 px-4 max-w-5xl mx-auto min-h-screen">
                <div className="text-center mb-16">
                    <BookOpen className="w-12 h-12 mx-auto mb-6 text-black" />
                    <h1 className="text-5xl font-serif font-black tracking-tight mb-4 text-black">Al-Quran (Per Juz)</h1>
                    <p className="text-black/60 text-lg">Membaca ayat suci berkesinambungan 1 hingga 30 Juz.</p>
                </div>

                <div className="flex justify-center gap-4 mb-12">
                    <Link href="/quran" className="px-6 py-2 rounded-full border border-black/10 hover:border-black transition-colors font-medium">Per Surah</Link>
                    <Link href="/quran/juz" className="px-6 py-2 rounded-full bg-black text-white font-medium">Per Juz</Link>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {juzList.map((juz) => (
                        <Link
                            key={juz}
                            href={`/quran/juz/${juz}`}
                            className="flex flex-col items-center justify-center p-8 border border-black/10 hover:border-black transition-all hover:shadow-[4px_4px_0_0_#000] rounded-xl group relative overflow-hidden bg-white"
                        >
                            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg mb-4 z-10">
                                {juz}
                            </div>
                            <h3 className="font-serif font-bold text-xl z-10">Juz {juz}</h3>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
