import {createSharedPathnamesNavigation} from 'next-intl/navigation';
export const locales = ['uk', 'en'] as const;
export const localePrefix = 'always';
export const {Link, redirect, usePathname, useRouter} =
    createSharedPathnamesNavigation({locales, localePrefix});