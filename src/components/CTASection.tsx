import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { Send, Calendar, MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import logo from "figma:asset/8a571c4c186a45dd4a865f0b057c6a16f2aebabc.png";
import { useAnalytics } from "../hooks/useAnalytics";

export function CTASection() {
  const { trackFormSubmission } = useAnalytics();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Registrar submissão do formulário (silencioso)
    trackFormSubmission("contact_form", formData);
    
    try {
      // Determinar URL da API baseado no ambiente
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:8080/server/api/contact'
        : '/novidades/server/api/contact';
      
      // Enviar dados para o backend
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        toast.success("Mensagem enviada com sucesso!", {
          description: "Entrarei em contato em breve para agendar nossa conversa no G4 Valley."
        });
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: ""
        });
      } else {
        throw new Error(result.error || 'Erro ao enviar mensagem');
      }
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast.error("Erro ao enviar mensagem", {
        description: "Por favor, tente novamente ou entre em contato diretamente pelo WhatsApp."
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="relative py-12 md:py-20" id="contato">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Vamos Conversar no{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              G4 Valley?
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Agende uma conversa comigo durante o evento. Vou estar lá nos 3 dias para conhecer seu negócio 
            e apresentar soluções personalizadas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-zinc-300">Nome Completo *</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">E-mail *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-zinc-300">Empresa</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Nome da sua empresa"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 h-12"
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="service" className="text-zinc-300">Qual solução te interessa? *</Label>
                <Select value={formData.service} onValueChange={(value) => handleChange("service", value)} required>
                  <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white h-12">
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-700">
                    <SelectItem value="ia" className="text-white hover:bg-zinc-800">Agentes de IA</SelectItem>
                    <SelectItem value="erp" className="text-white hover:bg-zinc-800">Sistema ERP</SelectItem>
                    <SelectItem value="crm" className="text-white hover:bg-zinc-800">CRM</SelectItem>
                    <SelectItem value="ecommerce" className="text-white hover:bg-zinc-800">E-commerce</SelectItem>
                    <SelectItem value="integracao" className="text-white hover:bg-zinc-800">APIs e Integrações</SelectItem>
                    <SelectItem value="consultoria" className="text-white hover:bg-zinc-800">Consultoria TI</SelectItem>
                    <SelectItem value="outro" className="text-white hover:bg-zinc-800">Outro / Não sei ainda</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 mb-6">
                <Label htmlFor="message" className="text-zinc-300">Conte um pouco sobre seu desafio</Label>
                <Textarea
                  id="message"
                  placeholder="Descreva o que você precisa ou qual problema está enfrentando..."
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 min-h-[120px]"
                  rows={5}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none h-12 gap-2 text-lg shadow-lg shadow-amber-500/20"
              >
                <Send className="w-5 h-5" />
                Agendar Conversa no Evento
              </Button>

              <p className="text-zinc-500 text-sm text-center mt-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                Responderei em até 24h para confirmarmos horário e local no G4 Valley
              </p>
            </form>
          </div>

          {/* Contact Info & Benefits */}
          <div className="space-y-6">
            {/* Quick Contact */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <h3 className="text-white mb-4">Contato Direto</h3>
              <div className="space-y-3">
                <a 
                  href="tel:+5531992368155" 
                  className="flex items-center gap-3 text-zinc-300 hover:text-amber-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">Telefone/WhatsApp</div>
                    <div className="text-sm">+55 (31) 99236-8155</div>
                  </div>
                </a>

                <a 
                  href="mailto:cleber@swapsoft.com.br" 
                  className="flex items-center gap-3 text-zinc-300 hover:text-amber-500 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">E-mail</div>
                    <div className="text-sm">cleber@swapsoft.com.br</div>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-zinc-300">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-500">Evento</div>
                    <div className="text-sm">G4 Valley 2025</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Meeting Benefits */}
            <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-amber-500" />
                <h3 className="text-white">O que você ganha:</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-zinc-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>Análise gratuita do seu cenário atual</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>Proposta personalizada para seu negócio</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>Condições especiais para participantes do G4</span>
                </li>
                <li className="flex items-start gap-2 text-zinc-300 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 flex-shrink-0" />
                  <span>Networking direto com tech lead experiente</span>
                </li>
              </ul>
            </div>

            {/* Urgency */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 text-center">
              <MessageSquare className="w-8 h-8 text-amber-500 mx-auto mb-3" />
              <p className="text-zinc-300 text-sm">
                <span className="text-amber-500">Vagas limitadas!</span> Agende sua conversa agora 
                e garanta um horário exclusivo durante o evento.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
          <p className="text-zinc-400" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            💡 <span className="text-white">Dica:</span> Quanto mais detalhes você compartilhar sobre seu desafio, 
            melhor posso preparar uma solução específica para apresentar no nosso encontro.
          </p>
        </div>
      </div>
    </section>
  );
}