'use client';
import { motion, type Variants } from 'framer-motion';
import { useI18n } from '@/providers/ui';
import { useMemo } from 'react';

type IconName = 'clarity' | 'communication' | 'milestones' | 'maintainable' | 'security' | 'support';
type Benefit = { h: string; p: string };

type Content = {
  titleB: string;
  subtitleB: string;
  benefits: Benefit[];
  note: string;
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const itemIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

function Icon({ name }: { name: IconName }) {
  switch (name) {
    case 'clarity':
      return (
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3l8 4v6c0 5-8 8-8 8S4 18 4 13V7l8-4Z"/><path d="M9.5 12.5 11 14l3.5-3.5" strokeLinecap="round"/>
        </svg>
      );
    case 'communication':
      return (
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16v9a3 3 0 0 1-3 3H9l-5 3V9a3 3 0 0 1 3-3Z"/><path d="M8 10h8M8 13h6" strokeLinecap="round"/>
        </svg>
      );
    case 'milestones':
      return (
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18" strokeLinecap="round"/><path d="M8 14h4l-2 3" strokeLinecap="round"/>
        </svg>
      );
    case 'maintainable':
      return (
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 16 4 12l4-4M16 8l4 4-4 4" strokeLinecap="round"/><path d="M14 4 10 20" strokeLinecap="round"/>
        </svg>
      );
    case 'security':
      return (
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4Z"/><path d="M9.5 12.5 11 14l3.5-3.5" strokeLinecap="round"/>
        </svg>
      );
    default: // 'support'
      return (
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="opacity-90" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v6l3 2" strokeLinecap="round"/>
        </svg>
      );
  }
}

/** Texto reducido y enfocado en conversión */
const TEXT: Record<'en' | 'es', Content> = {
  en: {
    titleB: 'What you get',
    subtitleB: 'Real value from day one.',
    benefits: [
      { h: 'Ownership',          p: 'Your code, infrastructure and data.' },
      { h: 'Post-launch support',p: 'Monitoring and iterative improvements.' },
      { h: 'Performance & A11y', p: 'Fast, accessible, modern experiences.' },
    ],
    note: 'Formal contract & invoice • 24h response time.',
  },
  es: {
    titleB: 'Lo que obtienes',
    subtitleB: 'Valor real desde el primer día.',

    benefits: [
      { h: 'Propiedad total',        p: 'Tu código, tu infraestructura y tus datos.' },
      { h: 'Soporte post-lanzamiento', p: 'Monitoreo y mejoras iterativas.' },
      { h: 'Rendimiento y A11y',     p: 'Experiencias rápidas, accesibles y modernas.' },
    ],
    note: 'Contrato y factura • Respuesta en 24h.',
  },
};

export default function ValueProps() {
  const { lang } = useI18n();
  const t = useMemo<Content>(() => (lang === 'en' ? TEXT.en : TEXT.es), [lang]);

  return (
    <section className="container py-16" id="valor" key={lang}>
      {/* B) Beneficios */}
        <h2 className="text-2xl font-bold md:text-3xl">{t.titleB}</h2>
        <p className="mt-1 text-sm text-muted">{t.subtitleB}</p>

      <motion.div
        variants={container}
        initial={false}
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {t.benefits.map((b, i) => (
          <motion.article
            key={`benefit-${b.h}`}
            variants={itemIn}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
              transition={{ duration: 0.45, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background:
                  'linear-gradient(90deg, color-mix(in oklab, var(--acc-indigo) 42%, transparent), color-mix(in oklab, var(--acc-cyan) 42%, transparent))',
              }}
            />
          </motion.article>
        ))}
      </motion.div>

      {/* Nota final (sin CTA redundante) */}
      <div className="mt-10 flex flex-col items-center gap-3 text-center">
        <p className="text-sm text-muted">{t.note}</p>
      </div>
    </section>
  );
}
