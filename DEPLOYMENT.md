# Деплой

Один и тот же коммит деплоится и на **Vercel**, и на собственный VPS через **Coolify + Docker**.

## Как устроен проект

- Next.js 14.2 (App Router), npm (`package-lock.json`), Node.js 24.
- Все страницы статические (пререндер на этапе `next build`), плюс один динамический маршрут — `/api/health`.
- Нет базы данных, авторизации, middleware, серверных действий, cron-задач и записи файлов.
- `next.config.mjs` → `output: 'standalone'`: сборка содержит минимальный `server.js` со всеми нужными зависимостями.
- Картинки `next/image` (Unsplash) оптимизирует сам сервер через `sharp`.

## Docker

```bash
docker build -t injener-city .
docker run --rm -p 3000:3000 injener-city
# http://localhost:3000, http://localhost:3000/api/health
```

С переменными сборки:

```bash
docker build \
  --build-arg NEXT_PUBLIC_SITE_URL=https://xn----itbaabbng2bcb9aqp4k.xn--80adxhks \
  --build-arg NEXT_PUBLIC_YANDEX_VERIFICATION=<код> \
  --build-arg NEXT_PUBLIC_GOOGLE_VERIFICATION=<код> \
  -t injener-city .
```

Образ: `node:24-alpine`, три стадии (`deps` → `builder` → `runner`), запуск от пользователя `nextjs`, команда `node server.js`.
Контейнер слушает `0.0.0.0:${PORT}`, по умолчанию **3000**.

## Переменные окружения

Все переменные **необязательные** и **публичные**. Секретов у проекта нет.

| Переменная | Когда нужна | Назначение |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | сборка | Канонический домен для canonical, Open Graph, sitemap, robots. По умолчанию `https://инженерные-сети.москва` (punycode) |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | сборка | Код из Яндекс.Вебмастера |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | сборка | Код из Google Search Console |
| `PORT` | запуск | Порт сервера, по умолчанию `3000` (задан в образе) |
| `HOSTNAME` | запуск | Адрес прослушивания, `0.0.0.0` (задан в образе) |

`NEXT_PUBLIC_*` встраиваются в код и HTML при `next build`. Если поменять их только на этапе запуска, ничего не изменится — нужна пересборка.

`VERCEL_ENV` выставляет только Vercel: на preview-деплоях `robots.txt` закрывает сайт от индексации. На Coolify переменной нет, и сайт считается продакшном (индексация открыта).

## Coolify

| Настройка | Значение |
|---|---|
| Source | GitHub-репозиторий, ветка `main` |
| Build Pack | Dockerfile |
| Dockerfile location | `/Dockerfile` |
| Ports Exposes | `3000` |
| Health check path | `/api/health` (порт 3000) |
| Domains | `https://xn----itbaabbng2bcb9aqp4k.xn--80adxhks` (и при желании `www.` с редиректом) |
| Environment variables | `NEXT_PUBLIC_*` из таблицы выше, с галочкой **Build Variable** |
| Persistent storage | не нужно |

Reverse proxy, HTTPS и сертификаты делает Coolify — nginx/Caddy/compose не нужны.

## Хранилище и внешние сервисы

- Постоянное хранилище не требуется. Кэш оптимизированных картинок (`.next/cache`) живёт внутри контейнера и пересоздаётся после рестарта.
- Внешний сервис только один — `images.unsplash.com` (исходники фото). Сервер должен иметь исходящий доступ в интернет.

## Vercel

`vercel.json` и настройки Vercel не менялись. `output: 'standalone'` и `sharp` Vercel поддерживает; на Vercel картинки по-прежнему оптимизирует его собственный сервис.

## Переезд с Vercel

1. Создать приложение в Coolify с настройками выше и задеплоить.
2. Проверить сайт по временному домену Coolify и `/api/health`.
3. Добавить боевой домен в Coolify и переключить DNS (A-запись) у регистратора на IP VPS.
4. После переключения убрать домен из проекта на Vercel, чтобы не было двух источников.
