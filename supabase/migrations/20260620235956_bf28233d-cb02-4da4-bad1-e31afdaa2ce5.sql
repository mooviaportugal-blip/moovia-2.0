
CREATE TABLE public.legal_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.legal_pages TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.legal_pages TO authenticated;
GRANT ALL ON public.legal_pages TO service_role;

ALTER TABLE public.legal_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "legal_pages_public_read"
  ON public.legal_pages FOR SELECT
  USING (true);

CREATE POLICY "legal_pages_admin_insert"
  ON public.legal_pages FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT id FROM public.admin_users));

CREATE POLICY "legal_pages_admin_update"
  ON public.legal_pages FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM public.admin_users))
  WITH CHECK (auth.uid() IN (SELECT id FROM public.admin_users));

CREATE POLICY "legal_pages_admin_delete"
  ON public.legal_pages FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT id FROM public.admin_users));

CREATE TRIGGER trg_legal_pages_updated_at
  BEFORE UPDATE ON public.legal_pages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.legal_pages (slug, title, content) VALUES
('politica-privacidade', 'Política de Privacidade',
$$## 1. Responsável pelo tratamento

MOOVIA Portugal, Lda., com sede em Lisboa, Portugal, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste site, em conformidade com o Regulamento (UE) 2016/679 (RGPD) e a Lei n.º 58/2019.

## 2. Dados recolhidos

Recolhemos apenas os dados que nos fornece voluntariamente nos formulários de contacto e Avaliação Estratégica: nome, e-mail, telefone, país de origem, dimensão do agregado, intenção de mudança e mensagem livre. Adicionalmente registamos dados técnicos (IP, browser, páginas visitadas) para fins analíticos.

## 3. Finalidades

Os dados são tratados para: (i) responder ao seu pedido de contacto; (ii) prestar os serviços contratados; (iii) cumprir obrigações legais; (iv) melhorar a experiência do site através de métricas agregadas.

## 4. Fundamento legal

Consentimento (art. 6.º/1/a do RGPD), execução de contrato (art. 6.º/1/b) e interesse legítimo (art. 6.º/1/f) na melhoria contínua do serviço.

## 5. Conservação

Os dados são conservados pelo tempo estritamente necessário às finalidades acima e, em qualquer caso, nunca para além dos prazos legais aplicáveis (até 10 anos para registos contabilísticos).

## 6. Partilha com terceiros

Não vendemos nem cedemos os seus dados. Podem ser partilhados com subcontratantes (alojamento cloud, e-mail transacional, ferramentas de análise) sujeitos a acordos de tratamento e a transferências seguras dentro do EEE.

## 7. Os seus direitos

Pode exercer, a qualquer momento, os direitos de acesso, retificação, apagamento, limitação, portabilidade e oposição, contactando-nos para [privacidade@mooviaportugal.com](mailto:privacidade@mooviaportugal.com). Tem ainda o direito de reclamar junto da CNPD.

## 8. Segurança

Implementamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda ou destruição.
$$),
('politica-cookies', 'Política de Cookies',
$$## 1. O que são cookies

Cookies são pequenos ficheiros de texto armazenados no seu dispositivo quando visita um site. Permitem reconhecer o seu navegador e recolher informação sobre a utilização do site.

## 2. Cookies que utilizamos

- **Essenciais**: necessários ao funcionamento do site (sessão, preferências de idioma, consentimento).
- **Analíticos**: ajudam-nos a perceber como o site é utilizado, de forma agregada e anónima.
- **Funcionais**: melhoram a experiência (ex.: lembrar preferências).

## 3. Gestão de cookies

Pode aceitar, recusar ou gerir os cookies a qualquer momento através do banner de consentimento ou das definições do seu navegador. A recusa de cookies não essenciais não impede a navegação no site.

## 4. Cookies de terceiros

Alguns serviços que utilizamos (analytics, vídeo, mapas) podem instalar os seus próprios cookies, sujeitos às políticas de privacidade dos respetivos fornecedores.

## 5. Atualizações

Esta política pode ser atualizada periodicamente. Recomendamos a sua consulta regular.
$$),
('termos-condicoes', 'Termos e Condições',
$$## 1. Aceitação dos termos

Ao aceder e utilizar este site, declara aceitar integralmente os presentes Termos e Condições. Se não concordar, deve abster-se de utilizar o site e os serviços da MOOVIA Portugal.

## 2. Objeto

A MOOVIA Portugal disponibiliza informação sobre serviços de consultoria em mobilidade internacional, fiscalidade, imobiliário e apoio à integração em Portugal.

## 3. Propriedade intelectual

Todo o conteúdo do site (textos, imagens, logótipos, vídeos, código) é propriedade da MOOVIA Portugal ou licenciado, estando protegido pela legislação aplicável. É proibida a reprodução sem autorização escrita prévia.

## 4. Responsabilidade

A informação prestada no site é de carácter genérico e não substitui aconselhamento profissional individualizado. A MOOVIA Portugal não se responsabiliza por decisões tomadas com base exclusiva no conteúdo do site.

## 5. Serviços contratados

Os serviços de consultoria prestados pela MOOVIA Portugal regem-se por contrato específico, que prevalece sobre estes Termos em caso de conflito.

## 6. Proteção de dados

O tratamento de dados pessoais rege-se pela [Política de Privacidade](/politica-privacidade).

## 7. Lei aplicável e foro

Os presentes Termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio é competente o foro da comarca de Lisboa, com expressa renúncia a qualquer outro.

## 8. Contacto

Para qualquer esclarecimento, contacte [legal@mooviaportugal.com](mailto:legal@mooviaportugal.com).
$$);
