#!/bin/bash
# Запускать на сервере из корня репозитория: ./deploy.sh [client|server-cms]
# Без аргумента сам определяет, что пересобирать, по изменённым файлам с прошлого успешного деплоя:
#   client/**      -> только client
#   server-cms/**  -> только server-cms
#   dev-config/**  -> оба сервиса (изменился compose)
# Нет изменений -> ничего не пересобирается и не перезапускается.
set -euo pipefail
cd "$(dirname "$0")"

export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
STATE_FILE=".deployed-sha"

git pull --ff-only
NEW="$(git rev-parse HEAD)"
OLD="$(cat "$STATE_FILE" 2>/dev/null || true)"

if [ "$#" -gt 0 ]; then
  SERVICES=("$@")
elif [ -z "$OLD" ] || ! git cat-file -e "$OLD^{commit}" 2>/dev/null; then
  echo "Нет данных о прошлом деплое — пересобираю всё"
  SERVICES=(client server-cms)
else
  CHANGED="$(git diff --name-only "$OLD" "$NEW")"
  SERVICES=()
  if echo "$CHANGED" | grep -qE '^(dev-config/|client/)'; then
    if echo "$CHANGED" | grep -q '^dev-config/'; then SERVICES=(client server-cms); else SERVICES+=(client); fi
  fi
  if [ "${#SERVICES[@]}" -lt 2 ] && echo "$CHANGED" | grep -qE '^server-cms/'; then
    SERVICES+=(server-cms)
  fi
fi

if [ "${#SERVICES[@]}" -eq 0 ]; then
  echo "Изменений в client/server-cms нет — деплой не нужен"
  echo "$NEW" > "$STATE_FILE"
  exit 0
fi
echo "Пересобираю: ${SERVICES[*]}"

# Strapi при старте приводит таблицы к schema.json (может удалить колонки) — перед таким деплоем нужен свежий бэкап.
if [ -n "${OLD:-}" ] && printf '%s\n' "${SERVICES[@]}" | grep -qx server-cms \
   && git diff --name-only "$OLD" "$NEW" | grep -qE 'content-types/.*/schema\.json$'; then
  echo "Изменилась схема Strapi — делаю бэкап БД перед деплоем"
  bash ./ops/backup-db.sh
fi

cd dev-config
# --no-deps: не трогаем соседний сервис, если он не пересобирался
docker compose up -d --build --no-deps "${SERVICES[@]}"
cd ..
echo "$NEW" > "$STATE_FILE"

docker image prune -f
docker builder prune -f --filter 'until=168h' >/dev/null
