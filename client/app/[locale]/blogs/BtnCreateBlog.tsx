'use client';
import React, { useState } from 'react';
import ModalBlog from '../components/common/ModalBlog';
import {useTranslations} from "next-intl";

const BtnCreateBlog = ({customStyle}: any) => {
    const t = useTranslations('common');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalToggle = () => {
        document.body.style.overflow = isModalOpen ? '' : 'inherit';
        setIsModalOpen(!isModalOpen);
    };

    return (
        <React.Fragment>
            <button
                style={customStyle}
                className={'text-sm font-medium py-5 px-2.5 bg-[--accent-color] rounded-md'}
                onClick={handleModalToggle}
            >
                {t('expressOpinionBtn')}
            </button>
            {isModalOpen && <ModalBlog onClose={handleModalToggle} />}
        </React.Fragment>
    );
};

export default BtnCreateBlog;
