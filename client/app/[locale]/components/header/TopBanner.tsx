'use client';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {useLocale} from "use-intl";

const TopBanner = () => {
    const [dateTime, setDateTime] = useState('');
    const locale = useLocale()

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const optionsTime: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Kiev'
            };
            const optionsDate: Intl.DateTimeFormatOptions = {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                timeZone: 'Europe/Kiev'
            };

            const formattedTime = new Intl.DateTimeFormat(locale, optionsTime).format(now);
            const formattedDate = new Intl.DateTimeFormat(locale, optionsDate).format(now);
            const formattedDateTime = `${formattedTime}, ${formattedDate}`;

            setDateTime(formattedDateTime);
        };

        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, [locale]);

    const bannerLinks = [
        {
            name: `Facebook`,
            link: `https://www.facebook.com/qirim.news`,
            icon: `/u_facebook.svg`
        },
        {
            name: `Twitter`,
            link: `https://x.com/qirim_news`,
            icon: `/u_twitter.svg`
        },
        {
            name: `Instagram`,
            link: `https://www.instagram.com/qirim.news`,
            icon: `/u_instagram.svg`
        },
        {
            name: `YouTube`,
            link: `https://www.youtube.com/@qirimnews9210`,
            icon: `/u_youtube.svg`
        }
    ];

    return (
        <div className={'hidden h-9 bg-[--secondary-color-4] xl:flex xl:items-center'}>
            <div className={'my-0 mx-auto w-full max-w-[1479px] xl:flex xl:row xl:justify-between'}>
                <div className={'text-sm text-[--secondary-color-5] font-medium'}>{dateTime}</div>
                <div className={'flex justify-between gap-x-7'}>
                    {bannerLinks.map(({name, link, icon}: any) => (
                        <Link key={name} href={link} target='_blank'>
                            <Image src={icon} width={20} height={20} alt={name} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopBanner;
