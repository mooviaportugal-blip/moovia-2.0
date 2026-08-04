import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { SiteLayout } from "@/components/site/SiteLayout";
import { motion } from "framer-motion";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      // 1. Check if user is Global Admin
      const { data: adminData } = await supabase
        .from("admin_users")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();

      if (adminData) {
        navigate({ to: "/admin" });
        return;
      }

      // 2. Check Role in company_users
      const { data: roleData } = await supabase
        .from("company_users" as any)
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();

      if ((roleData as any)?.role === "expatriate") {
        navigate({ to: "/meu-dashboard" });
      } else {
        navigate({ to: "/dashboard" });
      }
    }
  };

  return (
    <SiteLayout showNav={false} showFooter={false}>
      <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
        {/* Background Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
          <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-gold/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-black-2 border border-b18 p-8 md:p-12 rounded-sm relative shadow-2xl">
            <div className="flex flex-col items-center mb-10">
              <img src="/mooviagold.svg" alt="MOOVIA" className="w-16 h-16 mb-4" />
              <h1 className="font-amotha text-3xl text-white mb-2 uppercase tracking-widest">Portal MOOVIA</h1>
              <p className="font-urbanist text-[11px] text-gold uppercase tracking-[0.3em]">Global Mobility Assurance</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-w35 text-[10px] uppercase tracking-widest mb-2 font-medium">E-mail Corporativo</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-black-3 border border-b18 rounded-sm p-4 text-white font-urbanist text-sm focus:border-gold outline-none transition-all placeholder:text-w35/30"
                  placeholder="exemplo@empresa.com"
                />
              </div>

              <div>
                <label className="block text-w35 text-[10px] uppercase tracking-widest mb-2 font-medium">Palavra-passe</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black-3 border border-b18 rounded-sm p-4 text-white font-urbanist text-sm focus:border-gold outline-none transition-all"
                />
              </div>

              {error && (
                <p className="text-red-500 text-[10px] uppercase tracking-widest text-center bg-red-500/10 p-2 rounded-sm border border-red-500/20">
                  {error === "Invalid login credentials" ? "Credenciais inválidas. Tente novamente." : error}
                </p>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gold text-black py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold-l transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_4px_20px_rgba(173,137,87,0.3)]"
              >
                {loading ? "A AUTENTICAR..." : "ENTRAR NO PORTAL"}
              </button>

              <div className="text-center pt-4">
                <button 
                  type="button"
                  className="text-w35 text-[10px] uppercase tracking-widest hover:text-gold transition-colors"
                >
                  Esqueceu a palavra-passe?
                </button>
              </div>
            </form>
          </div>
          
          <p className="text-center mt-8 text-w35/40 text-[9px] uppercase tracking-widest">
            © 2026 MOOVIA PORTUGAL · ACESSO RESTRITO
          </p>
        </motion.div>
      </div>
    </SiteLayout>
  );
}
