import React from 'react';
import Image from 'next/image';

const Authors = ({blog}: any) => {
    return (
        <React.Fragment>
            <div className={'flex items-center justify-center flex-col text-center'}>
                <Image
                    src={`${blog.image}`}
                    width={45}
                    height={45}
                    alt='author'
                    className='rounded-full h-[45px] object-cover object-top'
                />
                <p className={'mt-4'}>{blog.authorBlog}</p>
            </div>
        </React.Fragment>
    );
};

export default Authors;
