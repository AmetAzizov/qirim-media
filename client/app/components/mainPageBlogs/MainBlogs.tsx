'use client';
import SwipeBlogCard from "@/app/blogs/SwipeBlogCard";


const MainBlogs = () => {
    return (
        <section className={'px-4'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <SwipeBlogCard />
            </div>
        </section>
    );
};

export default MainBlogs;
