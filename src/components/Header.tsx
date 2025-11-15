import { Button } from "./ui/button";
import { Bot, Menu, MessageCircle } from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/8a571c4c186a45dd4a865f0b057c6a16f2aebabc.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const whatsappNumber = "553199669399";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-100 backdrop-blur-sm border-b border-zinc-300 shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={logo} 
            alt="SwapSoft" 
            className="h-10 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#servicos" className="text-zinc-700 hover:text-orange-600 transition-colors">
            Serviços
          </a>
          <a href="#solucoes" className="text-zinc-700 hover:text-orange-600 transition-colors">
            Soluções
          </a>
          <a href="#experiencia" className="text-zinc-700 hover:text-orange-600 transition-colors">
            Experiência
          </a>
        </nav>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center justify-center gap-2 text-white border-none px-8 py-2 rounded-md font-medium transition-all"
          style={{ backgroundColor: '#25D366', color: 'white' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20BA5A'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
        >
          <MessageCircle className="w-5 h-5" />
          Tire suas dúvidas!
        </a>

        <button 
          className="md:hidden text-zinc-800"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-50 border-t border-zinc-300 px-6 py-4">
          <nav className="flex flex-col gap-4">
            <a href="#servicos" className="text-zinc-700 hover:text-orange-600 transition-colors">
              Serviços
            </a>
            <a href="#solucoes" className="text-zinc-700 hover:text-orange-600 transition-colors">
              Soluções
            </a>
            <a href="#experiencia" className="text-zinc-700 hover:text-orange-600 transition-colors">
              Experiência
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-white border-none w-full py-2 rounded-md font-medium transition-all"
              style={{ backgroundColor: '#25D366', color: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20BA5A'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
            >
              <MessageCircle className="w-5 h-5" />
              Tire suas dúvidas!
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}