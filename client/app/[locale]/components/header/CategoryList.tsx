import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useTranslations} from "next-intl";

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
        '#': t('video'),
        publications: t('publications'),
        blogs: t('blogs')
    };

    const customPaths: {[key: string]: string} = {
        Головна: '/',
        Новини: 'news',
        Відео: 'videos',
        Публікації: 'publications',
        Блоги: 'blogs'
    };

    return (
        <>
            {categories.map(category => {
                const path = customPaths[category] || category.toLowerCase();
                const label = customLabels[path] || category;
                const href = path === '/' ? path : `/${path}`;
                const isActive =
                    (path === '/' && pathname === '/') || (path !== '/' && pathname.includes(path));

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
