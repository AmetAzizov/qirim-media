// import NewsItemServer from './NewsItemServer';
// import NewsItemClient from './NewsItemClient';
import Breadcrumbs from '../components/common/BreadCrumbs';
import React from 'react';
import Link from 'next/link';
import {getNewsPosts} from '../lib/newsPosts';
import Image from 'next/image';

export default async function News({searchParams}: any) {
    const page = parsePageParam(searchParams.page);
    const newsPosts = await getNewsPosts(0, page);
    console.log('[ReviewsPage] rendering:', page);
    return (
        // <NewsItemClient>
        //     <NewsItemServer />
        // </NewsItemClient>
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                {/* <Breadcrumbs /> */}
                <h2 className={'title-text pb-9'}>Всi новини</h2>
                <div className={'flex gap-2.5'}>
                    <button
                        className={
                            'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'
                        }
                    >
                        Публікації
                    </button>
                    <button
                        className={
                            'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'
                        }
                    >
                        Новини України та світу
                    </button>
                    <button
                        className={
                            'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'
                        }
                    >
                        Крим
                    </button>
                    <button
                        className={
                            'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'
                        }
                    >
                        Інтервю
                    </button>
                    <button
                        className={
                            'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'
                        }
                    >
                        Блоги
                    </button>
                    <button
                        className={
                            'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'
                        }
                    >
                        Відео
                    </button>
                </div>
                {/* <div className={'inline-block'} onClick={() => setPickerVisible(!isPickerVisible)}>
                    <div
                        className={
                            'inline-flex items-center rounded-md cursor-pointer lg:bg-[--secondary-color-4] lg:py-2.5 lg:px-4'
                        }
                    >
                        <span className={'bg-[#D9EDFC] p-2.5 rounded-md'}>
                            <Image src='/calendar.svg' width={20} height={20} alt='Calendar' />
                        </span>
                        {selectedDate ? (
                            <span className='hidden text-sm font-medium ml-2.5 lg:block'>
                                {selectedDate.toLocaleDateString()}
                            </span>
                        ) : (
                            <span className='hidden text-sm font-medium ml-2.5 lg:block'>
                                Виберiть дату
                            </span>
                        )}
                    </div>
                    {isPickerVisible && (
                        <div onClick={(e: any) => e.stopPropagation()}>
                            <DatePicker
                                selected={selectedDate}
                                onChange={date => {
                                    setSelectedDate(date);
                                    setPickerVisible(false);
                                }}
                                inline
                            />
                        </div>
                    )}
                </div> */}
                <div className={'pt-6'}>
                    <ul
                        className={
                            'grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
                        }
                    >
                        {newsPosts.map((newsPost: any) => (
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
                                    {/* <Image
                                        src={`${newsPost.image}`}
                                        width={300}
                                        height={500}
                                        alt={'yellow-arrow'}
                                        className={''}
                                    /> */}
                                    <button
                                        className={
                                            'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
                                        }
                                    >
                                        Новини України
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
                        ))}
                    </ul>
                    <Link
                        href={`/news?page=${page + 20}`}
                        className={
                            'flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
                        }
                    >
                        Бiльше новин
                    </Link>
                </div>
            </div>
        </section>
    );
}

function parsePageParam(paramValue: any) {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 30;
}
