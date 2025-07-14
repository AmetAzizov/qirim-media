import ModalBlog from '../components/common/ModalBlog';
import BlogCard from './BlogCard';
import BreadCrumbs from '../components/common/BreadCrumbs';
import Authors from './Authors';
import {getBlogs} from '@/app/[locale]/lib/newsPosts';
import {getTranslations} from "next-intl/server";
import Link from 'next/link';
import Image from 'next/image';
import BtnCreateBlog from './BtnCreateBlog';
import {getCurrentLocale} from "@/app/[locale]/utils/getCurrentLocale";

export default async function Blogs() {
    const locale = getCurrentLocale();
    const blogs = await getBlogs(locale);
    const t = await getTranslations('common');

    const normalizeString = (str: string) => {
        return str
            .trim()
            .toLowerCase()
            .replace(/[^a-zа-яё0-9]/gi, '');
    };

    const uniqueAuthors = Array.from(
        blogs
            .reduce((map: Map<string, any>, blog: any) => {
                const normalizedAuthor = normalizeString(blog.authorBlog);
                if (!map.has(normalizedAuthor)) {
                    map.set(normalizedAuthor, blog);
                }
                return map;
            }, new Map())
            .values()
    );

    return (
        <section className={'px-4 mb-20 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <BreadCrumbs />
                <div
                    className={
                        'flex flex-wrap items-center justify-center p-4 mb-10 mx-auto bg-[#D9EDFC] rounded-md lg:p-10 lg:mb-14 lg:justify-between'
                    }
                >
                    <h3 className={'text-lg font-semibold lg:text-2xl mb-10 lg:mb-0 lg:mr-5'}>
                        {t('expressOpinion1')}<br/>{t('expressOpinion2')}
                    </h3>
                    <BtnCreateBlog />
                </div>
                <div
                    className={
                        'grid gap-y-4 w-full lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-10 lg:gap-y-10'
                    }
                >
                    {blogs.map((blog: any) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}

                    <div
                        className={
                            'hidden lg:block max-w-[339px] bg-[--secondary-color-4] h-full rounded-lg grid-blog py-7 px-4'
                        }
                    >
                        <h2 className={'block title-text mb-9'}>Автори</h2>
                        <div className={'grid grid-cols-3 gap-x-2.5 gap-y-5'}>
                            {uniqueAuthors.map((blog: any) => (
                                <Authors key={blog.slug} blog={blog} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
