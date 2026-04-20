'use client';
import { motion, type Variants } from 'framer-motion';
import { useI18n } from '@/providers/ui';
import { useMemo } from 'react';

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
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

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
      { h: 'Rendimiento',     p: 'Experiencias rápidas, accesibles y modernas.' },
    ],
    note: 'factura • Respuesta en 24h.',
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
        {t.benefits.map((b) => (
          <motion.article
            key={`benefit-${b.h}`}
            variants={itemIn}
            className="rounded-2xl border bg-[color:var(--surface)] p-6 backdrop-blur shadow-token"
            style={{ borderColor: 'var(--border)' }}
          >
            <div className="text-lg font-semibold">{b.h}</div>
            <p className="mt-1 text-sm text-muted">{b.p}</p>
            <span
              aria-hidden
              className="mt-4 block h-[2px] w-12 rounded"
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
