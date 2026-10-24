#!/bin/bash
# Запускать на сервере из корня репозитория: ./deploy.sh [client|server-cms]
# Без аргумента пересобирает оба сервиса.
set -euo pipefail
cd "$(dirname "$0")"

git pull --ff-only
cd dev-config
docker compose up -d --build "$@"
docker image prune -f
