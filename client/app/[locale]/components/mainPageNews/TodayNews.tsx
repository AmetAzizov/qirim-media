import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Articles from '../common/Articles';
import '../../styles/main-news.scss';
import TodayNewsDate from '../common/TodayNewsDate';
// import {getTranslations} from "next-intl/server";
import {getCurrentLocale} from "@/app/[locale]/utils/getCurrentLocale";
import {getTodayNews} from "@/app/[locale]/lib/getTodayNews";

export default async function TodayNews() {
    const locale = getCurrentLocale();
    // const start = 0;
    // const limit = 7;
    const newsPosts = await getTodayNews(0, 7, locale);
    // const t = await getTranslations('common')

    return (
        <section className={'px-4 my-11 lg:my-24'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <TodayNewsDate />
                <div className='flex justify-between'>
                    <div className={'grid grid-cols-1 max-w-[972px] gap-11 md:grid-cols-2 xl:mr-5'}>
                        <Link
                            key={newsPosts.slug}
                            href={`news/${newsPosts[0].slug}`}
                            className={
                                'item-top flex flex-col rounded-xl md:flex-row md:max-h-[350px]'
                            }
                        >
                            <Image
                                src={`${newsPosts[0].image}`}
                                width={290}
                                height={217}
                                alt='main news'
                                className='rounded-t-md w-full min-h-[217px] object-cover md:rounded-l-md md:rounded-tr-none md:h-full md:max-w-[466px]'
                            />
                            <div
                                className={
                                    'flex flex-col items-start justify-between bg-[--secondary-color-4] p-2.5 lg:p-4 lg:w-full xl:p-6'
                                }
                            >
                                <button
                                    className={
                                        'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl'
                                    }
                                >
                                    {newsPosts[0].categoryList}
                                </button>
                                <p
                                    className={
                                        'text-lg font-medium my-5 text-clip line-clamp-3 lg:text-xl'
                                    }
                                >
                                    {newsPosts[0].title}
                                </p>
                                <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                    {newsPosts[0].dateTime}
                                </time>
                            </div>
                        </Link>
                        {newsPosts.slice(1).map((newsPost: any) => (
                            <Link
                                key={newsPost.id}
                                href={`news/${newsPost.slug}`}
                                className={
                                    'flex items-center flex-row-reverse justify-between xl:justify-normal xl:flex-row'
                                }
                            >
                                <Image
                                    className={
                                        'rounded-xl max-w-[120px] w-[100rem] max-h-[86px] h-[100rem] object-cover md:w-[100vw] md:max-h-[126px] md:max-w-[169px]'
                                    }
                                    src={`${newsPost.image}`}
                                    width={169}
                                    height={126}
                                    alt='news-pic'
                                />
                                <div className={'pr-5 xl:pr-0 xl:pl-5'}>
                                    <button
                                        className={
                                            'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl'
                                        }
                                    >
                                        {newsPost.categoryList}
                                    </button>
                                    <p
                                        className={
                                            'text-sm font-medium text-clip line-clamp-3 lg:text-base my-2.5'
                                        }
                                    >
                                        {newsPost.title}
                                    </p>
                                    <time
                                        className={'text-xs font-medium text-[--secondary-color-2] xl:text-sm'}
                                    >
                                        {newsPost.dateTime}
                                    </time>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <aside className={'hidden xl:block lg:max-w-[464px]'}>
                        <Articles />
                    </aside>
                </div>
            </div>
        </section>
    );
}
