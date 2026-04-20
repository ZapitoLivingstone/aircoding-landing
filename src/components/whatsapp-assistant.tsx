'use client';

import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useI18n } from '@/providers/ui';

const OVERLAY_EVENT = 'aircoding:overlay-open';

export type WhatsAppAssistantKind = 'general' | 'servicios' | 'web-movil' | 'software' | 'ia' | 'apis';

export type WhatsAppAssistantOption = {
  id: string;
  title: string;
};

type WhatsAppAssistantProps = {
  kind?: WhatsAppAssistantKind;
  serviceTitle?: string;
  options?: WhatsAppAssistantOption[];
};

const PHONE_DIGITS = '56968419793';

const triggerByKind: Record<WhatsAppAssistantKind, string> = {
  general: 'COTIZAR_GENERAL',
  servicios: 'COTIZAR_SERVICIOS',
  'web-movil': 'COTIZAR_WEB',
  software: 'COTIZAR_SOFTWARE',
  ia: 'COTIZAR_IA',
  apis: 'COTIZAR_APIS',
};

function buildDefaultOptions(lang: 'es' | 'en'): WhatsAppAssistantOption[] {
  if (lang === 'en') {
    return [
      { id: 'web-movil', title: '💻📱 Web & Mobile' },
      { id: 'software', title: '⚙️ Custom Software' },
      { id: 'ia', title: '🤖 AI Solutions' },
      { id: 'apis', title: '🔌 API Integrations' },
    ];
  }

  return [
    { id: 'web-movil', title: '💻📱 Web & Móvil' },
    { id: 'software', title: '⚙️ Software a medida' },
    { id: 'ia', title: '🤖 Soluciones de IA' },
    { id: 'apis', title: '🔌 Integración de APIs' },
  ];
}

function buildServiceTitle(kind: WhatsAppAssistantKind, lang: 'es' | 'en') {
  if (lang === 'en') {
    switch (kind) {
      case 'web-movil':
        return 'Web & Mobile';
      case 'software':
        return 'Custom Software';
      case 'ia':
        return 'AI Solutions';
      case 'apis':
        return 'API Integrations';
      case 'servicios':
        return 'Services';
      default:
        return 'General inquiry';
    }
  }

  switch (kind) {
    case 'web-movil':
      return 'Web & Móvil';
    case 'software':
      return 'Software a medida';
    case 'ia':
      return 'Soluciones de IA';
    case 'apis':
      return 'Integración de APIs';
    case 'servicios':
      return 'Servicios';
    default:
      return 'Consulta general';
  }
}

function buildWhatsAppUrl({
  lang,
  kind,
  serviceTitle,
  optionTitle,
  goal,
  company,
  contact,
}: {
  lang: 'es' | 'en';
  kind: WhatsAppAssistantKind;
  serviceTitle: string;
  optionTitle: string;
  goal: string;
  company: string;
  contact: string;
}) {
  const trigger = triggerByKind[kind];
  const companyValue = company.trim();
  const companyLineEn = companyValue ? `Company: ${companyValue}` : '';
  const companyLineEs = companyValue ? `Empresa: ${companyValue}` : '';

  const message =
    lang === 'en'
      ? [
          `Hi AirCoding 👋, ${trigger}.`,
          'Source: WEB_CHAT_BUBBLE',
          `Service: ${serviceTitle}`,
          `Option: ${optionTitle}`,
          `Goal: ${goal.trim() || 'To be defined'}`,
          companyLineEn,
          contact.trim() ? `Contact: ${contact.trim()}` : '',
          'Approx budget:',
        ]
          .filter(Boolean)
          .join('\n')
      : [
          `Hola AirCoding 👋, ${trigger}.`,
          'Origen: WEB_CHAT_BUBBLE',
          `Servicio: ${serviceTitle}`,
          `Opción: ${optionTitle}`,
          `Objetivo: ${goal.trim() || 'Por definir'}`,
          companyLineEs,
          contact.trim() ? `Contacto: ${contact.trim()}` : '',
          'Presupuesto aprox:',
        ]
          .filter(Boolean)
          .join('\n');

  return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(message)}`;
}

function SelectField({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-xs font-semibold tracking-wide text-muted">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select-pro w-full rounded-xl px-4 py-3 pr-10 text-sm outline-none transition"
          data-empty={!value}
        >
          {children}
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
  );
}

export default function WhatsAppAssistant({
  kind = 'general',
  serviceTitle,
  options,
}: WhatsAppAssistantProps) {
  const { lang } = useI18n();

  const copy =
    lang === 'en'
      ? {
          bubble: '💬 Chat assistant',
          title: '🤖 WhatsApp Assistant',
          intro: 'I help you prepare a clearer first message before opening WhatsApp.',
          option: '📦 Service option',
          goal: '🎯 Main goal',
          goalPlaceholder: 'Example: improve qualified leads and automate follow-up.',
          company: '🏢 Company (optional)',
          companyPlaceholder: 'Your company or business name (optional)',
          contact: '🙋 Contact name *',
          contactPlaceholder: 'Your name',
          contactRequired: 'Please enter your name to continue.',
          cta: 'Continue on WhatsApp',
          hint: 'This opens your WhatsApp Business chat with a structured professional message.',
          close: 'Close assistant',
        }
      : {
          bubble: '💬 Asistente chat',
          title: '🤖 Asistente WhatsApp',
          intro: 'Te ayudo a preparar un primer mensaje más claro antes de abrir WhatsApp.',
          option: '📦 Opción de servicio',
          goal: '🎯 Objetivo principal',
          goalPlaceholder: 'Ejemplo: mejorar leads calificados y automatizar seguimiento.',
          company: '🏢 Empresa (opcional)',
          companyPlaceholder: 'Nombre de tu empresa o pyme (opcional)',
          contact: '🙋 Nombre de contacto *',
          contactPlaceholder: 'Tu nombre',
          contactRequired: 'Ingresa tu nombre para continuar.',
          cta: 'Continuar en WhatsApp',
          hint: 'Esto abre tu chat de WhatsApp Business con un mensaje estructurado y profesional.',
          close: 'Cerrar asistente',
        };

  const resolvedOptions = useMemo(() => {
    if (options && options.length > 0) return options;
    return buildDefaultOptions(lang);
  }, [options, lang]);

  const [open, setOpen] = useState(false);
  const [optionId, setOptionId] = useState('');
  const [goal, setGoal] = useState('');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [contactTouched, setContactTouched] = useState(false);

  useEffect(() => {
    setOptionId(resolvedOptions[0]?.id ?? '');
    setGoal('');
    setCompany('');
    setContact('');
    setContactTouched(false);
  }, [kind, lang, resolvedOptions]);

  useEffect(() => {
    const onOverlayOpen = (event: Event) => {
      const source = (event as CustomEvent<string>).detail;
      if (source !== 'whatsapp') setOpen(false);
    };
    window.addEventListener(OVERLAY_EVENT, onOverlayOpen as EventListener);
    return () => window.removeEventListener(OVERLAY_EVENT, onOverlayOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent(OVERLAY_EVENT, { detail: 'whatsapp' }));
  }, [open]);

  const selectedOption = resolvedOptions.find((option) => option.id === optionId) ?? resolvedOptions[0];
  const resolvedServiceTitle = serviceTitle || buildServiceTitle(kind, lang);
  const contactValue = contact.trim();
  const isContactValid = contactValue.length >= 2;

  const assistantUrl = buildWhatsAppUrl({
    lang,
    kind,
    serviceTitle: resolvedServiceTitle,
    optionTitle: selectedOption?.title ?? '',
    goal,
    company,
    contact: contactValue,
  });

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[70] bg-black/45" onClick={() => setOpen(false)} aria-hidden />
      )}

      {open && (
        <aside
          className="fixed inset-x-3 bottom-20 top-[4.8rem] z-[71] flex flex-col rounded-2xl border border-token bg-[color:var(--bg)]/96 p-4 shadow-2xl backdrop-blur-xl sm:inset-auto sm:bottom-24 sm:right-4 sm:top-auto sm:max-h-[78dvh] sm:w-[calc(100vw-2rem)] sm:max-w-sm"
          aria-label={copy.title}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold">{copy.title}</h3>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-1 text-muted transition hover:bg-[color:var(--surface-2)] hover:text-[var(--fg)]"
              aria-label={copy.close}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="rounded-xl bg-[color:var(--surface)] p-3 text-sm">{copy.intro}</div>

          <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-1">
            <div className="grid gap-3 pb-2">
              <SelectField id="wa-assistant-option" label={copy.option} value={optionId} onChange={setOptionId}>
                {resolvedOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.title}
                  </option>
                ))}
              </SelectField>

              <div>
                <label htmlFor="wa-assistant-goal" className="mb-1 block text-xs font-semibold tracking-wide text-muted">
                  {copy.goal}
                </label>
                <textarea
                  id="wa-assistant-goal"
                  rows={3}
                  value={goal}
                  onChange={(e) => setGoal(e.target.value.slice(0, 260))}
                  placeholder={copy.goalPlaceholder}
                  className="field-pro w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="wa-assistant-company" className="mb-1 block text-xs font-semibold tracking-wide text-muted">
                    {copy.company}
                  </label>
                  <input
                    id="wa-assistant-company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value.slice(0, 80))}
                    placeholder={copy.companyPlaceholder}
                    className="field-pro w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                  />
                </div>

                <div>
                  <label htmlFor="wa-assistant-contact" className="mb-1 block text-xs font-semibold tracking-wide text-muted">
                    {copy.contact}
                  </label>
                  <input
                    id="wa-assistant-contact"
                    value={contact}
                    onChange={(e) => setContact(e.target.value.slice(0, 60))}
                    onBlur={() => setContactTouched(true)}
                    placeholder={copy.contactPlaceholder}
                    className="field-pro w-full rounded-xl px-4 py-3 text-sm outline-none transition"
                    required
                  />
                  {contactTouched && !isContactValid && (
                    <p className="mt-1 text-xs text-red-400">{copy.contactRequired}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 border-t border-token pt-3">
            <a
              href={assistantUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!isContactValid) {
                  e.preventDefault();
                  setContactTouched(true);
                }
              }}
              className={`btn-hero inline-flex w-full items-center justify-center text-sm font-semibold ${!isContactValid ? 'opacity-60' : ''}`}
              aria-disabled={!isContactValid}
            >
              {copy.cta}
            </a>

            <p className="mt-2 text-xs text-muted">{copy.hint}</p>
          </div>
        </aside>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className={`fixed bottom-5 right-4 z-[71] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-sm font-semibold text-white shadow-xl transition hover:brightness-95 sm:h-auto sm:w-auto sm:gap-2 sm:px-4 sm:py-3 ${open ? 'pointer-events-none opacity-0' : ''}`}
        aria-expanded={open}
        aria-label={copy.bubble}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
          <path d="M20.5 3.5A11.76 11.76 0 0 0 12.02 0C5.48 0 .13 5.24.13 11.7a11.6 11.6 0 0 0 1.6 5.87L0 24l6.67-1.72a11.95 11.95 0 0 0 5.35 1.28h.01c6.54 0 11.89-5.25 11.89-11.7 0-3.12-1.23-6.05-3.42-8.36Zm-8.48 18.08h-.01a9.94 9.94 0 0 1-5.05-1.37l-.36-.21-3.95 1.02 1.06-3.84-.24-.39a9.65 9.65 0 0 1-1.49-5.12c0-5.35 4.43-9.7 9.89-9.7 2.64 0 5.11 1.02 6.97 2.88a9.55 9.55 0 0 1 2.9 6.82c0 5.35-4.44 9.71-9.72 9.71Zm5.43-7.23c-.3-.14-1.78-.87-2.05-.97-.28-.1-.48-.14-.69.14-.2.28-.79.97-.96 1.16-.18.2-.35.21-.65.08-.3-.14-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.67-2.06-.17-.28-.02-.43.13-.57.14-.14.3-.35.45-.52.15-.17.2-.28.3-.48.1-.2.05-.38-.03-.52-.08-.14-.7-1.68-.96-2.3-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.35-.27.28-1.03 1-1.03 2.45 0 1.44 1.06 2.84 1.2 3.03.14.2 2.08 3.28 5.03 4.48.7.3 1.25.48 1.68.61.71.22 1.36.19 1.87.12.57-.08 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.07-.13-.27-.2-.57-.34Z" />
        </svg>
        <span className="hidden sm:inline">{copy.bubble}</span>
      </button>
    </>
  );
}
