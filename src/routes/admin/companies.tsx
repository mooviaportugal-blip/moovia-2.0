import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Mail, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/companies")({
  component: CompaniesAdmin,
});

function CompaniesAdmin() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data } = await supabase.from("companies").select("*").order("created_at", { ascending: false });
    setCompanies(data || []);
    setLoading(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-1">Empresas Clientes</h1>
          <p className="text-w35 text-xs uppercase tracking-widest">Gestão de acesso multi-tenant</p>
        </div>
        <Button className="bg-gold text-black hover:bg-gold-l">
          <Plus className="mr-2 h-4 w-4" /> Nova Empresa
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-w35">Carregando...</p>
        ) : companies.length === 0 ? (
          <p className="text-w35">Nenhuma empresa encontrada.</p>
        ) : (
          companies.map(company => (
            <Card key={company.id} className="bg-black-2 border-b18">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {company.name}
                </CardTitle>
                <Building2 className="h-4 w-4 text-gold" />
              </CardHeader>
              <CardContent>
                <div className="text-xs text-w35 mb-4">
                  ID: {company.id.slice(0, 8)}...
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" size="sm" className="border-b18 text-w35">
                    <Mail className="mr-2 h-3 w-3" /> Convite
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
