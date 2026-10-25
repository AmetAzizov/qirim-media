'use client';

import React, {useState, useRef, useCallback} from 'react';
import ReactMarkdown from 'react-markdown';
import Slider from 'react-slick';
import Image from 'next/image';
import {Link} from '@/i18n/routing';
import Arrows from '../common/Arrows';
import formatDateWithMonthName from '../../lib/newsPosts';
import '../../styles/react-markdown.scss';
import ContentLoader from 'react-content-loader';
import SlideMeta from './SlideMeta';

const coverOf = (post: any): string => (Array.isArray(post?.image) ? post.image[0] : post?.image);

const OptimizedArrows = React.memo(Arrows);

const BgSlider = ({newsPosts}: any) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [prevSlide, setPrevSlide] = useState<number | null>(null);
    const sliderRef = useRef(null);

    const getNextSlides = useCallback(
        (current: number) => {
            let nextSlides = [];
            let count = 0;
            let i = current + 1;
            while (count < 3) {
                if (i >= newsPosts.length) i = 0;
                nextSlides.push(newsPosts[i]);
                i++;
                count++;
            }
            return nextSlides;
        },
        [newsPosts]
    );

    if (!newsPosts || newsPosts.length === 0) {
        return (
            <div className='flex justify-center h-[100vh] items-center text-xl'>
                Данних не отримано, спробуйте ще раз
            </div>
        );
    }

    if (!newsPosts)
        return (
            <div
                className={'hidden lg:justify-center lg:px-4 lg:h-[100vh] lg:flex'}
                style={{backgroundColor: '#f0f0f0'}}
            >
                <div className='flex justify-between xl:max-w-[1479px] w-full'>
                    <div className='w-[66%]'>
                        <ContentLoader
                            speed={2}
                            width={'100%'}
                            height={600}
                            backgroundColor='#f3f3f3'
                            foregroundColor='#ecebeb'
                        >
                            <rect x='0' y='0' rx='10' ry='10' width='100%' height='400' />{' '}
                            <rect x='0' y='420' rx='5' ry='5' width='70%' height='30' />{' '}
                            <rect x='0' y='460' rx='5' ry='5' width='50%' height='20' />{' '}
                        </ContentLoader>
                    </div>

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
                                <rect x='120' y='10' rx='5' ry='5' width='80%' height='20' />{' '}
                                <rect x='120' y='40' rx='5' ry='5' width='50%' height='15' />{' '}
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
        cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 10000,
        speed: 1000,
        beforeChange: (current: number, next: number) => {
            setPrevSlide(current);
            setCurrentSlide(next);
        }
    };

    return (
        <div
            className={'hidden relative overflow-hidden bg-neutral-900 lg:justify-center lg:px-4 lg:h-[100vh] lg:flex'}
        >
            <style>{`
                @keyframes bg-fade-in{from{opacity:0}to{opacity:1}}
                @keyframes bg-zoom{from{transform:scale(1.1)}to{transform:scale(1)}}
                @keyframes slide-text-in{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
                .bg-layer-in{animation:bg-fade-in 1000ms cubic-bezier(0.4,0,0.2,1) both}
                .bg-layer-zoom{animation:bg-zoom 14s ease-out both}
                .slide-card-in{animation:slide-text-in 700ms cubic-bezier(0.22,1,0.36,1) both}
                @media (prefers-reduced-motion: reduce){
                    .bg-layer-in,.bg-layer-zoom,.slide-card-in{animation:none}
                }
            `}</style>
            {/* Предыдущий слайд остаётся под новым, пока тот плавно проявляется */}
            {prevSlide !== null && prevSlide !== currentSlide && (
                <div key={`prev-${newsPosts[prevSlide]?.slug}`} className='absolute inset-0'>
                    <Image
                        src={coverOf(newsPosts[prevSlide])}
                        alt=''
                        fill
                        sizes='100vw'
                        quality={70}
                        className='object-cover'
                    />
                </div>
            )}
            <div
                key={newsPosts[currentSlide]?.slug}
                className={`absolute inset-0 ${prevSlide !== null ? 'bg-layer-in' : ''}`}
            >
                <div className='absolute inset-0 bg-layer-zoom'>
                    <Image
                        src={coverOf(newsPosts[currentSlide])}
                        alt=''
                        fill
                        priority={currentSlide === 0}
                        sizes='100vw'
                        quality={70}
                        className='object-cover'
                    />
                </div>
            </div>
            <div className='absolute inset-0 bg-black/20' />
            <div
                className={
                    'relative z-[1] flex items-center justify-center xl:justify-between xl:max-w-[1479px] w-full'
                }
            >
                <div className='max-w-[70%]'>
                    <Slider
                        ref={sliderRef}
                        {...settings}
                        className='flex-2 w-full xl:w-[66%] z-[1]'
                    >
                        {newsPosts.map((item: any) => (
                            <div key={item.slug} className='w-full max-w-[850px] text-left'>
                                <SlideMeta post={item} />
                                <Link href={`/news/${item.slug}`}>
                                    <h2 className='text-2xl font-bold text-[--background-color] my-7 xl:text-4xl line-clamp-2'>
                                        {item.title}
                                    </h2>
                                    <ReactMarkdown className='react-markdown text-base font-medium max-w-[593px] text-[--background-color] line-clamp-3'>
                                        {item.subtitle}
                                    </ReactMarkdown>
                                </Link>
                            </div>
                        ))}
                    </Slider>
                    <OptimizedArrows sliderRef={sliderRef} />
                </div>
                <div className='hidden xl:block xl:w-[30%]'>
                    {getNextSlides(currentSlide).map((slide, i) => (
                        <div
                            key={slide.slug}
                            className='slide-card-in'
                            style={{animationDelay: `${i * 90}ms`}}
                        >
                            <Link
                                href={`/news/${slide.slug}`}
                                className='flex items-center bg-[--background-color] h-[129px] rounded-lg p-2.5 mb-2.5'
                            >
                                <Image
                                    src={`${slide.image}`}
                                    width={108}
                                    height={108}
                                    alt={slide.title}
                                    className='max-w-[108px] w-full h-[108px] rounded-lg object-cover'
                                />
                                <div className='flex flex-col items-start justify-between ml-3.5 h-[-webkit-fill-available]'>
                                    <button
                                        className={
                                            'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl'
                                        }
                                    >
                                        {slide.categoryList}
                                    </button>
                                    <span className='text-sm font-medium text-clip line-clamp-2 my-2.5'>
                                        {slide.title}
                                    </span>
                                    <time className='text-sm font-medium text-[--secondary-color-2]'>
                                        {slide.dateTime}
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

