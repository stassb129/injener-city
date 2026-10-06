import PageHero from '@/components/PageHero'
import Advantages from '@/components/Advantages'
import AccordionArticles from '@/components/AccordionArticles'
import ContactCta from '@/components/ContactCta'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Преимущества',
  description:
    'Почему заказывают инженерные сети у нас: опыт, оптимальные технические решения, гарантия качества работ и гибкая система оплаты. Москва.',
  path: '/advantages',
  ogTitle: 'Преимущества компании «Инженерные сети»',
})

export default function AdvantagesPage() {
  return (
    <>
      <PageHero
        label="Преимущества"
        title={
          <>
            Почему <span className="text-accent">обращаются к нам</span>
          </>
        }
      />
      <Advantages id="advantages-page" showHeading={false} />
      <AccordionArticles
        ids={['intro', 'types', 'pricing']}
        label="Подробнее"
        heading={
          <>
            Сети, эксплуатация и <span className="text-accent">стоимость</span>
          </>
        }
        defaultOpenId="intro"
        className="!pt-4 lg:!pt-5"
      />
      <ContactCta />
    </>
  )
}
