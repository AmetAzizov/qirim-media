import ReactMarkdown from 'react-markdown';
import Breadcrumbs from '@/app/components/common/BreadCrumbs';
import SwipeBlogCard from '@/app/blogs/SwipeBlogCard';
import Articles from '@/app/components/common/Articles';
import {notFound} from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {getBlogs, getBlog, getMainNews} from '@/app/lib/newsPosts';
import '../../styles/react-markdown.scss';
import MainNewsItem from '@/app/components/mainPageNews/MainNewsItem';
// import MainBlogs from '@/app/components/mainPageBlogs/MainBlogs';

// interface NewsSlugParams {
//     slug: string;
// }

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function BlogsSlug({params: {slug}}: any) {
    const blogs = await getBlogs();
    const blog = await getBlog(slug);
    const mainNewsPosts = await getMainNews(0, 9);
    if (!blog) {
        notFound();
    }
    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <Breadcrumbs />
                <div className={'flex justify-between gap-x-10'}>
                    <aside className={'hidden xl:block lg:max-w-[337px]'}>
                        <Articles />
                    </aside>
                    <div className={'xl:max-w-[1012px] w-full'}>
                        <div>
                            <div>
                                <time
                                    className={'text-base font-medium text-[--secondary-color-5]'}
                                >
                                    {blog.dateTime}
                                </time>
                                <span
                                    className={
                                        'text-base font-medium text-[--secondary-color-5] ml-8'
                                    }
                                >
                                    {blog.authorBlog}
                                </span>
                            </div>
                            <h2
                                className={
                                    'text-2xl font-semibold my-6 lg:text-5xl lg:font-medium lg:my-9'
                                }
                            >
                                {blog.title}
                            </h2>
                            {/* <Image
                                src={`${blog.image}`}
                                width={1012}
                                height={582}
                                alt='mainnews-id'
                                className={
                                    'w-full h-[217px] sm:h-[350px] md:h-[400px] lg:h-[582px] rounded-lg'
                                }
                            /> */}
                            <div className={'text-lg font-semibold my-6 lg:text-4xl lg:my-9'}>
                                {blog.subtitle}
                            </div>
                            <ReactMarkdown
                                className={
                                    'react-markdown text-base font-medium mb-9 space-y-9 lg:text-2xl'
                                }
                            >
                                {blog.text}
                            </ReactMarkdown>
                            <div>
                                <time
                                    className={'text-base font-medium text-[--secondary-color-5]'}
                                >
                                    {blog.dateTime}
                                </time>
                            </div>
                        </div>
                        <div className={'mt-16'}>
                            <h3 className={'text-2xl font-bold mb-9'}>Читайте також:</h3>
                            <ul>
                                {blogs.map((blog: any) => (
                                    <li key={blog.id} className='flex items-center mb-8'>
                                        <span
                                            className={
                                                'w-[9px] min-w-[9px] h-[8px] bg-[--primary-color] rounded-[50%] mr-6'
                                            }
                                        ></span>
                                        <Link
                                            href={`${blog.slug}`}
                                            className={
                                                'text-base font-semibold text-[--primary-color-5] lg:text-lg'
                                            }
                                        >
                                            {blog.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className='flex flex-col justify-between items-center p-4 my-11 bg-[--secondary-color-4] rounded-lg md:flex-row lg:p-11 lg:my-24'>
                            <div>
                                <h2 className={'text-2xl font-semibold lg:text-4xl mb-2.5'}>
                                    Читайте новини в телеграмi
                                </h2>
                                <p className={'text-base font-normal'}>
                                    Актуальнi новини Украiни та свiту
                                </p>
                            </div>
                            <Link
                                href={'https://t.me/qirimnews'}
                                target='_blank'
                                className={'flex items-center bg-[#D9EDFC] px-4 py-2.5 rounded-md'}
                            >
                                <Image
                                    className={'lg:w-[30px] h-[30px]'}
                                    src='/u_telegram.svg'
                                    width={25}
                                    height={25}
                                    alt='telegram'
                                />
                                <p className={'text-sm font-medium ml-2.5'}>Підписатись</p>
                            </Link>
                        </div>
                        {/* <div className={'my-11 lg:my-24'}><SwipeBlogCard /></div> */}
                        {/* <MainBlogs /> */}
                        <div className={'flex items-center justify-between mb-9'}>
                            <h2 className={'title-text'}>Головнi новини</h2>
                            <Link
                                href={'/news'}
                                className={
                                    'font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:text-base'
                                }
                            >
                                Бiльше новин
                            </Link>
                        </div>
                        <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'}>
                            {mainNewsPosts.slice(1).map((newsPost: any) => (
                                <MainNewsItem key={newsPost.id} newsPost={newsPost} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
