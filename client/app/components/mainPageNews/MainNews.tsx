import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {getMainNews} from '@/app/lib/newsPosts';

export default async function MainNews() {
    const newsPosts = await getMainNews(0, 7);

    return (
        <section className={'px-4'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <div className={'flex items-center justify-between mb-9'}>
                    <h2 className={'title-text'}>Головнi новини</h2>
                    <Link
                        href={'/news'}
                        className={
                            'font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:text-base'
                        }
                    >
                        Бiльше новин
                    </Link>
                </div>

                <div
                    className={
                        'grid gap-4 grid-cols-2 xl:grid-cols-5 xl:grid-rows-2 xl:gap-6 xl:max-h-[689px] xl:h-full'
                    }
                >
                    <Link
                        key={newsPosts.slug}
                        href={`news/${newsPosts[0].slug}`}
                        className={'item-left w-full rounded-xl bg-[--secondary-color-4] lg:h-auto'}
                    >
                        <Image
                            className='w-full min-h-[217px] rounded-t-xl sm:min-h-[439px] lg:min-h-[639px] xl:min-h-[475px]'
                            src={`${newsPosts[0].image}`}
                            width={290}
                            height={217}
                            alt='main news'
                        />
                        <div
                            className={
                                'flex flex-col items-start bg-[--secondary-color-4] p-2.5 lg:p-4'
                            }
                        >
                            <p className={'text-lg font-medium mb-2.5 lg:text-xl lg:mb-8'}>
                                {newsPosts[0].title}
                            </p>
                            <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                {newsPosts[0].date}
                            </time>
                        </div>
                    </Link>
                    {newsPosts.slice(1).map((newsPost: any) => (
                        <Link
                            key={newsPost.slug}
                            href={`news/${newsPost.slug}`}
                            className={
                                'flex items-center flex-col justify-between'
                            }
                        >
                            <Image
                                className={
                                    'rounded-xl w-full h-[185px] sm:h-[245px] md:h-[300px] lg:h-[370px] xl:h-[190px]'
                                }
                                src={`${newsPost.image}`}
                                width={254}
                                height={200}
                                alt='news-pic'
                            />
                            <div className={''}>
                                <p
                                    className={
                                        'text-sm font-medium text-clip line-clamp-3 lg:text-base my-2.5 lg:my-4'
                                    }
                                >
                                    {newsPost.title}
                                </p>
                                <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                    {newsPost.date}
                                </time>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
