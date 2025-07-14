import { headers } from 'next/headers';

export function getCurrentLocale(): string {
    const headersList = headers();
    return headersList.get('x-next-intl-locale') || 'uk'; // fallback на 'uk'
}