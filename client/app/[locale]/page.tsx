// import {Link, useRouter, usePathname} from "@/navigation";
import CountDownTimer from './components/countDownMenu/CountDownTimer';
import MainSlides from './components/bgSlider/MainSlides';
// import Loader from './components/bgSlider/Loader';
import MainBlogs from './components/mainPageBlogs/MainBlogs';
import BestOfWeek from './components/mainPageNews/BestOfWeek';
import MainNews from './components/mainPageNews/MainNews';
import TodayNews from './components/mainPageNews/TodayNews';
import React from 'react';
import {useTranslations} from "next-intl";


const Home = () => {
    const t = useTranslations()
    return (
        <>
            {/*<h2>{t('menu.home')}</h2>*/}
            <MainSlides/>
            <CountDownTimer/>
            <MainBlogs/>
            <TodayNews/>
            <MainNews/>
            <BestOfWeek/>
        </>
    );
};

export default Home;
