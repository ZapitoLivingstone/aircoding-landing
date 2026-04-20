'use client';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/providers/ui';

type ServiceValue = 'webmovil' | 'software' | 'ia' | 'apis';

export default function ContactForm() {
  const { lang } = useI18n(); // 'es' (default) | 'en'

  const TXT = useMemo(() => ({
    es: {
      title: 'Cuéntanos de tu proyecto',
      desc: 'Alcance claro y precios transparentes. Te respondemos dentro de 24 horas.',
      name: 'Nombre',
      email: 'Email',
      service: 'Servicio (opcional)',
      message: 'Mensaje',
      placeholderName: 'Tu nombre completo',
      placeholderEmail: 'tucorreo@ejemplo.com',
      placeholderService: 'Selecciona una opción',
      placeholderMessage: '¿Qué necesitas? (objetivo y contexto de negocio)…',
      optWebMovil: 'Web & Móvil',
      optSoftware: 'Software a medida',
      optIA: 'Soluciones de IA',
      optAPIs: 'Integración de APIs',
      consent: 'Acepto ser contactado por email.',
      send: 'Enviar cotización',
      sending: 'Enviando…',
      sentTitle: '¡Gracias! Recibimos tu mensaje.',
      sentBody: 'Te responderemos dentro de las próximas 24 horas.',
      serverFail: 'No pudimos enviar tu mensaje. Inténtalo nuevamente.',
      serverConn: 'No pudimos enviar tu mensaje. Revisa tu conexión.',
      privacy: 'Nunca compartimos tu información.',
      // errores
      errName: 'Ingresa tu nombre (≥2 caracteres)',
      errEmail: 'Email inválido',
      errMessage: 'Cuéntanos un poco más (≥10 caracteres)',
      errConsent: 'Debes aceptar ser contactado.',
      charCount: (n:number)=>`${n} caracteres`,
    },
    en: {
      title: 'Tell us about your project',
      desc: 'Clear scope and transparent pricing. We will reply within 24 hours.',
      name: 'Name',
      email: 'Email',
      service: 'Service (optional)',
      message: 'Message',
      placeholderName: 'Your full name',
      placeholderEmail: 'you@example.com',
      placeholderService: 'Choose an option',
      placeholderMessage: 'What do you need? (goal and business context)…',
      optWebMovil: 'Web & Mobile',
      optSoftware: 'Custom Software',
      optIA: 'AI Solutions',
      optAPIs: 'API Integrations',
      consent: 'I agree to be contacted by email.',
      send: 'Send quote request',
      sending: 'Sending…',
      sentTitle: 'Thanks! We received your message.',
      sentBody: 'We’ll reply within 24 hours.',
      serverFail: 'We couldn’t send your message. Please try again.',
      serverConn: 'We couldn’t send your message. Check your connection.',
      privacy: 'We never share your information.',
      // errors
      errName: 'Please enter your name (≥2 chars)',
      errEmail: 'Invalid email',
      errMessage: 'Please add more details (≥10 chars)',
      errConsent: 'You must agree to be contacted.',
      charCount: (n:number)=>`${n} characters`,
    }
  } as const)[lang], [lang]);

  // Zod schema (sin presupuesto)
  const schema = useMemo(() => z.object({
    name: z.string().trim().min(2, TXT.errName),
    email: z.string().trim().email(TXT.errEmail),
    service: z.enum(['webmovil','software','ia','apis']).optional(),
    message: z.string().trim().min(10, TXT.errMessage),
    consent: z.boolean().refine(v => v === true, { message: TXT.errConsent }),
    website: z.string().optional(), // honeypot
  }), [TXT]);

  const [errors, setErrors] = useState<Record<string,string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [msgLen, setMsgLen] = useState(0);

  // estados para controlar el "placeholder look" de los selects
  const [serviceSel, setServiceSel] = useState('');

  useEffect(() => {
    setErrors({});
    setServiceSel('');
    setMsgLen(0);
    setServerError(null);
  }, [lang]);
  
  function scrollToFirstError() {
    const first = document.querySelector('[data-error="true"]') as HTMLElement | null;
    if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setServerError(null);

    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      service: (String(form.get('service') || '') || undefined) as ServiceValue | undefined,
      message: String(form.get('message') || ''),
      consent: Boolean(form.get('consent') === 'on'),
      website: String(form.get('website') || ''), // honeypot
    };

    // Anti-bot simple
    if (data.website && data.website.trim().length > 0) return;

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const flat: Record<string,string> = {};
      parsed.error.issues.forEach(i => (flat[i.path.join('.')] = i.message));
      setErrors(flat);
      requestAnimationFrame(scrollToFirstError);
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
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json?.ok) {
        setServerError(TXT.serverFail);
      } else {
        setSent(true);
      }
    } catch {
      setServerError(TXT.serverConn);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        role="status" aria-live="polite"
        className="rounded-2xl border bg-[color:var(--surface)] p-6 text-sm"
        style={{ borderColor: 'var(--border)' }}
      >
        <p className="font-semibold" style={{ color: 'color-mix(in oklab, var(--acc-cyan) 70%, var(--acc-indigo))' }}>
          {TXT.sentTitle}
        </p>
        <p className="mt-1 text-muted">{TXT.sentBody}</p>
      </motion.div>
    );
  }

  // clases base para selects con mejor contraste
  const selectBase = 'select-pro w-full rounded-xl px-4 py-3 pr-10 text-sm outline-none transition';

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2" noValidate aria-describedby="form-note" aria-live="polite">
      {/* Honeypot oculto */}
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Encabezado corto */}
      <div className="mb-1 md:col-span-2 sm:mb-2">
        <h3 className="text-xl font-semibold">{TXT.title}</h3>
        <p id="form-note" className="mt-1 text-sm text-muted">{TXT.desc}</p>
      </div>

      {/* Nombre */}
      <div className="md:col-span-1" data-error={Boolean(errors.name)}>
        <label htmlFor="name" className="mb-1 block text-sm">{TXT.name}</label>
        <input
          id="name" name="name" autoComplete="name" placeholder={TXT.placeholderName}
          aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'err-name' : undefined}
          className={`w-full rounded-xl px-4 py-3 outline-none ring-1 transition
                     bg-[color:var(--surface)] ${errors.name ? 'ring-red-400 focus:ring-red-400' : 'ring-[var(--border)] focus:ring-[color:var(--acc-indigo)]'} text-[var(--fg)] placeholder:text-muted`}
        />
        <AnimatePresence>{errors.name && (
          <motion.p id="err-name" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 text-xs text-red-400">
            {errors.name}
          </motion.p>
        )}</AnimatePresence>
      </div>

      {/* Email */}
      <div className="md:col-span-1" data-error={Boolean(errors.email)}>
        <label htmlFor="email" className="mb-1 block text-sm">{TXT.email}</label>
        <input
          id="email" name="email" type="email" autoComplete="email" placeholder={TXT.placeholderEmail}
          aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'err-email' : undefined}
          className={`w-full rounded-xl px-4 py-3 outline-none ring-1 transition
                     bg-[color:var(--surface)] ${errors.email ? 'ring-red-400 focus:ring-red-400' : 'ring-[var(--border)] focus:ring-[color:var(--acc-indigo)]'} text-[var(--fg)] placeholder:text-muted`}
        />
        <AnimatePresence>{errors.email && (
          <motion.p id="err-email" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 text-xs text-red-400">
            {errors.email}
          </motion.p>
        )}</AnimatePresence>
      </div>

      {/* Servicio (select más oscuro) */}
      <div className="md:col-span-1" id ="service-group">
        <label htmlFor="service" className="mb-1 block text-sm">{TXT.service}</label>
        <div className="relative">
          <select
            id="service" name="service" defaultValue=""
            onChange={(e) => setServiceSel(e.currentTarget.value)}
            data-empty={!serviceSel}
            className={selectBase}
          >
            <option value="" disabled>{TXT.placeholderService}</option>
            <option value="webmovil">💻📱 {TXT.optWebMovil}</option>
            <option value="software">⚙️ {TXT.optSoftware}</option>
            <option value="ia">🤖 {TXT.optIA}</option>
            <option value="apis">🔌 {TXT.optAPIs}</option>
          </select>
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Mensaje */}
      <div className="md:col-span-2" data-error={Boolean(errors.message)}>
        <label htmlFor="message" className="mb-1 block text-sm">{TXT.message}</label>
        <textarea
          id="message" name="message" rows={5} placeholder={TXT.placeholderMessage}
          onChange={(e) => setMsgLen(e.currentTarget.value.length)}
          aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'err-message' : undefined}
          className={`w-full rounded-xl px-4 py-3 outline-none ring-1 transition
                     bg-[color:var(--surface)] ${errors.message ? 'ring-red-400 focus:ring-red-400' : 'ring-[var(--border)] focus:ring-[color:var(--acc-indigo)]'} text-[var(--fg)] placeholder:text-muted`}
        />
        <div className="mt-1 flex items-center justify-between">
          <AnimatePresence>{errors.message && (
            <motion.p id="err-message" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="text-xs text-red-400">
              {errors.message}
            </motion.p>
          )}</AnimatePresence>
          <span className="text-xs text-muted">{TXT.charCount(msgLen)}</span>
        </div>
      </div>

      {/* Consentimiento */}
      <div className="md:col-span-2" data-error={Boolean(errors.consent)}>
        <label className="inline-flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" className="mt-0.5 h-4 w-4 rounded border-[var(--border)] bg-[color:var(--surface)]" />
          <span>{TXT.consent}</span>
        </label>
        <AnimatePresence>{errors.consent && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-1 text-xs text-red-400">
            {errors.consent}
          </motion.p>
        )}</AnimatePresence>
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <Button type="submit" className="w-full btn-hero focus-ring" disabled={loading} aria-busy={loading}>
          <span className="inline-flex items-center justify-center gap-2">
            <AnimatePresence>
              {loading && (
                <motion.svg key="spinner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
                </motion.svg>
              )}
            </AnimatePresence>
            {loading ? TXT.sending : TXT.send}
          </span>
        </Button>

        <AnimatePresence>
          {serverError && (
            <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="mt-2 text-xs text-red-400">
              {serverError}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mt-2 text-xs text-muted">{TXT.privacy}</p>
      </div>
    </form>
  );
}
