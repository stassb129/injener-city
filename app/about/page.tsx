import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import AboutContent from '@/components/AboutContent'

export const metadata: Metadata = {
  title: 'О компании',
  description:
    'Принято считать, что под понятием «инженерные сети» в Москве подразумевается эксплуатация всех систем в доме, которые обеспечивают комфортное проживание каждого жильца.',
}

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
