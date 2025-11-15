import logo from "figma:asset/8a571c4c186a45dd4a865f0b057c6a16f2aebabc.png";

export function Footer() {
  return (
    <footer className="relative py-4 border-t border-zinc-300 bg-zinc-100">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="SwapSoft" 
              className="h-10 w-auto"
            />
          </div>

          {/* Copyright */}
          <div className="text-zinc-600 text-sm text-center">
            © {new Date().getFullYear()} SwapSoft. Todos os direitos reservados.
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-zinc-700 text-sm">Nos encontre no G4 Valley 2025</span>
          </div>
        </div>
      </div>
    </footer>
  );
}