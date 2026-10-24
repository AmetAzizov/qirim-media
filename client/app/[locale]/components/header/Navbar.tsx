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
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const handleLanguageClick = (languageCode: any) => {
        setSelectedLanguage(languageCode);
        console.log('Выбранный язык:', languageCode);
    };

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav className={`site-nav p-4 ${isScrolled ? 'is-scrolled' : ''} ${isMenuOpen ? 'navbar-burger' : ''}`}>
            <div className={'flex my-0 mx-auto max-w-[1479px] justify-between'}>
                <Link className='flex items-center' href='/'>
                    <Image src='/logoqn.svg' width={138} height={28} alt='Logo QN' />
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
