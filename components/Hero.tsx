'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { advantages, homeHero } from '@/lib/content'
import { EASE, fadeInUp, slideInRight, staggerContainer } from '@/lib/motion'
import { useLeadModal } from '@/components/LeadModal'

export default function Hero() {
  const { openLeadModal } = useLeadModal()

  return (
    <section id="top" className="relative isolate overflow-hidden bg-ink section-y-tight pt-4 lg:pt-6">
      <MeshBackground />

      <div className="container-x relative z-10">
        <div className="grid items-center gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            animate="visible"
            className="max-w-xl"
          >
            <motion.span variants={fadeInUp} className="section-label">
              <span className="h-px w-8 bg-accent" />
              {homeHero.label}
            </motion.span>

            <motion.p variants={fadeInUp} className="mt-2 text-xs font-medium tracking-wide text-white/45">
              {homeHero.brandLine}
            </motion.p>

            <motion.h1 variants={fadeInUp} className="heading-display mt-2">
              Инженерные сети в Москве —{' '}
              <span className="text-accent">монтаж и проектирование</span>
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center"
            >
              <button type="button" onClick={() => openLeadModal('Hero')} className="btn-accent group">
                Обратный звонок
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>
              <a href="#services" className="btn-ghost">
                Наши Услуги
              </a>
            </motion.div>

            <motion.ul
              variants={fadeInUp}
              className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-white/10 pt-4"
            >
              {advantages.map((item) => (
                <li key={item.title} className="text-xs font-medium text-white/55">
                  <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-sm bg-accent align-middle" />
                  {item.title}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative mx-auto w-full max-w-md"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 h-[65%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.2),transparent_68%)] blur-3xl"
            />
            <div className="relative z-10 overflow-hidden rounded-xl border border-white/10 shadow-glass">
              <Image
                src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
                alt="Проектирование и монтаж инженерных сетей"
                width={1000}
                height={750}
                priority
                className="aspect-[4/3] h-auto w-full object-cover"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(12,18,25,0.7)_100%)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MeshBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-60" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: EASE }}
        className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.12),transparent_65%)] blur-3xl"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-ink" />
    </div>
  )
}
