// 'use client';
// import {useRouter} from 'next/navigation';
// import {useEffect, useState, useRef} from 'react';
// import Image from 'next/image';

// const SearchBar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [query, setQuery] = useState('');
//     const router = useRouter();
//     const searchRef = useRef<HTMLDivElement>(null);

//     useEffect(() => {
//         const delayDebounceFn = setTimeout(() => {
//             if (query.trim()) {
//                 router.push(`/search?query=${query}`);
//             }
//         }, 500);

//         return () => clearTimeout(delayDebounceFn);
//     }, [query, router]);

//     const handleClickOutside = (event: MouseEvent) => {
//         if (
//             searchRef.current &&
//             event.target instanceof Node &&
//             !searchRef.current.contains(event.target)
//         ) {
//             setIsOpen(false);
//         }
//     };

//     useEffect(() => {
//         if (isOpen) {
//             document.addEventListener('mousedown', handleClickOutside);
//         } else {
//             document.removeEventListener('mousedown', handleClickOutside);
//         }
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [isOpen]);

//     return (
//         <div ref={searchRef} className='relative'>
//             <button
//                 className={`${
//                     isOpen ? 'bg-[#C22C2C]' : ''
//                 } relative rounded-r-md py-2 px-2.5 ml-6 z-10`}
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <Image
//                     src={isOpen ? '/u_search-close.svg' : '/main_u_search.svg'}
//                     width={25}
//                     height={25}
//                     alt='search-icons'
//                 />
//             </button>
//             {isOpen && (
//                 <div className='w-96 absolute right-0 top-0'>
//                     <input
//                         className='w-full rounded-md py-2 pl-3 pr-10'
//                         type='text'
//                         placeholder='Пошук по сайту...'
//                         value={query}
//                         onChange={e => setQuery(e.target.value)}
//                     />
//                 </div>
//             )}
//         </div>
//     );
// };

// export default SearchBar;

'use client';
import {useRouter} from 'next/navigation';
import {useState, useEffect, useRef} from 'react';
import Image from 'next/image';

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();
    const searchRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && query.trim()) {
            router.push(`/search?query=${query}`);
            setQuery('');
        }
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            searchRef.current &&
            event.target instanceof Node &&
            !searchRef.current.contains(event.target)
        ) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={searchRef} className='relative'>
            <button
                className={`${
                    isOpen ? 'bg-[#C22C2C]' : ''
                } relative rounded-r-md py-2 px-2.5 ml-6 z-10`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    src={isOpen ? '/u_search-close.svg' : '/main_u_search.svg'}
                    width={25}
                    height={25}
                    alt='search-icons'
                />
            </button>
            {isOpen && (
                <div className='w-96 absolute right-0 top-0'>
                    <input
                        className='w-full rounded-md py-2 pl-3 pr-10'
                        type='text'
                        placeholder='Пошук по сайту...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
