const MAP: Record<string, string> = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z',
  и: 'y', і: 'i', ї: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
  р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ь: '', ъ: '', ы: 'y', э: 'e', ю: 'iu', я: 'ia', ё: 'e',
  // кримськотатарська латиниця
  ç: 'c', ğ: 'g', ı: 'i', ñ: 'n', ö: 'o', ş: 's', ü: 'u', â: 'a',
};

export function slugify(text: unknown): string {
  const latin = String(text || '')
    .toLowerCase()
    .replace(/[ʼ'’`ʼ]/g, '')
    .split('')
    .map((ch) => (ch in MAP ? MAP[ch] : ch))
    .join('')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '');
  return latin
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 100)
    .replace(/-+$/g, '');
}

// Уникальный slug в пределах локали (другие документы)
async function uniqueSlug(uid: any, base: string, locale?: string, documentId?: string): Promise<string> {
  const root = base || 'post';
  let candidate = root;
  for (let i = 2; ; i++) {
    const where: Record<string, any> = { slug: candidate };
    if (locale) where.locale = locale;
    if (documentId) where.documentId = { $ne: documentId };
    const exists = await strapi.db.query(uid).findOne({ where, select: ['id'] });
    if (!exists) return candidate;
    candidate = `${root}-${i}`;
  }
}

const TARGETS: string[] = ['api::news-post.news-post', 'api::blog.blog'];

// Document Service middleware: slug из title, админ его не видит
export function slugMiddleware() {
  return async (ctx: any, next: () => Promise<any>) => {
    if (!TARGETS.includes(ctx.uid) || !['create', 'update'].includes(ctx.action)) return next();
    const data = ctx.params?.data;
    if (!data) return next();

    let locale = ctx.params.locale;
    if (!locale) locale = await strapi.plugin('i18n').service('locales').getDefaultLocale();

    if (ctx.action === 'create') {
      if (data.title) data.slug = await uniqueSlug(ctx.uid, slugify(data.title), locale);
      return next();
    }

    // update: slug создаём только если его ещё нет, существующий не меняем
    delete data.slug;
    const { documentId } = ctx.params;
    const row = await strapi.db.query(ctx.uid).findOne({
      where: { documentId, locale, publishedAt: null },
      select: ['slug', 'title'],
    });
    if (row && !row.slug) {
      const title = data.title || row.title;
      if (title) data.slug = await uniqueSlug(ctx.uid, slugify(title), locale, documentId);
    }
    return next();
  };
}

