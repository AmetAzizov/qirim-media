import React from 'react';
import BlogId from './BlogId';
import Slider from 'react-slick';

const Authors = () => {
    const authors = Array.from({length: 20}, (_, index) => (
        <BlogId styles='flex-col w-24 mr-3' margin='mt-4 text-center' key={index} />
    ));

    const settings = {
        arrows: false,
        infinite: true,
        speed: 500,
        variableWidth: true,
        swipeToSlide: true
    };

    return (
        <>
            <div
                className={
                    'hidden lg:grid max-w-[339px] bg-[--secondary-color-4] h-full rounded-lg grid-blog py-7 px-4'
                }
            >
                <h2 className={'block title-text mb-9'}>Автори</h2>
                <div className={'grid grid-cols-3 gap-x-2.5 gap-y-5'}>
                    {authors.slice(0, 12).map(author => author)}
                </div>
            </div>
            {/* MOBILE VERSION */}
            <div className='overflow-hidden row-start-1 mb-5 lg:hidden'>
                <Slider {...settings}>{authors.map(author => author)}</Slider>
            </div>
        </>
    );
};

export default Authors;
