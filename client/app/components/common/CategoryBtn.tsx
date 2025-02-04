import React, { useState } from 'react';

const CategoryBtn = ({ setCategory }: any) => {
    const categoryBtnList = [
        { id: 'Всі' },
        { id: 'Права людини' },
        { id: 'Війна' },
        { id: 'Політика' },
        { id: 'Культура' },
        { id: 'Спорт' },
        { id: 'Освіта' },
        { id: 'Історія' },
        { id: 'Економіка' },
        { id: 'Екологія' },
        { id: 'Суспільство' },
        { id: 'Міжнародні новини' }
    ];

    const [activeCategory, setActiveCategory] = useState('Всі');

    const handleCategoryClick = (category: string) => {
        setActiveCategory(category);
        setCategory(category);
    };

    return (
        <div className={'flex gap-2.5 overflow-auto'}>
            {categoryBtnList.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleCategoryClick(item.id)}
                    className={`text-xs font-medium py-2.5 px-5 whitespace-nowrap rounded-md ${activeCategory === item.id ? 'bg-[#F0CA56] text-[#000]' : 'bg-[--secondary-color-4] hover:bg-[#DBDBDB]'}`}
                >
                    {item.id}
                </button>
            ))}
        </div>
    );
};

export default CategoryBtn;
