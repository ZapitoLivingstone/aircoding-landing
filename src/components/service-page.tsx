'use client';

import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/providers/ui';

export type ServiceKind = 'web-movil' | 'software' | 'ia' | 'apis';

export type ServicePageProps = {
  kind: ServiceKind;
  title: string;
  summary: string;
  forWho: string[];
  fit: string[];
  ideas: string[];
  benefits: string[];
  kpis: string[];
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
const listStagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };

/* ---------- Badge con el logo, glow y tilt suave ---------- */
function LogoBadge() {
  return (
    <motion.div
      className="absolute right-4 top-4"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        whileHover={{ rotate: 2, scale: 1.03 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-full p-[2px] bg-gradient-to-br from-teal-400/30 to-transparent"
      >
        <div className="rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-md">
          <Image
            src="/Logo_AirCoding-sin-fondo.png"
            alt="AirCoding"
            width={40}
            height={40}
            className="rounded-full select-none"
            priority
          />
        </div>
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-full blur-2xl"
          style={{ boxShadow: '0 0 80px 24px rgba(0,179,164,.25)' }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ---------- Item con puntito + animación ---------- */
function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <motion.li
      variants={fadeInUp}
      className="flex gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
    >
      <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-[var(--ac-accent)]" />
      <span className="text-sm text-slate-200">{children}</span>
    </motion.li>
  );
}

/* ---------- Catálogo de soluciones (tabla -> cards) ---------- */
type CatalogItem = {
  id: string;
  title: { es: string; en: string };
  includes: { es: string; en: string };
  when: { es: string; en: string };
};

const catalogAll: CatalogItem[] = [
  {
    id: 'landing',
    title: { es: 'Landing Page Profesional', en: 'Professional Landing Page' },
    includes: {
      es: 'Página de una sección en Next.js, diseño moderno, responsive, SEO y carga rápida.',
      en: 'One-page Next.js site, modern design, responsive, SEO and fast loading.',
    },
    when: {
      es: 'Campañas publicitarias, productos específicos o presentación rápida.',
      en: 'Ad campaigns, specific products, or quick business presentation.',
    },
  },
  {
    id: 'corporate',
    title: { es: 'Sitio Web Corporativo', en: 'Corporate Website' },
    includes: {
      es: '4–6 secciones (Inicio, Servicios, Nosotros, Contacto, Blog), CMS headless, hosting optimizado.',
      en: '4–6 sections (Home, Services, About, Contact, Blog), headless CMS, optimized hosting.',
    },
    when: {
      es: 'Presencia sólida en internet y autogestión de contenido.',
      en: 'Solid online presence and self-managed content.',
    },
  },
  {
    id: 'ecommerce',
    title: { es: 'E-commerce Escalable', en: 'Scalable E-commerce' },
    includes: {
      es: 'Tienda con carrito, checkout seguro, pagos (Transbank/Stripe), gestión de productos y pedidos.',
      en: 'Store with cart, secure checkout, payments (Transbank/Stripe), product & order management.',
    },
    when: {
      es: 'Vender en línea con un sistema confiable y personalizable.',
      en: 'Sell online with a reliable and customizable system.',
    },
  },
  {
    id: 'erpcrm',
    title: { es: 'Sistema Interno a Medida (ERP/CRM)', en: 'Custom Internal System (ERP/CRM)' },
    includes: {
      es: 'Login, roles, inventario/clientes, reportes y panel administrativo.',
      en: 'Login, roles, inventory/customers, reports and admin panel.',
    },
    when: {
      es: 'Optimizar procesos internos y digitalizar la gestión.',
      en: 'Optimize internal processes and digitize operations.',
    },
  },
  {
    id: 'saas',
    title: { es: 'Plataforma SaaS Multiusuario', en: 'Multi-tenant SaaS Platform' },
    includes: {
      es: 'Suscripciones, múltiples roles, tiempo real y dashboards personalizados.',
      en: 'Subscriptions, multi-roles, real-time features and custom dashboards.',
    },
    when: {
      es: 'Vender software como servicio (control de ventas, reservas, etc.).',
      en: 'Sell software as a service (sales control, bookings, etc.).',
    },
  },
  {
    id: 'mvp',
    title: { es: 'Aplicación Móvil (MVP)', en: 'Mobile App (MVP)' },
    includes: {
      es: 'App básica (login, CRUD, Supabase/Firebase), publicación en stores.',
      en: 'Basic app (login, CRUD, Supabase/Firebase), store publishing.',
    },
    when: {
      es: 'Validar una idea de negocio en el mercado.',
      en: 'Validate a business idea in the market.',
    },
  },
  {
    id: 'mobile-mid',
    title: { es: 'Aplicación Móvil Intermedia', en: 'Mid-level Mobile App' },
    includes: {
      es: 'Push, pagos, múltiples roles, geolocalización básica.',
      en: 'Push, payments, multiple roles, basic geolocation.',
    },
    when: {
      es: 'Delivery, reservas o servicios on-demand.',
      en: 'Delivery, bookings or on-demand services.',
    },
  },
  {
    id: 'marketplace',
    title: { es: 'App Compleja / Marketplace', en: 'Complex App / Marketplace' },
    includes: {
      es: 'Tipo Uber/Rappi: múltiples roles, transacciones, IA y geolocalización avanzada.',
      en: 'Uber/Rappi-style: multiple roles, transactions, AI and advanced geolocation.',
    },
    when: {
      es: 'Proyectos de gran escala o startups que requieren robustez.',
      en: 'Large-scale projects or startups requiring robustness.',
    },
  },
  {
    id: 'api-simple',
    title: { es: 'Integración API Simple', en: 'Simple API Integration' },
    includes: {
      es: 'Conexión a un servicio externo (Maps, OpenAI, Stripe, Notion...).',
      en: 'Connect to an external service (Maps, OpenAI, Stripe, Notion...).',
    },
    when: {
      es: 'Añadir una función extra sin rehacer el sistema.',
      en: 'Add a feature without rewriting your system.',
    },
  },
  {
    id: 'api-complex',
    title: { es: 'Integración API Compleja', en: 'Complex API Integration' },
    includes: {
      es: 'Varias APIs (pagos + logística + reportes), automatización de flujos.',
      en: 'Multiple APIs (payments + logistics + reports), automated workflows.',
    },
    when: {
      es: 'Automatizar procesos con distintos servicios conectados.',
      en: 'Automate processes with multiple connected services.',
    },
  },
  {
    id: 'chatbot',
    title: { es: 'Chatbot con IA (Atención al Cliente)', en: 'AI Chatbot (Customer Support)' },
    includes: {
      es: 'OpenAI + base de conocimiento, historial en Supabase y FAQs.',
      en: 'OpenAI + knowledge base, Supabase history and FAQs.',
    },
    when: {
      es: 'Mejorar atención y ahorrar tiempo de soporte.',
      en: 'Improve support and save team time.',
    },
  },
  {
    id: 'predictive',
    title: { es: 'IA Predictiva y Análisis de Datos', en: 'Predictive AI & Analytics' },
    includes: {
      es: 'Dashboard de métricas, predicciones y personalización.',
      en: 'Metrics dashboard, predictions and personalization.',
    },
    when: {
      es: 'Tomar decisiones estratégicas usando datos.',
      en: 'Drive strategy with data insights.',
    },
  },
];

/* qué mostrar por servicio */
const pickByKind: Record<ServiceKind, string[]> = {
  'web-movil': ['landing', 'corporate', 'ecommerce', 'mvp', 'mobile-mid', 'marketplace'],
  software: ['erpcrm', 'saas', 'marketplace'],
  ia: ['chatbot', 'predictive'],
  apis: ['api-simple', 'api-complex'],
};

function Catalog({ kind }: { kind: ServiceKind }) {
  const { lang } = useI18n();
  const ids = pickByKind[kind];
  const items = catalogAll.filter((i) => ids.includes(i.id));

  return (
    <section className="mt-12">
      <h2 className="text-xl font-semibold">
        {lang === 'en' ? 'Solution catalog' : 'Catálogo de soluciones'}
      </h2>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {items.map((c, i) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur
                       transition hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_20px_60px_rgba(0,179,164,.15)]"
          >
            {/* línea superior animada */}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 + i * 0.02 }}
              className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-teal-400 to-teal-200/70"
            />
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">
                  {lang === 'en' ? c.title.en : c.title.es}
                </div>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {lang === 'en' ? c.includes.en : c.includes.es}
                </p>
              </div>
              <span className="rounded-full bg-[var(--ac-teal)]/15 px-3 py-1 text-xs text-[var(--ac-teal)] ring-1 ring-[var(--ac-teal)]/30">
                {lang === 'en' ? 'Included' : 'Incluye'}
              </span>
            </div>

            <div className="mt-3 rounded-lg bg-white/5 p-3 text-sm ring-1 ring-white/10">
              <span className="font-semibold">
                {lang === 'en' ? 'When to choose it:' : '¿Cuándo elegirlo?'}
              </span>{' '}
              <span className="text-[var(--muted)]">
                {lang === 'en' ? c.when.en : c.when.es}
              </span>
            </div>

            <div className="mt-4">
              <a href="/#contacto">
                <Button>
                  {lang === 'en' ? 'Get this quote' : 'Cotizar este'}
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default function ServicePage(props: ServicePageProps) {
  const { t, lang } = useI18n();

  return (
    <main className="container relative py-12">
      {/* HERO con logo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-700/40 to-teal-500/20 p-8 ring-1 ring-white/10"
      >
        <LogoBadge />
        <h1 className="text-3xl font-extrabold md:text-4xl">{props.title}</h1>
        <p className="mt-2 max-w-3xl text-slate-300">{props.summary}</p>
        <div className="mt-6">
          <a href="/#contacto">
            <Button>{lang === 'en' ? 'Get a quote' : 'Cotiza tu proyecto'}</Button>
          </a>
        </div>
      </motion.div>

      {/* CONTENIDO */}
      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {/* izquierda */}
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="text-xl font-semibold">
              {lang === 'en' ? 'Who is this for?' : '¿Para quién es?'}
            </h2>
            <motion.ul variants={listStagger} initial="hidden" animate="show" className="mt-4 grid gap-3 sm:grid-cols-2">
              {props.forWho.map((x) => <Bullet key={x}>{x}</Bullet>)}
            </motion.ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              {lang === 'en' ? 'It fits if you…' : 'Te sirve si…'}
            </h2>
            <motion.ul variants={listStagger} initial="hidden" animate="show" className="mt-4 grid gap-3 sm:grid-cols-2">
              {props.fit.map((x) => <Bullet key={x}>{x}</Bullet>)}
            </motion.ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold">
              {lang === 'en' ? 'Implementation ideas' : 'Ideas de implementación'}
            </h2>
            <motion.ul variants={listStagger} initial="hidden" animate="show" className="mt-4 grid gap-3 sm:grid-cols-2">
              {props.ideas.map((x) => <Bullet key={x}>{x}</Bullet>)}
            </motion.ul>
          </section>
        </div>

        {/* derecha */}
        <aside className="space-y-8">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">
              {lang === 'en' ? 'Benefits' : 'Beneficios'}
            </h3>
            <motion.ul variants={listStagger} initial="hidden" animate="show" className="mt-4 grid gap-3">
              {props.benefits.map((x) => <Bullet key={x}>{x}</Bullet>)}
            </motion.ul>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">
              {lang === 'en' ? 'Expected results' : 'Resultados esperados'}
            </h3>
            <motion.ul variants={listStagger} initial="hidden" animate="show" className="mt-4 grid gap-3">
              {props.kpis.map((x) => <Bullet key={x}>{x}</Bullet>)}
            </motion.ul>
          </section>
        </aside>
      </div>

      {/* catálogo de soluciones relacionado */}
      <Catalog kind={props.kind} />
    </main>
  );
}
