import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const CreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(1).max(120),
  role: z.enum(["admin", "editor", "viewer"]),
  allowed_tabs: z.array(z.string()).default([]),
});

const UpdateSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["owner", "admin", "editor", "viewer"]).optional(),
  allowed_tabs: z.array(z.string()).optional(),
  name: z.string().max(120).optional(),
});

const IdSchema = z.object({ id: z.string().uuid() });

async function assertOwner(supabase: any, userId: string) {
  const { data } = await supabase.from("admin_users").select("role").eq("id", userId).maybeSingle();
  if (!data || (data.role !== "owner" && data.role !== "admin")) {
    throw new Error("Apenas owners/admins podem gerenciar a equipa");
  }
  return data.role;
}

export const createAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => CreateSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
      user_metadata: { name: data.name },
    });
    if (error || !created.user) throw new Error(error?.message || "Falha ao criar usuário");
    const { error: insErr } = await supabaseAdmin.from("admin_users").insert({
      id: created.user.id,
      name: data.name,
      role: data.role,
      allowed_tabs: data.allowed_tabs,
    });
    if (insErr) {
      await supabaseAdmin.auth.admin.deleteUser(created.user.id);
      throw new Error(insErr.message);
    }
    return { id: created.user.id };
  });

export const updateAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => UpdateSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const patch: Record<string, unknown> = {};
    if (data.role !== undefined) patch.role = data.role;
    if (data.allowed_tabs !== undefined) patch.allowed_tabs = data.allowed_tabs;
    if (data.name !== undefined) patch.name = data.name;
    const { error } = await supabaseAdmin.from("admin_users").update(patch as never).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteAdminUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => IdSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertOwner(context.supabase, context.userId);
    if (data.id === context.userId) throw new Error("Você não pode remover a si mesmo");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("admin_users").delete().eq("id", data.id);
    await supabaseAdmin.auth.admin.deleteUser(data.id);
    return { ok: true };
  });
