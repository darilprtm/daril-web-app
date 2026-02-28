import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { Sparkles, PlayCircle, BookOpen } from "lucide-react";
import storiesData from "@/data/stories.json";

export default function StoriesHubPage() {
    return (
        <main className="min-h-screen bg-slate-50 font-sans pb-24">
            <Navbar />

            <section className="pt-32 px-4 max-w-5xl mx-auto">
                <div className="mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-6">
                        <Sparkles className="w-3 h-3" />
                        Micro-Learning
                    </span>
                    <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight mb-4 leading-tight">
                        Kisah<br />Islami.
                    </h1>
                    <p className="text-xl text-black/50 font-light max-w-xl">
                        Ensiklopedia ringkas bertutur visual ala <i>Stories</i>. Nikmati cara baru mempelajari Sejarah Islam dan Sirah Nabawiyah tanpa rasa bosan.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {storiesData.map((story) => (
                        <Link
                            key={story.id}
                            href={`/stories/${story.id}`}
                            className="group relative block w-full aspect-[9/16] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-xl shadow-black/10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500"
                        >
                            {/* Bg Image */}
                            <img
                                src={story.coverImage}
                                alt={story.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                <div className="mb-auto flex justify-end">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                                        <PlayCircle className="w-6 h-6 fill-white text-white" />
                                    </div>
                                </div>

                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-white text-[10px] font-bold tracking-widest uppercase mb-3 border border-white/20 w-fit">
                                    <BookOpen className="w-3 h-3" /> {story.slides.length} Bagian
                                </span>
                                <h3 className="text-2xl md:text-3xl font-serif font-black text-white leading-snug drop-shadow-lg">
                                    {story.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
