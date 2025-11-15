import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Users, TrendingUp, Briefcase } from "lucide-react";

export function HighlightsSection() {
  const highlights = [
    {
      title: "Networking Estratégico",
      description: "Conecte-se com investidores, executivos e empreendedores de alto nível",
      image: "https://images.unsplash.com/photo-1571645163064-77faa9676a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNvbmZlcmVuY2UlMjBuZXR3b3JraW5nfGVufDF8fHx8MTc2Mjk5NzA0NHww&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Users,
      badge: "VIP",
      price: "R$ 2.500",
    },
    {
      title: "Conteúdo Exclusivo",
      description: "Palestras com os maiores nomes do mercado brasileiro e internacional",
      image: "https://images.unsplash.com/photo-1760420940953-3958ad9f6287?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzcGVha2VyJTIwc3RhZ2V8ZW58MXx8fHwxNzYyOTk2NTQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: TrendingUp,
      badge: "Premium",
      price: "R$ 1.800",
    },
    {
      title: "Oportunidades Reais",
      description: "Rodadas de negócios, pitch sessions e conexões que geram resultados",
      image: "https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMGRlYWx8ZW58MXx8fHwxNzYzMDQwMDA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      icon: Briefcase,
      badge: "Destaque",
      price: "R$ 1.200",
    },
  ];

  const avatars = [
    { color: "from-pink-500 to-rose-500" },
    { color: "from-purple-500 to-violet-500" },
    { color: "from-blue-500 to-cyan-500" },
    { color: "from-amber-500 to-orange-500" },
  ];

  return (
    <section className="relative py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className="text-amber-500 mb-12">
          Por Que Participar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <Card
                key={index}
                className="group bg-zinc-900/50 border-zinc-800 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
              >
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={highlight.image}
                    alt={highlight.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />
                  
                  {/* Avatars */}
                  <div className="absolute bottom-4 left-4 flex -space-x-3">
                    {avatars.map((avatar, i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-2 border-zinc-900 bg-gradient-to-br ${avatar.color} flex items-center justify-center`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-white">{highlight.title}</h3>
                    <span className="text-amber-500 text-sm bg-amber-500/10 px-3 py-1 rounded-full">
                      {highlight.badge}
                    </span>
                  </div>

                  <p className="text-zinc-400 text-sm mb-6">
                    {highlight.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-zinc-500 mb-1">A partir de</div>
                      <div className="text-amber-500">{highlight.price}</div>
                    </div>
                    <Button
                      className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none"
                    >
                      Garanta Sua Vaga
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-r from-zinc-900 to-zinc-800 border border-zinc-700 rounded-2xl p-12">
          <h3 className="text-white mb-4">
            Pronto para transformar seu negócio?
          </h3>
          <p className="text-zinc-300 mb-8 max-w-2xl mx-auto">
            Junte-se aos principais players do mercado brasileiro em 3 dias de networking intenso, 
            conteúdo de altíssimo nível e oportunidades reais de crescimento.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none px-10 py-6"
            >
              Inscreva-se Agora
            </Button>
            <Button
              variant="outline"
              className="border-zinc-600 text-zinc-300 hover:bg-zinc-800 px-10 py-6"
            >
              Ver Programação
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
