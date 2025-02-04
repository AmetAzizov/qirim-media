import moment from 'moment-timezone';

export default {
  publishScheduledNews: {
    task: async ({ strapi }) => {
      const currentDate = moment().tz('Europe/Kyiv').toDate();

      const newsToPublish = await strapi.documents('api::news-post.news-post').findMany({
        status: 'draft',
        filters: {
          publish_at: {
            $lte: currentDate,
          },
        },
        sort: { publish_at: 'desc' },
        limit: 10, 
      });

      for (const news of newsToPublish) {
        await strapi.documents('api::news-post.news-post').update({
          documentId: news.documentId,
          data: {
            publishedAt: currentDate,
          },
          status: 'published',
        });
      }
    },
    options: {
      rule: '* * * * *',
    },
  },
};


// module.exports = {
//   '0 * * * *': async ({ strapi }) => {
//     try {
//       // Найдем неопубликованный контент
//       const contentToPublish = await strapi.db.query('api::post.post').findMany({
//         where: {
//           publishedAt: null,
//           scheduledFor: {
//             $lte: new Date()
//           }
//         },
//         limit: 1
//       });

//       if (contentToPublish.length > 0) {
//         const post = contentToPublish[0];
        
//         // Отправка поста в Twitter с использованием fetch
//         const response = await fetch('https://api.twitter.com/2/tweets', {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({
//             text: post.content
//           })
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('Twitter API response:', result);

//         // Обновим статус поста в Strapi
//         await strapi.db.query('api::post.post').update({
//           where: { id: post.id },
//           data: {
//             publishedAt: new Date()
//           }
//         });

//         console.log(`Post ${post.id} published to Twitter successfully`);
//       }
//     } catch (error) {
//       console.error('Error publishing to Twitter:', error);
//     }
//   },
// };