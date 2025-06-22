import Link from 'next/link';
import React from 'react';
import {useTranslations} from "next-intl";

const SubscribeButton = () => {
    const t = useTranslations('subscribeButton')
    return (
        <Link
            className={`text-xs font-medium bg-[--accent-color] ml-2.5 text-[--text-color] py-2 px-4 rounded lg:text-sm`}
            href={'https://t.me/qirimnews'}
            target='_blank'
        >
            {t('subscribe')}
        </Link>
    );
};

export default SubscribeButton;
