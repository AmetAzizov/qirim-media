'use client';
import React, { useState } from 'react';
import ModalBlog from '../components/common/ModalBlog';

const BtnCreateBlog = () => {
    // const [visibleItems, setVisibleItems] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = () => {
        document.body.style.overflow = isModalOpen ? 'auto' : 'hidden';
        setIsModalOpen(!isModalOpen);
    };

    return (
        <React.Fragment>
            <button
                className={'text-sm font-medium py-5 px-2.5 bg-[--accent-color] rounded-md'}
                onClick={handleModalToggle}
            >
                Висловити свою думку
            </button>
            {isModalOpen && <ModalBlog onClose={handleModalToggle} />}
        </React.Fragment>
    );
};

export default BtnCreateBlog;
