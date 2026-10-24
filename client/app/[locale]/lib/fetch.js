import qs from "qs";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Кэш Next.js: запросы живут REVALIDATE секунд, а при публикации в Strapi
// webhook дергает /api/revalidate и сбрасывает тег — новая новость появляется сразу.
const REVALIDATE = 300;

async function fetchFromCMS(endpoint, parameters, tag) {
    const url = `${apiUrl}/${endpoint}?` + qs.stringify(parameters, {encodeValuesOnly: true});
    try {
        const response = await fetch(url, {next: {revalidate: REVALIDATE, tags: [tag]}});
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

export const fetchNewsPosts = (params) => fetchFromCMS('news-posts', params, 'news');
export const fetchBlogs = (params) => fetchFromCMS('blogs', params, 'blogs');
