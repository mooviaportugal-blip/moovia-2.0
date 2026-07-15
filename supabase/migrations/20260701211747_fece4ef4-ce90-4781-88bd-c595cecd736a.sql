
UPDATE public.legal_pages
SET title = 'Política de Cookies',
    content = $md$
## 1. O que são cookies

Cookies são pequenos arquivos de texto que são colocados no seu dispositivo (computador, tablet ou celular) quando você visita um site. Permitem que o site reconheça o seu dispositivo em uma visita seguinte, lembre suas preferências e nos ajude a melhorar a experiência de navegação.

Além de cookies, podemos utilizar tecnologias semelhantes como web beacons, pixels de rastreamento e armazenamento local, que funcionam de forma análoga e estão igualmente abrangidos pela presente política.

## 2. Quais cookies utilizamos

Os cookies utilizados no nosso site dividem-se em quatro categorias:

**ESSENCIAIS** , Necessários para o funcionamento básico do site. Não podem ser desativados pois sem eles o site não funciona corretamente.

- Gerenciamento da sessão de navegação
- Memorização do consentimento de cookies
- Segurança e prevenção de fraude
- Funcionamento do formulário de contato

**FUNCIONAIS** , Permitem funcionalidades avançadas e personalização. O site funciona sem eles, mas com experiência reduzida.

- Agendamento via Calendly (Conversas Gratuitas e Avaliações Estratégicas)
- Assistente virtual MAIA , memorização de preferências de interação
- Preferências de idioma
- Reprodução do player de som MOOVIA Soundscapes

**ANALÍTICOS** , Permitem-nos compreender como os visitantes utilizam o site, para que possamos melhorá-lo. Toda a informação é agregada e anônima.

- Google Analytics , páginas visitadas, tempo de permanência, origem do tráfego
- Google Search Console , desempenho nas pesquisas

**MARKETING** , Utilizados para medir a eficácia das nossas campanhas e, com o seu consentimento, apresentar conteúdo relevante em outras plataformas. Só são ativados com consentimento explícito.

- Meta Pixel (Facebook/Instagram) , medição de campanhas
- Google Ads , conversões e remarketing

## 3. Lista detalhada de cookies

A tabela seguinte identifica os principais cookies utilizados no nosso site:

| Cookie / Fornecedor | Finalidade | Duração | Categoria |
|---|---|---|---|
| _ga, _gid | Análise de tráfego (Google Analytics) | Até 2 anos | Analítico |
| _gac_* | Conversões Google Ads | Até 90 dias | Marketing |
| calendly.* | Funcionalidade de agendamento | Sessão / persistente | Funcional |
| __stripe_mid, __stripe_sid | Segurança de pagamento (Stripe) | Até 1 ano | Essencial |
| _fbp, _fbc | Meta Pixel (Facebook) | Até 90 dias | Marketing |
| moovia_sound_* | Preferências de som do site | Persistente (localStorage) | Funcional |
| moovia_cookie_consent | Memorização do consentimento | Até 12 meses | Essencial |
| MAIA_session | Sessão do assistente virtual | Sessão | Funcional |

Esta lista pode não ser exaustiva. Para obter a lista completa e atualizada de cookies, você pode inspecionar o seu navegador ou entrar em contato conosco através do e-mail privacy@mooviaportugal.com.

## 4. Cookies de terceiros

Alguns cookies são colocados por terceiros cujos serviços utilizamos no nosso site. Esses terceiros têm as suas próprias políticas de privacidade e de cookies, pelas quais são responsáveis:

| Terceiro | Finalidade | Política de Privacidade |
|---|---|---|
| Google Analytics | Análise de tráfego e comportamento | policies.google.com |
| Google Ads | Publicidade e conversões | policies.google.com |
| Calendly | Agendamento online | calendly.com/privacy |
| Stripe | Processamento de pagamentos | stripe.com/privacy |
| Meta (Facebook) | Publicidade (Meta Pixel) | facebook.com/privacy |
| Supabase | Banco de dados e autenticação | supabase.com/privacy |
| Resend | E-mail transacional | resend.com/privacy |

## 5. Como gerenciar suas preferências

### 5.1. Painel de preferências do site

Ao visitar o nosso site pela primeira vez, é apresentado um aviso de cookies com as seguintes opções:

- **Aceitar todos** , ativa todas as categorias de cookies
- **Rejeitar não essenciais** , ativa apenas os cookies estritamente necessários
- **Personalizar** , permite escolher categoria a categoria

Você pode alterar suas preferências a qualquer momento através do link "Gerenciar Cookies" disponível no rodapé do site. Sua escolha é guardada por 12 meses.

### 5.2. Configurações do navegador

Você também pode controlar cookies através das configurações do seu navegador. Note que bloquear cookies essenciais pode afetar o funcionamento do site:

| Navegador | Caminho |
|---|---|
| Google Chrome | Configurações → Privacidade e segurança → Cookies |
| Mozilla Firefox | Configurações → Privacidade e segurança → Cookies |
| Safari | Preferências → Privacidade → Cookies |
| Microsoft Edge | Configurações → Privacidade, pesquisa e serviços → Cookies |

## 6. Base legal para a utilização de cookies

A utilização de cookies no nosso site tem as seguintes bases legais no âmbito do RGPD e da legislação portuguesa (Lei 41/2004, alterada pela Lei 46/2012):

- **Cookies essenciais:** interesse legítimo no funcionamento do site (Art. 6.º/1/f RGPD)
- **Cookies funcionais, analíticos e de marketing:** consentimento do usuário (Art. 6.º/1/a RGPD)

## 7. Transferências internacionais

Alguns dos terceiros mencionados nesta política estão estabelecidos fora do Espaço Econômico Europeu (EEE), especialmente nos Estados Unidos da América. As transferências são realizadas no âmbito de mecanismos adequados nos termos do Art. 46.º RGPD, incluindo Cláusulas Contratuais-Padrão aprovadas pela Comissão Europeia.

## 8. Atualizações desta política

A MOOVIA reserva-se o direito de atualizar a presente Política de Cookies sempre que necessário, especialmente em decorrência de alterações legislativas ou de mudanças nos serviços utilizados. A versão mais recente estará sempre disponível em www.mooviaportugal.com/politica-cookies.

Em caso de alterações significativas, o usuário será informado através de um aviso visível no site.

## 9. Contato

Para qualquer questão relacionada à presente Política de Cookies ou ao tratamento de dados pessoais:

**MOOVIA PORTUGAL, LDA.**

- E-mail: privacy@mooviaportugal.com
- Site: www.mooviaportugal.com
$md$,
    updated_at = now()
WHERE slug = 'politica-cookies';
