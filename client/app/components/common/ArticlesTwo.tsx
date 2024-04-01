import React from 'react';
import Link from 'next/link';
import {getNewsPosts} from '../../lib/newsPosts';

// type ArticlesProps = {
//     title: string;
//     date: any;
// };

export default async function ArticlesTwo() {
    const articles = await getNewsPosts(0, 20);
    // console.log('ReviewsPage reviews:', articles);
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
                            {article.date}
                        </time>
                    </Link>
                </article>
            ))}
        </>
    );
}
