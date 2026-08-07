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
    console.log("[createTenantUser] Starting handler", { type: data.type, email: data.email });
    
    // 1. Check if caller is admin
    const { data: adminData, error: adminCheckError } = await context.supabase
      .from("admin_users")
      .select("role")
      .eq("id", context.userId)
      .maybeSingle();

    if (adminCheckError) {
      console.error("[createTenantUser] Admin check error:", adminCheckError);
      throw new Error("Erro ao validar permissões de administrador");
    }

    if (!adminData) {
      console.error("[createTenantUser] User is not an admin", { userId: context.userId });
      throw new Error("Apenas administradores podem criar acessos");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // 2. Create Auth User
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { name: data.name },
    });

    if (authError || !authUser.user) {
      console.error("[createTenantUser] Auth user creation error:", authError);
      throw new Error(authError?.message || "Erro ao criar utilizador no Auth");
    }

    const userId = authUser.user.id;
    console.log("[createTenantUser] Auth user created", { userId });

    try {
      if (data.type === "company") {
        console.log("[createTenantUser] Creating company", { name: data.name });
        const { data: company, error: companyErr } = await supabaseAdmin
          .from("companies")
          .insert({ name: data.name })
          .select()
          .single();

        if (companyErr) {
          console.error("[createTenantUser] Company creation error:", companyErr);
          throw companyErr;
        }

        console.log("[createTenantUser] Associating company admin", { companyId: (company as any).id, userId });
        const { error: roleErr } = await supabaseAdmin
          .from("company_users")
          .insert({
            company_id: (company as any).id,
            user_id: userId,
            role: "admin"
          });

        if (roleErr) {
          console.error("[createTenantUser] Company user role error:", roleErr);
          throw roleErr;
        }
      } else {
        // Expatriate path
        if (!data.expatriateId) throw new Error("ID do expatriado é obrigatório");
        
        console.log("[createTenantUser] Associating expatriate role", { userId });
        const { error: roleErr } = await supabaseAdmin
          .from("company_users")
          .insert({
            user_id: userId,
            role: "expatriate"
          });

        if (roleErr) {
          console.error("[createTenantUser] Expatriate role error:", roleErr);
          throw roleErr;
        }
      }

      console.log("[createTenantUser] Success");
      return { success: true, userId };
    } catch (err: any) {
      console.error("[createTenantUser] Database error, rolling back auth user:", err);
      await supabaseAdmin.auth.admin.deleteUser(userId);
      throw new Error(err.message || "Erro ao configurar perfil do utilizador");
    }
  });
