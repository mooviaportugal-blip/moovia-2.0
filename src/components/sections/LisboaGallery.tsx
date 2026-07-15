import { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotatingLogo } from "@/components/ui/RotatingLogo";
import { ImageMarquee } from "@/components/ui/ImageMarquee";
import { supabase } from "@/integrations/supabase/client";
import hero from "@/assets/hero-lisboa-editorial.jpg";
import problem from "@/assets/problem-lisboa-planning.jpg";
import processImg from "@/assets/process-relocation-documents.jpg";
import fiscal from "@/assets/blog-fiscal-lisboa.jpg";
import habit from "@/assets/blog-habitacao-lisboa.jpg";
import visto from "@/assets/blog-visto-lisboa.jpg";

const DEFAULT_TOP = [hero, problem, processImg, fiscal, habit, visto];
const DEFAULT_BOTTOM = [visto, habit, fiscal, processImg, problem, hero];

export function LisboaGallery() {
  const qc = useQueryClient();
  const { data } = useQuery({
    queryKey: ["gallery_images", "lisboa"],
    staleTime: 10_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("row_index, position, url")
        .eq("gallery", "lisboa")
        .order("row_index")
        .order("position");
      if (error) throw error;
      return data as { row_index: number; position: number; url: string }[];
    },
  });

  useEffect(() => {
    const ch = supabase
      .channel("gallery_images-lisboa")
      .on("postgres_changes", { event: "*", schema: "public", table: "gallery_images" }, () => {
        qc.invalidateQueries({ queryKey: ["gallery_images", "lisboa"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [qc]);


  const top = data?.filter((i) => i.row_index === 0).map((i) => i.url) ?? [];
  const bottom = data?.filter((i) => i.row_index === 1).map((i) => i.url) ?? [];
  const topRow = top.length ? top : DEFAULT_TOP;
  const bottomRow = bottom.length ? bottom : DEFAULT_BOTTOM;

  return (
    <section className="relative bg-black py-16 md:py-24 lg:py-32 overflow-hidden">
      <RotatingLogo size="min(80vw,1000px)" opacity={0.025} duration={200} />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-20 mb-20 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-body text-[11px] tracking-[0.32em] uppercase text-gold mb-6"
        >
          Editorial · Portugal
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-[clamp(28px,4.5vw,60px)] font-[200] text-white leading-[0.95] tracking-[-0.04em] max-w-[800px]"
        >
          Uma vida em Portugal,
          <span className="block text-gold italic font-[300]">vista por dentro.</span>
        </motion.h2>
      </div>

      <div className="space-y-6 relative z-10">
        <ImageMarquee images={topRow} speed={30} />
        <ImageMarquee images={bottomRow} speed={36} reverse height="h-[220px] md:h-[300px]" />
      </div>
    </section>
  );
}
