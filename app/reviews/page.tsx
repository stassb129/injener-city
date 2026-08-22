import type { Metadata } from 'next'
import PageHero from '@/components/PageHero'
import Reviews from '@/components/Reviews'
import CallbackCta from '@/components/CallbackCta'

export const metadata: Metadata = {
  title: 'Отзывы о нас',
}

export default function ReviewsPage() {
  return (
    <>
      <PageHero label="Отзывы о нас" title={<>Отзывы о нас</>} />
      <Reviews showHeading={false} />
      <CallbackCta />
    </>
  )
}
