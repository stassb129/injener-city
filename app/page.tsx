import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Advantages from '@/components/Advantages'
import Reviews from '@/components/Reviews'
import AccordionArticles from '@/components/AccordionArticles'
import ContactCta from '@/components/ContactCta'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Advantages compact />
      <Reviews />
      <AccordionArticles defaultOpenId="intro" />
      <ContactCta />
    </>
  )
}
