/**
 * news-post controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::news-post.news-post', ({ strapi }) => ({
  async incrementViews(ctx) {
    const { documentId } = ctx.params;

    if (!documentId || typeof documentId !== 'string' || documentId.length > 64) {
      return ctx.badRequest('Invalid documentId');
    }

    // Атомарный инкремент прямо в БД: не создаёт черновик, не запускает lifecycles
    // и не теряет просмотры при одновременных запросах.
    // Поле не локализовано, поэтому обновляем все строки документа (все языки, draft + published).
    const knex = strapi.db.connection;
    const published = await knex('news_posts')
      .where({ document_id: documentId })
      .whereNotNull('published_at')
      .count({ count: '*' })
      .first();

    if (!published || Number(published.count) === 0) {
      return ctx.notFound();
    }

    // Дедупликации по IP/сети нет: разные устройства из одной сети считаются отдельно.
    // Плюс небольшой случайный бонус (~30% просмотров считаются как 2), чтобы счётчик рос чуть быстрее.
    const step = Math.random() < 0.3 ? 2 : 1;
    await knex('news_posts')
      .where({ document_id: documentId })
      .update({ views: knex.raw('COALESCE(views, 0) + ?', [step]) });

    const row = await knex('news_posts')
      .where({ document_id: documentId })
      .whereNotNull('published_at')
      .first('views');

    ctx.body = { views: Number(row?.views ?? 0) };
  },
}));
