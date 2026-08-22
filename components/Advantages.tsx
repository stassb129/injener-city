'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, CreditCard, ShieldCheck, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { advantages } from '@/lib/content'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

const icons: LucideIcon[] = [Sparkles, BadgeCheck, ShieldCheck, CreditCard]

type Props = {
  id?: string
  showHeading?: boolean
  /** Компактные карточки на главной; полный вид — на /advantages */
  compact?: boolean
}

export default function Advantages({ id = 'advantages', showHeading = true, compact = false }: Props) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-24 border-y border-white/10 ${compact ? 'section-y' : 'py-5 lg:py-6'}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink-700/40" />
        <div className="absolute inset-0 grid-lines opacity-45" />
      </div>

      <div className="container-x">
        {showHeading && (
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.span variants={fadeInUp} className="section-label">
              <span className="h-px w-8 bg-accent" />
              Преимущества
            </motion.span>
            <motion.h2 variants={fadeInUp} className="heading-section mt-2">
              Наши <span className="text-accent">преимущества</span>
            </motion.h2>
          </motion.div>
        )}

        <motion.div
          variants={staggerContainer(0.08, showHeading ? 0.05 : 0)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`grid card-gap ${compact ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2'} ${
            showHeading ? 'section-gap' : ''
          }`}
        >
          {advantages.map((item, i) => {
            const Icon = icons[i]
            return (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                whileHover={{ y: -3 }}
                className={`group rounded-xl border border-white/10 bg-ink-800 transition-colors hover:border-accent/50 ${
                  compact ? 'p-4' : 'p-5 sm:p-6'
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-accent transition-colors group-hover:bg-accent group-hover:text-ink">
                  <Icon size={16} />
                </span>
                <h3 className="mt-3 text-sm font-semibold leading-snug tracking-tight sm:text-base">
                  {item.title}
                </h3>
                {!compact && (
                  <p className="mt-2.5 text-sm font-light leading-relaxed text-white/55">{item.description}</p>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
