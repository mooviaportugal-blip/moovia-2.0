import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CreateTenantSchema = z.object({
  type: z.enum(["company", "expatriate"]),
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1),
  expatriateId: z.string().uuid().optional(),
});

export const createTenantUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CreateTenantSchema.parse(d))
  .handler(async ({ data, context }) => {
    // 1. Verificação de permissões do administrador
    const { data: adminData, error: adminCheckError } = await context.supabase
      .from("admin_users")
      .select("role")
      .eq("id", context.userId)
      .maybeSingle();

    console.log("[createTenantUser] Admin check for user:", context.userId, "Result:", adminData, "Error:", adminCheckError);

    if (adminCheckError) throw new Error("Erro na base de dados ao validar administrador.");
    if (!adminData) throw new Error("Acesso negado: apenas administradores podem criar utilizadores.");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 2. Criar utilizador no Auth (usando admin client)
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { name: data.name },
    });

    console.log("[createTenantUser] Auth user creation result:", authUser?.user?.id, "Error:", authError);

    if (authError || !authUser.user) {
      throw new Error(authError?.message || "Erro ao criar utilizador no sistema de autenticação.");
    }

    const userId = authUser.user.id;

    try {
      if (data.type === "company") {
        // Fluxo de criação de empresa
        const { data: company, error: companyErr } = await supabaseAdmin
          .from("companies")
          .insert({ name: data.name })
          .select()
          .single();

        if (companyErr) throw companyErr;

        const { error: roleErr } = await supabaseAdmin
          .from("company_users")
          .insert({
            company_id: (company as any).id,
            user_id: userId,
            role: "admin"
          });

        if (roleErr) throw roleErr;
      } else {
        // Fluxo de criação de colaborador (expatriado)
        // Como não existe tabela 'expatriates', associamos apenas via company_users se tivermos um assessment
        let companyId = null;
        
        if (data.expatriateId) {
          const { data: assessmentData, error: assErr } = await supabaseAdmin
            .from("assessments")
            .select("lead_id")
            .eq("id", data.expatriateId)
            .maybeSingle();

          if (assErr) throw assErr;
          
          // Nota: assessments não tem company_id diretamente no schema lido.
          // Pode ser necessário buscar no lead se houver relação com empresa lá, 
          // ou simplesmente deixar nulo se for um colaborador 'solto' inicialmente.
          // Por agora, associamos o assessment_id como expatriate_id no company_users
        }

        const { error: roleErr } = await supabaseAdmin
          .from("company_users")
          .insert({
            company_id: null, // Pode ser preenchido se descobrirmos a relação
            user_id: userId,
            role: "expatriate",
            expatriate_id: data.expatriateId || null
          });

        if (roleErr) throw roleErr;
      }

      return { success: true, userId };
    } catch (err: any) {
      // Reverter criação do utilizador se o setup da base de dados falhar
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(err.message || "Erro ao configurar perfil de utilizador.");
    }
  });
