'use client';

import {usePathname, useRouter} from 'next/navigation';
import {locales} from '@/navigation';
import Link from "next/link";

interface LanguageSwitcherProps {
    onClick?: (languageCode: any) => void,
    textColor?: string
}

export default function LanguageSwitcher({onClick, textColor}: LanguageSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();

    const currentLocale = (() => {
        if (!pathname) return 'uk';
        const firstSegment = pathname.split('/')[1];
        return locales.includes(firstSegment as any) ? firstSegment : 'uk';
    })();

    const handleChangeLocale = (newLocale: string) => {
        if (!pathname) return;

        const segments = pathname.split('/');
        if (locales.includes(segments[1] as any)) {
            segments[1] = newLocale;
        } else {
            segments.splice(1, 0, newLocale);
        }

        const newPath = segments.join('/') || '/';
        router.push(newPath);
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