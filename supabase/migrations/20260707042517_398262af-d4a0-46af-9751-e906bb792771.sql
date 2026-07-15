CREATE OR REPLACE FUNCTION public.calculate_lead_score(lead_record public.leads)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  score INTEGER := 0;
BEGIN
  IF lead_record.timing = 'menos_3_meses' THEN score := score + 40;
  ELSIF lead_record.timing = '3_6_meses' THEN score := score + 20;
  ELSIF lead_record.timing = '6_12_meses' THEN score := score + 10;
  END IF;

  IF lead_record.objective = 'trabalho' THEN score := score + 30;
  ELSIF lead_record.objective = 'familia' THEN score := score + 25;
  ELSIF lead_record.objective = 'investir' THEN score := score + 20;
  END IF;

  IF lead_record.composition ILIKE '%filhos%' THEN score := score + 20; END IF;
  IF lead_record.composition ILIKE '%pets%' THEN score := score + 10; END IF;

  IF lead_record.decision_phase = 'tomei_decisao' THEN score := score + 30;
  ELSIF lead_record.decision_phase = 'tenho_proposta' THEN score := score + 40;
  END IF;

  IF score >= 70 THEN RETURN 'hot';
  ELSIF score >= 40 THEN RETURN 'warm';
  ELSE RETURN 'cold';
  END IF;
END;
$$;

CREATE OR REPLACE FUNCTION public.trigger_calculate_temperature()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.temperature := public.calculate_lead_score(NEW);
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.calculate_lead_score(public.leads) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.trigger_calculate_temperature() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.calculate_lead_score(public.leads) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.trigger_calculate_temperature() TO anon, authenticated, service_role;