import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import NewsItem from '@/app/news/NewsItemServer';

const MainNews = () => {
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
                        'grid gap-4 lg:grid-cols-5 lg:grid-rows-2 lg:gap-6 lg:max-h-[689px] h-full'
                    }
                >
                    <Link
                        href={'#'}
                        className={'item-left w-full rounded-xl bg-slate-600 lg:h-auto'}
                    >
                        <Image
                            src='/main-news.png'
                            width={290}
                            height={217}
                            alt='main news'
                            className='lg:w-full'
                        />
                        <div
                            className={
                                'flex flex-col items-start bg-[--secondary-color-4] p-2.5 lg:p-4'
                            }
                        >
                            <p className={'text-lg font-medium mb-2.5 lg:text-xl lg:mb-8'}>
                                У Зеленського пояснили, який сигнал від НАТО отримала Україна на
                                саміті у Вільнюсі
                            </p>
                            <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                10 Липня 2023
                            </time>
                        </div>
                    </Link>
                    {/* <NewsItem key={'id'} />
                    <NewsItem key={'id'} />
                    <NewsItem key={'id'} />
                    <NewsItem key={'id'} />
                    <NewsItem key={'id'} />
                    <NewsItem key={'id'} /> */}
                </div>
            </div>
        </section>
    );
};

export default MainNews;
