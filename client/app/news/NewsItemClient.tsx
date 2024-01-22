'use client';
import React, {useState, useRef} from 'react';
import DatePicker from 'react-datepicker';
import Breadcrumbs from '../components/common/BreadCrumbs';
import Image from 'next/image';



export default function NewsItemClient({children}: any) {
    // const [visibleItems, setVisibleItems] = useState(30);
    // const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    // const [isPickerVisible, setPickerVisible] = useState(false);

    return (
        <section className={'px-4 mb-14 lg:mb-36'}>
            <div className={'max-w-[1479px] mx-auto my-0'}>
                <Breadcrumbs />
                <h2 className={'title-text pb-9'}>Всi новини</h2>
                    <div className={'flex gap-2.5'}>
                        <button className={'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'}>Публікації</button>
                        <button className={'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'}>Новини України та світу</button>
                        <button className={'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'}>Крим</button>
                        <button className={'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'}>Інтерв'ю</button>
                        <button className={'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'}>Блоги</button>
                        <button className={'text-xs font-medium py-2.5 px-5 bg-[--secondary-color-4] rounded-md'}>Відео</button>
                    </div>
                {/* <div className={'inline-block'} onClick={() => setPickerVisible(!isPickerVisible)}>
                    <div
                        className={
                            'inline-flex items-center rounded-md cursor-pointer lg:bg-[--secondary-color-4] lg:py-2.5 lg:px-4'
                        }
                    >
                        <span className={'bg-[#D9EDFC] p-2.5 rounded-md'}>
                            <Image src='/calendar.svg' width={20} height={20} alt='Calendar' />
                        </span>
                        {selectedDate ? (
                            <span className='hidden text-sm font-medium ml-2.5 lg:block'>
                                {selectedDate.toLocaleDateString()}
                            </span>
                        ) : (
                            <span className='hidden text-sm font-medium ml-2.5 lg:block'>
                                Виберiть дату
                            </span>
                        )}
                    </div>
                    {isPickerVisible && (
                        <div onClick={(e: any) => e.stopPropagation()}>
                            <DatePicker
                                selected={selectedDate}
                                onChange={date => {
                                    setSelectedDate(date);
                                    setPickerVisible(false);
                                }}
                                inline
                            />
                        </div>
                    )}
                </div> */}
                <div className={'pt-6'}>
                    <ul
                        className={
                            'grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 lg:gap-8 xl:grid-cols-5'
                        }
                    >
                        {children}
                    </ul>
                    {/* {visibleItems < items.length && (
                        <button
                            className={
                                'block mx-auto mb-0 mt-7 w-full font-medium text-sm whitespace-nowrap bg-[--accent-color] px-3.5 py-2.5 rounded-md lg:w-[unset] lg:text-base lg:mt-6'
                            }
                            onClick={() => setVisibleItems(visibleItems + 10)}
                        >
                            Бiльше новин
                        </button>
                    )} */}
                </div>
            </div>
        </section>
    );
}
