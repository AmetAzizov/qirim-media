import SwipeBlogCard from '@/app/blogs/SwipeBlogCard';
import {getBlogs} from '@/app/lib/newsPosts';
import React from 'react';

export default async function MainBlogs() {
    const blogs = await getBlogs();
    return (
        <section className={'px-4'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <SwipeBlogCard blogs={blogs} />
            </div>
        </section>
    );
}
