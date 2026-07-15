import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export function useAirplaneEnabled() {
  const [enabled, setEnabled] = useState<boolean>(false);
  useEffect(() => {
    let cancelled = false;
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "airplane_enabled")
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
