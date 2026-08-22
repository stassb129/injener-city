import Link from 'next/link'
import { site } from '@/lib/site'

type Props = {
  className?: string
  showText?: boolean
  asLink?: boolean
}

function Mark({ className = '' }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
      className={`h-full w-full ${className}`}
    >
      <rect x="8" y="8" width="20" height="20" rx="2" stroke="#E0F7F4" strokeWidth="3" />
      <rect x="36" y="8" width="20" height="20" rx="2" stroke="#E0F7F4" strokeWidth="3" />
      <rect x="8" y="36" width="20" height="20" rx="2" stroke="#E0F7F4" strokeWidth="3" />
      <rect x="36" y="36" width="20" height="20" rx="2" fill="#2DD4BF" />
      <path
        d="M28 18h8M18 28v8M46 28v8M28 46h8"
        stroke="#2DD4BF"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  )
}

export default function Logo({ className = '', showText = true, asLink = true }: Props) {
  const content = (
    <>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
        <Mark />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span className="text-sm font-extrabold tracking-tight sm:text-base">{site.name}</span>
          <span className="mt-1 text-[7px] font-medium tracking-[0.18em] text-white/45 sm:text-[8px]">
            {site.tagline}
          </span>
        </span>
      )}
    </>
  )

  if (!asLink) {
    return <span className={`inline-flex items-center gap-2.5 ${className}`}>{content}</span>
  }

  return (
    <Link href="/" className={`group inline-flex shrink-0 items-center gap-2.5 ${className}`} aria-label={site.name}>
      {content}
    </Link>
  )
}
