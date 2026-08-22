import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import ServicesDetail from '@/components/ServicesDetail'
import AccordionArticles from '@/components/AccordionArticles'

export const metadata: Metadata = {
  title: 'Наши Услуги',
  description:
    'Вентиляция-Кондиционирование. Проектирование, Монтаж, Пуско-наладка, Обслуживание Лаборатория. Электроснабжение. ГВС, ХВС, Отопление, Канализация.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Наши Услуги"
        title={
          <>
            Наши <span className="text-accent">услуги</span>
          </>
        }
        description="Вентиляция-Кондиционирование. Проектирование, Монтаж, Пуско-наладка, Обслуживание Лаборатория. Электроснабжение. (Силовая электрика, Слаботочные сети). ГВС, ХВС, Отопление, Канализация."
      />
      <ServicesDetail />
      <AccordionArticles
        ids={['types', 'pricing']}
        label="Дополнительно"
        heading={
          <>
            Виды сетей и <span className="text-accent">стоимость</span>
          </>
        }
        defaultOpenId="types"
      />
    </>
  )
}
