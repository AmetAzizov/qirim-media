import moment from 'moment-timezone';

export default {
    '*/1 * * * *': {
        task: async() => {
             const now = moment().tz('Europe/Kyiv').toDate();
            const newsToBePublished = await strapi.db.query('api::news-post.news-post').findMany({
                where: {
                    publishedAt: {
                        $null: true
                    },
                    publish_at: {
                        $lt: now
                    }
                },
            });
            await Promise.all(newsToBePublished.map(article => {
                return strapi.service('api::news-post.news-post').update(
                    article.id,
                    {data: {publishedAt: now}}
                )
            }))
        },
        options: {
            tz: 'Europe/Kyiv'
        }
    }
}