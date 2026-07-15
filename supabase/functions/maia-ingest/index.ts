// Ingest a document into MAIA's knowledge base:
//  - download from storage
//  - extract text (PDF, DOCX, TXT, MD)
//  - chunk
//  - insert into maia_chunks without embeddings (keyword search only)
//
// POST { document_id: string }
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const CHUNK_SIZE = 1200
const CHUNK_OVERLAP = 200

function chunkText(text: string): string[] {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return []
  if (clean.length <= CHUNK_SIZE) return [clean]
  const chunks: string[] = []
  let i = 0
  while (i < clean.length) {
    const end = Math.min(i + CHUNK_SIZE, clean.length)
    chunks.push(clean.slice(i, end))
    if (end >= clean.length) break
    i = end - CHUNK_OVERLAP
  }
  return chunks
}

async function extractPdf(bytes: Uint8Array): Promise<string> {
  // unpdf works in Deno / edge runtimes (no native deps)
  const { extractText, getDocumentProxy } = await import('https://esm.sh/unpdf@0.12.1')
  const pdf = await getDocumentProxy(bytes)
  const { text } = await extractText(pdf, { mergePages: true })
  return Array.isArray(text) ? text.join('\n\n') : text
}

async function extractDocx(bytes: Uint8Array): Promise<string> {
  const mammoth = await import('https://esm.sh/mammoth@1.7.2?bundle')
  const result = await mammoth.default.extractRawText({
    arrayBuffer: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  })
  return result.value || ''
}

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders })

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  let documentId: string | undefined
  try {
    const body = await req.json()
    documentId = body?.document_id
    if (!documentId) throw new Error('document_id required')

    await supabase.from('maia_documents').update({ status: 'processing', error: null }).eq('id', documentId)

    const { data: doc, error: docErr } = await supabase
      .from('maia_documents')
      .select('*')
      .eq('id', documentId)
      .single()
    if (docErr || !doc) throw new Error(`document not found: ${docErr?.message}`)

    // Download from storage
    const { data: file, error: dlErr } = await supabase.storage
      .from('maia-docs')
      .download(doc.storage_path)
    if (dlErr || !file) throw new Error(`download failed: ${dlErr?.message}`)
    const bytes = new Uint8Array(await file.arrayBuffer())

    // Extract text by type
    const type = (doc.file_type || '').toLowerCase()
    let text = ''
    if (type.includes('pdf')) {
      text = await extractPdf(bytes)
    } else if (type.includes('word') || type.includes('docx') || type.includes('officedocument')) {
      text = await extractDocx(bytes)
    } else if (type.startsWith('image/')) {
      throw new Error('Arquivos de imagem não são processados neste modo sem IA externa. Envie PDF, DOCX, TXT, CSV, JSON ou MD.')
    } else if (type.startsWith('text/') || type.includes('json') || type.includes('csv') || type.includes('markdown')) {
      text = new TextDecoder().decode(bytes)
    } else {
      // best effort: try as text
      text = new TextDecoder().decode(bytes)
    }

    if (!text || text.trim().length < 5) throw new Error('No text extracted from file')

    // Delete previous chunks (re-ingest)
    await supabase.from('maia_chunks').delete().eq('document_id', documentId)

    const chunks = chunkText(text)
    if (chunks.length === 0) throw new Error('No chunks produced')

    let inserted = 0
    for (let i = 0; i < chunks.length; i += 100) {
      const slice = chunks.slice(i, i + 100)
      const rows = slice.map((content, j) => ({
        document_id: documentId,
        chunk_index: i + j,
        content,
        embedding: null,
        tokens: Math.ceil(content.length / 4),
        metadata: { title: doc.title, filename: doc.filename },
      }))
      const { error: insErr } = await supabase.from('maia_chunks').insert(rows)
      if (insErr) throw new Error(`insert chunks: ${insErr.message}`)
      inserted += rows.length
    }

    await supabase
      .from('maia_documents')
      .update({
        status: 'ready',
        chunk_count: inserted,
        error: null,
      })
      .eq('id', documentId)

    return new Response(JSON.stringify({ ok: true, chunks: inserted }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    const msg = String(err?.message || err)
    if (documentId) {
      await supabase.from('maia_documents').update({ status: 'error', error: msg }).eq('id', documentId)
    }
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
