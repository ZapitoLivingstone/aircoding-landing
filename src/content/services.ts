export type ServiceSlug = 'web-movil' | 'software' | 'ia' | 'apis';
export type Lang = 'es' | 'en';

type L<T> = { es: T; en?: T };

export interface ServiceData {
  title: L<string>;
  summary: L<string>;
  forWho: L<string[]>;
  fit: L<string[]>;
  ideas: L<string[]>;
  benefits: L<string[]>;
  kpis: L<string[]>;
}

export const servicesData: Record<ServiceSlug, ServiceData> = {
  'web-movil': {
    title:   { es: 'Desarrollo Web & Móvil', en: 'Web & Mobile' },
    summary: { es: 'Sitios y apps rápidas, modernas y optimizadas para SEO/ASO.', en: 'Fast, modern websites & apps, SEO/ASO-ready.' },
    forWho:  { es: ['Pymes de retail que quieren vender online','Servicios profesionales que agendan y cobran','Negocios locales que necesitan app simple para clientes'],
               en: ['SMBs selling online','Professionals scheduling & charging','Local businesses needing a simple client app'] },
    fit:     { es: ['No tienes e-commerce o no convierte','Necesitas una app ligera para pedidos o seguimiento','Quieres mejorar rendimiento (Lighthouse 95+) y SEO'],
               en: ['No e-commerce or poor conversions','Need a lightweight orders/tracking app','High performance (Lighthouse 95+) & SEO'] },
    ideas:   { es: ['E-commerce con pasarela (Transbank/MercadoPago)','App de pedidos y estado de entrega','Portal de clientes con notificaciones push','Dashboard de ventas/operaciones'],
               en: ['E-commerce w/ payment gateway','Orders & delivery status app','Client portal with push','Sales/ops dashboard'] },
    benefits:{ es: ['Time-to-market veloz con Next.js/React Native','Experiencia móvil fluida y rápida','Arquitectura escalable y segura'],
               en: ['Fast time-to-market','Smooth mobile UX','Scalable, secure architecture'] },
    kpis:    { es: ['+25–40% conversiones en 60–90 días','Tiempo de carga < 2s (LCP) y CLS estable','Retención móvil +15–20%'],
               en: ['+25–40% conversions in 60–90 days','LCP < 2s, stable CLS','Mobile retention +15–20%'] },
  },
  software: {
    title:   { es: 'Software a medida', en: 'Custom Software' },
    summary: { es: 'Tu proceso, tu herramienta. Automatizamos y ordenamos el negocio.', en: 'Your process, your tool. We automate & organize.' },
    forWho:  { es: ['Empresas con procesos manuales o dispersos','Equipos que usan planillas y quieren trazabilidad','Emprendimientos que crecieron y necesitan control'],
               en: ['Companies with manual processes','Spreadsheet-driven teams','Growing startups needing control'] },
    fit:     { es: ['Necesitas un flujo con aprobaciones y estados','Requieres perfiles/roles y auditoría','Quieres reportes y métricas reales del negocio'],
               en: ['Flows with approvals/states','Roles & auditing','Real business reports & metrics'] },
    ideas:   { es: ['ERP/CRM liviano por módulos','Gestión de órdenes y servicios','Inventario y compras con alertas','Reporterías y BI básico'],
               en: ['Light ERP/CRM','Orders & services management','Inventory & purchasing','Basic BI & reporting'] },
    benefits:{ es: ['Menos errores y tareas repetitivas','Visibilidad del estado real del negocio','Base escalable para nuevas integraciones'],
               en: ['Fewer errors & repetition','Business visibility','Base for future integrations'] },
    kpis:    { es: ['-30–50% tiempo operativo','-20–40% errores de ingreso','+20–30% velocidad en atención'],
               en: ['-30–50% ops time','-20–40% input errors','+20–30% service speed'] },
  },
  ia: {
    title:   { es: 'Soluciones de IA', en: 'AI Solutions' },
    summary: { es: 'Atiende 24/7, clasifica, resume y encuentra información al instante.', en: '24/7 support, classify, summarize & find info.' },
    forWho:  { es: ['Soporte/atención al cliente con alto volumen','Áreas que procesan documentos o tickets','Equipos que quieren respuestas internas rápidas'],
               en: ['High-volume support','Docs/tickets processing','Teams needing instant answers'] },
    fit:     { es: ['Tienes preguntas frecuentes y tiempos de respuesta altos','Debes resumir o comparar documentos','Quieres búsqueda semántica sobre tus datos'],
               en: ['Many FAQs & high response times','Need to summarize/compare docs','Semantic search over your data'] },
    ideas:   { es: ['Chatbot con base de conocimiento propia','Clasificación y priorización automática de tickets','Resumen y extracción de datos desde PDFs','Buscador inteligente para el equipo'],
               en: ['KB-powered chatbot','Ticket triage & priority','Docs summarization & extraction','Internal smart search'] },
    benefits:{ es: ['Atención inmediata y consistente','Ahorro de horas hombre','Mejor experiencia de usuario'],
               en: ['Instant, consistent support','Save man-hours','Better UX'] },
    kpis:    { es: ['-30–60% tiempo medio de respuesta','-20–40% volumen atendido por humanos','+15–25% satisfacción de usuarios'],
               en: ['-30–60% avg response time','-20–40% human-handled volume','+15–25% satisfaction'] },
  },
  apis: {
    title:   { es: 'Integración de APIs', en: 'API Integrations' },
    summary: { es: 'Conectamos pagos, ERPs, logística y facturación. Datos sincronizados.', en: 'Connect payments, ERPs, logistics & invoicing. Synced data.' },
    forWho:  { es: ['Tiendas y distribuidores que necesitan automatizar','Empresas con sistemas que no “conversan” entre sí','Pymes que requieren facturación electrónica y conciliación'],
               en: ['Stores & distributors','Systems that don’t talk','SMBs with e-invoicing & reconciliation needs'] },
    fit:     { es: ['Haces procesos manuales entre plataformas','Pierdes pedidos o duplicas información','Necesitas webhooks y monitoreo de integraciones'],
               en: ['Manual cross-platform work','Lost/duplicated data','Need webhooks & monitoring'] },
    ideas:   { es: ['Pagos (Transbank/MercadoPago)','Facturación electrónica','Integraciones logísticas y tracking','ETLs simples y sincronización programada'],
               en: ['Payments (Transbank/MercadoPago)','E-invoicing','Logistics integrations & tracking','Simple ETLs & scheduled sync'] },
    benefits:{ es: ['Menos fricción y errores','Trazabilidad de punta a punta','Escalabilidad con monitoreo y alertas'],
               en: ['Less friction & errors','End-to-end traceability','Scalable with monitoring & alerts'] },
    kpis:    { es: ['Pedidos despachados 2× más rápido','-30–50% errores de conciliación','Tiempos de integración medidos en días'],
               en: ['2× faster dispatch','-30–50% reconciliation errors','Integrations measured in days'] },
  },
};

export function svc(slug: ServiceSlug, lang: Lang) {
  const s = servicesData[slug];
  return {
    title:    s.title[lang]    ?? s.title.es,
    summary:  s.summary[lang]  ?? s.summary.es,
    forWho:   s.forWho[lang]   ?? s.forWho.es,
    fit:      s.fit[lang]      ?? s.fit.es,
    ideas:    s.ideas[lang]    ?? s.ideas.es,
    benefits: s.benefits[lang] ?? s.benefits.es,
    kpis:     s.kpis[lang]     ?? s.kpis.es,
  };
}

/** índice por defecto (ES) para usos existentes */
export const servicesIndex = (Object.keys(servicesData) as ServiceSlug[]).map((slug) => ({
  slug,
  label: servicesData[slug].title.es,
  summary: servicesData[slug].summary.es
}));

/** índice según idioma (útil si luego creas /servicios/page.tsx) */
export function servicesIndexByLang(lang: Lang) {
  return (Object.keys(servicesData) as ServiceSlug[]).map((slug) => ({
    slug,
    label: servicesData[slug].title[lang] ?? servicesData[slug].title.es,
    summary: servicesData[slug].summary[lang] ?? servicesData[slug].summary.es,
  }));
}
