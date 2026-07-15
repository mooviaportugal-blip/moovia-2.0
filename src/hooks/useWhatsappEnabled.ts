import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useWhatsappEnabled() {
  const [enabled, setEnabled] = useState<boolean>(false);
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "whatsapp_enabled")
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return;
        setEnabled(data?.value === "true");
      });
    return () => {
      cancelled = true;
    };
  }, []);
  return enabled;
}
