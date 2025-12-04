import { ArrowRight, Bot, CheckCircle2, Database, ShoppingCart, Users } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

export function ServicesSection() {
  const isMobile = useIsMobile();
  const services = [
    {
      icon: Bot,
      title: "Agentes de IA Personalizados",
      subtitle: "Automação Inteligente",
      descriptionMobile: "Chatbots, assistentes virtuais e automação de processos com IA que trabalham 24/7 para seu negócio",
      descriptionDesktop: "Chatbots inteligentes, assistentes virtuais e automação de processos com IA que trabalham 24/7 para seu negócio. Nossos agentes são treinados especificamente para o seu segmento, entendem contexto, aprendem com interações e executam tarefas complexas automaticamente, desde atendimento ao cliente até análise preditiva de dados, liberando sua equipe para atividades estratégicas.",
      image: "/img/ia-mib.jpg",
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
      descriptionMobile: "Sistema completo para gestão unificada: financeiro, estoque, compras, vendas com compliance garantido e redução de erros",
      descriptionDesktop: "Sistema ERP completo desenvolvido sob medida para gerenciar todas as áreas da sua empresa de forma integrada e unificada. Controle financeiro, estoque em tempo real, compras, vendas, notas fiscais (NF-e, NFS-e), DARFs, contas a pagar e receber, integração bancária e muito mais. Tudo em uma única plataforma centralizada, com dashboards intuitivos e relatórios gerenciais que transformam dados em decisões estratégicas. Compliance garantido, redução drástica de erros operacionais e escalabilidade para acompanhar o crescimento do seu negócio.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
      benefits: [
        "Gestão unificada e compliance garantido",
        "Redução de erros operacionais",
        "Emissão de notas fiscais e DARFs",
        "Escalabilidade para crescimento"
      ],
      badge: "⚡ Alta Demanda",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: Users,
      title: "CRM Inteligente",
      subtitle: "Relacionamento com Clientes",
      descriptionMobile: "Gerencie seu funil de vendas com visualização Kanban, 9 mil automações incluídas e integração com múltiplos canais",
      descriptionDesktop: "Sistema CRM inteligente para gerenciar todo o relacionamento com clientes e pipeline de vendas. Automatize follow-ups, registre todas as interações, acompanhe oportunidades em tempo real e nunca perca uma venda. Com dashboards visuais, visualização Kanban do pipeline, relatórios de performance, integração com WhatsApp, e-mail e telefonia, sua equipe comercial terá todas as ferramentas necessárias para vender mais e melhor. Inclui mais de 9 mil automações pré-configuradas e integração com múltiplos canais de comunicação.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
      benefits: [
        "Pipeline de vendas visual (Kanban)",
        "9 mil automações incluídas",
        "Integração com múltiplos canais",
        "Relatórios e métricas em tempo real"
      ],
      badge: "💼 Essencial",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: ShoppingCart,
      title: "E-commerce Completo",
      subtitle: "Loja Virtual",
      descriptionMobile: "Plataforma de vendas online com design responsivo, personalização total e suporte completo para escalar suas vendas",
      descriptionDesktop: "Plataforma completa de e-commerce para vender online 24/7 com design responsivo e personalização total. Gateway de pagamento integrado (cartão, PIX, boleto), gestão completa de produtos e categorias, controle de estoque sincronizado, cálculo automático de frete, cupons de desconto, integração com marketplaces (Mercado Livre, Amazon, B2W), redes sociais e ferramentas de marketing digital. Tudo para escalar suas vendas online rapidamente com suporte completo em todas as etapas.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&auto=format&fit=crop&q=80",
      benefits: [
        "Design responsivo e personalização total",
        "Gateway de pagamento integrado",
        "Integração com marketplaces",
        "Suporte completo para crescimento"
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
    <section className="relative py-12 md:py-20" id="servicos">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-white mb-4 mt-[15px]" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
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

        <div className="grid grid-cols-1 gap-8 mb-12">
          {services.slice(0, 3).map((service, index) => {
            const Icon = service.icon;
            const isIACard = service.title === "Agentes de IA Personalizados";
            
            return (
              <Card
                key={index}
                className="group bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10"
              >
                <div className={`grid md:grid-cols-2 gap-0 ${isIACard ? 'md:grid-cols-[1.2fr_1fr]' : ''}`}>
                  {/* Image Side - Primeiro no Mobile, Segundo no Desktop */}
                  <div className="relative h-48 sm:h-56 md:h-auto overflow-hidden md:order-2">
                    {isIACard ? (
                      <>
                        <img
                          src="https://www.bhs.com.br/wp-content/uploads/2025/08/PostBlog.png"
                          alt="Agente de IA em escritório"
                          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          style={{ objectPosition: 'center center' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 to-zinc-900/10" />
                      </>
                    ) : (
                      <>
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/80 to-zinc-900/40" />
                      </>
                    )}
                    
                    <div className="absolute top-4 left-4">
                      <span className="text-xs bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3 py-1 rounded-full backdrop-blur-sm">
                        {service.badge}
                      </span>
                    </div>

                    <div className={`absolute bottom-4 left-4 w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content Side - Segundo no Mobile, Primeiro no Desktop */}
                  <div className={`p-6 md:p-8 flex flex-col md:order-1 ${isIACard ? 'md:justify-center' : ''}`}>
                    <div className="mb-4">
                      <div className="text-amber-500 text-sm mb-2">{service.subtitle}</div>
                      <h3 className="text-white mb-3 text-xl md:text-2xl" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{service.title}</h3>
                      <p className="text-zinc-400 text-sm md:text-base leading-relaxed text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                        {isMobile ? service.descriptionMobile : service.descriptionDesktop}
                      </p>
                    </div>

                    <div className="space-y-2 mb-6 flex-1">
                      {service.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <span className="text-zinc-300 text-sm md:text-base">{benefit}</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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