'use client';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialLink from './SocialLink';
import '../../styles/footer.scss';
import LanguageSwitcher from '../header/LanguageSwitcher';
import SearchBox from '../SearchBox/SearchBox';

type LinkData = {
    title: string;
    href: string;
};

const Footer = () => {
    const {
        links,
        videoLinks,
        aboutLinks
    }: {links: LinkData[]; videoLinks: LinkData[]; aboutLinks: LinkData[]} = {
        links: [
            {title: 'Головна', href: '/'},
            {title: 'Новини Украiни та свiту ', href: '#'},
            {title: 'Всi новини', href: '/news'},
            {title: 'Новини Криму', href: '#'},
            // {title: 'Ексклюзив', href: '#'},
            {title: 'Блоги', href: '/blogs'},
            // {title: 'Портрет', href: '#'},
            {title: 'Вiйна', href: '#'},
            {title: 'Кримські татари', href: '#'},
            // {title: 'Злочини Росii', href: '#'},
            {title: 'Публiкацii', href: '#'},
            // {title: 'Журналiсти', href: '#'}
        ],
        videoLinks: [
            {title: 'Інтерв‘ю', href: '#'},
            {title: 'Крим і Південь України', href: '#'},
            {title: 'Крим. Роки окупації', href: '#'},
            {title: 'Кримські татари', href: '#'},
            {title: 'Культура кримських татар у обличчях', href: '#'},
            {title: 'Новини України', href: '#'}
        ],
        aboutLinks: [
            {title: 'Контакти', href: '#'},
            {title: 'Наша команда', href: '#'},
            {title: 'Партнерам', href: '#'},
            {title: 'Наша місія', href: '#'}
        ]
    };

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleLanguageClick = (languageCode: any) => {
        setSelectedLanguage(languageCode);
        console.log('Выбранный язык:', languageCode);
    };

    return (
        <footer className='bg-[--secondary-color-4] py-7 px-4 lg:py-10'>
            <div
                className={
                    'flex flex-col justify-between border-b border-[--secondary-color-3] pb-8 my-0 mx-auto max-w-[1479px] lg:flex-row lg:pb-10 lg:gap-y-4'
                }
            >
                <div className={'max-w-[339px] w-full'}>
                    <h2 className={'text-2xl font-semibold mb-5 lg:mb-10'}>Слідкуй за нами</h2>
                    <SocialLink
                        href='https://t.me/qirimnews'
                        src='/telegram.svg'
                        text='Новини в телеграмi'
                        altText='social-network'
                    />
                    <SocialLink
                        href='https://www.youtube.com/@qirimnews9210'
                        src='/youtube.svg'
                        text='Ютуб-канал'
                        altText='social-network'
                    />
                    <div className={'flex max-w-[110px] mt-5 mb-7 justify-between lg:mt-11'}>
                        <Link href={'https://www.facebook.com/qirim.news'} target='_blank'>
                            <Image src='/u_facebook.svg' width={20} height={20} alt='fb' />
                        </Link>
                        <Link href={'https://twitter.com/qirim_news'} target='_blank'>
                            <Image src='/u_twitter.svg' width={20} height={20} alt='twitter' />
                        </Link>
                        <Link href={'https://www.instagram.com/qirim.news'} target='_blank'>
                            <Image src='/u_instagram.svg' width={20} height={20} alt='instagram' />
                        </Link>
                    </div>
                </div>
                <div>
                    <h2 className={'text-2xl font-semibold mb-5 lg:mb-10'}>Навігація</h2>
                    <ul className={'grid grid-cols-2 gap-4 max-w-xs lg:gap-6 lg:max-w-md'}>
                        {links.map((link, index) => (
                            <li className={'text-sm font-normal lg:text-base'} key={index}>
                                <Link className='hover:text-[--accent-color]' href={link.href}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={'mt-8 lg:mt-0'}>
                    <h2 className={'text-2xl font-semibold mb-5 lg:mb-10'}>Вiдео</h2>
                    <ul
                        className={
                            'grid grid-cols-2 gap-4 max-w-xs lg:grid-cols-1 lg:gap-6 lg:max-w-md'
                        }
                    >
                        {videoLinks.map((link, index) => (
                            <li className={'text-sm font-normal lg:text-base'} key={index}>
                                <Link className='hover:text-[--accent-color]' href={link.href}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={'flex flex-col justify-between mt-8 lg:mt-0'}>
                    <div className={'flex flex-col gap-y-11'}>
                        <SearchBox />
                        <LanguageSwitcher
                            onClick={handleLanguageClick}
                            textColor='text-[#01060A]'
                        />
                    </div>
                    <ul
                        className={
                            'grid grid-cols-2 gap-4 max-w-xs lg:grid-cols-1 lg:gap-6 lg:max-w-md'
                        }
                    >
                        {aboutLinks.map((link, index) => (
                            <li className={'text-sm font-normal lg:text-base'} key={index}>
                                <Link className='hover:text-[--accent-color]' href={link.href}>
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
