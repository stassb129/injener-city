export const site = {
  name: 'Инженерные сети',
  tagline: 'ИНЖИНИРИНГОВАЯ КОМПАНИЯ',
  brandLine: 'Инженерные сети Москва',
  logo: '/logo.svg',
  phone: '+7 (499) 71-488-71',
  phoneHref: 'tel:+74997148871',
  phoneAlt: '+7 (991) 127-71-07',
  phoneAltHref: 'tel:+79911277107',
  schedule: 'Пн-Пт с 10:00 до 19:00',
  address: 'Москва',
  callbackPromise: 'Перезвоним в течении 30 мин',
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
