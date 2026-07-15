import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SiteContentMap = Record<string, string>;

export function useSiteContent() {
  return useQuery<SiteContentMap>({
    queryKey: ["site_content_all"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("key,value");
      if (error) throw error;
      const map: SiteContentMap = {};
      (data || []).forEach((r: any) => { map[r.key] = r.value ?? ""; });
      return map;
    },
  });
}

/**
 * Returns site_content[key] when present, otherwise the fallback.
 * Use inline with i18n fallback: useText("hero.title_1", t("hero.title_1"))
 */
export function useText(key: string, fallback: string): string {
  const { data } = useSiteContent();
  return (data && data[key]) || fallback;
}
