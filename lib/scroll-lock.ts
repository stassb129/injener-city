/** Согласованная блокировка Lenis + body при модалках/меню (с счётчиком вложенности). */

let lockCount = 0

export function lockPageScroll() {
  if (typeof window === 'undefined') return
  lockCount += 1
  if (lockCount === 1) {
    window.dispatchEvent(new Event('page-scroll-lock'))
    document.documentElement.classList.add('scroll-locked')
    document.body.style.overflow = 'hidden'
  }
}

export function unlockPageScroll() {
  if (typeof window === 'undefined') return
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) {
    window.dispatchEvent(new Event('page-scroll-unlock'))
    document.documentElement.classList.remove('scroll-locked')
    document.body.style.overflow = ''
  }
}
