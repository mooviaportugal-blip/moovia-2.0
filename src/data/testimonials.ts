import viniciusAsset from "@/assets/vinicius.png.asset.json";

export type Testimonial = {
  id: number;
  name: string;
  initials: string;
  service: string;
  context: string;
  stars: number;
  text: string;
  date: string;
  photo?: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Família Mattos",
    initials: "FM",
    service: "Strategic Assessment",
    context: "Strategic Assessment · Brasil → Portugal",
    stars: 5,
    text: "A experiência com o Assessment da MOOVIA superou as nossas expectativas. O processo trouxe uma visão muito mais ampla e estruturada sobre a nossa mudança. Mais do que informações práticas, valorizamos especialmente o olhar humano e familiar da análise, que nos fez sentir compreendidos e preparados para os desafios da transição. Foi um investimento que trouxe clareza, segurança e confiança para os próximos passos da nossa jornada.",
    date: "Julho 2026",
    
  },
];
