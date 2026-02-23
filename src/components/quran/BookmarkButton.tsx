"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function BookmarkButton({ ayahKey, mode = "surah" }: { ayahKey: string, mode?: "surah" | "juz" }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    const storageKey = mode === "juz" ? "daril_bookmarks_juz" : "daril_bookmarks";

    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const bookmarks: string[] = JSON.parse(saved);
            setIsBookmarked(bookmarks.includes(ayahKey));
        }
    }, [ayahKey, storageKey]);

    const toggleBookmark = () => {
        const saved = localStorage.getItem(storageKey);
        let bookmarks: string[] = saved ? JSON.parse(saved) : [];

        if (bookmarks.includes(ayahKey)) {
            bookmarks = bookmarks.filter((b) => b !== ayahKey);
            setIsBookmarked(false);
        } else {
            bookmarks = [...bookmarks, ayahKey];
            setIsBookmarked(true);
        }
        localStorage.setItem(storageKey, JSON.stringify(bookmarks));
    };

    return (
        <button
            onClick={toggleBookmark}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/10 transition-colors z-10 relative"
            title={isBookmarked ? "Hapus Markah" : "Simpan Markah"}
        >
            {isBookmarked ? (
                <BookmarkCheck className="w-5 h-5 text-black" />
            ) : (
                <Bookmark className="w-5 h-5 text-black/40 group-hover:text-black" />
            )}
        </button>
    );
}
