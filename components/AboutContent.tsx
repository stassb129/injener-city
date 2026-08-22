'use client'

import { motion } from 'framer-motion'
import { articles } from '@/lib/content'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'
import AccordionArticles from '@/components/AccordionArticles'

/** Страница «О компании» — полный оригинальный текст в гармошке + вводный абзац сверху */
export default function AboutContent() {
  const intro = articles.find((a) => a.id === 'intro')

  return (
    <>
      <section className="section-y pt-0">
        <div className="container-x">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="max-w-3xl"
          >
            {intro?.paragraphs.map((p) => (
              <motion.p
                key={p.slice(0, 40)}
                variants={fadeInUp}
                className="mt-5 text-sm font-light leading-relaxed text-white/55 first:mt-0 lg:text-base"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      <AccordionArticles
        ids={['types', 'heating', 'ventilation', 'electrical', 'pricing']}
        label="О компании"
        heading={
          <>
            Материалы <span className="text-accent">сайта</span>
          </>
        }
        defaultOpenId="types"
      />
    </>
  )
}
