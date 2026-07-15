
CREATE OR REPLACE FUNCTION public.is_admin(_user_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.admin_users WHERE id = _user_id) $$;

DROP POLICY IF EXISTS "Admins view all" ON public.admin_users;
CREATE POLICY "Admins view all" ON public.admin_users
FOR SELECT USING (public.is_admin(auth.uid()));
