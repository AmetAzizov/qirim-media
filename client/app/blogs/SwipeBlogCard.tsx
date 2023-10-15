import React from 'react';
import {useState, useRef} from 'react';
import BlogCard from './BlogCard';
import Slider from 'react-slick';
// import Arrows from '../components/common/Arrows';
import ModalBlog from '../components/common/ModalBlog';

const authorData = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
    {id: '9'},
    {id: '10'},
    {id: '11'},
    {id: '12'},
    {id: '13'},
    {id: '14'},
    {id: '15'},
    {id: '16'},
    {id: '17'},
    {id: '18'},
    {id: '19'},
    {id: '20'},
    {id: '21'},
    {id: '22'}
];

const SwipeBlogCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = () => {
        document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
        setIsModalOpen(!isModalOpen);
    };

    const settings = {
        arrows: false,
        infinite: true,
        speed: 500,
        variableWidth: true,
        swipeToSlide: true,
    };

    return (
        <React.Fragment>
            <div className={'flex items-center justify-between mb-9'}>
                <h2 className={'title-text'}>Блоги</h2>
                <div className={'flex items-center'}>
                    <button
                        className={
                            'font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:text-base'
                        }
                        onClick={handleModalToggle}
                    >
                        Висловити свою думку
                    </button>
                    {/* <Arrows sliderRef={sliderRef} /> */}
                    <div className={'bg-slate-600'}></div>
                    {isModalOpen && <ModalBlog onClose={handleModalToggle} />}
                    <div className={'hidden lg:block'}></div>
                </div>
            </div>
            <Slider {...settings}>
                {authorData.map(author => (
                    <BlogCard key={author.id} styles='mr-9' />
                ))}
            </Slider>
        </React.Fragment>
    );
};

export default SwipeBlogCard;
