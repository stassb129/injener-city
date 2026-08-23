import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LeadModalProvider } from '@/components/LeadModal'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Инженерные сети | Вентиляция, электромонтаж, системы отопления',
    template: '%s | Инженерные сети',
  },
  description:
    'Инженерные сети в Москве — монтаж и проектирование вентиляции, кондиционирования, электроснабжения, отопления, ГВС, ХВС и канализации.',
  keywords: [
    'инженерные сети Москва',
    'вентиляция',
    'кондиционирование',
    'электромонтаж',
    'отопление',
    'водоснабжение',
    'канализация',
  ],
  openGraph: {
    title: 'Инженерные сети в Москве — монтаж и проектирование',
    description:
      'Вентиляция, электроснабжение, отопление, ГВС, ХВС, канализация. Проектирование, монтаж и обслуживание.',
    locale: 'ru_RU',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/logo.svg', type: 'image/svg+xml' }],
    shortcut: '/logo.svg',
    apple: '/logo.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#0C1219',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link
          rel="preload"
          href="/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-cyrillic.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ink text-white">
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <LeadModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </LeadModalProvider>
      </body>
    </html>
  )
}
