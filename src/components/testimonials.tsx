'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/providers/ui';

export default function Testimonials() {
  const { lang } = useI18n();
  const [idx, setIdx] = useState(0);
  const pauseRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => { if (!pauseRef.current) setIdx(i => (i + 1) % 3); }, 3500);
    return () => clearInterval(id);
  }, []);

  const title = lang === 'en' ? 'What our clients say' : 'Qué dicen nuestros clientes';

  const quotes = lang === 'en'
    ? [
        { name: 'C. Riquelme', role: 'Small business owner', text: 'They delivered fast and kept us informed. We started selling online smoothly.' },
        { name: 'M. Soto', role: 'Tech services',           text: 'Calendar + reminders cut no-shows in half. Great work.' },
        { name: 'P. Astorga', role: 'Distributor',           text: 'The invoicing integration organized our entire flow.' },
      ]
    : [
        { name: 'C. Riquelme', role: 'Dueño PYME',           text: 'Entregaron rápido y con buena comunicación. Pasamos a vender online sin dramas.' },
        { name: 'M. Soto',     role: 'Servicios Técnicos',   text: 'La agenda con recordatorios bajó los no-shows a la mitad. Excelente.' },
        { name: 'P. Astorga',  role: 'Distribuidora',        text: 'La integración con facturación nos ordenó el flujo completo.' },
      ];

  const q = quotes[idx];

  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>

      <div
        className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur"
        onMouseEnter={() => (pauseRef.current = true)}
        onMouseLeave={() => (pauseRef.current = false)}
      >
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            transition={{ duration: .4 }}
            className="text-lg text-slate-200"
          >
            “{q.text}”
            <footer className="mt-4 text-sm text-slate-400">— {q.name} · {q.role}</footer>
          </motion.blockquote>
        </AnimatePresence>
        <div className="mt-6 flex gap-2">
          {quotes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`${lang === 'en' ? 'Go to testimonial' : 'Ir al testimonio'} ${i + 1}`}
              className={`h-2 w-6 rounded-full transition ${i === idx ? 'bg-[var(--ac-accent)]' : 'bg-white/15 hover:bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
