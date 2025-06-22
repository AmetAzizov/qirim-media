// import {fetchBlogs, fetchNewsPosts} from './fetch';
// import {formatDateWithMonthNameAndTime} from './formatDate';
// import {toNewsPost} from './news';

// export async function getBlog(slug) {
//     const {data} = await fetchBlogs({
//         filters: {slug: {$eq: slug}},
//         fields: ['slug', 'title', 'authorBlog', 'text', 'createdAt'],
//         populate: {image: {fields: ['url']}},
//         sort: ['createdAt:desc'],
//         pagination: {pageSize: 1}
//     });

//     if (data.length === 0) return null;

//     const item = data[0];
//     return {
//         ...toNewsPost(item),
//         subtitle: item.subtitle,
//         authorBlog: item.authorBlog,
//         text: item.text,
//         dateTime: formatDateWithMonthNameAndTime(item.createdAt)
//     };
// }

// export async function getBlogs() {
//     const {data} = await fetchBlogs({
//         fields: ['slug', 'title', 'authorBlog', 'createdAt'],
//         populate: {image: {fields: ['url']}},
//         sort: ['createdAt:desc']
//     });

//     return data.map(item => ({
//         ...toNewsPost(item),
//         authorBlog: item.authorBlog,
//         dateTime: formatDateWithMonthNameAndTime(item.createdAt)
//     }));
// }
