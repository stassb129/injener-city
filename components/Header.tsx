'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Clock, Menu, Phone, X } from 'lucide-react'
import { navLinks, site } from '@/lib/site'
import { EASE } from '@/lib/motion'
import { lockPageScroll, unlockPageScroll } from '@/lib/scroll-lock'
import { useLeadModal } from '@/components/LeadModal'
import Logo from '@/components/Logo'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { openLeadModal } = useLeadModal()

  const isActive = (href: string) => !href.includes('#') && pathname.startsWith(href)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    lockPageScroll()
    return () => unlockPageScroll()
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-ink/80 backdrop-blur-md shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)]'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-14 items-center justify-between gap-3 lg:h-16">
        <Logo />

        <nav className="hidden min-w-0 items-center gap-4 xl:flex xl:gap-5">
          {navLinks.map((link) => {
            const active = isActive(link.href)
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={`shrink-0 whitespace-nowrap text-[12px] font-medium transition-colors ${
                  active ? 'text-white' : 'text-white/65 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a
            href={site.phoneHref}
            className="hidden whitespace-nowrap text-[12px] font-semibold tracking-tight transition-colors hover:text-accent 2xl:inline"
          >
            {site.phone}
          </a>
          <a
            href={site.phoneHref}
            aria-label={site.phone}
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-white/15 text-accent transition-colors hover:border-accent xl:inline-flex 2xl:hidden"
          >
            <Phone size={15} />
          </a>

          <button
            type="button"
            onClick={() => openLeadModal('Шапка сайта')}
            className="btn-accent hidden !px-3 !py-2 !text-[11px] sm:inline-flex"
          >
            Заявка
          </button>

          <button
            type="button"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 bg-white/5 text-white transition-colors hover:border-accent hover:text-accent xl:hidden"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden border-t border-white/10 bg-ink/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-x flex flex-col gap-0.5 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: EASE }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`block border-b border-white/5 py-3 text-base font-medium transition-colors hover:text-accent ${
                      isActive(link.href) ? 'text-accent' : 'text-white/80'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-4 flex flex-col gap-2.5">
                <a
                  href={site.phoneHref}
                  className="flex items-center gap-2.5 whitespace-nowrap text-base font-semibold tracking-tight"
                >
                  <Phone size={16} className="shrink-0 text-accent" />
                  {site.phone}
                </a>
                <a
                  href={site.phoneAltHref}
                  className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium tracking-tight text-white/80"
                >
                  <Phone size={14} className="shrink-0 text-accent" />
                  {site.phoneAlt}
                </a>
                <span className="flex items-center gap-2.5 text-xs text-white/50">
                  <Clock size={14} className="text-accent" />
                  {site.schedule}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false)
                    openLeadModal('Мобильное меню')
                  }}
                  className="btn-accent mt-2 w-full"
                >
                  Обратный звонок
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
