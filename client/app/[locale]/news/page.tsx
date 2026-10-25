import {Suspense} from 'react';
import { getCurrentLocale } from '@/app/[locale]/utils/getCurrentLocale';
import {getNewsPosts, NEWS_PAGE_LIMIT} from '@/app/[locale]/lib/newsPosts';
import NewsPostsClient from './NewsPostsClient'

export default async function NewsPage({searchParams}: {searchParams?: {category?: string}}) {
    const locale = getCurrentLocale();
    const category = searchParams?.category || 'Всі';

    // Первая порция грузится на сервере: карточки и <img priority> попадают в HTML,
    // а запрос к CMS кэшируется Next (revalidate), а не уходит из браузера каждый раз
    const initialPosts = await getNewsPosts(
        0,
        NEWS_PAGE_LIMIT,
        category === 'Всі' ? null : category,
        null,
        locale
    );

    return (
        <Suspense>
            <NewsPostsClient locale={locale} initialPosts={initialPosts} initialCategory={category} />
        </Suspense>
    );
}
