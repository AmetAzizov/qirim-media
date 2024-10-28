'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useRouter, useSearchParams} from 'next/navigation';
import {searchNewsPosts} from '../lib/newsPosts';
import Link from 'next/link';

interface SearchResult {
    slug: string;
    image: string;
    categoryList: string;
    title: string;
    date: string;
}

export default function SearchNews() {
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';

    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await searchNewsPosts(query);
                setSearchResults(results);
            } catch (error) {
                setError('Ошибка при поиске новостей');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0 pt-7'}>
                <h2 className={'title-text'}>Пошук</h2>
                <p>
                    Результати за запитом: <b>{query}</b>
                </p>

                {loading && <p>Загрузка...</p>}
                {error && <p>{error}</p>}

                {searchResults.length > 0 ? (
                    <ul className={'max-w-[740px] pt-6'}>
                        {searchResults.map(result => (
                            <li key={result.slug} className={'mb-5'}>
                                <Link className={'flex'} href={`news/${result.slug}`}>
                                    <Image
                                        className={
                                            'h-[120px] min-w-[120px] max-w-[120px] w-full rounded-xl'
                                        }
                                        src={`${result.image}`}
                                        width={220}
                                        height={120}
                                        alt='image'
                                    />
                                    <div
                                        className={
                                            'flex flex-col justify-between items-baseline ml-5'
                                        }
                                    >
                                        <button
                                            className={
                                                'text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'
                                            }
                                        >
                                            {result.categoryList}
                                        </button>
                                        <p
                                            className={
                                                'text-sm font-medium text-clip line-clamp-4 lg:text-base lg:line-clamp-3'
                                            }
                                        >
                                            {result.title}
                                        </p>
                                        <time
                                            className={
                                                'text-sm font-medium text-[--secondary-color-2]'
                                            }
                                        >
                                            {result.date}
                                        </time>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : (
                    !loading && <p>Ничего не найдено</p>
                )}
            </div>
        </section>
    );
}
