'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';
import {getPublications} from "@/app/[locale]/lib/newsPosts";
import Image from "next/image";

const limit = 30;

const PublicationsClient = ({initialPosts, locale}: { initialPosts: any[], locale?: string }) => {
    const [newsPosts, setNewsPosts] = useState(initialPosts);
    const [offset, setOffset] = useState(initialPosts.length);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(initialPosts.length === limit);

    const loadMoreNews = async () => {
        setLoadingMore(true);
        const morePosts = await getPublications(offset, limit, locale);

        if (morePosts.length > 0) {
            setNewsPosts(prev => [...prev, ...morePosts]);
            setOffset(prev => prev + limit);
            setHasMore(morePosts.length === limit);
        } else {
            setHasMore(false);
        }

        setLoadingMore(false);
    };

    return (
        <>
            <ul className="grid grid-cols-1 gap-4 min-[425ыpx]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5">
                {newsPosts.map((newsPost: any) => (
                    <li key={newsPost.slug}>
                        <Link className="flex flex-col justify-between items-start h-full hover:opacity-50" href={`news/${newsPost.slug}`}>
                            <Image
                                src={`${newsPost.image}`}
                                alt={newsPost.title}
                                width={500}
                                height={190}
                                className="w-full h-[190.5px] object-cover rounded-[12px]"
                            />
                            {/*<div*/}
                            {/*    style={{*/}
                            {/*        background: `url(${newsPost.image})`,*/}
                            {/*        backgroundPosition: 'center',*/}
                            {/*        backgroundSize: 'cover',*/}
                            {/*        backgroundRepeat: 'no-repeat',*/}
                            {/*        width: '100%',*/}
                            {/*        height: '190.5px',*/}
                            {/*        borderRadius: '12px'*/}
                            {/*    }}*/}
                            {/*/>*/}
                            <button
                                className="text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4">
                                {newsPost.categoryList}
                            </button>
                            <p className="text-sm font-medium line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4">
                                {newsPost.title}
                            </p>
                            <time className="text-sm font-medium text-[--secondary-color-2]">
                                {newsPost.dateTime}
                            </time>
                        </Link>
                    </li>
                ))}
                {loadingMore &&
                    Array.from({length: 5}).map((_, index) => (
                        <li key={`loading-${index}`}>
                            <NewsSkeletonLoader/>
                        </li>
                    ))}
            </ul>
            {hasMore && (
                <button
                    onClick={loadMoreNews}
                    disabled={loadingMore}
                    className="flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6"
                >
                    {loadingMore ? 'Завантаження...' : 'Більше новин'}
                </button>
            )}
        </>
    );
};

export default PublicationsClient;