'use client';
import {useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../styles/navbar.scss';
import BurgerMenu from './BurgerMenu';
import CategoryList from './CategoryList';
import SearchBar from './SearchBar';
import LanguageSwitcher from './LanguageSwitcher';
import SubscribeButton from './SubscribeButton';
// import Loader from '../bgSlider/Loader';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const handleLanguageClick = (languageCode: any) => {
        setSelectedLanguage(languageCode);
        console.log('Выбранный язык:', languageCode);
    };

    return (
        <nav className={`p-4 ${isMenuOpen ? 'navbar-burger' : ''}`}>
            <div className={'flex my-0 mx-auto max-w-[1479px] justify-between'}>
                <Link className='flex items-center' href='/'>
                    <Image src='/logoqn.svg' width={87} height={39} alt='Logo QN' />
                </Link>
                <ul className={'hidden lg:flex lg:items-center'}>
                    <CategoryList categories={['/', 'news', 'publications', 'videos', 'blogs']} />
                </ul>
                <div className={'hidden lg:flex lg:items-center lg:justify-between'}>
                    <div>
                        <LanguageSwitcher onClick={handleLanguageClick} textColor='text-[#FFF]' />
                    </div>
                    <SubscribeButton />
                    <SearchBar />
                </div>
                {/* HAMBURGER BUTTON FOR MOBILE */}
                <BurgerMenu />
            </div>
        </nav>
    );
};

export default Navbar;
