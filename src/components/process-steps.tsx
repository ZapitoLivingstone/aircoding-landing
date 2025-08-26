'use client';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { n: '01', t: 'Descubrimiento', d: 'Entendemos tu negocio y definimos objetivos claros.' },
  { n: '02', t: 'Propuesta', d: 'Alcance, tiempos y costos — sin letra chica.' },
  { n: '03', t: 'Desarrollo ágil', d: 'Sprints cortos, avances visibles y feedback continuo.' },
  { n: '04', t: 'Lanzamiento & Soporte', d: 'Deploy, monitoreo y mejoras mensuales opcionales.' },
];

/* Variants para stagger y entradas laterales */
const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const fromLeft: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const fromRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function ProcessSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.75', 'end 0.25'], // cuándo empieza/termina el progress
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.6]);

  return (
    <section className="container py-16" id="proceso">
      {/* título con subrayado */}
      <div className="relative inline-block">
        <h2 className="text-2xl font-bold md:text-3xl">Nuestro proceso</h2>
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.9 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded bg-gradient-to-r from-teal-400 to-teal-200/60"
        />
      </div>

      <div ref={ref} className="relative mt-10">
        {/* track central */}
        <div className="pointer-events-none absolute left-4 top-0 h-full w-px sm:left-1/2">
          <div className="h-full w-px bg-white/10" />
          {/* progress que crece con el scroll */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-teal-400 via-teal-300/80 to-transparent"
          />
          {/* glow suave acompañando el progress */}
          <motion.div
            style={{ opacity: glowOpacity }}
            className="absolute -left-6 top-0 h-full w-12 bg-[radial-gradient(closest-side,_rgba(0,179,164,0.18),_transparent_70%)]"
          />
        </div>

        {/* pasos */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="space-y-10"
        >
          {steps.map((s, i) => {
            const left = i % 2 === 0;
            const variants = left ? fromLeft : fromRight;

            return (
              <div key={s.n} className={`grid gap-4 sm:grid-cols-2 ${left ? 'sm:text-right' : 'sm:text-left'}`}>
                {/* columna de contenido */}
                <motion.div variants={variants} className={`${left ? '' : 'sm:order-2'}`}>
                  <div
                    className="group relative inline-block rounded-2xl border border-white/10 bg-white/5 px-6 py-5
                               shadow-xl backdrop-blur transition hover:-translate-y-1 hover:bg-white/10
                               hover:shadow-[0_20px_60px_rgba(0,179,164,.15)]"
                  >
                    {/* halo decorativo dentro del card */}
                    <motion.div
                      aria-hidden
                      className="pointer-events-none absolute -z-10 -top-10 -left-10 h-32 w-32 rounded-full
                                 bg-[radial-gradient(circle_at_center,rgba(0,179,164,0.22),transparent_60%)] blur-2xl"
                      initial={{ opacity: 0.15, scale: 0.9 }}
                      whileInView={{ opacity: 0.3, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    />
                    {/* badge del paso */}
                    <motion.span
                      className="mr-3 inline-flex items-center justify-center rounded-full bg-[var(--ac-teal)] px-3 py-1 text-sm font-semibold text-white"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {s.n}
                    </motion.span>
                    <span className="text-lg font-semibold">{s.t}</span>
                    <p className={`mt-2 max-w-prose text-slate-300 ${left ? 'ml-auto' : ''}`}>{s.d}</p>
                    {/* underline animado al hover */}
                    <motion.span
                      aria-hidden
                      className={`absolute ${left ? 'left-6' : 'right-6'} bottom-3 h-[2px] w-10 origin-left rounded bg-gradient-to-r from-teal-400 to-teal-200/60`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </motion.div>

                {/* columna del punto central */}
                <div className={`${left ? '' : 'sm:order-1'} sm:flex sm:justify-center`}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mt-2 sm:mt-0"
                  >
                    {/* pulso */}
                    <motion.span
                      aria-hidden
                      className="absolute -inset-3 rounded-full bg-[radial-gradient(closest-side,rgba(0,179,164,0.25),transparent_70%)]"
                      animate={{ scale: [1, 1.15, 1], opacity: [0.45, 0.8, 0.45] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                    />
                    {/* punto */}
                    <div className="relative h-3 w-3 rounded-full bg-[var(--ac-accent)] ring-4 ring-teal-500/20" />
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
