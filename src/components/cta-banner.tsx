'use client';
import { Button } from './ui/button';
import { useI18n } from '@/providers/ui';
import { motion } from 'framer-motion';

export default function CTABanner() {
  const { lang } = useI18n();

  return (
    <section className="mx-auto max-w-6xl px-4 py-20" id="cta">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[color:var(--surface)] p-10 backdrop-blur shadow-xl"
      >
        {/* Halo sutil */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, color-mix(in oklab, var(--acc-indigo) 28%, transparent), transparent 70%)',
            opacity: 0.35,
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -right-20 -bottom-20 h-60 w-60 rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle at center, color-mix(in oklab, var(--acc-cyan) 28%, transparent), transparent 70%)',
            opacity: 0.35,
          }}
        />

        <h3 className="text-2xl font-bold md:text-3xl">
          {lang === 'en' ? 'Ready to start?' : '¿Listo para comenzar?'}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          {lang === 'en'
            ? 'Let’s talk about your project. Clear scope, transparent pricing, and quick start.'
            : 'Conversemos sobre tu proyecto. Alcance claro, precios transparentes y arranque rápido.'}
        </p>

        <div className="mt-6">
          <a href="#contacto">
            <Button className="btn-hero">
              {lang === 'en' ? 'Get in touch' : 'Contáctanos'}
            </Button>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
