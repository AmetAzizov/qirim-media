// NewsItem.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsItem = ({newsPost, href}: any) => {
    return (
        <Link
            href={href}
            className={
                'flex items-center flex-col justify-between xl:items-start xl:justify-normal'
            }
        >
            <Image
                className={
                    'rounded-xl w-full h-[185px] object-cover sm:h-[245px] md:h-[300px] lg:h-[370px] xl:min-h-[190px] xl:h-[190px]'
                }
                src={`${newsPost.image}`}
                width={254}
                height={200}
                alt='news-pic'
            />
            <div className={''}>
                <button
                    className={
                        'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
                    }
                >
                    {newsPost.categoryList}
                </button>
                <p
                    className={
                        'text-sm font-medium text-clip line-clamp-3 lg:text-base my-2.5 lg:my-2.5'
                    }
                >
                    {newsPost.title}
                </p>
                <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                    {newsPost.date}
                </time>
            </div>
        </Link>
    );
};

export default NewsItem;
