// 'use client'; // Указываем, что компонент клиентский
// import {useRouter} from 'next/navigation'; // Используем useRouter из next/navigation
// import {useEffect, useState, useRef} from 'react';
// import Image from 'next/image';

// const SearchBar = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [query, setQuery] = useState('');
//     const router = useRouter();
//     const searchRef = useRef(null);

//     const searchRef = useRef<HTMLElement>(null);

//     const searchRef = useRef<HTMLInputElement>(null);

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

//     const handleSearch = (e: React.FormEvent) => {
//         e.preventDefault();
//         if (query.trim()) {
//             router.push(`/search?query=${query}`);
//             setIsOpen(false); // Закрываем input после поиска
//         }
//     };

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
//                 <form onSubmit={handleSearch} className='w-96 absolute right-0 top-0'>
//                     <input
//                         className='w-full rounded-md py-2 pl-3 pr-10'
//                         type='text'
//                         placeholder='Пошук по сайту...'
//                         value={query}
//                         onChange={e => setQuery(e.target.value)}
//                     />
//                     <button
//                         type='submit' // Тип кнопки submit, чтобы отправлять форму
//                         className='absolute right-2 top-1/2 transform -translate-y-1/2'
//                     >
//                         <Image src='/u_search-close.svg' width={16} height={16} alt='close-icon' />
//                     </button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default SearchBar;

'use client'; // Указываем, что компонент клиентский
import {useRouter} from 'next/navigation'; // Используем useRouter из next/navigation
import {useEffect, useState, useRef} from 'react';
import Image from 'next/image';

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const router = useRouter();

    // Используем один useRef с корректным типом, если он ссылается на <div>
    const searchRef = useRef<HTMLDivElement>(null);

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

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?query=${query}`);
            setIsOpen(false); // Закрываем input после поиска
        }
    };

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
                <form onSubmit={handleSearch} className='w-96 absolute right-0 top-0'>
                    <input
                        className='w-full rounded-md py-2 pl-3 pr-10'
                        type='text'
                        placeholder='Пошук по сайту...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button
                        type='submit' // Тип кнопки submit, чтобы отправлять форму
                        className='absolute right-2 top-1/2 transform -translate-y-1/2'
                    >
                        <Image src='/u_search-close.svg' width={16} height={16} alt='close-icon' />
                    </button>
                </form>
            )}
        </div>
    );
};

export default SearchBar;
