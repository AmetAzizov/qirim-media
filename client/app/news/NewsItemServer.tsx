import React from 'react';
import Link from 'next/link';
import {getNewsPosts} from '../lib/newsPosts';

export default async function NewsItemServer() {
    const newsPosts = await getNewsPosts(0, 50);
    console.log('ReviewsPage reviews:', newsPosts);
    return (
        <>
            {newsPosts.map((newsPost: any) => (
                <li key={newsPost.slug}>
                    <Link className={'hover:opacity-50'} href={`news/${newsPost.slug}`}>
                        <div
                            style={{
                                background: `url(${newsPost.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                                height: '190.5px',
                                borderRadius: '12px'
                            }}
                        ></div>
                        <p
                            className={
                                'text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'
                            }
                        >
                            {newsPost.title}
                        </p>
                        <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                            {newsPost.date}
                        </time>
                    </Link>
                </li>
            ))}
        </>
    );
}