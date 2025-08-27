'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { useI18n } from '@/providers/ui';
import { servicesIndexByLang } from '@/content/services';
import type { JSX } from 'react';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const copy = {
  es: {
    title: 'Servicios',
    subtitle:
      'Elige el servicio que mejor se ajusta a tus objetivos. Ajustamos el alcance a tu realidad.',
    more: 'Ver más',
    metrics: [
      { k: '+30', t: 'proyectos entregados' },
      { k: '4.9/5', t: 'satisfacción de clientes' },
      { k: '< 4 sem', t: 'go-live típico' },
    ],
  },
  en: {
    title: 'Services',
    subtitle:
      'Choose the service that best fits your goals. We’ll tailor the scope to your reality.',
    more: 'Learn more',
    metrics: [
      { k: '+30', t: 'projects delivered' },
      { k: '4.9/5', t: 'client satisfaction' },
      { k: '< 4w', t: 'typical go-live' },
    ],
  },
} as const;

const icons: Record<string, JSX.Element> = {
  'web-movil': (
    <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90">
      <rect x="3" y="4" width="14" height="10" rx="2" fill="currentColor" />
      <rect x="8" y="16" width="13" height="4" rx="1.5" fill="currentColor" />
    </svg>
  ),
  software: (
    <svg width="22" height="22" viewBox="0 0 24 24" className="opacity-90">
      <path
        d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0-5v3m0 12v3M3 12h3m12 0h3M6.8 6.8 9 9m6 6 2.2 2.2M6.8 17.2 9 15m6-6 2.2-2.2"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
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

/** Acentos por servicio para “desaturar” y dar variedad visual */
const accents: Record<
  string,
  {
    pill: string; // icon pill
    border: string; // top border bar
    shine: string; // tiny gradient shine
  }
> = {
  'web-movil': {
    pill: 'text-cyan-400 ring-cyan-400/30 bg-cyan-400/10',
    border: 'from-cyan-400/60',
    shine: 'from-cyan-300/30',
  },
  software: {
    pill: 'text-indigo-400 ring-indigo-400/30 bg-indigo-400/10',
    border: 'from-indigo-400/60',
    shine: 'from-indigo-300/30',
  },
  ia: {
    pill: 'text-fuchsia-400 ring-fuchsia-400/30 bg-fuchsia-400/10',
    border: 'from-fuchsia-400/60',
    shine: 'from-fuchsia-300/30',
  },
  apis: {
    pill: 'text-amber-400 ring-amber-400/30 bg-amber-400/10',
    border: 'from-amber-400/60',
    shine: 'from-amber-300/30',
  },
};

export default function ServiciosClient() {
  const { lang } = useI18n();
  const t = copy[lang];
  const items = servicesIndexByLang(lang);

  /** Guard de montaje para evitar “flicker/reload necesario” en dev cuando cambia idioma/tema */
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <main className="container py-16">
        <div className="h-36 animate-pulse rounded-2xl bg-white/5 ring-1 ring-white/10" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-40 animate-pulse rounded-2xl bg-white/5 ring-1 ring-white/10" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main key={lang} className="container py-16">
      {/* HERO “glass” con menos teal y más aire */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-2xl bg-white/[0.04] p-8 ring-1 ring-white/10"
      >
        {/* barra superior de acento multicolor */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 opacity-70" />

        {/* logo a la derecha */}
        <motion.div
          className="absolute right-5 top-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-md">
            <Image
              src="/Logo_AirCoding-sin-fondo.png"
              alt="AirCoding"
              width={38}
              height={38}
              className="rounded-full select-none"
              priority
            />
          </div>
        </motion.div>

        <h1 className="text-3xl font-bold">{t.title}</h1>
        <p className="mt-2 max-w-2xl text-slate-300">{t.subtitle}</p>
      </motion.section>

      {/* GRID con acentos por categoría */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((s) => {
          const acc = accents[s.slug] ?? accents['web-movil'];
          return (
            <motion.div key={s.slug} variants={cardIn}>
              <Link
                href={`/servicios/${s.slug}`}
                className="group relative block rounded-2xl ring-1 ring-white/10 bg-white/[0.045] hover:bg-white/[0.07] transition"
              >
                {/* borde superior por-acento */}
                <div className={`h-1 w-full rounded-t-2xl bg-gradient-to-r ${acc.border}`} />

                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <span className={`rounded-xl ${acc.pill} p-2.5 ring-1`}>
                      {icons[s.slug]}
                    </span>
                    <span className="text-sm text-[var(--ac-accent)] opacity-80 group-hover:opacity-100">
                      {t.more} →
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-semibold">{s.label}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{s.summary}</p>

                  {/* brillo suave */}
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute -right-8 -bottom-8 h-24 w-24 rounded-full blur-2xl bg-gradient-to-br ${acc.shine} to-transparent`}
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* BLOQUE DE CONFIANZA, claro y minimal */}
      <section className="mt-12">
        <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
          <div className="grid gap-4 md:grid-cols-3">
            {t.metrics.map((m) => (
              <div
                key={m.t}
                className="rounded-xl bg-white/[0.06] p-4 text-center ring-1 ring-white/10 transition hover:-translate-y-0.5"
              >
                <div className="text-2xl font-extrabold text-[var(--ac-accent)]">{m.k}</div>
                <div className="text-sm text-slate-300">{m.t}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
