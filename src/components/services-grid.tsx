// components/services-grid.tsx
'use client';
import Link from 'next/link';
import { motion, type Variants, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { JSX, useCallback } from 'react';
import { useI18n } from '@/providers/ui';

type Key = 'web-movil' | 'software' | 'ia' | 'apis';

const copy: Record<Key, { es:{title:string, desc:string, bullets:string[]}, en:{title:string, desc:string, bullets:string[]} }> = {
  'web-movil': {
    es: { title:'Web & Móvil', desc:'Sitios y apps de alto rendimiento listos para crecer.', bullets:['Next.js / React Native','SEO & ASO','Escalable'] },
    en: { title:'Web & Mobile', desc:'High-performance sites & apps, ready to scale.', bullets:['Next.js / React Native','SEO & ASO','Scalable'] },
  },
  software: {
    es: { title:'Software a medida', desc:'Tu proceso, tu herramienta. Automatiza y ordena.', bullets:['Procesos ágiles','Seguridad','Soporte'] },
    en: { title:'Custom Software', desc:'Your process, your tool. Automate & streamline.', bullets:['Agile processes','Security','Support'] },
  },
  ia: {
    es: { title:'Soluciones de IA', desc:'Bots, clasificación y búsqueda inteligente 24/7.', bullets:['Chatbots','Automatización','Análisis'] },
    en: { title:'AI Solutions', desc:'Bots, classification & smart search 24/7.', bullets:['Chatbots','Automation','Analytics'] },
  },
  apis: {
    es: { title:'Integración de APIs', desc:'Pagos, ERPs y logística conectados sin dolor.', bullets:['Pagos / ERPs','Terceros','Monitoreo'] },
    en: { title:'API Integrations', desc:'Payments, ERPs & logistics connected, pain-free.', bullets:['Payments / ERPs','3rd-parties','Monitoring'] },
  },
};

const icons: Record<Key, JSX.Element> = {
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
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <rect x="11" y="13" width="2" height="2" rx=".5" fill="currentColor" />
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

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const item: Variants = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

/* ===== Acentos por tarjeta (sobrios) =====
   - web-movil: indigo
   - software: cyan
   - ia: violet
   - apis: amber (muy suave)
*/
const ACCENTS: Record<Key, string> = {
  'web-movil': 'oklch(0.73 0.15 264)',  // indigo
  software:    'oklch(0.76 0.12 205)',  // cyan
  ia:          'oklch(0.78 0.13 310)',  // violet
  apis:        'oklch(0.86 0.12 80)',   // amber
};

/* ====== Tilt + Spotlight (reactbits-style) ====== */
function TiltSpotlight({ children, href, accent }: { children: React.ReactNode; href: string; accent: string }) {
  const prefers = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const trx = useSpring(rx, { stiffness: 150, damping: 20, mass: 0.4 });
  const try_ = useSpring(ry, { stiffness: 150, damping: 20, mass: 0.4 });

  const onMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefers) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    rx.set((ny - 0.5) * -12);
    ry.set((nx - 0.5) * 12);
    e.currentTarget.style.setProperty("--mx", `${nx * 100}%`);
    e.currentTarget.style.setProperty("--my", `${ny * 100}%`);
  }, [prefers, rx, ry]);

  const onLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    rx.set(0); ry.set(0);
    e.currentTarget.style.setProperty("--mx", `50%`);
    e.currentTarget.style.setProperty("--my", `50%`);
  }, [rx, ry]);

  return (
    <Link
      href={href}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative block rounded-2xl p-[1px] transition focus:outline-none"
      style={{
        transformStyle: "preserve-3d",
        /* Borde con gradiente MUY sutil usando el acento */
        background: `linear-gradient(135deg, color-mix(in oklab, ${accent} 28%, transparent) 0%, transparent 60%)`,
      } as any}
    >
      {/* Spotlight */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{
          background: `radial-gradient(550px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, ${accent} 18%, transparent) 0%, transparent 55%)`,
        }}
      />
      <motion.div
        style={{ rotateX: trx, rotateY: try_, transformStyle: "preserve-3d" }}
        className="h-full rounded-2xl border bg-[color:var(--surface)] p-5 backdrop-blur
                   transition group-hover:-translate-y-1"
      >
        {children}
      </motion.div>
    </Link>
  );
}

export default function ServicesGrid() {
  const { lang, t } = useI18n();
  const cards = (Object.keys(copy) as Key[]).map(k => ({ key: k, ...copy[k][lang] }));

  return (
    <section id="servicios" className="container py-16">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{t('services_title')}</h2>
        <Link href="/servicios" className="text-sm text-muted hover:text-[color:var(--fg)]">
          {t('view_all')}
        </Link>
      </div>

      <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {cards.map((s) => {
          const accent = ACCENTS[s.key as Key];
          return (
            <motion.div key={s.key} variants={item}>
              <TiltSpotlight href={`/servicios/${s.key}`} accent={accent}>
                {/* Header de la card */}
                <div className="flex items-start justify-between">
                  {/* Icon pill — ahora toma el acento dinámico */}
                  <div
                    className="rounded-xl p-2.5 ring-1"
                    style={{
                      color: accent,
                      background: `color-mix(in oklab, ${accent} 12%, transparent)`,
                      borderColor: `color-mix(in oklab, ${accent} 24%, transparent)`,
                    }}
                  >
                    <span style={{ color: accent }}>{icons[s.key as Key]}</span>
                  </div>

                  <span
                    className="text-xs transition-colors"
                    style={{ color: 'color-mix(in oklab, var(--fg) 60%, transparent)' }}
                  >
                    {lang === 'en' ? 'See details →' : 'Ver detalles →'}
                  </span>
                </div>

                {/* Body */}
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.desc}</p>

                {/* Tags — neutrales, sin teal */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.bullets.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-lg px-2.5 py-1 text-xs ring-1"
                      style={{
                        background: 'color-mix(in oklab, var(--surface-2), transparent 10%)',
                        color: 'color-mix(in oklab, var(--fg) 82%, transparent)',
                        borderColor: 'color-mix(in oklab, var(--border) 100%, transparent)',
                      }}
                    >
                      {tag}
                    </li>
                  ))}
                </ul>

                {/* Hover states sutiles con el acento */}
                <style jsx>{`
                  .group:hover h3 { color: ${accent}; }
                  .group:hover span.text-xs { color: ${accent}; }
                  .group:hover li { border-color: color-mix(in oklab, ${accent} 28%, var(--border)); }
                `}</style>
              </TiltSpotlight>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
