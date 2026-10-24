import {NextResponse} from 'next/server';
import {fetchBlogs, fetchNewsPosts} from '@/app/[locale]/lib/fetch';

// Возвращает slug перевода новости/блога на другой язык (Strapi i18n: поле localizations).
export async function GET(req: Request) {
    const sp = new URL(req.url).searchParams;
    const type = sp.get('type');
    const slug = sp.get('slug');
    const from = sp.get('from');
    const to = sp.get('to');

    if (!slug || !from || !to || (type !== 'news' && type !== 'blogs')) {
        return NextResponse.json({slug: null}, {status: 400});
    }

    const fetcher = type === 'news' ? fetchNewsPosts : fetchBlogs;
    const {data} = await fetcher({
        filters: {slug: {$eq: slug}},
        fields: ['slug', 'locale'],
        populate: {localizations: {fields: ['slug', 'locale']}},
        pagination: {pageSize: 1},
        locale: from
    });

    const localized = data?.[0]?.localizations?.find((l: any) => l.locale === to);
    return NextResponse.json({slug: localized?.slug ?? null});
}
