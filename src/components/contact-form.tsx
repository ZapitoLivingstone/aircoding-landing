'use client';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  service: z.enum(['webmovil','software','ia','apis']).optional(),
  message: z.string().min(10, 'Cuéntanos un poco más (≥10 caracteres)'),
  website: z.string().optional(), // honeypot
});

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      service: (String(form.get('service') || '') || undefined) as any,
      message: String(form.get('message') || ''),
      website: String(form.get('website') || ''), // honeypot
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const flat: Record<string,string> = {};
      parsed.error.issues.forEach(i => (flat[i.path.join('.')] = i.message));
      setErrors(flat);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setServerError('No pudimos enviar tu mensaje. Inténtalo nuevamente.');
      } else {
        setSent(true);
      }
    } catch {
      setServerError('No pudimos enviar tu mensaje. Revisa tu conexión.');
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-sm">
        <p className="font-semibold text-teal-300">¡Gracias! Recibimos tu mensaje.</p>
        <p className="mt-1 text-slate-300">Te responderemos dentro de las próximas 24 horas.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2" noValidate>
      {/* Honeypot oculto */}
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="md:col-span-1">
        <label className="block text-sm mb-1">Nombre</label>
        <input name="name" className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)] transition" />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm mb-1">Email</label>
        <input name="email" type="email" className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)] transition" />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div className="md:col-span-1">
        <label className="block text-sm mb-1">Servicio</label>
        <select name="service" className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)]">
          <option value="">Selecciona una opción</option>
          <option value="webmovil">Web & Móvil</option>
          <option value="software">Software a medida</option>
          <option value="ia">Soluciones de IA</option>
          <option value="apis">Integración de APIs</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm mb-1">Mensaje</label>
        <textarea name="message" rows={5} className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)] transition" />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>

      <div className="md:col-span-2">
        <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
          {loading ? 'Enviando…' : 'Enviar cotización'}
        </Button>
        {serverError && <p className="mt-2 text-xs text-red-400">{serverError}</p>}
        <p className="mt-2 text-xs text-slate-400">Nunca compartimos tu información.</p>
      </div>
    </form>
  );
}
