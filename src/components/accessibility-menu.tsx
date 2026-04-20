'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAccessibility, useI18n, type TextScale } from '@/providers/ui';

function nextTextScale(current: TextScale): TextScale {
  if (current === 'normal') return 'large';
  if (current === 'large') return 'xlarge';
  return 'normal';
}

export default function AccessibilityMenu() {
  const { lang } = useI18n();
  const { textScale, setTextScale, highContrast, setHighContrast } = useAccessibility();
  const [open, setOpen] = useState(false);

  const copy = useMemo(
    () =>
      lang === 'en'
        ? {
            button: 'Accessibility options',
            title: 'Accessibility',
            size: 'Text size',
            sizeValue:
              textScale === 'normal' ? 'Normal' : textScale === 'large' ? 'Large' : 'Extra large',
            sizeHint: 'Switch size',
            contrast: 'High contrast',
            close: 'Close accessibility options',
          }
        : {
            button: 'Opciones de accesibilidad',
            title: 'Accesibilidad',
            size: 'Tamaño de texto',
            sizeValue: textScale === 'normal' ? 'Normal' : textScale === 'large' ? 'Grande' : 'Extra grande',
            sizeHint: 'Cambiar tamaño',
            contrast: 'Alto contraste',
            close: 'Cerrar opciones de accesibilidad',
          },
    [lang, textScale]
  );

  useEffect(() => {
    setOpen(false);
  }, [lang]);

  return (
    <>
      {open && (
        <aside
          className="fixed bottom-24 left-4 z-[71] w-[calc(100vw-2rem)] max-w-xs rounded-2xl border border-token bg-[color:var(--surface)] p-4 shadow-2xl"
          aria-label={copy.title}
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

          <div className="grid gap-3">
            <button
              type="button"
              onClick={() => setTextScale(nextTextScale(textScale))}
              className="inline-flex items-center justify-between rounded-xl border border-token bg-[color:var(--surface-2)] px-3 py-2 text-sm transition hover:bg-[color:var(--surface)]"
              aria-label={copy.sizeHint}
            >
              <span>{copy.size}</span>
              <span className="font-semibold">{copy.sizeValue}</span>
            </button>

            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className="inline-flex items-center justify-between rounded-xl border border-token bg-[color:var(--surface-2)] px-3 py-2 text-sm transition hover:bg-[color:var(--surface)]"
              aria-pressed={highContrast}
            >
              <span>{copy.contrast}</span>
              <span className="font-semibold">{highContrast ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </aside>
      )}

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-5 left-4 z-[71] inline-flex h-12 w-12 items-center justify-center rounded-full border border-token bg-[color:var(--surface)] text-[var(--fg)] shadow-xl transition hover:bg-[color:var(--surface-2)]"
        aria-expanded={open}
        aria-label={copy.button}
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <circle cx="12" cy="5" r="2.5" />
          <path d="M12 8v13M7 21l5-6 5 6M5 11h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}
