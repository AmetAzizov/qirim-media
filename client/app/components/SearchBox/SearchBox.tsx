'use client';

import Image from 'next/image';
import {useEffect, useState} from 'react';
import {useIsClient} from '@/app/lib/hooks';
import {Combobox} from '@headlessui/react';
import {useRouter} from 'next/navigation';
import {useDebounce} from 'use-debounce';

export default function SearchBox() {
    const router = useRouter();
    const isClient = useIsClient();
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 300);
    const [newsPosts, setNewsPosts] = useState([]);
    useEffect(() => {
        if (debouncedQuery.length > 1) {
            const controller = new AbortController();
            (async () => {
                const url = '/api/search?query=' + encodeURIComponent(debouncedQuery);
                const response = await fetch(url, {signal: controller.signal});
                const newsPosts = await response.json();
                setNewsPosts(newsPosts);
            })();
            return () => controller.abort();
        } else {
            setNewsPosts([]);
        }
    }, [debouncedQuery]);

    const handleChange = newsPost => {
        router.push(`/news/${newsPost.slug}`);
    };

    if (!isClient) {
        return null;
    }
    return (
        <div className='relative w-48'>
            <Combobox onChange={handleChange}>
                <div className={'m-2.5 absolute left-0'}>
                    <Image src='/u_search.svg' width={18} height={18} alt='search' />
                </div>
                <Combobox.Input
                    placeholder='Пошук по сайту'
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    className='${inputBg} w-full py-2.5 pl-10 pr-5 rounded-md focus:outline-[--primary-color-5] text-xs'
                />
                <Combobox.Options className='absolute bg-white py-1 w-full'>
                    {newsPosts.map(newsPost => (
                        <Combobox.Option key={newsPost.slug} value={newsPost}>
                            {({active}) => (
                                <span
                                    className={`block px-2 truncate w-full cursor-pointer ${
                                        active ? 'bg-[--accent-color]' : ''
                                    }`}
                                >
                                    {newsPost.title}
                                </span>
                            )}
                        </Combobox.Option>
                    ))}
                </Combobox.Options>
            </Combobox>
        </div>
    );
}
