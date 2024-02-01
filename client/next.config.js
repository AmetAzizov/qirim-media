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
    // images: {
    //     domains: ['s3-qirimbucket.gmhost.space']
    // }
    images: {
        domains: ['s3-qirimbucket.gmhost.space'],
        // remotePatterns: [
        //     {
        //         protocol: 'https',
        //         hostname: 'gmhost.space',
        //         port: '1337',
        //         pathname: 's3-qirimbucket.gmhost.space'
        //     }
        // ]
    }
};
