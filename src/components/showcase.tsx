'use client';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import Link from 'next/link';
import { useMemo, useRef } from 'react';
import { useI18n } from '@/providers/ui';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const itemIn: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } } };

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-lg px-2.5 py-1 text-xs ring-1"
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

export default function Showcase() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [24, -24]);

  const t = useMemo(() => {
    if (lang === 'en') {
      return {
        titleUse: 'Use cases',
        legendUse: 'Pain → Approach → Deliverable',
        titleBp: 'Blueprints',
        legendBp: 'What you get • Time • From',
        contactCta: 'Book a 15-min call',
        pricingNote: 'From: on quote (transparent scope & cost).',
        extras: 'Optional extras',
        tagsLabel: 'Tags',
        includes: 'Included',
        time: 'Estimated time',
        from: 'From',
        cases: [
          {
            pain: 'No online sales or low conversion.',
            approach: 'Shopify/Next.js storefront with clean IA, payments and basic analytics.',
            deliverable: 'Live store + payment gateway + product/content model.',
            tags: ['Shopify', 'Next.js', 'Payments'],
          },
          {
            pain: 'Leads lost in forms and DMs.',
            approach: 'Landing with clear offer, trust signals and tracked forms.',
            deliverable: 'Conversion-ready landing + CRM/email handoff.',
            tags: ['Landing', 'Tracking', 'Forms'],
          },
          {
            pain: 'Scattered ops, manual spreadsheets.',
            approach: 'Light admin panel for listings, orders or bookings.',
            deliverable: 'Secure backoffice with roles and audit basics.',
            tags: ['Backoffice', 'Auth', 'Roles'],
          },
        ],
        blueprints: [
          {
            name: 'E-commerce starter',
            includes: ['Theme setup & tweaks', 'Payments & shipping basics', 'Content model & training'],
            time: '2-4 weeks (depends on catalog & logistics)',
            fromText: 'On quote',
            tags: ['Shopify', 'SEO basics', 'Analytics'],
            optional: ['Email flows (welcome/abandoned cart)', 'Product reviews', 'Custom sections'],
          },
          {
            name: 'Portfolio / Company site',
            includes: ['Next.js + Tailwind', 'Responsive & accessible UI', 'Contact form + anti-spam'],
            time: '1-3 weeks (up to ~6 pages)',
            fromText: 'On quote',
            tags: ['Next.js', 'A11y', 'Forms'],
            optional: ['Blog/News', 'Basic CMS', 'Multi-language'],
          },
          {
            name: 'Backoffice lite',
            includes: ['Auth + roles', 'CRUD with filters', 'Exports & basic audits'],
            time: '2-5 weeks (3–5 entities)',
            fromText: 'On quote',
            tags: ['Next.js', 'DB/API', 'RBAC'],
            optional: ['Metrics dashboard', 'Webhooks', 'Bulk import'],
          },
        ],
      };
    }
    return {
      titleUse: 'Casos de uso',
      legendUse: 'Dolor → Enfoque → Entregable',
      titleBp: 'Blueprints',
      legendBp: 'Qué recibes • Tiempo • Desde',
      contactCta: 'Agenda una llamada de 15 min',
      pricingNote: 'Desde: a cotizar (alcance y costo transparentes).',
      extras: 'Extras opcionales',
      tagsLabel: 'Etiquetas',
      includes: 'Incluye',
      time: 'Tiempo estimado',
      from: 'Desde',
      cases: [
        {
          pain: 'Sin ventas online o baja conversión.',
          approach: 'Tienda Shopify/Next.js con IA clara, pagos y analítica básica.',
          deliverable: 'Tienda en producción + pasarela de pago + modelo de contenidos.',
          tags: ['Shopify', 'Next.js', 'Pagos'],
        },
        {
          pain: 'Leads perdidos en formularios y mensajes.',
          approach: 'Landing con propuesta clara, pruebas de confianza y formularios medidos.',
          deliverable: 'Landing lista para convertir + traspaso a CRM/email.',
          tags: ['Landing', 'Tracking', 'Forms'],
        },
        {
          pain: 'Operaciones dispersas y planillas manuales.',
          approach: 'Panel administrativo liviano para catálogos, pedidos o reservas.',
          deliverable: 'Backoffice seguro con roles y auditorías básicas.',
          tags: ['Backoffice', 'Auth', 'Roles'],
        },
      ],
      blueprints: [
        {
          name: 'E-commerce starter',
          includes: ['Setup & ajustes de tema', 'Pagos & envíos básicos', 'Modelo de contenidos & capacitación'],
          time: '2-4 semanas (depende de catálogo y logística)',
          fromText: 'A cotizar',
          tags: ['Shopify', 'SEO básico', 'Analytics'],
          optional: ['Flujos de email (bienvenida/abandonado)', 'Reseñas', 'Secciones personalizadas'],
        },
        {
          name: 'Sitio portfolio / empresa',
          includes: ['Next.js + Tailwind', 'UI responsive y accesible', 'Formulario de contacto + anti-spam'],
          time: '1-3 semanas (hasta ~6 páginas)',
          fromText: 'A cotizar',
          tags: ['Next.js', 'A11y', 'Forms'],
          optional: ['Blog/Noticias', 'CMS básico', 'Multi-idioma'],
        },
        {
          name: 'Backoffice lite',
          includes: ['Auth + roles', 'CRUD con filtros', 'Exportaciones & auditorías básicas'],
          time: '2-5 semanas (3–5 entidades)',
          fromText: 'A cotizar',
          tags: ['Next.js', 'DB/API', 'RBAC'],
          optional: ['Dashboard de métricas', 'Webhooks', 'Importación masiva'],
        },
      ],
    };
  }, [lang]);

  return (
    <section className="container py-16" id="proyectos">
      {/* ===== Fila 1: Casos de uso ===== */}
      <div className="mb-6 flex items-end justify-between">
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
        className="grid gap-6 md:grid-cols-3"
      >
        {t.cases.map((c, i) => (
          <motion.div
            key={`uc-${i}`}
            variants={itemIn}
            className="rounded-2xl border bg-[color:var(--surface)] p-6 backdrop-blur shadow-token"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="text-xs uppercase tracking-wide text-muted">{t.tagsLabel}</div>
            <div className="mt-1 flex flex-wrap gap-2">
              {c.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
            </div>

            <h3 className="mt-4 text-lg font-semibold">{c.pain}</h3>
            <div className="mt-3 space-y-2 text-sm">
              <p><span className="font-medium" style={{ color: 'color-mix(in oklab, var(--fg) 92%, transparent)' }}>{lang === 'en' ? 'Approach:' : 'Enfoque:'}</span> {c.approach}</p>
              <p><span className="font-medium" style={{ color: 'color-mix(in oklab, var(--fg) 92%, transparent)' }}>{lang === 'en' ? 'Deliverable:' : 'Entregable:'}</span> {c.deliverable}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ===== Fila 2: Blueprints / Paquetes base ===== */}
      <div className="mt-14 mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{t.titleBp}</h2>
        <span className="text-sm text-muted">{t.legendBp}</span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-6 md:grid-cols-3"
      >
        {t.blueprints.map((bp, i) => (
          <motion.div
            key={`bp-${i}`}
            variants={itemIn}
            className="group relative overflow-hidden rounded-2xl border bg-[color:var(--surface)] p-6 backdrop-blur shadow-token"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* Halo sutil */}
            <motion.span
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full blur-2xl"
              initial={{ opacity: 0.12, scale: 0.9 }}
              whileInView={{ opacity: 0.22, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{
                background:
                  'radial-gradient(circle at center, color-mix(in oklab, var(--acc-indigo) 18%, transparent), transparent 60%)',
              }}
            />
            <h3 className="text-lg font-semibold">{bp.name}</h3>

            <div className="mt-3">
              <div className="text-xs uppercase tracking-wide text-muted">{t.includes}</div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                {bp.includes.map(li => <li key={li}>{li}</li>)}
              </ul>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {bp.tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs text-muted">{t.time}</div>
                <div className="mt-0.5 font-medium">{bp.time}</div>
              </div>
              <div className="rounded-xl border p-3" style={{ borderColor: 'var(--border)' }}>
                <div className="text-xs text-muted">{t.from}</div>
                <div className="mt-0.5 font-medium">{bp.fromText} <span className="text-muted">— {t.pricingNote}</span></div>
              </div>
            </div>

            {bp.optional?.length ? (
              <details className="mt-4 rounded-xl border p-3 open:shadow-token" style={{ borderColor: 'var(--border)' }}>
                <summary className="cursor-pointer text-sm font-medium">{t.extras}</summary>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {bp.optional.map(op => <li key={op}>{op}</li>)}
                </ul>
              </details>
            ) : null}
          </motion.div>
        ))}
      </motion.div>

      {/* CTA honesto */}
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted">
          {lang === 'en'
            ? 'Small, transparent team (currently one person). Invoices available. Clear scope before we start.'
            : 'Equipo pequeño y transparente (actualmente una persona). Emito factura. Alcance claro antes de comenzar.'}
        </p>
        <Link
          href="#contacto"
          className="btn-hero focus-ring"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem' }}
        >
          {t.contactCta} <span className="icon">→</span>
        </Link>
      </div>
    </section>
  );
}
