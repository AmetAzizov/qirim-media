import type {MetadataRoute} from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [{userAgent: '*', allow: '/', disallow: ['/api/', '/search']}],
        sitemap: 'https://qirim.news/sitemap.xml',
        host: 'https://qirim.news'
    };
}
