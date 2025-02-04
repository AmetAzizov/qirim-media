// import moment from 'moment-timezone';
// import 'moment/locale/uk';

// export function formatDateWithMonthName(dateString) {
//     const date = moment(dateString).tz('Europe/Kyiv');
//     const today = moment().startOf('day');

//     if (date.isSame(today, 'day')) {
//         return 'Сьогодні';
//     }

//     const day = date.date();
//     const monthName = date.format('MMMM');
//     const year = date.year();

//     return `${day} ${monthName} ${year}`;
// }

// export function formatDateWithMonthNameAndTime(dateString) {
//     const date = moment(dateString).tz('Europe/Kyiv', true);
//     const day = date.date();
//     const monthName = date.format('MMMM');
//     const year = date.year();
//     const hours = date.hours();
//     const minutes = date.minutes();

//     return `${day} ${monthName} ${year} / ${hours}:${minutes.toString().padStart(2, '0')}`;
// }
