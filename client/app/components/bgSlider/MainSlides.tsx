import {getNewsPosts} from '@/app/lib/newsPosts';
import React from 'react';
import Loader from './Loader';
import BgSlider from './BgSlider';

export default async function mainSlides() {
    const newsPosts = await getNewsPosts(0, 4);
    // const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 });

    return (
        <React.Fragment>
            <Loader newsPosts={newsPosts} />
            <BgSlider />
        </React.Fragment>
    );
}
