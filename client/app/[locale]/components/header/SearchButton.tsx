'use client';
import Image from 'next/image';
import {useSearchModalStore} from "@/stores/searchModalStore";

const SearchButton = () => {
    const openModal = useSearchModalStore((state) => state.openModal);

    return (
        <button
            className='relative rounded-r-md py-2 px-2.5 ml-6 z-10'
            onClick={openModal}
            type='button'
        >
            <Image
                src={'/main_u_search.svg'}
                width={25}
                height={25}
                alt='search-icons'
            />
        </button>
    );
};

export default SearchButton;
