// NewsItem.js
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const NewsItem = ({newsPost}) => {
    return (
        <Link
            href={`news/${newsPost.slug}`}
            className={'flex items-center flex-col justify-between'}
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
    );
};

export default NewsItem;
