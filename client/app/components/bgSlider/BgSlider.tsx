'use client';

import React, {useState, useRef, useCallback, memo} from 'react';
import ReactMarkdown from 'react-markdown';
import useSWR from 'swr';
import Slider from 'react-slick';
import Image from 'next/image';
import Link from 'next/link';
import Arrows from '../common/Arrows';
import formatDateWithMonthName from '../../lib/newsPosts';
import '../../styles/react-markdown.scss'

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

    if (error) return <div className={'h-[100vh] flex items-center justify-center text-xl'}>Данних не отримано, якась помилка спробуйте ще раз</div>;
    if (!data) return <div className={'h-[100vh] flex items-center justify-center text-xl'}>Завантаження...</div>;

    // console.log('Data received:', data);

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

    return (
        <div
            className={'flex justify-center px-4 h-[100vh]'}
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
                                        'text-2xl font-bold text-[--background-color] text-clip line-clamp-3 xl:line-clamp-2 xl:text-4xl'
                                    }
                                >
                                    {item.attributes.title}
                                </h2>
                                {/* <Image
                                            src={'/yellow-arrow.svg'}
                                            width={30}
                                            height={30}
                                            alt={'yellow-arrow'}
                                            className={''}
                                        /> */}

                                <ReactMarkdown
                                    className={
                                        'react-markdown text-base font-medium text-[--background-color] mt-7 max-w-[593px] text-clip line-clamp-2 xl:line-clamp-3'
                                    }
                                >
                                    {item.attributes.text}
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
