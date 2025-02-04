// import {Metadata} from 'next';
// import { getNewsPost } from "../lib/newsPosts";

// interface Params {
//     slug: string;
// }

// export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
//     const { slug } = params;
//     const newsPost = await getNewsPost(slug);
//     return {
//         metadataBase: new URL('https://qirim.news'),
//         openGraph: {
//             title: newsPost?.title,
//             images: [
//                 {
//                     url: newsPost?.image,
//                 }
//             ]
//         },
//         twitter: {
//             card: 'summary_large_image',
//             title: newsPost?.title,
//             images: [
//                 {
//                     url: newsPost?.image,
//                 }
//             ]
//         }
//     };
// }