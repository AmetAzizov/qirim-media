'use client';
import {useState} from 'react';
import Image from 'next/image';

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');

    return (
        <div className={'relative'}>
            <button
                className={`${
                    isOpen ? 'bg-[#C22C2C]' : ''
                } relative rounded-r-md py-2 px-2.5 ml-6 z-10`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    style={{height: '24px'}}
                    src={isOpen ? '/u_search-close.svg' : '/main_u_search.svg'}
                    width={24}
                    height={24}
                    alt='search-icons'
                />
            </button>
            {isOpen && (
                <form className={'w-96 absolute right-0 top-0'}>
                    <input
                        className={'w-full rounded-md py-2 pl-3 pr-14'}
                        type='text'
                        placeholder='Пошук по сайту...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    {/* Здесь может быть кнопка отправки или другие элементы интерфейса */}
                </form>
            )}
        </div>
    );
};

export default SearchBar;
