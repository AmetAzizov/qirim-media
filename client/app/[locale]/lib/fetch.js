import qs from "qs";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function fetchFromCMS(endpoint, parameters) {
    const url = `${apiUrl}/${endpoint}?` + qs.stringify(parameters, {encodeValuesOnly: true});
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

export const fetchNewsPosts = (params) => fetchFromCMS('news-posts', params);
export const fetchBlogs = (params) => fetchFromCMS('blogs', params);


// // FETCH NEWS
// export async function fetchNewsPosts(parameters) {
//     const query = {
//         ...parameters,
//     };
//
//     const url = `${apiUrl}/news-posts?` + qs.stringify(query, {encodeValuesOnly: true});
//     try {
//         const response = await fetch(url, {cache: 'no-store'});
//         if (!response.ok) {
//             if (response.status === 403) {
//                 console.warn(`CMS returned ${response.status} for ${url}. Ignoring the error.`);
//                 return {data: []};
//             }
//             throw new Error(`CMS returned ${response.status} for ${url}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error(`An error occurred: ${error.message}`);
//         return {data: []};
//     }
// }
//
// // FETCH BLOGS
// export async function fetchBlogs(parameters) {
//     const query = {
//         ...parameters,
//     };
//     const url = `${apiUrl}/blogs?` + qs.stringify(query, {encodeValuesOnly: true});
//     try {
//         const response = await fetch(url, {cache: 'no-store'});
//         if (!response.ok) {
//             if (response.status === 403) {
//                 console.warn(`CMS returned ${response.status} for ${url}. Ignoring the error.`);
//                 return {data: []};
//             }
//             throw new Error(`CMS returned ${response.status} for ${url}`);
//         }
//         return await response.json();
//     } catch (error) {
//         console.error(`An error occurred: ${error.message}`);
//         return {data: []};
//     }
// }