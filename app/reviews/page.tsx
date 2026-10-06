import PageHero from '@/components/PageHero'
import Reviews from '@/components/Reviews'
import CallbackCta from '@/components/CallbackCta'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'Отзывы клиентов',
  description:
    'Отзывы заказчиков о проектировании и монтаже вентиляции, кондиционирования, электроснабжения и отопления в Москве.',
  path: '/reviews',
  ogTitle: 'Отзывы о компании «Инженерные сети»',
})

export default function ReviewsPage() {
  return (
    <>
      <PageHero label="Отзывы о нас" title={<>Отзывы о нас</>} />
      <Reviews showHeading={false} />
      <CallbackCta />
    </>
  )
}
