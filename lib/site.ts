export const site = {
  /** Боевой домен инженерные-сети.москва в punycode; можно переопределить через NEXT_PUBLIC_SITE_URL */
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://xn----itbaabbng2bcb9aqp4k.xn--80adxhks').replace(/\/$/, ''),
  displayDomain: 'инженерные-сети.москва',
  name: 'Инженерные сети',
  tagline: 'ИНЖИНИРИНГОВАЯ КОМПАНИЯ',
  brandLine: 'Инженерные сети Москва',
  logo: '/logo.svg',
  phone: '+7 (499) 71-488-71',
  phoneHref: 'tel:+74997148871',
  phoneAlt: '+7 (991) 127-71-07',
  phoneAltHref: 'tel:+79911277107',
  schedule: 'Пн-Пт с 10:00 до 19:00',
  address: 'г. Москва, ЖК Hill8, просп. Мира, д. 95, этаж 8, офис 143',
  postalAddress: {
    streetAddress: 'просп. Мира, д. 95, этаж 8, офис 143',
    postalCode: '129085',
    addressLocality: 'Москва',
    addressCountry: 'RU',
  },
  callbackPromise: 'Перезвоним в течении 30 мин',
} as const

export const company = {
  legalName: 'ООО ТД «ЦСК-М»',
  fullLegalName: 'Общество с ограниченной ответственностью Торговый Дом «ЦСК-М»',
  ogrn: '1247700529416',
  inn: '9734003410',
  kpp: '773401001',
} as const

export const navLinks = [
  { label: 'О компании', href: '/about' },
  { label: 'Преимущества', href: '/advantages' },
  { label: 'Наши Услуги', href: '/services' },
  { label: 'Отзывы о нас', href: '/reviews' },
  { label: 'Контакты', href: '/#contacts' },
] as const

export const servicesNav = [
  { label: 'Вентиляция-Кондиционирование', href: '/services#ventilation' },
  { label: 'Проектирование,Обслуживание', href: '/services#engineering' },
  { label: 'Электроснабжение', href: '/services#electrical' },
  { label: 'ГВС,ХВС,Отопление,Канализация', href: '/services#plumbing' },
] as const
