import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.brandLine}`,
    short_name: site.name,
    start_url: '/',
    display: 'browser',
    background_color: '#0C1219',
    theme_color: '#0C1219',
    lang: 'ru',
    icons: [
      { src: '/logo.svg', type: 'image/svg+xml', sizes: 'any' },
      { src: '/apple-touch-icon.png', type: 'image/png', sizes: '180x180' },
      { src: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
  }
}
