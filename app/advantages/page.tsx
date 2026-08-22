import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Advantages from '@/components/Advantages'
import AccordionArticles from '@/components/AccordionArticles'
import CallbackCta from '@/components/CallbackCta'
import { advantages } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Преимущества',
  description: advantages.map((item) => item.title).join(', '),
}

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
      <CallbackCta />
    </>
  )
}
