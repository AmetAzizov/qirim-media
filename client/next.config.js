/** @type {import('next').NextConfig} */

// module.exports = {
//     i18n: {
//         locales: ['ua', 'en', 'tr'],
//         defaultLocale: 'ua'
//     }
//     // ... любые другие конфигурационные параметры
// };
// next.config.js
module.exports = {
    images: {
        domains: ['s3-qirimbucket.gmhost.space']
    },
};
