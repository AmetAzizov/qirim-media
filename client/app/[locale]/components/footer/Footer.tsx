// 'use client';
// import {useState} from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import SocialLink from './SocialLink';
// import '../../styles/footer.scss';
// import LanguageSwitcher from '../header/LanguageSwitcher';

// type LinkData = {
//     title: string;
//     href: string;
// };

// const Footer = () => {
//     const {links, aboutLinks}: {links: LinkData[]; aboutLinks: LinkData[]} = {
//         links: [
//             {title: 'Головна', href: '/'},
//             {title: 'Усі новини', href: '/news'},
//             {title: 'Публiкацii', href: '/publications'},
//             {title: 'Відео', href: '/videos'},
//             {title: 'Блоги', href: '/blogs'},
//             {title: 'Права людини', href: '#'},
//             {title: 'Війна', href: '#'},
//             {title: 'Політика', href: '#'},
//             {title: 'Культура', href: '#'},
//             {title: 'Спорт', href: '#'},
//             {title: 'Освіта', href: '#'},
//             {title: 'Історія', href: '#'},
//             {title: 'Економіка', href: '#'},
//             {title: 'Екологія', href: '#'},
//             {title: 'Суспільство', href: '#'},
//             {title: 'Міжнародні новини', href: '#'}
//         ],
//         aboutLinks: [
//             {title: 'Контакти', href: '#'},
//             {title: 'Наша команда', href: '#'},
//             {title: 'Партнерам', href: '#'},
//             {title: 'Наша місія', href: '#'}
//         ]
//     };

//     const [selectedLanguage, setSelectedLanguage] = useState(null);

//     const handleLanguageClick = (languageCode: any) => {
//         setSelectedLanguage(languageCode);
//         console.log('Выбранный язык:', languageCode);
//     };

//     return (
//         <footer className='bg-[--secondary-color-4] py-7 px-4 lg:py-10'>
//             <div
//                 className={
//                     'flex flex-col justify-between border-b border-[--secondary-color-3] pb-8 my-0 mx-auto max-w-[1479px] lg:flex-row lg:pb-10 lg:gap-y-4'
//                 }
//             >
//                 <div className={'max-w-[339px] w-full'}>
//                     <h2 className={'text-2xl font-semibold mb-5 lg:mb-10'}>Слідкуй за нами</h2>
//                     <SocialLink
//                         href='https://t.me/qirimnews'
//                         src='/telegram.svg'
//                         text='Новини в телеграмi'
//                         altText='social-network'
//                     />
//                     <SocialLink
//                         href='https://www.youtube.com/@qirimnews9210'
//                         src='/youtube.svg'
//                         text='Ютуб-канал'
//                         altText='social-network'
//                     />
//                     <div className={'flex max-w-[110px] mt-5 mb-7 justify-between lg:mt-11'}>
//                         <Link href={'https://www.facebook.com/qirim.news'} target='_blank'>
//                             <Image src='/u_facebook.svg' width={20} height={20} alt='fb' />
//                         </Link>
//                         <Link href={'https://x.com/qirim_news'} target='_blank'>
//                             <Image src='/u_twitter.svg' width={20} height={20} alt='twitter' />
//                         </Link>
//                         <Link href={'https://www.instagram.com/qirim.news'} target='_blank'>
//                             <Image src='/u_instagram.svg' width={20} height={20} alt='instagram' />
//                         </Link>
//                     </div>
//                 </div>
//                 {/* <div>
//                     <h2 className={'text-2xl font-semibold mb-5 lg:mb-10'}>Навігація</h2>

//                     <ul className={'grid grid-rows-5 grid-flow-col gap-4 lg:gap-6'}>
//                         {links.map((link, index) => (
//                             <li className={'text-sm font-normal lg:text-base'} key={index}>
//                                 <Link className='hover:text-[--accent-color]' href={link.href}>
//                                     {link.title}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div> */}
//                 <div className={'flex flex-col justify-between mt-8 lg:mt-0'}>
//                     <div className={'flex flex-col gap-y-11'}>
//                         {/* <SearchBox /> */}
//                         <LanguageSwitcher
//                             onClick={handleLanguageClick}
//                             textColor='text-[#01060A]'
//                         />
//                     </div>
//                     <ul
//                         className={
//                             'grid grid-cols-2 gap-4 max-w-xs lg:grid-cols-1 lg:gap-6 lg:max-w-md'
//                         }
//                     >
//                         {aboutLinks.map((link, index) => (
//                             <li className={'text-sm font-normal lg:text-base'} key={index}>
//                                 <Link className='hover:text-[--accent-color]' href={link.href}>
//                                     {link.title}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//             <div>
//                 <address
//                     className={
//                         'max-w-[1497px] m-auto text-sm font-normal grid grid-rows-5 grid-flow-col items-center gap-2.5 text-center mt-2.5 text-[--secondary-color-2] md:grid-rows-3 xl:grid-rows-2'
//                     }
//                 >
//                     <p>ТОВ &quot;АГЕНТСТВО&quot; &quot;КРИМСЬКІ НОВИНИ&quot;</p>
//                     <p>01001, місто Київ, вулиця Михайлівська, будинок 2, офіс 34</p>
//                     <p>+380 (63) 477 83 20</p>
//                     <p>newsqirim@gmail.com</p>
//                     <p>Ідентифікатор в Реєстрі суб’єктів у сфері медіа: R40-04012</p>
//                 </address>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

'use client';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SocialLink from './SocialLink';
import '../../styles/footer.scss';
import {useTranslations} from "next-intl";
// import LanguageSwitcher from '../header/LanguageSwitcher';

type LinkData = {
    title: string;
    href: string;
};

const Footer = () => {
    const t = useTranslations('footer');
    const {links, aboutLinks}: { links: LinkData[]; aboutLinks: LinkData[] } = {
        links: [
            {title: 'Головна', href: '/'},
            {title: 'Усі новини', href: '/news'},
            {title: 'Публiкацii', href: '/publications'},
            {title: 'Відео', href: '/videos'},
            {title: 'Блоги', href: '/blogs'},
            {title: 'Права людини', href: '#'},
            {title: 'Війна', href: '#'},
            {title: 'Політика', href: '#'},
            {title: 'Культура', href: '#'},
            {title: 'Спорт', href: '#'},
            {title: 'Освіта', href: '#'},
            {title: 'Історія', href: '#'},
            {title: 'Економіка', href: '#'},
            {title: 'Екологія', href: '#'},
            {title: 'Суспільство', href: '#'},
            {title: 'Міжнародні новини', href: '#'}
        ],
        aboutLinks: [
            {title: t('contacts'), href: '#'},
            {title: t('ourTeam'), href: '#'},
            {title: t('partners'), href: '#'},
            {title: t('ourMission'), href: '#'}
        ]
    };

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleLanguageClick = (languageCode: any) => {
        setSelectedLanguage(languageCode);
        console.log('Выбранный язык:', languageCode);
    };

    // Функция для обработки клика на контакты
    const handleContactClick = () => {
        alert(
            'Контакти:\n01001, місто Київ, вулиця Михайлівська, будинок 2, офіс 34\n+380 (63) 477 83 20\nnewsqirim@gmail.com'
        );
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

                <div className={'flex flex-col justify-between mt-8 lg:mt-0'}>
                    <div className={'flex flex-col gap-y-11'}>
                        {/* <SearchBox /> */}
                        {/* <LanguageSwitcher
                            onClick={handleLanguageClick}
                            textColor='text-[#01060A]'
                        /> */}
                    </div>
                    <ul
                        className={
                            'grid grid-cols-2 gap-4 max-w-xs lg:grid-cols-1 lg:gap-6 lg:max-w-md'
                        }
                    >
                        {aboutLinks.map((link, index) => (
                            <li className={'text-sm font-normal lg:text-base'} key={index}>
                                {/* Добавим обработчик клика на "Контакты" */}
                                <Link
                                    className='hover:text-[--accent-color]'
                                    href={link.href}
                                    onClick={
                                        link.title === 'Контакти' ? handleContactClick : undefined
                                    }
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
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
