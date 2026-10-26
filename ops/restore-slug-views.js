// Восстановление slug и views в news_posts после того, как колонки были пересозданы пустыми.
// Запуск из server-cms:  node ../ops/restore-slug-views.js          (dry-run, ничего не пишет)
//                        node ../ops/restore-slug-views.js --apply  (записывает в БД, одна транзакция)
//
// slug:  slugify(title) как в src/utils/slug.ts, уникально в пределах локали;
//        одинаковый для всех строк документа (draft / published / старые без status).
//        Уже заполненные slug не трогаются.
// views: у документов, созданных до 2026-10-16, случайное 20–100 (как в бэкфилле из src/index.ts);
//        у более новых NULL -> 0. Уже заполненные views не трогаются.
const path = require('path');
const { Client } = require(path.join(process.cwd(), 'node_modules/pg'));
require(path.join(process.cwd(), 'node_modules/dotenv')).config();

const APPLY = process.argv.includes('--apply');
// --backup <file.sql>: текстовый дамп таблицы (pg_restore -a -t news_posts -f file.sql db.dump);
// slug/views берутся оттуда по (document_id, locale), остальное — генерация ниже.
const bi = process.argv.indexOf('--backup');
const BACKUP = bi > -1 ? process.argv[bi + 1] : null;
function loadBackup(file) {
  const lines = require('fs').readFileSync(file, 'utf8').split('\n');
  const start = lines.findIndex((l) => l.startsWith('COPY public.news_posts '));
  const cols = lines[start].match(/\(([^)]*)\)/)[1].split(',').map((x) => x.trim());
  const ix = Object.fromEntries(cols.map((c, i) => [c, i]));
  const slugs = new Map(), views = new Map();
  for (let i = start + 1; i < lines.length && lines[i] !== '\\.'; i++) {
    const f = lines[i].replace(/\r$/, '').split('\t');
    const k = `${f[ix.locale]}|${f[ix.document_id]}`;
    if (f[ix.slug] !== '\\N' && (!slugs.has(k) || f[ix.status] === 'published')) slugs.set(k, f[ix.slug]);
    if (f[ix.views] !== '\\N' && (!views.has(k) || f[ix.status] === 'published')) views.set(k, Number(f[ix.views]));
  }
  return { slugs, views };
}
const MAP = {
  а: 'a', б: 'b', в: 'v', г: 'h', ґ: 'g', д: 'd', е: 'e', є: 'ie', ж: 'zh', з: 'z',
  и: 'y', і: 'i', ї: 'i', й: 'i', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p',
  р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh',
  щ: 'shch', ь: '', ъ: '', ы: 'y', э: 'e', ю: 'iu', я: 'ia', ё: 'e',
  ç: 'c', ğ: 'g', ı: 'i', ñ: 'n', ö: 'o', ş: 's', ü: 'u', â: 'a',
};
function slugify(text) {
  const latin = String(text || '')
    .toLowerCase()
    .replace(/[ʼ'’`ʼ]/g, '')
    .split('')
    .map((ch) => (ch in MAP ? MAP[ch] : ch))
    .join('')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '');
  return latin.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100).replace(/-+$/g, '');
}

(async () => {
  const c = new Client({
    host: process.env.DATABASE_HOST, port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_NAME, user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  });
  await c.connect();

  const { rows } = await c.query(
    `select id, document_id, locale, title, slug, created_at, status from news_posts order by created_at, id`
  );

  const bk = BACKUP ? loadBackup(BACKUP) : { slugs: new Map(), views: new Map() };
  const nullSlugIds = new Set(rows.filter((r) => !r.slug).map((r) => r.id));
  let fromBackup = 0;
  for (const r of rows) {
    const b = !r.slug && bk.slugs.get(`${r.locale}|${r.document_id}`);
    if (b) { r.slug = b; fromBackup++; }
  }
  console.log(`slug from backup: ${fromBackup} rows, views in backup: ${bk.views.size} docs`);

  // slug-и, которые уже заняты: locale -> (slug -> document_id)
  const taken = new Map();
  const docSlug = new Map(); // locale|doc -> slug
  const key = (r) => `${r.locale}|${r.document_id}`;
  const bucket = (l) => taken.get(l) || taken.set(l, new Map()).get(l);
  for (const r of rows) {
    if (r.slug) { bucket(r.locale).set(r.slug, r.document_id); docSlug.set(key(r), r.slug); }
  }

  // Документ -> лучший title: сначала draft/published, иначе любая строка
  const titles = new Map();
  for (const r of rows) {
    if (!r.title) continue;
    const k = key(r);
    if (!titles.has(k) || r.status === 'published') titles.set(k, r.title);
  }

  let assigned = 0;
  for (const r of rows) {
    const k = key(r);
    if (docSlug.has(k)) continue;
    const root = slugify(titles.get(k)) || 'post';
    const used = bucket(r.locale);
    let cand = root;
    for (let i = 2; used.has(cand) && used.get(cand) !== r.document_id; i++) cand = `${root}-${i}`;
    used.set(cand, r.document_id);
    docSlug.set(k, cand);
    assigned++;
  }

  const updates = [];
  for (const r of rows) if (nullSlugIds.has(r.id)) updates.push([r.id, docSlug.get(key(r))]);
  const dupSuffix = [...docSlug.values()].filter((s) => /-\d+$/.test(s)).length;

  console.log(`rows: ${rows.length}, slug to set on ${updates.length} rows (${assigned} documents), with -N suffix: ${dupSuffix}`);
  console.log('sample:', updates.slice(0, 3).map(([id, s]) => `${id}=${s}`));

  if (!APPLY) {
    const v = await c.query(`select count(*) n, count(distinct document_id) d from news_posts where views is null`);
    console.log(`views is null: rows ${v.rows[0].n}, documents ${v.rows[0].d}`);
    console.log('dry-run, nothing written. Add --apply to write.');
    return c.end();
  }

  try {
    await c.query('begin');
    for (let i = 0; i < updates.length; i += 1000) {
      const part = updates.slice(i, i + 1000);
      await c.query(
        `update news_posts n set slug = v.slug from (select unnest($1::int[]) id, unnest($2::text[]) slug) v where n.id = v.id`,
        [part.map((u) => u[0]), part.map((u) => u[1])]
      );
    }
    // views из бэкапа (по документу+локали), только где сейчас NULL
    const vr = rows.map((r) => [r.id, bk.views.get(`${r.locale}|${r.document_id}`)]).filter((x) => x[1] !== undefined);
    for (let i = 0; i < vr.length; i += 1000) {
      const part = vr.slice(i, i + 1000);
      await c.query(
        `update news_posts n set views = v.views from (select unnest($1::int[]) id, unnest($2::int[]) views) v where n.id = v.id and n.views is null`,
        [part.map((x) => x[0]), part.map((x) => x[1])]
      );
    }
    // views: старые документы — случайное 20..100 (одно значение на документ), новые — 0
    await c.query(`
      with d as (
        select document_id, 20 + floor(random() * 81)::int as v
        from news_posts group by document_id
        having max(created_at) < '2026-10-16' and bool_and(views is null)
      )
      update news_posts n set views = d.v from d where n.document_id = d.document_id and n.views is null`);
    await c.query(`update news_posts set views = 0 where views is null`);
    await c.query('commit');
    console.log('done');
  } catch (e) {
    await c.query('rollback');
    throw e;
  } finally {
    await c.end();
  }
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
