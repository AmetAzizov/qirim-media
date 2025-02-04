import React from 'react';
import DropBox from './DropBox';

const ModalBlog = ({onClose}: any) => {
    const handleContentClick = (e: any) => {
        e.stopPropagation();
    };
    const inputs = [
        {id: 'name', label: "Назвіть себе (Ваше ім'я) *", type: 'text', placeholder: "Ім'я"},
        {id: 'email', label: 'Ваш Email *', type: 'email', placeholder: 'Email'},
        {id: 'title', label: 'Заголовок *', type: 'text', placeholder: 'Заголовок'},
        // {id: 'thesis', label: 'Тезис *', type: 'textarea', placeholder: ''},
        {id: 'text', label: 'Текст *', type: 'textarea', placeholder: ''}
    ];

    const handleFileUpload = (file: File) => {
        console.log('File uploaded:', file);
        // Здесь обрабатывать или отправлять файл на сервер
    };

    return (
        <div
            onClick={onClose}
            className={'overlay fixed top-0 left-0 w-full h-full bg-black/[0.5] z-50'}
        >
            <form
                
                onClick={handleContentClick}
                className='grid fixed top-1/2 left-1/2 translate-x-[-50%] and translate-y-[-50%]
                max-w-[959px] w-full h-full p-4 gap-y-5 bg-[--background-color] overflow-auto mx-auto my-0 z-50 lg:rounded-xl lg:my-5 lg:h-100vh lg:p-12 lg:gap-y-7'
            >
                <button className={'w-6 h-6 absolute top-6 right-6'} onClick={onClose}>
                    <span className='bg-black w-1 h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45'></span>
                    <span className='bg-black w-1 h-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45'></span>
                </button>
                <h3 className='font-semibold lg:text-2xl'>
                    Висловлюйте свою думку на будь яку тему, <br /> та публiкуйтеся на нашому
                    порталi
                </h3>
                {inputs.map(input => (
                    <div key={input.id} className='flex flex-col w-full text-sm'>
                        <label className='text-sm font-semibold' htmlFor={input.id}>
                            {input.label}
                        </label>
                        {input.type === 'textarea' ? (
                            <textarea
                                className='border resize-none border-solid border-[#D1D5DB] rounded-md py-2.5 px-3 focus:outline-[--primary-color-5]'
                                id={input.id}
                                name={input.id}
                                required
                            />
                        ) : (
                            <input
                                className='border border-solid border-[#D1D5DB] rounded-md py-2.5 px-3 focus:outline-[--primary-color-5]'
                                type={input.type}
                                id={input.id}
                                name={input.id}
                                placeholder={input.placeholder}
                                required
                            />
                        )}
                    </div>
                ))}
                <div className='cursor-pointer'>
                    <label htmlFor='fileInput' className='text-sm font-semibold'>Зображення поста *</label>
                    <DropBox onUpload={handleFileUpload} />
                </div>

                <button
                    className={
                        'block mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[unset] lg:mx-[unset] lg:justify-self-start lg:text-base lg:mt-6'
                    }
                    type='submit'
                >
                    Створити пост
                </button>
            </form>
        </div>
    );
};

export default ModalBlog;
