"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type Language = "ID" | "EN";

interface Translations {
    // Hero & Navbar
    heroTagline: string;
    heroTitle: string;
    heroDesc: string;
    heroBtnQuran: string;
    heroBtnSholat: string;
    navHome: string;
    navSholat: string;
    navQuran: string;
    navMisi: string;
    navNews: string;
    navDoa: string;
    navAsmaulHusna: string;
    navKalender: string;
    navKiblat: string;

    // Home Dashboard & Shortcuts
    shortcutTitle: string;
    shortcutDesc: string;
    shortcutQuranDesc: string;
    shortcutSholatDesc: string;
    shortcutMisiDesc: string;
    shortcutNewsDesc: string;
    shortcutDoaDesc: string;
    shortcutAsmaulHusnaDesc: string;
    shortcutKalenderDesc: string;
    shortcutKiblatDesc: string;
    btnRead: string;
    btnPlay: string;
    dashboardPrayerTitle: string;
    dashboardPrayerDesc: string;
    dashboardPrayerGps: string;
    dashboardPrayerNoGps: string;
    dashboardContinueTitle: string;
    dashboardContinueDesc: string;
    dashboardContinueTracker: string;
    dashboardContinueSurahLabel: string;
    dashboardContinueJuzLabel: string;
    dashboardContinueSurah: string;
    dashboardContinueAyah: string;
    dashboardContinueEmpty: string;
    dashboardTipsTitle: string;
    dashboardTipsDesc: string;

    // Quran Hub
    qhubTitle: string;
    qhubDesc: string;
    qhubSurah: string;
    qhubSurahDesc: string;
    qhubJuz: string;
    qhubJuzDesc: string;

    // Doa & Hadith
    doaPageTitle: string;
    doaPageDesc: string;
    doaSource: string;

    // Games/Misi
    gamesTitle: string;
    gamesDesc: string;
    gamesPoints: string;

    // News/Articles
    newsTitle: string;
    newsDesc: string;

    // Sholat
    sholatTitle: string;
    sholatDesc: string;
    sholatLocation: string;
    sholatGpsBtn: string;

    // UI General
    backPrev: string;
    backNext: string;
    loading: string;
    error: string;
}

const translations: Record<Language, Translations> = {
    ID: {
        heroTagline: "TEMAN IBADAH HARIANMU",
        heroTitle: "Langkah Kecil\nMenuju Kebaikan",
        heroDesc: "Ruang teduh untuk memperdalam iman, membaca Al-Quran, melihat jadwal sholat, dan menemukan hikmah Islam setiap hari.",
        heroBtnQuran: "Baca Al-Quran",
        heroBtnSholat: "Jadwal Sholat",
        navHome: "Beranda",
        navSholat: "Jadwal",
        navQuran: "Al-Quran",
        navMisi: "Misi Harian",
        navNews: "Edukasi",
        navDoa: "Doa & Zikir",
        navAsmaulHusna: "Asmaul Husna",
        navKalender: "Kalender",
        navKiblat: "Arah Kiblat",
        shortcutTitle: "Akses Cepat",
        shortcutDesc: "Fitur utama untuk ibadah harian Anda.",
        shortcutQuranDesc: "Baca versi Uthmani & Terjemahan",
        shortcutSholatDesc: "Waktu Akurat Otomatis (GPS)",
        shortcutMisiDesc: "Kumpulkan Point Kebaikan",
        shortcutNewsDesc: "Artikel Islami Harian",
        shortcutDoaDesc: "Kumpulan Doa & Hadits Pilihan",
        shortcutAsmaulHusnaDesc: "99 Nama Allah",
        shortcutKalenderDesc: "Hari Besar Islam & Penaggalan",
        shortcutKiblatDesc: "Kompas Sensor Ka'bah",
        btnRead: "Baca Sekarang",
        btnPlay: "Mulai Bermain",
        dashboardPrayerTitle: "Jadwal Sholat Hari Ini",
        dashboardPrayerDesc: "Waktu sholat langsung berdasarkan lokasi GPS Anda.",
        dashboardPrayerGps: "GPS Aktif",
        dashboardPrayerNoGps: "Aktifkan GPS",
        dashboardContinueTitle: "Lanjutkan Membaca",
        dashboardContinueDesc: "Ayat terakhir yang Anda tandai.",
        dashboardContinueTracker: "Pelacak",
        dashboardContinueSurahLabel: "Terakhir Dibaca (Surat)",
        dashboardContinueJuzLabel: "Terakhir Dibaca (Juz)",
        dashboardContinueSurah: "Surah",
        dashboardContinueAyah: "Ayat",
        dashboardContinueEmpty: "Belum ada markah.",
        dashboardTipsTitle: "Hikmah Harian",
        dashboardTipsDesc: "Kutipan inspiratif untuk memulai hari Anda.",
        qhubTitle: "Membaca Al-Quran",
        qhubDesc: "Pilih mode membaca yang Anda inginkan hari ini.",
        qhubSurah: "Per Surah",
        qhubSurahDesc: "Daftar 114 Surah lengkap untuk melancarkan hafalan.",
        qhubJuz: "Per Juz",
        qhubJuzDesc: "Daftar 30 Juz untuk membaca berkesinambungan.",
        doaPageTitle: "Doa & Zikir",
        doaPageDesc: "Kumpulan doa harian, zikir, dan hadits pilihan.",
        doaSource: "Sumber:",
        gamesTitle: "Misi Harian & Tanya Jawab",
        gamesDesc: "Kumpulkan pahala virtual dengan menyelesaikan tantangan islami hari ini.",
        gamesPoints: "Poin Pahala",
        newsTitle: "Artikel & Edukasi",
        newsDesc: "Kumpulan artikel pilihan seputar fiqih, sejarah, dan wawasan Islam.",
        sholatTitle: "Jadwal Sholat",
        sholatDesc: "Waktu presisi berdasarkan lokasi aktual Anda.",
        sholatLocation: "Lokasi Anda saat ini",
        sholatGpsBtn: "Gunakan GPS Saya",
        backPrev: "Sebelumnya",
        backNext: "Selanjutnya",
        loading: "Memuat...",
        error: "Terjadi kesalahan."
    },
    EN: {
        heroTagline: "PATHWAY TO PEACE",
        heroTitle: "Find Light in Every Step",
        heroDesc: "An elegant space to deepen your faith, read the Al-Quran, and discover Islamic wisdom.",
        heroBtnQuran: "Read Al-Quran",
        heroBtnSholat: "Prayer Times",
        navHome: "Home",
        navSholat: "Times",
        navQuran: "Al-Quran",
        navMisi: "Missions",
        navNews: "Education",
        navDoa: "Prayers",
        navAsmaulHusna: "Asmaul Husna",
        navKalender: "Calendar",
        navKiblat: "Qibla Direction",
        shortcutTitle: "Quick Access",
        shortcutDesc: "Main features for your daily worship.",
        shortcutQuranDesc: "Read Uthmani & Translations",
        shortcutSholatDesc: "Accurate Auto Times (GPS)",
        shortcutMisiDesc: "Collect Good Deed Points",
        shortcutNewsDesc: "Daily Islamic Articles",
        shortcutDoaDesc: "Curated Prayers & Hadiths",
        shortcutAsmaulHusnaDesc: "The 99 Names of Allah",
        shortcutKalenderDesc: "Islamic Dates & Events",
        shortcutKiblatDesc: "Sensor Kaaba Compass",
        btnRead: "Read Now",
        btnPlay: "Start Playing",
        dashboardPrayerTitle: "Today's Prayer Times",
        dashboardPrayerDesc: "Live prayer times based on your GPS location.",
        dashboardPrayerGps: "Live GPS",
        dashboardPrayerNoGps: "Enable GPS",
        dashboardContinueTitle: "Continue Reading",
        dashboardContinueDesc: "The last Ayah you bookmarked.",
        dashboardContinueTracker: "Tracker",
        dashboardContinueSurahLabel: "Last Read (Surah)",
        dashboardContinueJuzLabel: "Last Read (Juz)",
        dashboardContinueSurah: "Surah",
        dashboardContinueAyah: "Ayah",
        dashboardContinueEmpty: "No bookmarks yet.",
        dashboardTipsTitle: "Daily Wisdom",
        dashboardTipsDesc: "Inspirational quotes to start your day.",
        qhubTitle: "Reading Al-Quran",
        qhubDesc: "Choose your preferred reading mode today.",
        qhubSurah: "By Surah",
        qhubSurahDesc: "List of 114 Surahs to perfect your memorization.",
        qhubJuz: "By Juz",
        qhubJuzDesc: "List of 30 Juz for continuous reciting.",
        doaPageTitle: "Prayers & Adhkar",
        doaPageDesc: "Collection of daily prayers, supplications, and selected hadiths.",
        doaSource: "Source:",
        gamesTitle: "Daily Missions & Trivia",
        gamesDesc: "Collect virtual rewards by completing today's Islamic challenges.",
        gamesPoints: "Reward Points",
        newsTitle: "Articles & Education",
        newsDesc: "Curated articles on Fiqh, history, and Islamic insights.",
        sholatTitle: "Prayer Times",
        sholatDesc: "Precise times based on your actual location.",
        sholatLocation: "Your current location",
        sholatGpsBtn: "Use My GPS",
        backPrev: "Previous",
        backNext: "Next",
        loading: "Loading...",
        error: "An error occurred."
    }
};

interface LanguageContextType {
    lang: Language;
    toggleLang: () => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>("ID");

    const toggleLang = () => {
        setLang((prev) => (prev === "ID" ? "EN" : "ID"));
    };

    const t = translations[lang];

    return (
        <LanguageContext.Provider value={{ lang, toggleLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
