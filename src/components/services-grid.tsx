'use client';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { JSX } from 'react';

type Service = {
  key: 'web-movil' | 'software' | 'ia' | 'apis';
  title: string;
  desc: string;
  bullets: string[];
};

const services: Service[] = [
  { key: 'web-movil', title: 'Web & Móvil', desc: 'Sitios y apps de alto rendimiento listos para crecer.', bullets: ['Next.js / React Native', 'SEO & ASO', 'Escalable'] },
  { key: 'software',  title: 'Software a medida', desc: 'Tu proceso, tu herramienta. Automatiza y ordena.', bullets: ['Procesos ágiles', 'Seguridad', 'Soporte'] },
  { key: 'ia',        title: 'Soluciones de IA', desc: 'Bots, clasificación y búsqueda inteligente 24/7.', bullets: ['Chatbots', 'Automatización', 'Análisis'] },
  { key: 'apis',      title: 'Integración de APIs', desc: 'Pagos, ERPs y logística conectados sin dolor.', bullets: ['Pagos / ERPs', 'Terceros', 'Monitoreo'] },
];

const icons: Record<Service['key'], JSX.Element> = {
  'web-movil': (
    <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90">
      <rect x="3" y="4" width="14" height="10" rx="2" fill="currentColor" />
      <rect x="8" y="16" width="13" height="4" rx="1.5" fill="currentColor" />
    </svg>
  ),
  software: (
    <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90">
      <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-5v3m0 12v3M3 12h3m12 0h3M6.8 6.8 9 9m6 6 2.2 2.2M6.8 17.2 9 15m6-6 2.2-2.2"
            stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  ia: (
    <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90">
      <path d="M8 9a4 4 0 0 1 8 0v6a4 4 0 0 1-8 0V9Z" fill="currentColor" />
      <circle cx="9" cy="10" r="1" fill="#0EA5A4" />
      <circle cx="15" cy="10" r="1" fill="#0EA5A4" />
      <rect x="11" y="13" width="2" height="2" rx=".5" fill="#0EA5A4" />
    </svg>
  ),
  apis: (
    <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90">
      <circle cx="6" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="18" cy="12" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
};

/** Contenedor con stagger */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

/** Item: usa cubic-bezier en vez de "easeOut" string */
const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1], // ≈ easeOut
    },
  },
};

export default function ServicesGrid() {
  return (
    <section id="servicios" className="container py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">Servicios</h2>
        <Link href="/servicios" className="text-sm text-slate-400 hover:text-slate-200">
          Ver todos →
        </Link>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((s) => (
          <motion.div key={s.key} variants={item}>
            <Link
              href={`/servicios/${s.key}`}
              aria-label={`Ver detalles de ${s.title}`}
              className="group relative block rounded-2xl p-[1px] transition
                         bg-gradient-to-br from-teal-500/30 to-transparent hover:from-teal-400/50 focus:outline-none"
            >
              <div
                className="h-full rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur
                           transition group-hover:-translate-y-1 group-hover:bg-white/10
                           group-hover:shadow-[0_20px_60px_rgba(0,179,164,.15)]"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-[var(--ac-teal)]/15 p-2.5 ring-1 ring-[var(--ac-teal)]/30 text-[var(--ac-teal)]">
                    {icons[s.key]}
                  </div>
                  <span className="text-xs text-slate-400 transition group-hover:text-[var(--ac-accent)]">
                    Ver detalles →
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-300">{s.desc}</p>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.bullets.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-lg bg-white/5 px-2.5 py-1 text-xs text-slate-300 ring-1 ring-white/10"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
