'use client';

import Image from 'next/image';
import Link from 'next/link';
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
  // Web / Móvil
  {
    id: 'landing',
    title: { es: 'Landing Page (1–3 secciones)', en: 'Landing Page (1–3 sections)' },
    includes: {
      es: 'Next.js, diseño responsive, formulario de contacto, SEO básico.',
      en: 'Next.js, responsive design, contact form, basic SEO.',
    },
    when: {
      es: 'Presentación rápida de un servicio o campaña.',
      en: 'Quick presentation for a service or campaign.',
    },
  },
  {
    id: 'corporate',
    title: { es: 'Sitio Web Pequeño (4–5 páginas)', en: 'Small Website (4–5 pages)' },
    includes: {
      es: 'Secciones clave (Inicio, Servicios, Nosotros, Contacto, 1 página extra), CMS liviano.',
      en: 'Key sections (Home, Services, About, Contact, 1 extra page), lightweight CMS.',
    },
    when: {
      es: 'Necesitas presencia sólida y editar contenido sin depender de terceros.',
      en: 'You need a solid presence and self-managed content.',
    },
  },
  {
    id: 'ecommerce',
    title: { es: 'E-commerce Starter', en: 'E-commerce Starter' },
    includes: {
      es: 'Catálogo inicial, carrito, checkout, pagos (Transbank/Stripe).',
      en: 'Initial catalog, cart, checkout, payments (Transbank/Stripe).',
    },
    when: {
      es: 'Vender en línea de forma simple (catálogo inicial, reglas claras).',
      en: 'Sell online with a simple, starter catalog and clear rules.',
    },
  },
  {
    id: 'mvp',
    title: { es: 'App Móvil MVP', en: 'Mobile App MVP' },
    includes: {
      es: 'Flujo principal (login + 1 funcionalidad clave) con Supabase/Firebase.',
      en: 'Main flow (login + 1 core feature) with Supabase/Firebase.',
    },
    when: {
      es: 'Validar una idea sin construirlo todo.',
      en: 'Validate an idea without building everything.',
    },
  },

  // Software a medida (acotado)
  {
    id: 'erpcrm',
    title: { es: 'Panel Interno Lite', en: 'Internal Panel Lite' },
    includes: {
      es: 'Roles básicos, 1–2 módulos (p. ej., inventario y ventas), exportación CSV.',
      en: 'Basic roles, 1–2 modules (e.g., inventory and sales), CSV export.',
    },
    when: {
      es: 'Ordenar procesos y dejar planillas dispersas.',
      en: 'Organize processes and replace scattered spreadsheets.',
    },
  },

  // IA (enfocada y útil)
  {
    id: 'chatbot',
    title: { es: 'Chatbot FAQ con IA', en: 'AI FAQ Chatbot' },
    includes: {
      es: 'Base de conocimiento + respuestas 24/7, registro de conversaciones.',
      en: 'Knowledge base + 24/7 answers, conversation logs.',
    },
    when: {
      es: 'Reducir preguntas repetidas de clientes.',
      en: 'Reduce repetitive customer questions.',
    },
  },
  {
    id: 'predictive',
    title: { es: 'Resumen y Etiquetado con IA', en: 'AI Summaries & Tagging' },
    includes: {
      es: 'Resúmenes de textos/correos y etiquetado automático.',
      en: 'Summarize emails/texts and auto-tagging.',
    },
    when: {
      es: 'Ganas tiempo procesando información.',
      en: 'Save time processing information.',
    },
  },

  // Integraciones (una a la vez)
  {
    id: 'api-simple',
    title: { es: 'Integración API única', en: 'Single API Integration' },
    includes: {
      es: 'Conectar un servicio (Stripe/Transbank, Notion/Sheets, Chilexpress/Starken).',
      en: 'Connect one service (Stripe/Transbank, Notion/Sheets, Chilexpress/Starken).',
    },
    when: {
      es: 'Agregar una función sin rehacer tu sistema.',
      en: 'Add a feature without rewriting your system.',
    },
  },
];

const pickByKind: Record<ServiceKind, string[]> = {
  'web-movil': ['landing', 'corporate', 'ecommerce', 'mvp'],
  software: ['erpcrm'],
  ia: ['chatbot', 'predictive'],
  apis: ['api-simple'],
};


/* qué mostrar por servicio */


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
              <Link href="/#contacto">
                <Button>
                  {lang === 'en' ? 'Get this quote' : 'Cotizar este'}
                </Button>
              </Link>
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
          <Link href="/#contacto">
            <Button>{lang === 'en' ? 'Get a quote' : 'Cotiza tu proyecto'}</Button>
          </Link>
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
