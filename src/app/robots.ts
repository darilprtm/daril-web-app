import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/'], // Hide admin CMS from crawlers
        },
        sitemap: 'https://daril.id/sitemap.xml',
    };
}
