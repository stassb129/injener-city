'use client'

import { motion } from 'framer-motion'
import { Phone } from 'lucide-react'
import { callbackCopy } from '@/lib/content'
import { site } from '@/lib/site'
import { fadeInUp, viewportOnce } from '@/lib/motion'
import { useLeadModal } from '@/components/LeadModal'

/** Единственный крупный блок заявки на странице (не дублировать в Footer). */
export default function CallbackCta() {
  const { openLeadModal } = useLeadModal()

  return (
    <section className="section-y pt-0">
      <div className="container-x">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="panel-card relative overflow-hidden p-5 sm:p-7"
        >
          <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0 max-w-xl">
              <span className="section-label">
                <span className="h-px w-8 bg-accent" />
                {callbackCopy.title}
              </span>
              <h2 className="heading-section mt-2.5">{callbackCopy.text}</h2>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
              <a href={site.phoneHref} className="btn-ghost whitespace-nowrap">
                <Phone size={15} className="shrink-0 text-accent" />
                <span className="truncate">{site.phone}</span>
              </a>
              <button type="button" onClick={() => openLeadModal('Блок callback')} className="btn-accent whitespace-nowrap">
                {callbackCopy.submit}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
