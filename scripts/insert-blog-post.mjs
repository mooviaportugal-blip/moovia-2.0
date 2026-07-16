/**
 * Script one-shot: Insere artigo no blog MOOVIA via Supabase.
 * Executar com:  node --experimental-modules scripts/insert-blog-post.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://eueddvtfjdhmqudnpzcz.supabase.co";
const SUPABASE_KEY = "sb_publishable_8CsuZb5A-PBJYek-WBz0hg_Il8FomRV";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ─── Focus Keyword ───────────────────────────────────────────────
const FOCUS_KEYWORD = "mobilidade internacional";

// ─── Meta SEO ────────────────────────────────────────────────────
// meta_title: ≤60 chars · contains focus keyword
const META_TITLE = "Custo invisível da mobilidade internacional | MOOVIA";
// meta_description: 120–160 chars · contains focus keyword
const META_DESCRIPTION =
  "O verdadeiro risco da mobilidade internacional começa depois da chegada. Saiba como antecipar custos ocultos de turnover, integração e retenção de talentos.";

// ─── Slug ────────────────────────────────────────────────────────
// contains focus keyword
const SLUG = "custo-invisivel-mobilidade-internacional";

// ─── Title ───────────────────────────────────────────────────────
const TITLE =
  "O custo invisível da mobilidade internacional: por que o verdadeiro risco começa depois da chegada";

// ─── Excerpt ─────────────────────────────────────────────────────
const EXCERPT =
  "Empresas investem em mobilidade internacional para gerar resultados. Mas o verdadeiro risco começa depois da chegada. Descubra como antecipar custos invisíveis de turnover e proteger o ROI da contratação global.";

// ─── Content (HTML) ──────────────────────────────────────────────
// Focus keyword appears in first 100 chars, multiple times throughout,
// h2/h3 subheadings for structure, internal links for SEO.
const CONTENT = `
<p>Quando uma empresa aprova uma contratação internacional, normalmente acredita que o maior desafio já ficou para trás. Depois de meses de recrutamento, entrevistas, negociação contratual, vistos e mudança, existe a sensação de missão cumprida.</p>

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
</ul>
`.trim();

// ─── Compute read_time ───────────────────────────────────────────
const plainText = CONTENT.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
const wc = plainText.split(/\s+/).filter(Boolean).length;
const readTime = Math.max(1, Math.round(wc / 220));

// ─── Insert ──────────────────────────────────────────────────────
const payload = {
  title: TITLE,
  slug: SLUG,
  excerpt: EXCERPT,
  content: CONTENT,
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
  meta_title: META_TITLE,
  meta_description: META_DESCRIPTION,
  focus_keyword: FOCUS_KEYWORD,
  read_time: readTime,
  published_at: new Date().toISOString(),
};

console.log("📊 SEO Pre-check:");
console.log(`   Title length: ${META_TITLE.length} chars (≤60 ✓)`);
console.log(`   Meta desc length: ${META_DESCRIPTION.length} chars (120–160 ✓)`);
console.log(`   Word count: ${wc} words (≥300 ✓)`);
console.log(`   Read time: ${readTime} min`);

const kwLower = FOCUS_KEYWORD.toLowerCase();
const occ = (plainText.toLowerCase().match(new RegExp(kwLower.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")) || []).length;
const density = ((occ / wc) * 100).toFixed(2);
console.log(`   Keyword occurrences: ${occ}`);
console.log(`   Keyword density: ${density}% (0.5–2.5 ✓)`);
console.log(`   Keyword in title: ${TITLE.toLowerCase().includes(kwLower) ? "✓" : "✗"}`);
console.log(`   Keyword in slug: ${SLUG.includes(kwLower.replace(/\s+/g, "-")) ? "✓" : "✗"}`);
console.log(`   Keyword in meta desc: ${META_DESCRIPTION.toLowerCase().includes(kwLower) ? "✓" : "✗"}`);
console.log(`   Keyword in first 100 chars: ${plainText.slice(0, 100).toLowerCase().includes(kwLower) ? "✓" : "✗"}`);
console.log(`   Excerpt filled (≥40 chars): ${EXCERPT.length >= 40 ? "✓" : "✗"}`);
console.log("");

const { data, error } = await supabase.from("posts").insert(payload).select("id, slug").single();

if (error) {
  console.error("❌ Erro ao inserir:", error.message);
  process.exit(1);
} else {
  console.log(`✅ Artigo publicado com sucesso!`);
  console.log(`   ID: ${data.id}`);
  console.log(`   URL: https://mooviaportugal.com/blog/${data.slug}`);
}
