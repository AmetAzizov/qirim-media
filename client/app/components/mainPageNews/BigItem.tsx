import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

type Props = {
    className: string;
};

const BigItem = ({className}: Props) => {
    return (
        <Link
            href={'#'}
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 50%, #000 100%), url('/main-news.png')`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
            className={`${className} flex items-end w-full rounded-xl p-4 lg:h-auto`}
        >
            <div className={'flex flex-col'}>
                <h2 className={'text-base font-medium text-[--background-color] text-clip line-clamp-2'}>
                    З нейтральної до недружньої або Як Росія образилась на Туреччину через підтримку
                    України
                </h2>
                <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                    10 Липня 2023
                </time>
            </div>
        </Link>
    );
};

export default BigItem;
