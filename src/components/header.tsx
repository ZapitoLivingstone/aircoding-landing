"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n, useThemeMode } from "@/providers/ui";

const OVERLAY_EVENT = "aircoding:overlay-open";

function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center rounded-md outline-none"
      onClick={onClick}
    >
      <span className="text-[var(--muted)] transition-colors group-hover:text-[var(--fg)]">
        {children}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded bg-[var(--ac-accent)] transition-transform group-hover:scale-x-100"
      />
    </a>
  );
}

function LogoMark() {
  return (
    <div className="rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-sm">
      <Image
        src="/Logo_AirCoding-sin-fondo.png"
        alt="AirCoding"
        width={34}
        height={34}
        priority
        className="rounded-full select-none"
      />
    </div>
  );
}

function useLockBody(lock: boolean) {
  useEffect(() => {
    if (!lock) return;

    const { overflow, paddingRight } = getComputedStyle(document.body);
    const prevOverflow = document.body.style.overflow;
    const prevPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbar > 0 && overflow !== "hidden") {
      document.body.style.paddingRight = `${scrollbar}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPadding || paddingRight;
    };
  }, [lock]);
}

export default function Header() {
  const { t, setLang, lang } = useI18n();
  const { theme, setTheme } = useThemeMode();

  const [open, setOpen] = useState(false);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  useLockBody(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) firstFocusableRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onOverlayOpen = (event: Event) => {
      const source = (event as CustomEvent<string>).detail;
      if (source !== "header") setOpen(false);
    };
    window.addEventListener(OVERLAY_EVENT, onOverlayOpen as EventListener);
    return () => window.removeEventListener(OVERLAY_EVENT, onOverlayOpen as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new CustomEvent(OVERLAY_EVENT, { detail: "header" }));
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] rounded-md bg-white/90 px-3 py-2 text-sm shadow ring-1"
      >
        {lang === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[color:var(--bg)]/86 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <LogoMark />
            <span className="text-sm font-semibold tracking-wide">AirCoding</span>
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <NavLink href="/servicios">{t("nav_services")}</NavLink>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="chip rounded-xl bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] transition hover:text-[var(--fg)]"
                aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
                title="ES / EN"
              >
                {lang.toUpperCase()}
              </button>

              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="chip rounded-xl bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] transition hover:text-[var(--fg)]"
                aria-label={theme === "dark" ? "Cambiar a tema claro" : "Switch to dark theme"}
                title="Light / Dark"
              >
                {theme === "dark" ? "☀︎" : "🌙"}
              </button>
            </div>
          </nav>

          <div className="flex items-center gap-1.5 md:hidden">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="chip rounded-xl bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] transition hover:text-[var(--fg)]"
              aria-label={theme === "dark" ? "Cambiar a tema claro" : "Switch to dark theme"}
              title="Light / Dark"
            >
              {theme === "dark" ? "☀︎" : "🌙"}
            </button>
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="chip rounded-xl bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] transition hover:text-[var(--fg)]"
              aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
              title="ES / EN"
            >
              {lang.toUpperCase()}
            </button>
            <button
              aria-controls="mobile-menu"
              aria-expanded={open}
              aria-label={lang === "en" ? "Open menu" : "Abrir menú"}
              onClick={() => setOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface)] ring-1 ring-[var(--border)] transition hover:bg-[color:var(--surface-2)] focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span className="sr-only">Menu</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[var(--fg)]">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <>
          <div
            className="fixed inset-0 z-[60] bg-black/40"
            onClick={() => setOpen(false)}
            aria-hidden
          />

          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={lang === "en" ? "Mobile menu" : "Menú móvil"}
            className="fixed inset-x-3 top-[4.25rem] z-[61] rounded-2xl border border-[var(--border)] bg-[color:var(--bg)]/98 p-4 shadow-2xl outline-none backdrop-blur-xl"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LogoMark />
                <span className="text-sm font-semibold tracking-wide">AirCoding</span>
              </div>
              <button
                ref={firstFocusableRef}
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-2)] ring-1 ring-[var(--border)] transition hover:bg-[color:var(--surface)] focus-visible:ring-2 focus-visible:ring-offset-2"
                aria-label={lang === "en" ? "Close menu" : "Cerrar menú"}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <nav className="pt-4">
              <ul className="grid gap-2 text-sm">
                <li>
                  <Link
                    href="/servicios"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl border border-[var(--border)] bg-[color:var(--surface)] px-4 py-3 font-medium text-[var(--fg)]"
                  >
                    {t("nav_services")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#por-que"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl border border-[var(--border)] bg-[color:var(--surface)] px-4 py-3 font-medium text-[var(--fg)]"
                  >
                    {lang === "en" ? "Why us" : "Por qué nosotros"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/#contacto"
                    onClick={() => setOpen(false)}
                    className="block rounded-xl border border-[var(--border)] bg-[color:var(--surface)] px-4 py-3 font-medium text-[var(--fg)]"
                  >
                    {lang === "en" ? "Contact" : "Contacto"}
                  </Link>
                </li>
              </ul>

            </nav>
          </div>
        </>
      )}
      <div aria-hidden className="h-16" />
    </>
  );
}
