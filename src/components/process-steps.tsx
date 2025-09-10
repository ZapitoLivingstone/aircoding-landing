'use client';
import { motion, useScroll, useTransform, type Variants, type MotionValue } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { useI18n } from '@/providers/ui';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fromLeft: Variants = { hidden: { opacity: 0, x: -28 }, show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };
const fromRight: Variants = { hidden: { opacity: 0, x: 28 },  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

export default function ProcessSteps() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.25'] });

  // Progreso y glow del timeline (sobrio)
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.18, 0.45]);

  const title = lang === 'en' ? 'How we work' : 'Nuestro proceso';
  const steps = lang === 'en'
    ? [
        { n:'01', t:'Discovery',          d:'Tell us your idea or need. We align expectations and goals.' },
        { n:'02', t:'Personalized quote', d:'Scope, timeline and price — clear and upfront.' },
        { n:'03', t:'Build in sprints',   d:'Short iterations with visible progress and constant feedback.' },
        { n:'04', t:'Launch & support',   d:'Go live, monitor, and keep improving with us.' },
      ]
    : [
        { n:'01', t:'Descubrimiento',       d:'Cuéntanos tu idea o necesidad. Alineamos expectativas y objetivos.' },
        { n:'02', t:'Cotización a medida',  d:'Alcance, tiempos y precio — claro y transparente.' },
        { n:'03', t:'Desarrollo en sprints',d:'Iteraciones cortas con avances visibles y feedback constante.' },
        { n:'04', t:'Lanzamiento y soporte',d:'Publicamos, monitoreamos y seguimos mejorando contigo.' },
      ];

  // ✅ estilo del track progresivo (sin `any`)
  const progressStyle = useMemo(
    () => ({
      transformOrigin: 'top' as const,
      background:
        'linear-gradient(to bottom, color-mix(in oklab, var(--acc-indigo) 70%, transparent), color-mix(in oklab, var(--acc-cyan) 70%, transparent))',
    }),
    []
  );

  const glowStyle = useMemo(
    () => ({
      background:
        'radial-gradient(closest-side, color-mix(in oklab, var(--acc-indigo) 14%, transparent), transparent 70%)',
    }),
    []
  );

  const haloStyle = useMemo(
    () => ({
      background:
        'radial-gradient(circle at center, color-mix(in oklab, var(--acc-indigo) 18%, transparent), transparent 60%)',
    }),
    []
  );

  const pillStyle = useMemo(
    () => ({
      background:
        'linear-gradient(180deg, color-mix(in oklab, var(--acc-indigo) 70%, white 0%), color-mix(in oklab, var(--acc-cyan) 65%, var(--acc-indigo)))',
      boxShadow: '0 6px 18px color-mix(in oklab, var(--acc-indigo) 22%, transparent)',
    }),
    []
  );

  const underlineStyle = useMemo(
    () => ({
      background:
        'linear-gradient(90deg, color-mix(in oklab, var(--acc-indigo) 42%, transparent), color-mix(in oklab, var(--acc-cyan) 42%, transparent))',
    }),
    []
  );

  const beatStyle = useMemo(
    () => ({
      background:
        'radial-gradient(closest-side, color-mix(in oklab, var(--acc-cyan) 22%, transparent), transparent 70%)',
    }),
    []
  );

  return (
    <section className="container py-16" id="proceso">
      {/* Título con subrayado indigo→cyan */}
      <div className="relative inline-block">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded"
          style={underlineStyle}
        />
      </div>

      <div ref={ref} className="relative mt-10">
        {/* Timeline central */}
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px sm:left-1/2">
          <div className="h-full w-px" style={{ backgroundColor: 'color-mix(in oklab, var(--border) 100%, transparent)' }} />
          <motion.div
            aria-hidden
            className="absolute left-0 top-0 h-full w-px"
            style={{ ...progressStyle, scaleY } as Record<string, string | MotionValue<number>>}
          />
          {/* Glow suave alrededor del track */}
          <motion.div aria-hidden style={{ opacity: glowOpacity }} className="absolute -left-6 top-0 h-full w-12">
            <div className="h-full w-full" style={glowStyle} />
          </motion.div>
        </div>

        {/* Pasos alternados */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }} className="space-y-10">
          {steps.map((s, i) => {
            const left = i % 2 === 0;
            const variants = left ? fromLeft : fromRight;

            return (
              <div key={s.n} className={`grid gap-4 sm:grid-cols-2 ${left ? 'sm:text-right' : 'sm:text-left'}`}>
                {/* Card */}
                <motion.div variants={variants} className={`${left ? '' : 'sm:order-2'}`}>
                  <div
                    className="group relative inline-block rounded-2xl border bg-[color:var(--surface)] px-6 py-5 backdrop-blur shadow-token transition hover:-translate-y-1"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    {/* halo muy sutil detrás de la card */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute -z-10 -top-10 -left-10 h-32 w-32 rounded-full blur-2xl"
                      initial={{ opacity: 0.12, scale: 0.9 }} whileInView={{ opacity: 0.22, scale: 1 }}
                      viewport={{ once: true }} transition={{ duration: 0.8 }}
                      style={haloStyle}
                    />
                    {/* Número de paso */}
                    <motion.span
                      className="mr-3 inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold text-white"
                      whileHover={{ scale: 1.06 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={pillStyle}
                    >
                      {s.n}
                    </motion.span>

                    <span className="text-lg font-semibold">{s.t}</span>
                    <p className={`mt-2 max-w-prose text-muted ${left ? 'ml-auto' : ''}`}>{s.d}</p>

                    {/* Subrayado al hover (indigo→cyan) */}
                    <motion.span
                      aria-hidden
                      className={`absolute ${left ? 'left-6' : 'right-6'} bottom-3 h-[2px] w-12 origin-left rounded`}
                      initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      style={underlineStyle}
                    />
                  </div>
                </motion.div>

                {/* Punto del timeline */}
                <div className={`${left ? '' : 'sm:order-1'} sm:flex sm:justify-center`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-2 sm:mt-0"
                  >
                    {/* “latido” discreto */}
                    <motion.span
                      aria-hidden
                      className="absolute -inset-3 rounded-full"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.65, 0.35] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                      style={beatStyle}
                    />
                    <div
                      className="relative h-3 w-3 rounded-full ring-4"
                      style={{
                        background:
                          'linear-gradient(180deg, color-mix(in oklab, var(--acc-indigo) 70%, white 0%), color-mix(in oklab, var(--acc-cyan) 65%, var(--acc-indigo)))',
                        boxShadow: '0 6px 16px color-mix(in oklab, var(--acc-cyan) 22%, transparent)',
                        borderColor: 'transparent',
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
