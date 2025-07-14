import qs from 'qs';
import moment from 'moment-timezone';
import 'moment/locale/uk';
import 'moment/locale/en-gb';
import {fetchBlogs, fetchNewsPosts} from "@/app/[locale]/lib/fetch";

const monthCases = {
    січень: 'січня',
    лютий: 'лютого',
    березень: 'березня',
    квітень: 'квітня',
    травень: 'травня',
    червень: 'червня',
    липень: 'липня',
    серпень: 'серпня',
    вересень: 'вересня',
    жовтень: 'жовтня',
    листопад: 'листопада',
    грудень: 'грудня'
};

export default function formatDateWithMonthName(dateString, locale) {
    const date = moment(dateString).tz('Europe/Kyiv').locale(locale);
    const today = moment().startOf('day');

    if (date.isSame(today, 'day')) {
        return 'Сьогодні';
    }

    const day = date.date();
    const monthName = date.format('MMMM');
    const monthGenitive = monthCases[monthName] || monthName;
    const year = date.year();

    return `${locale === 'uk' ? `${day} ${monthGenitive}, ${year}` : `${monthGenitive} ${day}, ${year}`}`;
}

export function formatDateWithMonthNameAndTime(dateString, locale) {
    const date = moment.tz(dateString, 'Europe/Kyiv').locale(locale);
    const day = date.date();
    const monthName = date.format('MMMM');
    const monthGenitive = monthCases[monthName] || monthName;
    const year = date.year();
    const hours = date.hours();
    const minutes = date.minutes();

    return `${locale === 'uk' ? `${day} ${monthGenitive}, ${year}` : `${monthGenitive} ${day}, ${year}`} / ${hours}:${minutes.toString().padStart(2, '0')}`;
}

export function toNewsPost(item, locale) {
    return {
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        categoryList: item.categoryList,
        tagList: item.tagList,
        // date: item.publish_at,
        // dateTime: formatDateWithMonthName(item.publish_at, locale),
        image: item?.image?.map(img => img.url)
    };
}

export async function getNewsPost(slug, locale) {
    const {data} = await fetchNewsPosts({
        filters: {slug: {$eq: slug}},
        fields: [
            'id',
            'slug',
            'title',
            'subtitle',
            'authorName',
            'text',
            'publish_at',
            'categoryList',
            'tagList'
        ],
        populate: {image: {fields: ['url']}, localizations: {fields: ['slug', 'locale']}},
        sort: ['publish_at:desc'],
        pagination: {pageSize: 1},
        locale
    });
    if (data.length === 0) {
        return null;
    }
    const item = data[0];
    return {
        ...toNewsPost(item),
        id: item.id,
        subtitle: item.subtitle,
        authorName: item.authorName,
        text: item.text,
        dateTime: formatDateWithMonthNameAndTime(item.publish_at, locale),
        localizations: item.localizations
    };
}

export async function getBlog(slug, locale) {
    const {data} = await fetchBlogs({
        filters: {slug: {$eq: slug}},
        fields: ['slug', 'title', 'authorBlog', 'text', 'publish_at'],
        populate: {image: {fields: ['url']}, localizations: {fields: ['slug', 'locale']}},
        sort: ['publish_at:desc'],
        pagination: {pageSize: 1},
        locale,
    });
    if (data.length === 0) {
        return null;
    }
    const item = data[0];
    return {
        ...toNewsPost(item),
        subtitle: item.subtitle,
        authorBlog: item.authorBlog,
        text: item.text,
        dateTime: formatDateWithMonthNameAndTime(item.publish_at, locale),
        localizations: item.localizations,
    };
}

export async function getMainSlides(start, limit, locale) {
    const {data} = await fetchNewsPosts({
        filters: {mainSlider: {$eq: 'true'}},
        fields: ['slug', 'title', 'subtitle', 'publish_at', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {start, limit},
        locale
    });
    return data.map(item => ({
        ...toNewsPost(item),
        dateTime: formatDateWithMonthName(item.publish_at, locale)
    }));
}

export async function getNewsPosts(start, limit, category, date, locale) {
    const filters = {};
    // const filters = category && category !== 'Всі' ? {categoryList: {$contains: category}} : {};
    if (category && category !== 'Всі') {
        filters.categoryList = {$contains: category};
    }

    if (date) {
        filters.publish_at = {
            $gte: `${date}T00:00:00.000Z`,
            $lt: `${date}T23:59:59.999Z`,
        };
    }

    const {data} = await fetchNewsPosts({
        fields: [
            'id',
            'slug',
            'title',
            'subtitle',
            'publish_at',
            'categoryList',
            'tagList'
        ],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {start, limit},
        filters,
        locale
    });

    return data.map(item => ({
        ...toNewsPost(item),
        dateTime: formatDateWithMonthName(item.publish_at, locale)
    }));
}

export async function getBlogs(locale) {
    const {data} = await fetchBlogs({
        fields: ['slug', 'title', 'authorBlog', 'publish_at'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        locale,
    });
    return data.map(item => ({
        ...toNewsPost(item),
        authorBlog: item.authorBlog,
        dateTime: formatDateWithMonthNameAndTime(item.publish_at, locale)
    }));
}

export async function getPublications(start, limit, locale) {
    const {data} = await fetchNewsPosts({
        filters: {categoryList: {$contains: 'Публікації'}},
        fields: ['id', 'slug', 'title', 'subtitle', 'publish_at', 'categoryList', 'tagList'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {start, limit},
        locale,
    });

    return data.map(item => ({
        ...toNewsPost(item),
        dateTime: formatDateWithMonthName(item.publish_at, locale)
    }));
}


export async function searchNewsPosts(query) {
    const {data} = await fetchNewsPosts({
        filters: {title: {$containsi: query}},
        fields: ['slug', 'title', 'publish_at', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc']
    });

    return data.map(item => toNewsPost(item));
}

export async function getSlugs() {
    const {data} = await fetchNewsPosts({
        fields: ['slug'],
        sort: ['publish_at:desc']
    });
    return data.map(item => item.slug);
}

export async function getRelatedNews(category, excludeId, limit = 4) {
    const {data} = await fetchNewsPosts({
        filters: {
            categoryList: {$contains: category},
            id: {$ne: excludeId}
        },
        fields: ['id', 'slug', 'title'],
        sort: ['publish_at:desc'],
        pagination: {start: 0, limit}
    });

    return data.map(toNewsPost);
}
