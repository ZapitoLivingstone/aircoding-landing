'use client';
import Link from 'next/link';
import { servicesIndex } from '@/content/services';
import { useI18n } from '@/providers/ui';

function ServiceCard({ slug, label, summary }: { slug: string; label: string; summary: string }) {
  return (
    <Link
      href={`/servicios/${slug}`}
      className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 hover:translate-y-[-2px] hover:bg-[color-mix(in_oklab,var(--surface),white_6%)] transition"
    >
      <div className="text-lg font-semibold">{label}</div>
      <p className="mt-2 text-sm text-[var(--muted)]">{summary}</p>
      <div className="mt-3 text-sm text-[var(--ac-accent)]">→</div>
    </Link>
  );
}

export default function ServiciosClient() {
  const { t, lang } = useI18n();

  // pequeñas traducciones de labels por slug
  const labelMap: Record<string, { es: string; en: string }> = {
    'web-movil': { es: 'Desarrollo Web & Móvil', en: 'Web & Mobile' },
    'software' : { es: 'Software a medida',     en: 'Custom Software' },
    'ia'       : { es: 'Soluciones de IA',      en: 'AI Solutions' },
    'apis'     : { es: 'Integración de APIs',   en: 'API Integrations' },
  };

  return (
    <main className="container py-16">
      <h1 className="text-3xl font-bold">{t('services_title') ?? 'Servicios'}</h1>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {servicesIndex.map((s) => (
          <ServiceCard
            key={s.slug}
            slug={s.slug}
            label={labelMap[s.slug]?.[lang] ?? s.label}
            summary={s.summary}
          />
        ))}
      </div>
    </main>
  );
}
