export type Service = {
  id: string
  number: string
  /** Заголовок карточки как на оригинале */
  title: string
  /** Текст «Подробности» / развёрнутый блок — оригинальные статьи, где есть */
  articleId?: 'ventilation' | 'heating' | 'electrical' | 'intro' | 'pricing' | 'types'
  image: string
  imageAlt: string
  href: string
}

export const services: Service[] = [
  {
    id: 'ventilation',
    number: '01',
    title: 'Вентиляция-Кондиционирование.',
    articleId: 'ventilation',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Вентиляция-Кондиционирование',
    href: '/services#ventilation',
  },
  {
    id: 'engineering',
    number: '02',
    title: 'Проектирование, Монтаж, Пуско-наладка, Обслуживание Лаборатория.',
    articleId: 'intro',
    image:
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Проектирование, Монтаж, Пуско-наладка, Обслуживание Лаборатория',
    href: '/services#engineering',
  },
  {
    id: 'electrical',
    number: '03',
    title: 'Электроснабжение. (Силовая электрика, Слаботочные сети)',
    articleId: 'electrical',
    image:
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'Электроснабжение. (Силовая электрика, Слаботочные сети)',
    href: '/services#electrical',
  },
  {
    id: 'plumbing',
    number: '04',
    title: 'ГВС, ХВС, Отопление, Канализация.',
    articleId: 'heating',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1400&q=80',
    imageAlt: 'ГВС, ХВС, Отопление, Канализация',
    href: '/services#plumbing',
  },
]
