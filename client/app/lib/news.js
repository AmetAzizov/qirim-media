// import { fetchNewsPosts } from './fetch';
// import { formatDateWithMonthName, formatDateWithMonthNameAndTime } from './formatDate';

// function toNewsPost(item) {
//     return {
//         slug: item.slug,
//         title: item.title,
//         subtitle: item.subtitle,
//         categoryList: item.categoryList,
//         tagList: item.tagList,
//         date: formatDateWithMonthName(item.publishDate || item.createdAt),
//         image: item?.image?.map(img => img.url)
//     };
// }

// export async function getNewsPost(slug) {
//     const { data } = await fetchNewsPosts({
//         filters: { slug: { $eq: slug } },
//         fields: [
//             'id', 'slug', 'title', 'subtitle', 'authorName', 'text', 
//             'createdAt', 'publishDate', 'categoryList', 'tagList'
//         ],
//         populate: { image: { fields: ['url'] } },
//         sort: ['createdAt:desc'],
//         pagination: { pageSize: 1 }
//     });

//     if (data.length === 0) return null;

//     const item = data[0];
//     return {
//         ...toNewsPost(item),
//         id: item.id,
//         subtitle: item.subtitle,
//         authorName: item.authorName,
//         text: item.text,
//         dateTime: formatDateWithMonthNameAndTime(item.publishDate || item.createdAt)
//     };
// }

// export async function getNewsPosts(start, limit, category) {
//     const filters = category && category !== 'Всі' ? { categoryList: { $contains: category } } : {};

//     const { data } = await fetchNewsPosts({
//         fields: ['id', 'slug', 'title', 'subtitle', 'createdAt', 'publishDate', 'categoryList', 'tagList'],
//         populate: { image: { fields: ['url'] } },
//         sort: ['createdAt:desc'],
//         pagination: { start, limit },
//         filters
//     });

//     return data.map(toNewsPost);
// }

// export async function getMainSlides(start, limit) {
//     const { data } = await fetchNewsPosts({
//         filters: { mainSlider: { $eq: 'true' } },
//         fields: ['slug', 'title', 'subtitle', 'createdAt', 'categoryList'],
//         populate: { image: { fields: ['url'] } },
//         sort: ['createdAt:desc'],
//         pagination: { start, limit }
//     });

//     return data.map(toNewsPost);
// }

// export async function getBestOfWeek(start, limit) {
//     const { data } = await fetchNewsPosts({
//         filters: { bestOfWeek: { $eq: 'true' } },
//         fields: ['slug', 'title', 'subtitle', 'createdAt', 'categoryList'],
//         populate: { image: { fields: ['url'] } },
//         sort: ['createdAt:desc'],
//         pagination: { start, limit }
//     });

//     return data.map(toNewsPost);
// }

// export async function getMainNews(start, limit) {
//     const { data } = await fetchNewsPosts({
//         filters: { mainNews: { $eq: 'true' } },
//         fields: ['slug', 'title', 'subtitle', 'createdAt', 'categoryList'],
//         populate: { image: { fields: ['url'] } },
//         sort: ['createdAt:desc'],
//         pagination: { start, limit }
//     });

//     return data.map(toNewsPost);
// }

// export async function searchNewsPosts(query) {
//     const { data } = await fetchNewsPosts({
//         filters: { title: { $containsi: query } },
//         fields: ['slug', 'title', 'createdAt', 'categoryList'],
//         populate: { image: { fields: ['url'] } },
//         sort: ['createdAt:desc']
//     });

//     return data.map(toNewsPost);
// }

// export async function getSlugs() {
//     const { data } = await fetchNewsPosts({
//         fields: ['slug'],
//         sort: ['createdAt:desc']
//     });

//     return data.map(item => item.slug);
// }

// export async function getRelatedNews(category, excludeId, limit = 4) {
//     const { data } = await fetchNewsPosts({
//         filters: {
//             categoryList: { $contains: category },
//             id: { $ne: excludeId }
//         },
//         fields: ['id', 'slug', 'title'],
//         sort: ['createdAt:desc'],
//         pagination: { start: 0, limit }
//     });

//     return data.map(toNewsPost);
// }
