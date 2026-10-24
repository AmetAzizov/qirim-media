#!/bin/bash
# Бэкап БД Strapi (PostgreSQL). Запускать на сервере: ./ops/backup-db.sh
# Параметры БД и S3 берутся из server-cms/.env, pg_dump запускается в одноразовом docker-контейнере
# (ставить клиент Postgres на сервер не нужно).
#
# Переменные окружения (необязательно):
#   BACKUP_DIR   куда складывать дампы (по умолчанию /var/backups/qirim)
#   KEEP_DAYS    сколько дней хранить локально (по умолчанию 14)
#   UPLOAD_S3=1  дополнительно загружать дамп в S3 (папка db-backups/ в бакете из .env)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/server-cms/.env"
BACKUP_DIR="${BACKUP_DIR:-/var/backups/qirim}"
KEEP_DAYS="${KEEP_DAYS:-14}"
PG_IMAGE="postgres:15-alpine"

# Достаёт значение из .env без выполнения файла (безопасно для паролей со спецсимволами)
get() {
  grep -E "^$1=" "$ENV_FILE" | head -1 | cut -d= -f2- | tr -d '\r' | sed -E 's/^"(.*)"$/\1/; s/^'"'"'(.*)'"'"'$/\1/'
}

DB_HOST="$(get DATABASE_HOST)"
DB_PORT="$(get DATABASE_PORT)"
DB_NAME="$(get DATABASE_NAME)"
DB_USER="$(get DATABASE_USERNAME)"
DB_PASS="$(get DATABASE_PASSWORD)"

mkdir -p "$BACKUP_DIR"
chmod 700 "$BACKUP_DIR"
NAME="${DB_NAME}_$(date +%F_%H%M).dump"
TMP="$BACKUP_DIR/$NAME.tmp"

# -Fc: сжатый формат, восстанавливается через pg_restore
docker run --rm -e PGPASSWORD="$DB_PASS" "$PG_IMAGE" \
  pg_dump -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" -Fc "$DB_NAME" > "$TMP"

# Пустой или подозрительно маленький файл — считаем бэкап неудачным
if [ ! -s "$TMP" ] || [ "$(stat -c %s "$TMP")" -lt 10000 ]; then
  rm -f "$TMP"
  echo "ERROR: дамп пустой или слишком маленький" >&2
  exit 1
fi
mv "$TMP" "$BACKUP_DIR/$NAME"
chmod 600 "$BACKUP_DIR/$NAME"
echo "OK $BACKUP_DIR/$NAME ($(du -h "$BACKUP_DIR/$NAME" | cut -f1))"

# Копия в S3 (если включена). Ошибка загрузки не отменяет локальный бэкап
if [ "${UPLOAD_S3:-0}" = "1" ]; then
  if docker run --rm \
      -e AWS_ACCESS_KEY_ID="$(get AWS_ACCESS_KEY_ID)" \
      -e AWS_SECRET_ACCESS_KEY="$(get AWS_SECRET_ACCESS_KEY)" \
      -e AWS_DEFAULT_REGION="$(get AWS_REGION)" \
      -v "$BACKUP_DIR:/b:ro" \
      amazon/aws-cli --endpoint-url "$(get S3_ENDPOINT)" \
      s3 cp "/b/$NAME" "s3://$(get S3_BUCKET)/db-backups/$NAME"; then
    echo "S3 OK db-backups/$NAME"
  else
    echo "WARN: загрузка в S3 не удалась" >&2
  fi
fi

# Удаляем локальные дампы старше KEEP_DAYS дней
find "$BACKUP_DIR" -name "${DB_NAME}_*.dump" -mtime +"$KEEP_DAYS" -delete
