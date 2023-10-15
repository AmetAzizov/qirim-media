'use client';
import {useState} from 'react';
import ModalBlog from '../components/common/ModalBlog';
import BlogCard from './BlogCard';
import Breadcrumbs from '../components/common/BreadCrumbs';
import Authors from './Authors';

const items = Array.from({length: 15}, (_, index) => <BlogCard key={index} styles={''} />);

const Blogs = () => {
    const [visibleItems, setVisibleItems] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = () => {
        document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
        setIsModalOpen(!isModalOpen);
    };

    return (
        <section className={'px-4 mb-20 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <Breadcrumbs />
                <div
                    className={
                        'flex flex-wrap items-center justify-center p-4 mb-10 mx-auto bg-[#D9EDFC] rounded-md lg:p-10 lg:mb-14 lg:justify-between'
                    }
                >
                    <h3 className={'text-lg font-semibold lg:text-2xl mb-10 lg:mb-0 lg:mr-5'}>
                        Висловлюйте свою думку на будь яку тему, <br /> та публiкуйтеся на нашому
                        порталi
                    </h3>
                    <button
                        className={'text-sm font-medium py-5 px-2.5 bg-[--accent-color] rounded-md'}
                        onClick={handleModalToggle}
                    >
                        Висловити свою думку
                    </button>
                    {isModalOpen && <ModalBlog onClose={handleModalToggle} />}
                </div>
                <div
                    className={
                        'grid gap-y-4 w-full lg:grid-cols-4 lg:grid-rows-2 lg:gap-x-10 lg:gap-y-10'
                    }
                >
                    {items.slice(0, visibleItems).map(item => item)}
                    <Authors />
                </div>
                {visibleItems < items.length && (
                    <button
                        className={
                            'block mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[unset] lg:text-base lg:mt-6'
                        }
                        onClick={() => setVisibleItems(visibleItems + 10)}
                    >
                        Бiльше блогів
                    </button>
                )}
            </div>
        </section>
    );
};

export default Blogs;
