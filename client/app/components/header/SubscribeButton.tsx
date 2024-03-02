import Link from 'next/link';
import React from 'react';

const SubscribeButton = () => {
    return (
        <Link
            className={`text-xs font-medium bg-[--accent-color] ml-2.5 text-[--text-color] py-2 px-4 rounded lg:text-sm`}
            href={'https://t.me/qirimnews'}
            target='_blank'
        >
            Підписатись
        </Link>
    );
};

export default SubscribeButton;
