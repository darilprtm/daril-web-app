"use client";

import { useState } from "react";
import { addTip, deleteTip, addArticle, deleteArticle } from "@/app/actions/cms";
import { Trash2 } from "lucide-react";

export default function CMSClient({ initialTips, initialArticles }: { initialTips: any[], initialArticles: any[] }) {
    const [tab, setTab] = useState<"tips" | "articles">("tips");

    return (
        <div className="max-w-5xl mx-auto p-8 space-y-8">
            <div className="flex gap-4 border-b border-black/10 pb-4">
                <button
                    onClick={() => setTab("tips")}
                    className={`font-semibold text-lg transition-colors ${tab === "tips" ? "text-black" : "text-black/40 hover:text-black"}`}
                >
                    Daily Tips
                </button>
                <button
                    onClick={() => setTab("articles")}
                    className={`font-semibold text-lg transition-colors ${tab === "articles" ? "text-black" : "text-black/40 hover:text-black"}`}
                >
                    News / Articles
                </button>
            </div>

            {tab === "tips" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <form action={addTip} className="flex flex-col gap-4 bg-black/5 p-6 rounded-xl border border-black/10">
                        <h3 className="font-serif font-bold text-xl">Add New Tip</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input name="title" required placeholder="Title (e.g., Senyum ke Saudaramu)" className="px-4 py-2 border border-black/20 rounded-lg outline-none focus:border-black" />
                            <select name="type" className="px-4 py-2 border border-black/20 rounded-lg outline-none focus:border-black">
                                <option value="pahala">Pahala</option>
                                <option value="dosa">Dosa</option>
                            </select>
                        </div>
                        <textarea name="desc" required placeholder="Description..." rows={3} className="px-4 py-2 border border-black/20 rounded-lg outline-none focus:border-black resize-none" />
                        <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-black/80 transition self-start">Save Tip</button>
                    </form>

                    <div className="grid gap-4">
                        {initialTips.map(tip => (
                            <div key={tip.id} className="flex items-center justify-between p-4 border border-black/10 rounded-xl">
                                <div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded bg-black/10 uppercase tracking-wider mr-2`}>{tip.type}</span>
                                    <span className="font-semibold">{tip.title}</span>
                                    <p className="text-sm text-black/60 truncate max-w-lg mt-1">{tip.desc}</p>
                                </div>
                                <button onClick={() => deleteTip(tip.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {tab === "articles" && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4">
                    <form action={addArticle} className="flex flex-col gap-4 bg-black/5 p-6 rounded-xl border border-black/10">
                        <h3 className="font-serif font-bold text-xl">Post New Article</h3>
                        <input name="title" required placeholder="Article Title" className="px-4 py-2 border border-black/20 rounded-lg outline-none focus:border-black" />
                        <textarea name="content" required placeholder="Article Content..." rows={6} className="px-4 py-2 border border-black/20 rounded-lg outline-none focus:border-black resize-none" />
                        <button type="submit" className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-black/80 transition self-start">Publish</button>
                    </form>

                    <div className="grid gap-4">
                        {initialArticles.map(art => (
                            <div key={art.id} className="flex flex-col gap-2 p-4 border border-black/10 rounded-xl relative pr-12">
                                <span className="text-xs text-black/40 font-mono">{art.date}</span>
                                <span className="font-semibold text-lg font-serif">{art.title}</span>
                                <button onClick={() => deleteArticle(art.id)} className="absolute top-4 right-4 p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
