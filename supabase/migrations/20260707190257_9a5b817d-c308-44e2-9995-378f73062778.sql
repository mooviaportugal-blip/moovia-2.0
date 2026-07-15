
ALTER TABLE public.assessments DROP CONSTRAINT assessments_lead_id_fkey,
  ADD CONSTRAINT assessments_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;
ALTER TABLE public.chat_logs DROP CONSTRAINT chat_logs_lead_id_fkey,
  ADD CONSTRAINT chat_logs_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;
ALTER TABLE public.mandatos DROP CONSTRAINT mandatos_lead_id_fkey,
  ADD CONSTRAINT mandatos_lead_id_fkey FOREIGN KEY (lead_id) REFERENCES public.leads(id) ON DELETE SET NULL;
