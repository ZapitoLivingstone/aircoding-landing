'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'es' | 'en';

type Dict = Record<string, string>;
type Dictionaries = Record<Lang, Dict>;

/** Diccionario base: añade aquí las frases comunes */
const dictionaries: Dictionaries = {
  es: {
    // header/nav
    nav_services: 'Servicios',
    nav_process: 'Proceso',
    nav_contact: 'Contacto',
    cta_quote: 'Cotiza tu proyecto',
    // hero
    hero_h1: 'Software y apps que hacen crecer tu negocio.',
    hero_sub: 'Web & Móvil, Software a medida, Soluciones de IA e Integración de APIs. Rápido, moderno y sin complicaciones.',
    hero_cta_primary: 'Cotiza tu proyecto',
    hero_cta_secondary: 'Ver servicios',
    // services grid
    services_title: 'Servicios',
    view_all: 'Ver todos →',
  },
  en: {
    nav_services: 'Services',
    nav_process: 'Process',
    nav_contact: 'Contact',
    cta_quote: 'Get a quote',
    hero_h1: 'Software & apps that grow your business.',
    hero_sub: 'Web & Mobile, Custom Software, AI Solutions and API Integrations. Fast, modern and hassle-free.',
    hero_cta_primary: 'Get a quote',
    hero_cta_secondary: 'See services',
    services_title: 'Services',
    view_all: 'See all →',
  },
};

const I18nCtx = createContext<{ lang: Lang; setLang: (l: Lang)=>void; t: (k: string)=>string }>({
  lang: 'es', setLang: () => {}, t: (k) => k,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('es');

  // lee guardado o preferencia del navegador
  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('ac-lang')) as Lang | null;
    if (saved) setLang(saved);
    else if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('en')) setLang('en');
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
    if (typeof window !== 'undefined') localStorage.setItem('ac-lang', lang);
  }, [lang]);

  const t = (k: string) => dictionaries[lang][k] ?? dictionaries.es[k] ?? k;
  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
