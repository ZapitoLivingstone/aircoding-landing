'use client';
import { motion, type Variants } from 'framer-motion';
import { useI18n } from '@/providers/ui';
import { Button } from './ui/button';

type Props = {
  title: string;
  summary: string;
  forWho: string[];
  fit: string[];
  ideas: string[];
  benefits: string[];
  kpis: string[];
};

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const itemIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: .45, ease: [0.22,1,0.36,1] } },
};

function CheckLi({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2">
      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--ac-teal)]/20 ring-1 ring-[var(--ac-teal)]/30 text-[var(--ac-teal)]">
        <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden><path d="M20 7 10 17l-6-6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
      </span>
      <span className="text-sm text-slate-300">{children}</span>
    </li>
  );
}

export default function ServicePage(props: Props) {
  const { t, lang } = useI18n();
  const txt = lang === 'en'
    ? {
        introCta: 'Get a quote',
        sectionForWho: 'Who is this for',
        sectionFit: 'It’s a fit if you...',
        sectionIdeas: 'Implementation ideas',
        sectionBenefits: 'What you get',
        sectionKPIs: 'Expected results',
        contactCta: 'Talk to us',
        contactSub: 'We’ll get back within 24 hours.',
      }
    : {
        introCta: 'Cotiza tu proyecto',
        sectionForWho: '¿Para quién es?',
        sectionFit: 'Te sirve si…',
        sectionIdeas: 'Ideas de implementación',
        sectionBenefits: 'Lo que ganas',
        sectionKPIs: 'Resultados esperados',
        contactCta: 'Conversemos',
        contactSub: 'Te respondemos en menos de 24 horas.',
      };

  return (
    <div className="container py-16">
      {/* Header del servicio */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-teal-700/25 to-teal-500/10 p-8 ring-1 ring-white/10"
      >
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,179,164,.18),transparent_60%)] blur-2xl" />
        <h1 className="text-3xl font-bold md:text-4xl">{props.title}</h1>
        <p className="mt-3 max-w-2xl text-slate-300">{props.summary}</p>
        <div className="mt-6">
          <a href="#contacto"><Button>{txt.introCta}</Button></a>
        </div>
      </motion.div>

      {/* Dos columnas confiables */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Columna izquierda */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} className="space-y-6">
          <motion.div variants={itemIn} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">{txt.sectionForWho}</h2>
            <ul className="mt-3 space-y-2">{props.forWho.map((x) => <CheckLi key={x}>{x}</CheckLi>)}</ul>
          </motion.div>

          <motion.div variants={itemIn} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">{txt.sectionFit}</h2>
            <ul className="mt-3 space-y-2">{props.fit.map((x) => <CheckLi key={x}>{x}</CheckLi>)}</ul>
          </motion.div>

          <motion.div variants={itemIn} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">{txt.sectionIdeas}</h2>
            <ul className="mt-3 space-y-2">{props.ideas.map((x) => <CheckLi key={x}>{x}</CheckLi>)}</ul>
          </motion.div>
        </motion.div>

        {/* Columna derecha */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: .2 }} className="space-y-6">
          <motion.div variants={itemIn} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">{txt.sectionBenefits}</h2>
            <ul className="mt-3 space-y-2">{props.benefits.map((x) => <CheckLi key={x}>{x}</CheckLi>)}</ul>
          </motion.div>

          <motion.div variants={itemIn} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">{txt.sectionKPIs}</h2>
            <ul className="mt-3 space-y-2">{props.kpis.map((x) => <CheckLi key={x}>{x}</CheckLi>)}</ul>
          </motion.div>

          {/* CTA de confianza */}
          <motion.div variants={itemIn} className="rounded-2xl border border-white/10 bg-gradient-to-r from-teal-700/30 to-teal-500/15 p-6 ring-1 ring-white/10">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-lg font-semibold">{props.title}</div>
                <p className="text-sm text-slate-300">{txt.contactSub}</p>
              </div>
              <a href="#contacto"><Button>{txt.contactCta}</Button></a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
