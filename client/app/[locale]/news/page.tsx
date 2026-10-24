import {Suspense} from 'react';
import { getCurrentLocale } from '@/app/[locale]/utils/getCurrentLocale';
import NewsPostsClient from './NewsPostsClient'

export default async function NewsPage() {
    const locale = getCurrentLocale();
    return (
        <Suspense>
            <NewsPostsClient locale={locale} />
        </Suspense>
    );
}
