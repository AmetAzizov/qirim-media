// 'use client'
// import Link from 'next/link';
// import {usePathname} from 'next/navigation';
// import Image from 'next/image';
// import React from 'react';

// const BreadCrumbs = () => {
//     const pathname = usePathname();
//     const pathParts = pathname.split('/').filter(part => part);
//     const breadcrumbs = [{label: 'Головна', href: '/'}];

//     pathParts.forEach((part, idx) => {
//         const href = `/${pathParts.slice(0, idx + 1).join('/')}`;
//         const defaultLabel = part.charAt(0).toLowerCase() + part.slice(1).replace('-', ' ');
//         const customLabels: {[key: string]: string} = {
//             news: 'Всi новини',
//             publications: 'Публікації',
//             blogs: 'Блоги',
//             videos: 'Відео'
//         };
//         const label = customLabels[part] || defaultLabel;
//         breadcrumbs.push({label, href});
//     });

//     return (
//         <nav
//             className={
//                 'flex items-center text-[#A8A8A8] py-5 text-xs lg:text-base lg:pt-11 lg:pb-7 whitespace-nowrap overflow-x-auto'
//             }
//         >
//             {breadcrumbs.map(({label, href}, idx) => (
//                 <React.Fragment key={href}>
//                     <div className={`${idx === breadcrumbs.length - 1 ? 'max-w-[350px] overflow-hidden whitespace-nowrap text-ellipsis' : ''}`}>
//                         <Link className={`${pathname === href ? 'text-[--accent-color]' : ''} hover:text-[--accent-color]`} href={href}>
//                             {label}
//                         </Link>
//                     </div>
//                     {idx !== breadcrumbs.length - 1 && (
//                         <Image
//                             className={'mx-1.5'}
//                             src='/arrow-right.svg'
//                             width={9}
//                             height={12}
//                             alt='arrow-right'
//                         />
//                     )}
//                 </React.Fragment>
//             ))}
//         </nav>
//     );
// };

// export default BreadCrumbs;

'use client'
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import Image from 'next/image';
import React from 'react';

const BreadCrumbs = () => {
    const pathname = usePathname();
    const pathParts = pathname.split('/').filter(part => part);
    const breadcrumbs = [{label: 'Головна', href: '/'}];

    pathParts.forEach((part, idx) => {
        const href = `/${pathParts.slice(0, idx + 1).join('/')}`;
        const defaultLabel = part.charAt(0).toLowerCase() + part.slice(1).replace('-', ' ');
        const customLabels: {[key: string]: string} = {
            news: 'Всi новини',
            publications: 'Публікації',
            blogs: 'Блоги',
            videos: 'Відео'
        };
        const label = customLabels[part] || defaultLabel;
        breadcrumbs.push({label, href});
    });

    return (
        <nav
            className={
                'flex items-center text-[#A8A8A8] py-5 text-xs lg:text-base lg:pt-11 lg:pb-7 whitespace-nowrap overflow-x-auto'
            }
        >
            {breadcrumbs.map(({label, href}, idx) => (
                <React.Fragment key={href}>
                    {idx === breadcrumbs.length - 1 ? (
                        <span className={'text-[--accent-color] max-w-[350px] overflow-hidden whitespace-nowrap text-ellipsis'}>
                            ...
                        </span>
                    ) : (
                        <div>
                            <Link
                                className={`hover:text-[--accent-color]`}
                                href={href}
                            >
                                {label}
                            </Link>
                        </div>
                    )}
                    {idx !== breadcrumbs.length - 1 && (
                        <Image
                            className={'mx-1.5'}
                            src='/arrow-right.svg'
                            width={9}
                            height={12}
                            alt='arrow-right'
                        />
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
};

export default BreadCrumbs;
