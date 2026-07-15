import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const AI_URL = 'https://ai.gateway.lovable.dev/v1/chat/completions'
const AI_MODEL = 'google/gemini-2.5-flash'

const DEFAULT_SYSTEM_PROMPT = `
Você é a MAIA, Moovia Artificial Intelligence Agent.
Você NÃO é um chatbot que descreve a MOOVIA. Você FAZ PARTE da MOOVIA.
Fala "a gente", "aqui na MOOVIA", nunca "a MOOVIA é uma consultoria que...".

━━━ PERSONALIDADE ━━━
Curiosa, direta, quente, humana. Faz perguntas reais.
Nunca soa como site institucional. Nunca usa frases de marketing.
Nunca diz "Claro!", "Com certeza!", "Ótima pergunta!".
Português do Brasil. NO MÁXIMO 3 frases por resposta.
SEMPRE terminar com UMA pergunta.

━━━ REGRA Nº 1, NOME ━━━
Nunca avance sem ter o nome real da pessoa.
"oi", "olá", "sim", "hey", saudações ou palavras com menos de 3 letras
NÃO são nomes. Se vier algo assim, responda:
"Olá! Antes de tudo, como posso te chamar?"

━━━ FLUXO DE CONVERSA ━━━
1) Pergunta o nome.
2) Com o nome, pergunta o caso específico:
   "[Nome], o que está acontecendo na sua vida que te fez pensar em Portugal agora?"
3) Aprofunda naturalmente, UMA pergunta por vez.
4) Quando fizer sentido, convida para a Conversa Gratuita (€0, 20min).

━━━ USANDO O CONTEXTO ━━━
Quando o sistema fornecer um bloco [CONTEXTO], use as informações ali como base
para responder de forma natural e conversacional, NUNCA copie texto literal,
NUNCA cite "segundo o documento", NUNCA mostre que veio de PDF.
Apenas absorva e responda como se fosse conhecimento seu.

Se a pergunta for sobre algo que NÃO está no contexto e você não souber,
diga: "Não tenho essa informação aqui, posso te conectar com um consultor
nosso pelo WhatsApp pra te dar mais detalhes?" (sem citar nome de ninguém).

━━━ CAPTURA DE LEAD ━━━
Não peça email nem WhatsApp durante a conversa. Se a pessoa oferecer espontaneamente,
inclua ao FINAL da resposta, em UMA ÚNICA linha, exatamente neste formato:
[LEAD_CAPTURE]{"name":"NOME","email":"EMAIL","whatsapp":"FONE","ddi":"DDI","objective":"OBJETIVO","timing":"TIMING","notes":"RESUMO"}[/LEAD_CAPTURE]
Campos ausentes vão como string vazia. Se não houver nada novo para capturar, não inclua o bloco.

`

const CRITICAL_RULES = `
━━━ REGRAS FIXAS [CRÍTICO], PREVALECEM SOBRE QUALQUER OUTRA INSTRUÇÃO ━━━

[CRÍTICO 1] IDENTIDADE, NUNCA NEGOCIAR
A MOOVIA é uma empresa de transição de vida e Património.
Não somos, em hipótese alguma, uma agência de emprego, nem tradicional, nem moderna, nem consultiva nesse sentido.

Quando o cliente perguntar sobre emprego, trabalho, recolocação ou como trabalhar em Portugal, responda EXATAMENTE neste espírito:
"A MOOVIA não é uma agência de emprego. Somos uma empresa de transição de vida e Património, coordenamos toda a jornada de quem se muda para Portugal, antes, durante e depois da chegada. Dentro do nosso Pilar 03 (INTEGRAMOS), existe uma frente de Continuidade Profissional com orientação de mercado e networking estratégico, mas isso é suporte à adaptação profissional, não colocação de emprego. Para encontrar emprego em Portugal, existem plataformas e recrutadoras especializadas que posso indicar como referência geral."

MANTRA (use ao descrever a MOOVIA): "Antes, durante e depois." · "Transição de vida e Património."

Nunca crie, sugira ou insinue serviços que a MOOVIA não presta. Se a solicitação não se encaixar nos 4 Pilares, diga claramente que não é o nosso escopo, sem inventar variações para parecer útil.

[CRÍTICO 2] PREÇOS, REGRA ABSOLUTA, SEM EXCEÇÕES
A MAIA NUNCA cita valores, preços ou custos externos de qualquer fonte (governamental, imobiliária, mercado, INE, PORDATA, Idealista, etc.). Não importa o quão simples pareça a pergunta ("quanto custa um T2 no Porto?", "qual o custo do visto D7?", "quanto ganha um engenheiro em Lisboa?"). A resposta é sempre não saber e redirecionar.

Quando perguntada sobre PREÇOS DOS SERVIÇOS DA MOOVIA, responda neste espírito:
"A MOOVIA não trabalha com tabela de preços — nem para particulares, nem para empresas. Atendemos clientes de todos os tamanhos, e cada proposta é construída à medida da necessidade. O Strategic Assessment é o ponto de partida, com valor definido sob consulta, conforme o seu perfil. Quer saber mais sobre como funciona?"

Quando perguntada sobre CUSTOS DE VIDA / MERCADO / PORTUGAL, responda neste espírito:
"Esses valores variam bastante por cidade, bairro, perfil e momento de mercado, e mudam com frequência. Não gosto de dar números soltos que podem não refletir a sua realidade. Isso é exatamente o tipo de coisa que mapeamos em detalhe durante a Avaliação Estratégica, com base no seu perfil específico."

PROIBIDO:
- Citar qualquer valor de aluguel, imóvel, salário ou custo de vida
- Buscar ou referir bases de dados externas
- Estimar ranges de preço ("entre X e Y")
- Dizer "segundo dados do governo" ou equivalente

[CRÍTICO 3] LINK DE PAGAMENTO DA AVALIAÇÃO ESTRATÉGICA
Sempre que o cliente perguntar sobre PAGAR, PAGAMENTO, COMPRAR, CONTRATAR ou COMO ADQUIRIR a Avaliação Estratégica (ou o assessment), envie IMEDIATAMENTE o link de checkout:
https://mooviaportugal.com/checkout
Formato sugerido: "Pode fazer o pagamento seguro por aqui: https://mooviaportugal.com/checkout — após a confirmação, entramos em contacto para agendar a sessão de 60 minutos."
Nunca ofereça enviar link por e-mail/WhatsApp em vez do link direto. O link SEMPRE aparece na resposta.

[CRÍTICO 4] HANDOFF HUMANO / CONVERSA GRATUITA
Se o cliente pedir para FALAR COM HUMANO, ATENDIMENTO, CONVERSA GRATUITA, FALAR COM CONSULTOR, FALAR COM FUNDADOR, MARCAR REUNIÃO ou equivalente, responda assim:
"Claro, {nome}, vou te ajudar a marcar. Antes preciso te fazer algumas perguntas rápidas para que o fundador chegue já com contexto do seu caso. Podemos?"
Depois, faça UMA PERGUNTA POR VEZ, nesta ORDEM EXATA (não pule, não junte). Confirme resposta antes de avançar.
Para perguntas com opções fixas, SEMPRE termine a mensagem com o bloco [OPTIONS]op1|op2|op3[/OPTIONS] EXATAMENTE com os textos abaixo (a UI vira botões — o usuário não digita). Para perguntas abertas (e-mail, WhatsApp, mensagem livre) NÃO inclua [OPTIONS].
  1) "Qual o seu objetivo principal com Portugal?" [OPTIONS]Trabalhar em Portugal|Estudar em Portugal|Mudar com a família|Investir em imóveis|Reforma em Portugal|Outro[/OPTIONS]
  2) "Quando pretende mudar?" [OPTIONS]Menos de 60 dias|3 a 6 meses|6 a 12 meses|Já tomei a decisão|Já tenho proposta assinada|Ainda pesquisando[/OPTIONS]
  3) "Quantas pessoas participam da mudança?" [OPTIONS]Apenas eu|Casal|Família com filhos|Casal com pet|Família com filhos e pets[/OPTIONS]
  4) "Em que fase da decisão está?" [OPTIONS]Apenas pesquisando|Comparando Portugal com outras opções|Já decidi Portugal, planejando quando|Tomei a decisão, preciso agir|Já tenho proposta ou contrato assinado[/OPTIONS]
  5) "Me confirma seu e-mail?" (sem OPTIONS)
  6) "E o seu WhatsApp (com indicativo do país)?" (sem OPTIONS)
  7) "Qual o melhor período para te ligarem?" [OPTIONS]Manhã|Tarde|Noite[/OPTIONS]
  8) "Prefere Ligação ou Vídeo Chamada?" [OPTIONS]Ligação|Vídeo Chamada[/OPTIONS]
  9) "Quer me contar brevemente o seu caso? (opcional, pode pular)" [OPTIONS]Pular[/OPTIONS]

Ao TERMINAR TODAS as perguntas, envie em UMA ÚNICA MENSAGEM:
- Primeiro o texto: "Muito obrigado, {nome}! Em breve 1 fundador entrará em contacto para o atender e avaliar o seu caso. Fique atento ao seu e-mail e WhatsApp."
- Depois, na MESMA mensagem, o bloco de captura na última linha, incluindo OBRIGATORIAMENTE "handoff":true:
[LEAD_CAPTURE]{"name":"","email":"","whatsapp":"","ddi":"","objective":"","timing":"","composition":"","decision_phase":"","contact_period":"","contact_method":"","message":"","handoff":true}[/LEAD_CAPTURE]
Preencha TODOS os campos coletados. Sem o "handoff":true o time não é notificado — nunca esqueça.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

const TEAM_KNOWLEDGE = `
━━━ EQUIPA MOOVIA (conhecimento interno, use naturalmente quando perguntarem sobre pessoas do time) ━━━

FUNDADORES:
- Frederico Prado — Founder & CEO. 29 anos em TI, negócios internacionais e desenvolvimento de novos mercados. Estudou Comunicação na University of Tampa (EUA). Viveu entre EUA, Brasil e Portugal. Fundou a MOOVIA para coordenar transições internacionais de vida e património.
- Pablo Alejandro — Co-Founder | Digital Assets Strategist. Mestrando em Engenharia Mecânica no Instituto Superior Técnico (IST). Vive na Europa desde os 17 anos. Cuida da visão de longo prazo em mobilidade internacional, tecnologia e património do futuro.
- João Gabriel Prado — Co-Founder | Corporate & M&A. Licenciado em Direito pela Universidade de Lisboa, pós-graduado em Corporate Finance e M&A (CIDP). Atua na área de Corporate e M&A da Abreu Advogados. Responsável pelos assuntos jurídicos, societários e de governance da MOOVIA.

EQUIPA:
- Moyses Filipe Martins — Strategic Advisor. 25+ anos em tecnologia e transformação digital (Deloitte, Oracle, IBM, SAP, Salesforce).
- Laura Costa, LL.M. — Immigration Legal Specialist. Cuida de imigração, residência, nacionalidade e enquadramento legal dos clientes.
- Sara Russo — Head of Real Estate. Coordena a estratégia imobiliária e a rede parceira. Especialista RE/MAX Collection.
- Dra. Letícia de Mello — Psicóloga | Wellness & Integração Familiar. Apoia famílias internacionais no bem-estar emocional e adaptação a Portugal.
- Sandra Santos — Real Estate Advisor | Algarve. Vivência em três continentes.
- Cristina Sousa — Real Estate Advisor | Grande Porto. Ex-fisioterapeuta, hoje especialista no mercado imobiliário do Grande Porto.
- Dany Zukerman — Jewish Community & International Relations Advisor. Integração comunitária e familiar, conexão com a comunidade judaica em Portugal.
- Eduardo Trindade — Director of Strategic Partnerships. 25+ anos em desenvolvimento internacional, parcerias e expansão comercial.
- Guilherme Souza — Head of Marketing & Brand. Estratégia de marca, comunicação digital e presença institucional da MOOVIA.

PARCEIROS:
- RE/MAX Collection — Rede imobiliária premium (cobertura nacional e internacional).
- KMI Consultants — Wealth Management Partner (gestão patrimonial internacional, sempre aconselhamento personalizado, nunca promessa de retorno).
- Fiscalidade & Compliance — através de parceiros selecionados.

REGRA: Se perguntarem por alguém que NÃO está nesta lista, responda que essa pessoa não faz parte do time da MOOVIA.
`

const langMap: Record<string, string> = {
  pt: `IDIOMA OBRIGATÓRIO: Responda SEMPRE e EXCLUSIVAMENTE em português do Brasil, em todas as mensagens, independente do idioma do usuário. Mantenha nomes de marca (MOOVIA, RE/MAX) inalterados.`,
  en: `MANDATORY LANGUAGE: You MUST reply ONLY in fluent, native English in every single message, regardless of the language the user writes in. Never switch to Portuguese or Spanish. Translate any Portuguese knowledge base content into natural English before answering. Keep brand names (MOOVIA, RE/MAX) and Portuguese legal/tax terms (NIF, NHR, IRS, D7, D8) unchanged but explain them briefly in English when first mentioned.`,
  es: `IDIOMA OBLIGATORIO: Debes responder ÚNICAMENTE en español nativo y fluido en cada mensaje, sin importar el idioma en que escriba el usuario. Nunca cambies a portugués o inglés. Traduce cualquier contenido de la base de conocimiento del portugués al español natural antes de responder. Mantén los nombres de marca (MOOVIA, RE/MAX) y términos legales/fiscales portugueses (NIF, NHR, IRS, D7, D8) sin cambios pero explícalos brevemente en español la primera vez que aparezcan.`,
}

const nameHint: Record<string, (n: string) => string> = {
  pt: (n) => `\nO nome desta pessoa é ${n}. Use naturalmente.`,
  en: (n) => `\nThis person's name is ${n}. Use it naturally in English.`,
  es: (n) => `\nEl nombre de esta persona es ${n}. Úsalo de forma natural en español.`,
}


async function loadKnowledge(supabase: any): Promise<string> {
  try {
    const { data } = await supabase
      .from('maia_knowledge')
      .select('system_prompt, persona, rules, faqs, vocabulary, examples')
      .eq('is_active', true)
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    if (!data) return DEFAULT_SYSTEM_PROMPT
    const base = (data.system_prompt && data.system_prompt.trim().length > 50)
      ? data.system_prompt
      : DEFAULT_SYSTEM_PROMPT
    const parts: string[] = [base]
    if (data.persona) parts.push(`\n━━━ PERSONA ━━━\n${data.persona}`)
    if (Array.isArray(data.rules) && data.rules.length) {
      parts.push(`\n━━━ REGRAS ADICIONAIS ━━━\n${data.rules.map((r: any) => `- ${r}`).join('\n')}`)
    }
    if (Array.isArray(data.faqs) && data.faqs.length) {
      const faqText = data.faqs
        .map((f: any) => `P: ${f.q || f.question}\nR: ${f.a || f.answer}`)
        .join('\n\n')
      parts.push(`\n━━━ FAQ ━━━\n${faqText}`)
    }
    if (data.vocabulary && typeof data.vocabulary === 'object') {
      const v = data.vocabulary as any
      if (v.use?.length) parts.push(`\nUse: ${v.use.join(', ')}`)
      if (v.avoid?.length) parts.push(`Evite: ${v.avoid.join(', ')}`)
    }
    if (Array.isArray(data.examples) && data.examples.length) {
      const ex = data.examples
        .map((e: any) => `Usuário: "${e.user}"\nMAIA: "${e.maia}"`)
        .join('\n\n')
      parts.push(`\n━━━ EXEMPLOS ━━━\n${ex}`)
    }
    return parts.join('\n')
  } catch {
    return DEFAULT_SYSTEM_PROMPT
  }
}

async function keywordSearch(query: string, supabase: any): Promise<any[]> {
  const words = query
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length >= 4)
    .slice(0, 6)
  if (words.length === 0) return []
  const orFilter = words.map((w) => `content.ilike.%${w}%`).join(',')
  const { data } = await supabase
    .from('maia_chunks')
    .select('content, metadata, document_id, maia_documents(title)')
    .or(orFilter)
    .limit(5)
  return (data || []).map((c: any) => ({
    content: c.content,
    document_title: c.maia_documents?.title || c.metadata?.title || 'documento',
  }))
}

async function retrieveContext(query: string, supabase: any): Promise<string> {
  if (!query || query.length < 3) return ''
  const kw = await keywordSearch(query, supabase)
  if (kw.length === 0) return ''
  return kw
    .map((c, i) => `[${i + 1}] (${c.document_title})\n${c.content}`)
    .join('\n\n---\n\n')
}

function streamText(text: string) {
  const encoder = new TextEncoder()
  const chunks = text.match(/[\s\S]{1,48}/g) || ['']
  return new Response(
    new ReadableStream({
      start(controller) {
        for (const chunk of chunks) {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ choices: [{ delta: { content: chunk } }] })}\n\n`),
          )
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'))
        controller.close()
      },
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' } },
  )
}

function fallbackReply(lastUserText: string, name?: string) {
  const text = lastUserText.toLowerCase()
  if (/pag(ar|amento)|checkout|comprar|contratar|assessment|avaliação|avaliacao/.test(text)) {
    return 'Pode fazer o pagamento seguro por aqui: https://mooviaportugal.com/checkout — após a confirmação, entramos em contacto para agendar a sessão de 60 minutos.'
  }
  if (/humano|consultor|fundador|conversa gratuita|atendimento|atendido|atendida|reunião|reuniao/.test(text)) {
    const first = name?.trim().split(/\s+/)[0]
    return `Claro${first ? `, ${first}` : ''}, vou ajudá-lo a marcar. Antes preciso fazer algumas perguntas rápidas para que o fundador chegue já com contexto do seu caso. Qual o seu objetivo principal com Portugal?\n[OPTIONS]Trabalhar em Portugal|Estudar em Portugal|Mudar com a família|Investir em imóveis|Reforma em Portugal|Outro[/OPTIONS]`
  }
  return 'Estou com alta demanda agora e não quero te dar uma resposta incompleta. Pode tentar novamente em alguns minutos?'
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  try {
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY')
    const GROQ_KEY = Deno.env.get('GROQ_API_KEY')
    const { messages, language, name } = await req.json()
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'messages must be array' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    const systemPrompt = await loadKnowledge(supabase)

    const lastUser = [...messages].reverse().find((m: any) => m.role === 'user')
    const context = lastUser
      ? await retrieveContext(String(lastUser.content || ''), supabase)
      : ''

    const lang = (typeof language === 'string' && langMap[language]) ? language : 'pt'
    const langDirective = langMap[lang]
    const systemFull =
      `${langDirective}\n\n` +
      CRITICAL_RULES + '\n\n' +
      TEAM_KNOWLEDGE + '\n\n' +
      systemPrompt +
      '\n\n' + langDirective +
      (name ? (nameHint[lang] || nameHint.pt)(name) : '') +
      (context ? `\n\n━━━ [CONTEXTO / CONTEXT] ━━━\n${context}\n━━━ END ━━━` : '')


    const contents = messages.slice(-12).map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || '').slice(0, 4000),
    }))

    const aiBody = {
      model: AI_MODEL,
      messages: [{ role: 'system', content: systemFull }, ...contents],
      max_tokens: 350,
      temperature: 0.7,
      stream: true,
    }

    if (LOVABLE_API_KEY) {
      try {
        const response = await fetch(AI_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${LOVABLE_API_KEY}` },
          body: JSON.stringify(aiBody),
          signal: AbortSignal.timeout(60000),
        })
        if (response.ok && response.body) {
          return new Response(response.body, {
            headers: { ...corsHeaders, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
          })
        }
        console.error('AI gateway error', response.status, await response.text().catch(() => ''))
      } catch (e) {
        console.error('AI gateway failed', e)
      }
    }

    if (GROQ_KEY) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${GROQ_KEY}` },
          body: JSON.stringify({ ...aiBody, model: 'llama-3.3-70b-versatile' }),
          signal: AbortSignal.timeout(60000),
        })
        if (response.ok && response.body) {
          return new Response(response.body, {
            headers: { ...corsHeaders, 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
          })
        }
        console.error('Groq error', response.status, await response.text().catch(() => ''))
      } catch (e) {
        console.error('Groq failed', e)
      }
    }

    return streamText(fallbackReply(String(lastUser?.content || ''), name))
  } catch (err) {
    console.error('moovia-chat internal fallback', err)
    return streamText('Estou com alta demanda agora e não quero te dar uma resposta incompleta. Pode tentar novamente em alguns minutos?')
  }
})
