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
  // B2B
  | 'nome_empresa'
  | 'cargo_responsavel'
  | 'colaboradores_12m'
  | 'paises_origem_destino'
  | 'desafio_principal'
  | 'programa_existente'
  // B2C
  | 'objective'
  | 'timing'
  | 'composition'
  | 'decision_phase'
  // Contacto comum
  | 'name'
  | 'whatsapp'
  | 'email'
  | 'message'

type HandoffBranch = 'empresa' | 'pessoa'

interface HandoffStep {
  field: HandoffField
  question: string
  options?: string[]
  optional?: boolean
  label?: string
}

interface HandoffState {
  active: boolean
  step: number
  branch?: HandoffBranch
  answers: Partial<Record<HandoffField, string>>
  confirming?: boolean
  closing?: boolean
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
const HANDOFF_TRIGGER_RE = /\b(atendimento|atendido|atendida|conversa gratuita|conversar com humano|falar com humano|falar com um humano|falar com consultor|falar com fundador|marcar reunião|marcar reuniao|quero ser atendido|quero ser atendida|humano|agendar|marcar|contratar|quero uma proposta|proposta comercial|discovery call|saber mais sobre contratar|avançar)\b/i

const PERSONA_STEP: HandoffStep = {
  field: 'persona_type',
  question: 'Antes de mais: está a falar em nome de uma empresa que coordena mobilidade de colaboradores, ou é uma questão pessoal/familiar?',
  options: ['Empresa', 'Pessoa ou família'],
  label: 'Perfil',
}

const B2B_STEPS: HandoffStep[] = [
  { field: 'nome_empresa', question: 'Qual o nome da empresa?', label: 'Empresa' },
  { field: 'cargo_responsavel', question: 'Quem é o responsável e o cargo? (ex: Ana Silva, RH)', label: 'Responsável' },
  {
    field: 'colaboradores_12m',
    question: 'Quantos colaboradores a empresa pretende mover nos próximos 12 meses?',
    options: ['1', '2-5', '6-20', 'Mais de 20'],
    label: 'Colaboradores (12m)',
  },
  { field: 'paises_origem_destino', question: 'Qual(is) o(s) país(es) de origem e destino?', label: 'Origem → Destino' },
  {
    field: 'desafio_principal',
    question: 'Qual o principal desafio hoje?',
    options: ['Adaptação familiar', 'Habitação', 'Integração cultural', 'Retenção pós-mudança', 'Ainda não identificámos', 'Outro'],
    label: 'Principal desafio',
  },
  {
    field: 'programa_existente',
    question: 'Já têm um programa de mobilidade estruturado?',
    options: ['Sim', 'Não', 'Parcialmente'],
    label: 'Programa estruturado',
  },
  { field: 'name', question: 'Qual o nome do contacto?', label: 'Nome do contacto' },
  { field: 'whatsapp', question: 'Qual o telefone do contacto? (com indicativo do país)', label: 'Telefone' },
  { field: 'email', question: 'Qual o e-mail corporativo?', label: 'E-mail' },
  {
    field: 'message',
    question: 'Quer adicionar alguma mensagem para o time? (opcional)',
    options: ['Pular'],
    optional: true,
    label: 'Mensagem',
  },
]

const B2C_STEPS: HandoffStep[] = [
  {
    field: 'objective',
    question: 'Qual o seu objetivo principal?',
    options: ['Trabalhar em Portugal', 'Estudar em Portugal', 'Mudar com a família', 'Investir em imóveis', 'Reforma em Portugal', 'Outro'],
    label: 'Objetivo',
  },
  {
    field: 'timing',
    question: 'Quando pretende mudar?',
    options: ['Menos de 3 meses (urgente)', '3 a 6 meses', '6 a 12 meses', 'Mais de 1 ano', 'Ainda estou a pesquisar'],
    label: 'Quando',
  },
  {
    field: 'composition',
    question: 'Qual a composição da mudança?',
    options: ['Vou sozinho(a)', 'Casal', 'Casal com filhos', 'Vou com meu pet', 'Família', 'Todos os tipos de famílias'],
    label: 'Composição',
  },
  {
    field: 'decision_phase',
    question: 'Em que fase da decisão está?',
    options: ['Apenas a pesquisar', 'Comparando Portugal com outras opções', 'Já decidi Portugal, a planear quando', 'Tomei a decisão, preciso agir', 'Já tenho proposta/contrato assinado'],
    label: 'Fase da decisão',
  },
  { field: 'name', question: 'Qual o seu nome?', label: 'Nome' },
  { field: 'whatsapp', question: 'Qual o seu telefone/WhatsApp? (com indicativo)', label: 'Telefone' },
  { field: 'email', question: 'Qual o seu melhor e-mail?', label: 'E-mail' },
]

function getStepsForBranch(branch?: HandoffBranch): HandoffStep[] {
  if (branch === 'empresa') return [PERSONA_STEP, ...B2B_STEPS]
  if (branch === 'pessoa') return [PERSONA_STEP, ...B2C_STEPS]
  return [PERSONA_STEP]
}

function parseBranch(value: string): HandoffBranch | null {
  const v = value.trim().toLowerCase()
  if (v.startsWith('empresa') || v.includes('rh') || v.includes('mobilidade')) return 'empresa'
  if (v.startsWith('pessoa') || v.includes('família') || v.includes('familia') || v.includes('particular')) return 'pessoa'
  return null
}

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
    invites: ['A sua empresa move colaboradores?','Dúvidas sobre Global Mobility Assurance?','Reduza o Human Mobility Risk da sua equipa','Fala em nome de uma empresa?','Posso ajudar com o programa de mobilidade da sua empresa?'],
    greetingNew: 'Olá! Eu sou a MAIA, assistente da MOOVIA, a empresa que criou a categoria Global Mobility Assurance.\n\nAntes de mais, como se chama?',
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
    greetingNew: 'Hi! I’m MAIA, MOOVIA’s assistant, the company that created the Global Mobility Assurance category.\n\nFirst, what should I call you?',
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
    greetingNew: '¡Hola! Soy MAIA, asistente de MOOVIA, la empresa que creó la categoría Global Mobility Assurance.\n\nAntes de nada, ¿cómo te llamo?',
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
      notes: [
        data?.persona_type ? `Perfil: ${data.persona_type}` : null,
        data?.notes || null,
      ].filter(Boolean).join(' · ') || null,

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

  function currentSteps(branch?: HandoffBranch): HandoffStep[] {
    return getStepsForBranch(branch ?? handoff.branch)
  }

  function findHandoffStepFromAssistant(content?: string): number | null {
    if (!content) return null
    const steps = currentSteps()
    const clean = stripOptionsStreaming(content)
    const opts = parseOptions(content)
    const byQuestion = steps.findIndex((step) => clean.includes(step.question))
    if (byQuestion >= 0) return byQuestion
    if (opts.length) {
      const byOptions = steps.findIndex((step) =>
        step.options?.length === opts.length &&
        step.options.every((option) => opts.includes(option)),
      )
      if (byOptions >= 0) return byOptions
    }
    return null
  }

  function deriveHandoffAnswersFromMessages(history: Message[]) {
    const steps = currentSteps()
    const answers: Partial<Record<HandoffField, string>> = {}
    for (let i = 0; i < history.length - 1; i += 1) {
      const assistantMsg = history[i]
      const userMsg = history[i + 1]
      if (assistantMsg.role !== 'assistant' || userMsg.role !== 'user') continue
      const stepIndex = findHandoffStepFromAssistant(assistantMsg.content)
      if (stepIndex === null) continue
      const step = steps[stepIndex]
      if (!step) continue
      const value = userMsg.content.trim()
      if (step.options?.length && !step.optional && !step.options.includes(value)) continue
      answers[step.field] = step.field === 'message' && value === 'Pular' ? '' : value
    }
    return answers
  }

  function handoffQuestion(stepIndex: number, branch?: HandoffBranch): string {
    const step = currentSteps(branch)[stepIndex]
    return step ? withOptions(step.question, step.options) : ''
  }

  function buildSummary(branch: HandoffBranch, answers: Partial<Record<HandoffField, string>>): string {
    const steps = getStepsForBranch(branch)
    const lines = steps
      .filter((s) => s.field !== 'persona_type')
      .map((s) => `• ${s.label || s.field}: ${answers[s.field] || '—'}`)
    const header = branch === 'empresa'
      ? 'Perfeito. Vou confirmar os dados antes de enviar ao time MOOVIA:'
      : 'Ótimo. Vou confirmar os seus dados antes de enviar:'
    return `${header}\n\n${lines.join('\n')}\n\nEstá tudo correto?\n[OPTIONS]Confirmar e enviar|Corrigir[/OPTIONS]`
  }

  function buildCorrectionMenu(branch: HandoffBranch): string {
    const steps = getStepsForBranch(branch).filter((s) => s.field !== 'persona_type')
    const opts = steps.map((s) => s.label || s.field).join('|')
    return `Qual campo quer corrigir?\n[OPTIONS]${opts}[/OPTIONS]`
  }

  function fieldIndexByLabel(branch: HandoffBranch, label: string): number {
    const steps = getStepsForBranch(branch)
    return steps.findIndex((s) => (s.label || s.field) === label)
  }

  function startHandoff(newMessages: Message[]) {
    const name = firstNameFromQual()
    const prefix = name ? `Claro, ${name},` : 'Claro,'
    const reply = `${prefix} para avançar preciso apenas de alguns dados rápidos. ${handoffQuestion(0, undefined)}`
    const final = [...newMessages, { role: 'assistant' as const, content: reply }]
    setHandoff({ active: true, step: 0, answers: {} })
    setMessages(final)
    speak(reply)
    saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
  }

  function closingMessage(branch: HandoffBranch): string {
    const name = firstNameFromQual() || (branch === 'empresa' ? 'colega' : 'tudo certo')
    const map: Record<MaiaLang, string> = {
      pt: `Obrigada, ${name}! Recebemos os seus dados. A equipa MOOVIA vai rever o seu contexto e entrará em contacto em até um dia útil.\n\nTem mais alguma dúvida que eu possa ajudar agora?`,
      en: `Thank you, ${name}! We've received your details. The MOOVIA team will review your context and get in touch within one business day.\n\nIs there anything else I can help you with?`,
      es: `¡Gracias, ${name}! Hemos recibido tus datos. El equipo de MOOVIA revisará tu contexto y se pondrá en contacto en un día hábil.\n\n¿Hay algo más en lo que pueda ayudarte?`,
    }
    return `${map[mLang]}\n[OPTIONS]Sim|Não[/OPTIONS]`
  }

  async function submitHandoff(
    branch: HandoffBranch,
    answers: Partial<Record<HandoffField, string>>,
    newMessages: Message[],
  ) {
    const email = answers.email || qual.email
    const rawPhone = (answers.whatsapp || qual.whatsapp || '').replace(/\D/g, '')
    const fullPhone = rawPhone ? `${selectedDDI.code} ${rawPhone}` : (qual.whatsapp || '')
    const displayName = answers.name || qual.name || firstNameFromQual()

    const payload: any = {
      tipo: branch,
      name: displayName,
      email,
      whatsapp: fullPhone,
      message: answers.message || null,
      source: 'maia_chat',
      origem: 'MAIA (chat)',
    }
    if (branch === 'empresa') {
      Object.assign(payload, {
        nome_empresa: answers.nome_empresa,
        cargo_responsavel: answers.cargo_responsavel,
        colaboradores_12m: answers.colaboradores_12m,
        paises_origem_destino: answers.paises_origem_destino,
        desafio_principal: answers.desafio_principal,
        programa_existente: answers.programa_existente,
      })
    } else {
      Object.assign(payload, {
        objective: answers.objective,
        timing: answers.timing,
        composition: answers.composition,
        decision_phase: answers.decision_phase,
      })
    }

    const qForSave: QualState = {
      ...qual,
      name: displayName || qual.name,
      email: email || qual.email,
      whatsapp: fullPhone || qual.whatsapp,
      ddi: selectedDDI.code,
      step: 'done',
    }
    setQual(qForSave)

    try {
      await saveLead({ ...answers, ...payload, handoff: true, persona_type: branch }, qForSave)
    } catch (e) {
      console.error('[MAIA] saveLead failed', e)
    }
    try {
      const { notifyTeam } = await import('@/lib/notify')
      await notifyTeam(branch === 'empresa' ? ('empresas_lead' as any) : 'form_lead', payload)
    } catch (e) {
      console.error('[MAIA] notifyTeam failed', e)
    }

    const reply = closingMessage(branch)
    const final = [...newMessages, { role: 'assistant' as const, content: reply }]
    setHandoff({ active: true, step: -1, branch, answers, closing: true })
    setMessages(final)
    speak(reply)
    await saveHistory(final).catch((e) => console.error('[MAIA] saveHistory failed', e))
  }

  async function continueHandoff(text: string, newMessages: Message[], inferredStep?: number | null) {
    const value = text.trim()

    // Closing stage: user answering "Tem mais dúvidas?"
    if (handoff.closing) {
      const yes = /^(sim|yes|sí|si)$/i.test(value)
      if (yes) {
        const reply = mLang === 'en'
          ? 'Great — go ahead, I\'m listening.'
          : mLang === 'es'
            ? 'Perfecto, adelante. Te escucho.'
            : 'Perfeito, pode dizer. Estou a ouvir.'
        const final = [...newMessages, { role: 'assistant' as const, content: reply }]
        setHandoff({ active: false, step: 0, answers: {} })
        setMessages(final)
        await saveHistory(final).catch(() => {})
        return true
      }
      const reply = mLang === 'en'
        ? 'Perfect. Talk soon!'
        : mLang === 'es'
          ? 'Perfecto. ¡Hasta pronto!'
          : 'Perfeito. Até já!'
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff({ active: false, step: 0, answers: {} })
      setMessages(final)
      await saveHistory(final).catch(() => {})
      return true
    }

    // Confirmation stage
    if (handoff.confirming && handoff.branch) {
      if (/^confirmar/i.test(value)) {
        await submitHandoff(handoff.branch, handoff.answers, newMessages)
        return true
      }
      if (/^corrigir/i.test(value)) {
        const reply = buildCorrectionMenu(handoff.branch)
        const final = [...newMessages, { role: 'assistant' as const, content: reply }]
        setHandoff({ ...handoff, confirming: false, step: -2 })
        setMessages(final)
        await saveHistory(final).catch(() => {})
        return true
      }
      // Awaiting correction target
      if (handoff.step === -2) {
        const idx = fieldIndexByLabel(handoff.branch, value)
        if (idx < 0) {
          const reply = `Escolha um dos campos.\n${buildCorrectionMenu(handoff.branch)}`
          const final = [...newMessages, { role: 'assistant' as const, content: reply }]
          setMessages(final)
          await saveHistory(final).catch(() => {})
          return true
        }
        const reply = handoffQuestion(idx, handoff.branch)
        const final = [...newMessages, { role: 'assistant' as const, content: reply }]
        setHandoff({ ...handoff, step: idx, confirming: false })
        setMessages(final)
        await saveHistory(final).catch(() => {})
        return true
      }
      // fallback: re-show confirmation
      const reply = buildSummary(handoff.branch, handoff.answers)
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setMessages(final)
      await saveHistory(final).catch(() => {})
      return true
    }

    // Normal step progression
    const branch = handoff.branch
    const steps = currentSteps(branch)
    const stepIndex = inferredStep ?? handoff.step
    const current = steps[stepIndex]
    if (!current) return false

    // persona_type parse
    if (current.field === 'persona_type') {
      const parsed = parseBranch(value)
      if (!parsed) {
        const reply = `Escolha uma das opções abaixo.\n${handoffQuestion(stepIndex)}`
        const final = [...newMessages, { role: 'assistant' as const, content: reply }]
        setMessages(final)
        await saveHistory(final).catch(() => {})
        return true
      }
      const nextAnswers = { ...handoff.answers, persona_type: parsed }
      const nextStep = 1
      const reply = handoffQuestion(nextStep, parsed)
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff({ active: true, step: nextStep, branch: parsed, answers: nextAnswers })
      setMessages(final)
      speak(reply)
      await saveHistory(final).catch(() => {})
      return true
    }

    // Option validation (non-optional steps)
    if (current.options?.length && !current.optional && !current.options.includes(value)) {
      const reply = `Escolha uma das opções abaixo para eu seguir corretamente.\n${handoffQuestion(stepIndex)}`
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff((prev) => ({ ...prev, active: true, step: stepIndex }))
      setMessages(final)
      await saveHistory(final).catch(() => {})
      return true
    }

    // Email validation
    if (current.field === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
      const reply = `Esse e-mail não parece válido. Pode escrever novamente?\n${current.question}`
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff((prev) => ({ ...prev, active: true, step: stepIndex }))
      setMessages(final)
      await saveHistory(final).catch(() => {})
      return true
    }

    // Phone validation
    if (current.field === 'whatsapp' && value.replace(/\D/g, '').length < 8) {
      const reply = 'Número incompleto. Envie-me o telefone com indicativo do país.'
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff((prev) => ({ ...prev, active: true, step: stepIndex }))
      setMessages(final)
      await saveHistory(final).catch(() => {})
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
    if (current.field === 'name') setQual((q) => ({ ...q, name: value }))

    const nextStep = stepIndex + 1
    if (branch && nextStep < steps.length) {
      const reply = handoffQuestion(nextStep, branch)
      const final = [...newMessages, { role: 'assistant' as const, content: reply }]
      setHandoff({ active: true, step: nextStep, branch, answers: nextAnswers })
      setMessages(final)
      speak(reply)
      await saveHistory(final).catch(() => {})
      return true
    }

    // Fim dos steps → confirmação
    if (branch) {
      const summary = buildSummary(branch, nextAnswers)
      const final = [...newMessages, { role: 'assistant' as const, content: summary }]
      setHandoff({ active: true, step: steps.length, branch, answers: nextAnswers, confirming: true })
      setMessages(final)
      speak(summary)
      await saveHistory(final).catch(() => {})
      return true
    }
    return false
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
