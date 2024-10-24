'use client'; // Указываем, что компонент клиентский
import {useRouter} from 'next/navigation'; // Используем useRouter из next/navigation
import {useEffect, useState} from 'react';

const SearchPage = () => {
    const router = useRouter();
    const [searchResults, setSearchResults] = useState<any[]>([]); // Изначально пустой массив
    const [loading, setLoading] = useState(false); // Индикатор загрузки

    // Извлечение параметра query из строки запроса
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('query');

    useEffect(() => {
        if (query) {
            setLoading(true); // Устанавливаем индикатор загрузки
            fetchSearchResults(query); // Поиск по запросу
        }
    }, [query]);

    // Функция для получения результатов поиска
    const fetchSearchResults = async (query: string) => {
        try {
            const res = await fetch(`/api/search?query=${query}`);
            const data = await res.json();
            setSearchResults(data.results || []); // Если данных нет, устанавливаем пустой массив
        } catch (error) {
            console.error('Ошибка при поиске:', error);
            setSearchResults([]); // В случае ошибки тоже ставим пустой массив
        } finally {
            setLoading(false); // Отключаем индикатор загрузки
        }
    };

    return (
        <div>
            <h1>Результаты поиска для: {query}</h1>
            {loading ? (
                <p>Загрузка...</p>
            ) : searchResults.length > 0 ? (
                <ul>
                    {searchResults.map(result => (
                        <li key={result.id}>{result.title}</li>
                    ))}
                </ul>
            ) : (
                <p>Ничего не найдено</p>
            )}
        </div>
    );
};

export default SearchPage;
