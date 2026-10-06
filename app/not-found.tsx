import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Страница не найдена',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="section-y">
      <div className="container-x flex flex-col items-start">
        <span className="section-label">
          <span className="h-px w-8 bg-accent" />
          Ошибка 404
        </span>
        <h1 className="heading-display mt-2">Страница не найдена</h1>
        <p className="mt-3 max-w-xl text-sm font-light leading-relaxed text-white/55">
          Возможно, она была удалена или вы перешли по неверной ссылке.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/" className="btn-accent">
            На главную
          </Link>
          <Link href="/services" className="btn-ghost">
            Наши услуги
          </Link>
        </div>
      </div>
    </section>
  )
}
