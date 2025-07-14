import {fetchNewsPosts} from '@/app/[locale]/lib/fetch';
import formatDateWithMonthName, {toNewsPost} from "./newsPosts";

export async function getTodayNews(start, limit, locale) {
    const {data} = await fetchNewsPosts({
        // filters: {bestOfWeek: {$eq: 'true'}},
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