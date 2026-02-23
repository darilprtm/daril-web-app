"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
    const { lang } = useLanguage();

    return (
        <footer className="bg-white border-t border-black/5 py-12 px-4 mt-auto">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-logo mb-1">DARIL</h2>
                    <p className="text-sm text-black/60">
                        {lang === "ID"
                            ? "Situs Islami tepercaya untuk kemudahan ibadah harian Anda."
                            : "A trusted Islamic site for the ease of your daily worship."}
                    </p>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-sm font-medium text-black/60">
                    <Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms-conditions" className="hover:text-indigo-600 transition-colors">
                        Terms & Conditions
                    </Link>
                    <a href="mailto:darilpsr@gmail.com" className="hover:text-indigo-600 transition-colors">
                        Contact Us
                    </a>
                </div>
            </div>

            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-black/5 text-center text-xs text-black/40">
                &copy; {new Date().getFullYear()} daril.id | Daril Pratomo. All rights reserved.
            </div>
        </footer>
    );
}
