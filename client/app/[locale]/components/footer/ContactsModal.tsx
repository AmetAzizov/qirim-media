'use client';
import {useEffect, useRef} from 'react';
import {useTranslations} from 'next-intl';

const PHONE = '+380 (63) 477 83 20';
const EMAIL = 'newsqirim@gmail.com';

interface ContactsModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ContactsModal({open, onClose}: ContactsModalProps) {
    const t = useTranslations('footer');
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Нативный <dialog>: focus trap, Escape и возврат фокуса работают из коробки
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        if (!open && dialog.open) dialog.close();
    }, [open]);

    const items = [
        {label: t('address'), value: t('addressOffice'), href: undefined},
        {label: t('phone'), value: PHONE, href: `tel:${PHONE.replace(/[^\d+]/g, '')}`},
        {label: t('email'), value: EMAIL, href: `mailto:${EMAIL}`}
    ];

    return (
        <dialog
            ref={dialogRef}
            onClose={onClose}
            onClick={e => e.target === dialogRef.current && onClose()}
            aria-labelledby='contacts-title'
            className='m-auto w-[calc(100%-32px)] max-w-md rounded-2xl bg-white p-6 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur-sm'
        >
            <div className='flex items-start justify-between gap-4'>
                <h2 id='contacts-title' className='text-2xl font-semibold'>
                    {t('contacts')}
                </h2>
                <button
                    type='button'
                    onClick={onClose}
                    aria-label={t('close')}
                    className='-mr-2 -mt-2 rounded-lg p-2 hover:bg-gray-100'
                >
                    <svg
                        className='h-6 w-6'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        aria-hidden='true'
                    >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M6 18L18 6M6 6l12 12'
                        />
                    </svg>
                </button>
            </div>

            <p className='mt-1 text-sm text-gray-500'>{t('firmName')}</p>

            <dl className='mt-5 space-y-4'>
                {items.map(item => (
                    <div key={item.label}>
                        <dt className='text-xs uppercase tracking-wide text-gray-500'>
                            {item.label}
                        </dt>
                        <dd className='mt-0.5 text-base'>
                            {item.href ? (
                                <a className='hover:text-[--accent-color]' href={item.href}>
                                    {item.value}
                                </a>
                            ) : (
                                item.value
                            )}
                        </dd>
                    </div>
                ))}
            </dl>
        </dialog>
    );
}
