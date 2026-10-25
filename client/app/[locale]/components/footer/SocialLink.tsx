import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

type SocialLinkProps = {
    href: string;
    src: string;
    text: string;
    altText: string;
};

const SocialLink = ({href, src, text, altText}: SocialLinkProps) => {
    return (
        <Link
            className={
                'social-network flex items-center justify-between w-full max-w-[339px] h-[84px] bg-[--background-color] mb-4 p-2 rounded-lg'
            }
            target='_blank'
            href={href}
        >
            <div className={'flex items-center'}>
                <Image src={src} width={73} height={73} alt={altText} />
                <p className={'text-lg font-semibold max-w-[180px]'}>{text}</p>
            </div>
            <Image
                className='self-start'
                src='/yellow-arrow.svg'
                width={30}
                height={30}
                alt='Yellow Arrow'
            />
        </Link>
    );
};

export default SocialLink;
