import {fetchNewsPosts} from '@/app/[locale]/lib/fetch';
import formatDateWithMonthName, {toNewsPost} from "./newsPosts";

export async function getMainNews(start, limit, locale) {
    const {data} = await fetchNewsPosts({
        filters: {mainNews: {$eq: 'true'}},
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