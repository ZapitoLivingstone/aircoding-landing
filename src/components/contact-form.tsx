'use client';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/providers/ui';

type ServiceValue = 'webmovil' | 'software' | 'ia' | 'apis';

export default function ContactForm() {
  const { lang } = useI18n(); // 'es' (default) | 'en'

  // Textos locales (no necesitas tocar tu diccionario global)
  const TXT = useMemo(() => ({
    es: {
      name: 'Nombre',
      email: 'Email',
      service: 'Servicio',
      message: 'Mensaje',
      placeholderName: 'Tu nombre completo',
      placeholderEmail: 'tucorreo@ejemplo.com',
      placeholderService: 'Selecciona una opción',
      placeholderMessage: 'Cuéntanos tu idea o necesidad (objetivo, plazos, presupuesto si tienes)…',
      optWebMovil: 'Web & Móvil',
      optSoftware: 'Software a medida',
      optIA: 'Soluciones de IA',
      optAPIs: 'Integración de APIs',
      send: 'Enviar cotización',
      sending: 'Enviando…',
      sentTitle: '¡Gracias! Recibimos tu mensaje.',
      sentBody: 'Te responderemos dentro de las próximas 24 horas.',
      serverFail: 'No pudimos enviar tu mensaje. Inténtalo nuevamente.',
      serverConn: 'No pudimos enviar tu mensaje. Revisa tu conexión.',
      privacy: 'Nunca compartimos tu información.',
      // errores
      errName: 'Ingresa tu nombre',
      errEmail: 'Email inválido',
      errMessage: 'Cuéntanos un poco más (≥10 caracteres)',
      charCount: (n:number)=>`${n} caracteres`,
    },
    en: {
      name: 'Name',
      email: 'Email',
      service: 'Service',
      message: 'Message',
      placeholderName: 'Your full name',
      placeholderEmail: 'you@example.com',
      placeholderService: 'Choose an option',
      placeholderMessage: 'Tell us your idea or need (goal, timeline, budget if any)…',
      optWebMovil: 'Web & Mobile',
      optSoftware: 'Custom Software',
      optIA: 'AI Solutions',
      optAPIs: 'API Integrations',
      send: 'Send quote request',
      sending: 'Sending…',
      sentTitle: 'Thanks! We received your message.',
      sentBody: 'We’ll reply within 24 hours.',
      serverFail: 'We couldn’t send your message. Please try again.',
      serverConn: 'We couldn’t send your message. Check your connection.',
      privacy: 'We never share your information.',
      // errors
      errName: 'Please enter your name',
      errEmail: 'Invalid email',
      errMessage: 'Please add more details (≥10 characters)',
      charCount: (n:number)=>`${n} characters`,
    }
  } as const)[lang], [lang]);

  // Esquema zod con mensajes en el idioma activo
  const schema = useMemo(() => z.object({
    name: z.string().trim().min(2, TXT.errName),
    email: z.string().trim().email(TXT.errEmail),
    service: z.enum(['webmovil','software','ia','apis']).optional(),
    message: z.string().trim().min(10, TXT.errMessage),
    website: z.string().optional(), // honeypot
  }), [TXT]);

  const [errors, setErrors] = useState<Record<string,string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [msgLen, setMsgLen] = useState(0);

  useEffect(() => {
    // Si cambia idioma, limpiamos errores de mensajes previos
    if (Object.keys(errors).length) setErrors({});
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
      website: String(form.get('website') || ''), // honeypot
    };

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
        className="rounded-2xl border border-white/10 bg-white/5 p-6 text-sm"
      >
        <p className="font-semibold text-teal-300">{TXT.sentTitle}</p>
        <p className="mt-1 text-slate-300">{TXT.sentBody}</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2" noValidate>
      {/* Honeypot oculto */}
      <input name="website" className="hidden" tabIndex={-1} autoComplete="off" />

      {/* Nombre */}
      <div className="md:col-span-1" data-error={Boolean(errors.name)}>
        <label htmlFor="name" className="mb-1 block text-sm">{TXT.name}</label>
        <input
          id="name" name="name" autoComplete="name"
          aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'err-name' : undefined}
          className={`w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 transition
                     ${errors.name ? 'ring-red-400 focus:ring-red-400' : 'ring-white/10 focus:ring-[var(--ac-teal)]'}`}
        />
        <AnimatePresence>{errors.name && (
          <motion.p
            id="err-name"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="mt-1 text-xs text-red-400"
          >
            {errors.name}
          </motion.p>
        )}</AnimatePresence>
      </div>

      {/* Email */}
      <div className="md:col-span-1" data-error={Boolean(errors.email)}>
        <label htmlFor="email" className="mb-1 block text-sm">{TXT.email}</label>
        <input
          id="email" name="email" type="email" autoComplete="email"
          placeholder={TXT.placeholderEmail}
          aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'err-email' : undefined}
          className={`w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 transition
                     ${errors.email ? 'ring-red-400 focus:ring-red-400' : 'ring-white/10 focus:ring-[var(--ac-teal)]'}`}
        />
        <AnimatePresence>{errors.email && (
          <motion.p
            id="err-email"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            className="mt-1 text-xs text-red-400"
          >
            {errors.email}
          </motion.p>
        )}</AnimatePresence>
      </div>

      {/* Servicio */}
      <div className="md:col-span-1">
        <label htmlFor="service" className="mb-1 block text-sm">{TXT.service} <span className="text-slate-400">(optional)</span></label>
        <select
          id="service" name="service"
          className="w-full rounded-xl bg-white/5 px-4 py-3 text-gray-500 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)]"
          defaultValue=""
        >
          <option value="" disabled>{TXT.placeholderService}</option>
          <option value="webmovil">{TXT.optWebMovil}</option>
          <option value="software">{TXT.optSoftware}</option>
          <option value="ia">{TXT.optIA}</option>
          <option value="apis">{TXT.optAPIs}</option>
        </select>
      </div>

      {/* Mensaje */}
      <div className="md:col-span-2" data-error={Boolean(errors.message)}>
        <label htmlFor="message" className="mb-1 block text-sm">{TXT.message}</label>
        <textarea
          id="message" name="message" rows={5}
          placeholder={TXT.placeholderMessage}
          onChange={(e) => setMsgLen(e.currentTarget.value.length)}
          aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? 'err-message' : undefined}
          className={`w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 transition
                     ${errors.message ? 'ring-red-400 focus:ring-red-400' : 'ring-white/10 focus:ring-[var(--ac-teal)]'}`}
        />
        <div className="mt-1 flex items-center justify-between">
          <AnimatePresence>{errors.message && (
            <motion.p
              id="err-message"
              initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
              className="text-xs text-red-400"
            >
              {errors.message}
            </motion.p>
          )}</AnimatePresence>
          <span className="text-xs text-slate-400">{TXT.charCount(msgLen)}</span>
        </div>
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <Button type="submit" className="w-full" disabled={loading} aria-busy={loading}>
          <span className="inline-flex items-center justify-center gap-2">
            <AnimatePresence>
              {loading && (
                <motion.svg
                  key="spinner"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="h-4 w-4 animate-spin" viewBox="0 0 24 24"
                >
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
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2 text-xs text-red-400"
            >
              {serverError}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mt-2 text-xs text-slate-400">{TXT.privacy}</p>
      </div>
    </form>
  );
}
