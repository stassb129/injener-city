'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, MapPin, Phone } from 'lucide-react'
import { navLinks, servicesNav, site } from '@/lib/site'
import { fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'
import { useLeadModal } from '@/components/LeadModal'
import Logo from '@/components/Logo'

/** Подвал без дублирующего CTA-баннера — заявка уже есть в CallbackCta / шапке. */
export default function Footer() {
  const year = new Date().getFullYear()
  const { openLeadModal } = useLeadModal()

  return (
    <footer id="contacts" className="relative overflow-hidden border-t border-white/10 bg-ink-900 pt-12 pb-10 lg:pt-16 lg:pb-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-[radial-gradient(ellipse_at_50%_0%,rgba(45,212,191,0.1),transparent_65%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-40" />

      <div className="container-x relative">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
        >
          <motion.div variants={fadeInUp} className="lg:pr-4">
            <Logo />
            <p className="mt-4 text-xs font-light leading-relaxed text-white/45 sm:text-sm">
              Инжиниринговая компания. Инженерные сети Москва.
            </p>
            <button type="button" onClick={() => openLeadModal('Подвал сайта')} className="btn-accent mt-5">
              Обратный звонок
            </button>
          </motion.div>

          <motion.nav variants={fadeInUp}>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Навигация</h3>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-accent"
                  >
                    {link.label}
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 transition-all duration-300 group-hover:opacity-100"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.div variants={fadeInUp}>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Услуги</h3>
            <ul className="mt-4 space-y-2.5">
              {servicesNav.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-white/60 transition-colors hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">Контакты</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold tracking-tight transition-colors hover:text-accent"
                >
                  <Phone size={15} className="shrink-0 text-accent" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.phoneAltHref}
                  className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium tracking-tight text-white/70 transition-colors hover:text-accent"
                >
                  <Phone size={14} className="shrink-0 text-accent" />
                  {site.phoneAlt}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-xs text-white/50 sm:text-sm">
                <Clock size={14} className="shrink-0 text-accent" />
                {site.schedule}
              </li>
              <li className="flex items-start gap-2.5 text-xs text-white/50 sm:text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                {site.address}
              </li>
            </ul>
          </motion.div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 pb-2 text-xs text-white/35 sm:flex-row lg:mt-12">
          <span>
            © {year} {site.name}. Все права защищены.
          </span>
          <a href="#" className="transition-colors hover:text-accent">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  )
}
