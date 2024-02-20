/** @type {import('next').NextConfig} */

// module.exports = {
//     i18n: {
//         locales: ['ua', 'en', 'tr'],
//         defaultLocale: 'ua'
//     }
//     // ... любые другие конфигурационные параметры
// };
// next.config.js
// Пример настройки в next.config.js
module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-qirimbucket.gmhost.space',
                // port: '1337',
                // pathname: '/uploads/**'
            }
        ]
    }
};
