// Cloudflare Pages Function: POST /api/notify-lead -> Telegram message.
// Secrets TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are set in the Pages
// project (Settings -> Variables and Secrets), never committed.

interface Env {
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
}

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...cors },
  })

export const onRequest = async ({ request, env }: { request: Request; env: Env }) => {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405)

  let data: Record<string, unknown> = {}
  try {
    data = (await request.json()) as Record<string, unknown>
  } catch {
    return json({ error: 'Invalid JSON' }, 400)
  }

  const { name, email, phone, website, message, requestNda } = data
  if (!name || !email) return json({ error: 'Name and email are required' }, 400)

  const token = env.TELEGRAM_BOT_TOKEN
  const chatId = env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return json({ error: 'Telegram credentials not configured' }, 500)

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

  const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text }),
  })
  if (!tg.ok) return json({ error: `Telegram error: ${await tg.text()}` }, 502)

  return json({ success: true })
}
