'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { articles, type Article } from '@/lib/content'
import { EASE, fadeInUp, staggerContainer, viewportOnce } from '@/lib/motion'

function Paragraphs({ items }: { items: readonly string[] }) {
  return (
    <div className="space-y-4">
      {items.map((p) => (
        <p key={p.slice(0, 48)} className="text-sm font-light leading-relaxed text-white/60 lg:text-base">
          {p}
        </p>
      ))}
    </div>
  )
}

function ArticleTabs({ tabs }: { tabs: NonNullable<Article['tabs']> }) {
  const [active, setActive] = useState(tabs[0]?.id ?? '')
  const current = tabs.find((t) => t.id === active) ?? tabs[0]

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
              active === tab.id
                ? 'border-accent bg-accent text-ink'
                : 'border-white/15 bg-white/5 text-white/70 hover:border-accent/40 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="mt-5"
        >
          <Paragraphs items={current.paragraphs} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function AccordionItem({
  article,
  open,
  onToggle,
}: {
  article: Article
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.04] sm:px-6"
      >
        <span className="text-sm font-bold leading-snug tracking-tight sm:text-base">
          {article.title}
        </span>
        <ChevronDown
          size={20}
          className={`mt-1 shrink-0 text-accent transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 px-5 pb-6 pt-4 sm:px-6">
              <Paragraphs items={article.paragraphs} />
              {'tabs' in article && article.tabs && <ArticleTabs tabs={article.tabs} />}
              {'afterTabs' in article && article.afterTabs && (
                <div className="mt-5">
                  <Paragraphs items={article.afterTabs} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type Props = {
  /** Какие статьи показать; по умолчанию все */
  ids?: readonly string[]
  label?: string
  heading?: React.ReactNode
  defaultOpenId?: string
  className?: string
}

export default function AccordionArticles({
  ids,
  label = 'Материалы',
  heading = (
    <>
      Подробнее об <span className="text-accent">инженерных сетях</span>
    </>
  ),
  defaultOpenId,
  className = '',
}: Props) {
  const list = ids ? articles.filter((a) => ids.includes(a.id)) : [...articles]
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? list[0]?.id ?? null)

  return (
    <section className={`relative section-y ${className}`.trim()}>
      <div className="container-x">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl"
        >
          <motion.span variants={fadeInUp} className="section-label">
            <span className="h-px w-10 bg-accent" />
            {label}
          </motion.span>
          <motion.h2 variants={fadeInUp} className="heading-section mt-3">
            {heading}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="section-gap flex flex-col gap-3"
        >
          {list.map((article) => (
            <motion.div key={article.id} variants={fadeInUp}>
              <AccordionItem
                article={article}
                open={openId === article.id}
                onToggle={() => setOpenId((prev) => (prev === article.id ? null : article.id))}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/** Хелпер: найти статью по id */
export function getArticle(id: string) {
  return articles.find((a) => a.id === id)
}
