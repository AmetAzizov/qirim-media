import { getMainSlides } from '@/app/[locale]/lib/newsPosts';
import React from 'react';
import Loader from './Loader';
import BgSlider from './BgSlider';
import {getCurrentLocale} from "@/app/[locale]/utils/getCurrentLocale";

export default async function mainSlides() {
    const locale = getCurrentLocale();
    const newsPosts = await getMainSlides(0, 4, locale);

    return (
        <React.Fragment>
            <Loader newsPosts={newsPosts} />
            <BgSlider newsPosts={newsPosts} />
        </React.Fragment>
    );
}