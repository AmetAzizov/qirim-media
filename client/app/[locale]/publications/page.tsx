// 'use client';
//
// import React, {useEffect, useState} from 'react';
// import BreadCrumbs from '../components/common/BreadCrumbs';
// import Link from 'next/link';
// import {getPublications} from '../lib/newsPosts';
// import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';
//
// const News = () => {
//     const [newsPosts, setNewsPosts] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [hasMore, setHasMore] = useState<boolean>(true);
//
//     useEffect(() => {
//         const fetchNewsPosts = async () => {
//             try {
//                 const allNewsPosts = await getPublications();
//                 const filteredPosts = allNewsPosts.filter(
//                     (newsPost: any) => newsPost.categoryList === 'Публікації'
//                 );
//
//                 setTimeout(() => {
//                     setNewsPosts(filteredPosts);
//                     setLoading(false);
//                 }, 300);
//             } catch (error) {
//                 console.error('Error fetching news posts:', error);
//                 setLoading(false);
//             }
//         };
//
//         fetchNewsPosts();
//     }, []);
//
//     return (
//         <section className={'px-4 mb-14 lg:mb-36'}>
//             <div className={'max-w-[1479px] mx-auto my-0'}>
//                 <BreadCrumbs />
//                 <h2 className={'title-text pb-9'}>Публікації</h2>
//                 <div className={'pt-6'}>
//                     {loading ? (
//                         <ul
//                             className={
//                                 'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
//                             }
//                         >
//                             {Array.from({length: 5}).map((_, index) => (
//                                 <li key={index}>
//                                     <NewsSkeletonLoader />
//                                 </li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <ul
//                             className={
//                                 'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
//                             }
//                         >
//                             {newsPosts.length > 0 ? (
//                                 newsPosts.map((newsPost: any) => (
//                                     <li key={newsPost.slug}>
//                                         <Link
//                                             className={'hover:opacity-50'}
//                                             href={`news/${newsPost.slug}`}
//                                         >
//                                             <div
//                                                 style={{
//                                                     background: `url(${newsPost.image})`,
//                                                     backgroundPosition: 'center',
//                                                     backgroundSize: 'cover',
//                                                     backgroundRepeat: 'no-repeat',
//                                                     width: '100%',
//                                                     height: '190.5px',
//                                                     borderRadius: '12px'
//                                                 }}
//                                             ></div>
//                                             <button
//                                                 className={
//                                                     'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
//                                                 }
//                                             >
//                                                 {newsPost.categoryList}
//                                             </button>
//                                             <p
//                                                 className={
//                                                     'text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'
//                                                 }
//                                             >
//                                                 {newsPost.title}
//                                             </p>
//                                             <time
//                                                 className={
//                                                     'text-sm font-medium text-[--secondary-color-2]'
//                                                 }
//                                             >
//                                                 {newsPost.date}
//                                             </time>
//                                         </Link>
//                                     </li>
//                                 ))
//                             ) : (
//                                 <li>Публікації не знайдені</li>
//                             )}
//                         </ul>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default News;
//


'use client';

import React, {useEffect, useState} from 'react';
import BreadCrumbs from '../components/common/BreadCrumbs';
import Link from 'next/link';
import {getPublications} from '../lib/newsPosts';
import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';

const Publications = () => {
    const [newsPosts, setNewsPosts] = useState<any[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const limit = 30;

    const fetchNews = async (start: number) => {
        const allNews = await getPublications();
        const filtered = allNews.filter(
            (newsPost: any) => newsPost.categoryList === 'Публікації'
        );
        return filtered.slice(start, start + limit);
    };

    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            const initialPosts = await fetchNews(0);
            setNewsPosts(initialPosts);
            setOffset(limit);
            setHasMore(initialPosts.length === limit);
            setLoading(false);
        };
        fetchInitial();
    }, []);

    const loadMoreNews = async () => {
        setLoadingMore(true);
        const scrollPosition = window.scrollY;
        const morePosts = await fetchNews(offset);

        if (morePosts.length > 0) {
            setNewsPosts(prev => [...prev, ...morePosts]);
            setOffset(prev => prev + limit);
            setHasMore(morePosts.length === limit);
        } else {
            setHasMore(false);
        }

        setLoadingMore(false);
        window.scrollTo(0, scrollPosition);
    };

    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <BreadCrumbs/>
                <h2 className={'title-text pb-9'}>Публікації</h2>
                <div className={'pt-6'}>
                    <ul
                        className={
                            'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
                        }
                    >
                        {loading
                            ? Array.from({length: 15}).map((_, index) => (
                                <li key={index}>
                                    <NewsSkeletonLoader/>
                                </li>
                            ))
                            : newsPosts.map((newsPost: any) => (
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
                            ))}
                        {loadingMore &&
                            Array.from({length: 5}).map((_, index) => (
                                <li key={`loading-${index}`}>
                                    <NewsSkeletonLoader/>
                                </li>
                            ))}
                    </ul>
                    {hasMore && !loading && (
                        <button
                            onClick={loadMoreNews}
                            disabled={loading || loadingMore}
                            className={
                                'flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
                            }
                        >
                            {loadingMore ? 'Завантаження...' : 'Більше новин'}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Publications;
