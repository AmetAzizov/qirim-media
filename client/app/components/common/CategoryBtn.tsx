import Link from 'next/link';
import React from 'react';

const CategoryBtn = ({customStyle}: any) => {
    const categoryBtnList = [
        {id: 'Всі', href: '/news'},
        {id: 'Публікації', href: '#'},
        {id: 'Новини України та світу', href: '#'},
        {id: 'Крим', href: '#'},
        {id: 'Інтервю', href: '#'},
        {id: 'Відео', href: '/videos'},
        {id: 'Блоги', href: '/blogs'}
    ];
    return (
        <div className={'flex gap-2.5 overflow-auto'}>
            {categoryBtnList.map(item => (
                <Link
                    style={customStyle}
                    href={item.href}
                    key={item.id}
                    className={
                        'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] whitespace-nowrap rounded-md hover:bg-[#F0CA56]'
                    }
                >
                    {item.id}
                </Link>
            ))}
        </div>
    );
};

export default CategoryBtn;
