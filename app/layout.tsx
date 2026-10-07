import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import { company, site } from '@/lib/site'
import { services } from '@/lib/services'
import './globals.css'

const defaultDescription =
  'Инженерные сети в Москве — проектирование, монтаж, пуско-наладка и обслуживание вентиляции, кондиционирования, электроснабжения, отопления, ГВС, ХВС и канализации.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Инженерные сети в Москве — проектирование и монтаж',
    template: '%s | Инженерные сети Москва',
  },
  description: defaultDescription,
  applicationName: site.name,
  keywords: [
    'инженерные сети Москва',
    'монтаж инженерных сетей',
    'проектирование инженерных систем',
    'вентиляция и кондиционирование',
    'электромонтаж',
    'отопление',
    'водоснабжение',
    'канализация',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: '/',
    siteName: site.name,
    title: 'Инженерные сети в Москве — проектирование и монтаж',
    description:
      'Вентиляция, кондиционирование, электроснабжение, отопление, ГВС, ХВС, канализация. Проектирование, монтаж и обслуживание.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Инженерные сети в Москве' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  formatDetection: { telephone: false },
  verification: {
    // Пустая строка из Docker build-arg не должна давать пустой meta-тег
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/logo.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: company.fullLegalName,
  description: defaultDescription,
  url: site.url,
  logo: `${site.url}/apple-touch-icon.png`,
  image: `${site.url}/og-image.png`,
  telephone: [site.phoneHref.replace('tel:', ''), site.phoneAltHref.replace('tel:', '')],
  email: site.emails,
  taxID: company.inn,
  identifier: [
    { '@type': 'PropertyValue', propertyID: 'ОГРН', value: company.ogrn },
    { '@type': 'PropertyValue', propertyID: 'КПП', value: company.kpp },
  ],
  address: { '@type': 'PostalAddress', ...site.postalAddress },
  areaServed: { '@type': 'City', name: 'Москва' },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '19:00',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Услуги',
    itemListElement: services.map((s) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title.replace(/\.$/, ''), url: `${site.url}${s.href}` },
    })),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-ink text-white">
        <SmoothScroll />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
