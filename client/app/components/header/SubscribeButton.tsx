import React from 'react';

const SubscribeButton = () => {
    return (
        <button
            className={`text-xs font-medium bg-[--accent-color] ml-2.5 text-[--text-color] py-2 px-4 rounded lg:text-sm`}
            onClick={() => {
                // Здесь можно добавить обработчик для подписки
                console.log('Підписатись');
            }}
        >
            Підписатись
        </button>
    );
};

export default SubscribeButton;
