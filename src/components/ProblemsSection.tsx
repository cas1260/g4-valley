import { AlertCircle, TrendingDown, Clock, DollarSign } from "lucide-react";
import { useIsMobile } from "../hooks/useMediaQuery";

export function ProblemsSection() {
  const isMobile = useIsMobile();
  const problems = [
    {
      icon: Clock,
      title: "Processos Manuais",
      description: "Sua equipe perde horas em tarefas repetitivas que poderiam ser automatizadas?",
      color: "from-red-500 to-rose-600",
    },
    {
      icon: TrendingDown,
      title: "Falta de Controle",
      description: "Dificuldade para acompanhar vendas, estoque e relacionamento com clientes?",
      color: "from-orange-500 to-amber-600",
    },
    {
      icon: DollarSign,
      title: "Custos Elevados",
      description: "Gastando muito com soluções que não conversam entre si?",
      color: "from-amber-500 to-yellow-600",
    },
    {
      icon: AlertCircle,
      title: "Tecnologia Defasada",
      description: "Seu sistema não acompanha o crescimento do seu negócio?",
      color: "from-yellow-500 to-orange-600",
    },
  ];

  return (
    <section className="relative bg-zinc-900/30" id="solucoes">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-white mb-4" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            Estes Problemas Estão{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">
              Limitando Seu Crescimento
            </span>
            ?
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            A tecnologia certa pode eliminar gargalos e multiplicar seus resultados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className="group relative bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10 text-center"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white mb-3" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>{problem.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed text-center">
                  {problem.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Solution Statement */}
        <div className="mt-16 bg-gradient-to-r from-amber-500/10 to-orange-600/10 border border-amber-500/30 rounded-2xl p-8 text-center">
          <p className="text-white text-xl mb-2">
            A boa notícia?{" "}
            <span className="text-amber-500">Tudo isso tem solução!</span>
          </p>
          <p className="text-zinc-300 text-justify w-full" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)' }}>
            {isMobile ? (
              "Tecnologias como IA, automação e sistemas integrados podem resolver esses desafios e impulsionar seu negócio"
            ) : (
              "Tecnologias como Inteligência Artificial, automação de processos e sistemas integrados (ERP/CRM) podem resolver esses desafios de forma eficiente. Nossas soluções conectam todos os setores da sua empresa em uma única plataforma, eliminando retrabalho, reduzindo erros humanos e proporcionando visibilidade completa do seu negócio em tempo real. Isso resulta em decisões mais rápidas, custos operacionais reduzidos e crescimento sustentável."
            )}
          </p>
        </div>
      </div>
    </section>
  );
}