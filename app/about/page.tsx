import PageHero from '@/components/PageHero'
import AboutContent from '@/components/AboutContent'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'О компании',
  description:
    'Инжиниринговая компания «Инженерные сети»: проектирование, монтаж и обслуживание внутренних и наружных инженерных систем зданий в Москве.',
  path: '/about',
  ogTitle: 'О компании «Инженерные сети»',
})

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="О компании"
        title={
          <>
            Инженерные сети <span className="text-accent">Москва</span>
          </>
        }
        description="Принято считать, что под понятием «инженерные сети» в Москве подразумевается эксплуатация всех систем в доме, которые обеспечивают комфортное проживание каждого жильца."
      />
      <AboutContent />
    </>
  )
}
