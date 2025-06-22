'use client';
import React, {useEffect, useState} from 'react';
import Image from 'next/image';
import {useSearchParams} from 'next/navigation';
import {searchNewsPosts} from '../../[locale]/lib/newsPosts';
import Link from 'next/link';
import ContentLoader from 'react-content-loader';

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
                setError('Помилка у пошуку новин');
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    const renderSkeleton = () => (
        <ContentLoader viewBox='0 0 300 120' height={120} width='100%' speed={2}>
            <rect x='0' y='0' rx='8' ry='8' width='120' height='120' />
            <rect x='130' y='15' rx='4' ry='4' width='150' height='20' />
            <rect x='130' y='45' rx='4' ry='4' width='180' height='15' />
            <rect x='130' y='70' rx='4' ry='4' width='140' height='15' />
            <rect x='130' y='95' rx='4' ry='4' width='160' height='15' />
        </ContentLoader>
    );

    return (
        <section className='min-h-[80vh] px-4 mb-14 lg:mb-36'>
            <div className='max-w-[1479px] mx-auto my-0 pt-7'>
                <h2 className='title-text'>Пошук</h2>
                <p className={'my-4'}>
                    Результати за запитом: <b>{query}</b>
                </p>

                {loading && (
                    <ul className='max-w-[740px] pt-6 flex flex-col items-start'>
                        {Array(5)
                            .fill(null)
                            .map((_, index) => (
                                <li key={index} className='mb-5'>
                                    {renderSkeleton()}
                                </li>
                            ))}
                    </ul>
                )}
                {error && <p>{error}</p>}

                {!loading && searchResults.length === 0 && !error && <p className={'text-lg'}>Нічого не знайдено</p>}

                {searchResults.length > 0 && !loading && (
                    <ul className='max-w-[740px] pt-6'>
                        {searchResults.map(result => (
                            <li key={result.slug} className='mb-5'>
                                <Link className='flex' href={`news/${result.slug}`}>
                                    <Image
                                        className='h-[120px] min-w-[120px] max-w-[120px] w-full rounded-xl object-cover'
                                        src={`${result.image}`}
                                        width={220}
                                        height={120}
                                        alt='image'
                                    />
                                    <div className='flex flex-col justify-between items-baseline ml-5'>
                                        <button className='text-xs font-semibold text-[--primary-color-5] bg-[#D9EDFC] px-2 py-1 rounded-2xl mt-4'>
                                            {result.categoryList}
                                        </button>
                                        <p className='text-sm font-medium text-clip line-clamp-4 lg:text-base lg:line-clamp-3'>
                                            {result.title}
                                        </p>
                                        <time className='text-sm font-medium text-[--secondary-color-2]'>
                                            {result.date}
                                        </time>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
