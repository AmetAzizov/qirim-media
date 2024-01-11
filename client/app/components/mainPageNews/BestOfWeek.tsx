import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {getNewsPosts} from '@/app/lib/newsPosts';
import '../../styles/main-news.scss';

export default async function BestOfWeek() {
    const newsPosts = await getNewsPosts(0, 13);

    return (
        <section className={'px-4 ml-11 lg:ml-0 lg:my-24'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <div className={'flex items-center justify-between mb-9'}>
                    <h2 className={'title-text'}>Найкраще за тиждень</h2>
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
                        'grid grid-rows-13 lg:grid-cols-3 lg:grid-rows-5 lg:gap-10 lg:h-[797px]'
                    }
                >
                    <Link
                        href={`news/${newsPosts.slug}`}
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url(${newsPosts.image})`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className={'item-big-top flex items-end w-full rounded-xl p-4 lg:h-auto'}
                    >
                        <div className={'flex flex-col'}>
                            <h2
                                className={
                                    'text-base font-medium text-[--background-color] text-clip line-clamp-2'
                                }
                            >
                                {newsPosts.title}
                            </h2>
                            <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                12.11.23
                            </time>
                        </div>
                    </Link>
                    {newsPosts.slice(2).map((newsPost: any) => (
                        <Link
                            key={newsPost.slug}
                            href={`news/${newsPost.slug}`}
                            className={
                                'flex items-center flex-row-reverse justify-between xl:flex-row'
                            }
                        >
                            <Image
                                className={
                                    'rounded-xl max-w-[144px] w-full h-full md:max-h-[126px] md:max-w-[169px]'
                                }
                                src={`${newsPost.image}`}
                                width={169}
                                height={126}
                                alt='news-pic'
                            />
                            <div className={'pr-5 xl:pr-0 xl:pl-5'}>
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
                    <Link
                        href={`news/${newsPosts.slug}`}
                        style={{
                            backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url('/main-news.png')`,
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                        className={'item-big-bottom flex items-end w-full rounded-xl p-4 lg:h-auto'}
                    >
                        <div className={'flex flex-col'}>
                            <h2
                                className={
                                    'text-base font-medium text-[--background-color] text-clip line-clamp-2'
                                }
                            >
                                З нейтральної до недружньої або Як Росія образилась на Туреччину
                                через підтримку України
                            </h2>
                            <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                10 Липня 2023
                            </time>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
