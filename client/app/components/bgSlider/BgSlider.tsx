// 'use client';

// import React, {useState, useRef, useCallback, memo} from 'react';
// import ReactMarkdown from 'react-markdown';
// import useSWR from 'swr';
// import Slider from 'react-slick';
// import Image from 'next/image';
// import Link from 'next/link';
// import Arrows from '../common/Arrows';
// import formatDateWithMonthName from '../../lib/newsPosts';
// import '../../styles/react-markdown.scss';
// import CategoryBtn from '../common/CategoryBtn';

// const fetcher = (url: string) => fetch(url).then(res => res.json());
// const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// const OptimizedArrows = React.memo(Arrows);

// const BgSlider = () => {
//     const [currentSlide, setCurrentSlide] = useState(0);
//     const sliderRef = useRef(null);
//     const {data, error} = useSWR(
//         `${apiUrl}/news-posts?filters[mainSlider][$eq]=true&pagination[start]=0&pagination[limit]=4&sort=createdAt:desc&populate=image`,
//         fetcher
//     );
//     const getNextSlides = useCallback(
//         (current: number) => {
//             let nextSlides = [];
//             let count = 0;
//             let i = current + 1;
//             while (count < 3) {
//                 if (i >= data.data.length) i = 0;
//                 nextSlides.push(data.data[i]);
//                 i++;
//                 count++;
//             }
//             return nextSlides;
//         },
//         [data]
//     );

//     if (error)
//         return (
//             <div className={'hidden h-[100vh] lg:flex items-center justify-center text-xl'}>
//                 Данних не отримано, якась помилка спробуйте ще раз
//             </div>
//         );
//     if (!data)
//         return (
//             <div className={'hidden h-[100vh] lg:flex items-center justify-center text-xl'}>
//                 Завантаження...
//             </div>
//         );

//     // console.log('Data received:', data);

//     const settings = {
//         fade: true,
//         swipe: false,
//         arrows: false,
//         infinite: true,
//         cssEase: 'linear',
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         adaptiveHeight: true,
//         autoplay: true,
//         autoplaySpeed: 10000,
//         speed: 1000,
//         beforeChange: (_current: number, next: number) => {
//             setCurrentSlide(next);
//         }
//     };

//     const customStyle = {
//         color: '#DBDBDB',
//         background: 'rgba(219, 219, 219, 0.15)'
//     };

//     return (
//         <div
//             className={'hidden lg:justify-center lg:px-4 lg:h-[100vh] lg:flex'}
//             style={{
//                 backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${data.data[
//                     currentSlide
//                 ].attributes.image?.data?.map((img: any) => img.attributes.url)})`,
//                 backgroundPosition: 'center',
//                 backgroundSize: 'cover',
//                 backgroundRepeat: 'no-repeat'
//             }}
//         >
//             <div
//                 className={
//                     'flex items-center justify-center xl:justify-between xl:max-w-[1479px] w-full'
//                 }
//             >
//                 <Slider ref={sliderRef} {...settings} className={'flex-2 w-full xl:w-[66%] z-[1]'}>
//                     {data.data.map((item: any) => (
//                         <div
//                             key={item.attributes.slug}
//                             className={'w-full max-w-[850px] text-left'}
//                         >
//                             <Link href={`/news/${data.data[currentSlide].attributes.slug}`}>
//                                 {/* <CategoryBtn customStyle={customStyle} /> */}
//                                 <h2
//                                     className={
//                                         'text-2xl font-bold text-[--background-color] text-clip line-clamp-3 my-7 xl:line-clamp-2 xl:text-4xl'
//                                     }
//                                 >
//                                     {item.attributes.title}
//                                 </h2>
//                                 {/* <Image
//                                             src={'/yellow-arrow.svg'}
//                                             width={30}
//                                             height={30}
//                                             alt={'yellow-arrow'}
//                                             className={''}
//                                         /> */}

//                                 <ReactMarkdown
//                                     className={
//                                         'react-markdown text-base font-medium text-[--background-color] max-w-[593px] text-clip line-clamp-2 xl:line-clamp-3'
//                                     }
//                                 >
//                                     {item.attributes.subtitle}
//                                 </ReactMarkdown>
//                             </Link>
//                             <OptimizedArrows sliderRef={sliderRef} />
//                         </div>
//                     ))}
//                 </Slider>
//                 <div className={'hidden xl:w-[30%] xl:block'}>
//                     {getNextSlides(currentSlide).map(slide => (
//                         <div key={slide.attributes.slug}>
//                             <Link
//                                 href={`news/${slide.attributes.slug}`}
//                                 className={
//                                     'flex items-center justify-start bg-[--background-color] h-[129px] rounded-lg p-2.5 mb-2.5'
//                                 }
//                             >
//                                 <Image
//                                     src={`${slide.attributes.image?.data?.map(
//                                         (img: any) => img.attributes.url
//                                     )}`}
//                                     width={108}
//                                     height={108}
//                                     alt={slide.attributes.title}
//                                     className={
//                                         'max-w-[108px] w-full h-full rounded-lg object-cover object-center'
//                                     }
//                                 />
//                                 <div className={'flex flex-col ml-3.5'}>
//                                     <span
//                                         className={
//                                             'text-sm font-medium my-2.5 text-clip line-clamp-3'
//                                         }
//                                         style={{flex: '1'}}
//                                     >
//                                         {slide.attributes.title}
//                                     </span>
//                                     <time
//                                         className={'text-sm font-medium text-[--secondary-color-2]'}
//                                     >
//                                         {formatDateWithMonthName(slide.attributes.publishedAt)}
//                                     </time>
//                                 </div>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default BgSlider;

'use client';

import React, {useState, useRef, useCallback, memo} from 'react';
import ReactMarkdown from 'react-markdown';
import useSWR from 'swr';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import Arrows from '../common/Arrows';
import formatDateWithMonthName from '../../lib/newsPosts';
import '../../styles/react-markdown.scss';
import CategoryBtn from '../common/CategoryBtn';
import ContentLoader from 'react-content-loader';

const fetcher = (url: string) => fetch(url).then(res => res.json());
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const OptimizedArrows = React.memo(Arrows);

const BgSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);
    const {data, error} = useSWR(
        `${apiUrl}/news-posts?filters[mainSlider][$eq]=true&pagination[start]=0&pagination[limit]=4&sort=createdAt:desc&populate=image`,
        fetcher
    );
    const getNextSlides = useCallback(
        (current: number) => {
            let nextSlides = [];
            let count = 0;
            let i = current + 1;
            while (count < 3) {
                if (i >= data.data.length) i = 0;
                nextSlides.push(data.data[i]);
                i++;
                count++;
            }
            return nextSlides;
        },
        [data]
    );

    if (error)
        return (
            <div className={'hidden h-[100vh] lg:flex items-center justify-center text-xl'}>
                Данних не отримано, якась помилка спробуйте ще раз
            </div>
        );

    if (!data)
        return (
            <div
                className={'hidden lg:justify-center lg:px-4 lg:h-[100vh] lg:flex'}
                style={{backgroundColor: '#f0f0f0'}} // Добавили фон
            >
                <div className='flex justify-between xl:max-w-[1479px] w-full'>
                    {/* Скелетон для главного слайдера */}
                    <div className='w-[66%]'>
                        <ContentLoader
                            speed={2}
                            width={'100%'}
                            height={600}
                            backgroundColor='#f3f3f3'
                            foregroundColor='#ecebeb'
                        >
                            <rect x='0' y='0' rx='10' ry='10' width='100%' height='400' />{' '}
                            {/* Картинка */}
                            <rect x='0' y='420' rx='5' ry='5' width='70%' height='30' />{' '}
                            {/* Заголовок */}
                            <rect x='0' y='460' rx='5' ry='5' width='50%' height='20' />{' '}
                            {/* Подзаголовок */}
                        </ContentLoader>
                    </div>

                    {/* Скелетон для боковых слайдов */}
                    <div className='w-[30%]'>
                        {[1, 2, 3].map((_, index) => (
                            <ContentLoader
                                key={index}
                                speed={2}
                                width={'100%'}
                                height={129}
                                backgroundColor='#f3f3f3'
                                foregroundColor='#ecebeb'
                                className='mb-4'
                            >
                                <rect x='0' y='0' rx='10' ry='10' width='108' height='108' />{' '}
                                {/* Картинка */}
                                <rect x='120' y='10' rx='5' ry='5' width='80%' height='20' />{' '}
                                {/* Заголовок */}
                                <rect x='120' y='40' rx='5' ry='5' width='50%' height='15' />{' '}
                                {/* Дата */}
                            </ContentLoader>
                        ))}
                    </div>
                </div>
            </div>
        );

    const settings = {
        fade: true,
        swipe: false,
        arrows: false,
        infinite: true,
        cssEase: 'linear',
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 1000,
        beforeChange: (_current: number, next: number) => {
            setCurrentSlide(next);
        }
    };

    const customStyle = {
        color: '#DBDBDB',
        background: 'rgba(219, 219, 219, 0.15)'
    };

    return (
        <div
            className={'hidden lg:justify-center lg:px-4 lg:h-[100vh] lg:flex'}
            style={{
                backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.20) 100%), url(${data.data[
                    currentSlide
                ].attributes.image?.data?.map((img: any) => img.attributes.url)})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div
                className={
                    'flex items-center justify-center xl:justify-between xl:max-w-[1479px] w-full'
                }
            >
                <Slider ref={sliderRef} {...settings} className={'flex-2 w-full xl:w-[66%] z-[1]'}>
                    {data.data.map((item: any) => (
                        <div
                            key={item.attributes.slug}
                            className={'w-full max-w-[850px] text-left'}
                        >
                            <Link href={`/news/${data.data[currentSlide].attributes.slug}`}>
                                <h2
                                    className={
                                        'text-2xl font-bold text-[--background-color] text-clip line-clamp-3 my-7 xl:line-clamp-2 xl:text-4xl'
                                    }
                                >
                                    {item.attributes.title}
                                </h2>
                                <ReactMarkdown
                                    className={
                                        'react-markdown text-base font-medium text-[--background-color] max-w-[593px] text-clip line-clamp-2 xl:line-clamp-3'
                                    }
                                >
                                    {item.attributes.subtitle}
                                </ReactMarkdown>
                            </Link>
                            <OptimizedArrows sliderRef={sliderRef} />
                        </div>
                    ))}
                </Slider>
                <div className={'hidden xl:w-[30%] xl:block'}>
                    {getNextSlides(currentSlide).map(slide => (
                        <div key={slide.attributes.slug}>
                            <Link
                                href={`news/${slide.attributes.slug}`}
                                className={
                                    'flex items-center justify-start bg-[--background-color] h-[129px] rounded-lg p-2.5 mb-2.5'
                                }
                            >
                                <Image
                                    src={`${slide.attributes.image?.data?.map(
                                        (img: any) => img.attributes.url
                                    )}`}
                                    width={108}
                                    height={108}
                                    alt={slide.attributes.title}
                                    className={
                                        'max-w-[108px] w-full h-full rounded-lg object-cover object-center'
                                    }
                                />
                                <div className={'flex flex-col ml-3.5'}>
                                    <span
                                        className={
                                            'text-sm font-medium my-2.5 text-clip line-clamp-3'
                                        }
                                        style={{flex: '1'}}
                                    >
                                        {slide.attributes.title}
                                    </span>
                                    <time
                                        className={'text-sm font-medium text-[--secondary-color-2]'}
                                    >
                                        {formatDateWithMonthName(slide.attributes.publishedAt)}
                                    </time>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BgSlider;
