'use client';
import React, {useRef, useEffect} from 'react';
import SearchIcon from '@/public/u_search.svg'
import CloseIcon from '@/public/close-button.svg';

interface SearchInputProps {
    query: string;
    setQuery: (value: string) => void;
    onSubmit: () => void;
    autoFocus?: boolean;
    darkStyle?: boolean;
}

export default function SearchInput({
                                        query,
                                        setQuery,
                                        onSubmit,
                                        autoFocus = false,
                                        darkStyle = false,
                                    }: SearchInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (autoFocus) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [autoFocus]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            onSubmit();
        }
    };

    return (
        <div className="relative w-full">
            <input
                ref={inputRef}
                type="text"
                placeholder="Пошук"
                className={`c-search__input w-full pr-26 py-4 outline-none text-3xl border-b border-solid ${darkStyle ? 'text-[#f5f5f5] border-[#f5f5f5]' : 'text-[#01060a] border-[#01060a]'}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus={autoFocus}
            />

            {query && (
                <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="absolute right-14 top-1/2 -translate-y-1/2"
                    aria-label="Очистити"
                >
                    <CloseIcon
                        className={`w-[24px] h-[24px] hover:opacity-50 ${darkStyle ? 'fill-[#f5f5f5]' : 'fill-[#01060a]'}`}/>
                </button>
            )}

            <button
                type="button"
                onClick={onSubmit}
                className="absolute right-2 top-1/2 -translate-y-1/2"
            >
                <SearchIcon className={`w-[32px] h-[32px] hover:opacity-50 ${darkStyle ? 'fill-[#f5f5f5]' : 'fill-[#01060a]'}`} />
            </button>
        </div>
    );
}