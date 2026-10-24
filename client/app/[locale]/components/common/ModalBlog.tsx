'use client';
import React, {useEffect, useRef, useState} from 'react';
import {useLocale} from 'next-intl';

const MAX_SIZE = 1024 * 1024;

const fieldClass =
    'w-full border border-[#E5E7EB] rounded-md py-2.5 px-3 text-sm bg-white placeholder:text-[#9CA3AF] focus:outline-[--primary-color-5]';
const labelClass = 'text-xs font-semibold mb-1.5';

const ModalBlog = ({onClose}: any) => {
    const locale = useLocale();
    const [visible, setVisible] = useState(false);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState('');
    const avatarInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > MAX_SIZE) {
            setError('Аватар має бути до 1 MB');
            return;
        }
        setError('');
        setAvatar(file);
        setAvatarPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!avatar) return setError('Завантажте аватар автора');

        const data = new FormData(e.currentTarget);
        data.append('avatar', avatar);
        data.append('locale', locale);

        setStatus('sending');
        setError('');
        try {
            const res = await fetch('/api/blog-submit', {method: 'POST', body: data});
            if (!res.ok) throw new Error();
            setStatus('success');
        } catch {
            setStatus('idle');
            setError('Не вдалося надіслати. Спробуйте ще раз пізніше.');
        }
    };

    const closeBtn = (
        <button className='w-6 h-6 absolute top-6 right-6' onClick={onClose} type='button' aria-label='Закрити'>
            <span className='bg-black w-0.5 h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45'></span>
            <span className='bg-black w-0.5 h-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45'></span>
        </button>
    );

    return (
        <div
            onClick={onClose}
            className='overlay fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center'
        >
            <div
                onClick={e => e.stopPropagation()}
                className={`relative transform transition-all duration-500 ease-out ${
                    visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                } max-w-[959px] w-full max-h-[95vh] p-4 bg-white overflow-auto rounded-xl shadow-xl lg:px-10 lg:py-6`}
            >
                {closeBtn}

                {status === 'success' ? (
                    <div className='text-center py-16'>
                        <h3 className='font-semibold text-xl lg:text-2xl mb-3'>Дякуємо! Ваш пост надіслано</h3>
                        <p className='text-sm text-[#4B5563] mb-8'>
                            Він з’явиться на сайті після перевірки модератором.
                        </p>
                        <button
                            type='button'
                            onClick={onClose}
                            className='font-medium text-sm bg-[--accent-color] px-5 py-2.5 rounded-md'
                        >
                            Закрити
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className='grid gap-y-5 lg:gap-y-3'>
                        <h3 className='font-semibold text-lg lg:text-xl pr-8'>
                            Висловлюйте свою думку на будь яку тему, <br /> та публікуйтеся на нашому порталі
                        </h3>

                        {/* honeypot для ботів */}
                        <input
                            type='text'
                            name='website'
                            tabIndex={-1}
                            autoComplete='off'
                            className='hidden'
                            aria-hidden='true'
                        />

                        <div className='grid gap-5 lg:grid-cols-2 lg:gap-x-3'>
                            <div className='flex flex-col'>
                                <label className={labelClass} htmlFor='name'>
                                    Назвіть себе (Ваше ім’я) *
                                </label>
                                <input className={fieldClass} id='name' name='name' maxLength={100} required />
                            </div>
                            <div className='flex flex-col'>
                                <label className={labelClass} htmlFor='email'>
                                    Ваш Email *
                                </label>
                                <input className={fieldClass} id='email' name='email' type='email' required />
                            </div>
                        </div>

                        <div>
                            <p className={labelClass}>Аватар автора *</p>
                            <div className='flex items-center gap-3'>
                                <div className='w-[34px] h-[34px] rounded-full bg-[#E5E7EB] overflow-hidden'>
                                    {avatarPreview && (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img src={avatarPreview} alt='' className='w-full h-full object-cover' />
                                    )}
                                </div>
                                <button
                                    type='button'
                                    onClick={() => avatarInput.current?.click()}
                                    className='text-xs font-medium border border-[#E5E7EB] rounded-md px-3 py-1.5 bg-white'
                                >
                                    Завантажити
                                </button>
                                <input
                                    ref={avatarInput}
                                    type='file'
                                    accept='image/png,image/jpeg'
                                    className='hidden'
                                    onChange={handleAvatar}
                                />
                            </div>
                        </div>

                        <div className='flex flex-col'>
                            <label className={labelClass} htmlFor='title'>
                                Заголовок *
                            </label>
                            <input className={fieldClass} id='title' name='title' maxLength={200} required />
                        </div>

                        <div className='flex flex-col'>
                            <label className={labelClass} htmlFor='text'>
                                Текст *
                            </label>
                            <textarea
                                className={`${fieldClass} h-[160px] resize-y`}
                                id='text'
                                name='text'
                                maxLength={30000}
                                placeholder='Текст'
                                required
                            />
                        </div>

                        {error && <p className='text-sm text-red-600'>{error}</p>}

                        <button
                            className='lg:mt-0 mt-2 font-medium text-sm bg-[--accent-color] px-5 py-3 rounded-md justify-self-start disabled:opacity-60'
                            type='submit'
                            disabled={status === 'sending'}
                        >
                            {status === 'sending' ? 'Надсилаємо...' : 'Створити пост'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ModalBlog;
