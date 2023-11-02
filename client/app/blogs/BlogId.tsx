import React from 'react';
import Image from 'next/image';

type BlogIdProps = {
    styles: string;
    margin: string;
};

const BlogId = ({styles, margin}: BlogIdProps) => {
    return (
        <div className={`${styles} flex items-center`}>
            <Image src='/author.png' width={45} height={45} alt='author' />
            <span className={`${margin} text-sm font-medium`}>User Surname</span>
        </div>
    );
};

export default BlogId;
