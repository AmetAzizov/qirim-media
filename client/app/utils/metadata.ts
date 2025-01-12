import {Metadata} from 'next';
import { getNewsPost } from "../lib/newsPosts";

export async function generateMetadata({params: {slug}}: any): Promise<Metadata> {
    const newsPost = await getNewsPost(slug);
    return {
        metadataBase: new URL('https://qirim.news'),
        openGraph: {
            title: newsPost?.title,
            images: [
                {
                    url: newsPost?.image || '/qirimNews.png',
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title: newsPost?.title,
            images: [
                {
                    url: newsPost?.image || '/qirimNews.png',
                }
            ]
        }
    };
}