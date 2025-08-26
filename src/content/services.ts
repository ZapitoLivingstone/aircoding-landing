export type ServiceSlug = 'web-movil' | 'software' | 'ia' | 'apis';

export interface ServiceData {
  title: string;
  summary: string;
  forWho: string[];   // ¿Para quién es?
  fit: string[];      // Te sirve si...
  ideas: string[];    // Ideas de implementación
  benefits: string[]; // Beneficios
  kpis: string[];     // Resultados/KPIs esperados
}

export const servicesData: Record<ServiceSlug, ServiceData> = {
  'web-movil': {
    title: 'Desarrollo Web & Móvil',
    summary: 'Sitios y apps rápidas, modernas y optimizadas para SEO/ASO.',
    forWho: [
      'Pymes de retail que quieren vender online',
      'Servicios profesionales que agendan y cobran',
      'Negocios locales que necesitan app simple para clientes'
    ],
    fit: [
      'No tienes e-commerce o no convierte',
      'Necesitas una app ligera para pedidos o seguimiento',
      'Quieres mejorar rendimiento (Lighthouse 95+) y SEO'
    ],
    ideas: [
      'E-commerce con pasarela (Transbank/MercadoPago)',
      'App de pedidos y estado de entrega',
      'Portal de clientes con notificaciones push',
      'Dashboard de ventas/operaciones'
    ],
    benefits: [
      'Time-to-market veloz con Next.js/React Native',
      'Experiencia móvil fluida y rápida',
      'Arquitectura escalable y segura'
    ],
    kpis: [
      '+25–40% conversiones en 60–90 días',
      'Tiempo de carga < 2s (LCP) y CLS estable',
      'Retención móvil +15–20%'
    ]
  },
  'software': {
    title: 'Software a medida',
    summary: 'Tu proceso, tu herramienta. Automatizamos y ordenamos el negocio.',
    forWho: [
      'Empresas con procesos manuales o dispersos',
      'Equipos que usan planillas y quieren trazabilidad',
      'Emprendimientos que crecieron y necesitan control'
    ],
    fit: [
      'Necesitas un flujo con aprobaciones y estados',
      'Requieres perfiles/roles y auditoría',
      'Quieres reportes y métricas reales del negocio'
    ],
    ideas: [
      'ERP/CRM liviano por módulos',
      'Gestión de órdenes y servicios',
      'Inventario y compras con alertas',
      'Reporterías y BI básico'
    ],
    benefits: [
      'Menos errores y tareas repetitivas',
      'Visibilidad del estado real del negocio',
      'Base escalable para nuevas integraciones'
    ],
    kpis: [
      '-30–50% tiempo operativo',
      '-20–40% errores de ingreso',
      '+20–30% velocidad en atención'
    ]
  },
  'ia': {
    title: 'Soluciones de IA',
    summary: 'Atiende 24/7, clasifica, resume y encuentra información al instante.',
    forWho: [
      'Soporte/atención al cliente con alto volumen',
      'Áreas que procesan documentos o tickets',
      'Equipos que quieren respuestas internas rápidas'
    ],
    fit: [
      'Tienes preguntas frecuentes y tiempos de respuesta altos',
      'Debes resumir o comparar documentos',
      'Quieres búsqueda semántica sobre tus datos'
    ],
    ideas: [
      'Chatbot con base de conocimiento propia',
      'Clasificación y priorización automática de tickets',
      'Resumen y extracción de datos desde PDFs',
      'Buscador inteligente para el equipo'
    ],
    benefits: [
      'Atención inmediata y consistente',
      'Ahorro de horas hombre',
      'Mejor experiencia de usuario'
    ],
    kpis: [
      '-30–60% tiempo medio de respuesta',
      '-20–40% volumen atendido por humanos',
      '+15–25% satisfacción de usuarios'
    ]
  },
  'apis': {
    title: 'Integración de APIs',
    summary: 'Conectamos pagos, ERPs, logística y facturación. Datos sincronizados.',
    forWho: [
      'Tiendas y distribuidores que necesitan automatizar',
      'Empresas con sistemas que no “conversan” entre sí',
      'Pymes que requieren facturación electrónica y conciliación'
    ],
    fit: [
      'Haces procesos manuales entre plataformas',
      'Pierdes pedidos o duplicas información',
      'Necesitas webhooks y monitoreo de integraciones'
    ],
    ideas: [
      'Pagos (Transbank/MercadoPago)',
      'Facturación electrónica (proveedor/SDK que uses)',
      'Integraciones logísticas y tracking',
      'ETLs simples y sincronización programada'
    ],
    benefits: [
      'Menos fricción y errores',
      'Trazabilidad de punta a punta',
      'Escalabilidad con monitoreo y alertas'
    ],
    kpis: [
      'Pedidos despachados 2× más rápido',
      '-30–50% errores de conciliación',
      'Tiempos de integración medidos en días'
    ]
  }
};

export const servicesIndex = (Object.keys(servicesData) as ServiceSlug[]).map((slug) => ({
  slug,
  label: servicesData[slug].title,
  summary: servicesData[slug].summary
}));
