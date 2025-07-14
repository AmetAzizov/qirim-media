import { getCurrentLocale } from '@/app/[locale]/utils/getCurrentLocale';
import NewsPostsClient from './NewsPostsClient'

export default async function NewsPage() {
    const locale = getCurrentLocale();
    return <NewsPostsClient locale={locale} />;
}











// 'use client';
//
// import React, {useState, useEffect} from 'react';
// import DatePicker, {registerLocale} from 'react-datepicker';
// import DateIcon from '@/public/date-picker.svg'
// import {format} from 'date-fns';
// import uk from 'date-fns/locale/uk';
// import 'react-datepicker/dist/react-datepicker.css';
// import BreadCrumbs from '../components/common/BreadCrumbs';
// import Link from 'next/link';
// import {getNewsPosts} from '../../[locale]/lib/newsPosts';
// import CategoryBtn from '../components/common/CategoryBtn';
// import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';
// import CustomInput from "@/app/[locale]/components/common/CustomDatePicker";
// import {getCurrentLocale} from "@/app/[locale]/utils/getCurrentLocale";
//
// registerLocale('uk', uk);
//
// export default function News() {
//     // const locale = getCurrentLocale();
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//     const [newsPosts, setNewsPosts] = useState<any[]>([]);
//     const [offset, setOffset] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [loadingMore, setLoadingMore] = useState<boolean>(false);
//     const [category, setCategory] = useState<string>('Всі');
//     const [hasMore, setHasMore] = useState<boolean>(true);
//     const limit = 30;
//
//     const fetchNews = async (
//         start: number,
//         selectedCategory: string,
//         selectedDate: Date | null
//     ) => {
//         const formattedDate = selectedDate ? format(selectedDate, 'yyyy-MM-dd') : null;
//
//         const posts = await getNewsPosts(
//             start,
//             limit,
//             selectedCategory === 'Всі' ? null : selectedCategory,
//             formattedDate,
//             // locale
//         );
//
//         return posts;
//     };
//
//     useEffect(() => {
//         const fetchInitialNews = async () => {
//             setLoading(true);
//             const initialPosts = await fetchNews(0, category, selectedDate);
//             setNewsPosts(initialPosts);
//             setOffset(limit);
//             setHasMore(initialPosts.length === limit);
//             setLoading(false);
//         };
//
//         fetchInitialNews();
//     }, [category, selectedDate]);
//
//     const loadMoreNews = async () => {
//         setLoadingMore(true);
//         const scrollPosition = window.scrollY;
//         const newPosts = await fetchNews(offset, category, selectedDate);
//
//         if (newPosts.length > 0) {
//             setNewsPosts(prevPosts => [...prevPosts, ...newPosts]);
//             setOffset(prevOffset => prevOffset + limit);
//             setHasMore(newPosts.length === limit);
//         } else {
//             setHasMore(false);
//         }
//
//         setLoadingMore(false);
//         window.scrollTo(0, scrollPosition);
//     };
//
//     return (
//         <section className={'px-4 mb-14 lg:mb-36'}>
//             <div className={'max-w-[1479px] mx-auto my-0'}>
//                 <BreadCrumbs/>
//                 <h2 className={'title-text pb-9'}>Всi новини</h2>
//
//                 <div className='flex flex-nowrap gap-36 mb-6 items-center'>
//                     <CategoryBtn setCategory={setCategory}/>
//                     <div
//                          className="flex items-center cursor-pointer"
//                     >
//                         <DatePicker
//                             selected={selectedDate}
//                             onChange={(date: Date) => setSelectedDate(date)}
//                             dateFormat="dd.MM.yyyy"
//                             placeholderText="Оберіть дату"
//                             locale="uk"
//                             className=" border-none text-sm text-black color"
//                             isClearable
//                             customInput={<CustomInput />}
//                         />
//                     </div>
//                 </div>
//                 <div className={'pt-6'}>
//                     <ul className={
//                         'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
//                     }>
//                         {loading
//                             ? Array.from({length: 15}).map((_, index) => (
//                                 <li key={index}>
//                                     <NewsSkeletonLoader/>
//                                 </li>
//                             ))
//                             : newsPosts.map(newsPost => (
//                                 <li key={newsPost.slug}>
//                                     <Link
//                                         className='flex flex-col justify-between items-start h-full hover:opacity-50'
//                                         href={`news/${newsPost.slug}`}
//                                     >
//                                         <div
//                                             style={{
//                                                 background: `url(${newsPost.image})`,
//                                                 backgroundPosition: 'center',
//                                                 backgroundSize: 'cover',
//                                                 backgroundRepeat: 'no-repeat',
//                                                 width: '100%',
//                                                 height: '190.5px',
//                                                 borderRadius: '12px'
//                                             }}
//                                         ></div>
//                                         <button
//                                             className='text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
//                                         >
//                                             {newsPost.categoryList}
//                                         </button>
//                                         <p className='text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'>
//                                             {newsPost.title}
//                                         </p>
//                                         {/*<time className='text-sm font-medium text-[--secondary-color-2]'>*/}
//                                         {/*    {newsPost.dateTime}*/}
//                                         {/*</time>*/}
//                                     </Link>
//                                 </li>
//                             ))}
//                         {loadingMore &&
//                             Array.from({length: 5}).map((_, index) => (
//                                 <li key={index}>
//                                     <NewsSkeletonLoader/>
//                                 </li>
//                             ))}
//                     </ul>
//                     {hasMore && (
//                         <button
//                             onClick={loadMoreNews}
//                             disabled={loading || loadingMore}
//                             className='flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
//                         >
//                             {loading || loadingMore ? 'Завантаження...' : 'Бiльше новин'}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }
