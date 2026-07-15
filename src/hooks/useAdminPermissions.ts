import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type AdminMe = {
  id: string;
  role: "owner" | "admin" | "editor" | "viewer";
  allowed_tabs: string[];
  name: string | null;
} | null;

export function useAdminMe() {
  const [me, setMe] = useState<AdminMe>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        if (!cancelled) { setMe(null); setLoading(false); }
        return;
      }
      const { data } = await supabase
        .from("admin_users")
        .select("id, role, allowed_tabs, name")
        .eq("id", session.user.id)
        .maybeSingle();
      if (!cancelled) {
        setMe(data as AdminMe);
        setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const canAccess = (tabKey: string) => {
    if (!me) return false;
    if (me.role === "owner" || me.role === "admin") return true;
    return me.allowed_tabs?.includes(tabKey);
  };

  return { me, loading, canAccess };
}
