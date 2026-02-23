import Navbar from "@/components/layout/Navbar";
import JuzClientReader from "@/components/quran/JuzClientReader";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    return {
        title: `Juz ${id} - Al-Quran Online Daril`,
        description: `Baca Al-Quran Juz ${id} secara berkesinambungan dengan terjemahan Bahasa Indonesia dan Murottal audio.`,
        openGraph: {
            title: `Baca Al-Quran Juz ${id} - Daril`,
            description: `Platform premium membaca Al-Quran Juz ${id} lengkap dengan tajwid, terjemahan, dan audio.`,
        }
    };
}

export default async function JuzReaderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <JuzClientReader id={id} />
        </main>
    );
}
