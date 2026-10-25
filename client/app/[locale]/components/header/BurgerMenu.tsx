'use client';
import Image from 'next/image';
import {Link} from '@/i18n/routing';
import {useState, useEffect, useRef, useCallback} from 'react';
import {createPortal} from 'react-dom';
import {useRouter} from '@/i18n/routing';
import {useLocale} from 'next-intl';

import '../../styles/burger-menu.scss';
import SubscribeButton from './SubscribeButton';
import CategoryList from './CategoryList';
import LanguageSwitcher from './LanguageSwitcher';

const SOCIALS = [
    {href: 'https://www.facebook.com/qirim.news', icon: '/u_facebook.svg', label: 'Facebook'},
    {href: 'https://x.com/qirim_news', icon: '/u_twitter.svg', label: 'X (Twitter)'},
    {href: 'https://www.instagram.com/qirim.news', icon: '/u_instagram.svg', label: 'Instagram'},
    {href: 'https://www.youtube.com/@qirimnews9210', icon: '/u_youtube.svg', label: 'YouTube'}
];

const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useScrollLock(isLocked: boolean) {
    useEffect(() => {
        if (!isLocked) return;
        const {body, documentElement: html} = document;
        const scrollY = window.scrollY;
        const scrollbarWidth = window.innerWidth - html.clientWidth;
        const prevScrollBehavior = html.style.scrollBehavior;

        html.style.overflow = 'hidden';
        body.style.position = 'fixed';
        body.style.top = `-${scrollY}px`;
        body.style.left = '0';
        body.style.right = '0';
        body.style.width = '100%';
        body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            html.style.overflow = '';
            body.style.position = '';
            body.style.top = '';
            body.style.left = '';
            body.style.right = '';
            body.style.width = '';
            body.style.paddingRight = '';
            html.style.scrollBehavior = 'auto';
            window.scrollTo(0, scrollY);
            html.style.scrollBehavior = prevScrollBehavior;
        };
    }, [isLocked]);
}

export default function BurgerMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [query, setQuery] = useState('');
    const [today, setToday] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const panelRef = useRef<HTMLElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => setMounted(true), []);

    const closeMenu = useCallback(() => {
        setIsOpen(false);
        setQuery('');
    }, []);

    useScrollLock(isOpen);

    // Закрыть при переходе на десктопную ширину
    useEffect(() => {
        const mq = window.matchMedia('(min-width: 1024px)');
        const onChange = (e: MediaQueryListEvent) => e.matches && closeMenu();
        mq.addEventListener('change', onChange);
        return () => mq.removeEventListener('change', onChange);
    }, [closeMenu]);

    // Escape + focus trap + возврат фокуса
    useEffect(() => {
        if (!isOpen) return;

        setToday(
            new Intl.DateTimeFormat(locale === 'uk' ? 'uk-UA' : locale, {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }).format(new Date())
        );

        const button = buttonRef.current;
        const timer = setTimeout(() => inputRef.current?.focus({preventScroll: true}), 250);

        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                closeMenu();
                return;
            }
            if (e.key !== 'Tab' || !panelRef.current) return;
            const items = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        window.addEventListener('keydown', onKeyDown);
        return () => {
            clearTimeout(timer);
            window.removeEventListener('keydown', onKeyDown);
            button?.focus({preventScroll: true});
        };
    }, [isOpen, locale, closeMenu]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/search?query=${encodeURIComponent(trimmed)}`);
        closeMenu();
    };

    return (
        <>
            <button
                ref={buttonRef}
                className='burger-button w-10 h-10 lg:hidden flex items-center justify-center rounded-lg -mr-2 active:bg-white/10'
                onClick={() => setIsOpen(true)}
                aria-expanded={isOpen}
                aria-controls='burger-menu'
                aria-label='Відкрити меню'
                type='button'
            >
                <Image src='/burger-ico.svg' width={28} height={28} alt='' aria-hidden='true' />
            </button>

            {/* Портал: у header есть backdrop-filter, который ломает position: fixed у потомков */}
            {mounted &&
                createPortal(
                    <div className='lg:hidden'>
                        <div
                            className={`menu-overlay ${isOpen ? 'open' : ''}`}
                            onClick={closeMenu}
                            aria-hidden='true'
                        />

                        <nav
                            ref={panelRef}
                            id='burger-menu'
                            aria-label='Головне меню'
                            aria-hidden={!isOpen}
                            className={`menu-panel ${isOpen ? 'open' : ''}`}
                        >
                            <div className='menu-panel__inner'>
                                {/* Header */}
                                <div className='flex items-center justify-between'>
                                    <Link
                                        href='/'
                                        onClick={closeMenu}
                                        className='flex items-center rounded-lg bg-[#212121] px-4 py-3'
                                    >
                                        <Image src='/logoqn.svg' width={153} height={28} alt='Qirim News' />
                                    </Link>
                                    <button
                                        className='menu-close'
                                        onClick={closeMenu}
                                        aria-label='Закрити меню'
                                        type='button'
                                    >
                                        <svg
                                            className='w-6 h-6'
                                            fill='none'
                                            stroke='currentColor'
                                            viewBox='0 0 24 24'
                                            aria-hidden='true'
                                        >
                                            <path
                                                strokeLinecap='round'
                                                strokeLinejoin='round'
                                                strokeWidth={2}
                                                d='M6 18L18 6M6 6l12 12'
                                            />
                                        </svg>
                                    </button>
                                </div>

                                {/* Search */}
                                <form onSubmit={handleSearchSubmit} role='search' className='mt-5'>
                                    <div className='relative'>
                                        <button
                                            type='submit'
                                            className='absolute left-3 top-1/2 -translate-y-1/2 p-1 text-gray-500'
                                            aria-label='Виконати пошук'
                                        >
                                            <svg
                                                className='w-5 h-5'
                                                fill='none'
                                                stroke='currentColor'
                                                viewBox='0 0 24 24'
                                                aria-hidden='true'
                                            >
                                                <path
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                    strokeWidth={2}
                                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                                />
                                            </svg>
                                        </button>
                                        <input
                                            ref={inputRef}
                                            type='search'
                                            enterKeyHint='search'
                                            value={query}
                                            onChange={e => setQuery(e.target.value)}
                                            placeholder='Пошук по сайту'
                                            aria-label='Пошук по сайту'
                                            className='menu-search'
                                        />
                                    </div>
                                </form>

                                {/* Navigation */}
                                <ul className='menu-links'>
                                    <CategoryList
                                        onClose={closeMenu}
                                        categories={['/', 'news', 'publications', 'videos', 'blogs']}
                                    />
                                </ul>

                                {/* Language + Subscribe */}
                                <div className='flex items-center justify-between gap-3 pt-5 border-t border-gray-100'>
                                    <LanguageSwitcher textColor='text-black' />
                                    <SubscribeButton />
                                </div>

                                {/* Socials */}
                                <div className='flex items-center justify-center gap-2 mt-auto pt-6'>
                                    {SOCIALS.map(s => (
                                        <a
                                            key={s.href}
                                            href={s.href}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            aria-label={s.label}
                                            className='menu-social'
                                        >
                                            <Image src={s.icon} width={22} height={22} alt='' aria-hidden='true' />
                                        </a>
                                    ))}
                                </div>

                                {/* Date */}
                                <p className='mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 text-center first-letter:uppercase'>
                                    {today}
                                </p>
                            </div>
                        </nav>
                    </div>,
                    document.body
                )}
        </>
    );
}
