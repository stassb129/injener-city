import type { Metadata } from 'next'
import { site } from '@/lib/site'

type PageMeta = {
  title: string
  description: string
  path: string
  ogTitle?: string
}

/** Next.js не сливает openGraph страницы с корневым, поэтому собираем его целиком. */
export function pageMetadata({ title, description, path, ogTitle }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'ru_RU',
      siteName: site.name,
      url: path,
      title: ogTitle ?? title,
      description,
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Инженерные сети в Москве' }],
    },
  }
}
