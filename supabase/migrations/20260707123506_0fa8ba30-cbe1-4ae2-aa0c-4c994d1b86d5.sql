DROP POLICY IF EXISTS "Public insert leads" ON public.leads;

CREATE POLICY "Public insert leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  ((name IS NULL) OR (char_length(name) <= 200))
  AND ((email IS NULL) OR (char_length(email) <= 320))
  AND ((whatsapp IS NULL) OR (char_length(whatsapp) <= 40))
  AND ((message IS NULL) OR (char_length(message) <= 4000))
  AND ((objective IS NULL) OR (char_length(objective) <= 500))
  AND ((timing IS NULL) OR (char_length(timing) <= 100))
  AND ((composition IS NULL) OR (char_length(composition) <= 500))
  AND ((decision_phase IS NULL) OR (char_length(decision_phase) <= 500))
  AND ((source IS NULL) OR (char_length(source) <= 100))
  AND ((session_id IS NULL) OR (char_length(session_id) <= 200))
  AND ((utm_source IS NULL) OR (char_length(utm_source) <= 200))
  AND ((utm_medium IS NULL) OR (char_length(utm_medium) <= 200))
  AND ((utm_campaign IS NULL) OR (char_length(utm_campaign) <= 200))
  AND ((utm_content IS NULL) OR (char_length(utm_content) <= 200))
  AND ((referrer IS NULL) OR (char_length(referrer) <= 1000))
  AND ((device IS NULL) OR (char_length(device) <= 100))
  AND ((country IS NULL) OR (char_length(country) <= 100))
  AND ((city IS NULL) OR (char_length(city) <= 200))
  AND ((ddi IS NULL) OR (char_length(ddi) <= 10))
  AND ((notes IS NULL) OR (char_length(notes) <= 4000))
  AND ((contact_period IS NULL) OR (contact_period IN ('manha', 'tarde', 'noite')))
  AND ((contact_method IS NULL) OR (contact_method IN ('ligacao', 'video_chamada')))
  AND ((interest IS NULL) OR (interest IN ('conversa_gratuita', 'diagnostico')))
  AND ((status IS NULL) OR (status = 'novo'))
);