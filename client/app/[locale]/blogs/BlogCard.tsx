'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useTranslations} from "next-intl";

const BlogCard = ({blog}: any) => {
    const t =  useTranslations();
    return (
        <div
            className={`h-[272px] flex flex-col justify-between w-full p-5 bg-[--secondary-color-4] rounded-lg sm:max-w-[340px]`}
        >
            <button
                className={
                    'w-fit text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl'
                }
            >
                {t('categories.blogs')}
            </button>
            <h2
                className={
                    'text-base font-medium text-clip line-clamp-4 lg:text-lg lg:line-clamp-2'
                }
            >
                {blog.title}
            </h2>
            <div className={`flex items-center mt-2`}>
                <Image
                    src={`${blog.image}`}
                    width={45}
                    height={45}
                    alt='author'
                    className='rounded-full h-[45px] object-cover object-top'
                />
                <p className={`text-sm text-clip line-clamp-1 font-medium ml-4`}>{blog.authorBlog}</p>
            </div>
            <div className={'flex items-center justify-between'}>
                <time className={'text-xs font-medium text-[--secondary-color-2] sm:text-sm'}>
                    {blog.dateTime}
                </time>
                <Link href={`blogs/${blog.slug}`} className={'bg-[#F0CA56] px-3.5 py-2 rounded-md'}>
                    {t('common.read')}
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
