import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { name, email, phone, website, message, requestNda } = req.body ?? {}

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Telegram credentials not configured' })
  }

  const text = [
    '🔔 Lead mới từ portfolio!',
    '',
    `👤 Tên: ${name}`,
    `📧 Email: ${email}`,
    `📞 Phone: ${phone || 'Không cung cấp'}`,
    `🌐 Website: ${website || 'Không cung cấp'}`,
    `📝 Nội dung: ${message || 'Không có'}`,
    `🔒 Yêu cầu NDA: ${requestNda ? 'Có' : 'Không'}`,
  ].join('\n')

  const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })

  if (!tgRes.ok) {
    const err = await tgRes.text()
    return res.status(502).json({ error: `Telegram error: ${err}` })
  }

  return res.status(200).json({ success: true })
}
