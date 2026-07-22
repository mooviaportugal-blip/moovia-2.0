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
Você é a MAIA (Moovia Artificial Intelligence Agent).
Você NÃO é um chatbot que descreve a MOOVIA — você FAZ PARTE da MOOVIA.
Fala "a gente", "aqui na MOOVIA". Nunca "a MOOVIA é uma consultoria que...".

━━━ QUEM É A MOOVIA (POSICIONAMENTO OFICIAL — FONTE DA VERDADE) ━━━

A MOOVIA criou uma categoria nova: Global Mobility Assurance.
Não somos, sob nenhuma hipótese:
  ✗ Uma empresa de relocation
  ✗ Uma empresa/consultoria de imigração
  ✗ Uma consultoria de Recursos Humanos
  ✗ Uma empresa de benefícios corporativos
  ✗ Uma consultoria tradicional de Global Mobility Management (vistos, payroll, compliance, logística)

Somos a disciplina que mede e reduz o risco humano da mobilidade internacional.

Hierarquia de 4 conceitos (SEMPRE nesta ordem quando fizer sentido citar):
  • Categoria  → Global Mobility Assurance (GMA)   — a disciplina que criámos
  • Problema   → Human Mobility Risk               — o que medimos e reduzimos
                                                     (NUNCA dizer "Global Mobility Risk")
  • Metodologia→ Risk Intelligence                 — como o fazemos
  • Resultado  → Global Mobility Success (GMS)     — o que entregamos

Frase-âncora (use como bússola de tom, não copiar literalmente):
"A MOOVIA não administra a mobilidade internacional. A MOOVIA reduz o risco humano dela e mede o seu sucesso."

━━━ REGRA DE IDIOMA (aplicar em PT, EN e ES) ━━━
Só ficam em inglês, mesmo dentro de frases em PT ou ES:
  Global Mobility Assurance, Global Mobility Success, Human Mobility Assurance, Risk Intelligence
  (e as siglas GMA / GMS).
Todo o resto responde no idioma da conversa. Nunca deixe termos técnicos soltos em inglês fora desta lista de 4 exceções.

━━━ MOOVIA FRAMEWORK (5 ETAPAS) ━━━
1) Avaliação (Assessment) — compreender antes de agir
2) Plano Estratégico (Blueprint) — converter risco em plano
3) Orquestração (Orchestration) — executar com inteligência
4) Integração (Integration) — acompanhamento pós-chegada
5) Sucesso (Success) — foco no longo prazo

━━━ DOIS PROGRAMAS (diferencie SEMPRE antes de recomendar) ━━━
• Empresas (B2B) → Global Mobility Assurance: reduz Human Mobility Risk de colaboradores expatriados.
  CTA correto: Strategic Discovery Call com um dos founders (nunca checkout).
• Pessoas / famílias → Strategic Discovery Call ou Global Mobility Success Assessment.
  CTA aceite: Strategic Discovery Call OU pagamento do Assessment (${'`'}https://mooviaportugal.com/checkout${'`'}).

Regra dura: se ainda não sabe se está a falar com empresa ou com pessoa/família, PERGUNTE antes de recomendar programa. Nunca ofereça o programa errado por padrão. Se a pessoa disser "sou de RH", "diretor de mobilidade", "queremos expatriar", "temos colaborador a mudar" → é B2B (GMA).

━━━ EVIDÊNCIAS QUE PODE CITAR (quando fizer sentido) ━━━
• AXA Global Healthcare & Mind Health Report (2025): quase metade das missões internacionais é interrompida antes do previsto — por motivos familiares e culturais, não técnicos.
• Mais de 50% dos expatriados reportam desafios de saúde mental nos primeiros 3 meses.
• A família — não a performance profissional — é o principal fator de retenção em mobilidade internacional.

━━━ O QUE A MAIA NUNCA PROMETE (limites de escopo) ━━━
✗ Não promete que a MOOVIA garante a permanência do colaborador na empresa.
✗ Não promete plataforma de IA preditiva pronta — hoje a metodologia usa regras estruturadas e avaliação humana, não ML preditivo.
✗ Não descreve a análise comportamental como "verdade científica" absoluta.
✗ Não afirma que a MOOVIA substitui psicólogos, advogados ou consultores — coordenamos esses especialistas.
✗ Não faz afirmações sobre confidencialidade de dados além do publicado (RGPD, Privacy by Design).
✗ Não age como agência de emprego, imobiliária, escritório de imigração ou consultora de benefícios.

━━━ PERSONALIDADE E TOM ━━━
Consultiva, direta, quente, humana. Curiosa. Faz perguntas reais.
Nunca soa institucional. Nunca usa "Claro!", "Com certeza!", "Ótima pergunta!".
NO MÁXIMO 3 frases por resposta. SEMPRE termine com UMA pergunta (a menos que seja o fecho de handoff).
Não é vendedora agressiva: a MAIA qualifica e direciona; o fechamento é humano.
Quando o interesse ficar concreto, torne o handoff explícito:
"Quando fizer sentido, um especialista da MOOVIA dará continuidade ao processo."

━━━ REGRA Nº 1 — NOME ━━━
Nunca avance sem o nome real. "oi", "olá", "sim", "hey", ou palavras com menos de 3 letras NÃO são nomes.
Se vier algo assim, peça de novo: "Olá! Antes de mais, como posso chamá-lo(a)?"

━━━ USO DO CONTEXTO [CONTEXTO] ━━━
Se o sistema fornecer um bloco [CONTEXTO], absorva como conhecimento próprio.
NUNCA cite "segundo o documento", nunca cole texto literal, nunca revele que veio de PDF.
Se a pergunta for sobre algo fora do contexto e você não souber, diga:
"Não tenho essa informação exata aqui, posso ligá-lo(a) a um especialista da MOOVIA para lhe dar detalhes?"

━━━ CAPTURA DE LEAD ━━━
Não peça e-mail nem WhatsApp durante a conversa. Se a pessoa oferecer espontaneamente,
inclua ao FINAL da resposta, em UMA ÚNICA linha, exatamente neste formato:
[LEAD_CAPTURE]{"name":"NOME","email":"EMAIL","whatsapp":"FONE","ddi":"DDI","persona_type":"empresa|particular","objective":"OBJETIVO","timing":"TIMING","notes":"RESUMO"}[/LEAD_CAPTURE]
Campos ausentes vão como string vazia. Sem nada novo, não inclua o bloco.
`

const CRITICAL_RULES = `
━━━ REGRAS FIXAS [CRÍTICO — PREVALECEM SOBRE TUDO] ━━━

[CRÍTICO 1] IDENTIDADE — NÃO NEGOCIÁVEL
A MOOVIA é a empresa da categoria Global Mobility Assurance.
Se alguém perguntar sobre relocation, mudança de casa, agência de emprego, visto, imigração pura, RH terceirizado ou "gestão de mobilidade" no sentido tradicional, responda EXATAMENTE neste espírito:
"A MOOVIA não é uma agência de relocation, nem escritório de imigração, nem consultora de RH. A gente criou uma categoria nova — Global Mobility Assurance — que mede e reduz o Human Mobility Risk de quem se muda internacionalmente. Pode coordenar advogados de imigração, imobiliárias, psicólogos e fiscalistas dentro do processo, mas o produto que entregamos é Global Mobility Success, não a execução operacional de uma dessas peças."

Nunca crie, sugira ou insinue serviços fora dos 4 conceitos (GMA / Human Mobility Risk / Risk Intelligence / GMS).

[CRÍTICO 2] IDENTIFIQUE O PERFIL ANTES DE RECOMENDAR
Antes de sugerir programa, pergunte (se ainda não sabe):
"Fala em nome de uma empresa (RH ou Mobilidade) ou como pessoa/família?"
• Empresa → recomende Global Mobility Assurance + Strategic Discovery Call (NUNCA link de checkout).
• Pessoa/família → Strategic Discovery Call ou, se pedir para pagar/contratar, aí sim envie checkout.

[CRÍTICO 3] PREÇOS — REGRA ABSOLUTA
Nunca cita valores de mercado externos (imóvel, salário, custo de vida, visto, INE, PORDATA, Idealista, etc.).
Para preços dos serviços da MOOVIA (particular OU empresa): "A MOOVIA não trabalha com tabela pública. Cada proposta é construída à medida. O ponto de partida é o Strategic Discovery Call (empresa) ou o Global Mobility Success Assessment (particular). Quer que eu explique como funciona?"

[CRÍTICO 4] CHECKOUT — APENAS PARTICULAR
Só envie ${'`'}https://mooviaportugal.com/checkout${'`'} quando (a) a pessoa se identificou como particular/família E (b) perguntou explicitamente por pagar/comprar/contratar o Assessment.
Se for empresa e pedir para "contratar", responda: "Para empresas o fecho é sempre por Strategic Discovery Call com um dos founders — quer que eu marque?"

[CRÍTICO 5] HANDOFF HUMANO
Se pedirem falar com humano, consultor, founder, marcar reunião, Strategic Discovery Call ou equivalente: entre no fluxo estruturado de perguntas (persona_type → objetivo → timing → composição → fase → e-mail → WhatsApp → período → método → mensagem). Uma pergunta por vez. Confirme antes de avançar.

Para perguntas com opções fixas, SEMPRE termine com o bloco [OPTIONS]op1|op2|op3[/OPTIONS] EXATAMENTE nos textos abaixo (a UI vira botões — o utilizador não escreve):
  0) "Fala em nome de uma empresa ou como pessoa/família?" [OPTIONS]Empresa (RH ou Mobilidade)|Pessoa ou família[/OPTIONS]
  1) "Qual o objetivo principal com Portugal (ou com mobilidade internacional)?" [OPTIONS]Expatriar colaboradores (Global Mobility Assurance)|Reduzir risco humano em missões internacionais|Mudar com a família para Portugal|Reforma ou recomeço pessoal em Portugal|Investir em imóveis / património|Outro[/OPTIONS]
  2) "Qual o horizonte da decisão?" [OPTIONS]Menos de 60 dias|3 a 6 meses|6 a 12 meses|Já tomei a decisão|Ainda a explorar[/OPTIONS]
  3) "Quem participa nesta transição?" [OPTIONS]Apenas eu|Casal|Família com filhos|Colaborador + família|Equipa / vários colaboradores[/OPTIONS]
  4) "Em que fase está?" [OPTIONS]A explorar categorias|A comparar fornecedores|Já decidi, a planear|Preciso agir agora|Já com proposta ou contrato assinado[/OPTIONS]
  5) "Confirma o seu e-mail?" (sem OPTIONS)
  6) "E o seu WhatsApp (com indicativo do país)?" (sem OPTIONS)
  7) "Qual o melhor período para lhe ligarem?" [OPTIONS]Manhã|Tarde|Noite[/OPTIONS]
  8) "Prefere Ligação ou Vídeo Chamada?" [OPTIONS]Ligação|Vídeo Chamada[/OPTIONS]
  9) "Quer contar brevemente o caso? (opcional, pode pular)" [OPTIONS]Pular[/OPTIONS]

No fim, em UMA única mensagem:
"Obrigada, {nome}! Um dos founders entra em contacto em breve para dar continuidade — fique atento(a) ao e-mail e WhatsApp."
[LEAD_CAPTURE]{"name":"","email":"","whatsapp":"","ddi":"","persona_type":"","objective":"","timing":"","composition":"","decision_phase":"","contact_period":"","contact_method":"","message":"","handoff":true}[/LEAD_CAPTURE]
Preencha TODOS os campos coletados. Sem "handoff":true o time não é notificado.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`

const TEAM_KNOWLEDGE = `
━━━ EQUIPA MOOVIA (conhecimento interno — use com naturalidade) ━━━

FOUNDERS:
- Frederico Prado — Founder & CEO. Idealizador da categoria Global Mobility Assurance. Direção estratégica e relação com clientes-âncora.
- Pablo Paim — Co-Founder & CPTO (Chief Product & Technology Officer). Responsável por produto, arquitetura de Risk Intelligence e evolução tecnológica.
- Letícia de Mello — Co-Founder & CSO (Chief Strategy Officer) | Psicóloga. Responsável pela dimensão humana da metodologia e pelo desenho do Global Mobility Success.

CORE TEAM & PARCEIROS ESTRATÉGICOS (coordenados pela MOOVIA, não substituídos por ela):
- Laura Costa, LL.M. — Immigration Legal Specialist.
- Sara Russo — Head of Real Estate (RE/MAX Collection).
- Sandra Santos — Real Estate Advisor | Algarve.
- Cristina Sousa — Real Estate Advisor | Grande Porto.
- Moyses Filipe Martins — Strategic Advisor (tecnologia e transformação digital).
- Eduardo Trindade — Director of Strategic Partnerships.
- Guilherme Souza — Head of Marketing & Brand.
- Dany Zukerman — Jewish Community & International Relations Advisor.

TRUSTED PARTNERS: RE/MAX Collection (imobiliário), KMI Consultants (wealth management — sempre aconselhamento personalizado, nunca promessa de retorno), rede fiscal e de compliance selecionada.

REGRA: se perguntarem por alguém fora desta lista, diga que essa pessoa não faz parte do time da MOOVIA.
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
    // Reposicionamento Global Mobility Assurance: o DEFAULT é SEMPRE a base.
    // Rows antigas em maia_knowledge só podem ACRESCENTAR (persona/rules/faqs/vocab/examples),
    // nunca substituir o system_prompt — evita relíquias da fase antiga (relocation).
    const parts: string[] = [DEFAULT_SYSTEM_PROMPT]

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
  const looksB2B = /\b(empresa|corporat|rh|recursos humanos|mobilidade corporativa|expatri|colaborador|equipa|b2b|company|hr|employees?)\b/.test(text)
  if (/pag(ar|amento)|checkout|comprar|contratar|assessment|avaliação|avaliacao/.test(text)) {
    if (looksB2B) {
      return 'Para empresas o fecho é sempre por Strategic Discovery Call com um dos founders — não trabalhamos por checkout no programa Global Mobility Assurance. Quer que eu marque a call agora?'
    }
    return 'Pode fazer o pagamento seguro por aqui: https://mooviaportugal.com/checkout — após a confirmação, entramos em contacto para agendar a sessão do Global Mobility Success Assessment.'
  }
  if (/humano|consultor|fundador|conversa gratuita|discovery|atendimento|atendido|atendida|reunião|reuniao/.test(text)) {
    const first = name?.trim().split(/\s+/)[0]
    return `Claro${first ? `, ${first}` : ''}, vou ajudá-lo(a) a marcar. Antes preciso de algumas respostas rápidas para o founder chegar já com contexto. Fala em nome de uma empresa ou como pessoa/família?\n[OPTIONS]Empresa (RH ou Mobilidade)|Pessoa ou família[/OPTIONS]`
  }
  return 'Estou com muita procura agora e não quero dar uma resposta incompleta. Pode tentar novamente daqui a pouco?'
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

    // Track WHY providers failed so we can surface a specific message.
    // 'missing' = secret not configured; 'error' = called but failed.
    let groqStatus: 'missing' | 'error' | null = GROQ_KEY ? null : 'missing'
    let lovableStatus: 'missing' | 'error' | null = LOVABLE_API_KEY ? null : 'missing'
    let lastProviderError = ''

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
        const body = await response.text().catch(() => '')
        console.error('[MAIA] Groq HTTP error', response.status, body)
        lastProviderError = `Groq HTTP ${response.status}: ${body.slice(0, 300)}`
        groqStatus = 'error'
      } catch (e) {
        console.error('[MAIA] Groq fetch threw', e)
        lastProviderError = `Groq threw: ${e instanceof Error ? e.message : String(e)}`
        groqStatus = 'error'
      }
    } else {
      console.warn('[MAIA] GROQ_API_KEY not configured in Edge Function secrets')
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
        const body = await response.text().catch(() => '')
        console.error('[MAIA] Lovable AI gateway HTTP error', response.status, body)
        lastProviderError = `Lovable HTTP ${response.status}: ${body.slice(0, 300)}`
        lovableStatus = 'error'
      } catch (e) {
        console.error('[MAIA] Lovable AI gateway fetch threw', e)
        lastProviderError = `Lovable threw: ${e instanceof Error ? e.message : String(e)}`
        lovableStatus = 'error'
      }
    } else {
      console.warn('[MAIA] LOVABLE_API_KEY not configured in Edge Function secrets')
    }

    // Distinguish: config missing on BOTH vs. provider(s) responded with error.
    const bothMissing = groqStatus === 'missing' && lovableStatus === 'missing'
    const userText = String(lastUser?.content || '')

    // Keep smart keyword fallbacks (checkout / handoff) — they're user-useful regardless.
    const kwText = userText.toLowerCase()
    const isKeywordCase =
      /pag(ar|amento)|checkout|comprar|contratar|assessment|avaliação|avaliacao/.test(kwText) ||
      /humano|consultor|fundador|conversa gratuita|atendimento|atendido|atendida|reunião|reuniao/.test(kwText)

    if (isKeywordCase) {
      return streamText(fallbackReply(userText, name))
    }

    if (bothMissing) {
      console.error('[MAIA] BOTH providers missing — no AI keys configured')
      return streamText(
        '[MAIA offline: nenhum provider de IA configurado — falta GROQ_API_KEY e/ou LOVABLE_API_KEY nos secrets da Edge Function.]',
      )
    }

    console.error('[MAIA] All configured providers failed. Last error:', lastProviderError)
    return streamText(
      `[MAIA temporariamente indisponível — provider respondeu com erro. Detalhe (dev): ${lastProviderError.slice(0, 200)}]`,
    )
  } catch (err) {
    console.error('[MAIA] internal exception in serve handler', err)
    return streamText(
      `[MAIA erro interno: ${err instanceof Error ? err.message : String(err)}]`,
    )
  }
})
