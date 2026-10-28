'use client';
import {useEffect, useState} from 'react';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import '../../styles/navbar.scss';
import BurgerMenu from './BurgerMenu';
import CategoryList from './CategoryList';
import SearchButton from "@/app/[locale]/components/header/SearchButton";
import LanguageSwitcher from './LanguageSwitcher';
import SubscribeButton from './SubscribeButton';

// import Loader from '../bgSlider/Loader';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const handleLanguageClick = (languageCode: any) => {
        setSelectedLanguage(languageCode);
        console.log('Выбранный язык:', languageCode);
    };

    useEffect(() => {
        let lastY = window.scrollY;
        const onScroll = () => {
            const y = window.scrollY;
            setIsScrolled(y > 80);
            if (y < 80) setIsHidden(false);
            else if (y > lastY + 4) setIsHidden(true);
            else if (y < lastY - 4) setIsHidden(false);
            lastY = y;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`site-nav p-4 ${isScrolled ? 'is-scrolled' : ''} ${isHidden ? 'is-hidden' : ''} ${isMenuOpen ? 'navbar-burger' : ''}`}>
            <div className={'flex my-0 mx-auto max-w-[1479px] justify-between'}>
                <Link className='flex items-center' href='/'>
                    <Image src='/logoqn.svg' width={153} height={28} alt='Logo QN' />
                </Link>
                <ul className={'hidden lg:flex lg:items-center'}>
                    <CategoryList categories={['/', 'news', 'publications', 'videos', 'blogs']} />
                </ul>
                <div className={'hidden lg:flex lg:items-center lg:justify-between'}>
                    <div>
                        <LanguageSwitcher onClick={handleLanguageClick} textColor='text-[#FFF]' />
                    </div>
                    <SubscribeButton />
                    <SearchButton />
                </div>
                {/* HAMBURGER BUTTON FOR MOBILE */}
                <BurgerMenu />
            </div>
        </nav>
    );
};

export default Navbar;
