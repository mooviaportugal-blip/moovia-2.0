CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE public.maia_knowledge (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL DEFAULT 'default',
  system_prompt TEXT NOT NULL DEFAULT '',
  persona TEXT,
  rules JSONB NOT NULL DEFAULT '[]'::jsonb,
  faqs JSONB NOT NULL DEFAULT '[]'::jsonb,
  vocabulary JSONB NOT NULL DEFAULT '{}'::jsonb,
  examples JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.maia_knowledge TO authenticated;
GRANT SELECT ON public.maia_knowledge TO anon;
GRANT ALL ON public.maia_knowledge TO service_role;

ALTER TABLE public.maia_knowledge ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read knowledge"
  ON public.maia_knowledge FOR SELECT USING (true);

CREATE POLICY "Authenticated can manage knowledge"
  ON public.maia_knowledge FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE TRIGGER maia_knowledge_updated_at
  BEFORE UPDATE ON public.maia_knowledge
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.maia_knowledge (label, system_prompt, is_active)
VALUES ('default', '', true);

CREATE TABLE public.maia_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  filename TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT,
  storage_path TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  error TEXT,
  chunk_count INTEGER NOT NULL DEFAULT 0,
  tags TEXT[] NOT NULL DEFAULT '{}',
  uploaded_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.maia_documents TO authenticated;
GRANT ALL ON public.maia_documents TO service_role;

ALTER TABLE public.maia_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can manage documents"
  ON public.maia_documents FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE TRIGGER maia_documents_updated_at
  BEFORE UPDATE ON public.maia_documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.maia_chunks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  document_id UUID NOT NULL REFERENCES public.maia_documents(id) ON DELETE CASCADE,
  chunk_index INTEGER NOT NULL,
  content TEXT NOT NULL,
  embedding vector(1536),
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  tokens INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.maia_chunks TO authenticated;
GRANT ALL ON public.maia_chunks TO service_role;

ALTER TABLE public.maia_chunks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can manage chunks"
  ON public.maia_chunks FOR ALL TO authenticated
  USING (true) WITH CHECK (true);

CREATE INDEX maia_chunks_document_idx ON public.maia_chunks(document_id);
CREATE INDEX maia_chunks_embedding_idx
  ON public.maia_chunks USING hnsw (embedding vector_cosine_ops);

CREATE OR REPLACE FUNCTION public.match_maia_chunks(
  query_embedding vector(1536),
  match_count INTEGER DEFAULT 5,
  similarity_threshold FLOAT DEFAULT 0.5
)
RETURNS TABLE (
  id UUID,
  document_id UUID,
  document_title TEXT,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE sql STABLE
SET search_path = public
AS $$
  SELECT
    c.id, c.document_id, d.title, c.content, c.metadata,
    1 - (c.embedding <=> query_embedding) AS similarity
  FROM public.maia_chunks c
  JOIN public.maia_documents d ON d.id = c.document_id
  WHERE c.embedding IS NOT NULL
    AND d.status = 'ready'
    AND 1 - (c.embedding <=> query_embedding) > similarity_threshold
  ORDER BY c.embedding <=> query_embedding
  LIMIT match_count;
$$;