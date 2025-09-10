'use client';
import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
/* ========== I18N ========== */

export type Lang = 'es' | 'en';

type Dict = Record<string, string>;
type Dictionaries = Record<Lang, Dict>;

const dicts: Dictionaries = {
  es: {
    // Nav / CTAs
    nav_services: 'Servicios',
    nav_process: 'Proceso',
    nav_contact: 'Contacto',
    cta_quote: 'Cotiza tu proyecto',

    // Hero
    hero_h1: 'Software y apps que hacen crecer tu negocio.',
    hero_sub:
      'Web & Móvil, Software a medida, Soluciones de IA e Integración de APIs. Rápido, moderno y sin complicaciones.',
    hero_cta_primary: 'Cotiza tu proyecto',
    hero_cta_secondary: 'Ver servicios',

    // Services grid
    services_title: 'Servicios',
    view_all: 'Ver todos →',

    // Contact block (home)
    contact_title: 'Contáctanos',
    contact_sub: 'Te responderemos en menos de 24 horas.',
  },
  en: {
    nav_services: 'Services',
    nav_process: 'Process',
    nav_contact: 'Contact',
    cta_quote: 'Get a quote',

    hero_h1: 'Software & apps that grow your business.',
    hero_sub:
      'Web & Mobile, Custom Software, AI Solutions and API Integrations. Fast, modern and hassle-free.',
    hero_cta_primary: 'Get a quote',
    hero_cta_secondary: 'See services',

    services_title: 'Services',
    view_all: 'See all →',

    contact_title: 'Contact us',
    contact_sub: 'We’ll reply within 24 hours.',
  },
};

type I18nCtxValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (k: string) => string;
};

const I18nCtx = createContext<I18nCtxValue>({
  lang: 'es',
  setLang: () => {},
  t: (k) => dicts.es[k] ?? k,
});

export function useI18n() {
  return useContext(I18nCtx);
}

/* ========== THEME ========== */

type Theme = 'light' | 'dark';
type ThemeCtxValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
};

const ThemeCtx = createContext<ThemeCtxValue>({
  theme: 'dark',
  setTheme: () => {},
});

export function useThemeMode() {
  return useContext(ThemeCtx);
}

/* ========== PROVIDER ÚNICO ========== */

export function UIProvider({ children }: { children: React.ReactNode }) {
  // Idioma
  const [lang, setLang] = useState<Lang>('es');

  useEffect(() => {
  if (typeof document !== 'undefined') {
    const m = document.cookie.match(/(?:^|; )ac-lang=(es|en)/);
    if (m && (m[1] === 'es' || m[1] === 'en')) {
      setLang(m[1] as Lang);
      return;
    }
  }
  const saved = (typeof window !== 'undefined' && localStorage.getItem('ac-lang')) as Lang | null;
  if (saved) setLang(saved);
  else if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('en')) {
    setLang('en');
  }
}, []);


  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
      // 👇 añade esta línea
      document.cookie = `ac-lang=${lang}; Path=/; Max-Age=31536000; SameSite=Lax`;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('ac-lang', lang);
    }
  }, [lang]);


  const t = useCallback((k: string) => dicts[lang][k] ?? dicts.es[k] ?? k, [lang]);

  const i18nValue = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  // Tema
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && localStorage.getItem('ac-theme')) as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dataset.theme = theme;
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('ac-theme', theme);
    }
  }, [theme]);

  const themeValue = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <I18nCtx.Provider value={i18nValue}>
      <ThemeCtx.Provider value={themeValue}>{children}</ThemeCtx.Provider>
    </I18nCtx.Provider>
  );
}
