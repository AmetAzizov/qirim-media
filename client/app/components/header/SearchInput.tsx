import React from 'react';
import Image from 'next/image';
import SearchBox from '../SearchBox/SearchBox';

type SearchInputProps = {
    inputBg: string;
};

const SearchInput = ({inputBg}: SearchInputProps) => {
    return (
        <form className={'flex items-center relative justify-center'}>
            <div className={'m-2.5 absolute left-0'}>
                <Image src='/u_search.svg' width={18} height={18} alt='search' />
            </div>
            <input
                className={`${inputBg} w-full py-2.5 pl-10 pr-5 rounded-md focus:outline-[--primary-color-5] text-xs`}
                type='text'
                placeholder='Пошук по сайту...'
            />
            {/* <SearchBox /> */}
        </form>
    );
};

export default SearchInput;
