import type { Metadata } from "next";
import { Inter, Playfair_Display, Amiri, Aref_Ruqaa } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Chatbot from "@/components/chat/Chatbot";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/context/LanguageContext";
import { AccessibilityProvider } from "@/context/AccessibilityContext";
import { QuranAudioProvider } from "@/context/QuranAudioContext";
import AudioPlayer from "@/components/quran/AudioPlayer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const amiri = Amiri({
  variable: "--font-amiri",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

const ruqaa = Aref_Ruqaa({
  variable: "--font-ruqaa",
  weight: ["400", "700"],
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Daril - Modern Islamic Gateway",
  description: "Platform Islami premium untuk membaca Al-Quran, melihat Jadwal Sholat akurat, Asmaul Husna audio, dan gamifikasi ibadah harian.",
  keywords: ["Al-Quran Online", "Jadwal Sholat", "Arah Kiblat", "Asmaul Husna", "Kalender Hijriah", "Artikel Islam", "Daril", "Islamic App"],
  authors: [{ name: "Daril" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://daril.id", // Assuming production URL
    title: "Daril - Modern Islamic Gateway",
    description: "Platform Islami premium untuk membaca Al-Quran, melihat Jadwal Sholat akurat, Asmaul Husna audio, dan gamifikasi ibadah harian.",
    siteName: "Daril",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daril - Modern Islamic Gateway",
    description: "Platform Islami premium untuk membaca Al-Quran, melihat Jadwal Sholat akurat, Asmaul Husna audio, dan gamifikasi ibadah harian.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.variable} ${playfair.variable} ${amiri.variable} ${ruqaa.variable} antialiased bg-white text-black font-sans selection:bg-black selection:text-white`}>
        {/* Global JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Daril - Modern Islamic Gateway",
              "url": "https://daril.id",
              "description": "Platform Islami premium untuk membaca Al-Quran, melihat Jadwal Sholat akurat, Asmaul Husna audio, dan gamifikasi ibadah harian.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://daril.id/quran?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        <LanguageProvider>
          <AccessibilityProvider>
            <QuranAudioProvider>
              <div className="flex flex-col min-h-screen">
                {children}
                <Footer />
              </div>
              <Chatbot />
              <AudioPlayer />
            </QuranAudioProvider>
          </AccessibilityProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
