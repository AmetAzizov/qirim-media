// Сбрасываем кэш фронта, чтобы новая/изменённая новость появилась сразу.
// Файл именно .ts: Strapi запускается из dist, а .js туда не копируется — хуки не подхватывались.
// Запрос уходит с небольшой задержкой и не блокирует сохранение: хук может сработать
// до коммита транзакции, и тогда фронт перечитал бы старые данные и снова закэшировал их.
function purgeFrontendCache() {
  const { CLIENT_URL, REVALIDATE_SECRET } = process.env;
  if (!CLIENT_URL || !REVALIDATE_SECRET) {
    strapi.log.warn('CLIENT_URL / REVALIDATE_SECRET не заданы — кэш фронта не сбрасывается');
    return;
  }
  setTimeout(async () => {
    try {
      const res = await fetch(`${CLIENT_URL}/api/revalidate`, {
        method: 'POST',
        headers: { 'x-revalidate-secret': REVALIDATE_SECRET },
        signal: AbortSignal.timeout(3000),
      });
      if (!res.ok) strapi.log.warn(`Frontend revalidate returned ${res.status}`);
      else strapi.log.info('Frontend revalidate ok');
    } catch (e) {
      strapi.log.warn(`Frontend revalidate failed: ${(e as Error).message}`);
    }
  }, 1000);
}

export default {
  afterCreate: purgeFrontendCache,
  afterUpdate: purgeFrontendCache,
  afterDelete: purgeFrontendCache,
};
