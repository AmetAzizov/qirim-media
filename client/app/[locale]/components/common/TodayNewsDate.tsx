// 'use client';
// import React, {useEffect, useState} from 'react';
// import {useTranslations} from "next-intl";
//
// export default function TodayNewsDate() {
//     const [currentDate, setCurrentDate] = useState<Date>(new Date());
//     const t = useTranslations('common');
//
//     useEffect(() => {
//         const interval = setInterval(() => {
//             setCurrentDate(new Date());
//         }, 60000);
//
//         return () => clearInterval(interval);
//     }, []);
//
//     const formatDateInKyiv = (date: number | Date | undefined) => {
//         const options: Intl.DateTimeFormatOptions = {
//             timeZone: 'Europe/Kiev',
//             day: 'numeric',
//             month: 'long'
//         };
//         return new Intl.DateTimeFormat('uk-UA', options).format(date as Date);
//     };
//
//     return (
//         <h2 className={'title-text mb-9'}>
//             {t('today')}, <span className={'font-normal'}>{formatDateInKyiv(currentDate)}</span>
//         </h2>
//     );
// }


'use client';
import React, {useEffect, useState} from 'react';
import {useTranslations, useLocale} from 'next-intl';

export default function TodayNewsDate() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const t = useTranslations('common');
    const locale = useLocale(); // получаем текущую локаль сайта

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const formatDateInKyiv = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Europe/Kyiv',
            day: 'numeric',
            month: 'long',
        };
        return new Intl.DateTimeFormat(locale, options).format(date);
    };

    return (
        <h2 className="title-text mb-9">
            {t('today')}, <span className="font-normal">{formatDateInKyiv(currentDate)}</span>
        </h2>
    );
}
