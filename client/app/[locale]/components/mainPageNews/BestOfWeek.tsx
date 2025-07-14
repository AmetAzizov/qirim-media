import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {getBestOfWeek} from "@/app/[locale]/lib/getBestOfWeek";
import '../../styles/main-news.scss';
import {getTranslations} from "next-intl/server";
import {getCurrentLocale} from "@/app/[locale]/utils/getCurrentLocale";

export default async function BestOfWeek() {
    const locale = getCurrentLocale();
    const newsPosts = await getBestOfWeek(0, 13, locale);
    const t = await getTranslations('common')
    console.log(newsPosts);

    return (
        <section className={'px-4 my-11 lg:my-24'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <div className={'flex items-center justify-between mb-9'}>
                    <h2 className={'title-text'}>{t('bestOfWeek')}</h2>
                    <Link
                        href={'/news'}
                        className={
                            'font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:text-base'
                        }
                    >
                        {t('moreNews')}
                    </Link>
                </div>

                <div
                    className={
                        'grid grid-rows-13 lg:grid-cols-3 lg:grid-rows-5 lg:gap-10 lg:h-[797px]'
                    }
                >
                    <Link
                        href={`news/${newsPosts[0].slug}`}
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url(${newsPosts[0].image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className={
                            'item-big-top flex items-end w-full h-[296px] rounded-xl p-4 lg:h-auto'
                        }
                    >
                        <div className={'flex flex-col'}>
                            <button
                                className={
                                    'text-xs w-fit font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 mb-2.5 rounded-2xl'
                                }
                            >
                                {newsPosts[0].categoryList}
                            </button>
                            <h2
                                className={
                                    'text-base font-medium text-[--background-color] text-clip line-clamp-2'
                                }
                            >
                                {newsPosts[0].title}
                            </h2>
                            <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                {newsPosts[0].dateTime}
                            </time>
                        </div>
                    </Link>
                    {newsPosts.slice(2).map((newsPost: any) => (
                        <Link
                            key={newsPost.id}
                            href={`news/${newsPost.slug}`}
                            className={
                                'flex items-center flex-row-reverse justify-between xl:justify-normal xl:flex-row'
                            }
                        >
                            <Image
                                className={
                                    'rounded-xl object-cover max-w-[120px] w-[100rem] h-[86px] md:w-[100vw] md:h-[126px] md:max-w-[169px]'
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
                                        'text-sm font-medium text-clip line-clamp-3 lg:text-base my-2.5 lg:my-4'
                                    }
                                >
                                    {newsPost.title}
                                </p>
                                <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                    {newsPost.dateTime}
                                </time>
                            </div>
                        </Link>
                    ))}
                    <Link
                        href={`news/${newsPosts[1].slug}`}
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url(${newsPosts[1].image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className={
                            'item-big-bottom flex items-end w-full h-[296px] rounded-xl p-4 lg:h-auto'
                        }
                    >
                        <div className={'flex flex-col'}>
                            <button
                                className={
                                    'text-xs w-fit font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 mb-2.5 rounded-2xl'
                                }
                            >
                                {newsPosts[1].categoryList}
                            </button>
                            <h2
                                className={
                                    'text-base font-medium text-[--background-color] text-clip line-clamp-2'
                                }
                            >
                                {newsPosts[1].title}
                            </h2>
                            <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                {newsPosts[1].dateTime}
                            </time>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
