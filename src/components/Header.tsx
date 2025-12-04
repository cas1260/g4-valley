import { MessageCircle } from "lucide-react";
import logo from "figma:asset/8a571c4c186a45dd4a865f0b057c6a16f2aebabc.png";

export function Header() {
  const whatsappNumber = "553199669399";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-100 backdrop-blur-sm border-b border-zinc-300 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-1.5 mb-2.5 flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="SwapSoft" 
            className="h-10 sm:h-10 w-auto -ml-6 sm:ml-0 logo-mobile"
          />
        </div>
        
        <nav className="flex items-center gap-2 sm:gap-4 md:gap-8">
          <a href="#servicos" className="text-zinc-700 hover:text-orange-600 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap">
            Serviços
          </a>
          <a href="#solucoes" className="text-zinc-700 hover:text-orange-600 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap">
            Soluções
          </a>
          <a href="#experiencia" className="text-zinc-700 hover:text-orange-600 transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap">
            Experiência
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 sm:gap-2 text-white border-none px-3 sm:px-6 md:px-8 py-1.5 sm:py-2 rounded-md font-medium transition-all text-xs sm:text-sm md:text-base whitespace-nowrap"
          style={{ backgroundColor: '#25D366', color: 'white' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20BA5A'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
        >
          <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
          <span className="whatsapp-text">Tire suas dúvidas!</span>
        </a>
      </div>
      <style>{`
        @media (max-width: 950px) {
          .whatsapp-text {
            display: none !important;
          }
          .logo-mobile {
            position: relative;
            left: 5px !important;
            margin-left: -1.5rem !important;
          }
        }
        @media (min-width: 951px) {
          .whatsapp-text {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
}