'use client';
import BreadCrumbs from '../components/common/BreadCrumbs';
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Pagination} from 'swiper/modules';
import YouTubeVideos from './YouTubeVideos';

const Videos = () => {
    return (
        <section className={'px-4 mb-14 lg:mb-36 bg-[--primary-color-2]'}>
            <div className={'mx-auto my-0'}>
                <BreadCrumbs />
                <h2 className={'title-text text-[--background-color] pb-9'}>Останнi вiдео новини</h2>
                <YouTubeVideos />
                {/* <div>
                    <Swiper
                        slidesPerView={'auto'}
                        centeredSlides={true}
                        spaceBetween={30}
                        pagination={{
                            clickable: true
                        }}
                        modules={[Pagination]}
                        className='mySwiper'
                    >
                        <SwiperSlide>Slide 1</SwiperSlide>
                        <SwiperSlide>Slide 2</SwiperSlide>
                        <SwiperSlide>Slide 3</SwiperSlide>
                        <SwiperSlide>Slide 4</SwiperSlide>
                        <SwiperSlide>Slide 5</SwiperSlide>
                        <SwiperSlide>Slide 6</SwiperSlide>
                        <SwiperSlide>Slide 7</SwiperSlide>
                        <SwiperSlide>Slide 8</SwiperSlide>
                        <SwiperSlide>Slide 9</SwiperSlide>
                    </Swiper>
                </div> */}
            </div>
        </section>
    );
};

export default Videos;
