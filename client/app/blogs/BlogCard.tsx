import Link from 'next/link';
import BlogId from './BlogId';

type BlogCardProps = {
    styles: string;
};

const BlogCard = ({styles}: BlogCardProps) => {
    return (
        <div
            className={`${styles} justify-self-center max-w-[290px] w-full p-5 bg-[--secondary-color-4] rounded-lg cursor-pointer lg:justify-self-auto lg:max-w-[340px]`}
        >
            <h2
                className={
                    'text-base font-medium text-clip line-clamp-4 lg:text-lg lg:line-clamp-2'
                }
            >
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industrys standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
            </h2>
            <BlogId styles='flex-row mt-10 mb-3 lg:mt-16 lg:mb-7' margin='ml-4' />
            <div className={'flex items-center justify-between'}>
                <time className={'text-sm font-medium text-[--secondary-color-2]'}>
                    15 Жовтня 2023
                </time>
                <Link href={'#'} className={'bg-[#F0CA56] px-3.5 py-2 rounded-md'}>
                    Читати
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
