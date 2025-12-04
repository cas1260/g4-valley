import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { ProblemsSection } from "./components/ProblemsSection";
import { CredibilitySection } from "./components/CredibilitySection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { Toaster } from "./components/ui/sonner";
import fundoSvg from "./assets/fundo.svg?url";
import { useAnalytics } from "./hooks/useAnalytics";

export default function App() {
  // Inicializar analytics (silencioso)
  useAnalytics();
  return (
    <div className="min-h-screen relative">
      {/* Fundo gradiente escuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950" />
      
      {/* SVG de fundo */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: `url(${fundoSvg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Conteúdo */}
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ProblemsSection />
        <ServicesSection />
        <FeaturesSection />
        <CredibilitySection />
        <CTASection />
        <Footer />
        <Toaster />
      </div>
      
      {/* Botão WhatsApp Flutuante - Fora da div z-10 para ficar sempre no topo */}
      <FloatingWhatsApp />
    </div>
  );
}