import { Badge } from "./ui/badge";
import { Code2, Server, Database, Cloud, Smartphone, Globe } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";

export function CredibilitySection() {
  const isMobile = useIsMobile();
  const techStack = {
    "Linguagens": [
      ".NET Core / MAUI",
      "C#, VB.NET",
      "PHP",
      "Python",
      "JavaScript/TypeScript",
      "Delphi"
    ],
    "Frontend": [
      "React / Next.js",
      "Angular / Vue.js",
      "jQuery / Bootstrap",
      "HTML5 / CSS3",
      "Tailwind CSS"
    ],
    "Backend & DB": [
      "SQL Server",
      "MySQL / PostgreSQL",
      "APIs RESTful",
      "Stored Procedures",
      "Entity Framework"
    ],
    "Cloud & DevOps": [
      "AWS (EC2, S3, RDS)",
      "Azure",
      "Lambda / Functions",
      "CloudFront",
      "Service Bus"
    ],
    "E-commerce": [
      "Plataformas Web",
      "Gestão de Produtos",
      "Pagamentos Online",
      "Integrações"
    ],
    "ERP & CRM": [
      "Sistemas Contábeis",
      "Notas Fiscais",
      "Controle Financeiro",
      "Gestão Comercial"
    ]
  };

  const icons = {
    "Linguagens": Code2,
    "Frontend": Globe,
    "Backend & DB": Database,
    "Cloud & DevOps": Cloud,
    "E-commerce": Smartphone,
    "ERP & CRM": Server
  };

  return (
    <section className="relative py-12 md:py-20 bg-zinc-900/30" id="experiencia">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Mais de{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              20 Anos de Experiência
            </span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-3xl mx-auto mb-6" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Desenvolvedor Sênior e Tech Lead com expertise comprovada em soluções corporativas, 
            e-commerce, ERP, CRM e tecnologias de ponta
          </p>
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto">
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              {isMobile ? (
                "Nossa missão é capacitar empresas a otimizar suas operações através de tecnologias avançadas e ferramentas intuitivas. Desenvolvemos soluções flexíveis, escaláveis e adaptáveis às necessidades específicas de cada negócio."
              ) : (
                "Nossa missão é capacitar empresas a otimizar suas operações através de tecnologias avançadas e ferramentas intuitivas. Acreditamos que cada negócio é único e merece soluções personalizadas que realmente façam a diferença no dia a dia. Por isso, desenvolvemos sistemas flexíveis, escaláveis e totalmente adaptáveis às necessidades específicas de cada cliente, garantindo que a tecnologia seja uma aliada estratégica no crescimento e sucesso do seu negócio."
              )}
            </p>
          </div>
        </div>

        {/* Main Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-6 text-center">
            <div className="text-4xl text-amber-500 mb-2">20+</div>
            <div className="text-white mb-2">Anos de Experiência</div>
            <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              {isMobile ? (
                "Expertise sólida em desenvolvimento de sistemas contábeis, comerciais e plataformas de e-commerce"
              ) : (
                "Expertise sólida comprovada em desenvolvimento de sistemas contábeis complexos, plataformas comerciais robustas e e-commerce de alta performance. Atuando desde o planejamento arquitetural até a entrega final, com foco em soluções escaláveis que acompanham o crescimento do negócio, sempre utilizando as melhores práticas de engenharia de software e segurança da informação."
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border border-blue-500/30 rounded-2xl p-6 text-center">
            <div className="text-4xl text-blue-500 mb-2">30+</div>
            <div className="text-white mb-2">Tecnologias Dominadas</div>
            <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              {isMobile ? (
                "Stack completo: .NET, PHP, Python, React, Angular, AWS, Azure e muito mais"
              ) : (
                "Domínio de stack tecnológico completo e atualizado: .NET Core/MAUI, C#, PHP, Python, JavaScript/TypeScript, React, Angular, Vue.js, SQL Server, MySQL, PostgreSQL, AWS (EC2, S3, Lambda, RDS), Azure, Docker, APIs RESTful e muito mais. Versatilidade para escolher sempre a melhor tecnologia para cada tipo de projeto, garantindo performance, segurança e custo-benefício ideal."
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/10 to-pink-600/10 border border-purple-500/30 rounded-2xl p-6 text-center">
            <div className="text-4xl text-purple-500 mb-2">100%</div>
            <div className="text-white mb-2">Soluções Personalizadas</div>
            <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              {isMobile ? (
                "Cada projeto é desenvolvido sob medida para atender suas necessidades específicas"
              ) : (
                "Cada projeto é desenvolvido 100% sob medida para atender suas necessidades específicas e processos únicos. Não trabalhamos com pacotes prontos genéricos. Fazemos levantamento detalhado de requisitos, entendemos seu fluxo de trabalho, identificamos gargalos e desenvolvemos uma solução personalizada que se adapta perfeitamente à sua realidade, com interfaces intuitivas e funcionalidades que realmente agregam valor."
              )}
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-12">
          <h3 className="text-white text-center mb-8">Stack Tecnológico</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(techStack).map(([category, technologies]) => {
              const Icon = icons[category as keyof typeof icons];
              return (
                <div
                  key={category}
                  className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8 hover:border-amber-500/50 transition-colors flex flex-col"
                >
                  {/* Ícone centralizado em linha única */}
                  <div className="flex justify-center mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Título centralizado */}
                  <h4 className="text-white font-semibold text-center mb-4">{category}</h4>
                  
                  {/* Badges justificados */}
                  <div className="flex flex-wrap gap-2 w-full" style={{ justifyContent: 'space-between' }}>
                    {technologies.map((tech, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-zinc-700 text-zinc-300 hover:border-amber-500/50 hover:text-amber-500 transition-colors text-xs px-2 py-1"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Competencies */}
        <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-8">
          <h3 className="text-white text-center mb-8">Competências Principais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-white mb-1">Desenvolvimento de Software</div>
                  <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    {isMobile ? (
                      "Criação de controles ActiveX, otimização de consultas SQL, resolução de problemas complexos"
                    ) : (
                      "Criação de controles ActiveX customizados, componentes reutilizáveis, otimização avançada de consultas SQL e stored procedures, resolução de problemas complexos de performance, debug de sistemas legados, refatoração de código e implementação de arquiteturas modernas (MVC, MVVM, Clean Architecture)"
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-white mb-1">Sistemas Empresariais</div>
                  <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    {isMobile ? (
                      "Plataformas de e-commerce, ERP, CRM com gestão completa de clientes e processos"
                    ) : (
                      "Desenvolvimento completo de plataformas de e-commerce escaláveis, sistemas ERP integrados com todos os módulos (financeiro, estoque, compras, vendas), CRM com automação de marketing e vendas, gestão completa do ciclo de vida do cliente, workflows automatizados e dashboards gerenciais em tempo real"
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-white mb-1">Soluções Fiscais</div>
                  <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    {isMobile ? (
                      "Emissão de notas fiscais, DARFs, controle financeiro e contabilidade"
                    ) : (
                      "Emissão automatizada de notas fiscais eletrônicas (NF-e, NFS-e, CT-e), geração de DARFs, SPED Fiscal e Contábil, integração com sistemas de contabilidade, controle de impostos (ICMS, IPI, PIS, COFINS), conciliação bancária automatizada e relatórios fiscais completos"
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-white mb-1">Cloud & DevOps</div>
                  <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    {isMobile ? (
                      "Administração de servidores AWS/Azure, scripts automatizados, backups e segurança"
                    ) : (
                      "Administração completa de servidores cloud (AWS EC2, S3, Lambda, RDS, CloudFront / Azure VM, Storage, Functions), implementação de CI/CD, scripts automatizados para deploy e manutenção, configuração de load balancers, estratégias de backup e disaster recovery, hardening de servidores, firewall, SSL/TLS e políticas de segurança"
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-white mb-1">Atendimento ao Cliente</div>
                  <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    {isMobile ? (
                      "Customização de sistemas, levantamento de requisitos e alinhamento com expectativas"
                    ) : (
                      "Customização avançada de sistemas conforme necessidades específicas de cada cliente, levantamento detalhado de requisitos funcionais e não-funcionais, análise de processos de negócio, prototipagem, apresentação de soluções técnicas, alinhamento contínuo com expectativas e acompanhamento pós-implantação para garantir sucesso do projeto"
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                <div>
                  <div className="text-white mb-1">Banco de Dados</div>
                  <div className="text-zinc-400 text-sm text-justify" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                    {isMobile ? (
                      "SQL Server, MySQL, otimização de queries, stored procedures e administração avançada"
                    ) : (
                      "Domínio completo de SQL Server, MySQL e PostgreSQL: modelagem de dados, normalização, criação de índices estratégicos, otimização profunda de queries complexas, desenvolvimento de stored procedures, triggers, functions, views materializadas, administração de backups, replicação, particionamento de tabelas e tuning de performance"
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}