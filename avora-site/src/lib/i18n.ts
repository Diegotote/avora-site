import { useEffect } from 'react';

export type Language = 'es' | 'en';

const esToEn: Record<string, string> = {
  'Haz clic para descubrir AVORA': 'Click to discover AVORA',
  'Crecimiento empresarial con método': 'Business growth with method',
  'AVORA Business Growth nace para acompañar a hoteles pequeños y medianos que tienen potencial, pero necesitan claridad, estructura y ejecución para convertir ese potencial en crecimiento real.':
    'AVORA Business Growth was created to support small and mid-sized hotels with real potential that need clarity, structure and execution to turn that potential into real growth.',
  'Entrar a AVORA': 'Enter AVORA',
  'Inicio': 'Home',
  'Metodología': 'Methodology',
  'Servicios': 'Services',
  'Membresías': 'Memberships',
  'Diagnóstico': 'Diagnostic',
  'Solicitar diagnóstico': 'Request diagnostic',
  'CONSULTORÍA HOTELERA DE ALTO NIVEL': 'HIGH-LEVEL HOTEL CONSULTING',
  'Crecimiento hotelero con método, dirección y ejecución': 'Hotel growth with method, direction and execution',
  'AVORA Business Growth acompaña a hoteles pequeños y medianos a entender su contexto, ordenar sus procesos, fortalecer su presencia y avanzar con acciones concretas.':
    'AVORA Business Growth helps small and mid-sized hotels understand their context, organize their processes, strengthen their presence and move forward with concrete actions.',
  'Ver metodología': 'View methodology',
  'Diagnóstico inicial · Ruta de crecimiento · Tecnología simple · Seguimiento real': 'Initial diagnostic · Growth roadmap · Simple technology · Real follow-up',
  'Potencial de recuperación en comisiones OTA': 'Potential OTA commission recovery',
  'Metodología propia': 'Proprietary methodology',
  'Diagnóstico de contexto hotelero': 'Hotel context diagnostic',
  'Tu hotel puede estar perdiendo oportunidades sin verlo': 'Your hotel may be losing opportunities without noticing',
  'Operación reactiva': 'Reactive operation',
  'Falta de seguimiento': 'Lack of follow-up',
  'Poca presencia digital': 'Weak digital presence',
  'Dependencia de OTAs': 'OTA dependency',
  'Tecnología poco aplicada': 'Underused technology',
  'Equipo sin capacitación': 'Untrained team',
  '¿Qué es AVORA?': 'What is AVORA?',
  'Conocer metodología': 'Explore methodology',
  'Dejar de operar en automático.': 'Stop operating on autopilot.',
  'Entender el contexto.': 'Understand the context.',
  'Ordenar el crecimiento.': 'Organize growth.',
  'Avanzar con acciones concretas.': 'Move forward with concrete actions.',
  'Eso es AVORA.': 'That is AVORA.',
  'Cómo ayudamos a tu hotel': 'How we help your hotel',
  'Diagnóstico de crecimiento hotelero': 'Hotel growth diagnostic',
  'Plan básico de mejora operativa': 'Basic operational improvement plan',
  'Capacitación de personal': 'Team training',
  'Tecnología simple y automatización': 'Simple technology and automation',
  'Vinculación con aliados estratégicos': 'Connection with strategic partners',
  'Acompañamiento y seguimiento': 'Support and follow-up',
  'Ver más': 'View more',
  'Tu hotel no necesita más ruido. Necesita dirección.': 'Your hotel does not need more noise. It needs direction.',
  'La Metodología A.V.O.R.A.': 'The A.V.O.R.A. Methodology',
  'Cinco fases para transformar la operación de un hotel sin caos: escuchamos, observamos, ordenamos, rompemos esquemas y ejecutamos.':
    'Five phases to transform hotel operations without chaos: we listen, observe, organize, challenge old patterns and execute.',
  'Pausa estratégica': 'Strategic pause',
  'Mapa de realidad': 'Reality map',
  'Plan de acción': 'Action plan',
  'Cambio con estructura': 'Structured change',
  'Ejecución medible': 'Measurable execution',
  'La metodología se aplica en 5 pilares ejecutables': 'The methodology is applied through 5 executable pillars',
  'Claridad y diagnóstico': 'Clarity and diagnostic',
  'Estrategia': 'Strategy',
  'Presencia digital': 'Digital presence',
  'Impulso comercial': 'Commercial momentum',
  'Ejecución y seguimiento': 'Execution and follow-up',
  'Cómo se vive AVORA en un proceso real': 'How AVORA works in a real process',
  'Servicios AVORA': 'AVORA Services',
  'Cada servicio puede funcionar de forma independiente, pero juntos forman una ruta completa de crecimiento empresarial para hoteles.':
    'Each service can work independently, but together they create a complete business growth path for hotels.',
  'Entrega sugerida': 'Suggested deliverables',
  'Herramientas que podemos construir para tu hotel': 'Tools we can build for your hotel',
  'Formas simples de comenzar': 'Simple ways to begin',
  'Solicitar': 'Request',
  'Ecosistema de Membresías AVORA': 'AVORA Membership Ecosystem',
  'Nuestras membresías están diseñadas para acompañar al hotelero en cada etapa de su crecimiento, permitiendo una escalabilidad orgánica y resultados desde el primer nivel de intervención.':
    'Our memberships are designed to support hotel owners at each stage of growth, allowing organic scalability and results from the first level of intervention.',
  'PUERTA DE ENTRADA': 'ENTRY POINT',
  'MEMBRESÍAS BASE': 'BASE MEMBERSHIPS',
  'COMBOS ESTRATÉGICOS': 'STRATEGIC COMBOS',
  'MEMBRESÍA ELITE': 'ELITE MEMBERSHIP',
  'Ver detalle': 'View details',
  'Incluye': 'Includes',
  'Solicitar AVORA Legend': 'Request AVORA Legend',
  'Solicitar AVORA Insight': 'Request AVORA Insight',
  'Solicita tu diagnóstico': 'Request your diagnostic',
  'Cuéntanos sobre tu hotel. Te respondemos con un primer mapa de claridad para saber qué puede mejorar, qué requiere orden y qué oportunidad puede convertirse en crecimiento.':
    'Tell us about your hotel. We will respond with a first clarity map to identify what can improve, what needs order and which opportunity can become growth.',
  'Nombre completo *': 'Full name *',
  'Correo corporativo *': 'Business email *',
  'Teléfono / WhatsApp *': 'Phone / WhatsApp *',
  'Nombre del hotel *': 'Hotel name *',
  'Ciudad / Ubicación *': 'City / Location *',
  'Num. aprox. de habitaciones': 'Approx. number of rooms',
  'Tipo de hotel': 'Hotel type',
  'Principal reto actual': 'Main current challenge',
  'Membresía de interés': 'Membership of interest',
  'Cuéntanos tu mayor reto operativo': 'Tell us your biggest operational challenge',
  'Solicitar diagnóstico no implica compromiso de contratación ni promesa de financiamiento.':
    'Requesting a diagnostic does not imply a hiring commitment or a financing promise.',
  'Resolvemos tus dudas': 'We answer your questions',
  'Lo que más preguntan los hoteleros antes de iniciar.': 'What hotel owners ask most before starting.',
  '¿Tienes otra duda?': 'Do you have another question?',
  'Escríbenos': 'Message us',
  'Navegación': 'Navigation',
  'Contacto': 'Contact',
  'Aviso': 'Notice',
  'Fundador': 'Founder',
  'Crecimiento empresarial para hoteles con potencial.': 'Business growth for hotels with potential.',
  'Hombre líder, seguro y auténtico.': 'A leading, confident and authentic man.',
  'CEO de AVORA Business Growth': 'CEO of AVORA Business Growth',
  'AVORA Business Growth · Fundado por Diego Castellón': 'AVORA Business Growth · Founded by Diego Castellón',
  'AVORA Business Growth no es una financiera y no promete aprobación de créditos. Su función es estratégica, operativa y de vinculación con aliados cuando sea viable.':
    'AVORA Business Growth is not a financial institution and does not promise credit approval. Its role is strategic, operational and focused on partner connection when viable.',
};

const enToEs = Object.fromEntries(Object.entries(esToEn).map(([es, en]) => [en, es]));

function normalize(value: string) {
  return value.replace(/\s+/g, ' ').trim();
}

function translateValue(value: string, language: Language) {
  const source = normalize(value);
  if (!source) return value;
  const translated = language === 'en' ? esToEn[source] : enToEs[source];
  return translated ?? value;
}

export function applyTranslations(language: Language, root: ParentNode = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    const parent = node.parentElement;
    if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) continue;
    textNodes.push(node);
  }

  textNodes.forEach((node) => {
    const translated = translateValue(node.nodeValue ?? '', language);
    if (translated !== node.nodeValue) node.nodeValue = translated;
  });

  root.querySelectorAll('input[placeholder], textarea[placeholder], option').forEach((node) => {
    if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement) {
      node.placeholder = translateValue(node.placeholder, language);
    } else if (node instanceof HTMLOptionElement) {
      node.textContent = translateValue(node.textContent ?? '', language);
    }
  });
}

export function useAutoTranslate(language: Language) {
  useEffect(() => {
    const run = () => applyTranslations(language);
    run();
    document.documentElement.lang = language;

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(run);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [language]);
}
