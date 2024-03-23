import './styles/home.scss';
import CountDownTimer from './components/countDownMenu/CountDownTimer';
import MainSlides from './components/bgSlider/MainSlides';
import Loader from './components/bgSlider/Loader';
import MainBlogs from './components/mainPageBlogs/MainBlogs';
import BestOfWeek from './components/mainPageNews/BestOfWeek';
import MainNews from './components/mainPageNews/MainNews';
import TodayNews from './components/mainPageNews/TodayNews';
import React from 'react';

const Home = () => {
    return (
        <React.Fragment>
            <MainSlides />
            <CountDownTimer />
            <MainBlogs />
            <TodayNews />
            <MainNews />
            <BestOfWeek />
        </React.Fragment>
    );
};

export default Home;
