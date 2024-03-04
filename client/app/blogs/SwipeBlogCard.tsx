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

                    380: {
                        slidesPerView: 1.25
                    },

                    425: {
                        slidesPerView: 1.5
                    },

                    600: {
                        slidesPerView: 2
                    },

                    768: {
                        slidesPerView: 2.5
                    },
                    975: {
                        slidesPerView: 3
                    },
                    1024: {
                        slidesPerView: 3.25
                    },
                    1280: {
                        slidesPerView: 3.5
                    },
                    1380: {
                        slidesPerView: 4
                    }
                    // 1440: {
                    //     slidesPerView: 4.25
                    // }
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
