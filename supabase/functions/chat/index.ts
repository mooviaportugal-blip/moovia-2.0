import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { corsHeaders } from "../_shared/cors.ts"

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY')

// Limits to prevent abuse (anonymous public chat widget)
const MAX_MESSAGES = 40
const MAX_MESSAGE_CHARS = 4000
const MAX_TOTAL_CHARS = 30000

// In-memory IP rate limit (per isolate), best-effort throttle
const ipHits = new Map<string, { count: number; reset: number }>()
const RATE_LIMIT = 20 // requests
const RATE_WINDOW_MS = 60_000 // per minute

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // --- Rate limit by IP ---
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    const now = Date.now()
    const entry = ipHits.get(ip)
    if (!entry || entry.reset < now) {
      ipHits.set(ip, { count: 1, reset: now + RATE_WINDOW_MS })
    } else {
      entry.count++
      if (entry.count > RATE_LIMIT) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    // --- Input validation ---
    let payload: unknown
    try {
      payload = await req.json()
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const messages = (payload as { messages?: unknown })?.messages
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages must be a non-empty array' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    if (messages.length > MAX_MESSAGES) {
      return new Response(JSON.stringify({ error: `Too many messages (max ${MAX_MESSAGES})` }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let total = 0
    const cleanMessages: { role: 'user' | 'assistant'; content: string }[] = []
    for (const m of messages) {
      const role = (m as any)?.role
      const content = (m as any)?.content
      if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') {
        return new Response(JSON.stringify({ error: 'Invalid message shape' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      if (content.length > MAX_MESSAGE_CHARS) {
        return new Response(JSON.stringify({ error: `Message exceeds ${MAX_MESSAGE_CHARS} chars` }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      total += content.length
      cleanMessages.push({ role, content })
    }
    if (total > MAX_TOTAL_CHARS) {
      return new Response(JSON.stringify({ error: 'Conversation too long' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    if (!ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: 'Server misconfigured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const systemPrompt = `Você é o assistente inteligente da MOOVIA Portugal, uma consultoria boutique
que coordena transições internacionais de brasileiros para Portugal.

Responda sempre em português do Brasil, com frases curtas, tom próximo e profissional.
Primeira coisa: peça o nome da pessoa. Depois entenda o contexto (motivo, timing, família).
Em seguida capture WhatsApp (+55 11 99999-9999) e email. Não use bullets nem emojis.
Quando tiver nome + whatsapp + email, inclua ao final, em linha separada:
[LEAD_CAPTURE]{"name":"...","whatsapp":"...","email":"...","objective":"...","timing":"...","notes":"..."}[/LEAD_CAPTURE]`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 1000,
        system: systemPrompt,
        messages: cleanMessages,
      }),
    })

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
