import type {MetadataRoute} from 'next';
import {getSlugs} from '@/app/[locale]/lib/newsPosts';

const SITE_URL = 'https://qirim.news';
const PAGES = ['', '/news', '/publications', '/blogs', '/partners'];

const withLocale = (path: string, locale: 'uk' | 'en') =>
    `${SITE_URL}${locale === 'uk' ? '' : '/en'}${path}`;

const alternates = (path: string) => ({
    languages: {uk: withLocale(path, 'uk'), en: withLocale(path, 'en')}
});

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let slugs: string[] = [];
    try {
        slugs = await getSlugs(1000);
    } catch {
        slugs = [];
    }

    const pages = PAGES.map(path => ({
        url: withLocale(path, 'uk'),
        changeFrequency: 'hourly' as const,
        priority: path === '' ? 1 : 0.7,
        alternates: alternates(path)
    }));

    const news = slugs.map(slug => ({
        url: withLocale(`/news/${slug}`, 'uk'),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: alternates(`/news/${slug}`)
    }));

    return [...pages, ...news];
}
