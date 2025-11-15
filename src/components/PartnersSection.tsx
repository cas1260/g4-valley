import svgPaths from "../imports/svg-jaismi59n8";

export function PartnersSection() {
  const partners = [
    { name: "Bitcoin", path: svgPaths.p22518a00 },
    { name: "Ethereum", path: svgPaths.p17f2a080 },
    { name: "Euro", path: svgPaths.p13c9b4f0 },
    { name: "Dollar", path: svgPaths.p16f9280 },
    { name: "Solana", path: svgPaths.p1ce6fe00 },
    { name: "Tron", path: svgPaths.p1fef0500 },
    { name: "Binance", path: svgPaths.p23ab80f0 },
  ];

  return (
    <section className="relative py-16 border-t border-zinc-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h3 className="text-amber-500 mb-8 text-center">
          Ecossistema de Negócios
        </h3>
        
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="group cursor-pointer transition-all duration-300 hover:scale-110"
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 57.2286 57.2286"
                className="transition-all duration-300"
              >
                <path
                  d={partner.path}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="2"
                  className="group-hover:stroke-orange-500 transition-colors duration-300"
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(245, 158, 11, 0.3))",
                  }}
                />
              </svg>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-400 mt-8">
          Múltiplas verticais de negócio: Fintech, Edtech, Healthtech, Agritech, Logística e mais
        </p>
      </div>
    </section>
  );
}
