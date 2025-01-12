/** @type {import('next').NextConfig} */

module.exports = {};

module.exports = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-qirimbucket.gmhost.space'
            }
        ]
    },
    // i18n: {
    //     locales: ['en-US', 'ua-UA'], 
    //     defaultLocale: 'ua-UA'
    // }
};
