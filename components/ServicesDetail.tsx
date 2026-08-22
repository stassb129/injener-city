'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { services } from '@/lib/services'
import { articles } from '@/lib/content'
import { useLeadModal } from '@/components/LeadModal'
import { fadeInUp, slideInLeft, slideInRight, staggerContainer, viewportOnce } from '@/lib/motion'

function articleParagraphs(articleId?: string) {
  if (!articleId) return []
  const article = articles.find((a) => a.id === articleId)
  if (!article) return []
  const extra = article.afterTabs ? [...article.afterTabs] : []
  const tabText = article.tabs
    ? article.tabs.flatMap((t) => [`${t.label}.`, ...t.paragraphs])
    : []
  return [...article.paragraphs, ...tabText, ...extra]
}

export default function ServicesDetail() {
  return (
    <section className="scroll-mt-24 section-y pt-0">
      <div className="container-x flex flex-col gap-5 lg:gap-6">
        {services.map((service, index) => (
          <ServiceRow key={service.id} service={service} index={index} />
        ))}
      </div>
    </section>
  )
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[number]
  index: number
}) {
  const { openLeadModal } = useLeadModal()
  const reverse = index % 2 === 1
  const paragraphs = articleParagraphs(service.articleId)
  const articleTitle = articles.find((a) => a.id === service.articleId)?.title

  return (
    <motion.article
      id={service.id}
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
    >
      <div className={`grid lg:grid-cols-2 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <motion.div
          variants={reverse ? slideInRight : slideInLeft}
          className="relative min-h-[180px] sm:min-h-[200px] lg:min-h-[260px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={service.image}
            alt={service.imageAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0.55))]"
          />
          <span className="absolute left-4 top-4 text-2xl font-bold text-white/20">{service.number}</span>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex flex-col justify-center p-4 sm:p-6">
          <h2 className="text-base font-bold leading-snug tracking-tight sm:text-lg">{service.title}</h2>
          {articleTitle && articleTitle !== service.title && (
            <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em] text-accent">
              {articleTitle}
            </p>
          )}
          <div
            className="mt-3 max-h-[180px] space-y-2.5 overflow-y-auto overscroll-contain pr-1 sm:max-h-[200px]"
            data-lenis-prevent
          >
            {paragraphs.map((p) => (
              <p key={p.slice(0, 48)} className="text-[13px] font-light leading-relaxed text-white/55">
                {p}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => openLeadModal(service.title)}
            className="btn-accent mt-5 w-fit group"
          >
            Обратный звонок
            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </motion.div>
      </div>
    </motion.article>
  )
}
