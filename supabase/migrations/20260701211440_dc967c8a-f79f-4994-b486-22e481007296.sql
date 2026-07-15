
INSERT INTO public.legal_pages (slug, title, content, updated_at)
VALUES (
  'politica-cookies',
  'Política de Cookies',
$md$
## 1. O que são cookies

Cookies são pequenos ficheiros de texto que são colocados no seu dispositivo (computador, tablet ou telemóvel) quando visita um website. Permitem que o website reconheça o seu dispositivo numa visita seguinte, recorde as suas preferências e nos ajude a melhorar a experiência de navegação.

Além de cookies, podemos utilizar tecnologias semelhantes como web beacons, pixels de rastreamento e armazenamento local, que funcionam de forma análoga e estão igualmente abrangidos pela presente política.

## 2. Que cookies utilizamos

Os cookies utilizados no nosso website dividem-se em quatro categorias:

**ESSENCIAIS** , Necessários para o funcionamento básico do website. Não podem ser desativados pois sem eles o website não funciona corretamente.

- Gestão da sessão de navegação
- Memorização do consentimento de cookies
- Segurança e prevenção de fraude
- Funcionamento do formulário de contacto

**FUNCIONAIS** , Permitem funcionalidades avançadas e personalização. O website funciona sem eles, mas com experiência reduzida.

- Agendamento via Calendly (Conversas Gratuitas e Avaliações Estratégicas)
- Assistente virtual MAIA , memorização de preferências de interação
- Preferências de idioma
- Reprodução do player de som MOOVIA Soundscapes

**ANALÍTICOS** , Permitem-nos compreender como os visitantes utilizam o website, para que possamos melhorá-lo. Toda a informação é agregada e anónima.

- Google Analytics , páginas visitadas, tempo de permanência, origem do tráfego
- Google Search Console , desempenho nas pesquisas

**MARKETING** , Utilizados para medir a eficácia das nossas campanhas e, com o seu consentimento, apresentar conteúdo relevante noutras plataformas. Só são ativados com consentimento explícito.

- Meta Pixel (Facebook/Instagram) , medição de campanhas
- Google Ads , conversões e remarketing

## 3. Lista detalhada de cookies

A tabela seguinte identifica os principais cookies utilizados no nosso website:

| Cookie / Fornecedor | Finalidade | Duração | Categoria |
|---|---|---|---|
| _ga, _gid | Análise de tráfego (Google Analytics) | Até 2 anos | Analítico |
| _gac_* | Conversões Google Ads | Até 90 dias | Marketing |
| calendly.* | Funcionalidade de agendamento | Sessão / persistente | Funcional |
| __stripe_mid, __stripe_sid | Segurança de pagamento (Stripe) | Até 1 ano | Essencial |
| _fbp, _fbc | Meta Pixel (Facebook) | Até 90 dias | Marketing |
| moovia_sound_* | Preferências de som do website | Persistente (localStorage) | Funcional |
| moovia_cookie_consent | Memorização do consentimento | Até 12 meses | Essencial |
| MAIA_session | Sessão do assistente virtual | Sessão | Funcional |

Esta lista pode não ser exaustiva. Para obter a lista completa e atualizada de cookies, pode inspecionar o seu navegador ou contactar-nos através de privacy@mooviaportugal.com.

## 4. Cookies de terceiros

Alguns cookies são colocados por terceiros cujos serviços utilizamos no nosso website. Esses terceiros têm as suas próprias políticas de privacidade e de cookies, pelas quais são responsáveis:

| Terceiro | Finalidade | Política de Privacidade |
|---|---|---|
| Google Analytics | Análise de tráfego e comportamento | policies.google.com |
| Google Ads | Publicidade e conversões | policies.google.com |
| Calendly | Agendamento online | calendly.com/privacy |
| Stripe | Processamento de pagamentos | stripe.com/privacy |
| Meta (Facebook) | Publicidade (Meta Pixel) | facebook.com/privacy |
| Supabase | Base de dados e autenticação | supabase.com/privacy |
| Resend | E-mail transacional | resend.com/privacy |

## 5. Como gerir as suas preferências

### 5.1. Painel de preferências do website

Ao visitar o nosso website pela primeira vez, é apresentado um aviso de cookies com as seguintes opções:

- **Aceitar todos** , ativa todas as categorias de cookies
- **Rejeitar não essenciais** , ativa apenas os cookies estritamente necessários
- **Personalizar** , permite escolher categoria a categoria

Pode alterar as suas preferências a qualquer momento através do link "Gerir Cookies" disponível no rodapé do website. A sua escolha é guardada durante 12 meses.

### 5.2. Definições do navegador

Pode também controlar cookies através das definições do seu navegador. Note que bloquear cookies essenciais pode afetar o funcionamento do website:

| Navegador | Caminho |
|---|---|
| Google Chrome | Definições → Privacidade e segurança → Cookies |
| Mozilla Firefox | Definições → Privacidade e segurança → Cookies |
| Safari | Preferências → Privacidade → Cookies |
| Microsoft Edge | Definições → Privacidade, pesquisa e serviços → Cookies |

## 6. Base legal para a utilização de cookies

A utilização de cookies no nosso website tem as seguintes bases legais ao abrigo do RGPD e da legislação portuguesa (Lei 41/2004, alterada pela Lei 46/2012):

- **Cookies essenciais:** interesse legítimo no funcionamento do website (Art. 6.º/1/f RGPD)
- **Cookies funcionais, analíticos e de marketing:** consentimento do utilizador (Art. 6.º/1/a RGPD)

## 7. Transferências internacionais

Alguns dos terceiros mencionados nesta política estão estabelecidos fora do Espaço Económico Europeu (EEE), designadamente nos Estados Unidos da América. As transferências são efetuadas ao abrigo de mecanismos adequados nos termos do Art. 46.º RGPD, incluindo Cláusulas Contratuais-Tipo aprovadas pela Comissão Europeia.

## 8. Atualizações a esta política

A MOOVIA reserva-se o direito de atualizar a presente Política de Cookies sempre que necessário, nomeadamente em consequência de alterações legislativas ou de mudanças nos serviços utilizados. A versão mais recente estará sempre disponível em www.mooviaportugal.com/politica-cookies.

Em caso de alterações significativas, o utilizador será informado através de um aviso visível no website.

## 9. Contacto

Para qualquer questão relacionada com a presente Política de Cookies ou com o tratamento de dados pessoais:

**MOOVIA PORTUGAL, LDA.**

- E-mail: privacy@mooviaportugal.com
- Website: www.mooviaportugal.com
$md$,
  now()
)
ON CONFLICT (slug) DO UPDATE
SET title = EXCLUDED.title,
    content = EXCLUDED.content,
    updated_at = now();
