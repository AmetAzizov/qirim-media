import React from 'react';
import BigItem from './BigItem';
import '../../styles/main-news.scss';
import Link from 'next/link';

const BestOfWeek = () => {
    return (
        <section className={'px-4 ml-11 lg:my-24'}>
            <div className={'max-w-[1479px] mx-auto my-0 w-full'}>
                <div className={'flex items-center justify-between mb-9'}>
                    <h2 className={'title-text'}>Найкраще за тиждень</h2>
                    <Link
                        href={'/news'}
                        className={
                            'font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:text-base'
                        }
                    >
                        Бiльше новин
                    </Link>
                </div>

                <div
                    className={
                        'grid grid-rows-13 lg:grid-cols-3 lg:grid-rows-5 lg:gap-10 lg:h-[797px]'
                    }
                >
                    <BigItem className='item-big-top' />
                    {/* <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem />
                    <SmallItem /> */}
                    <BigItem className='item-big-bottom' />
                </div>
            </div>
        </section>
    );
};

export default BestOfWeek;
