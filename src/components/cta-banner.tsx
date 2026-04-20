'use client';

import Image from 'next/image';
import { useI18n } from '@/providers/ui';

export default function CTABanner() {
  const { lang } = useI18n();
  const copy =
    lang === 'en'
      ? {
          badge: 'Direct support from AirCoding',
          title: 'A clearer path to launch your project',
          desc: 'Scope and pricing aligned from day one. We answer within 24 hours.',
          secondary: 'Send us your details in the contact form',
          points: ['No obligation', 'Transparent pricing', 'Direct communication'],
        }
      : {
          badge: 'Atención directa con AirCoding',
          title: 'Un camino claro para lanzar tu proyecto',
          desc: 'Definimos alcance y precio desde el inicio. Respondemos dentro de 24 horas.',
          secondary: 'Envíanos tu caso en el formulario de contacto',
          points: ['Sin compromiso', 'Precios transparentes', 'Comunicación directa'],
        };

  return (
    <section className="mx-auto max-w-6xl px-4 py-20" id="cta">
      <div className="rounded-2xl border border-token bg-[color:var(--surface)] p-6 shadow-token md:p-8">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-token bg-[color:var(--surface-2)] px-3 py-1.5">
              <Image
                src="/Logo_AirCoding-sin-fondo.png"
                alt="AirCoding"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-xs font-semibold tracking-wide">{copy.badge}</span>
            </div>

            <h3 className="mt-4 text-2xl font-bold md:text-3xl">{copy.title}</h3>
            <p className="mt-2 text-sm text-muted md:text-base">{copy.desc}</p>

            <ul className="mt-4 flex flex-wrap gap-2 text-xs text-muted md:text-sm">
              {copy.points.map((point) => (
                <li key={point} className="rounded-full border border-token px-3 py-1">
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-[320px]">
            <div className="grid gap-3">
              <a
                href="#contacto"
                className="inline-flex justify-center rounded-xl border border-token bg-[color:var(--surface-2)] px-4 py-3 text-center text-sm font-semibold transition hover:bg-[color:var(--surface)]"
              >
                {copy.secondary}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
