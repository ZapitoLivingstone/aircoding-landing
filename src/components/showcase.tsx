'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useI18n } from '@/providers/ui';

export default function Showcase() {
  const { lang } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const title = lang === 'en' ? 'Real cases' : 'Casos reales';
  const legend = lang === 'en' ? 'Problem → Solution → Result' : 'Problema → Solución → Resultado';

  const cases = lang === 'en'
    ? [
        { company: 'Small Retail',   problem: 'Catalog without online sales.',         solution: 'Next.js storefront + payment gateway.',  result: '+38% sales in 60 days.' },
        { company: 'Tech Services',  problem: 'Manual booking and no-shows.',          solution: 'Web app with calendar and reminders.',   result: '-50% no-shows, +25% tickets/month.' },
        { company: 'Distributor',    problem: 'Orders via WhatsApp, no tracking.',     solution: 'Ops panel + invoicing API integration.', result: '2× faster dispatch.' },
      ]
    : [
        { company: 'Retail PYME',    problem: 'Catálogo sin ventas online.',           solution: 'E-commerce Next.js + pasarela de pago.', result: '+38% ventas en 60 días.' },
        { company: 'Servicios Técnicos', problem: 'Agendamiento manual y no-shows.',   solution: 'App web con agenda y recordatorios.',    result: '-50% no-shows, +25% tickets/mes.' },
        { company: 'Distribuidora',  problem: 'Pedidos por WhatsApp sin trazabilidad.', solution: 'Panel + integración API facturación.',  result: 'Despachos 2× más rápidos.' },
      ];

  return (
    <section className="container py-16" id="proyectos">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <span className="text-sm text-slate-400">{legend}</span>
      </div>

      <motion.div ref={ref} style={{ y }} className="grid gap-6 md:grid-cols-3">
        {cases.map((c, i) => (
          <motion.div
            key={`${c.company}-${i}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: .5, delay: i * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-xl"
          >
            <div className="text-sm text-slate-400">{c.company}</div>
            <h3 className="mt-1 text-lg font-semibold">
              {lang === 'en' ? 'Result: ' : 'Resultado: '}
              <span className="text-[var(--ac-accent)]">{c.result}</span>
            </h3>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-slate-300">{lang === 'en' ? 'Problem:' : 'Problema:'}</span> {c.problem}</p>
              <p><span className="text-slate-300">{lang === 'en' ? 'Solution:' : 'Solución:'}</span> {c.solution}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
