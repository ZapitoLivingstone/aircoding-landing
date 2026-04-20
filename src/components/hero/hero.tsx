'use client';

import Image from 'next/image';
import { useI18n } from '@/providers/ui';
import { Button } from '../ui/button';

export default function Hero() {
  const { t, lang } = useI18n();

  return (
    <section className="hero relative isolate overflow-hidden border-b border-token hero-padding">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(120% 90% at 12% 4%, color-mix(in oklab, var(--acc-indigo) 24%, transparent) 0%, transparent 62%),' +
            'radial-gradient(90% 80% at 88% 10%, color-mix(in oklab, var(--acc-cyan) 24%, transparent) 0%, transparent 68%),' +
            'linear-gradient(180deg, color-mix(in oklab, var(--surface) 40%, transparent), transparent 80%)',
        }}
      />

      <div className="container relative z-10 grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="max-w-2xl">
          <p className="inline-flex rounded-full border border-token bg-[color:var(--surface)] px-3 py-1 text-xs font-medium text-muted sm:text-sm">
            {lang === 'en' ? 'Web, mobile and AI solutions' : 'Soluciones web, móvil e IA'}
          </p>

          <h1 className="mt-4 text-balance text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {t('hero_h1')}
          </h1>

          <p className="mt-4 max-w-xl text-base text-muted sm:text-lg">{t('hero_sub')}</p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto">{t('hero_cta_primary')}</Button>
            </a>
            <a href="#servicios" className="w-full sm:w-auto">
              <Button variant="ghost" className="w-full sm:w-auto">
                {t('hero_cta_secondary')}
              </Button>
            </a>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2 text-xs text-muted sm:text-sm">
            <li className="rounded-lg border border-token bg-[color:var(--surface)] px-2.5 py-1.5">
              {lang === 'en' ? 'Fast loading' : 'Carga rápida'}
            </li>
            <li className="rounded-lg border border-token bg-[color:var(--surface)] px-2.5 py-1.5">
              {lang === 'en' ? 'Mobile-first' : 'Optimizado para móvil'}
            </li>
            <li className="rounded-lg border border-token bg-[color:var(--surface)] px-2.5 py-1.5">
              {lang === 'en' ? 'Scalable architecture' : 'Arquitectura escalable'}
            </li>
          </ul>
        </div>

        <div className="mx-auto hidden w-full max-w-[360px] lg:block">
          <Image
            src="/solo-logo.png"
            alt="Logo AirCoding"
            width={400}
            height={400}
            className="h-auto w-full select-none drop-shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
