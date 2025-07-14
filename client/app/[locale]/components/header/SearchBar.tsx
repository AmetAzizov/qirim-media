'use client';

import {useSearchModalStore} from '@/stores/searchModalStore';
import {useRouter} from 'next/navigation';
import React, {useEffect, useRef, useState, startTransition} from 'react';
import '../../styles/search-bar.scss';
import SearchInput from "@/app/[locale]/components/header/SearchInput";
import CloseButton from "@/public/close-button.svg";

const SearchBar = () => {
    const {isOpen, closeModal} = useSearchModalStore();
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setVisible(true), 10); // 10ms задержка, чтобы класс успел примениться
        } else {
            setVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);

            const onKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            };

            document.addEventListener('keydown', onKeyDown);
            return () => document.removeEventListener('keydown', onKeyDown);
        }
    }, [isOpen, closeModal]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (query.trim()) {
            const q = query.trim();

            startTransition(() => {
                router.push(`/search?query=${encodeURIComponent(q)}`);
            });

            setTimeout(() => closeModal(), 150);
            setQuery('');
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md transition-opacity duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => {
                setVisible(false);
                setTimeout(() => closeModal(), 200);
            }}
        >
            <button
                onClick={() => {
                    setVisible(false);
                    setTimeout(() => closeModal(), 200);
                }}
                className="absolute top-12 right-12 text-[--background-color] hover:text-black"
                type="button"
            >
                <CloseButton className="w-[24px] h-[24px] fill-[#f5f5f5] hover:fill-[#c2c2c2]"/>
            </button>

            <div
                className={`relative max-w-[704px] w-full transition-all duration-300 transform ${
                    visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    className="relative flex items-center w-full text-2xl lg:text-4xl"
                    onSubmit={handleSubmit}
                >
                    <SearchInput
                        query={query}
                        setQuery={setQuery}
                        darkStyle={true}
                        onSubmit={() => {
                            if (query.trim()) {
                                router.push(`/search?query=${encodeURIComponent(query.trim())}`);
                                setQuery('');
                                setVisible(false);
                                setTimeout(() => closeModal(), 200);
                            }
                        }}
                        autoFocus
                    />
                </form>
            </div>
        </div>
    );
};

export default SearchBar;
