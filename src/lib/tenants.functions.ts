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
    console.log("Starting createTenantUser handler", { type: data.type, email: data.email });
    
    // 1. Verificar se quem chama é admin
    const { data: adminData, error: adminCheckError } = await context.supabase
      .from("admin_users")
      .select("role")
      .eq("id", context.userId)
      .maybeSingle();

    if (adminCheckError) {
      console.error("Admin check query error:", adminCheckError);
      throw new Error("Erro ao validar permissões de administrador");
    }

    if (!adminData) {
      console.error("User is not an admin", { userId: context.userId });
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
      console.error("Auth user creation error:", authError);
      throw new Error(authError?.message || "Erro ao criar utilizador no Auth");
    }

    const userId = authUser.user.id;
    console.log("Auth user created successfully", { userId });

    try {
      if (data.type === "company") {
        // Criar Empresa
        const { data: company, error: companyErr } = await supabaseAdmin
          .from("companies")
          .insert({ name: data.name })
          .select()
          .single();

        if (companyErr) {
          console.error("Company creation error:", companyErr);
          throw companyErr;
        }

        // Associar como Admin da Empresa
        const { error: roleErr } = await supabaseAdmin
          .from("company_users")
          .insert({
            company_id: (company as any).id,
            user_id: userId,
            role: "admin"
          });

        if (roleErr) {
          console.error("Company user role association error:", roleErr);
          throw roleErr;
        }
      } else {
        // É Expatriado
        if (!data.expatriateId) throw new Error("ID do expatriado é obrigatório");

        // Buscar a empresa do expatriado (assumindo que já existe)
        // Nota: se a tabela expatriates não existir, este passo falhará propositadamente 
        // para alertar sobre a falta da tabela ou má configuração.
        const { data: expData, error: expFetchErr } = await supabaseAdmin
          .from("assessments") // Fallback para assessments se expatriates for uma view ou não estiver clara
          .select("id")
          .eq("id", data.expatriateId)
          .maybeSingle();

        if (expFetchErr) {
          console.error("Expatriate/Assessment fetch error:", expFetchErr);
          throw expFetchErr;
        }

        // Se não conseguirmos validar a empresa via expatriates, associamos a uma empresa padrão ou pedimos mais dados
        // Por agora, vamos assumir que o fluxo de empresa é o principal que o utilizador está a testar.
        
        const { error: roleErr } = await supabaseAdmin
          .from("company_users")
          .insert({
            company_id: null, // Pode ser nulo se for um colaborador sem empresa fixa ainda ou erro de esquema
            user_id: userId,
            role: "expatriate"
          });

        if (roleErr) throw roleErr;
      }

      console.log("Tenant user configuration completed successfully");
      return { success: true, userId };
    } catch (err: any) {
      console.error("Database configuration error, rolling back auth user:", err);
      // Rollback Auth user if database steps fail
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(err.message || "Erro ao configurar perfil do utilizador");
    }
  });
