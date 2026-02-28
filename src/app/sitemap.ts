import { MetadataRoute } from 'next';
import { tataCaraGuides } from '@/lib/tataCaraData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://daril.id';

    // Core static routes
    const staticRoutes = [
        '',
        '/about',
        '/quran',
        '/quran/juz',
        '/sholat',
        '/news',
        '/games',
        '/kalender',
        '/kiblat',
        '/tata-cara',
        '/asmaul-husna',
        '/tracker',
        '/khatam',
        '/tahajjud',
        '/privacy-policy',
        '/terms-conditions',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic Surah Routes (1 to 114)
    const surahRoutes = Array.from({ length: 114 }, (_, i) => i + 1).map((id) => ({
        url: `${baseUrl}/quran/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Dynamic Juz Routes (1 to 30)
    const juzRoutes = Array.from({ length: 30 }, (_, i) => i + 1).map((id) => ({
        url: `${baseUrl}/quran/juz/${id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Dynamic Tata Cara Routes
    const tataCaraRoutes = tataCaraGuides.map((guide) => ({
        url: `${baseUrl}/tata-cara/${guide.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [...staticRoutes, ...surahRoutes, ...juzRoutes, ...tataCaraRoutes];
}
