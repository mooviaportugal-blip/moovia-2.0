'use client'

import * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
const maiaLogo = { url: '/images/maia-logo.png' }
import { useI18n } from '@/lib/i18n/I18nProvider'
import { notifyLead } from '@/lib/leadNotifications'

interface Message {
  role: 'user' | 'assistant'
  content: string
}


interface QualState {
  step: 'name' | 'email' | 'whatsapp' | 'done'
  name: string
  email: string
  ddi: string
  whatsapp: string
  session_id: string
}

type HandoffField =
  | 'persona_type'
  | 'objective'
  | 'timing'
  | 'composition'
  | 'decision_phase'
  | 'email'
  | 'whatsapp'
  | 'contact_period'
  | 'contact_method'
  | 'message'


interface HandoffStep {
  field: HandoffField
  question: string
  options?: string[]
}

interface HandoffState {
  active: boolean
  step: number
  answers: Partial<Record<HandoffField, string>>
}

const DDI_LIST = [
  { code: '+351', flag: '🇵🇹', label: 'Portugal', mask: '999 999 999' },
  { code: '+34', flag: '🇪🇸', label: 'Espanha', mask: '999 999 999' },
  { code: '+44', flag: '🇬🇧', label: 'UK', mask: '9999 999999' },
  { code: '+49', flag: '🇩🇪', label: 'Alemanha', mask: '999 99999999' },
  { code: '+1', flag: '🇺🇸', label: 'EUA', mask: '(999) 999-9999' },
  { code: '+55', flag: '🇧🇷', label: 'Brasil', mask: '(99) 99999-9999' },
]

function applyMask(value: string, mask: string): string {
  const digits = value.replace(/\D/g, '')
  let result = ''
  let di = 0
  for (let i = 0; i < mask.length && di < digits.length; i++) {
    if (mask[i] === '9') {
      result += digits[di++]
    } else {
      result += mask[i]
    }
  }
  return result
}

function newSessionId(): string {
  const c: any = typeof crypto !== 'undefined' ? crypto : null
  if (c?.randomUUID) return c.randomUUID()
  return Math.random().toString(36).slice(2) + Date.now().toString(36)
}

const CHECKOUT_URL = 'https://mooviaportugal.com/checkout'
const CHECKOUT_RE = /https?:\/\/[^\s)]*mooviaportugal\.com\/checkout\/?/gi
const HANDOFF_TRIGGER_RE = /\b(atendimento|atendido|atendida|conversa gratuita|conversar com humano|falar com humano|falar com um humano|falar com consultor|falar com fundador|marcar reunião|marcar reuniao|quero ser atendido|quero ser atendida|humano)\b/i

const HANDOFF_STEPS: HandoffStep[] = [
  {
    field: 'persona_type',
    question: 'Antes de mais: fala em nome de uma empresa ou como pessoa/família?',
    options: ['Empresa (RH ou Mobilidade)', 'Pessoa ou família'],
  },
  {
    field: 'objective',
    question: 'Qual o objetivo principal com Portugal (ou com mobilidade internacional)?',
    options: [
      'Expatriar colaboradores (Global Mobility Assurance)',
      'Reduzir risco humano em missões internacionais',
      'Mudar com a família para Portugal',
      'Reforma ou recomeço pessoal em Portugal',
      'Investir em imóveis / património',
      'Outro',
    ],
  },
  {
    field: 'timing',
    question: 'Qual o horizonte da decisão?',
    options: ['Menos de 60 dias', '3 a 6 meses', '6 a 12 meses', 'Já tomei a decisão', 'Ainda a explorar'],
  },
  {
    field: 'composition',
    question: 'Quem participa nesta transição?',
    options: ['Apenas eu', 'Casal', 'Família com filhos', 'Colaborador + família', 'Equipa / vários colaboradores'],
  },
  {
    field: 'decision_phase',
    question: 'Em que fase está?',
    options: ['A explorar categorias', 'A comparar fornecedores', 'Já decidi, a planear', 'Preciso agir agora', 'Já com proposta ou contrato assinado'],
  },

  { field: 'email', question: 'Pode confirmar o seu e-mail?' },
  { field: 'whatsapp', question: 'E o seu WhatsApp (com indicativo do país)?' },
  {
    field: 'contact_period',
    question: 'Qual o melhor período para te ligarem?',
    options: ['Manhã', 'Tarde', 'Noite'],
  },
  {
    field: 'contact_method',
    question: 'Prefere Ligação ou Vídeo Chamada?',
    options: ['Ligação', 'Vídeo Chamada'],
  },
  {
    field: 'message',
    question: 'Quer me contar brevemente o seu caso? (opcional, pode pular)',
    options: ['Pular'],
  },
]

function stripOptionsStreaming(text: string): string {
  let out = text.replace(/\[OPTIONS\][\s\S]*?\[\/OPTIONS\]/g, '')
  const open = out.indexOf('[OPTIONS')
  if (open !== -1) out = out.slice(0, open)
  return out.trimEnd()
}

function parseOptions(text: string): string[] {
  const m = text.match(/\[OPTIONS\]([\s\S]*?)\[\/OPTIONS\]/)
  if (!m) return []
  return m[1].split('|').map((s) => s.trim()).filter(Boolean)
}

function withOptions(question: string, options?: string[]): string {
  return options?.length ? `${question}\n[OPTIONS]${options.join('|')}[/OPTIONS]` : question
}

function isValidLeadName(name: string): boolean {
  const block = new Set([
    'oi','ola','olá','hey','hi','hello','sim','nao','não','tudo','bom','boa','bem',
    'opa','eai','blz','obrigado','obrigada','ok','sla','talvez','quero','saber',
  ])
  const first = name.trim().split(/\s+/)[0] || ''
  const norm = first.toLowerCase().replace(/[^\p{L}]/gu, '')
  return first.length >= 3 && norm.length >= 3 && !block.has(norm)
}

function renderAssistant(text: string): React.ReactNode {
  const clean = stripOptionsStreaming(text)
  const parts: React.ReactNode[] = []
  let last = 0
  let m: RegExpExecArray | null
  const re = new RegExp(CHECKOUT_RE.source, 'gi')
  let key = 0
  while ((m = re.exec(clean)) !== null) {
    if (m.index > last) parts.push(clean.slice(last, m.index))
    parts.push(
      <a
        key={`cta-${key++}`}
        href={CHECKOUT_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          margin: '10px 0 4px',
          padding: '10px 16px',
          background: '#ad8957',
          color: '#0b1225',
          fontFamily: 'Sora, sans-serif',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          borderRadius: 2,
          boxShadow: '0 8px 24px rgba(173,137,87,.25)',
        }}
      >
        Pagamento seguro →
      </a>,
    )
    last = m.index + m[0].length
  }
  if (last < clean.length) parts.push(clean.slice(last))
  return parts.length ? parts : clean
}



type MaiaLang = 'pt' | 'en' | 'es'
const MAIA_STRINGS: Record<MaiaLang, {
  invites: string[]
  greetingNew: string
  greetingDone: (n: string) => string
  greetingWhats: (n: string) => string
  greetingEmail: (n: string) => string
  askName: string
  askEmailAfterName: (n: string) => string
  invalidEmail: string
  askWhats: string
  invalidWhats: string
  thanks: (n: string) => string
  ariaOpen: string
  voiceUnsupported: string
}> = {
  pt: {
    invites: ['Olá, posso ajudar?','Alguma dúvida sobre Global Mobility Assurance?','Estou aqui para ajudar!','Olá! Quer conversar?','Posso orientá-lo(a) sobre mobilidade internacional?'],
    greetingNew: 'Olá! Eu sou a MAIA, assistente da MOOVIA — a empresa que criou a categoria Global Mobility Assurance.\n\nAntes de mais, como se chama?',
    greetingDone: (n) => `Bem-vindo(a) de volta, ${n}! Sou a MAIA. Em que posso ajudar hoje sobre a sua mobilidade internacional?`,
    greetingWhats: (n) => `Olá de novo, ${n}! Para finalizar o seu registo, passa-me o seu WhatsApp?`,
    greetingEmail: (n) => `Olá, ${n}! Sou a MAIA. Para continuarmos, qual o seu melhor e-mail?`,
    askName: 'Olá! Antes de mais, como se chama?',

    askEmailAfterName: (n) => `${n}, prazer! Qual o seu melhor e-mail para contacto?`,
    invalidEmail: 'Esse e-mail não parece válido. Pode escrever novamente?',
    askWhats: 'Perfeito! Agora passe-me o seu WhatsApp (com indicativo) para finalizar?',
    invalidWhats: 'Número incompleto. Pode enviar-me o WhatsApp com indicativo?',
    thanks: (n) => `Obrigada, ${n}! Registo feito. Agora diga-me: em que posso ajudar hoje?`,
    ariaOpen: 'Abrir chat MAIA',
    voiceUnsupported: 'Seu navegador não suporta reconhecimento de voz.',
  },
  en: {
    invites: ['Hi, can I help?','Any questions on Global Mobility Assurance?','I’m here to help!','Hey! Want to chat?','Can I guide you on international mobility?'],
    greetingNew: 'Hi! I’m MAIA, MOOVIA’s assistant — the company that created the Global Mobility Assurance category.\n\nFirst, what should I call you?',
    greetingDone: (n) => `Welcome back, ${n}! I’m MAIA. How can I help with your international mobility today?`,
    greetingWhats: (n) => `Hi again, ${n}! To finish your registration, what’s your WhatsApp?`,
    greetingEmail: (n) => `Hi ${n}! I’m MAIA. To continue, what’s your best email?`,
    askName: 'Hi! First, what should I call you?',

    askEmailAfterName: (n) => `${n}, nice to meet you! What’s your best contact email?`,
    invalidEmail: 'That email doesn’t look valid. Could you type it again?',
    askWhats: 'Perfect! Now please share your WhatsApp (with country code) to finish?',
    invalidWhats: 'Incomplete number. Could you send your WhatsApp with country code?',
    thanks: (n) => `Thank you, ${n}! Registration complete. Now tell me: how can I help you today?`,
    ariaOpen: 'Open MAIA chat',
    voiceUnsupported: 'Your browser does not support voice recognition.',
  },
  es: {
    invites: ['¡Hola! ¿Puedo ayudarte?','¿Dudas sobre Global Mobility Assurance?','¡Estoy aquí para ayudarte!','¡Hola! ¿Quieres hablar conmigo?','¿Te oriento sobre movilidad internacional?'],
    greetingNew: '¡Hola! Soy MAIA, asistente de MOOVIA — la empresa que creó la categoría Global Mobility Assurance.\n\nAntes de nada, ¿cómo te llamo?',
    greetingDone: (n) => `¡Bienvenido de nuevo, ${n}! Soy MAIA. ¿En qué puedo ayudarte hoy con tu movilidad internacional?`,
    greetingWhats: (n) => `¡Hola otra vez, ${n}! Para terminar tu registro, ¿me das tu WhatsApp?`,
    greetingEmail: (n) => `¡Hola, ${n}! Soy MAIA. Para continuar, ¿cuál es tu mejor email?`,
    askName: '¡Hola! Antes de nada, ¿cómo te llamo?',

    askEmailAfterName: (n) => `¡${n}, encantada! ¿Cuál es tu mejor email de contacto?`,
    invalidEmail: 'Ese email no parece válido. ¿Puedes escribirlo de nuevo?',
    askWhats: '¡Perfecto! Ahora pásame tu WhatsApp (con prefijo) para finalizar?',
    invalidWhats: 'Número incompleto. ¿Puedes enviarme tu WhatsApp con prefijo?',
    thanks: (n) => `¡Gracias, ${n}! Registro completo. Ahora cuéntame: ¿en qué puedo ayudarte hoy?`,
    ariaOpen: 'Abrir chat MAIA',
    voiceUnsupported: 'Tu navegador no admite reconocimiento de voz.',
  },
}
function pickLang(locale: string): MaiaLang {
  if (locale.startsWith('en')) return 'en'
  if (locale.startsWith('es')) return 'es'
  return 'pt'
}

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) || 'https://eueddvtfjdhmqudnpzcz.supabase.co'
const SUPABASE_KEY =
  (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ||
  (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ||
  'sb_publishable_8CsuZb5A-PBJYek-WBz0hg_Il8FomRV'

export function ChatAssistant() {
  const { locale } = useI18n()
  const mLang = pickLang(locale)
  const S = MAIA_STRINGS[mLang]
  const [open, setOpen] = useState(false)

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [phoneError, setPhoneError] = useState('')
  const [selectedDDI, setSelectedDDI] = useState(DDI_LIST[0])
  const [showDDI, setShowDDI] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [handoff, setHandoff] = useState<HandoffState>({ active: false, step: 0, answers: {} })
  const leadSavedRef = useRef(false)

  const [qual, setQual] = useState<QualState>(() => {
    if (typeof window === 'undefined') {
      return { step: 'name', name: '', email: '', ddi: '+351', whatsapp: '', session_id: '' }
    }
    try {
      const saved = localStorage.getItem('moovia_qual')
      if (saved) return JSON.parse(saved)
    } catch {}
    return {
      step: 'name',
      name: '',
      email: '',
      ddi: '+351',
      whatsapp: '',
      session_id: newSessionId(),
    }
  })

  const messagesEnd = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const recognition = useRef<any>(null)

  const INVITES = S.invites

  const [invite, setInvite] = useState(() => INVITES[Math.floor(Math.random() * INVITES.length)])
  const [showInvite, setShowInvite] = useState(false)

  useEffect(() => {
    const handler = () => setOpen(true)
    window.addEventListener('maia:open', handler)
    return () => window.removeEventListener('maia:open', handler)
  }, [])

  useEffect(() => {
    if (open) {
      setShowInvite(false)
      return
    }
    const show = setTimeout(() => setShowInvite(true), 1500)
    const rotate = setInterval(() => {
      setInvite(INVITES[Math.floor(Math.random() * INVITES.length)])
    }, 6000)
    return () => {
      clearTimeout(show)
      clearInterval(rotate)
    }
  }, [open])

  // Refresh invite + initial greeting language when locale changes
  useEffect(() => {
    setInvite(S.invites[Math.floor(Math.random() * S.invites.length)])
    if (!open && messages.length <= 1 && messages[0]?.role === 'assistant') {
      // re-localize the initial greeting if no user reply yet
      setMessages([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mLang])

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (open && messages.length === 0) {
      const BLOCK = new Set([
        'oi','ola','olá','hey','hi','hello','sim','nao','não','tudo','bom','boa','bem',
        'opa','eai','blz','obrigado','obrigada','ok','sla','talvez','quero','saber',
      ])
      const rawFirst = (qual.name || '').trim().split(/\s+/)[0] || ''
      const normFirst = rawFirst.toLowerCase().replace(/[^\p{L}]/gu, '')
      const validName =
        rawFirst.length >= 3 && normFirst.length >= 3 && !BLOCK.has(normFirst)
      const hasName = !!validName
      const hasEmail = !!qual.email && /\S+@\S+\.\S+/.test(qual.email)
      const hasPhone = !!qual.whatsapp && qual.whatsapp.replace(/\D/g, '').length >= 8
      const first = hasName ? rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1) : ''

      let greeting = S.greetingNew
      if (hasName) {
        if (qual.step !== 'done') setQual((q) => ({ ...q, step: 'done' }))
        greeting = S.greetingDone(first)
      } else {
        if (qual.name || qual.step !== 'name') {
          setQual((q) => ({ ...q, step: 'name', name: '' }))
        }
      }


      setMessages([{ role: 'assistant', content: greeting }])
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    try {
      localStorage.setItem('moovia_qual', JSON.stringify(qual))
    } catch {}
  }, [qual])

  function startListening() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SR) {
      alert(S.voiceUnsupported)
      return
    }
    recognition.current = new SR()
    recognition.current.lang = mLang === 'en' ? 'en-US' : mLang === 'es' ? 'es-ES' : 'pt-BR'
    recognition.current.continuous = false
    recognition.current.interimResults = false
    recognition.current.onstart = () => setIsListening(true)
    recognition.current.onend = () => setIsListening(false)
    recognition.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setInput(transcript)
      setTimeout(() => send(transcript), 300)
    }
    recognition.current.onerror = () => setIsListening(false)
    recognition.current.start()
  }

  function stopListening() {
    recognition.current?.stop()
    setIsListening(false)
  }

  function speak(_text: string) {
    // TTS desativado a pedido: a IA não fala em voz alta o que escreve.
    return
  }

  function handlePhoneInput(val: string) {
    setPhoneError('')
    const masked = applyMask(val, selectedDDI.mask)
    setInput(masked)
    const digits = val.replace(/\D/g, '')
    const expected = selectedDDI.mask.split('').filter((c) => c === '9').length
    if (digits.length > 2 && digits.length < expected) {
      setPhoneError('Número incompleto')
    }
  }

  function extractLead(text: string): { clean: string; data: any | null } {
    // Tolerate malformed closers: [/LEAD_CAPTURE], /LEAD_CAPTURE], [LEAD_CAPTURE/], etc.
    const full = text.match(
      /\[LEAD_CAPTURE\]([\s\S]*?)(?:\[\/LEAD_CAPTURE\]|\[?\/LEAD_CAPTURE\]?|\[LEAD_CAPTURE\/?\])/,
    )
    if (full) {
      let data: any = null
      try {
        data = JSON.parse(full[1].trim())
      } catch {}
      const clean = text.replace(full[0], '').replace(/\[?\/?LEAD_CAPTURE\]?/g, '').trim()
      return { clean, data }
    }
    // Streaming or unterminated: hide everything from the opening tag onwards.
    const openIdx = text.indexOf('[LEAD_CAPTURE')
    if (openIdx !== -1) {
      return { clean: text.slice(0, openIdx).trim(), data: null }
    }
    // Safety: strip any stray closing fragments.
    const clean = text.replace(/\[?\/?LEAD_CAPTURE\]?/g, '').trim()
    return { clean, data: null }
  }

  async function saveLead(data: any, q: QualState = qual) {
    if (leadSavedRef.current && !data?.handoff) return
    const ddi = data?.ddi || q.ddi
    const phone = (data?.whatsapp || q.whatsapp || '').replace(/\D/g, '')
    const utm = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const fullPhone = phone ? `${ddi}${phone}` : null
    const email = data?.email || q.email || null

    // Try to reuse existing lead by email or phone (returning visitor from another device)
    let leadId: string | null = null
    try {
      if (email) {
        const { data: existing } = await (supabase.from('leads') as any)
          .select('id').eq('email', email).maybeSingle()
        if (existing?.id) leadId = existing.id
      }
      if (!leadId && fullPhone) {
        const { data: existing } = await (supabase.from('leads') as any)
          .select('id').eq('whatsapp', fullPhone).maybeSingle()
        if (existing?.id) leadId = existing.id
      }
    } catch {}

    const payload: any = {
      name: data?.name || q.name || null,
      email,
      whatsapp: fullPhone,
      ddi,
      source: data?.handoff ? 'chat_handoff' : 'chat',
      status: 'novo',
      session_id: q.session_id,
      objective: data?.objective || null,
      timing: data?.timing || null,
      composition: data?.composition || null,
      decision_phase: data?.decision_phase || null,
      contact_period: data?.contact_period || null,
      contact_method: data?.contact_method || null,
      message: data?.message || data?.notes || null,
      notes: data?.notes || null,
      referrer: typeof window !== 'undefined' ? window.location.href : null,
      utm_source: utm?.get('utm_source') || null,
      utm_medium: utm?.get('utm_medium') || null,
      utm_campaign: utm?.get('utm_campaign') || null,
    }

    if (leadId) {
      await (supabase.from('leads') as any).update(payload).eq('id', leadId)
    } else {
      leadId = newSessionId()
      await (supabase.from('leads') as any).insert({ id: leadId, ...payload })
    }
    leadSavedRef.current = true

    // Handoff humano: dispara e-mails para o time e para o lead
    if (data?.handoff) {
      try { await notifyLead(payload) } catch {}
      try {
        const { notifyTeam } = await import('@/lib/notify')
        await notifyTeam('maia_lead', {
          name: payload.name,
          whatsapp: payload.whatsapp,
          email: payload.email,
          city: (data as any)?.city,
          summary: payload.message,
          interest: payload.objective || 'Não identificado',
          temperature: (data as any)?.temperature,
          duration: (data as any)?.duration,
        })
      } catch {}
    }

    // Link chat_logs to this lead
    if (leadId && q.session_id) {
      try {
        await (supabase.from('chat_logs') as any)
          .update({ lead_id: leadId, lead_captured: true })
          .eq('session_id', q.session_id)
      } catch {}
    }
  }

  async function saveHistory(msgs: Message[]) {
    try {
      await (supabase.from('chat_logs') as any).upsert(
        {
          session_id: qual.session_id,
          messages: msgs,
          lead_captured: qual.step === 'done',
          page_url: typeof window !== 'undefined' ? window.location.href : null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'session_id' },
      )
    } catch {}
  }

  function runFSM(text: string): { reply: string; update: Partial<QualState> } | null {
    if (qual.step === 'done') return null
    const trimmed = text.trim()

    if (qual.step === 'name') {
      const BLOCK = new Set([
        'oi','ola','olá','hey','hi','hello','sim','nao','não','tudo','bom','boa','bem',
        'opa','eai','blz','obrigado','obrigada','ok','sla','talvez','quero','saber',
      ])
      const first = trimmed.split(/\s+/)[0] || ''
      const norm = first.toLowerCase().replace(/[^\p{L}]/gu, '')
      const invalid =
        trimmed.length < 3 ||
        /^[^\p{L}]/u.test(trimmed) ||
        norm.length < 3 ||
        BLOCK.has(norm)
      if (invalid)
        return { reply: S.askName, update: {} }
      const display = first.charAt(0).toUpperCase() + first.slice(1)
      return {
        reply: S.thanks(display),
        update: { step: 'done', name: trimmed },
      }
    }


    return null
  }

  function firstNameFromQual() {
    const first = (qual.name || '').trim().split(/\s+/)[0]
    return first ? first.charAt(0).toUpperCase() + first.slice(1) : ''
  }

  function findHandoffStepFromAssistant(content?: string): number | null {
    if (!content) return null
    const clean = stripOptionsStreaming(content)
    const opts = parseOptions(content)
    const byQuestion = HANDOFF_STEPS.findIndex((step) => clean.includes(step.question))
    if (byQuestion >= 0) return byQuestion
    if (opts.length) {
      const byOptions = HANDOFF_STEPS.findIndex((step) =>
        step.options?.length === opts.length && step.options.every((option) => opts.includes(option)),
      )
      if (byOptions >= 0) return byOptions
    }
    return null
  }

  function deriveHandoffAnswersFromMessages(history: Message[]) {
    const answers: Partial<Record<HandoffField, string>> = {}
    for (let i = 0; i < history.length - 1; i += 1) {
      const assistantMsg = history[i]
      const userMsg = history[i + 1]
      if (assistantMsg.role !== 'assistant' || userMsg.role !== 'user') continue
      const stepIndex = findHandoffStepFromAssistant(assistantMsg.content)
      if (stepIndex === null) continue
      const step = HANDOFF_STEPS[stepIndex]
      const value = userMsg.content.trim()
      if (step.options?.length && !step.options.includes(value)) continue
      answers[step.field] = step.field === 'message' && value === 'Pular' ? '' : value
    }
    return answers
  }

  function handoffQuestion(stepIndex: number): string {
    const step = HANDOFF_STEPS[stepIndex]
    return step ? withOptions(step.question, step.options) : ''
  }

  function startHandoff(newMessages: Message[]) {
    const name = firstNameFromQual()
    const prefix = name ? `Claro, ${name},` : 'Claro,'
    const reply = `${prefix} vou ajudar a marcar. Antes preciso de fazer algumas perguntas rápidas para que o fundador chegue já com contexto do seu caso. ${handoffQuestion(0)}`
    const final = [...newMessages, { role: 'assistant' as const, content: reply }]
    setHandoff({ active: true, step: 0, answers: {} })
    setMessages(final)
    speak(reply)
    saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
  }

  async function continueHandoff(text: string, newMessages: Message[], inferredStep?: number | null) {
    const stepIndex = inferredStep ?? handoff.step
    const current = HANDOFF_STEPS[stepIndex]
    if (!current) return false

    const value = text.trim()
    if (current.options?.length && !current.options.includes(value)) {
      const reply = `Escolha uma das opções abaixo para eu seguir corretamente.\n${handoffQuestion(stepIndex)}`
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff((prev) => ({ ...prev, active: true, step: stepIndex }))
      setMessages(final)
      await saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
      return true
    }

    if (current.field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      const reply = `Esse e-mail não parece válido. Pode escrever novamente?\n${current.question}`
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff((prev) => ({ ...prev, active: true, step: stepIndex }))
      setMessages(final)
      await saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
      return true
    }

    if (current.field === 'whatsapp' && value.replace(/\D/g, '').length < 8) {
      const reply = 'Número incompleto. Pode enviar-me o WhatsApp com indicativo do país?'
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff((prev) => ({ ...prev, active: true, step: stepIndex }))
      setMessages(final)
      await saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
      return true
    }

    const storedValue =
      current.field === 'whatsapp'
        ? `${selectedDDI.code} ${value}`.trim()
        : current.field === 'message' && value === 'Pular'
          ? ''
          : value

    const nextAnswers = {
      ...deriveHandoffAnswersFromMessages(messages),
      ...handoff.answers,
      [current.field]: storedValue,
    }

    if (current.field === 'email') setQual((q) => ({ ...q, email: value }))
    if (current.field === 'whatsapp') setQual((q) => ({ ...q, whatsapp: value, ddi: selectedDDI.code }))

    const nextStep = stepIndex + 1
    if (nextStep < HANDOFF_STEPS.length) {
      const reply = handoffQuestion(nextStep)
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff({ active: true, step: nextStep, answers: nextAnswers })
      setMessages(final)
      speak(reply)
      await saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
      return true
    }

    const name = firstNameFromQual()
    const reply = `Muito obrigado, ${name || 'tudo certo'}! Em breve 1 fundador entrará em contacto para atendê-lo e avaliar o seu caso. Fique de olho no seu e-mail e WhatsApp.`
    const final = [...newMessages, { role: 'assistant' as const, content: reply }]
    const qForSave: QualState = {
      ...qual,
      email: nextAnswers.email || qual.email,
      whatsapp: nextAnswers.whatsapp || qual.whatsapp,
      step: 'done',
    }
    setHandoff({ active: false, step: 0, answers: {} })
    setQual(qForSave)
    setMessages(final)
    speak(reply)
    try {
      await saveLead({ ...nextAnswers, name: qual.name, ddi: selectedDDI.code, handoff: true }, qForSave)
    } catch (e) {
      console.error('[MAIA] saveLead failed', e)
    }
    await saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
    return true
  }

  async function send(overrideText?: string) {
    const text = (overrideText ?? input).trim()
    if (!text || loading) return
    setInput('')
    setPhoneError('')

    const userMsg: Message = { role: 'user', content: text }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)

    const lastAssistant = [...messages].reverse().find((msg) => msg.role === 'assistant')
    const inferredHandoffStep = findHandoffStepFromAssistant(lastAssistant?.content)

    if (handoff.active || inferredHandoffStep !== null) {
      const handled = await continueHandoff(text, newMessages, inferredHandoffStep)
      if (handled) return
    }

    if (HANDOFF_TRIGGER_RE.test(text)) {
      if (!isValidLeadName(qual.name)) {
        const final = [...newMessages, { role: 'assistant' as const, content: S.askName }]
        setMessages(final)
        await saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
        return
      }
      startHandoff(newMessages)
      return
    }

    const fsm = runFSM(text)
    if (fsm) {
      const newQual = { ...qual, ...fsm.update } as QualState
      setQual(newQual)
      if (fsm.update.step === 'done') await saveLead({}, newQual)
      const botMsg: Message = { role: 'assistant', content: fsm.reply }
      const final = [...newMessages, botMsg]
      setMessages(final)
      speak(fsm.reply)
      await saveHistory(final)
      return
    }

    setLoading(true)
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/moovia-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${SUPABASE_KEY}`,
          apikey: SUPABASE_KEY,
        },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          language: mLang,
          name: qual.name,
        }),
      })

      if (!response.ok || !response.body) {
        const detail = await response.text().catch(() => '')
        throw new Error(`HTTP ${response.status}: ${detail}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let full = ''
      let buffer = ''

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const raw of lines) {
          const line = raw.trim()
          if (!line.startsWith('data:')) continue
          const data = line.slice(5).trim()
          if (!data || data === '[DONE]') continue
          try {
            const parsed = JSON.parse(data)
            const delta =
              parsed?.choices?.[0]?.delta?.content || ''
            if (delta) {
              full += delta
              const display = extractLead(full).clean
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: 'assistant', content: display },
              ])
            }
          } catch {}
        }
      }

      const { clean, data: captured } = extractLead(full)
      if (captured) {
        try { await saveLead(captured) } catch (e) { console.error('[MAIA] saveLead failed', e) }
      }

      const finalMsg: Message = { role: 'assistant', content: clean || full }
      const finalMsgs = [...newMessages, finalMsg]
      setMessages(finalMsgs)
      speak((clean || full).slice(0, 200))
      try { await saveHistory(finalMsgs) } catch (e) { console.error('[MAIA] saveHistory failed', e) }
    } catch (err) {
      console.error('[MAIA] chat error', err)
      const fallback = String(err).includes('429') || String(err).toLowerCase().includes('rate limit')
        ? 'Estou com alta demanda agora. Pode tentar novamente em alguns minutos?'
        : 'Tive uma instabilidade. Pode repetir?'
      setMessages((prev) => {
        const last = prev[prev.length - 1]
        // Keep partial streamed content instead of overwriting with error
        if (last?.role === 'assistant' && last.content.trim().length > 0) return prev
        const base = last?.role === 'assistant' && last.content === '' ? prev.slice(0, -1) : prev
        return [...base, { role: 'assistant', content: fallback }]
      })
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const currentHandoffField = handoff.active ? HANDOFF_STEPS[handoff.step]?.field : (() => {
    const last = [...messages].reverse().find((m) => m.role === 'assistant')
    const idx = findHandoffStepFromAssistant(last?.content)
    return idx !== null && idx !== undefined ? HANDOFF_STEPS[idx]?.field : undefined
  })()
  const isPhoneStep = qual.step === 'whatsapp' || currentHandoffField === 'whatsapp'

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-label={S.ariaOpen}
        className="fixed bottom-6 left-4 sm:bottom-8 sm:left-auto sm:right-8 z-[1200] w-14 h-14 rounded-full flex items-center justify-center transition-all overflow-hidden"
        style={{
          background: '#111d36',
          border: open ? '1px solid #ad8957' : '1px solid rgba(173,137,87,.3)',
          boxShadow: '0 8px 32px rgba(0,0,0,.4)',
        }}
      >
        <img src={maiaLogo.url} alt="MAIA" className="w-full h-full object-cover" />
        {!open && qual.step === 'name' && (
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-red-500" />
        )}
      </button>

      {!open && showInvite && (
        <button
          onClick={() => setOpen(true)}
          className="fixed z-[1200] bottom-[96px] left-4 sm:bottom-8 sm:left-auto sm:right-[84px]"
          style={{
            background: '#12141a',
            border: '1px solid rgba(173,137,87,.3)',
            color: '#f9f5ec',
            fontFamily: 'Urbanist, sans-serif',
            fontSize: 13,
            padding: '10px 14px',
            boxShadow: '0 8px 24px rgba(0,0,0,.4)',
            cursor: 'pointer',
            maxWidth: 240,
            textAlign: 'left',
            animation: 'moovia-invite-in .35s ease-out',
          }}
        >
          <span style={{ color: '#ad8957', fontFamily: 'Sora, sans-serif', fontSize: 10, letterSpacing: '.14em', display: 'block', marginBottom: 2 }}>
            MAIA
          </span>
          {invite}
        </button>
      )}

      {open && (
        <div
          className="fixed z-[1200] flex flex-col bottom-[88px] left-3 right-3 sm:left-auto sm:right-8 sm:bottom-28"
          style={{
            width: 'auto',
            maxWidth: '340px',
            marginLeft: 'auto',
            height: 'min(560px, calc(100dvh - 120px))',
            background: '#12141a',
            border: '1px solid rgba(173,137,87,.2)',
            boxShadow: '0 24px 64px rgba(0,0,0,.6)',
          }}
        >
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(173,137,87,.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <img src={maiaLogo.url} alt="MAIA" width={32} height={32} style={{ objectFit: 'contain' }} />
              </div>
              <div>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, color: '#f9f5ec', margin: 0 }}>
                  MAIA
                </p>
                <p
                  style={{
                    fontFamily: 'Urbanist, sans-serif',
                    fontSize: 10,
                    color: 'rgba(249,245,236,.35)',
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    margin: 0,
                  }}
                >
                  Moovia AI Agent
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Fechar"
              style={{
                background: 'rgba(173,137,87,.12)',
                border: '1px solid rgba(173,137,87,.35)',
                color: '#f9f5ec',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                lineHeight: 1,
                cursor: 'pointer',
                borderRadius: 4,
              }}
            >
              ×
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                <div
                  style={{
                    maxWidth: '82%',
                    padding: '10px 14px',
                    background: msg.role === 'user' ? 'rgba(173,137,87,.15)' : '#1a1d26',
                    borderLeft: msg.role === 'assistant' ? '2px solid #ad8957' : 'none',
                    fontFamily: 'Urbanist, sans-serif',
                    fontSize: 14,
                    fontWeight: 300,
                    color: msg.role === 'user' ? '#f9f5ec' : 'rgba(249,245,236,.85)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.role === 'assistant' ? renderAssistant(msg.content) : msg.content}
                </div>
              </div>
            ))}
            {(() => {
              const last = messages[messages.length - 1]
              if (!last || last.role !== 'assistant' || loading) return null
              const opts = parseOptions(last.content)
              if (!opts.length) return null
              return (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginLeft: 12 }}>
                  {opts.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => send(o)}
                      style={{
                        background: 'transparent',
                        border: '1px solid rgba(173,137,87,.45)',
                        color: '#f9f5ec',
                        padding: '7px 12px',
                        fontFamily: 'Urbanist, sans-serif',
                        fontSize: 12,
                        fontWeight: 400,
                        letterSpacing: '.02em',
                        cursor: 'pointer',
                        borderRadius: 2,
                        transition: 'all .2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(173,137,87,.15)'
                        e.currentTarget.style.borderColor = '#ad8957'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.borderColor = 'rgba(173,137,87,.45)'
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              )
            })()}
            {loading && (
              <div style={{ display: 'flex', gap: 4, padding: '10px 14px' }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: '#ad8957',
                      opacity: 0.6,
                      animation: `moovia-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}
            <div ref={messagesEnd} />
          </div>

          <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(173,137,87,.12)' }}>
            {phoneError && (
              <p
                style={{
                  fontFamily: 'Urbanist, sans-serif',
                  fontSize: 11,
                  color: '#ad8957',
                  marginBottom: 6,
                  letterSpacing: '.06em',
                }}
              >
                ⚠ {phoneError}
              </p>
            )}

            {isPhoneStep && (
              <div style={{ display: 'flex', gap: 8, marginBottom: 8, position: 'relative' }}>
                <button
                  type="button"
                  onClick={() => setShowDDI(!showDDI)}
                  style={{
                    background: '#0e0f12',
                    border: '1px solid rgba(173,137,87,.2)',
                    color: '#f9f5ec',
                    padding: '8px 12px',
                    fontFamily: 'Urbanist, sans-serif',
                    fontSize: 13,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    minWidth: 90,
                  }}
                >
                  {selectedDDI.flag} {selectedDDI.code}
                </button>
                {showDDI && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '100%',
                      left: 0,
                      background: '#12141a',
                      border: '1px solid rgba(173,137,87,.2)',
                      zIndex: 10,
                      minWidth: 200,
                    }}
                  >
                    {DDI_LIST.map((ddi) => (
                      <button
                        type="button"
                        key={ddi.code}
                        onClick={() => {
                          setSelectedDDI(ddi)
                          setQual((q) => ({ ...q, ddi: ddi.code }))
                          setShowDDI(false)
                          setInput('')
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          width: '100%',
                          padding: '10px 14px',
                          background: 'transparent',
                          border: 'none',
                          color: '#f9f5ec',
                          fontFamily: 'Urbanist, sans-serif',
                          fontSize: 13,
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {ddi.flag} {ddi.label} {ddi.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: 8, flex: '1 1 100%', minWidth: 0 }}>
                <input
                  ref={inputRef}
                  type={qual.step === 'email' ? 'email' : qual.step === 'whatsapp' ? 'tel' : 'text'}
                  inputMode={qual.step === 'whatsapp' ? 'numeric' : qual.step === 'email' ? 'email' : 'text'}
                  autoComplete={qual.step === 'email' ? 'email' : qual.step === 'whatsapp' ? 'tel' : qual.step === 'name' ? 'name' : 'off'}
                  value={input}
                  onChange={(e) =>
                    isPhoneStep ? handlePhoneInput(e.target.value) : setInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      send()
                    }
                  }}
                  placeholder={
                    isPhoneStep
                      ? `Ex: ${selectedDDI.mask.replace(/9/g, '0')}`
                      : 'Digite sua mensagem...'
                  }
                  disabled={loading}
                  style={{
                    flex: 1,
                    minWidth: 0,
                    minHeight: 44,
                    background: '#0e0f12',
                    border: `1px solid ${phoneError ? '#ad8957' : 'rgba(173,137,87,.2)'}`,
                    color: '#f9f5ec',
                    fontFamily: 'Urbanist, sans-serif',
                    fontSize: 16,
                    padding: '10px 14px',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  onClick={isListening ? stopListening : startListening}
                  disabled={loading}
                  title={isListening ? 'Parar gravação' : 'Gravar áudio'}
                  aria-label={isListening ? 'Parar gravação' : 'Gravar áudio'}
                  style={{
                    background: isListening ? 'rgba(220,38,38,.18)' : 'rgba(173,137,87,.08)',
                    border: `1px solid ${isListening ? '#dc2626' : 'rgba(173,137,87,.2)'}`,
                    color: isListening ? '#dc2626' : '#ad8957',
                    width: 56,
                    minHeight: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    cursor: 'pointer',
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '.08em',
                    animation: isListening ? 'moovia-pulse 1s infinite' : 'none',
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: isListening ? '#dc2626' : '#ad8957',
                      display: 'inline-block',
                    }}
                  />
                  REC
                </button>
              </div>
              <button
                type="button"
                onClick={() => send()}
                disabled={loading || !input.trim() || !!phoneError}
                aria-label="Enviar"
                className="moovia-send-btn"
                style={{
                  background: input.trim() && !phoneError ? '#ad8957' : 'rgba(173,137,87,.15)',
                  border: 'none',
                  color: '#0e0f12',
                  minHeight: 44,
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  fontFamily: 'Sora, sans-serif',
                  textTransform: 'uppercase',
                }}
              >
                Enviar →
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes moovia-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }
        @keyframes moovia-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        @keyframes moovia-invite-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .moovia-send-btn { flex: 1 1 100%; width: 100%; }
        @media (min-width: 640px) {
          .moovia-send-btn { flex: 0 0 auto; width: auto; padding: 0 18px; }
        }
      `}</style>
    </>
  )
}
