'use client';

import {useLocale} from 'next-intl';
import {useSearchParams} from 'next/navigation';
import {usePathname, useRouter, routing} from '@/i18n/routing';
import Link from "next/link";

interface LanguageSwitcherProps {
    onClick?: (languageCode: any) => void,
    textColor?: string
}

export default function LanguageSwitcher({onClick, textColor}: LanguageSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentLocale = useLocale();
    const locales = routing.locales;

    const handleChangeLocale = async (newLocale: (typeof locales)[number]) => {
        if (newLocale === currentLocale) return;
        const query = searchParams?.toString();
        let target = query ? `${pathname}?${query}` : pathname;

        // У новости/блога на другом языке другой slug — ищем перевод в CMS
        const match = pathname.match(/^\/(news|blogs)\/([^/]+)$/);
        if (match) {
            const [, type, slug] = match;
            let translatedSlug: string | null = null;
            try {
                const res = await fetch(
                    `/api/localized-slug?type=${type}&slug=${encodeURIComponent(
                        decodeURIComponent(slug)
                    )}&from=${currentLocale}&to=${newLocale}`
                );
                translatedSlug = (await res.json()).slug;
            } catch {}
            // нет перевода — ведём на список, а не на 404
            target = translatedSlug ? `/${type}/${translatedSlug}` : `/${type}`;
        }

        router.replace(target, {locale: newLocale, scroll: false});
        onClick?.(newLocale);
    };

    return (
        <div className="flex gap-2">
            {locales.map(locale => {
                const isActive = locale === currentLocale;

                return (
                    <button
                        key={locale}
                        className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium ${
                            isActive ? 'active-language' : ''
                        }`}
                        onClick={() => handleChangeLocale(locale)}
                    >
                        {locale.toUpperCase()}
                    </button>
                );
            })}
            <Link
                className={`language-switcher p-2 text-sm font-semibold rounded lg:text-base lg:font-medium`}
                href={'https://www.qha.com.tr/'}
            >
                TR
            </Link>
        </div>
    );
}