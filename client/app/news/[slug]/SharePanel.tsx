'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../styles/home.scss';

const SharePanel = ({link}: any) => {
    const [copied, setCopied] = useState(false);

    const fullLink = `https://qirim.news/news/${link}`;
    const shareLinks = [
        {
            name: 'Twitter',
            href: `https://twitter.com/intent/tweet?url=${fullLink}`,
            icon: `/black-twitter.svg`
        },
        {
            name: 'Facebook',
            href: `https://www.facebook.com/sharer/sharer.php?u=${fullLink}`,
            icon: `/black-facebook.svg`
        },
        {
            name: 'WhatsApp',
            href: `https://wa.me/?text=${fullLink}`,
            icon: `/black-whatsapp.svg`
        },
        {
            name: 'Telegram',
            href: `https://t.me/share/url?url=${fullLink}`,
            icon: `/black-telegram.svg`
        }
    ];

    const handleCopy = () => {
        navigator.clipboard
            .writeText(fullLink)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => console.error('failed', err));
    };

    return (
        <div
            className={`flex justify-end mt-5 xl:absolute xl:mt-0 xl:right-0 xl:top-0 xl:flex-col xl:w-[50px] xl:justify-self-end`}
        >
            <button
                className={'p-4 bg-[--secondary-color-4] rounded-lg hover:bg-[--secondary-color] mr-8 xl:mr-0 xl:mb-2.5'}
                onClick={handleCopy}
            >
                <Image src='/clipboard.svg' width={20} height={20} alt='clipboard' />
            </button>
            <div className='flex items-center bg-[--secondary-color-4] rounded-lg xl:flex-col'>
                <Image
                    className={'mx-1.5 xl:mx-0 xl:my-1.5'}
                    src='/share-arrow.svg'
                    width={20}
                    height={20}
                    alt='share-arrow'
                />
                {shareLinks.map(({name, href, icon}: any) => (
                    <Link
                        className={
                            'flex items-center justify-center w-[40px] h-[40px] bg-[--background-color] rounded-md mr-1.5 hover:bg-[--secondary-color-3] xl:mr-0 xl:mb-1.5'
                        }
                        key={name}
                        href={href}
                        target='_blank'
                    >
                        <Image
                            className={'w-[24px] h-[24px]'}
                            src={icon}
                            width={20}
                            height={20}
                            alt='icon'
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SharePanel;
