import React from 'react';
import Link from 'next/link';
import {getNewsPosts} from '@/app/[locale]/lib/newsPosts';

interface Props {
    locale: string;
}

export default async function ArticlesTwo({locale}: Props) {
    const articles = await getNewsPosts(0, 20, null, null, locale);

    return (
        <>
            {articles.map((article: any) => (
                <article
                    key={article.slug}
                    className={'border-b-[1px] border-solid border-[--secondary-color-3] py-4'}
                >
                    <Link className={'hover:text-[--accent-color]'} href={`/news/${article.slug}`}>
                        <p className={'text-base font-medium text-clip line-clamp-3 mb-5'}>
                            {article.title}
                        </p>
                        <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                            {article.dateTime}
                        </time>
                    </Link>
                </article>
            ))}
        </>
    );
}
