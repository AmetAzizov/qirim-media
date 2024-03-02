import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Articles from '../common/Articles';
import '@/app/styles/main-news.scss';
import {getNewsPosts} from '@/app/lib/newsPosts';

const date = new Date();
const day = date.getDate();
const months = [
    'cічня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червеня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня'
];
const month = months[date.getMonth()];

export default async function TodayNews() {
    const newsPosts = await getNewsPosts(0, 7);
    return (
        <section className={'px-4 my-11 lg:my-24'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <h2 className={'title-text mb-9'}>
                    Сьогоднi,{' '}
                    <span className={'font-normal'}>
                        {day} {month}
                    </span>
                </h2>
                <div className='flex justify-between'>
                    <div className={'grid grid-cols-1 max-w-[972px] gap-11 md:grid-cols-2 xl:mr-5'}>
                        <Link
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
                                className='rounded-t-md w-full min-h-[217px] md:rounded-l-md md:rounded-tr-none md:h-full md:max-w-[466px]'
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
                                    Новини України
                                </button>
                                <p
                                    className={
                                        'text-lg font-medium mb-2.5 text-clip line-clamp-3 lg:text-xl lg:mb-8'
                                    }
                                >
                                    {newsPosts[0].title}
                                </p>
                                <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                                    {newsPosts[0].date}
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
                                        'rounded-xl max-w-[120px] w-[100rem] max-h-[86px] h-[100rem] md:w-[100vw] md:max-h-[126px] md:max-w-[169px]'
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
                                        Новини України
                                    </button>
                                    <p
                                        className={
                                            'text-sm font-medium text-clip line-clamp-3 lg:text-base my-2.5'
                                        }
                                    >
                                        {newsPost.title}
                                    </p>
                                    <time
                                        className={'text-xs font-medium text-[--secondary-color-2]'}
                                    >
                                        {newsPost.date}
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
