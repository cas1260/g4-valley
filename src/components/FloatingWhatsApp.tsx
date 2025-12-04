import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp() {
  const whatsappNumber = "553192368155";
  const whatsappUrl = `https://wa.me/${whatsappNumber}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-95 md:hidden"
      style={{ backgroundColor: '#25D366' }}
      aria-label="Contato via WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" strokeWidth={2.5} />
    </a>
  );
}

