'use client';
import {useRouter} from 'next/navigation';

export const LoadMoreBtn = ({page}: any) => {
    const router = useRouter();
    const nextPage = page + 20;

    return (
        <button
            onClick={e => {
                e.preventDefault();
                router.push(`/news?page=${nextPage}`, undefined);
            }}
            className={
                'flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
            }
        >
            Бiльше новин
        </button>
    );
};

// import {useRouter} from 'next/navigation';

// handleLinkClick = () => {
//     router.push(`/news?page=${nextPage}`, undefined, {shallow: true});
// };

// export const LoadMoreBtn = () => {
//     const router = useRouter();
//     const nextPage = page + 20;

//     return (
//         <button
//             onClick={handleLinkClick}
//             // href={`/news?page=${page + 20}`}
//             className={
//                 'flex justify-center mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[145px] lg:text-base lg:mt-6'
//             }
//         >
//             Бiльше новин
//         </button>
//     );
// };
