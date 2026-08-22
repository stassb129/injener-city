'use client'

import { useEffect, useId, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { lockPageScroll, unlockPageScroll } from '@/lib/scroll-lock'
import { getArticle } from '@/components/AccordionArticles'

type Props = {
  articleId: string
  trigger: (open: () => void) => ReactNode
}

export default function ArticleModal({ articleId, trigger }: Props) {
  const [open, setOpen] = useState(false)
  const titleId = useId()
  const article = getArticle(articleId)

  useEffect(() => {
    if (!open) return
    lockPageScroll()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      unlockPageScroll()
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!article) return null

  return (
    <>
      {trigger(() => setOpen(true))}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
            <motion.button
              type="button"
              aria-label="Закрыть"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-800 shadow-glass sm:rounded-3xl"
              data-lenis-prevent
            >
              <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
                <h2 id={titleId} className="text-base font-bold leading-snug tracking-tight sm:text-lg">
                  {article.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 hover:border-accent hover:text-accent"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6" data-lenis-prevent>
                <div className="space-y-4">
                  {article.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)} className="text-sm font-light leading-relaxed text-white/60">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
