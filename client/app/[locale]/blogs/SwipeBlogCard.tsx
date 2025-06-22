'use client';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import React from 'react';
import BlogCard from './BlogCard';

export default function SwipeBlogCard({blogs}: any) {
    return (
        <React.Fragment>
            <Swiper
                spaceBetween={20}
                slidesPerView={4}
                loop={true}
                // onSlideChange={() => console.log('slide change')}
                // onSwiper={swiper => console.log(swiper)}
                breakpoints={{
                    320: {
                        slidesPerView: 1
                    },

                    350: {
                        slidesPerView: 1.1
                    },

                    375: {
                        slidesPerView: 1.2
                    },

                    400: {
                        slidesPerView: 1.25
                    },

                    425: {
                        slidesPerView: 1.3
                    },

                    450: {
                        slidesPerView: 1.4
                    },

                    475: {
                        slidesPerView: 1.5
                    },

                    525: {
                        slidesPerView: 1.6
                    },

                    575: {
                        slidesPerView: 1.75
                    },

                    675: {
                        slidesPerView: 2
                    },

                    750: {
                        slidesPerView: 2.1
                    },

                    775: {
                        slidesPerView: 2.25
                    },

                    850: {
                        slidesPerView: 2.5
                    },

                    950: {
                        slidesPerView: 2.75
                    },

                    1025: {
                        slidesPerView: 3
                    },

                    1100: {
                        slidesPerView: 3.25
                    },

                    1280: {
                        slidesPerView: 4
                    },
                }}
            >
                {blogs.map((blog: any) => (
                    <SwiperSlide key={'blog.id'}>
                        <BlogCard blog={blog} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </React.Fragment>
    );
}
