'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useLocale, useTranslations} from 'next-intl';
import '../../styles/home.scss';

const SharePanel = ({link}: any) => {
    const t = useTranslations('share');
    const locale = useLocale();
    const [copied, setCopied] = useState(false);

    const fullLink = `https://qirim.news${locale === 'uk' ? '' : `/${locale}`}/news/${link}`;
    const shareLinks = [
        {
            name: 'Twitter',
            href: `https://x.com/intent/tweet?url=${fullLink}`,
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
        <>
            <div
                role='status'
                aria-live='polite'
                className={`fixed left-1/2 bottom-6 z-[1000] flex items-center gap-2.5 rounded-xl bg-[--secondary-color-4] border border-[--secondary-color-3] px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 ${
                    copied
                        ? '-translate-x-1/2 translate-y-0 opacity-100'
                        : 'pointer-events-none -translate-x-1/2 translate-y-4 opacity-0'
                }`}
            >
                <svg width='20' height='20' viewBox='0 0 20 20' fill='none' aria-hidden='true'>
                    <circle cx='10' cy='10' r='10' fill='#22c55e' />
                    <path
                        d='M5.5 10.5l3 3 6-6.5'
                        stroke='#fff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                    />
                </svg>
                {t('copied')}
            </div>
        <div className='mt-5 xl:absolute xl:inset-y-0 xl:right-0 xl:mt-0 xl:w-[50px]'>
        <div className='flex justify-end xl:sticky xl:top-28 xl:flex-col'>
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
        </div>
        </>
    );
};

export default SharePanel;
