import BtnCreateBlog from '@/app/[locale]/blogs/BtnCreateBlog';
import SwipeBlogCard from '@/app/[locale]/blogs/SwipeBlogCard';
import {getBlogs} from '@/app/[locale]/lib/newsPosts';
import React from 'react';
import {getTranslations} from "next-intl/server";
import {getCurrentLocale} from "@/app/[locale]/utils/getCurrentLocale";

export default async function MainBlogs() {
    const locale = getCurrentLocale()
    const blogs = await getBlogs(locale);
    const t = await  getTranslations('categories')
    const customStyle = {
        paddingTop: 10,
        paddingBottom: 10,
    };
    return (
        <section className={'pl-4'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <div className={'flex items-center justify-between mb-9 pr-4'}>
                    <h2 className={'title-text'}>{t('blogs')}</h2>
                    <BtnCreateBlog customStyle={customStyle}/>
                </div>
                <SwipeBlogCard blogs={blogs}/>
            </div>
        </section>
    );
}
