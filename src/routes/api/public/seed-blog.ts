import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/seed-blog")({
  server: {
    handlers: {
      GET: async () => {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        // Check if already exists
        const { data: existing } = await supabaseAdmin
          .from("posts")
          .select("id, slug")
          .eq("slug", "custo-invisivel-mobilidade-internacional")
          .maybeSingle();

        if (existing) {
          return Response.json({
            ok: true,
            already_existed: true,
            id: existing.id,
            slug: existing.slug,
            url: `https://mooviaportugal.com/blog/${existing.slug}`,
          });
        }

        const payload = {
          title:
            "O custo invisível da mobilidade internacional: por que o verdadeiro risco começa depois da chegada",
          slug: "custo-invisivel-mobilidade-internacional",
          excerpt:
            "Empresas investem em mobilidade internacional para gerar resultados. Mas o verdadeiro risco começa depois da chegada. Descubra como antecipar custos invisíveis de turnover e proteger o ROI da contratação global.",
          content: `<p>Quando uma empresa aprova uma contratação internacional, normalmente acredita que o maior desafio já ficou para trás. Depois de meses de recrutamento, entrevistas, negociação contratual, vistos e mudança, existe a sensação de missão cumprida.</p>

<p>Mas, na realidade, é exatamente nesse momento que o maior risco da <strong>mobilidade internacional</strong> começa.</p>

<p><em>A chegada marca o fim da logística. A integração marca o início do verdadeiro desafio.</em></p>

<h2>O investimento começa muito antes do primeiro dia</h2>

<p>Uma contratação internacional representa muito mais do que um salário. Envolve custos de recrutamento, honorários, tempo de gestores, onboarding, benefícios, mudança, imigração, produtividade inicial reduzida e adaptação. Quando essa contratação falha, dificilmente o prejuízo se limita ao custo de substituir um colaborador.</p>

<h2>O custo invisível do turnover</h2>

<p>Estudos internacionais estimam que substituir um profissional qualificado pode custar entre 50% e 200% do seu salário anual, dependendo da função e da senioridade. Em <strong>mobilidade internacional</strong>, esse impacto tende a ser ainda maior devido aos custos adicionais da transferência, da integração e da perda de continuidade do negócio.</p>

<p>O turnover precoce significa perda de conhecimento, atrasos em projetos, desgaste das equipes e necessidade de reiniciar um processo que consumiu meses de trabalho.</p>

<h2>O problema raramente é técnico</h2>

<p>Décadas de investigação mostram que os principais motivos para o insucesso de expatriações estão ligados à adaptação da família, ao choque cultural, à saúde emocional e à ausência de uma rede de apoio. Ou seja, muitas mobilidades fracassam não porque a empresa escolheu o profissional errado, mas porque não conseguiu reduzir os riscos humanos da mudança.</p>

<h2>Chegar não significa integrar</h2>

<p>Visto aprovado, contrato assinado e mudança concluída são marcos importantes, mas medem apenas a execução da estratégia. O verdadeiro indicador de sucesso é outro: o colaborador permaneceu? A família adaptou-se? A produtividade aconteceu? O investimento gerou retorno?</p>

<p>É essa diferença entre execução e resultado que inspira o conceito de <strong>Global Mobility Success</strong>.</p>

<h2>Por que o ROI depende da integração</h2>

<p>Empresas investem em <strong>mobilidade internacional</strong> para acelerar crescimento, preencher posições críticas, transferir conhecimento e desenvolver liderança. O retorno desse investimento só acontece quando o profissional consegue permanecer, produzir e gerar valor. Quanto mais cedo surgem dificuldades de adaptação, menor tende a ser o retorno sobre o investimento realizado.</p>

<h2>A oportunidade de antecipar riscos</h2>

<p>Grande parte dos fatores que comprometem uma mobilidade pode ser identificada antes da mudança: expectativas irreais, incompatibilidade entre custo de vida e remuneração, desafios familiares, localização da moradia, escolas, rotina e capacidade de adaptação.</p>

<p>Antecipar esses fatores permite criar planos personalizados de mitigação, reduzindo a probabilidade de problemas futuros.</p>

<h2>Do relocation para gestão de risco</h2>

<p>Durante muitos anos a mobilidade internacional foi tratada como uma sequência de tarefas administrativas. Hoje, empresas mais maduras começam a enxergá-la como uma estratégia de retenção de talentos e continuidade do negócio. O foco deixa de ser apenas mover pessoas entre países e passa a ser proteger um investimento estratégico.</p>

<h2>O papel do MOOVIA Mobility Risk Assessment™</h2>

<p>O <strong>MOOVIA Mobility Risk Assessment™</strong> nasceu exatamente para responder a esse desafio. Antes da mudança, avaliamos fatores profissionais, familiares, financeiros, territoriais, culturais e emocionais que podem comprometer a integração. A partir dessa avaliação, estruturamos um plano de mitigação e coordenamos especialistas para aumentar as probabilidades de sucesso.</p>

<p>Nosso objetivo é reduzir o risco humano da <strong>mobilidade internacional</strong>.</p>

<h2>Conclusão</h2>

<p>Empresas não investem em mobilidade internacional para concluir processos. Investem para gerar resultados.</p>

<p>É por isso que acreditamos que o verdadeiro risco começa depois da chegada.</p>

<p>Quando a integração é negligenciada, aumentam o turnover, os custos de substituição, a perda de produtividade e a destruição de valor.</p>

<p>Quando os riscos são identificados antes da mudança e tratados de forma estruturada, a mobilidade deixa de ser apenas uma operação logística e passa a ser uma vantagem competitiva.</p>

<p><em>Esse é o propósito do MOOVIA Mobility Risk Assessment™: transformar riscos invisíveis em decisões melhores e criar as condições para um verdadeiro Global Mobility Success.</em></p>

<h3>Referências</h3>

<ul>
<li>Frontiers in Psychology (2022). <em>Facilitating Cross-Cultural Adaptation: A Meta-Analytic Review of Dispositional Predictors of Expatriate Adjustment.</em></li>
<li>SHRM — estudos sobre custo de substituição de colaboradores qualificados.</li>
<li>Deloitte Global Human Capital Trends — retenção e experiência do colaborador.</li>
<li>AXA Global Healthcare (2026) — dados sobre mobilidade internacional e desafios de adaptação.</li>
</ul>`,
          category: "Human Mobility Assurance",
          tags: [
            "mobilidade internacional",
            "turnover",
            "integração",
            "ROI",
            "gestão de risco",
            "expatriação",
            "retenção de talentos",
            "MOOVIA",
          ],
          published: true,
          featured_image: null,
          banner_image: null,
          og_image: null,
          meta_title: "Custo invisível da mobilidade internacional | MOOVIA",
          meta_description:
            "O verdadeiro risco da mobilidade internacional começa depois da chegada. Saiba como antecipar custos ocultos de turnover, integração e retenção de talentos.",
          focus_keyword: "mobilidade internacional",
          read_time: 3,
          published_at: new Date().toISOString(),
        };

        const { data, error } = await supabaseAdmin
          .from("posts")
          .insert(payload)
          .select("id, slug")
          .single();

        if (error) {
          return Response.json({ ok: false, error: error.message }, { status: 500 });
        }

        return Response.json({
          ok: true,
          id: data.id,
          slug: data.slug,
          url: `https://mooviaportugal.com/blog/${data.slug}`,
        });
      },
    },
  },
});
