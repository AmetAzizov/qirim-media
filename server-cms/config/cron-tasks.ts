export default {
    '*/1 * * * *': {
        task: async() => {
            // console.log('Running article check')
            const newsToBePublished = await strapi.db.query('api::news-post.news-post').findMany({
                where: {
                    publishedAt: {
                        $null: true
                    },
                    publish_at: {
                        $lt: new Date()
                    }
                },
            });
            await Promise.all(newsToBePublished.map(article => {
                return strapi.service('api::news-post.news-post').update(
                    article.id,
                    {data: {publishedAt: new Date()}}
                )
            }))
        },
        options: {
            tz: 'Europe/Kyiv'
        }
    }
}