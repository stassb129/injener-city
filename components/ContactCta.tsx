'use client'

import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'
import { contactCopy } from '@/lib/content'
import { site } from '@/lib/site'
import { fadeInUp, viewportOnce } from '@/lib/motion'

export default function ContactCta() {
  const [email] = site.emails

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
                {contactCopy.title}
              </span>
              <h2 className="heading-section mt-2.5">{contactCopy.text}</h2>
              <p className="mt-2 text-sm font-light text-white/50">{site.schedule}</p>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row">
              <a href={`mailto:${email}`} className="btn-ghost whitespace-nowrap">
                <Mail size={15} className="shrink-0 text-accent" />
                <span className="truncate">{email}</span>
              </a>
              <a href={site.phoneHref} className="btn-accent whitespace-nowrap">
                <Phone size={15} className="shrink-0" />
                {site.phone}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
