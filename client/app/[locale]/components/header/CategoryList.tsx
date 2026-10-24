import {Link} from '@/i18n/routing';
import {usePathname} from '@/i18n/routing';
import {useTranslations} from "next-intl";

const YOUTUBE_VIDEOS_URL = 'https://www.youtube.com/@qirimnews9210/videos';

const CategoryList = ({
    categories = [],
    onClose
}: {
    categories?: string[];
    onClose?: () => void;
}) => {
    const pathname = usePathname();
    const t = useTranslations("categories");
    const customLabels: {[key: string]: string} = {
        '/': t('home'),
        news: t('news'),
        videos: t('video'),
        publications: t('publications'),
        blogs: t('blogs')
    };

    const customPaths: {[key: string]: string} = {
        Головна: '/',
        Новини: 'news',
        Публікації: 'publications',
        Блоги: 'blogs'
    };

    return (
        <>
            {categories.map(category => {
                const path = customPaths[category] || category.toLowerCase();
                const label = customLabels[path] || category;
                const isExternal = path === 'videos';
                const href = path === '/' ? path : `/${path}`;
                const isActive =
                    (path === '/' && pathname === '/') || (path !== '/' && pathname.includes(path));

                if (isExternal) {
                    return (
                        <li className={'lg:mr-3 last:mr-0'} key={path}>
                            <a
                                className='nav-category block w-full h-full text-base font-medium p-4 rounded lg:text-[--background-color] lg:px-4 lg:py-2'
                                href={YOUTUBE_VIDEOS_URL}
                                target='_blank'
                                rel='noopener noreferrer'
                                onClick={onClose}
                            >
                                {label}
                            </a>
                        </li>
                    );
                }

                return (
                    <li className={'lg:mr-3 last:mr-0'} key={path}>
                        <Link
                            className={`nav-category block w-full h-full text-base font-medium p-4 rounded lg:text-[--background-color] lg:px-4 lg:py-2
                                ${isActive ? 'nav-active' : ''}`}
                            href={href}
                            onClick={onClose}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
        </>
    );
};

export default CategoryList;