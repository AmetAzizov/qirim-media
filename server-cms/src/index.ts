export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }) {
    // Одноразовый бэкфилл: у старых новостей просмотров 0 — ставим случайное значение.
    // Выполняется только для документов, у которых во всех строках views пустой или 0,
    // поэтому повторные запуски ничего не меняют.
    const MIN_VIEWS = 50;
    const MAX_VIEWS = 600;
    // Только новости, созданные до этой даты; новые считаются по факту с нуля
    const CUTOFF = '2026-10-16';

    try {
      const knex = strapi.db.connection;
      const docs = await knex('news_posts')
        .select('document_id')
        .groupBy('document_id')
        .havingRaw('MAX(COALESCE(views, 0)) <= 1 AND MAX(created_at) < ?', [CUTOFF]);

      for (const { document_id } of docs) {
        const views = MIN_VIEWS + Math.floor(Math.random() * (MAX_VIEWS - MIN_VIEWS + 1));
        await knex('news_posts').where({ document_id }).update({ views });
      }

      if (docs.length) strapi.log.info(`Views backfill: ${docs.length} news posts`);
    } catch (e) {
      strapi.log.warn(`Views backfill skipped: ${(e as Error).message}`);
    }
  },
};
