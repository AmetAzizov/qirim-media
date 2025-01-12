import { generateMetadata } from './metadata';

export async function someHandlerFunction(slug: string) {
    const metadata = await generateMetadata({ params: { slug } });
    console.log(metadata);
}
