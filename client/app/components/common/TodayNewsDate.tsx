'use client';
import React, {useEffect, useState} from 'react';

export default function TodayNewsDate() {
    const [currentDate, setCurrentDate] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const formatDateInKyiv = (date: number | Date | undefined) => {
        const options: Intl.DateTimeFormatOptions = {
            timeZone: 'Europe/Kiev',
            day: 'numeric',
            month: 'long'
        };
        return new Intl.DateTimeFormat('uk-UA', options).format(date as Date);
    };

    return (
        <h2 className={'title-text mb-9'}>
            Сьогоднi, <span className={'font-normal'}>{formatDateInKyiv(currentDate)}</span>
        </h2>
    );
}
