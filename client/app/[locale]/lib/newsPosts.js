import qs from 'qs';
import moment from 'moment-timezone';
import 'moment/locale/uk';
import 'moment/locale/en-gb';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
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

export default function formatDateWithMonthName(dateString) {
    const date = moment(dateString).tz('Europe/Kyiv');
    const today = moment().startOf('day');

    if (date.isSame(today, 'day')) {
        return 'Сьогодні';
    }

    const day = date.date();
    const monthName = date.format('MMMM');
    const monthGenitive = monthCases[monthName] || monthName;
    const year = date.year();

    return `${day} ${monthGenitive} ${year}`;
}

function formatDateWithMonthNameAndTime(dateString) {
    const date = moment.tz(dateString, 'Europe/Kyiv');
    const day = date.date();
    const monthName = date.format('MMMM');
    const monthGenitive = monthCases[monthName] || monthName;
    const year = date.year();
    const hours = date.hours();
    const minutes = date.minutes();

    return `${day} ${monthGenitive} ${year} / ${hours}:${minutes.toString().padStart(2, '0')}`;
}

function toNewsPost(item) {
    return {
        slug: item.slug,
        title: item.title,
        subtitle: item.subtitle,
        categoryList: item.categoryList,
        tagList: item.tagList,
        date: formatDateWithMonthName(item.publish_at),
        image: item?.image?.map(img => img.url)
    };
}

export async function getNewsPost(slug) {
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
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {pageSize: 1}
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
        dateTime: formatDateWithMonthNameAndTime(item.publish_at)
    };
}

export async function getBlog(slug) {
    const {data} = await fetchBlogs({
        filters: {slug: {$eq: slug}},
        fields: ['slug', 'title', 'authorBlog', 'text', 'publish_at'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {pageSize: 1}
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
        dateTime: formatDateWithMonthNameAndTime(item.publish_at)
    };
}

export async function getMainSlides(start, limit) {
    const {data} = await fetchNewsPosts({
        filters: {mainSlider: {$eq: 'true'}},
        fields: ['slug', 'title', 'subtitle', 'publish_at', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {start, limit}
    });
    return data.map(toNewsPost);
}

export async function getBestOfWeek(start, limit) {
    const {data} = await fetchNewsPosts({
        filters: {bestOfWeek: {$eq: 'true'}},
        fields: ['slug', 'title', 'subtitle', 'publish_at', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {start, limit}
    });
    return data.map(toNewsPost);
}

export async function getMainNews(start, limit) {
    const {data} = await fetchNewsPosts({
        filters: {mainNews: {$eq: 'true'}},
        fields: ['slug', 'title', 'subtitle', 'publish_at', 'categoryList'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {start, limit}
    });
    return data.map(toNewsPost);
}

export async function getNewsPosts(start, limit, category, date) {
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
        filters
    });

    return data.map(toNewsPost);
}

export async function getBlogs() {
    const {data} = await fetchBlogs({
        fields: ['slug', 'title', 'authorBlog', 'createdAt'],
        populate: {image: {fields: ['url']}},
        sort: ['createdAt:desc']
    });
    return data.map(item => ({
        ...toNewsPost(item),
        authorBlog: item.authorBlog,
        dateTime: formatDateWithMonthNameAndTime(item.createdAt)
    }));
}

export async function getPublications(start, limit) {
    const {data} = await fetchNewsPosts({
        filters: {categoryList: {$contains: 'Публікації'}},
        fields: ['id', 'slug', 'title', 'subtitle', 'publish_at', 'categoryList', 'tagList'],
        populate: {image: {fields: ['url']}},
        sort: ['publish_at:desc'],
        pagination: {start, limit}
    });

    return data.map(toNewsPost);
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

export async function fetchNewsPosts(parameters) {
    const paramsWithStatus = {
        ...parameters,
        status: parameters.status || 'published',
        locale: parameters.locale,
    };

    const url = `${apiUrl}/news-posts?` + qs.stringify(paramsWithStatus, {encodeValuesOnly: true});
    try {
        const response = await fetch(url, {cache: 'no-store'});
        if (!response.ok) {
            if (response.status === 403) {
                console.warn(`CMS returned ${response.status} for ${url}. Ignoring the error.`);
                return {data: []};
            }
            throw new Error(`CMS returned ${response.status} for ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        return {data: []};
    }
}

export async function fetchBlogs(parameters) {
    const locale = parameters.locale || 'uk';
    const query = {
        ...parameters,
        locale,
    };
    const url = `${apiUrl}/blogs?` + qs.stringify(query, {encodeValuesOnly: true});
    try {
        const response = await fetch(url, {cache: 'no-store'});
        if (!response.ok) {
            if (response.status === 403) {
                console.warn(`CMS returned ${response.status} for ${url}. Ignoring the error.`);
                return {data: []};
            }
            throw new Error(`CMS returned ${response.status} for ${url}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        return {data: []};
    }
}
