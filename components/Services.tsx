'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import { services } from '@/lib/services'
import { fadeIn, fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'
import ArticleModal from '@/components/ArticleModal'

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink section-y">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-40 w-[55%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.1),transparent_70%)] blur-2xl" />
      </div>

      <div className="container-x">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-xl">
            <motion.span variants={fadeInUp} className="section-label">
              <span className="h-px w-8 bg-accent" />
              Наши услуги
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-section mt-3">
              Наши <span className="text-accent">услуги</span>
            </motion.h2>
          </div>
          <motion.div variants={fadeInUp}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent"
            >
              Все услуги подробно
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="section-gap grid card-gap sm:grid-cols-2"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: (typeof services)[number] }) {
  const { number, title, href, image, articleId } = service

  const cardInner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.8)_100%)]"
      />
      <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
        <div>
          <span className="text-xs font-semibold tracking-wide text-accent">{number}</span>
          <h3 className="heading-card mt-2 max-w-[95%]">{title}</h3>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/65">Подробности</span>
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/60 bg-black/30 text-white transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink">
            <ChevronRight size={16} strokeWidth={1.75} />
          </span>
        </div>
      </div>
    </>
  )

  const shell =
    'group relative block h-[168px] w-full overflow-hidden rounded-xl text-left shadow-[0_16px_32px_-20px_rgba(0,0,0,0.85)] sm:h-[190px] lg:h-[200px]'

  return (
    <motion.div variants={fadeIn}>
      {articleId ? (
        <ArticleModal
          articleId={articleId}
          trigger={(open) => (
            <button type="button" onClick={open} className={shell}>
              {cardInner}
            </button>
          )}
        />
      ) : (
        <Link href={href} className={shell}>
          {cardInner}
        </Link>
      )}
    </motion.div>
  )
}
