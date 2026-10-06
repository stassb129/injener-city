# Инженерные сети (esenin_first)

Редизайн корпоративного сайта инженерных сетей на стеке и визуальном языке проекта **Квантстрой**.

## Стек

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lenis
- Embla Carousel
- lucide-react

## Запуск

```bash
npm install
npm run dev
```

Открыть [http://localhost:3000](http://localhost:3000).

## Страницы

- `/` — главная
- `/about` — о компании
- `/advantages` — преимущества
- `/services` — услуги (якоря `#ventilation`, `#engineering`, `#electrical`, `#plumbing`)
- `/reviews` — отзывы
- `/privacy` — политика конфиденциальности

## Продакшн

Переменные окружения (образец — `.env.example`) задаются в Vercel → Settings → Environment Variables:

- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — куда отправляются заявки с формы (`/api/lead`). Без них форма показывает ошибку и предлагает позвонить.
- `NEXT_PUBLIC_YANDEX_VERIFICATION`, `NEXT_PUBLIC_GOOGLE_VERIFICATION` — коды подтверждения сайта в Яндекс.Вебмастере и Google Search Console.
- `NEXT_PUBLIC_SITE_URL` — боевой адрес, по умолчанию `https://инженерные-сети.москва`.

`robots.txt`, `sitemap.xml` и манифест генерируются автоматически. На preview-деплоях Vercel `robots.txt` закрывает сайт от индексации.

Иконки и OG-картинка пересобираются скриптом `scripts/generate-icons.ps1`.
