import { useEffect, useRef } from 'react';

// Gerar ID de sessão único
const generateSessionId = (): string => {
  const stored = localStorage.getItem('analytics_session_id');
  if (stored) return stored;
  
  const newId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('analytics_session_id', newId);
  return newId;
};

// Detectar navegador
const detectBrowser = (userAgent: string): string => {
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
};

// Detectar sistema operacional
const detectOS = (userAgent: string): string => {
  if (userAgent.includes('Windows')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  return 'Unknown';
};

// Detectar tipo de dispositivo
const detectDeviceType = (userAgent: string): string => {
  if (userAgent.includes('Mobile')) return 'Mobile';
  if (userAgent.includes('Tablet')) return 'Tablet';
  return 'Desktop';
};

// URL da API (altere para seu servidor em produção)
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isDevelopment
  ? 'http://localhost/g4vallues/server/api/analytics'
  : 'https://swapsoft.com.br/novidades/server/api/analytics';

export const useAnalytics = () => {
  const sessionId = useRef<string>(generateSessionId());
  const pageStartTime = useRef<number>(Date.now());
  const isInitialized = useRef<boolean>(false);

  // Enviar dados para API
  const sendToAPI = async (endpoint: string, data: any) => {
    try {
      await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      // Silencioso - não mostrar erros ao usuário
      console.debug('Analytics:', error);
    }
  };

  // Registrar visitante
  const trackVisitor = async () => {
    const userAgent = navigator.userAgent;
    
    const visitorData = {
      sessionId: sessionId.current,
      userAgent,
      browser: detectBrowser(userAgent),
      os: detectOS(userAgent),
      deviceType: detectDeviceType(userAgent),
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      referrer: document.referrer || 'Direct',
      ipAddress: null, // Será capturado no servidor se necessário
      country: null,
      city: null,
    };

    await sendToAPI('/visitor', visitorData);
  };

  // Registrar page view
  const trackPageView = async (url?: string, title?: string) => {
    const timeSpent = Math.floor((Date.now() - pageStartTime.current) / 1000);
    
    const pageData = {
      sessionId: sessionId.current,
      pageUrl: url || window.location.pathname,
      pageTitle: title || document.title,
      timeSpent,
    };

    await sendToAPI('/pageview', pageData);
    pageStartTime.current = Date.now(); // Reset timer
  };

  // Registrar evento com detalhes de clique
  const trackEvent = async (eventType: string, eventName: string, eventData?: any) => {
    const data = {
      sessionId: sessionId.current,
      eventType,
      eventName,
      eventData: eventData || {},
      clickX: eventData?.clickX,
      clickY: eventData?.clickY,
      elementTag: eventData?.elementTag,
      elementId: eventData?.id || null,
      elementClass: eventData?.className || null,
      pageUrl: eventData?.pageUrl || window.location.pathname,
    };

    await sendToAPI('/event', data);
  };

  // Registrar formulário
  const trackFormSubmission = async (formName: string, formData: any) => {
    const data = {
      sessionId: sessionId.current,
      formName,
      formData,
    };

    await sendToAPI('/form', data);
  };

  // Inicializar tracking
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Registrar visitante
    trackVisitor();

    // Registrar primeira page view
    trackPageView();

    // Rastrear cliques em botões com posição X, Y
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Capturar posição do clique
      const clickX = e.clientX;
      const clickY = e.clientY + window.scrollY; // Incluir scroll
      
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        trackEvent('click', 'button_click', {
          text: target.textContent,
          href: (target as HTMLAnchorElement).href,
          id: target.id,
          className: target.className,
          clickX,
          clickY,
          elementTag: target.tagName,
          pageUrl: window.location.pathname,
        });
      }
    };

    // Rastrear scroll
    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        trackEvent('scroll', 'page_scroll', { percentage: scrollPercentage });
      }, 1000);
    };

    // Rastrear tempo de permanência ao sair
    const handleBeforeUnload = () => {
      trackPageView();
    };

    // Adicionar event listeners
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackPageView(); // Registrar tempo final
    };
  }, []);

  return {
    trackPageView,
    trackEvent,
    trackFormSubmission,
  };
};

