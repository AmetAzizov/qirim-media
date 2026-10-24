// module.exports = {
//   lifecycles: {
//     async beforeCreate(event) {
//       const { data, where, select, populate } = event.params;
      
//       if (data.status === 'published') {
//         data.publishedAt = new Date();
//       }
//     },
//     async beforeUpdate(event) {
//       const { data, where, select, populate } = event.params;
      
//       // Получаем текущую запись
//       const existingEntry = await strapi.documents('api::news-post.news-post').findOne({
//         documentId: where.id,
//         fields: ['publishedAt', 'status'],
//       });

//       // Если запись уже была опубликована, не даем изменить publishedAt
//       if (existingEntry.publishedAt) {
//         delete data.publishedAt;
//       } else if (data.status === 'published') {
//         // Если запись публикуется впервые, устанавливаем publishedAt
//         data.publishedAt = new Date();
//       }
//     },
//   },
// };


module.exports = {
  beforeCreate(event) {
    const { data, where, select, populate } = event.params;

    if (data.status === 'published' && !data.firstPublishedAt) {
      event.params.data.firstPublishedAt = new Date();
    }
  },

  async beforeUpdate(event) {
    const { data, where, select, populate } = event.params;
    
    if (data.status === 'published') {
      const [existingEntry] = await strapi.db.query(event.model.uid).findMany({
        where: { id: where.id },
        select: ['firstPublishedAt']
      });
      
      if (!existingEntry.firstPublishedAt) {
        event.params.data.firstPublishedAt = new Date();
      }
    }
  },

  afterCreate: purgeFrontendCache,
  afterUpdate: purgeFrontendCache,
  afterDelete: purgeFrontendCache,
};

// Сбрасываем кэш фронта, чтобы новая/изменённая новость появилась сразу
async function purgeFrontendCache() {
  const { CLIENT_URL, REVALIDATE_SECRET } = process.env;
  if (!CLIENT_URL || !REVALIDATE_SECRET) return;
  try {
    await fetch(`${CLIENT_URL}/api/revalidate`, {
      method: "POST",
      headers: { "x-revalidate-secret": REVALIDATE_SECRET },
      signal: AbortSignal.timeout(3000),
    });
  } catch (e) {
    strapi.log.warn(`Frontend revalidate failed: ${e.message}`);
  }
}
