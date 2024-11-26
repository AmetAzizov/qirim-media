// import BreadCrumbs from '../components/common/BreadCrumbs';
// import React from 'react';
// import Link from 'next/link';
// import {getNewsPosts} from '../lib/newsPosts';

// export default async function News({searchParams}: any) {
//     const page = parsePageParam(searchParams.page);
//     const allNewsPosts = await getNewsPosts(0, page);
//     const newsPosts = allNewsPosts.filter(
//         (newsPost: any) => newsPost.categoryList === 'Публікації'
//     );

//     return (
//         <section className={'px-4 mb-14 lg:mb-36'}>
//             <div className={'max-w-[1479px] mx-auto my-0'}>
//                 <BreadCrumbs />
//                 <h2 className={'title-text pb-9'}>Публікації</h2>
//                 <div className={'pt-6'}>
//                     <ul
//                         className={
//                             'grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
//                         }
//                     >
//                         {newsPosts.map((newsPost: any) => (
//                             <li key={newsPost.slug}>
//                                 <Link className={'hover:opacity-50'} href={`news/${newsPost.slug}`}>
//                                     <div
//                                         style={{
//                                             background: `url(${newsPost.image})`,
//                                             backgroundPosition: 'center',
//                                             backgroundSize: 'cover',
//                                             backgroundRepeat: 'no-repeat',
//                                             width: '100%',
//                                             height: '190.5px',
//                                             borderRadius: '12px'
//                                         }}
//                                     ></div>
//                                     {/* <Image
//                                         src={`${newsPost.image}`}
//                                         width={300}
//                                         height={500}
//                                         alt={'yellow-arrow'}
//                                         className={''}
//                                     /> */}
//                                     <button
//                                         className={
//                                             'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
//                                         }
//                                     >
//                                         {newsPost.categoryList}
//                                     </button>
//                                     <p
//                                         className={
//                                             'text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'
//                                         }
//                                     >
//                                         {newsPost.title}
//                                     </p>
//                                     <time
//                                         className={'text-sm font-medium text-[--secondary-color-2]'}
//                                     >
//                                         {newsPost.date}
//                                     </time>
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//         </section>
//     );
// }

// function parsePageParam(paramValue: any) {
//     if (paramValue) {
//         const page = parseInt(paramValue);
//         if (isFinite(page) && page > 0) {
//             return page;
//         }
//     }
//     return 30;
// }

'use client'

import React, { useEffect, useState } from 'react';
import BreadCrumbs from '../components/common/BreadCrumbs';
import Link from 'next/link';
import { getNewsPosts } from '../lib/newsPosts';

const News = () => {
    const [newsPosts, setNewsPosts] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNewsPosts = async () => {
            try {
                const allNewsPosts = await getNewsPosts(0, 30); // Замените на нужное значение, если нужно
                const filteredPosts = allNewsPosts.filter(
                    (newsPost: any) => newsPost.categoryList === 'Публікації'
                );
                setNewsPosts(filteredPosts);
            } catch (error) {
                console.error('Error fetching news posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsPosts();
    }, []);

    // if (loading) {
    //     return <p>Loading...</p>; // Можно заменить на компонент скелетона или другой индикатор загрузки
    // }

    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <BreadCrumbs />
                <h2 className={'title-text pb-9'}>Публікації</h2>
                <div className={'pt-6'}>
                    <ul
                        className={
                            'grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
                        }
                    >
                        {newsPosts.length > 0 ? (
                            newsPosts.map((newsPost: any) => (
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
                                            className={'text-sm font-medium text-[--secondary-color-2]'}
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
                </div>
            </div>
        </section>
    );
};

export default News;
