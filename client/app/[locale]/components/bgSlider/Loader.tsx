'use client';
import {Link} from '@/i18n/routing';
import React, {useCallback, useRef, useState} from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import SlideMeta from './SlideMeta';

const SLIDE_DURATION = 5000;
const SWIPE_THRESHOLD = 40;

const Loader = ({newsPosts}: any) => {
    const [{current, previous}, setSlides] = useState({current: 0, previous: -1});
    const touchStartX = useRef<number | null>(null);
    const count = newsPosts?.length ?? 0;

    const next = useCallback(
        () => setSlides(s => ({current: (s.current + 1) % count, previous: s.current})),
        [count]
    );
    const prev = useCallback(
        () => setSlides(s => ({current: (s.current - 1 + count) % count, previous: s.current})),
        [count]
    );

    if (!count) return null;

    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;
        if (Math.abs(diff) < SWIPE_THRESHOLD) return;
        diff < 0 ? next() : prev();
    };

    return (
        <div
            className='block lg:hidden relative w-full h-[640px] overflow-hidden bg-black'
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <style>{`
                @keyframes story-progress{from{width:0}to{width:100%}}
                @keyframes story-zoom{from{transform:scale(1.12)}to{transform:scale(1)}}
                @keyframes story-text-in{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
                .story-zoom{animation:story-zoom ${SLIDE_DURATION + 1500}ms ease-out both}
                .story-text{animation:story-text-in 700ms cubic-bezier(0.22,1,0.36,1) 150ms both}
                @media (prefers-reduced-motion: reduce){
                    .story-zoom,.story-text{animation:none}
                }
            `}</style>

            {newsPosts.map((newsPost: any, index: number) => {
                // Рендерим текущий, предыдущий (для плавного ухода) и следующий слайд,
                // чтобы не грузить все фото сразу
                const isCurrent = index === current;
                const isPrevious = index === previous;
                if (!isCurrent && !isPrevious && index !== (current + 1) % count) return null;
                return (
                    <div
                        key={newsPost.slug}
                        aria-hidden={!isCurrent}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                            isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    >
                        <div
                            className={`absolute inset-0 ${isCurrent || isPrevious ? 'story-zoom' : ''}`}
                        >
                            <Image
                                src={Array.isArray(newsPost.image) ? newsPost.image[0] : newsPost.image}
                                alt=''
                                fill
                                priority={index === 0}
                                sizes='100vw'
                                quality={70}
                                className='object-cover'
                            />
                        </div>
                        <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/20' />
                    </div>
                );
            })}

            {/* Центр: клик по тексту открывает новость */}
            <Link
                key={newsPosts[current].slug}
                href={`/news/${newsPosts[current].slug}`}
                className='story-text absolute inset-y-0 left-[20%] right-[20%] z-[2] flex flex-col justify-center'
            >
                <SlideMeta post={newsPosts[current]} />
                <h2 className='text-2xl font-bold text-[--background-color] text-clip line-clamp-3 mt-7'>
                    {newsPosts[current].title}
                </h2>
                <ReactMarkdown className='react-markdown text-base font-medium text-[--background-color] mt-7 max-w-[593px] text-clip line-clamp-2'>
                    {newsPosts[current].subtitle}
                </ReactMarkdown>
            </Link>

            {/* Боковые зоны: листание */}
            <button
                type='button'
                aria-label='Previous'
                onClick={prev}
                className='absolute inset-y-0 left-0 w-[20%] z-[3]'
            />
            <button
                type='button'
                aria-label='Next'
                onClick={next}
                className='absolute inset-y-0 right-0 w-[20%] z-[3]'
            />

            <div className='absolute bottom-0 inset-x-0 z-[4] flex gap-1 px-2 pb-7 pointer-events-none'>
                {newsPosts.map((newsPost: any, index: number) => (
                    <div
                        key={newsPost.slug}
                        className='flex-1 h-2 rounded bg-[#A8A8A8] overflow-hidden'
                    >
                        <div
                            key={index === current ? `active-${current}` : 'idle'}
                            className='h-full bg-[#F0CA56]'
                            style={{
                                width: index < current ? '100%' : 0,
                                animation:
                                    index === current
                                        ? `story-progress ${SLIDE_DURATION}ms linear forwards`
                                        : undefined
                            }}
                            onAnimationEnd={index === current ? next : undefined}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Loader;
