export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:', 'http:'],
          'img-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            's3-qirimbucket.gmhost.space',
          ],
          'media-src': [
            "'self'",
            'data:',
            'blob:',
            'market-assets.strapi.io',
            's3-qirimbucket.gmhost.space',
          ],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];


// config/middlewares.js
// export default [
//   {
//     name: 'strapi::logger',
//   },
//   {
//     name: 'strapi::errors',
//   },
//   {
//     name: 'strapi::security',
//     config: {
//       contentSecurityPolicy: {
//         useDefaults: true,
//         directives: {
//           'connect-src': ["'self'", 'https:', 'http:'],
//           'img-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 's3-qirimbucket.gmhost.space'],
//           'media-src': ["'self'", 'data:', 'blob:', 'market-assets.strapi.io', 's3-qirimbucket.gmhost.space'],
//           upgradeInsecureRequests: null,
//         },
//       },
//     },
//   },
//   {
//     name: 'strapi::cors',
//     config: {
//       enabled: true,
//       origin: ['*'],  // или укажите список разрешенных доменов
//     },
//   },
//   {
//     name: 'strapi::poweredBy',
//   },
//   {
//     name: 'strapi::query',
//   },
//   {
//     name: 'strapi::body',
//   },
//   {
//     name: 'strapi::session',
//   },
//   {
//     name: 'strapi::favicon',
//   },
//   {
//     name: 'strapi::public',
//   },
// ];

