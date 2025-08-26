'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  { name: 'C. Riquelme', role: 'Dueño PYME', text: 'Entregaron rápido y con buena comunicación. Pasamos a vender online sin dramas.' },
  { name: 'M. Soto', role: 'Servicios Técnicos', text: 'La agenda con recordatorios nos bajó los no-shows a la mitad. Excelente.' },
  { name: 'P. Astorga', role: 'Distribuidora', text: 'La integración con facturación nos ordenó el flujo completo.' },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const pauseRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => { if (!pauseRef.current) setIdx(i => (i + 1) % quotes.length); }, 3500);
    return () => clearInterval(id);
  }, []);

  const q = quotes[idx];
  return (
    <section className="container py-16">
      <h2 className="text-2xl font-bold md:text-3xl">Qué dicen nuestros clientes</h2>

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
              aria-label={`Ir al testimonio ${i + 1}`}
              className={`h-2 w-6 rounded-full transition ${i === idx ? 'bg-[var(--ac-accent)]' : 'bg-white/15 hover:bg-white/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
