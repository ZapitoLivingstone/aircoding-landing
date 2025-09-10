'use client';

import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';
import { useI18n } from '@/providers/ui';

type Lang = 'en' | 'es';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const itemIn: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-md px-2.5 py-1 text-[11px] leading-none ring-1 transition-colors"
      style={{
        background: 'color-mix(in oklab, var(--surface-2), transparent 10%)',
        borderColor: 'var(--border)',
        color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
      }}
    >
      {children}
    </span>
  );
}

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={itemIn}
      className={[
        // layout
        'group relative flex flex-col rounded-2xl p-6',
        // visuals
        'border bg-[color:var(--surface)]/95 backdrop-blur',
        'shadow-sm hover:shadow-md',
        // ring/hover
        'transition-all duration-300 will-change-transform',
        'hover:-translate-y-1',
        'focus-within:-translate-y-1',
        className,
      ].join(' ')}
      style={{ borderColor: 'var(--border)' }}
    >
      {/* Glow sutil */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-30"
        style={{
          background:
            'radial-gradient(circle at center, color-mix(in oklab, var(--acc-indigo) 20%, transparent), transparent 60%)',
        }}
      />
      {children}
    </motion.div>
  );
}

type CaseItem = { pain: string; approach: string; deliverable: string; tags: string[] };
type BlueprintItem = {
  name: string;
  idealFor: string;
  includes: string[];
  fromText: string;
  tags: string[];
  optional?: string[];
};

const COPY: Record<
  Lang,
  {
    titleUse: string;
    legendUse: string;
    titleBp: string;
    legendBp: string;
    contactCta: string;
    pricingNote: string;
    extras: string;
    tagsLabel: string;
    includes: string;
    idealForLabel: string;
    from: string;
    cases: CaseItem[];
    blueprints: BlueprintItem[];
  }
> = {
  en: {
    titleUse: 'Looking for this?',
    legendUse: 'Problem → Plan → Outcome',
    titleBp: 'Recommended proposals',
    legendBp: 'What’s included • Ideal for • Starting at',
    contactCta: 'Schedule a meeting with us',
    pricingNote: 'Transparent scope & cost on quote.',
    extras: 'Add-ons',
    tagsLabel: 'Highlights',
    includes: 'Includes',
    idealForLabel: 'Ideal for',
    from: 'Starting at',
    cases: [
      {
        pain: 'Traffic but few sales.',
        approach: 'Clear offer, proof and frictionless checkout.',
        deliverable: 'Conversion-ready storefront + payments + tracking.',
        tags: ['More sales', 'Conversion', 'Fast launch'],
      },
      {
        pain: 'Leads go cold in DMs and forms.',
        approach: 'Landing that clarifies value and captures replies.',
        deliverable: 'Lead-gen landing + CRM/email handoff.',
        tags: ['Qualified leads', 'Clarity', 'Automation'],
      },
      {
        pain: 'Ops stuck in spreadsheets.',
        approach: 'Light backoffice to manage catalog, orders or bookings.',
        deliverable: 'Secure admin with roles, filters and exports.',
        tags: ['Time saved', 'Fewer errors', 'Visibility'],
      },
    ],
    blueprints: [
      {
        name: 'E-commerce Launch',
        idealFor: 'Brands that need to start selling online with confidence.',
        includes: ['Offer & structure workshop', 'Checkout & payments', 'Analytics & essential SEO'],
        fromText: 'On quote',
        tags: ['More sales', 'Trust signals', 'Scalable base'],
        optional: ['Email flows (welcome/abandoned)', 'Reviews', 'Custom sections'],
      },
      {
        name: 'Brand Website that Converts',
        idealFor: 'Service businesses that want authority and inbound leads.',
        includes: ['Next.js site (up to ~6 pages)', 'Mobile-first & accessible', 'Contact with anti-spam'],
        fromText: 'On quote',
        tags: ['Authority', 'SEO basics', 'Clear message'],
        optional: ['Blog/News', 'Basic CMS', 'Multi-language'],
      },
      {
        name: 'Backoffice Essentials',
        idealFor: 'Teams that outgrew spreadsheets and need control.',
        includes: ['Auth & roles', 'CRUD with filters', 'CSV exports & basic audit'],
        fromText: 'On quote',
        tags: ['Operational control', 'Less manual work', 'Visibility'],
        optional: ['Metrics dashboard', 'Webhooks', 'Bulk import'],
      },
    ],
  },
  es: {
    titleUse: '¿Buscas esto?',
    legendUse: 'Problema → Plan → Resultado',
    titleBp: 'Propuestas',
    legendBp: 'Qué incluye • Ideal para • Desde',
    contactCta: 'Agenda una reunión con nosotros',
    pricingNote: 'Alcance y costo transparentes, a cotizar.',
    extras: 'Detalles',
    tagsLabel: 'Atributos',
    includes: 'Incluye',
    idealForLabel: 'Ideal para',
    from: 'Desde',
    cases: [
      {
        pain: 'Hay visitas pero pocas ventas.',
        approach: 'Oferta clara, prueba social y pago sin fricción.',
        deliverable: 'Tienda lista para vender + pagos + medición.',
        tags: ['Más ventas', 'Conversión', 'Lanzamiento rápido'],
      },
      {
        pain: 'Leads se enfrían en formularios y mensajes.',
        approach: 'Landing que explica valor y captura leads que responden.',
        deliverable: 'Landing de captación + traspaso a CRM/email.',
        tags: ['Leads calificados', 'Claridad', 'Automatización'],
      },
      {
        pain: 'Operaciones atascadas en planillas.',
        approach: 'Backoffice liviano para catálogo, pedidos o reservas.',
        deliverable: 'Admin seguro con roles, filtros y exportaciones.',
        tags: ['Ahorro de tiempo', 'Menos errores', 'Visibilidad'],
      },
    ],
    blueprints: [
      {
        name: 'E-commerce',
        idealFor: 'Marcas que quieren empezar a vender online con confianza.',
        includes: ['Taller de oferta y estructura', 'Checkout y pagos', 'Analytics y SEO esencial'],
        fromText: 'A cotizar',
        tags: ['Más ventas', 'Confianza', 'Base escalable'],
        optional: ['Flujos de email (bienvenida/abandonado)', 'Reseñas', 'Secciones a medida'],
      },
      {
        name: 'Sitio de Marca que Convierte',
        idealFor: 'Servicios que buscan autoridad y leads entrantes.',
        includes: ['Sitio Next.js (hasta ~6 páginas)', 'Mobile-first y accesible', 'Contacto con anti-spam'],
        fromText: 'A cotizar',
        tags: ['Autoridad', 'SEO básico', 'Mensaje claro'],
        optional: ['Blog/Noticias', 'CMS básico', 'Multi-idioma'],
      },
      {
        name: 'Backoffice Esencial',
        idealFor: 'Equipos que superaron la planilla y necesitan control.',
        includes: ['Auth y roles', 'CRUD con filtros', 'Exportación CSV y auditoría básica'],
        fromText: 'A cotizar',
        tags: ['Control operativo', 'Menos trabajo manual', 'Visibilidad'],
        optional: ['Dashboard de métricas', 'Webhooks', 'Importación masiva'],
      },
    ],
  },
};

export default function Showcase() {
  const { lang } = useI18n();
  const l: Lang = (lang === 'en' || lang === 'es') ? lang : 'es';
  const t = COPY[l];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section className="container py-16" id="proyectos">
      {/* ===== Fila 1: ¿Buscas esto? ===== */}
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{t.titleUse}</h2>
        <span className="text-sm text-muted">{t.legendUse}</span>
      </div>

      <motion.div
        ref={ref}
        style={{ y }}
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {t.cases.map((c, i) => (
          <Card key={`uc-${i}`}>
            {/* header */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-tight md:text-lg">{c.pain}</h3>
              {/* underline animado */}
              <motion.span
                aria-hidden
                className="mt-1 block h-[2px] w-10 rounded"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  transformOrigin: 'left',
                  background:
                    'linear-gradient(90deg, color-mix(in oklab, var(--acc-indigo) 40%, transparent), color-mix(in oklab, var(--acc-cyan) 40%, transparent))',
                }}
              />
            </div>

            {/* chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {c.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            {/* body */}
            <div className="mt-4 space-y-2 text-sm text-muted">
              <p>
                <span className="font-medium text-[color:var(--fg)]/90">{l === 'en' ? 'Plan:' : 'Plan:'}</span>{' '}
                {c.approach}
              </p>
              <p>
                <span className="font-medium text-[color:var(--fg)]/90">
                  {l === 'en' ? 'Outcome:' : 'Resultado:'}
                </span>{' '}
                {c.deliverable}
              </p>
            </div>

            {/* footer spacer to igualar altura */}
            <div className="mt-4 flex-1" />
            <div className="pt-4">
              <Link
                href="#contacto"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ borderColor: 'var(--border)' }}
              >
                {l === 'en' ? 'Tell me about your case' : 'Cuéntame tu caso'}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* ===== Fila 2: Propuestas ===== */}
      <div className="mt-14 mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{t.titleBp}</h2>
        <span className="text-sm text-muted">{t.legendBp}</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {t.blueprints.map((bp, i) => (
          <Card key={`bp-${i}`}>
            {/* header */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-tight md:text-lg">{bp.name}</h3>
              <Badge>{bp.tags[0]}</Badge>
            </div>

            {/* ideal for */}
            <div className="mt-3 rounded-xl border p-3 text-sm" style={{ borderColor: 'var(--border)' }}>
              <div className="text-xs text-muted">{t.idealForLabel}</div>
              <div className="mt-0.5 text-[color:var(--fg)]/90">{bp.idealFor}</div>
            </div>

            {/* includes */}
            <div className="mt-3">
              <div className="text-xs uppercase tracking-wide text-muted">{t.includes}</div>
              <ul className="mt-2 grid gap-1.5 text-sm text-muted">
                {bp.includes.map((li) => (
                  <li key={li} className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--acc-indigo)]/60" />
                    <span>{li}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* tags */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {bp.tags.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
            </div>

            {/* pricing line (sin tiempos) */}
            <div className="mt-4 grid grid-cols-1 gap-3 text-sm">
              <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs text-muted">{t.from}</div>
                <div className="mt-0.5 font-medium">
                  {bp.fromText} <span className="text-muted">— {t.pricingNote}</span>
                </div>
              </div>
            </div>

            {/* add-ons */}
            {bp.optional?.length ? (
              <details
                className="mt-4 rounded-xl border p-3 open:shadow-token [&_summary]:cursor-pointer"
                style={{ borderColor: 'var(--border)' }}
              >
                <summary className="text-sm font-medium">{t.extras}</summary>
                <ul className="mt-2 grid gap-1.5 text-sm text-muted">
                  {bp.optional.map((op) => (
                    <li key={op} className="flex items-start gap-2">
                      <span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[color:var(--acc-cyan)]/60" />
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </details>
            ) : null}

            {/* equal height + CTA */}
            <div className="mt-4 flex-1" />
            <div className="pt-4">
              <Link
                href="#contacto"
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm ring-1 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{ borderColor: 'var(--border)' }}
              >
                {l === 'en' ? 'Discuss this proposal' : 'Conversemos esta propuesta'}
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* CTA final */}
      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted">
          {l === 'en'
            ? 'Small, transparent team (currently one person). Invoices available. Clear scope before we start.'
            : 'Equipo pequeño y transparente (actualmente una persona). Emite factura. Alcance claro antes de comenzar.'}
        </p>
        <Link
          href="#contacto"
          className="btn-hero focus-ring"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}
        >
          {t.contactCta} <span aria-hidden className="icon">→</span>
        </Link>
      </div>
    </section>
  );
}
