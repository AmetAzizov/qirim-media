import './styles/home.scss';
import CountDownTimer from './components/countDownMenu/CountDownTimer';
import MainSlides from './components/bgSlider/MainSlides';
import Loader from './components/bgSlider/Loader';
import MainBlogs from './components/mainPageBlogs/MainBlogs';
import BestOfWeek from './components/mainPageNews/BestOfWeek';
import MainNews from './components/mainPageNews/MainNews';
import TodayNews from './components/mainPageNews/TodayNews';
import React from 'react';
import Head from 'next/head';

const Home = () => {
    return (
        <>
            <Head>
                <script
                    async
                    src='https://www.googletagmanager.com/gtag/js?id=G-0D1MKQXYQK'
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0D1MKQXYQK');
          `
                    }}
                />
            </Head>
            <MainSlides />
            <CountDownTimer />
            <MainBlogs />
            <TodayNews />
            <MainNews />
            <BestOfWeek />
        </>
    );
};

export default Home;
