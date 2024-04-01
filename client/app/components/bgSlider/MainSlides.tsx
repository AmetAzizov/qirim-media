import {getMainSlides} from '@/app/lib/newsPosts';
import React from 'react';
import Loader from './Loader';
import BgSlider from './BgSlider';

export default async function mainSlides() {
    const newsPosts = await getMainSlides(0, 4);

    return (
        <React.Fragment>
            <Loader newsPosts={newsPosts} />
            <BgSlider />
        </React.Fragment>
    );
}
