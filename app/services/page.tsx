import PageHero from '@/components/PageHero'
import ServicesDetail from '@/components/ServicesDetail'
import AccordionArticles from '@/components/AccordionArticles'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Услуги: вентиляция, электрика, отопление',
  description:
    'Вентиляция и кондиционирование, электроснабжение и слаботочные сети, отопление, ГВС, ХВС и канализация в Москве. Проектирование, монтаж, пуско-наладка, обслуживание.',
  path: '/services',
  ogTitle: 'Услуги по инженерным сетям в Москве',
})

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
