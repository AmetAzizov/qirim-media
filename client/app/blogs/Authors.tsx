import React from 'react';
import Image from 'next/image';
// import BlogId from './BlogId';
import Slider from 'react-slick';

const Authors = ({blog}) => {
    // const authors = Array.from({length: 20}, (_, index) => (
    //     <BlogId styles='flex-col w-24 mr-3' margin='mt-4 text-center' key={index} />
    // ));

    // const settings = {
    //     arrows: false,
    //     infinite: true,
    //     speed: 500,
    //     variableWidth: true,
    //     swipeToSlide: true
    // };

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

            {/* MOBILE VERSION */}
            {/* <div className='overflow-hidden row-start-1 mb-5 lg:hidden'>
                <Slider {...settings}>{authors.map(author => author)}</Slider>
            </div> */}
        </React.Fragment>
    );
};

export default Authors;
