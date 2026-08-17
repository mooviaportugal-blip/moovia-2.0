-- Revoke general execute permissions
REVOKE EXECUTE ON FUNCTION public.save_chat_log(text, jsonb, boolean) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.save_chat_log(text, jsonb, boolean) FROM authenticated;

-- Grant only to anon (for the website visitor) and service_role
GRANT EXECUTE ON FUNCTION public.save_chat_log(text, jsonb, boolean) TO anon;
GRANT EXECUTE ON FUNCTION public.save_chat_log(text, jsonb, boolean) TO service_role;

-- Re-verify grant for admin_users just in case
GRANT SELECT ON public.admin_users TO authenticated;