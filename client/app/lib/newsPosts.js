import qs from 'qs';
import moment from 'moment-timezone';
// import {cache} from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const MONTH_NAMES = [
    'січня',
    'лютого',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня'
];

export default function formatDateWithMonthName(dateString) {
    const date = moment.tz(dateString, 'Europe/Kyiv');
    const day = date.date();
    const monthName = MONTH_NAMES[date.month()];
    const year = date.year();

    return `${day} ${monthName} ${year}`;
}

function formatDateWithMonthNameAndTime(dateString) {
    const date = moment.tz(dateString, 'Europe/Kyiv');
    const day = date.date();
    const monthName = MONTH_NAMES[date.month()];
    const year = date.year();
    const hours = date.hours();
    const minutes = date.minutes();

    return `${day} ${monthName} ${year} / ${hours}:${minutes.toString().padStart(2, '0')}`;
}

export async function getNewsPost(slug) {
    const {data} = await fetchNewsPosts({
        filters: {slug: {$eq: slug}},
        fields: ['slug', 'title', 'subtitle', 'authorName', 'text', 'publishedAt'],
        populate: {image: {fields: ['url']}},
        sort: ['publishedAt:desc'],
        pagination: {pageSize: 1}
    });
    if (data.length === 0) {
        return null;
    }
    const item = data[0];
    return {
        ...toNewsPost(item),
        subtitle: item.attributes.subtitle,
        authorName: item.attributes.authorName,
        text: item.attributes.text,
        dateTime: formatDateWithMonthNameAndTime(item.attributes.publishedAt)
    };
}

export async function getBlog(slug) {
    const {data} = await fetchBlogs({
        filters: {slug: {$eq: slug}},
        fields: ['slug', 'title', 'authorBlog', 'text', 'publishedAt'],
        populate: {image: {fields: ['url']}},
        sort: ['publishedAt:desc'],
        pagination: {pageSize: 1}
    });
    if (data.length === 0) {
        return null;
    }
    const item = data[0];
    return {
        ...toNewsPost(item),
        subtitle: item.attributes.subtitle,
        authorBlog: item.attributes.authorBlog,
        text: item.attributes.text,
        dateTime: formatDateWithMonthNameAndTime(item.attributes.publishedAt)
    };
}

export async function getBestOfWeek(start, limit) {
    const {data} = await fetchNewsPosts({
        filters: {
            bestOfWeek: {
                $eq: 'true'
            }
        },
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publishedAt:desc'],
        pagination: {start, limit}
    });
    return data.map(toNewsPost);
}

export async function getMainNews(start, limit) {
    const {data} = await fetchNewsPosts({
        filters: {
            mainNews: {
                $eq: 'true'
            }
        },
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publishedAt:desc'],
        pagination: {start, limit}
    });
    return data.map(toNewsPost);
}

export async function getNewsPosts(start, limit) {
    const {data} = await fetchNewsPosts({
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publishedAt:desc'],
        pagination: {start, limit}
    });
    return data.map(toNewsPost);
}

export async function getBlogs() {
    const {data} = await fetchBlogs({
        fields: ['slug', 'title', 'authorBlog'],
        populate: {image: {fields: ['url']}},
        sort: ['publishedAt:desc']
        // pagination: {start, limit}
    });
    return data.map(item => ({
        ...toNewsPost(item),
        authorBlog: item.attributes.authorBlog
    }));
}

export async function searchNewsPosts(query) {
    const {data} = await fetchNewsPosts({
        filters: {title: {$containsi: query}},
        fields: ['slug', 'title'],
        sort: ['title'],
        pagination: {pageSize: 5}
    });
    return data.map(({attributes}) => ({
        slug: attributes.slug,
        title: attributes.title
    }));
}

export async function getSlugs() {
    const {data} = await fetchNewsPosts({
        fields: ['slug'],
        sort: ['publishedAt:desc']
        // pagination: {pageSize: 6}
    });
    return data.map(item => item.attributes.slug);
}

export async function fetchNewsPosts(parameters) {
    const url = `${apiUrl}/news-posts?` + qs.stringify(parameters, {encodeValuesOnly: true});
    const response = await fetch(url, {cache: 'no-store'});
    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${url}`);
    }
    return await response.json();
}

export async function fetchBlogs(parameters) {
    const url = `${apiUrl}/blogs?` + qs.stringify(parameters, {encodeValuesOnly: true});
    const response = await fetch(url, {cache: 'no-store'});
    if (!response.ok) {
        throw new Error(`CMS returned ${response.status} for ${url}`);
    }
    return await response.json();
}

function toNewsPost(item) {
    const {attributes} = item;
    return {
        slug: attributes.slug,
        title: attributes.title,
        subtitle: attributes.subtitle,
        categoryList: attributes.categoryList,
        date: formatDateWithMonthName(attributes.publishedAt),
        image: attributes?.image?.data?.map(img => img.attributes.url)
    };
}
