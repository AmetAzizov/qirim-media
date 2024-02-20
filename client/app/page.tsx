import './styles/home.scss';
import CountDownTimer from './components/countDownMenu/CountDownTimer';
import BgSlider from './components/bgSlider/BgSlider';
import MainBlogs from './components/mainPageBlogs/MainBlogs';
import BestOfWeek from './components/mainPageNews/BestOfWeek';
import MainNews from './components/mainPageNews/MainNews';
import TodayNews from './components/mainPageNews/TodayNews';

const Home = () => {
    return (
        <>
            <BgSlider />
            <CountDownTimer />

            <MainBlogs />
            <TodayNews />
            <MainNews />
            <BestOfWeek />
        </>
    );
};

export default Home;
