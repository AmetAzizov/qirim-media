'use-client';
import Image from 'next/image';
import React, {useState, useEffect} from 'react';
import '../../styles/burger-menu.scss';
// import SearchInput from './SearchInput';
import LanguageSwitcher from './LanguageSwitcher';
import SubscribeButton from './SubscribeButton';
import CategoryList from './CategoryList';

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = () => {
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isOpen]);

    // const handleLanguage = (e: any) => {
    //     console.log(`Выбран язык: ${e}`);
    // };

    return (
        <React.Fragment>
            <button
                className={`w-[28px] h-[28px] lg:hidden ${isOpen ? 'open' : ''}`}
                onClick={openMenu}
            >
                <Image src='/burger-ico.svg' width={28} height={28} alt='open-btn' />
            </button>

            <ul className={`menu p-4 ${isOpen ? 'open' : ''}`}>
                <div className={'flex justify-between items-center mb-4'}>
                    <Image src='/logo-black.svg' width={87} height={39} alt='Logo-black' />
                    <button
                        className={`w-[20px] h-[20px] lg:hidden ${isOpen ? 'open' : ''}`}
                        onClick={closeMenu}
                    >
                        <Image src='/close-button.svg' width={20} height={20} alt='close-btn' />
                    </button>
                </div>
                {/* <SearchInput inputBg='bg-[--secondary-color-4]' /> */}
                <hr className={'border-[#DBDBDB] my-7'} />
                <CategoryList onClose={closeMenu} categories={['/', 'news', 'publications', 'videos', 'blogs']} />
                <div className={'flex items-center justify-between mt-7'}>
                    <div>
                        <LanguageSwitcher
                            onClick={function (languageCode: string): void {
                                throw new Error('Function not implemented.');
                            }}
                            textColor={''}
                        />
                    </div>
                    <SubscribeButton />
                </div>
            </ul>
        </React.Fragment>
    );
};

export default BurgerMenu;
