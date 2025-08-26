import Link from "next/link";

type Props = {
  title: string;
  summary: string;
  forWho: string[];
  fit: string[];
  ideas: string[];
  benefits: string[];
  kpis: string[];
};

export default function ServicePage({
  title, summary, forWho, fit, ideas, benefits, kpis,
}: Props) {
  return (
    <main className="container py-16">
      <Link href="/#servicios" className="text-sm text-slate-400 hover:text-slate-200">← Volver</Link>
      <h1 className="mt-2 text-3xl font-bold">{title}</h1>
      <p className="mt-2 max-w-2xl text-slate-300">{summary}</p>

      {/* ¿Para quién? / Te sirve si... */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">¿Para quién es?</h2>
          <ul className="mt-3 space-y-2 text-sm">{forWho.map(i => <li key={i}>• {i}</li>)}</ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Te sirve si…</h2>
          <ul className="mt-3 space-y-2 text-sm">{fit.map(i => <li key={i}>• {i}</li>)}</ul>
        </div>
      </div>

      {/* Ideas y beneficios */}
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Ideas de implementación</h2>
          <ul className="mt-3 space-y-2 text-sm">{ideas.map(i => <li key={i}>• {i}</li>)}</ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold">Beneficios</h2>
          <ul className="mt-3 space-y-2 text-sm">{benefits.map(i => <li key={i}>• {i}</li>)}</ul>
        </div>
      </div>

      {/* KPIs */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Resultados / KPIs esperados</h2>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm">{kpis.map(i => <li key={i}>• {i}</li>)}</ul>
      </div>

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-gradient-to-r from-teal-700/40 to-teal-500/20 p-6 ring-1 ring-white/10">
        <h3 className="text-xl font-semibold">¿Este servicio calza contigo?</h3>
        <p className="mt-1 text-slate-300">Cuéntanos tu caso y te proponemos un plan esta semana.</p>
        <div className="mt-4">
          <a href="/#contacto" className="underline">Contactar ahora →</a>
        </div>
      </div>
    </main>
  );
}
