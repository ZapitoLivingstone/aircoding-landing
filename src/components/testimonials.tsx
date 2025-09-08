'use client';
import { motion, type Variants } from 'framer-motion';
import { useMemo } from 'react';
import { useI18n } from '@/providers/ui';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const itemIn: Variants = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22,1,0.36,1] } } };

function Icon({ name }: { name: string }) {
  switch (name) {
    case 'clarity':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l8 4v6c0 5-8 8-8 8S4 18 4 13V7l8-4Z"/><path d="M9.5 12.5 11 14l3.5-3.5" strokeLinecap="round"/>
        </svg>
      );
    case 'communication':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16v9a3 3 0 0 1-3 3H9l-5 3V9a3 3 0 0 1 3-3Z"/><path d="M8 10h8M8 13h6" strokeLinecap="round"/>
        </svg>
      );
    case 'milestones':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18" strokeLinecap="round"/><path d="M8 14h4l-2 3" strokeLinecap="round"/>
        </svg>
      );
    case 'maintainable':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 16 4 12l4-4M16 8l4 4-4 4" strokeLinecap="round"/><path d="M14 4 10 20" strokeLinecap="round"/>
        </svg>
      );
    case 'security':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4Z"/><path d="M9.5 12.5 11 14l3.5-3.5" strokeLinecap="round"/>
        </svg>
      );
    default: // support
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v6l3 2" strokeLinecap="round"/>
        </svg>
      );
  }
}

export default function Testimonials() {
  const { lang } = useI18n();

  const t = useMemo(() => {
    if (lang === 'en') {
      return {
        titleA: 'Our commitments',
        subtitleA: 'How we work with you',
        titleB: 'What you get with AirCoding',
        subtitleB: 'Tangible benefits in every project',
        commitments: [
          { icon:'clarity',       h:'Transparent scope & pricing', p:'Clear proposals, fixed milestones and weekly updates. No hidden fees.' },
          { icon:'communication', h:'Direct communication',        p:'You talk to the person who builds. Fewer layers, faster feedback.' },
          { icon:'milestones',    h:'Milestone delivery',          p:'Short iterations with demos to validate early and reduce risk.' },
          { icon:'maintainable',  h:'Maintainable code',           p:'Clean architecture, docs and handover. Built to evolve.' },
          { icon:'security',      h:'Security & privacy first',    p:'Good practices by default and basic data protection hygiene.' },
          { icon:'support',       h:'Post-launch support',         p:'Monitoring and improvement cycles after go-live.' },
        ],
        benefits: [
          { h:'Invoices & contracts', p:'Formal quotes, invoicing and NDA on request.' },
          { h:'Accesibility & performance', p:'A11y, Core Web Vitals and sensible defaults.' },
          { h:'Ownership', p:'Your code, your infrastructure, your data.' },
          { h:'Small team reliability', p:'We are a small, transparent team (currently one person).' },
          { h:'Modern stack', p:'Next.js, Tailwind, Shopify, and well-supported services.' },
          { h:'Clear handoff', p:'Docs + walkthrough to operate without friction.' },
        ],
        cta: 'Book a 15-min call',
        note: 'Invoices available • Clear scope before we start.',
      };
    }
    return {
      titleA: 'Nuestros compromisos',
      subtitleA: 'Cómo trabajamos contigo',
      titleB: 'Lo que obtienes con AirCoding',
      subtitleB: 'Beneficios tangibles en cada proyecto',
      commitments: [
        { icon:'clarity',       h:'Alcance y precio transparentes', p:'Propuestas claras, hitos definidos y reportes semanales. Sin costos ocultos.' },
        { icon:'communication', h:'Comunicación directa',           p:'Hablas con quien construye. Menos capas, feedback más rápido.' },
        { icon:'milestones',    h:'Entregas por hitos',             p:'Iteraciones cortas con demos para validar temprano y reducir riesgo.' },
        { icon:'maintainable',  h:'Código mantenible',              p:'Arquitectura limpia, documentación y traspaso. Pensado para crecer.' },
        { icon:'security',      h:'Seguridad y privacidad primero', p:'Buenas prácticas por defecto y cuidado básico de datos.' },
        { icon:'support',       h:'Soporte post-lanzamiento',       p:'Monitoreo y ciclos de mejora después del go-live.' },
      ],
      benefits: [
        { h:'Facturas y contratos', p:'Cotización formal, emisión de factura y NDA si se requiere.' },
        { h:'Accesibilidad y performance', p:'A11y, Core Web Vitals y defaults sensatos.' },
        { h:'Propiedad', p:'Tu código, tu infraestructura, tus datos.' },
        { h:'Equipo pequeño confiable', p:'Somos un equipo pequeño y transparente (actualmente una persona).' },
        { h:'Stack moderno', p:'Next.js, Tailwind, Shopify y servicios bien soportados.' },
        { h:'Traspaso claro', p:'Docs + walkthrough para operar sin fricción.' },
      ],
      cta: 'Agenda una llamada de 15 min',
      note: 'Emito factura • Alcance claro antes de comenzar.',
    };
  }, [lang]);

  return (
    <section className="container py-16" id="compromisos">
      {/* Bloque A: Compromisos */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold md:text-3xl">{t.titleA}</h2>
        <p className="mt-1 text-sm text-muted">{t.subtitleA}</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {t.commitments.map((c) => (
          <motion.div
            key={c.h}
            variants={itemIn}
            className="group relative overflow-hidden rounded-2xl border bg-[color:var(--surface)] p-6 backdrop-blur shadow-token"
            style={{ borderColor: 'var(--border)' }}
          >
            {/* halo sutil */}
            <span
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full blur-2xl"
              style={{
                background:
                  'radial-gradient(circle at center, color-mix(in oklab, var(--acc-indigo) 18%, transparent), transparent 60%)',
                opacity: .22,
              }}
            />
            <div className="flex items-start gap-3">
              <span
                className="rounded-xl p-2.5 ring-1"
                style={{
                  color: 'oklch(0.73 0.15 264)', // indigo
                  background: 'color-mix(in oklab, oklch(0.73 0.15 264) 12%, transparent)',
                  borderColor: 'color-mix(in oklab, oklch(0.73 0.15 264) 24%, transparent)',
                }}
              >
                <Icon name={c.icon} />
              </span>
              <div>
                <h3 className="text-lg font-semibold">{c.h}</h3>
                <p className="mt-1 text-sm text-muted">{c.p}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Bloque B: Beneficios */}
      <div className="mt-14 mb-6">
        <h2 className="text-2xl font-bold md:text-3xl">{t.titleB}</h2>
        <p className="mt-1 text-sm text-muted">{t.subtitleB}</p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {t.benefits.map((b, i) => (
          <motion.div
            key={b.h}
            variants={itemIn}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
            className="rounded-2xl border bg-[color:var(--surface)] p-6 backdrop-blur shadow-token"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="text-lg font-semibold">{b.h}</div>
            <p className="mt-1 text-sm text-muted">{b.p}</p>
            <motion.span
              aria-hidden
              className="mt-4 block h-[2px] w-12 rounded"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22,1,0.36,1] }}
              style={{
                background:
                  'linear-gradient(90deg, color-mix(in oklab, var(--acc-indigo) 42%, transparent), color-mix(in oklab, var(--acc-cyan) 42%, transparent))',
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Nota + CTA opcional */}
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted">{t.note}</p>
        <a href="#contacto" className="btn-hero focus-ring" style={{ display:'inline-flex', alignItems:'center', gap:'.5rem' }}>
          {t.cta} <span className="icon">→</span>
        </a>
      </div>
    </section>
  );
}
