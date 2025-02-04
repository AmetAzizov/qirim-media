'use client';

import React, {useEffect, useState} from 'react';
import BreadCrumbs from '../components/common/BreadCrumbs';
import Link from 'next/link';
import {getPublications} from '../lib/newsPosts';
import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';

const News = () => {
    const [newsPosts, setNewsPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNewsPosts = async () => {
            try {
                const allNewsPosts = await getPublications();
                const filteredPosts = allNewsPosts.filter(
                    (newsPost: any) => newsPost.categoryList === 'Публікації'
                );

                setTimeout(() => {
                    setNewsPosts(filteredPosts);
                    setLoading(false);
                }, 300);
            } catch (error) {
                console.error('Error fetching news posts:', error);
                setLoading(false);
            }
        };

        fetchNewsPosts();
    }, []);

    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <BreadCrumbs />
                <h2 className={'title-text pb-9'}>Публікації</h2>
                <div className={'pt-6'}>
                    {loading ? (
                        <ul
                            className={
                                'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
                            }
                        >
                            {Array.from({length: 5}).map((_, index) => (
                                <li key={index}>
                                    <NewsSkeletonLoader />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul
                            className={
                                'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
                            }
                        >
                            {newsPosts.length > 0 ? (
                                newsPosts.map((newsPost: any) => (
                                    <li key={newsPost.slug}>
                                        <Link
                                            className={'hover:opacity-50'}
                                            href={`news/${newsPost.slug}`}
                                        >
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
                                            <button
                                                className={
                                                    'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
                                                }
                                            >
                                                {newsPost.categoryList}
                                            </button>
                                            <p
                                                className={
                                                    'text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'
                                                }
                                            >
                                                {newsPost.title}
                                            </p>
                                            <time
                                                className={
                                                    'text-sm font-medium text-[--secondary-color-2]'
                                                }
                                            >
                                                {newsPost.date}
                                            </time>
                                        </Link>
                                    </li>
                                ))
                            ) : (
                                <li>Публікації не знайдені</li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default News;
