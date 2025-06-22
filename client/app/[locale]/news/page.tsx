'use client';
import React, {useState, useEffect} from 'react';
import DatePicker from 'react-datepicker';
import BreadCrumbs from '../components/common/BreadCrumbs';
import Link from 'next/link';
import {getNewsPosts} from '../../[locale]/lib/newsPosts';
import CategoryBtn from '../components/common/CategoryBtn';
import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';

export default function News() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [newsPosts, setNewsPosts] = useState<any[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('Всі');
    const [hasMore, setHasMore] = useState<boolean>(true);
    const limit = 30;

    const fetchNews = async (start: number, selectedCategory: string ) => {
        const posts = await getNewsPosts(
            start,
            limit,
            selectedCategory === 'Всі' ? null : selectedCategory
        );
        return posts;
    };

    useEffect(() => {
        const fetchInitialNews = async () => {
            setLoading(true);
            const initialPosts = await fetchNews(0, category);
            setNewsPosts(initialPosts);
            setOffset(limit);
            setHasMore(initialPosts.length === limit);
            setLoading(false);
        };

        fetchInitialNews();
    }, [category]);

    const loadMoreNews = async () => {
        setLoadingMore(true);
        const scrollPosition = window.scrollY;
        const newPosts = await fetchNews(offset, category);

        if (newPosts.length > 0) {
            setNewsPosts(prevPosts => [...prevPosts, ...newPosts]);
            setOffset(prevOffset => prevOffset + limit);
            setHasMore(newPosts.length === limit);
        } else {
            setHasMore(false);
        }

        setLoadingMore(false);
        window.scrollTo(0, scrollPosition);
    };

    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <BreadCrumbs/>
                <h2 className={'title-text pb-9'}>Всi новини</h2>
                <div className={'flex'}>
                    <CategoryBtn setCategory={setCategory}/>
                </div>
                <div className={'pt-6'}>
                    <ul
                        className={
                            'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
                        }
                    >
                        {loading
                            ? Array.from({length: 15}).map((_, index) => (
                                <li key={index}>
                                    <NewsSkeletonLoader/>
                                </li>
                            ))
                            : newsPosts.map((newsPost: any) => (
                                <li key={newsPost.slug}>
                                    <Link
                                        className={
                                            'flex flex-col justify-between items-start h-full hover:opacity-50'
                                        }
                                        href={`news/${newsPost.slug}`}
                                    >
                                        <div
                                            style={{
                                                background: `url(${newsPost.image})`,
                                                backgroundPosition: 'center',
                                                backgroundSize: 'cover',
                                                backgroundRepeat: 'no-repeat',
                                                width: '100%',
                                                height: '190.5px',
                                                borderRadius: '12px'
                                            }}
                                        ></div>
                                        <button
                                            className={
                                                'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
                                            }
                                        >
                                            {newsPost.categoryList}
                                        </button>
                                        <p
                                            className={
                                                'text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'
                                            }
                                        >
                                            {newsPost.title}
                                        </p>
                                        <time
                                            className={
                                                'text-sm font-medium text-[--secondary-color-2]'
                                            }
                                        >
                                            {newsPost.date}
                                        </time>
                                    </Link>
                                </li>
                            ))}
                        {loadingMore &&
                            Array.from({length: 5}).map((_, index) => (
                                <li key={index}>
                                    <NewsSkeletonLoader/>
                                </li>
                            ))}
                    </ul>
                    {hasMore && (
                        <button
                            onClick={loadMoreNews}
                            disabled={loading || loadingMore}
                            className={
                                'flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
                            }
                        >
                            {loading || loadingMore ? 'Завантаження...' : 'Бiльше новин'}
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}



// 'use client';
// import React, {useState, useEffect} from 'react';
// import DatePicker from 'react-datepicker';
// import BreadCrumbs from '../components/common/BreadCrumbs';
// import Link from 'next/link';
// import {getNewsPosts} from '../lib/newsPosts';
// import CategoryBtn from '../components/common/CategoryBtn';
// import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';
// import {translateText} from '../utils/deepL'; // Импортируйте вашу функцию перевода

// export default function News() {
//     const [newsPosts, setNewsPosts] = useState<any[]>([]);
//     const [offset, setOffset] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [loadingMore, setLoadingMore] = useState<boolean>(false);
//     const [category, setCategory] = useState<string>('Всі');
//     const [hasMore, setHasMore] = useState<boolean>(true);
//     const [translatedText, setTranslatedText] = useState<string>(''); // Состояние для переведенного текста
//     const limit = 30;

//     const fetchNews = async (start: number, selectedCategory: string) => {
//         const posts = await getNewsPosts(
//             start,
//             limit,
//             selectedCategory === 'Всі' ? null : selectedCategory
//         );
//         return posts;
//     };

//     useEffect(() => {
//         const fetchInitialNews = async () => {
//             setLoading(true);
//             const initialPosts = await fetchNews(0, category);
//             setNewsPosts(initialPosts);
//             setOffset(limit);
//             setHasMore(initialPosts.length === limit);
//             setLoading(false);
//         };

//         fetchInitialNews();
//     }, [category]);

//     const loadMoreNews = async () => {
//         setLoadingMore(true);
//         const scrollPosition = window.scrollY;
//         const newPosts = await fetchNews(offset, category);

//         if (newPosts.length > 0) {
//             setNewsPosts(prevPosts => [...prevPosts, ...newPosts]);
//             setOffset(prevOffset => prevOffset + limit);
//             setHasMore(newPosts.length === limit);
//         } else {
//             setHasMore(false);
//         }

//         setLoadingMore(false);
//         window.scrollTo(0, scrollPosition);
//     };

//     const handleTranslate = async () => {
//         const contentToTranslate = newsPosts
//             .map(
//                 post => `
//             Заголовок: ${post.title}
//             Дата: ${post.date}
//             Категория: ${post.categoryList}
//         `
//             )
//             .join('\n');

//         try {
//             const result = await translateText(contentToTranslate, 'EN');
//             setTranslatedText(result);
//         } catch (error) {
//             console.error('Translation error:', error);
//         }
//     };

//     return (
//         <section className={'px-4 mb-14 lg:mb-36'}>
//             <div className={'max-w-[1479px] mx-auto my-0'}>
//                 <BreadCrumbs />
//                 <h2 className={'title-text pb-9'}>Всi новини</h2>
//                 <div className={'flex'}>
//                     <CategoryBtn setCategory={setCategory} />
//                 </div>
//                 <div className={'pt-6'}>
//                     <ul
//                         className={
//                             'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
//                         }
//                     >
//                         {loading
//                             ? Array.from({length: 15}).map((_, index) => (
//                                   <li key={index}>
//                                       <NewsSkeletonLoader />
//                                   </li>
//                               ))
//                             : newsPosts.map((newsPost: any) => (
//                                   <li key={newsPost.slug}>
//                                       <Link
//                                           className={
//                                               'flex flex-col justify-between items-start h-full hover:opacity-50'
//                                           }
//                                           href={`news/${newsPost.slug}`}
//                                       >
//                                           <div
//                                               style={{
//                                                   background: `url(${newsPost.image})`,
//                                                   backgroundPosition: 'center',
//                                                   backgroundSize: 'cover',
//                                                   backgroundRepeat: 'no-repeat',
//                                                   width: '100%',
//                                                   height: '190.5px',
//                                                   borderRadius: '12px'
//                                               }}
//                                           ></div>
//                                           <button
//                                               className={
//                                                   'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
//                                               }
//                                           >
//                                               {newsPost.categoryList}
//                                           </button>
//                                           <p
//                                               className={
//                                                   'text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'
//                                               }
//                                           >
//                                               {newsPost.title}
//                                           </p>
//                                           <time
//                                               className={
//                                                   'text-sm font-medium text-[--secondary-color-2]'
//                                               }
//                                           >
//                                               {newsPost.date}
//                                           </time>
//                                       </Link>
//                                   </li>
//                               ))}
//                         {loadingMore &&
//                             Array.from({length: 5}).map((_, index) => (
//                                 <li key={index}>
//                                     <NewsSkeletonLoader />
//                                 </li>
//                             ))}
//                     </ul>
//                     {hasMore && (
//                         <button
//                             onClick={loadMoreNews}
//                             disabled={loading || loadingMore}
//                             className={
//                                 'flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
//                             }
//                         >
//                             {loading || loadingMore ? 'Завантаження...' : 'Бiльше новин'}
//                         </button>
//                     )}
//                 </div>
//                 <button
//                     onClick={handleTranslate}
//                     className={'mt-4 bg-blue-500 text-white px-4 py-2 rounded'}
//                 >
//                     Translate All News to English
//                 </button>
//                 {translatedText && (
//                     <div className={'mt-6'}>
//                         <h3 className={'text-xl font-bold'}>Translated News:</h3>
//                         <pre className={'whitespace-pre-wrap'}>{translatedText}</pre>
//                     </div>
//                 )}
//             </div>
//         </section>
//     );
// }


// 'use client';
//
// import React, {useState, useEffect} from 'react';
// import DatePicker from 'react-datepicker';
// import BreadCrumbs from '../components/common/BreadCrumbs';
// import Link from 'next/link';
// import {getNewsPosts} from '../../[locale]/lib/newsPosts';
// import CategoryBtn from '../components/common/CategoryBtn';
// import NewsSkeletonLoader from '../components/common/NewsSkeletonLoader';
// import 'react-datepicker/dist/react-datepicker.css';
//
// export default function News() {
//     const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//     const [newsPosts, setNewsPosts] = useState<any[]>([]);
//     const [offset, setOffset] = useState<number>(0);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [loadingMore, setLoadingMore] = useState<boolean>(false);
//     const [category, setCategory] = useState<string>('Всі');
//     const [hasMore, setHasMore] = useState<boolean>(true);
//     const limit = 30;
//
//     const fetchNews = async (start: number, selectedCategory: string, date: Date | null) => {
//         const formattedDate = date ? date.toISOString().split('T')[0] : null;
//
//         const posts = await getNewsPosts(
//             start,
//             limit,
//             selectedCategory === 'Всі' ? null : selectedCategory,
//             formattedDate
//         );
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
//                 <div className={'flex flex-col lg:flex-row gap-4 items-start lg:items-center'}>
//                     <CategoryBtn setCategory={setCategory}/>
//                     <DatePicker
//                         selected={selectedDate}
//                         onChange={(date) => setSelectedDate(date)}
//                         placeholderText="Оберіть дату"
//                         className="border px-3 py-2 rounded-md text-sm"
//                         dateFormat="yyyy-MM-dd"
//                         isClearable
//                     />
//                 </div>
//
//                 <div className={'pt-6'}>
//                     <ul
//                         className={
//                             'grid grid-cols-1 gap-4 min-[375px]:grid-cols-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
//                         }
//                     >
//                         {loading
//                             ? Array.from({length: 15}).map((_, index) => (
//                                 <li key={index}>
//                                     <NewsSkeletonLoader/>
//                                 </li>
//                             ))
//                             : newsPosts.map((newsPost: any) => (
//                                 <li key={newsPost.slug}>
//                                     <Link
//                                         className={
//                                             'flex flex-col justify-between items-start h-full hover:opacity-50'
//                                         }
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
//                                             className={
//                                                 'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
//                                             }
//                                         >
//                                             {newsPost.categoryList}
//                                         </button>
//                                         <p
//                                             className={
//                                                 'text-sm font-medium text-clip line-clamp-4 lg:text-base my-2.5 lg:line-clamp-3 lg:my-4'
//                                             }
//                                         >
//                                             {newsPost.title}
//                                         </p>
//                                         <time
//                                             className={
//                                                 'text-sm font-medium text-[--secondary-color-2]'
//                                             }
//                                         >
//                                             {newsPost.date}
//                                         </time>
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
//                             className={
//                                 'flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
//                             }
//                         >
//                             {loading || loadingMore ? 'Завантаження...' : 'Бiльше новин'}
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </section>
//     );
// }
