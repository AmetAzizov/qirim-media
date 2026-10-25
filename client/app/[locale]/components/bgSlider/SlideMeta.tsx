import React from 'react';
import Image from 'next/image';

const SlideMeta = ({post}: {post: any}) => (
    <div className='flex flex-wrap items-center gap-x-3 gap-y-2'>
        <span className='text-xs font-medium text-[--secondary-color] bg-[#DBDBDB26] px-4 py-2.5 rounded'>
            {post.categoryList}
        </span>
        <span aria-hidden className='w-1 h-1 rounded-full bg-[--background-color] opacity-70' />
        <time className='text-sm font-medium text-[--background-color]'>{post.dateTime}</time>
        <span aria-hidden className='w-1 h-1 rounded-full bg-[--background-color] opacity-70' />
        <span className='flex items-center gap-x-1.5 text-sm font-medium text-[--background-color]'>
            <Image src='/u_eye.svg' width={20} height={17} alt='' className='invert' />
            {post.views}
        </span>
    </div>
);

export default SlideMeta;
