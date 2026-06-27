/**
 * PDCA Analytics Mock Server
 *
 * Run with:  node mock-server.js
 *
 * Endpoints:
 *   POST /api/analytics          — receive an event from the browser
 *   GET  /api/analytics/events   — return all captured events as JSON
 *   GET  /api/analytics/summary  — event counts grouped by type + page
 */

import http from 'node:http'

const PORT = 3000

// In-memory store — cleared on server restart
const events = []

// ── Console colours ────────────────────────────────────────────────────────
const C = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  dim:    '\x1b[2m',
  orange: '\x1b[38;5;208m',
  cyan:   '\x1b[36m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  red:    '\x1b[31m',
  gray:   '\x1b[90m',
}
const c = (color, text) => `${color}${text}${C.reset}`

const EVENT_COLORS = {
  page_view:     C.cyan,
  button_click:  C.green,
  whatsapp_click: C.yellow,
  form_start:    C.orange,
  form_submit:   C.orange,
  form_success:  C.green,
  form_error:    C.red,
  faq_toggle:    C.gray,
}

function printEvent(ev) {
  const color  = EVENT_COLORS[ev.event] ?? C.reset
  const time   = new Date(ev.timestamp).toLocaleTimeString()
  const header = `${c(color, c(C.bold, ev.event.padEnd(18)))}  ${c(C.gray, time + '  ·  ' + ev.page + '  ·  session:' + ev.sessionId.slice(0, 8))}`
  const props  = Object.entries(ev.properties)
    .map(([k, v]) => `    ${c(C.cyan, k.padEnd(14))} ${JSON.stringify(v)}`)
    .join('\n')

  console.log(header)
  if (props) console.log(props)
  console.log(c(C.gray, '─'.repeat(70)))
}

// ── CORS helper ─────────────────────────────────────────────────────────────
function setCors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
}

// ── Route handlers ───────────────────────────────────────────────────────────
function handleIngest(req, res) {
  let body = ''
  req.on('data', chunk => { body += chunk })
  req.on('end', () => {
    try {
      const ev = JSON.parse(body)
      events.push(ev)
      printEvent(ev)
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ ok: true, total: events.length }))
    } catch {
      res.writeHead(400)
      res.end('Bad JSON')
    }
  })
}

function handleEvents(res) {
  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(events, null, 2))
}

function handleSummary(res) {
  const byType = {}
  const byPage = {}
  const sessions = new Set()

  for (const ev of events) {
    byType[ev.event]  = (byType[ev.event]  ?? 0) + 1
    byPage[ev.page]   = (byPage[ev.page]   ?? 0) + 1
    sessions.add(ev.sessionId)
  }

  // Button click breakdown
  const buttonLabels = {}
  for (const ev of events.filter(e => e.event === 'button_click' || e.event === 'whatsapp_click')) {
    const key = ev.properties.label ?? ev.properties.source ?? '(unknown)'
    buttonLabels[key] = (buttonLabels[key] ?? 0) + 1
  }

  // FAQ open breakdown
  const faqOpens = {}
  for (const ev of events.filter(e => e.event === 'faq_toggle' && e.properties.action === 'open')) {
    const q = String(ev.properties.question ?? '').slice(0, 50)
    faqOpens[q] = (faqOpens[q] ?? 0) + 1
  }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({
    totalEvents: events.length,
    uniqueSessions: sessions.size,
    byType,
    byPage,
    buttonLabels,
    faqOpens,
  }, null, 2))
}

// ── Server ───────────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  setCors(res)

  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    res.end()
    return
  }

  const url = req.url?.split('?')[0]

  if (req.method === 'POST' && url === '/api/analytics') return handleIngest(req, res)
  if (req.method === 'GET'  && url === '/api/analytics/events')  return handleEvents(res)
  if (req.method === 'GET'  && url === '/api/analytics/summary') return handleSummary(res)

  res.writeHead(404)
  res.end('Not found')
})

server.listen(PORT, () => {
  console.log(c(C.bold, '\n  PDCA Analytics Mock Server\n'))
  console.log(`  ${c(C.green, 'POST')} ${c(C.gray, 'http://localhost:' + PORT + '/api/analytics')}          receive events`)
  console.log(`  ${c(C.cyan,  'GET')}  ${c(C.gray, 'http://localhost:' + PORT + '/api/analytics/events')}   all events (JSON)`)
  console.log(`  ${c(C.cyan,  'GET')}  ${c(C.gray, 'http://localhost:' + PORT + '/api/analytics/summary')}  counts by type, page, button, FAQ`)
  console.log('\n' + c(C.gray, '─'.repeat(70)) + '\n')
})
