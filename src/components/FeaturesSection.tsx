import { MessageSquare, Ticket, BarChart3, MessageCircle, FolderKanban, Workflow, Bot, History } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";

export function FeaturesSection() {
  const isMobile = useIsMobile();
  
  const features = [
    {
      icon: MessageSquare,
      title: "Chat Online de Atendimentos",
      description: "Atenda seus clientes em tempo real com chat integrado e inteligente"
    },
    {
      icon: Ticket,
      title: "Sistema de Ticket Pela Área do Cliente",
      description: "Organize e gerencie solicitações com sistema de tickets completo"
    },
    {
      icon: BarChart3,
      title: "Pesquisa de NPS em Tempo Real",
      description: "Meça a satisfação dos clientes e tome decisões baseadas em dados"
    },
    {
      icon: MessageCircle,
      title: "Atendimento via WhatsApp",
      description: "Integração total com WhatsApp para atender onde seu cliente está"
    },
    {
      icon: History,
      title: "Histórico de Cliente Centralizado",
      description: "Acesse todo o histórico de interações em um único lugar"
    },
    {
      icon: FolderKanban,
      title: "Integração de Quadros (Kanban)",
      description: "Visualize seu pipeline de vendas de forma clara e organizada"
    },
    {
      icon: Workflow,
      title: "Automatize o Fluxo de Trabalho",
      description: "Crie automações personalizadas e economize horas de trabalho manual"
    },
    {
      icon: Bot,
      title: "Automatiza seus Atendimentos",
      description: "Robôs inteligentes que atendem 24/7 e qualificam leads automaticamente"
    }
  ];

  return (
    <section className="relative py-12 md:py-20" id="funcionalidades">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Funcionalidades Que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Potencializam Suas Vendas
            </span>
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-3xl mx-auto text-justify px-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            {isMobile ? (
              "Nosso CRM oferece todas as ferramentas necessárias para transformar seu processo de vendas e atendimento ao cliente"
            ) : (
              "Nosso CRM Inteligente oferece todas as ferramentas necessárias para transformar seu processo de vendas e atendimento ao cliente. Com mais de 9 mil automações incluídas, integração com múltiplos canais e visualização Kanban, você tem tudo para vender mais e melhor."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center border border-amber-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-amber-500" />
                </div>
                <h3 className="text-white text-base md:text-lg font-semibold mb-2" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                  {feature.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* CTA Banner */}
        <div className="mt-12 md:mt-16 bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-3" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Mais de 9.000 Automações Incluídas
          </h3>
          <p className="text-zinc-300 text-base md:text-lg max-w-2xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Nosso CRM vem com milhares de automações pré-configuradas para você começar a vender mais desde o primeiro dia
          </p>
        </div>
      </div>
    </section>
  );
}


