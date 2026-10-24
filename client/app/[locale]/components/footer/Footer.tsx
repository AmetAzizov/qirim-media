'use client';
import {useState} from 'react';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import SocialLink from './SocialLink';
import ContactsModal from './ContactsModal';
import '../../styles/footer.scss';
import {useTranslations} from "next-intl";
import {useRouter} from '@/i18n/routing';
import LanguageSwitcher from '../header/LanguageSwitcher';

type LinkData = {
    title: string;
    href: string;
};

const Footer = () => {
    const t = useTranslations('footer');
    const {aboutLinks}: { aboutLinks: LinkData[] } = {
        aboutLinks: [
            {title: t('ourTeam'), href: '#'},
            {title: t('partners'), href: '/partners'},
            {title: t('ourMission'), href: '#'}
        ]
    };

    const tc = useTranslations('categories');
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [contactsOpen, setContactsOpen] = useState(false);

    const navLinks: LinkData[] = [
        {title: tc('home'), href: '/'},
        {title: tc('news'), href: '/news'},
        {title: tc('publications'), href: '/publications'},
        {title: tc('video'), href: 'https://www.youtube.com/@qirimnews9210/videos'},
        {title: tc('blogs'), href: '/blogs'}
    ];

    // Значение category должно совпадать с названием категории в CMS (см. CategoryBtn)
    const tcl = useTranslations('categoryList');
    const categoryLinks: LinkData[] = [
        {title: tcl('humanRights'), category: 'Права людини'},
        {title: tcl('war'), category: 'Війна'},
        {title: tcl('politics'), category: 'Політика'},
        {title: tcl('culture'), category: 'Культура'},
        {title: tcl('sports'), category: 'Спорт'},
        {title: tcl('education'), category: 'Освіта'},
        {title: tcl('history'), category: 'Історія'},
        {title: tcl('economy'), category: 'Економіка'},
        {title: tcl('ecology'), category: 'Екологія'},
        {title: tcl('society'), category: 'Суспільство'},
        {title: tcl('internationalNews'), category: 'Міжнародні новини'}
    ].map(({title, category}) => ({
        title,
        href: `/news?category=${encodeURIComponent(category)}`
    }));

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/search?query=${encodeURIComponent(trimmed)}`);
    };

    return (
        <footer className='bg-[--secondary-color-4] py-7 px-4 lg:py-10'>
            <div
                className={
                    'flex flex-col justify-between border-b border-[--secondary-color-3] pb-8 my-0 mx-auto max-w-[1479px] lg:flex-row lg:pb-10 lg:gap-y-4'
                }
            >
                <div className={'max-w-[339px] w-full'}>
                    <h2 className={'text-2xl font-semibold mb-5 lg:mb-10'}>{t('followUs')}</h2>
                    <SocialLink
                        href='https://t.me/qirimnews'
                        src='/telegram.svg'
                        text={t('tgNews')}
                        altText='social-network'
                    />
                    <SocialLink
                        href='https://www.youtube.com/@qirimnews9210'
                        src='/youtube.svg'
                        text={t('ytbChannel')}
                        altText='social-network'
                    />
                    <div className={'flex max-w-[110px] mt-5 mb-7 justify-between lg:mt-11'}>
                        <Link href={'https://www.facebook.com/qirim.news'} target='_blank'>
                            <Image src='/u_facebook.svg' width={20} height={20} alt='fb'/>
                        </Link>
                        <Link href={'https://x.com/qirim_news'} target='_blank'>
                            <Image src='/u_twitter.svg' width={20} height={20} alt='twitter'/>
                        </Link>
                        <Link href={'https://www.instagram.com/qirim.news'} target='_blank'>
                            <Image src='/u_instagram.svg' width={20} height={20} alt='instagram'/>
                        </Link>
                    </div>
                </div>

                <div className={'order-first lg:order-none mb-8 lg:mb-0'}>
                    <h2 className={'text-2xl font-semibold mb-5 lg:mb-10'}>{t('navigation')}</h2>
                    <div className={'flex flex-col gap-y-6 lg:flex-row lg:gap-x-16'}>
                        {/* Разделы сайта */}
                        <ul className={'grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-1 lg:gap-y-6 lg:content-start'}>
                            {navLinks.map(link => (
                                <li className={'text-sm font-normal lg:text-base'} key={link.href}>
                                    {link.href.startsWith('http') ? (
                                        <a
                                            className='hover:text-[--accent-color]'
                                            href={link.href}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            {link.title}
                                        </a>
                                    ) : (
                                        <Link className='hover:text-[--accent-color]' href={link.href}>
                                            {link.title}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                        {/* Категории новин: 2 колонки (6 + 5) */}
                        <ul
                            className={
                                'grid grid-flow-col grid-cols-2 grid-rows-[repeat(6,minmax(0,1fr))] gap-x-8 gap-y-4 lg:gap-y-6'
                            }
                        >
                            {categoryLinks.map(link => (
                                <li className={'text-sm font-normal lg:text-base'} key={link.href}>
                                    <Link className='hover:text-[--accent-color]' href={link.href}>
                                        {link.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={'flex flex-col justify-between gap-y-8 mt-8 lg:mt-0'}>
                    <div className={'flex flex-col gap-y-6 lg:gap-y-8'}>
                        <form onSubmit={handleSearchSubmit} role='search' className='relative'>
                            <button
                                type='submit'
                                className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-500'
                                aria-label={t('searchPlaceholder')}
                            >
                                <svg
                                    className='w-4 h-4'
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
                                type='search'
                                enterKeyHint='search'
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder={t('searchPlaceholder')}
                                aria-label={t('searchPlaceholder')}
                                className='w-full rounded-lg bg-white py-2.5 pl-9 pr-3 text-sm outline-none'
                            />
                        </form>
                        <div className='footer-lang'>
                            <LanguageSwitcher textColor='text-[#01060A]' />
                        </div>
                    </div>
                    <ul
                        className={
                            'grid grid-cols-2 gap-4 max-w-xs lg:grid-cols-1 lg:gap-6 lg:max-w-md'
                        }
                    >
                        <li className={'text-sm font-normal lg:text-base'}>
                            <button
                                type='button'
                                className='hover:text-[--accent-color]'
                                onClick={() => setContactsOpen(true)}
                                aria-haspopup='dialog'
                            >
                                {t('contacts')}
                            </button>
                        </li>
                        {aboutLinks.map((link, index) => (
                            <li className={'text-sm font-normal lg:text-base'} key={index}>
                                <Link className='hover:text-[--accent-color]' href={link.href}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <ContactsModal open={contactsOpen} onClose={() => setContactsOpen(false)} />
                </div>
            </div>
            <div
                itemScope
                itemType="https://schema.org/Organization"
            >
                <address
                    className="max-w-[1497px] m-auto text-sm font-normal grid grid-rows-5 grid-flow-col items-center gap-2.5 text-center mt-2.5 text-[--secondary-color-2] md:grid-rows-3 xl:grid-rows-2"
                >
                    <p itemProp="name">{t('firmName')}</p>
                    <p itemProp="address">{t('addressOffice')}</p>
                    <p>
                        <span itemProp="telephone">+380 (63) 477 83 20</span>
                    </p>
                    <p>
                        <span itemProp="email">newsqirim@gmail.com</span>
                    </p>
                    <p>{t('idNumber')}</p>
                </address>
            </div>
        </footer>
    );
};

export default Footer;
