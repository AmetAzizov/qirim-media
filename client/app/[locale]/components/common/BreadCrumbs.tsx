'use client';
import {Link, usePathname} from '@/i18n/routing';
import {useTranslations} from 'next-intl';
import {Fragment} from 'react';

const SECTIONS = ['news', 'publications', 'blogs', 'partners'] as const;
type Section = (typeof SECTIONS)[number];

const isSection = (part: string): part is Section => (SECTIONS as readonly string[]).includes(part);

// `current` — title of the opened article; shown instead of the raw slug in the last crumb.
const BreadCrumbs = ({current}: {current?: string}) => {
    const pathname = usePathname();
    const t = useTranslations('categories');
    const parts = pathname.split('/').filter(Boolean);

    const crumbs = [{label: t('home'), href: '/'}];
    parts.forEach((part, idx) => {
        const label = isSection(part)
            ? t(part)
            : idx === parts.length - 1 && current
              ? current
              : decodeURIComponent(part).replace(/-/g, ' ');
        crumbs.push({label, href: `/${parts.slice(0, idx + 1).join('/')}`});
    });

    const last = crumbs.length - 1;

    return (
        <nav
            aria-label='Breadcrumb'
            className='py-5 text-xs text-[#A8A8A8] lg:pb-7 lg:pt-11 lg:text-base'
        >
            <ol className='flex items-center whitespace-nowrap overflow-x-auto'>
                {crumbs.map(({label, href}, idx) => (
                    <Fragment key={href}>
                        <li className={idx === last ? 'min-w-0' : 'shrink-0'}>
                            {idx === last ? (
                                <span
                                    aria-current='page'
                                    title={label}
                                    className='block max-w-[350px] truncate text-[--accent-color]'
                                >
                                    {label}
                                </span>
                            ) : (
                                <Link className='transition-colors hover:text-[--accent-color]' href={href}>
                                    {label}
                                </Link>
                            )}
                        </li>
                        {idx !== last && (
                            <li aria-hidden className='mx-1.5 shrink-0 select-none'>
                                /
                            </li>
                        )}
                    </Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
