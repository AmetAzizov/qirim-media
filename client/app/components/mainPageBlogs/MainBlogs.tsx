import BtnCreateBlog from '@/app/blogs/BtnCreateBlog';
import SwipeBlogCard from '@/app/blogs/SwipeBlogCard';
import {getBlogs} from '@/app/lib/newsPosts';
import React from 'react';

export default async function MainBlogs() {
    const blogs = await getBlogs();
    return (
        <section className={'pl-4'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <div className={'flex items-center justify-between mb-9 pr-4'}>
                    <h2 className={'title-text'}>Блоги</h2>
                    <BtnCreateBlog />
                </div>
                <SwipeBlogCard blogs={blogs} />
            </div>
        </section>
    );
}
