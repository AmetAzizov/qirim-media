/** @type {import('next').NextConfig} */

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
    //     locales: ['uk', 'en'],
    //     defaultLocale: 'uk', 
    //   },
};
