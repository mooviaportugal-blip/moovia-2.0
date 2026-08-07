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
    console.log("[createTenantUser] Início para:", data.email);
    
    // 1. Verificação de permissões do administrador usando o cliente autenticado (context.supabase)
    const { data: adminData, error: adminCheckError } = await context.supabase
      .from("admin_users")
      .select("role")
      .eq("id", context.userId)
      .maybeSingle();

    if (adminCheckError) {
      console.error("[createTenantUser] Erro ao validar admin:", adminCheckError);
      throw new Error("Erro na base de dados ao validar administrador.");
    }
    
    if (!adminData) {
      console.warn("[createTenantUser] Acesso negado para:", context.userId);
      throw new Error("Acesso negado: apenas administradores podem criar utilizadores.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 2. Criar utilizador no Auth (usando admin client)
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { name: data.name },
    });

    if (authError || !authUser.user) {
      console.error("[createTenantUser] Erro no Auth.createUser:", authError);
      throw new Error(authError?.message || "Erro ao criar utilizador no sistema de autenticação.");
    }

    const userId = authUser.user.id;
    console.log("[createTenantUser] Utilizador Auth criado:", userId);

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
        console.log("[createTenantUser] Empresa e Admin vinculados.");
      } else {
        // Fluxo de criação de colaborador (expatriado)
        const { error: roleErr } = await supabaseAdmin
          .from("company_users")
          .insert({
            company_id: null, 
            user_id: userId,
            role: "expatriate",
            expatriate_id: data.expatriateId || null
          });

        if (roleErr) throw roleErr;
        console.log("[createTenantUser] Colaborador vinculado.");
      }

      return { success: true, userId };
    } catch (err: any) {
      console.error("[createTenantUser] Erro no fluxo de BD, revertendo Auth:", err);
      // Reverter criação do utilizador se o setup da base de dados falhar
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(err.message || "Erro ao configurar perfil de utilizador na base de dados.");
    }
  });
