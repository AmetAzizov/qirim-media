import {differenceInDays, differenceInMonths, differenceInYears, add} from 'date-fns';

// type Props = {inputDate: string; title: string; styles: any};

const timersData = [
    {
        styles: {backgroundColor: 'var(--primary-color)'},
        title: 'З початку окупацii Криму пройшло:',
        inputDate: '2014.02.20'
    },
    {
        styles: {backgroundColor: 'var(--primary-color-4)'},
        title: 'З початку повномасштабної вiйни пройшло:',
        inputDate: '2022.02.24'
    }
];

const CountDownTimer = () => {
    const currentDate = new Date();

    return (
        <div className='flex flex-col max-w-[1479px] mt-0 mb-12 mx-auto lg:flex-row lg:mt-[-6rem] lg:mb-24'>
            {timersData.map(timerData => {
                const givenDate = new Date(timerData.inputDate);

                let years = differenceInYears(currentDate, givenDate);
                let monthsBetweenDates = differenceInMonths(currentDate, givenDate);
                let months = monthsBetweenDates - years * 12;

                let dateAfterMonths = add(givenDate, {months: monthsBetweenDates});
                let days = differenceInDays(currentDate, dateAfterMonths);
                return (
                    <div
                        key={''}
                        style={timerData.styles}
                        className={'flex flex-col py-7 px-4 basis-1/3 lg:py-10'}
                    >
                        <div className={'flex justify-start items-center flex-col text-[#fff]'}>
                            <h1 className={'text-sm font-semibold lg:text-lg mb-5'}>
                                {timerData.title}
                            </h1>
                            <div className={'flex'}>
                                <div
                                    className={
                                        'flex flex-col items-start relative pr-9 after:absolute after:border after:border-solid after:border-{#DBDBDB} after:h-full after:right-0'
                                    }
                                >
                                    <span className={'text-2xl font-semibold lg:text-4xl'}>
                                        {years}
                                    </span>
                                    <span
                                        className={
                                            'text-sm font-medium lg:text-base lg:font-normal'
                                        }
                                    >
                                        рокiв
                                    </span>
                                </div>
                                <div
                                    className={
                                        'flex flex-col items-start relative px-9 after:absolute after:border after:border-solid after:border-{#DBDBDB} after:h-full after:right-0'
                                    }
                                >
                                    <span className={'text-2xl font-semibold lg:text-4xl'}>
                                        {months}
                                    </span>
                                    <span>мiсяцiв</span>
                                </div>
                                <div className={'flex flex-col items-start pl-9'}>
                                    <span className={'text-2xl font-semibold lg:text-4xl'}>
                                        {days}
                                    </span>
                                    <span>днiв</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className={'flex flex-col py-7 px-4 basis-1/3 lg:py-10 bg-[--primary-color-5]'}>
                <div className={'flex justify-start items-center flex-col text-[#fff]'}>
                    <h1 className={'text-sm font-semibold lg:text-lg mb-5'}>
                        До Криму залишилось:
                    </h1>
                    <div className={'flex'}>
                        <div
                            className={
                                'flex flex-col items-start relative pr-9 after:absolute after:border after:border-solid after:border-{#DBDBDB} after:h-full after:right-0'
                            }
                        >
                            <span className={'text-2xl font-semibold lg:text-4xl'}>88</span>
                            <span className={'text-sm font-medium lg:text-base lg:font-normal'}>
                                кiлометрiв
                            </span>
                        </div>
                        <div
                            className={
                                'flex flex-col items-start relative px-9 after:absolute after:border after:border-solid after:border-{#DBDBDB} after:h-full after:right-0'
                            }
                        >
                            <span className={'text-2xl font-semibold lg:text-4xl'}>410</span>
                            <span>метрiв</span>
                        </div>
                        <div className={'flex flex-col items-start pl-9'}>
                            <span className={'text-2xl font-semibold lg:text-4xl'}>0</span>
                            <span>сантиметрiв</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CountDownTimer;
