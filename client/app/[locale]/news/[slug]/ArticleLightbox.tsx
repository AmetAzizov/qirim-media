'use client';

import React, {useCallback, useEffect, useRef, useState} from 'react';

interface Props {
    children: React.ReactNode;
}

interface Slide {
    src: string;
    alt: string;
}

const SELECTOR = 'img[data-zoomable], .react-markdown img';
const MIN_SCALE = 1;
const MAX_SCALE = 5;

export default function ArticleLightbox({children}: Props) {
    const rootRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const [slides, setSlides] = useState<Slide[]>([]);
    const [index, setIndex] = useState<number | null>(null);
    const [view, setView] = useState({scale: 1, x: 0, y: 0});
    const [dragging, setDragging] = useState(false);
    const drag = useRef<{px: number; py: number; x: number; y: number} | null>(null);

    const reset = useCallback(() => setView({scale: 1, x: 0, y: 0}), []);

    const close = useCallback(() => {
        setIndex(null);
        reset();
    }, [reset]);

    const go = useCallback(
        (dir: number) => {
            reset();
            setIndex((i) => (i === null || !slides.length ? i : (i + dir + slides.length) % slides.length));
        },
        [slides.length, reset]
    );

    // zoom around a point (relative to stage center); keeps that point fixed under the cursor
    const zoomBy = useCallback((factor: number, cx = 0, cy = 0) => {
        setView((v) => {
            const scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, v.scale * factor));
            if (scale === MIN_SCALE) return {scale, x: 0, y: 0};
            const k = scale / v.scale;
            return {scale, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k};
        });
    }, []);

    const onClick = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'IMG' || !target.matches(SELECTOR)) return;
        const imgs = Array.from(rootRef.current?.querySelectorAll<HTMLImageElement>(SELECTOR) ?? []);
        setSlides(
            imgs.map((img) => ({
                src: img.dataset.full || img.currentSrc || img.src,
                alt: img.alt || ''
            }))
        );
        setIndex(imgs.indexOf(target as HTMLImageElement));
        reset();
    };

    useEffect(() => {
        if (index === null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
            else if (e.key === 'ArrowRight') go(1);
            else if (e.key === 'ArrowLeft') go(-1);
            else if (e.key === '+' || e.key === '=') zoomBy(1.25);
            else if (e.key === '-') zoomBy(0.8);
        };
        const html = document.documentElement;
        const prevBody = document.body.style.overflow;
        const prevHtml = html.style.overflow;
        document.body.style.overflow = 'hidden';
        html.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevBody;
            html.style.overflow = prevHtml;
        };
    }, [index, close, go, zoomBy]);

    // wheel must be a non-passive native listener to be able to preventDefault
    const open = index !== null;
    useEffect(() => {
        const el = stageRef.current;
        if (!open || !el) return;
        const onWheel = (e: WheelEvent) => {
            e.preventDefault();
            const r = el.getBoundingClientRect();
            const cx = e.clientX - (r.left + r.width / 2);
            const cy = e.clientY - (r.top + r.height / 2);
            zoomBy(e.deltaY < 0 ? 1.15 : 1 / 1.15, cx, cy);
        };
        el.addEventListener('wheel', onWheel, {passive: false});
        return () => el.removeEventListener('wheel', onWheel);
    }, [open, zoomBy]);

    const slide = index !== null ? slides[index] : null;
    const btn =
        'absolute z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 text-white text-2xl hover:bg-white/30';
    const stop = (fn: () => void) => (e: React.MouseEvent) => {
        e.stopPropagation();
        fn();
    };

    return (
        <div ref={rootRef} onClick={onClick}>
            {children}
            {slide && (
                <div
                    className='fixed inset-0 z-[1000] bg-black/90'
                    role='dialog'
                    aria-modal='true'
                    onClick={close}
                >
                    <button className={`${btn} top-4 right-4`} onClick={stop(close)} aria-label='Закрити'>
                        ✕
                    </button>
                    <button className={`${btn} top-4 right-[76px]`} onClick={stop(() => zoomBy(1.25))} aria-label='Збільшити'>
                        +
                    </button>
                    <button className={`${btn} top-4 right-[132px]`} onClick={stop(() => zoomBy(0.8))} aria-label='Зменшити'>
                        −
                    </button>
                    {slides.length > 1 && (
                        <>
                            <button
                                className={`${btn} left-3 top-1/2 -translate-y-1/2`}
                                onClick={stop(() => go(-1))}
                                aria-label='Попереднє'
                            >
                                ‹
                            </button>
                            <button
                                className={`${btn} right-3 top-1/2 -translate-y-1/2`}
                                onClick={stop(() => go(1))}
                                aria-label='Наступне'
                            >
                                ›
                            </button>
                            <div className='absolute top-6 left-4 text-white text-sm'>
                                {index! + 1} / {slides.length}
                            </div>
                        </>
                    )}
                    <div
                        ref={stageRef}
                        className='absolute inset-0 flex items-center justify-center p-2 md:px-24 md:py-16 lg:px-32 overflow-hidden'
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={slide.src}
                            alt={slide.alt}
                            draggable={false}
                            onClick={(e) => e.stopPropagation()}
                            onDoubleClick={() => (view.scale > 1 ? reset() : zoomBy(2.5))}
                            onPointerDown={(e) => {
                                if (view.scale <= 1) return;
                                drag.current = {px: e.clientX, py: e.clientY, x: view.x, y: view.y};
                                setDragging(true);
                                e.currentTarget.setPointerCapture(e.pointerId);
                            }}
                            onPointerMove={(e) => {
                                const d = drag.current;
                                if (!d) return;
                                setView((v) => ({...v, x: d.x + e.clientX - d.px, y: d.y + e.clientY - d.py}));
                            }}
                            onPointerUp={() => {
                                drag.current = null;
                                setDragging(false);
                            }}
                            style={{
                                transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
                                transition: dragging ? 'none' : 'transform 0.12s ease-out'
                            }}
                            className={`max-w-full max-h-full object-contain select-none touch-none ${
                                view.scale > 1 ? (dragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-zoom-in'
                            }`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
