// import qs from 'qs';

// const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// export async function fetchNewsPosts(parameters) {
//     const paramsWithStatus = {
//         ...parameters,
//         status: parameters.status || 'published'
//     };

//     const url = `${apiUrl}/news-posts?` + qs.stringify(paramsWithStatus, {encodeValuesOnly: true});
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

// export async function fetchBlogs(parameters) {
//     const url = `${apiUrl}/blogs?` + qs.stringify(parameters, {encodeValuesOnly: true});
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
