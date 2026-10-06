import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

const routes: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/advantages', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/reviews', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
    lastModified,
    changeFrequency,
    priority,
  }))
}
