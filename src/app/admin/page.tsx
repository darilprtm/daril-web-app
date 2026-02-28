import { getTips, getArticles } from "@/app/actions/cms";
import CMSClient from "./CMSClient";
import Navbar from "@/components/layout/Navbar";

export default async function AdminPage() {
    const tips = await getTips();
    const articles = await getArticles();

    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <div className="pt-24 pb-12 text-center border-b border-black/5 bg-black/5">
                <h1 className="text-4xl font-serif font-bold text-black border-2 border-black inline-block px-4 py-1">DARIL ADMIN</h1>
                <p className="mt-2 text-black/60 font-medium tracking-widest text-sm">CONTENT MANAGEMENT SYSTEM</p>
            </div>
            <CMSClient initialTips={tips} initialArticles={articles} />
        </main>
    );
}
