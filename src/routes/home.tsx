import { createFileRoute, redirect } from "@tanstack/react-router";

// A home voltou para "/". Mantemos /home como redirecionamento para
// não quebrar links e favoritos criados durante a página de manutenção.
export const Route = createFileRoute("/home")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "lead-form" });
  },
});
