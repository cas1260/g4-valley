import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Bot, Database, Users, ShoppingCart, CheckCircle2, ArrowRight } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";

export function ServicesSection() {
  const isMobile = useIsMobile();
  const services = [
    {
      icon: Bot,
      title: "Agentes de IA Personalizados",
      subtitle: "Automação Inteligente",
      descriptionMobile: "Chatbots, assistentes virtuais e automação de processos com IA que trabalham 24/7 para seu negócio",
      descriptionDesktop: "Chatbots inteligentes, assistentes virtuais e automação de processos com IA que trabalham 24/7 para seu negócio. Nossos agentes são treinados especificamente para o seu segmento, entendem contexto, aprendem com interações e executam tarefas complexas automaticamente, desde atendimento ao cliente até análise preditiva de dados, liberando sua equipe para atividades estratégicas.",
      image: "https://images.unsplash.com/photo-1694903110330-cc64b7e1d21d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwcm9ib3QlMjBidXNpbmVzc3xlbnwxfHx8fDE3NjMwOTAzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      benefits: [
        "Atendimento automatizado ao cliente",
        "Análise inteligente de dados",
        "Automação de tarefas repetitivas",
        "Redução de até 70% em custos operacionais"
      ],
      badge: "🔥 Mais Procurado",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: Database,
      title: "ERP Sob Medida",
      subtitle: "Gestão Empresarial",
      descriptionMobile: "Sistema completo para gerenciar todas as áreas da sua empresa: financeiro, estoque, compras, vendas e muito mais",
      descriptionDesktop: "Sistema ERP completo desenvolvido sob medida para gerenciar todas as áreas da sua empresa de forma integrada. Controle financeiro, estoque em tempo real, compras, vendas, notas fiscais (NF-e, NFS-e), DARFs, contas a pagar e receber, integração bancária e muito mais. Tudo em uma única plataforma centralizada, com dashboards intuitivos e relatórios gerenciais que transformam dados em decisões estratégicas.",
      image: "https://images.unsplash.com/photo-1744230673231-865d54a0aba4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGF1dG9tYXRpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc2MzA4NTY2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      benefits: [
        "Controle financeiro completo",
        "Gestão de estoque em tempo real",
        "Emissão de notas fiscais e DARFs",
        "Integração com bancos e contabilidade"
      ],
      badge: "⚡ Alta Demanda",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "CRM Inteligente",
      subtitle: "Relacionamento com Clientes",
      descriptionMobile: "Gerencie seu funil de vendas, automatize follow-ups e nunca perca uma oportunidade de negócio",
      descriptionDesktop: "Sistema CRM inteligente para gerenciar todo o relacionamento com clientes e pipeline de vendas. Automatize follow-ups, registre todas as interações, acompanhe oportunidades em tempo real e nunca perca uma venda. Com dashboards visuais, relatórios de performance, integração com WhatsApp, e-mail e telefonia, sua equipe comercial terá todas as ferramentas necessárias para vender mais e melhor.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm0lMjBkYXNoYm9hcmQlMjBhbmFseXRpY3N8ZW58MXx8fHwxNzYzMDkwMzkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      benefits: [
        "Pipeline de vendas visual",
        "Automação de follow-ups",
        "Histórico completo de interações",
        "Relatórios e métricas de vendas"
      ],
      badge: "💼 Essencial",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Completo",
      subtitle: "Loja Virtual",
      descriptionMobile: "Plataforma de vendas online com pagamentos, gestão de produtos, integração com marketplaces e muito mais",
      descriptionDesktop: "Plataforma completa de e-commerce para vender online 24/7. Gateway de pagamento integrado (cartão, PIX, boleto), gestão completa de produtos e categorias, controle de estoque sincronizado, cálculo automático de frete, cupons de desconto, integração com marketplaces (Mercado Livre, Amazon, B2W), redes sociais e ferramentas de marketing digital. Tudo para escalar suas vendas online rapidamente.",
      image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBvbmxpbmUlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjMwOTAzOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      benefits: [
        "Catálogo de produtos ilimitado",
        "Gateway de pagamento integrado",
        "Gestão de pedidos e entregas",
        "Integração com redes sociais"
      ],
      badge: "🚀 Escalável",
      color: "from-amber-500 to-orange-600"
    },
  ];

  const scrollToContact = () => {
    const ctaSection = document.getElementById('contato');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative py-20" id="servicos">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Soluções Que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Transformam Negócios
            </span>
          </h2>
          <p className="text-zinc-400 text-lg w-full text-justify px-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            {isMobile ? (
              "Tecnologia personalizada para cada tipo de desafio. Escolha a solução ideal para o seu momento"
            ) : (
              "Desenvolvemos tecnologia personalizada e sob medida para cada tipo de desafio empresarial. Com mais de 20 anos de experiência em sistemas críticos de negócios, criamos soluções que realmente funcionam no dia a dia, integrando processos, automatizando tarefas e gerando resultados mensuráveis. Escolha a solução ideal para o seu momento e veja sua empresa crescer de forma estruturada e escalável."
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {services.slice(0, 3).map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="group bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  {/* Image Side */}
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40" />
                    
                    <div className="absolute top-4 left-4">
                      <span className="text-xs bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full backdrop-blur-sm">
                        {service.badge}
                      </span>
                    </div>

                    <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="p-6 flex flex-col">
                    <div className="mb-4">
                      <div className="text-amber-500 text-sm mb-2">{service.subtitle}</div>
                      <h3 className="text-white mb-3" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{service.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                        {isMobile ? service.descriptionMobile : service.descriptionDesktop}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6 flex-1">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300 text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={scrollToContact}
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none w-full gap-2"
                    >
                      Quero Esta Solução
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Services */}
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-xl">
          <h3 className="text-white text-center mb-6">Também Desenvolvemos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "APIs e Integrações",
              "Dashboards Analytics",
              "Apps Mobile",
              "Sistemas Customizados",
              "Migração de Sistemas",
              "Cloud Computing",
              "Banco de Dados",
              "Consultoria TI"
            ].map((item, i) => (
              <div key={i} className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-center hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 shadow-md">
                <span className="text-zinc-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}