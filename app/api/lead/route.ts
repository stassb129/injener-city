import { NextResponse } from 'next/server'
import { formatRuPhone, isValidRuPhone } from '@/lib/phone'

type LeadPayload = {
  name?: unknown
  phone?: unknown
  source?: unknown
  page?: unknown
  /** Honeypot: реальные пользователи это поле не видят и не заполняют */
  website?: unknown
}

const str = (value: unknown, max: number) => (typeof value === 'string' ? value.trim().slice(0, max) : '')

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export async function POST(request: Request) {
  let body: LeadPayload
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_request' }, { status: 400 })
  }

  if (str(body.website, 200)) {
    return NextResponse.json({ ok: true })
  }

  const name = str(body.name, 100)
  const phone = str(body.phone, 40)
  const source = str(body.source, 200) || 'Заявка с сайта'
  const page = str(body.page, 300)

  if (name.length < 2 || !isValidRuPhone(phone)) {
    return NextResponse.json({ ok: false, error: 'validation' }, { status: 422 })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.error('[lead] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID не заданы', { name, phone, source })
    return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 })
  }

  const text = [
    '<b>Новая заявка с сайта</b>',
    `Имя: ${escapeHtml(name)}`,
    `Телефон: ${escapeHtml(formatRuPhone(phone))}`,
    `Источник: ${escapeHtml(source)}`,
    page && `Страница: ${escapeHtml(page)}`,
  ]
    .filter(Boolean)
    .join('\n')

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    cache: 'no-store',
  })

  if (!response.ok) {
    console.error('[lead] Telegram error', response.status, await response.text())
    return NextResponse.json({ ok: false, error: 'delivery' }, { status: 502 })
  }

  return NextResponse.json({ ok: true })
}
