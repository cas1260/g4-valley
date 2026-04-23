import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import logoWebajato from "./assets/codex/logo-webajato-9yG1tTyu.png";
import heroDashboard from "./assets/codex/hero-dashboard-mUCvxTeXHmJjs9esmFeMQU.webp";
import flowBuilder from "./assets/codex/flow-builder-MgWNZ3nzQUtMf22WKKzMHC.webp";
import whatsappCrm from "./assets/codex/whatsapp-crm-5cifzaxxyxLemNC284mcGW.webp";
import aiAgents from "./assets/codex/ai-agents-5abfxD2S2F2pPKhrzzxsjA.webp";
import whatsappFloatIcon from "./assets/whatsapp-float-icon.svg";

function IconSvg({ children }: { children: ReactNode }) {
  return <svg viewBox="0 0 24 24">{children}</svg>;
}

const navItems = [
  { href: "#plataforma", label: "O que resolve" },
  { href: "#modulos", label: "Solucoes" },
  { href: "#verticais", label: "Segmentos" },
  { href: "#crm", label: "Atendimento" },
  { href: "#fluxhub", label: "WhatsApp" },
  { href: "#contato", label: "Conversar" },
];

const proofItems = [
  { title: "Vendas sem bagunca", text: "Pedido, cliente e pagamento ficam no lugar certo." },
  { title: "WhatsApp com historico", text: "Sua equipe sabe quem chamou, o que pediu e quem precisa de retorno." },
  { title: "Dinheiro mais claro", text: "Contas, caixa e recebimentos aparecem de forma simples." },
  { title: "Ajuda para comecar", text: "A Webajato entende sua rotina e mostra o caminho passo a passo." },
];

const platformItems = [
  { number: "01", title: "Ver onde trava", text: "Pedidos perdidos, estoque confuso, caixa sem clareza ou WhatsApp sem controle." },
  { number: "02", title: "Colocar em ordem", text: "O WebFinan junta o que sua equipe precisa para vender, atender e acompanhar." },
  { number: "03", title: "Ganhar rotina", text: "Alertas, retornos e tarefas repetidas ajudam sua empresa a nao depender da memoria." },
];

const modules = [
  { title: "Contas e caixa", text: "Veja o que entrou, o que saiu e o que ainda falta receber.", tone: "teal", icon: "$" },
  {
    title: "Pedidos e vendas",
    text: "Registre vendas sem perder informacao no caderno ou no celular.",
    tone: "amber",
    icon: <IconSvg><path d="M6 6h15l-2 8H8L6 3H3" /><circle cx="9" cy="20" r="1.5" /><circle cx="18" cy="20" r="1.5" /></IconSvg>,
  },
  {
    title: "Estoque claro",
    text: "Saiba o que tem, o que esta acabando e o que precisa comprar.",
    tone: "teal",
    icon: <IconSvg><path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" /><path d="m4 7.5 8 4.5 8-4.5" /><path d="M12 12v9" /></IconSvg>,
  },
  {
    title: "Notas fiscais",
    text: "Emita documentos com mais seguranca e menos correria.",
    tone: "amber",
    icon: <IconSvg><path d="M7 3h7l4 4v14H7V3Z" /><path d="M14 3v5h5" /><path d="M10 12h6M10 16h6M10 8h2" /></IconSvg>,
  },
  {
    title: "Venda online",
    text: "Receba pedidos pela internet sem separar tudo em outra rotina.",
    tone: "teal",
    icon: <IconSvg><path d="M4 10h16l-1-5H5l-1 5Z" /><path d="M6 10v10h12V10" /><path d="M9 20v-6h6v6" /><path d="M4 10c0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0 0 2 4 2 4 0" /></IconSvg>,
  },
  {
    title: "Restaurante e delivery",
    text: "Controle mesas, comandas, cozinha e entregas com menos erro.",
    tone: "amber",
    icon: <IconSvg><path d="M7 3v9M11 3v9M7 7h4" /><path d="M16 3v18" /><path d="M19 3v18" /></IconSvg>,
  },
  {
    title: "Agenda e clientes",
    text: "Organize horarios, retornos e historico de atendimento.",
    tone: "teal",
    icon: <IconSvg><path d="M8 4v5a4 4 0 0 0 8 0V4" /><path d="M12 13v3a4 4 0 0 0 8 0v-2" /><circle cx="20" cy="12" r="2" /></IconSvg>,
  },
  {
    title: "Servicos e prazos",
    text: "Acompanhe servicos, pecas usadas, responsaveis e datas combinadas.",
    tone: "amber",
    icon: <IconSvg><path d="M14 7a4 4 0 0 0-5 5l-5 5 3 3 5-5a4 4 0 0 0 5-5l-3 3-3-3 3-3Z" /></IconSvg>,
  },
  {
    title: "Clientes e retornos",
    text: "Nao deixe cliente sem resposta depois do primeiro contato.",
    tone: "teal",
    icon: <IconSvg><path d="M16 11a4 4 0 1 0-8 0" /><circle cx="12" cy="7" r="3" /><path d="M4 21a8 8 0 0 1 16 0" /><circle cx="18" cy="10" r="2" /><circle cx="6" cy="10" r="2" /></IconSvg>,
  },
  {
    title: "Equipe organizada",
    text: "Cada pessoa acessa o que precisa para trabalhar melhor.",
    tone: "amber",
    icon: <IconSvg><path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" /><path d="M3 12h3M18 12h3M12 3v3M12 18v3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></IconSvg>,
  },
  {
    title: "Relatorios simples",
    text: "Entenda os numeros principais sem montar planilha todo dia.",
    tone: "teal",
    icon: <IconSvg><path d="M4 20h16" /><path d="M7 16V9M12 16V5M17 16v-8" /></IconSvg>,
  },
  {
    title: "Mais de uma unidade",
    text: "Acompanhe filiais ou empresas sem misturar tudo.",
    tone: "amber",
    icon: <IconSvg><path d="M4 21h16" /><path d="M7 21V5h10v16" /><path d="M9 8h2M13 8h2M9 12h2M13 12h2M9 16h2M13 16h2" /></IconSvg>,
  },
];

const verticals = [
  { title: "Lojas", subtitle: "Venda fisica e online", tone: "teal", icon: modules[4].icon, items: ["Produtos em ordem", "Pedidos registrados", "Estoque acompanhado", "Cliente com historico"] },
  { title: "Restaurantes", subtitle: "Salao, cozinha e delivery", tone: "amber", icon: modules[5].icon, items: ["Mesas e comandas", "Pedidos para cozinha", "Entregas organizadas", "Movimento do dia"] },
  { title: "Clinicas", subtitle: "Agenda e atendimento", tone: "teal", icon: modules[6].icon, items: ["Horarios claros", "Historico do cliente", "Retornos lembrados", "Atendimento mais calmo"] },
  { title: "Servicos", subtitle: "Tecnicos e assistencias", tone: "amber", icon: modules[7].icon, items: ["Prazos combinados", "Pecas controladas", "Equipe acompanhada", "Cliente avisado"] },
];

const flowItems = [
  { title: "Cliente chama", text: "A conversa entra com nome, historico e assunto." },
  { title: "Equipe atende", text: "A pessoa certa sabe o que responder e o que ja aconteceu." },
  { title: "Gestor acompanha", text: "Voce ve quem esta aguardando, quem foi atendido e quem precisa de retorno." },
];

const operations = [
  { title: "Menos esquecimento", text: "Retornos, cobrancas e tarefas deixam de depender de recado solto." },
  { title: "Mais resposta", text: "O cliente nao fica esperando porque a mensagem ficou perdida." },
  { title: "Mais controle", text: "Voce entende venda, caixa e estoque sem perguntar para todo mundo." },
  { title: "Mais tempo", text: "A rotina fica mais leve para sua equipe focar no cliente." },
];

const priorityOptions = ["Perco pedidos ou clientes", "Meu WhatsApp esta baguncado", "Nao tenho clareza do dinheiro", "Meu estoque da trabalho", "Quero organizar a empresa toda"];
const contactEndpoint = "/server/api/contact";
const whatsappUrl = "https://wa.me/5531999669399";
type SubmitStatus = "idle" | "sending" | "success" | "error";

function valueOrFallback(value: FormDataEntryValue | null, fallback: string) {
  const clean = typeof value === "string" ? value.trim() : "";
  return clean.length > 0 ? clean : fallback;
}

function buildBriefing(formData: FormData) {
  const nome = valueOrFallback(formData.get("nome"), "Nao informado");
  const empresa = valueOrFallback(formData.get("empresa"), "Nao informada");
  const contato = valueOrFallback(formData.get("contato"), "Nao informado");
  const prioridade = valueOrFallback(formData.get("prioridade"), "Quero organizar a empresa toda");
  const necessidade = valueOrFallback(formData.get("necessidade"), "Quero entender como organizar vendas, atendimento, financeiro e rotina da empresa.");

  return [
    "Resumo para demonstracao WebFinan",
    `Nome: ${nome}`,
    `Empresa: ${empresa}`,
    `Contato: ${contato}`,
    `Principal problema: ${prioridade}`,
    `O que esta acontecendo: ${necessidade}`,
  ].join("\n");
}

function buildContactPayload(formData: FormData, briefing: string) {
  const nome = valueOrFallback(formData.get("nome"), "");
  const empresa = valueOrFallback(formData.get("empresa"), "");
  const contato = valueOrFallback(formData.get("contato"), "");
  const prioridade = valueOrFallback(formData.get("prioridade"), "Quero organizar a empresa toda");
  const necessidade = valueOrFallback(formData.get("necessidade"), "");
  const email = contato.includes("@") ? contato : "";

  return {
    name: nome,
    company: empresa,
    phone: contato,
    email,
    service: prioridade,
    message: necessidade,
    briefing,
    source: "webfinan.com.br",
  };
}

async function copyText(text: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0].href);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [briefing, setBriefing] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copiar resumo");
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const year = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    let frame = 0;

    const updateChrome = () => {
      frame = 0;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? (scrollTop / height) * 100 : 0;
      const anchorPoint = scrollTop + Math.max(window.innerHeight * 0.28, 160);
      let nextActive = navItems[0].href;

      navItems.forEach((item) => {
        const section = document.getElementById(item.href.slice(1));
        if (!section) return;

        const sectionTop = section.getBoundingClientRect().top + scrollTop;
        if (sectionTop <= anchorPoint) {
          nextActive = item.href;
        }
      });

      if (window.innerHeight + scrollTop >= document.documentElement.scrollHeight - 8) {
        nextActive = navItems[navItems.length - 1].href;
      }

      setIsScrolled(scrollTop > 16);
      setActiveSection((current) => current === nextActive ? current : nextActive);
      setScrollProgress(Math.min(progress, 100));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateChrome);
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateChrome();

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextBriefing = buildBriefing(formData);
    setBriefing(nextBriefing);
    setCopyLabel("Copiar resumo");
    setSubmitStatus("sending");
    setSubmitMessage("Enviando seus dados para a Webajato...");

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildContactPayload(formData, nextBriefing)),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || "Nao foi possivel enviar o formulario.");
      }

      setSubmitStatus("success");
      setSubmitMessage("Dados enviados para a Webajato. Em breve entraremos em contato.");
    } catch {
      setSubmitStatus("error");
      setSubmitMessage("Nao foi possivel enviar agora. Copie o resumo e chame a Webajato pelo WhatsApp.");
    }
  }

  async function handleCopyBriefing() {
    if (!briefing) return;
    try {
      await copyText(briefing);
      setCopyLabel("Resumo copiado");
    } catch {
      setCopyLabel("Selecione e copie");
    }
    window.setTimeout(() => setCopyLabel("Copiar resumo"), 1800);
  }

  return (
    <div className="codex-site">
      <div className="progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>

      <header className={`site-header${isScrolled ? " is-scrolled" : ""}`} id="topo">
        <a className="brand" href="#inicio" aria-label="Webajato" onClick={closeMenu}><img src={logoWebajato} alt="Webajato" /></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="siteNav" onClick={() => setMenuOpen((current) => !current)}>
          <span /><span /><span /><span className="sr-only">Abrir menu</span>
        </button>
        <nav className={`site-nav${menuOpen ? " is-open" : ""}`} id="siteNav" aria-label="Navegacao principal">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={activeSection === item.href ? "is-active" : undefined}
              aria-current={activeSection === item.href ? "page" : undefined}
              onClick={() => {
                setActiveSection(item.href);
                closeMenu();
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Sistema simples para sua empresa ganhar ordem</p>
            <h1>WebFinan</h1>
            <h2>Venda, atenda e controle sua empresa sem depender de <span>planilhas.</span></h2>
            <p className="hero-text">O WebFinan foi criado pela Webajato para colocar vendas, WhatsApp, estoque e financeiro em ordem. Voce enxerga a rotina, sua equipe trabalha melhor e o cliente recebe resposta.</p>
            <div className="hero-actions"><a className="button primary" href="#contato">Quero uma demonstracao</a><a className="button secondary" href="#modulos">Ver como ajuda</a></div>
          </div>
          <figure className="hero-visual" data-reveal><img src={heroDashboard} alt="Painel visual do sistema WebFinan" /><figcaption>Um lugar para acompanhar vendas, atendimento e controle da empresa.</figcaption></figure>
        </section>

        <section className="proof-strip" aria-label="Pilares da plataforma">
          {proofItems.map((item) => <div className="proof-item" data-reveal key={item.title}><strong>{item.title}</strong><span>{item.text}</span></div>)}
        </section>

        <section className="section platform" id="plataforma">
          <div className="section-copy" data-reveal><p className="eyebrow">O que muda na pratica</p><h2>Voce para de procurar informacao em todo lugar.</h2></div>
          <div className="platform-rail" data-reveal>{platformItems.map((item) => <div key={item.number}><span>{item.number}</span><strong>{item.title}</strong><p>{item.text}</p></div>)}<p className="platform-summary">O WebFinan pega as partes soltas da rotina e coloca em uma visao simples: pedido, cliente, dinheiro, estoque e atendimento.</p></div>
        </section>

        <section className="section modules" id="modulos">
          <div className="section-heading" data-reveal><p className="eyebrow">Solucoes</p><h2>O que sua empresa precisa no dia a dia, explicado sem complicar.</h2></div>
          <div className="module-grid">{modules.map((item) => <article className="module" data-reveal key={item.title}><span className={`module-icon ${item.tone}`} aria-hidden="true">{item.icon}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
        </section>

        <section className="section verticals" id="verticais">
          <div className="section-heading" data-reveal><p className="eyebrow">Segmentos</p><h2>Serve para negocios que precisam vender, atender e controlar melhor.</h2></div>
          <div className="vertical-grid">{verticals.map((item) => <article className="vertical-card" data-reveal key={item.title}><header><span className={`module-icon ${item.tone}`} aria-hidden="true">{item.icon}</span><div><h3>{item.title}</h3><p>{item.subtitle}</p></div></header><ul>{item.items.map((feature) => <li key={feature}>{feature}</li>)}</ul></article>)}</div>
        </section>

        <section className="showcase" id="crm"><div className="showcase-media" data-reveal><img src={flowBuilder} alt="Atendimento organizado no WebFinan" /></div><div className="showcase-copy" data-reveal><p className="eyebrow">Atendimento sem perder cliente</p><h2>O WhatsApp deixa de ser uma bagunca no celular da equipe.</h2><p>Cada conversa ganha historico, responsavel e proximo passo. Assim o cliente nao fica esquecido e o dono consegue acompanhar o atendimento.</p><ol className="flow-list">{flowItems.map((item) => <li key={item.title}><strong>{item.title}</strong><span>{item.text}</span></li>)}</ol></div></section>

        <section className="showcase reverse" id="fluxhub"><div className="showcase-media" data-reveal><img src={whatsappCrm} alt="Conversas de WhatsApp organizadas no sistema" /></div><div className="showcase-copy" data-reveal><p className="eyebrow">WhatsApp da empresa</p><h2>Mensagem importante nao pode depender de uma pessoa lembrar.</h2><p>O WebFinan ajuda sua empresa a separar conversas, salvar historico e manter a equipe olhando para a mesma fila de atendimento.</p><div className="architecture" aria-label="Como o atendimento funciona"><span>Mensagem chega</span><span>Historico aparece</span><span>Equipe responde</span><span>Gestor acompanha</span><span>Cliente retorna</span></div></div></section>

        <section className="section intelligence"><div className="section-copy" data-reveal><p className="eyebrow">Ajuda automatica quando faz sentido</p><h2>Menos tarefas repetidas para sua equipe.</h2><p>O sistema pode lembrar retornos, organizar pedidos, avisar pendencias e ajudar no atendimento. Tudo para sua empresa ganhar tempo sem precisar falar linguagem tecnica.</p></div><figure className="intelligence-visual" data-reveal><img src={aiAgents} alt="Automacoes simples ajudando a equipe no atendimento" /></figure></section>

        <section className="operations" aria-label="Pontos de confianca operacional">{operations.map((item) => <div data-reveal key={item.title}><strong>{item.title}</strong><p>{item.text}</p></div>)}</section>

        <section className="contact" id="contato">
          <div className="contact-copy" data-reveal><p className="eyebrow">Demonstracao</p><h2>Conte o que hoje da mais trabalho.</h2><p>A Webajato analisa sua rotina e mostra, em uma conversa simples, como o WebFinan pode organizar sua empresa.</p></div>
          <form className="contact-form" onSubmit={handleSubmit} data-reveal>
            <label>Nome<input type="text" name="nome" autoComplete="name" placeholder="Seu nome" /></label>
            <label>Empresa<input type="text" name="empresa" autoComplete="organization" placeholder="Nome da empresa" /></label>
            <label>Contato<input type="text" name="contato" autoComplete="tel" placeholder="WhatsApp ou e-mail" /></label>
            <label>O que mais atrapalha hoje?<select name="prioridade" defaultValue="Quero organizar a empresa toda">{priorityOptions.map((option) => <option value={option} key={option}>{option}</option>)}</select></label>
            <label className="wide">Explique em poucas palavras<textarea name="necessidade" rows={4} placeholder="Ex.: perco pedidos no WhatsApp, nao sei meu lucro, estoque da trabalho..." /></label>
            <div className="form-actions"><button className="button primary" type="submit" disabled={submitStatus === "sending"}>{submitStatus === "sending" ? "Enviando..." : "Montar pedido de demonstracao"}</button><button className="button secondary" type="button" onClick={handleCopyBriefing} disabled={!briefing}>{copyLabel}</button></div>
            <output className={`briefing-output${briefing || submitMessage ? " is-visible" : ""}${submitStatus === "error" ? " is-error" : ""}`} aria-live="polite">{briefing || submitMessage ? `${submitMessage ? `${submitMessage}\n\n` : ""}${briefing}` : ""}</output>
          </form>
        </section>
      </main>

      <footer className="site-footer"><img src={logoWebajato} alt="Webajato" /><p>WebFinan, sistema da Webajato para organizar vendas, atendimento, financeiro e rotina da empresa.</p><span>{year}</span></footer>
      <a className="whatsapp-float" href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chamar a Webajato no WhatsApp">
        <img src={whatsappFloatIcon} alt="" aria-hidden="true" />
      </a>
    </div>
  );
}
