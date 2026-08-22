'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { reviews } from '@/lib/content'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

type Props = {
  showHeading?: boolean
}

export default function Reviews({ showHeading = true }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', containScroll: 'trimSnaps' })
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelected(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    setSnaps(emblaApi.scrollSnapList())
    onSelect()
    emblaApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id="reviews" className="relative scroll-mt-24 border-t border-white/10 section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-40" />

      <div className="container-x">
        {showHeading && (
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <motion.span variants={fadeInUp} className="section-label">
                <span className="h-px w-8 bg-accent" />
                Отзывы о нас
              </motion.span>
              <motion.h2 variants={fadeInUp} className="heading-section mt-2">
                Отзывы <span className="text-accent">заказчиков</span>
              </motion.h2>
            </div>
            <motion.div variants={fadeInUp} className="flex gap-2">
              <button
                type="button"
                aria-label="Предыдущий"
                onClick={() => emblaApi?.scrollPrev()}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 hover:border-accent hover:text-accent"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                aria-label="Следующий"
                onClick={() => emblaApi?.scrollNext()}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 hover:border-accent hover:text-accent"
              >
                <ChevronRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}

        <div className={showHeading ? 'section-gap' : ''}>
          <div ref={emblaRef} className="overflow-hidden" data-lenis-prevent>
            <div className="flex touch-pan-y gap-3">
              {reviews.map((review) => (
                <article
                  key={review.name}
                  className="relative min-w-0 flex-[0_0_100%] rounded-xl border border-white/10 bg-ink-700/80 p-4 sm:flex-[0_0_calc(50%-6px)] lg:flex-[0_0_calc(33.333%-8px)]"
                >
                  <Quote size={28} className="absolute right-4 top-4 text-white/[0.06]" />
                  <div className="flex gap-0.5" aria-label={`Оценка ${review.rating} из 5`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={i < review.rating ? 'fill-accent text-accent' : 'text-white/20'}
                      />
                    ))}
                  </div>
                  <p className="relative mt-3 text-sm font-light leading-relaxed text-white/70">
                    «{review.text}»
                  </p>
                  <footer className="mt-4 border-t border-white/10 pt-3">
                    <span className="block text-sm font-semibold">{review.name}</span>
                    <span className="mt-1 block text-xs text-white/40">{review.object}</span>
                    <span className="mt-0.5 block text-xs text-white/30">{review.date}</span>
                  </footer>
                </article>
              ))}
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {snaps.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Отзыв ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`h-1 rounded-full transition-all ${
                  i === selected ? 'w-8 bg-accent' : 'w-3 bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
