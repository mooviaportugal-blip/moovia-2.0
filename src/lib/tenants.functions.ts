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
    // 1. Verificar se quem chama é admin
    const { data: adminData } = await context.supabase
      .from("admin_users")
      .select("role")
      .eq("id", context.userId)
      .maybeSingle();

    if (!adminData) {
      throw new Error("Apenas administradores podem criar acessos");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 2. Criar utilizador no Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { name: data.name },
    });

    if (authError || !authUser.user) {
      throw new Error(authError?.message || "Erro ao criar utilizador no Auth");
    }

    const userId = authUser.user.id;

    try {
      if (data.type === "company") {
        // Criar Empresa
        const { data: company, error: companyErr } = await supabaseAdmin
          .from("companies" as any)
          .insert({ name: data.name })
          .select()
          .single();

        if (companyErr) throw companyErr;

        // Associar como Admin da Empresa
        const { error: roleErr } = await supabaseAdmin
          .from("company_users" as any)
          .insert({
            company_id: (company as any).id,
            user_id: userId,
            role: "admin"
          });

        if (roleErr) throw roleErr;
      } else {
        // É Expatriado
        if (!data.expatriateId) throw new Error("ID do expatriado é obrigatório");

        // Buscar a empresa do expatriado (assumindo que já existe ou vinculando à empresa do manager)
        const { data: expData, error: expFetchErr } = await supabaseAdmin
          .from("expatriates" as any)
          .select("company_id")
          .eq("id", data.expatriateId)
          .single();

        if (expFetchErr) throw expFetchErr;

        // Associar Role
        const { error: roleErr } = await supabaseAdmin
          .from("company_users" as any)
          .insert({
            company_id: (expData as any).company_id,
            user_id: userId,
            role: "expatriate"
          });

        if (roleErr) throw roleErr;
      }

      return { success: true, userId };
    } catch (err: any) {
      // Rollback Auth user if database steps fail
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(err.message || "Erro ao configurar perfil do utilizador");
    }
  });
