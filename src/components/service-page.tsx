'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useI18n } from '@/providers/ui';

export type ServiceKind = 'web-movil' | 'software' | 'ia' | 'apis';

export type ServicePageProps = {
  kind: ServiceKind;
  title: string;
  summary: string;
  forWho: string[];
  fit: string[];
  ideas: string[];
  benefits: string[];
  kpis: string[];
};

type CatalogItem = {
  id: string;
  title: { es: string; en: string };
  includes: { es: string; en: string };
  when: { es: string; en: string };
};

type QuickOption = {
  id: string;
  title: string;
  includes: string;
  when: string;
  emoji: string;
};

const catalogAll: CatalogItem[] = [
  {
    id: 'landing',
    title: { es: 'Landing Page (1–3 secciones)', en: 'Landing Page (1–3 sections)' },
    includes: {
      es: 'Next.js, diseño responsive, formulario de contacto y SEO básico.',
      en: 'Next.js, responsive design, contact form and basic SEO.',
    },
    when: {
      es: 'Cuando necesitas validar una oferta rápido.',
      en: 'When you need to validate an offer fast.',
    },
  },
  {
    id: 'corporate',
    title: { es: 'Sitio Web Pequeño (4–5 páginas)', en: 'Small Website (4–5 pages)' },
    includes: {
      es: 'Estructura comercial completa con contenido editable.',
      en: 'Complete commercial structure with editable content.',
    },
    when: {
      es: 'Cuando necesitas presencia formal y clara.',
      en: 'When you need a formal and clear presence.',
    },
  },
  {
    id: 'ecommerce',
    title: { es: 'E-commerce Starter', en: 'E-commerce Starter' },
    includes: {
      es: 'Catálogo inicial, carrito y pagos online.',
      en: 'Starter catalog, cart and online payments.',
    },
    when: {
      es: 'Cuando quieres comenzar a vender online.',
      en: 'When you want to start selling online.',
    },
  },
  {
    id: 'mvp',
    title: { es: 'App Móvil MVP', en: 'Mobile App MVP' },
    includes: {
      es: 'Login y flujo principal para validar tu idea.',
      en: 'Login and core flow to validate your idea.',
    },
    when: {
      es: 'Cuando necesitas lanzar rápido y medir interés.',
      en: 'When you need to launch fast and measure demand.',
    },
  },
  {
    id: 'erpcrm',
    title: { es: 'Panel Interno Lite', en: 'Internal Panel Lite' },
    includes: {
      es: 'Roles básicos y módulos clave para operar mejor.',
      en: 'Basic roles and key modules for better operations.',
    },
    when: {
      es: 'Cuando planillas y procesos manuales ya no dan abasto.',
      en: 'When spreadsheets and manual operations no longer scale.',
    },
  },
  {
    id: 'chatbot',
    title: { es: 'Chatbot FAQ con IA', en: 'AI FAQ Chatbot' },
    includes: {
      es: 'Atención 24/7 sobre tu base de conocimiento.',
      en: '24/7 support over your knowledge base.',
    },
    when: {
      es: 'Cuando recibes consultas repetitivas todos los días.',
      en: 'When you get repetitive questions every day.',
    },
  },
  {
    id: 'predictive',
    title: { es: 'Resumen y Etiquetado con IA', en: 'AI Summaries & Tagging' },
    includes: {
      es: 'Clasificación automática y ahorro de tiempo operativo.',
      en: 'Auto classification and operational time savings.',
    },
    when: {
      es: 'Cuando necesitas procesar alto volumen de información.',
      en: 'When you need to process high information volume.',
    },
  },
  {
    id: 'api-simple',
    title: { es: 'Integración API única', en: 'Single API Integration' },
    includes: {
      es: 'Conexión entre plataformas con validaciones y seguimiento.',
      en: 'Platform-to-platform connection with validations and tracking.',
    },
    when: {
      es: 'Cuando hay tareas manuales entre sistemas.',
      en: 'When there are manual tasks between systems.',
    },
  },
];

const pickByKind: Record<ServiceKind, string[]> = {
  'web-movil': ['landing', 'corporate', 'ecommerce', 'mvp'],
  software: ['erpcrm'],
  ia: ['chatbot', 'predictive'],
  apis: ['api-simple'],
};

const PHONE_DIGITS = '56968419793';

const triggerByKind: Record<ServiceKind, string> = {
  'web-movil': 'COTIZAR_WEB',
  software: 'COTIZAR_SOFTWARE',
  ia: 'COTIZAR_IA',
  apis: 'COTIZAR_APIS',
};

const optionEmojiById: Record<string, string> = {
  landing: '🌐',
  corporate: '🧱',
  ecommerce: '🛒',
  mvp: '📱',
  erpcrm: '⚙️',
  chatbot: '🤖',
  predictive: '🧠',
  'api-simple': '🔌',
};

function getQuickOptions(kind: ServiceKind, lang: 'es' | 'en'): QuickOption[] {
  const ids = pickByKind[kind];
  return catalogAll
    .filter((item) => ids.includes(item.id))
    .map((item) => ({
      id: item.id,
      title: lang === 'en' ? item.title.en : item.title.es,
      includes: lang === 'en' ? item.includes.en : item.includes.es,
      when: lang === 'en' ? item.when.en : item.when.es,
      emoji: optionEmojiById[item.id] ?? '✨',
    }));
}

function buildWhatsAppUrl({
  lang,
  kind,
  serviceTitle,
  optionTitle,
  goal,
  contact,
  source,
}: {
  lang: 'es' | 'en';
  kind: ServiceKind;
  serviceTitle: string;
  optionTitle?: string;
  goal?: string;
  contact?: string;
  source?: 'WEB_BOT';
}) {
  const trigger = triggerByKind[kind];
  const contactLineEn = contact?.trim() ? `Contact: ${contact.trim()}` : '';
  const contactLineEs = contact?.trim() ? `Contacto: ${contact.trim()}` : '';

  const message =
    lang === 'en'
      ? [
          `Hi AirCoding, ${trigger}.`,
          source ? `Source: ${source}` : '',
          `Service: ${serviceTitle}`,
          optionTitle ? `Selected option: ${optionTitle}` : '',
          goal?.trim() ? `Goal: ${goal.trim()}` : 'Goal:',
          contactLineEn,
          'Approx budget:',
        ]
          .filter(Boolean)
          .join('\n')
      : [
          `Hola AirCoding, ${trigger}.`,
          source ? `Origen: ${source}` : '',
          `Servicio: ${serviceTitle}`,
          optionTitle ? `Opción elegida: ${optionTitle}` : '',
          goal?.trim() ? `Objetivo: ${goal.trim()}` : 'Objetivo:',
          contactLineEs,
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

function CompactList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-xl border border-token bg-[color:var(--surface-2)] px-4 py-3 text-sm"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function Catalog({
  kind,
  lang,
}: {
  kind: ServiceKind;
  lang: 'es' | 'en';
}) {
  const items = getQuickOptions(kind, lang);

  const copy =
    lang === 'en'
      ? {
          title: '⚡ Quick options',
          subtitle: 'A quick visual guide before opening the assistant.',
          when: '👉 Recommended when:',
        }
      : {
          title: '⚡ Opciones rápidas',
          subtitle: 'Guía visual rápida antes de abrir el asistente.',
          when: '👉 Recomendado cuando:',
        };

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold">{copy.title}</h2>
      <p className="mt-1 text-sm text-muted">{copy.subtitle}</p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.id} className="rounded-2xl border border-token bg-[color:var(--surface)] p-5">
            <h3 className="text-lg font-semibold">
              <span aria-hidden className="mr-1">{item.emoji}</span>
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-muted">{item.includes}</p>
            <p className="mt-3 text-sm">
              <span className="font-semibold">{copy.when}</span> {item.when}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function WhatsAppAssistantBubble({
  kind,
  serviceTitle,
  lang,
  options,
}: {
  kind: ServiceKind;
  serviceTitle: string;
  lang: 'es' | 'en';
  options: QuickOption[];
}) {
  const copy =
    lang === 'en'
      ? {
          bubble: '💬 Chat assistant',
          title: '🤖 WhatsApp Assistant',
          intro: 'Hi, I can help you build a clearer first message before sending it to WhatsApp.',
          option: '📦 Service option',
          goal: '🎯 Main goal',
          goalPlaceholder: 'Example: Improve leads from website and automate follow-up.',
          contact: '🙋 Contact name *',
          contactPlaceholder: 'Your name',
          contactRequired: 'Please enter your name to continue.',
          cta: 'Continue on WhatsApp',
          hint: 'This opens your WhatsApp Business chat with a professional pre-filled message.',
          close: 'Close assistant',
        }
      : {
          bubble: '💬 Asistente chat',
          title: '🤖 Asistente WhatsApp',
          intro: 'Hola, te ayudo a armar un primer mensaje más claro antes de ir a WhatsApp.',
          option: '📦 Opción de servicio',
          goal: '🎯 Objetivo principal',
          goalPlaceholder: 'Ejemplo: mejorar leads del sitio y automatizar seguimiento.',
          contact: '🙋 Nombre de contacto *',
          contactPlaceholder: 'Tu nombre',
          contactRequired: 'Ingresa tu nombre para continuar.',
          cta: 'Continuar en WhatsApp',
          hint: 'Esto abre tu chat de WhatsApp Business con un mensaje profesional prellenado.',
          close: 'Cerrar asistente',
        };

  const [open, setOpen] = useState(false);
  const [optionId, setOptionId] = useState('');
  const [goal, setGoal] = useState('');
  const [contact, setContact] = useState('');
  const [contactTouched, setContactTouched] = useState(false);

  useEffect(() => {
    setOptionId(options[0]?.id ?? '');
    setGoal('');
    setContact('');
    setContactTouched(false);
  }, [kind, lang, options]);

  const selectedOption = options.find((option) => option.id === optionId) ?? options[0];
  const contactValue = contact.trim();
  const isContactValid = contactValue.length >= 2;

  const assistantUrl = buildWhatsAppUrl({
    lang,
    kind,
    serviceTitle,
    optionTitle: selectedOption?.title,
    goal,
    contact: contactValue,
    source: 'WEB_BOT',
  });

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[70] bg-black/30 sm:bg-transparent" onClick={() => setOpen(false)} aria-hidden />
      )}

      {open && (
        <aside
          className="fixed bottom-24 right-4 z-[71] w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-token bg-[color:var(--surface)] p-4 shadow-2xl"
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

          <div className="rounded-xl bg-[color:var(--surface-2)] p-3 text-sm">{copy.intro}</div>

          <div className="mt-3 grid gap-3">
            <SelectField id="wa-option" label={copy.option} value={optionId} onChange={setOptionId}>
              {options.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.emoji} {option.title}
                </option>
              ))}
            </SelectField>

            <div>
              <label htmlFor="wa-goal" className="mb-1 block text-xs font-semibold tracking-wide text-muted">
                {copy.goal}
              </label>
              <textarea
                id="wa-goal"
                rows={3}
                value={goal}
                onChange={(e) => setGoal(e.target.value.slice(0, 220))}
                placeholder={copy.goalPlaceholder}
                className="field-pro w-full rounded-xl px-4 py-3 text-sm outline-none transition"
              />
            </div>

            <div>
              <label htmlFor="wa-contact" className="mb-1 block text-xs font-semibold tracking-wide text-muted">
                {copy.contact}
              </label>
              <input
                id="wa-contact"
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
            className={`btn-hero mt-4 inline-flex w-full items-center justify-center text-sm font-semibold ${!isContactValid ? 'opacity-60' : ''}`}
            aria-disabled={!isContactValid}
          >
            {copy.cta}
          </a>

          <p className="mt-2 text-xs text-muted">{copy.hint}</p>
        </aside>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-5 right-4 z-[71] inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:brightness-95"
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

export default function ServicePage(props: ServicePageProps) {
  const { lang } = useI18n();

  const quickOptions = useMemo(() => getQuickOptions(props.kind, lang), [props.kind, lang]);

  const copy =
    lang === 'en'
      ? {
          badge: 'Main channel: WhatsApp Business',
          autoHint: 'Use the chat assistant button to send a cleaner first message and classify your case faster.',
          fitTitle: '🧩 Ideal if you are currently dealing with',
          resultTitle: '📈 Expected impact',
          detailsSummary: '📚 See full details',
          who: '👥 Who this is for',
          ideas: '💡 Implementation ideas',
          benefits: '✅ Benefits',
        }
      : {
          badge: 'Canal principal: WhatsApp Business',
          autoHint: 'Usa el botón del asistente chat para enviar un primer mensaje más claro y clasificar tu caso más rápido.',
          fitTitle: '🧩 Ideal si hoy estás enfrentando',
          resultTitle: '📈 Impacto esperado',
          detailsSummary: '📚 Ver detalles completos',
          who: '👥 ¿Para quién es?',
          ideas: '💡 Ideas de implementación',
          benefits: '✅ Beneficios',
        };

  return (
    <>
      <main className="container py-12">
        <section className="rounded-2xl border border-token bg-[color:var(--surface)] p-6 md:p-8">
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

          <h1 className="mt-4 text-3xl font-extrabold md:text-4xl">{props.title}</h1>
          <p className="mt-2 max-w-3xl text-sm text-muted md:text-base">{props.summary}</p>
          <p className="mt-3 max-w-3xl text-sm">{copy.autoHint}</p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-token bg-[color:var(--surface)] p-5">
            <h2 className="text-lg font-semibold">{copy.fitTitle}</h2>
            <CompactList items={props.fit.slice(0, 3)} />
          </article>

          <article className="rounded-2xl border border-token bg-[color:var(--surface)] p-5">
            <h2 className="text-lg font-semibold">{copy.resultTitle}</h2>
            <CompactList items={props.kpis.slice(0, 3)} />
          </article>
        </section>

        <Catalog kind={props.kind} lang={lang} />

        <details className="mt-8 rounded-2xl border border-token bg-[color:var(--surface)] p-5">
          <summary className="cursor-pointer list-none text-sm font-semibold">{copy.detailsSummary}</summary>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <section>
              <h3 className="text-sm font-semibold">{copy.who}</h3>
              <CompactList items={props.forWho} />
            </section>
            <section>
              <h3 className="text-sm font-semibold">{copy.ideas}</h3>
              <CompactList items={props.ideas} />
            </section>
            <section>
              <h3 className="text-sm font-semibold">{copy.benefits}</h3>
              <CompactList items={props.benefits} />
            </section>
          </div>
        </details>
      </main>

      <WhatsAppAssistantBubble
        kind={props.kind}
        serviceTitle={props.title}
        lang={lang}
        options={quickOptions}
      />
    </>
  );
}
