import { ArrowRight, Zap } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";
import { Button } from "./ui/button";

export function HeroSection() {
  const isMobile = useIsMobile();
  
  const scrollToContact = () => {
    const ctaSection = document.getElementById('contato');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-32 sm:pt-40 pb-12 sm:pb-20 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(245 158 11 / 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(245 158 11 / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* 3D AI Robot Illustration */}
      <div className="fixed right-0 top-[90px] z-[9999] pointer-events-none opacity-30 md:opacity-80">
        <div className="relative flex items-center justify-center">
          <div 
            className="w-[150px] h-[150px] md:w-[250px] md:h-[250px] bg-gradient-to-br from-amber-500/20 to-orange-600/20 rounded-full blur-3xl absolute animate-pulse"
          />
          <div className="relative z-10">
            <svg 
              width="140" 
              height="140" 
              viewBox="0 0 450 450" 
              className="md:w-[225px] md:h-[225px] drop-shadow-2xl animate-float"
            >
              <defs>
                <linearGradient id="aiGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ea580c" stopOpacity="0.9" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Robot Head */}
              <rect
                x="150"
                y="120"
                width="150"
                height="140"
                rx="20"
                fill="rgba(245, 158, 11, 0.2)"
                stroke="url(#aiGradient)"
                strokeWidth="4"
                filter="url(#glow)"
              />
              
              {/* Robot Eyes */}
              <circle cx="190" cy="170" r="15" fill="url(#aiGradient)" filter="url(#glow)">
                <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="260" cy="170" r="15" fill="url(#aiGradient)" filter="url(#glow)">
                <animate attributeName="opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" />
              </circle>
              
              {/* Robot Antenna */}
              <line x1="225" y1="120" x2="225" y2="80" stroke="url(#aiGradient)" strokeWidth="4" />
              <circle cx="225" cy="70" r="10" fill="url(#aiGradient)" filter="url(#glow)">
                <animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite" />
              </circle>
              
              {/* Robot Body */}
              <rect
                x="130"
                y="270"
                width="190"
                height="120"
                rx="15"
                fill="rgba(245, 158, 11, 0.15)"
                stroke="url(#aiGradient)"
                strokeWidth="4"
                filter="url(#glow)"
              />
              
              {/* AI Circuit Lines */}
              <path
                d="M 160 300 L 200 300 L 200 330 M 200 300 L 250 300 L 250 330 M 250 300 L 290 300"
                stroke="url(#aiGradient)"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              
              {/* Floating Data Particles */}
              <circle cx="100" cy="150" r="4" fill="#f59e0b" opacity="0.6">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -20,-40; 0,0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="350" cy="200" r="3" fill="#ea580c" opacity="0.7">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; 20,-30; 0,0"
                  dur="3s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="120" cy="300" r="3" fill="#f59e0b" opacity="0.5">
                <animateTransform
                  attributeName="transform"
                  type="translate"
                  values="0,0; -15,25; 0,0"
                  dur="3.5s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="w-full" style={{ overflow: 'visible' }}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-orange-600" />
            <span className="text-orange-700 text-sm">⚡ Exclusivo para participantes do G4 Valley 2025</span>
          </div>

          <h1 className="text-white mb-6 leading-tight" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            <span className="block text-3xl sm:text-4xl lg:text-7xl mb-2 mt-5">
              Sua Empresa Está{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
                Perdendo Dinheiro
              </span>
            </span>
            <span className="block text-2xl sm:text-3xl lg:text-5xl mt-2 text-zinc-300" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              Por Falta de Automação?
            </span>
          </h1>
          
          <p className="text-zinc-200 text-lg sm:text-xl lg:text-2xl mb-4 leading-relaxed text-justify break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', overflow: 'visible', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            <span className="text-white">Pare de perder tempo e dinheiro com processos manuais.</span>
          </p>
          
          <p className="text-zinc-300 text-base sm:text-lg lg:text-xl mb-8 leading-relaxed text-justify break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', overflow: 'visible', whiteSpace: 'normal', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            {isMobile ? (
              <>
                Automatize 70% das suas operações com{" "}
                <span className="text-orange-500">Agentes de IA, ERP, CRM e E-commerce</span>{" "}
                desenvolvidos sob medida para o SEU negócio.
              </>
            ) : (
              <>
                Automatize 70% das suas operações com{" "}
                <span className="text-orange-500">Agentes de IA, ERP Integrado, CRM Inteligente e E-commerce Completo</span>{" "}
                desenvolvidos sob medida para o SEU negócio. Nossas soluções eliminam gargalos operacionais, 
                reduzem custos com processos manuais e aumentam a produtividade da sua equipe através de 
                automação inteligente e integração total entre sistemas.
              </>
            )}
            <span className="block mt-2 text-zinc-400 text-justify break-words" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', overflow: 'visible', whiteSpace: 'normal', textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
              {isMobile ? (
                "+ de 20 anos transformando empresas em máquinas de resultados através da tecnologia."
              ) : (
                "Com mais de 20 anos de experiência em desenvolvimento de sistemas empresariais, já transformamos centenas de empresas em máquinas de resultados através da tecnologia, automatizando processos críticos e implementando soluções que realmente fazem a diferença no dia a dia operacional."
              )}
            </span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center">
            <Button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-none h-12 sm:h-14 px-6 sm:px-8 gap-2 text-base sm:text-lg shadow-lg shadow-orange-500/20"
            >
              Quero Automatizar Meu Negócio
              <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <Button
              onClick={() => {
                const servicosSection = document.getElementById('servicos');
                servicosSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="outline"
              className="border-zinc-700 bg-zinc-900/50 text-white hover:bg-zinc-800 hover:border-orange-500/50 hover:text-orange-400 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
            >
              Ver Soluções
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center aspect-square flex flex-col items-center justify-center shadow-lg shadow-orange-500/5 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:border-orange-500/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>20+</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Anos de Experiência</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center aspect-square flex flex-col items-center justify-center shadow-lg shadow-orange-500/5 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:border-orange-500/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>100+</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Projetos Entregues</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center aspect-square flex flex-col items-center justify-center shadow-lg shadow-orange-500/5 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:border-orange-500/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>24h</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Suporte Técnico</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500/10 to-amber-600/10 border border-orange-500/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center aspect-square flex flex-col items-center justify-center shadow-lg shadow-orange-500/5 hover:shadow-xl hover:shadow-orange-500/10 transition-all duration-300 hover:border-orange-500/50">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 mb-2" style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)' }}>15</div>
              <div className="text-zinc-300 text-xs sm:text-sm font-medium">Parcerias Estratégicas</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}