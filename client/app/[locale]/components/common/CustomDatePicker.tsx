'use client';

import React, {useEffect, useMemo, useRef, useState} from 'react';
import DateIcon from '@/public/date-picker.svg';

type Props = {
    selected: Date | null;
    onChange: (date: Date | null) => void;
    locale: string;
};

const ACCENT = 'var(--primary-color-5)';

const labels: Record<string, { placeholder: string; clear: string }> = {
    uk: {placeholder: 'Оберіть дату', clear: 'Скинути'},
    en: {placeholder: 'Select date', clear: 'Clear'},
};

const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

export default function CustomDatePicker({selected, onChange, locale}: Props) {
    const intlLocale = locale === 'en' ? 'en-GB' : 'uk-UA';
    const t = labels[locale] ?? labels.uk;
    const today = useMemo(() => startOfDay(new Date()), []);

    const [open, setOpen] = useState(false);
    const [monthMode, setMonthMode] = useState(false);
    const [view, setView] = useState<Date>(selected ?? today);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const onDown = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
        document.addEventListener('mousedown', onDown);
        document.addEventListener('touchstart', onDown);
        document.addEventListener('keydown', onKey);
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('touchstart', onDown);
            document.removeEventListener('keydown', onKey);
        };
    }, [open]);

    const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
    const monthTitle = cap(new Intl.DateTimeFormat(intlLocale, {month: 'long', year: 'numeric'}).format(view))
        .replace(/\s?р\.$/, '');
    const monthShort = (m: number) =>
        cap(new Intl.DateTimeFormat(intlLocale, {month: 'short'}).format(new Date(2000, m, 1)).replace('.', ''));
    const weekdays = Array.from({length: 7}, (_, i) =>
        cap(new Intl.DateTimeFormat(intlLocale, {weekday: 'short'}).format(new Date(2024, 0, 1 + i)).replace('.', ''))
    );

    const year = view.getFullYear();
    const month = view.getMonth();
    const firstOffset = (new Date(year, month, 1).getDay() + 6) % 7; // Monday first
    const cells = Array.from({length: 42}, (_, i) => new Date(year, month, 1 - firstOffset + i));

    const canNext = year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth());
    const shiftMonth = (n: number) => setView(new Date(year, month + n, 1));

    const display = selected
        ? new Intl.DateTimeFormat(intlLocale, {day: '2-digit', month: '2-digit', year: 'numeric'}).format(selected)
        : t.placeholder;

    const arrow = (dir: 'l' | 'r', disabled: boolean, onClick: () => void) => (
        <button
            type="button"
            disabled={disabled}
            onClick={onClick}
            aria-label={dir === 'l' ? 'prev' : 'next'}
            className="w-9 h-9 flex items-center justify-center rounded-full text-xl disabled:opacity-30 hover:bg-black/5"
            style={{color: ACCENT}}
        >
            {dir === 'l' ? '←' : '→'}
        </button>
    );

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => {
                    setView(selected ?? today);
                    setMonthMode(false);
                    setOpen(o => !o);
                }}
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[--secondary-color-4] hover:bg-[#DBDBDB] cursor-pointer"
            >
                <span className="rounded-lg bg-[#D9EDFC] p-2"><DateIcon/></span>
                <span className="text-xs font-medium text-black whitespace-nowrap">{display}</span>
            </button>
            {selected && (
                <button
                    type="button"
                    onClick={() => onChange(null)}
                    aria-label={t.clear}
                    className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white shadow text-xs leading-5 text-center"
                >
                    ×
                </button>
            )}

            {open && (
                <div
                    className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-50 w-[min(320px,calc(100vw-24px))]
                               sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:translate-x-0 sm:translate-y-0
                               bg-white rounded-2xl shadow-2xl p-4"
                >
                    <div className="flex items-center justify-between mb-3">
                        <button
                            type="button"
                            onClick={() => setMonthMode(m => !m)}
                            className="font-semibold text-base"
                        >
                            {monthMode ? year : monthTitle} <span className="text-xs">{monthMode ? '' : '▾'}</span>
                        </button>
                        <div className="flex">
                            {monthMode
                                ? <>
                                    {arrow('l', false, () => setView(new Date(year - 1, month, 1)))}
                                    {arrow('r', year >= today.getFullYear(), () => setView(new Date(year + 1, month, 1)))}
                                </>
                                : <>
                                    {arrow('l', false, () => shiftMonth(-1))}
                                    {arrow('r', !canNext, () => shiftMonth(1))}
                                </>}
                        </div>
                    </div>

                    {monthMode ? (
                        <div className="grid grid-cols-3 gap-2">
                            {Array.from({length: 12}, (_, m) => {
                                const disabled = year > today.getFullYear() ||
                                    (year === today.getFullYear() && m > today.getMonth());
                                const active = m === month;
                                return (
                                    <button
                                        key={m}
                                        type="button"
                                        disabled={disabled}
                                        onClick={() => {
                                            setView(new Date(year, m, 1));
                                            setMonthMode(false);
                                        }}
                                        className="py-2.5 rounded-lg text-sm font-medium disabled:opacity-30"
                                        style={active ? {background: ACCENT, color: '#fff'} : undefined}
                                    >
                                        {monthShort(m)}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-1">
                                {weekdays.map(w => <span key={w} className="py-1">{w}</span>)}
                            </div>
                            <div className="grid grid-cols-7 gap-y-1 text-center">
                                {cells.map(d => {
                                    const outside = d.getMonth() !== month;
                                    const disabled = d > today;
                                    const active = !!selected && sameDay(d, selected);
                                    return (
                                        <button
                                            key={d.toISOString()}
                                            type="button"
                                            disabled={disabled}
                                            onClick={() => {
                                                onChange(d);
                                                setOpen(false);
                                            }}
                                            className={`mx-auto w-9 h-9 rounded-full text-sm font-medium
                                                ${outside ? 'text-gray-300' : 'text-black'} disabled:text-gray-300 hover:bg-black/5`}
                                            style={active
                                                ? {background: ACCENT, color: '#fff'}
                                                : sameDay(d, today) ? {border: `1px solid ${ACCENT}`} : undefined}
                                        >
                                            {d.getDate()}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}
