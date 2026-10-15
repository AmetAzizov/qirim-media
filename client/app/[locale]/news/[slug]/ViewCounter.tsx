'use client';

import React, {useEffect, useState} from 'react';
import Image from 'next/image';

interface ViewCounterProps {
    documentId: string;
    initialViews: number;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ViewCounter = ({documentId, initialViews}: ViewCounterProps) => {
    const [views, setViews] = useState(initialViews);

    useEffect(() => {
        if (!documentId) return;

        // Засчитываем просмотр один раз за сессию браузера (F5 не накручивает)
        const storageKey = `viewed:${documentId}`;
        try {
            if (sessionStorage.getItem(storageKey)) return;
            sessionStorage.setItem(storageKey, '1');
        } catch {
            // sessionStorage может быть недоступен (приватный режим) — просто считаем
        }

        // Без AbortController: в StrictMode эффект запускается дважды, и отмена первого
        // запроса привела бы к тому, что просмотр не засчитается вовсе
        fetch(`${apiUrl}/news-posts/${encodeURIComponent(documentId)}/view`, {method: 'POST'})
            .then(res => (res.ok ? res.json() : null))
            .then(data => {
                if (typeof data?.views === 'number') setViews(data.views);
            })
            .catch(() => {});
    }, [documentId]);

    return (
        <div className={'flex items-center gap-x-2'}>
            <Image src='/u_eye.svg' width={26} height={22} alt='eye' />
            <span className={'text-xs font-medium text-[--secondary-color-5] lg:text-base'}>
                {views}
            </span>
        </div>
    );
};

export default ViewCounter;
