'use-client';
import {useState, useEffect} from 'react';
import '../../styles/burger-menu.scss';
import SearchInput from './SearchInput';
import LanguageSwitcher from './LanguageSwitcher';
import SubscribeButton from './SubscribeButton';
import CategoryList from './CategoryList';

type BurgerMenuProps = {
    onMenuToggle: any;
};

const BurgerMenu = ({onMenuToggle}: BurgerMenuProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        onMenuToggle(isMenuOpen);
    }, [isMenuOpen, onMenuToggle]);

    useEffect(() => {
        const sliderElement = document.querySelector('.slick-slider') as HTMLElement;

        if (sliderElement) {
            if (isMenuOpen) {
                sliderElement.style.zIndex = '-1';
            } else {
                sliderElement.style.zIndex = '0'; // или другое начальное значение
            }
        }
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleLanguage = (e: any) => {
        console.log(`Выбран язык: ${e}`);
    };

    return (
        <div className='burger-menu lg:hidden'>
            <button
                className={`${'burger-icon'} ${isMenuOpen ? 'open' : ''}`}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                <div className='bar'></div>
                <div className='bar'></div>
                <div className='bar'></div>
            </button>
            <ul className={`menu p-4 ${isMenuOpen ? 'open' : ''}`}>
                <SearchInput inputBg='bg-[--secondary-color-4]' />
                <hr className={'border-[#DBDBDB] my-7'} />
                <CategoryList onClose={closeMenu} categories={['/', 'news', 'videos', 'blogs']} />
                <div className={'flex items-center justify-between'}>
                    <div>
                        <LanguageSwitcher onClick={function (languageCode: string): void {
                            throw new Error('Function not implemented.');
                        } } textColor={''} />
                    </div>
                    <SubscribeButton />
                </div>
            </ul>
        </div>
    );
};

export default BurgerMenu;
