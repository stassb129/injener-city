'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'

type Props = {
  label: string
  title: React.ReactNode
  description?: string
}

export default function PageHero({ label, title, description }: Props) {
  return (
    <section className="relative isolate overflow-hidden section-y-tight">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines opacity-50" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.16),transparent_65%)] blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="container-x"
      >
        <motion.span variants={fadeInUp} className="section-label">
          <span className="h-px w-8 bg-accent" />
          {label}
        </motion.span>

        <motion.h1 variants={fadeInUp} className="heading-display mt-2 max-w-3xl">
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={fadeInUp}
            className="mt-2.5 max-w-2xl text-sm font-light leading-relaxed text-white/55"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
