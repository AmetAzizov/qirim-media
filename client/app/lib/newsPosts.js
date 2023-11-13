// import 'server-only';
import qs from 'qs';
import moment from 'moment-timezone';
// import {cache} from 'react';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const MONTH_NAMES = [
    'Січня',
    'Лютого',
    'Березня',
    'Квітня',
    'Травня',
    'Червня',
    'Липня',
    'Серпня',
    'Вересня',
    'Жовтня',
    'Листопада',
    'Грудня'
];

export default function formatDateWithMonthName(dateString) {
    const date = moment.tz(dateString, "Europe/Kyiv");
    const day = date.date();
    const monthName = MONTH_NAMES[date.month()];
    const year = date.year();

    return `${day} ${monthName} ${year}`;
}

function formatDateWithMonthNameAndTime(dateString) {
    const date = moment.tz(dateString, "Europe/Kyiv");
    const day = date.date();
    const monthName = MONTH_NAMES[date.month()];
    const year = date.year();
    const hours = date.hours();
    const minutes = date.minutes();

    return `${day} ${monthName} ${year} / ${hours}:${minutes.toString().padStart(2, '0')}`;
}

// export default function formatDateWithMonthName(dateString) {
//     const date = new Date(dateString);
//     const day = date.getDate();
//     const monthName = MONTH_NAMES[date.getMonth()];
//     const year = date.getFullYear();

//     return `${day} ${monthName} ${year}`;
// }

// function formatDateWithMonthNameAndTime(dateString) {
//     const date = new Date(dateString);
//     date.setHours(date.getHours() + 3);
//     const day = date.getDate();
//     const monthName = MONTH_NAMES[date.getMonth()];
//     const year = date.getFullYear();
//     const hours = date.getHours();
//     const minutes = date.getMinutes();

//     return `${day} ${monthName} ${year} / ${hours}:${minutes.toString().padStart(2, '0')}`;
// }

// export async function getFeaturedNews() {
//     const news = await getNewsPosts();
//     return news[0];
// }

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

export async function getNewsPosts(start, limit) {
    const {data} = await fetchNewsPosts({
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: {image: {fields: ['url']}},
        sort: ['publishedAt:desc'],
        pagination: {start, limit}
    });
    return data.map(toNewsPost);
}

export async function getSlugs() {
    const {data} = await fetchNewsPosts({
        fields: ['slug'],
        sort: ['publishedAt:desc'],
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

function toNewsPost(item) {
    const {attributes} = item;
    return {
        slug: attributes.slug,
        title: attributes.title,
        subtitle: attributes.subtitle,
        date: formatDateWithMonthName(attributes.publishedAt),
        image: attributes.image?.data?.map(img => img.attributes.url)
    };
}

