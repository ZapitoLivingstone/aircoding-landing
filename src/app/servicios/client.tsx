'use client';
import Link from 'next/link';
import { motion, type Variants } from 'framer-motion';
import { useI18n } from '@/providers/ui';
import { servicesIndexByLang } from '@/content/services';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const cardIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: .45, ease: [0.22,1,0.36,1] } },
};

export default function ServiciosClient() {
  const { t, lang } = useI18n();
  const items = servicesIndexByLang(lang);

  const subtitle = lang === 'en'
    ? 'Choose the service that best fits your goals. We’ll tailor the scope to your reality.'
    : 'Elige el servicio que mejor se ajusta a tus objetivos. Ajustamos el alcance a tu realidad.';

  return (
    <main key={lang} className="container py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold">{t('services_title') ?? (lang==='en'?'Services':'Servicios')}</h1>
        <p className="mt-2 text-slate-300">{subtitle}</p>
      </div>

      <motion.div
        variants={container} initial="hidden" whileInView="show" viewport={{ once:true, amount:.2 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {items.map((s) => (
          <motion.div key={s.slug} variants={cardIn}>
            <Link
              href={`/servicios/${s.slug}`}
              className="group relative block rounded-2xl p-[1px] bg-gradient-to-br from-teal-500/30 to-transparent"
            >
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition group-hover:-translate-y-1 group-hover:bg-white/10 group-hover:shadow-[0_20px_60px_rgba(0,179,164,.15)]">
                <div className="flex items-start justify-between">
                  <div className="text-lg font-semibold">{s.label}</div>
                  <span className="text-sm text-[var(--ac-accent)] opacity-80 group-hover:opacity-100">→</span>
                </div>
                <p className="mt-2 text-sm text-[var(--muted)]">{s.summary}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* bloque de confianza */}
      <div className="mt-12 rounded-2xl border border-white/10 bg-gradient-to-r from-teal-700/30 to-teal-500/15 p-6 ring-1 ring-white/10">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            lang==='en' ? { k:'+30', t:'projects delivered' } : { k:'+30', t:'proyectos entregados' },
            lang==='en' ? { k:'4.9/5', t:'client satisfaction' } : { k:'4.9/5', t:'satisfacción de clientes' },
            lang==='en' ? { k:'< 4w', t:'typical go-live' } : { k:'< 4 sem', t:'go-live típico' },
          ].map(m => (
            <div key={m.t} className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
              <div className="text-2xl font-extrabold text-[var(--ac-accent)]">{m.k}</div>
              <div className="text-sm text-slate-300">{m.t}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
