import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { createTenantUser } from "@/lib/tenants.functions";
import { useServerFn } from "@tanstack/react-start";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  Plus, 
  Building2, 
  Mail, 
  Trash2, 
  UserPlus, 
  UserCircle, 
  ShieldCheck,
  Building
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/admin/companies")({
  component: CompaniesAdmin,
});

function CompaniesAdmin() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [expatriates, setExpatriates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<"company" | "expatriate">("company");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    expatriateId: ""
  });

  const createTenant = useServerFn(createTenantUser);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [companiesRes, expatriatesRes] = await Promise.all([
      supabase.from("companies" as any).select("*").order("created_at", { ascending: false }),
      supabase.from("expatriates" as any).select("*").order("name_masked", { ascending: true })
    ]);
    
    setCompanies(companiesRes.data || []);
    setExpatriates(expatriatesRes.data || []);
    setLoading(false);
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-display font-light text-white mb-1">Empresas Clientes</h1>
          <p className="text-w35 text-xs uppercase tracking-widest">Gestão de acesso multi-tenant</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gold text-black hover:bg-gold-l">
              <Plus className="mr-2 h-4 w-4" /> Novo Acesso
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black-2 border-b18 text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-light text-gold">Criar Novo Acesso</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 pt-4">
              <div className="space-y-3">
                <Label className="text-w35 text-[10px] uppercase tracking-widest">Tipo de utilizador</Label>
                <RadioGroup 
                  defaultValue="company" 
                  onValueChange={(v) => setUserType(v as any)}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2 bg-black-3 p-3 rounded-sm border border-b18 flex-1 cursor-pointer">
                    <RadioGroupItem value="company" id="company" className="border-gold text-gold" />
                    <Label htmlFor="company" className="text-xs uppercase tracking-widest cursor-pointer">Empresa</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-black-3 p-3 rounded-sm border border-b18 flex-1 cursor-pointer">
                    <RadioGroupItem value="expatriate" id="expatriate" className="border-gold text-gold" />
                    <Label htmlFor="expatriate" className="text-xs uppercase tracking-widest cursor-pointer">Colaborador</Label>
                  </div>
                </RadioGroup>
              </div>

              {userType === "company" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-[10px] uppercase tracking-widest text-w35">Nome da Empresa</Label>
                    <Input 
                      id="companyName" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="bg-black-3 border-b18 text-white focus:border-gold" 
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-[10px] uppercase tracking-widest text-w35">Associar a expatriado existente</Label>
                    <Select onValueChange={(v) => setFormData({...formData, expatriateId: v})}>
                      <SelectTrigger className="bg-black-3 border-b18 text-white">
                        <SelectValue placeholder="Selecionar expatriado" />
                      </SelectTrigger>
                      <SelectContent className="bg-black-2 border-b18 text-white">
                        {expatriates.map(exp => (
                          <SelectItem key={exp.id || exp.email} value={exp.id || exp.email} className="focus:bg-gold focus:text-black">
                            {exp.name_masked || exp.email || "Sem nome"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-w35">E-mail de Login</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="exemplo@empresa.com" 
                  className="bg-black-3 border-b18 text-white focus:border-gold" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="pass" className="text-[10px] uppercase tracking-widest text-w35">Password Temporária</Label>
                <Input 
                  id="pass" 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                  className="bg-black-3 border-b18 text-white focus:border-gold" 
                />
              </div>

              <Button 
                onClick={async () => {
                  const { email, password, name: compName, expatriateId } = formData;
                  const name = userType === 'company' ? compName : 'Colaborador';
                  
                  if (!email || !password) {
                    toast.error("E-mail e password obrigatórios.");
                    return;
                  }

                  if (userType === 'company' && !compName) {
                    toast.error("Nome da empresa é obrigatório.");
                    return;
                  }

                  try {
                    toast.loading("A processar registo...", { id: "create-tenant" });
                    
                    const result = await createTenant({
                      data: {
                        type: userType,
                        email,
                        password,
                        name,
                        expatriateId: userType === 'expatriate' ? expatriateId : undefined
                      }
                    });
                    
                    if (result.success) {
                      toast.success("Acesso configurado com sucesso.", { id: "create-tenant" });
                      setFormData({ name: "", email: "", password: "", expatriateId: "" });
                      setIsDialogOpen(false);
                      fetchData();
                    }
                  } catch (e: any) {
                    toast.error(e.message || "Erro na criação do acesso.", { id: "create-tenant" });
                  }
                }}
                  const name = userType === 'company' ? compName : 'Colaborador';
                  
                  if (!email || !password) {
                    toast.error("Email e password obrigatórios");
                    return;
                  }

                  if (userType === 'company' && !name) {
                    toast.error("Nome da empresa obrigatório");
                    return;
                  }

                  if (userType === 'expatriate' && !expatriateId) {
                    toast.error("Selecione um expatriado");
                    return;
                  }

                  try {
                    toast.loading("A criar acesso...", { id: "create-tenant" });
                    await createTenant({
                      data: {
                        type: userType,
                        email,
                        password,
                        name,
                        expatriateId: userType === 'expatriate' ? expatriateId : undefined
                      }
                    });
                    
                    toast.success("Acesso criado com sucesso", { id: "create-tenant" });
                    setIsDialogOpen(false);
                    fetchData();
                  } catch (e: any) {
                    toast.error(e.message || "Erro ao criar acesso", { id: "create-tenant" });
                  }
                }}
                className="w-full bg-gold text-black hover:bg-gold-l font-bold uppercase tracking-widest py-6"
              >
                Criar Acesso e Enviar Convite
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-w35">Carregando...</p>
        ) : companies.length === 0 ? (
          <p className="text-w35">Nenhuma empresa encontrada.</p>
        ) : (
          companies.map(company => (
            <Card key={company.id} className="bg-black-2 border-b18 group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gold" />
                  {company.name}
                </CardTitle>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-[10px] text-w35 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-3 w-3" />
                  Acesso Multi-tenant Ativo
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Button variant="outline" size="sm" className="border-b18 text-w35 text-[10px] uppercase tracking-widest hover:border-gold hover:text-gold">
                    <Mail className="mr-2 h-3 w-3" /> Convite
                  </Button>
                  <Button variant="destructive" size="sm" className="text-[10px] uppercase tracking-widest">
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
