import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Sasuke.id - Modern Islamic Gateway',
        short_name: 'Sasuke.id',
        description: 'Platform Islami premium untuk membaca Al-Quran, melihat Jadwal Sholat akurat, Asmaul Husna audio, dan gamifikasi ibadah harian.',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
}
