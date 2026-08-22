import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Advantages from '@/components/Advantages'
import Reviews from '@/components/Reviews'
import AccordionArticles from '@/components/AccordionArticles'
import CallbackCta from '@/components/CallbackCta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Advantages compact />
      <Reviews />
      <AccordionArticles defaultOpenId="intro" />
      <CallbackCta />
    </>
  )
}
