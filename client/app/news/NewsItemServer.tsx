import React from 'react';
import Link from 'next/link';
import {getNewsPosts} from '../lib/newsPosts';
import Image from 'next/image';

export default async function NewsItemServer({params}: any) {
    const newsPosts = await getNewsPosts(0, 50);
    // const limit = parsePageParam(searchParams.limit)
    // console.log('[NewsItemServer] rendering:', params);
    return (
        <>
            {/* <Link href='news/?page=2'>btn</Link> */}
            {newsPosts.map((newsPost: any) => (
                <li key={newsPost.slug}>
                    <Link className={'hover:opacity-50'} href={`news/${newsPost.slug}`}>
                        <div
                            style={{
                                backgroundImage: `url(${newsPost.image})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                width: '100%',
                                height: '190.5px',
                                borderRadius: '12px'
                            }}
                        ></div>
                        <button
                            className={
                                'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
                            }
                        >
                            Новини України
                        </button>
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
