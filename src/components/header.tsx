// components/header.tsx
"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
  useSpring,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n, useThemeMode } from "@/providers/ui";

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-md"
      onClick={onClick}
    >
      <span className="transition-colors text-[var(--muted)] group-hover:text-[var(--fg)]">{children}</span>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded
                   bg-gradient-to-r from-teal-400 to-teal-200/60 transition-transform group-hover:scale-x-100"
      />
    </a>
  );
}

function LogoMark() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rX = useSpring(my, { stiffness: 120, damping: 12 });
  const rY = useSpring(mx, { stiffness: 120, damping: 12 });

  function onMove(e: React.MouseEvent) {
    const el = wrapRef.current!;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    mx.set(Math.max(-10, Math.min(10, (dx / rect.width) * 20)));
    my.set(Math.max(-10, Math.min(10, (-dy / rect.height) * 20)));
  }
  function onLeave() { mx.set(0); my.set(0); }

  return (
    <div ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} className="relative group [perspective:700px]">
      <motion.div
        aria-hidden className="absolute -inset-2 -z-10 rounded-full"
        style={{ boxShadow: "0 0 56px 14px rgba(0,179,164,.35)" }}
        initial={{ opacity: 0.0 }} animate={{ opacity: 0.55 }} transition={{ duration: 0.8 }}
      />
      <motion.div
        style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
        whileHover={{ scale: 1.06, rotate: 1.5 }} whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-full p-[2px] bg-gradient-to-br from-teal-500/30 to-transparent"
      >
        <div className="rounded-full bg-white p-1 ring-1 ring-slate-200 shadow-md">
          <Image src="/Logo_AirCoding-sin-fondo.png" alt="AirCoding" width={36} height={36} priority className="rounded-full select-none" />
        </div>
      </motion.div>
    </div>
  );
}

/** Utilidad: lock de scroll cuando el menú móvil está abierto */
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

const sheetVariants: Variants = {
  hidden: { x: "100%", opacity: 0 },
  show: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: "100%", opacity: 0, transition: { duration: 0.2 } },
};

export default function Header() {
  const { t, setLang, lang } = useI18n();
  const { theme, setTheme } = useThemeMode();
  const { scrollYProgress, scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(2,6,23,0.28)", "rgba(2,6,23,0.65)"]);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY.current;
    setHidden(latest > 80 && diff > 0 && !open);
    lastY.current = latest;
  });

  useLockBody(open);

  // Cerrar con ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Focus initial dentro del panel cuando abre
  useEffect(() => {
    if (open) {
      firstFocusableRef.current?.focus();
    }
  }, [open]);

  return (
    <>
      {/* Skip link accesible */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] rounded-md bg-white/90 px-3 py-2 text-sm shadow ring-1">
        {lang === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>

      <motion.header
        className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] backdrop-blur-md"
        style={{ backgroundColor: bg, y: hidden ? -24 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container flex h-16 items-center justify-between gap-3">
          {/* Branding */}
          <div className="flex items-center gap-3">
            <LogoMark />
            <motion.span
              className="text-sm font-semibold tracking-wide"
              initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              AirCoding
            </motion.span>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLink href="#servicios">{t("nav_services")}</NavLink>
            <NavLink href="#proyectos">{t("nav_projects") ?? "Showcase"}</NavLink>
            <NavLink href="#proceso">{t("nav_process")}</NavLink>
            <NavLink href="#contacto">{t("nav_contact")}</NavLink>

            <div className="flex items-center gap-2">
              {/* Toggle idioma */}
              <button
                onClick={() => setLang(lang === "es" ? "en" : "es")}
                className="rounded-xl bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
                aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
                title="ES / EN"
              >
                {lang.toUpperCase()}
              </button>

              {/* Toggle tema */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
                aria-label={theme === "dark" ? "Cambiar a tema claro" : "Switch to dark theme"}
                title="Light / Dark"
              >
                {theme === "dark" ? "☀︎" : "🌙"}
              </button>

              <a href="#contacto" className="hidden lg:inline">
                <Button>{t("cta_quote")}</Button>
              </a>
            </div>
          </nav>

          {/* Mobile actions */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-xl bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
              aria-label={theme === "dark" ? "Cambiar a tema claro" : "Switch to dark theme"}
              title="Light / Dark"
            >
              {theme === "dark" ? "☀︎" : "🌙"}
            </button>
            <button
              onClick={() => setLang(lang === "es" ? "en" : "es")}
              className="rounded-xl bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
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
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-[var(--border)] bg-[var(--surface)] hover:bg-[color:var(--surface-2)] transition focus-visible:ring-2 focus-visible:ring-offset-2"
            >
              <span className="sr-only">Menu</span>
              {/* icon hamburguesa */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[var(--fg)]"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
        </div>

        {/* Progress top bar */}
        <motion.div className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-teal-400 to-teal-200" style={{ scaleX: scrollYProgress }} />
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              key="panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label={lang === "en" ? "Mobile menu" : "Menú móvil"}
              ref={panelRef}
              className="fixed right-0 top-0 z-[61] h-svh w-[88vw] max-w-[380px] rounded-l-2xl border-l border-[var(--border)] bg-[color:var(--surface)] shadow-2xl outline-none"
              variants={sheetVariants}
              initial="hidden" animate="show" exit="exit"
            >
              <div className="flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                  <LogoMark />
                  <span className="text-sm font-semibold tracking-wide">AirCoding</span>
                </div>
                <button
                  ref={firstFocusableRef}
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-[var(--border)] bg-[var(--surface-2)] hover:bg-[color:var(--surface)] transition focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label={lang === "en" ? "Close menu" : "Cerrar menú"}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>

              <nav className="px-4 pb-6 pt-2">
                <ul className="grid gap-2 text-base">
                  <li><NavLink href="#servicios" onClick={() => setOpen(false)}>{t("nav_services")}</NavLink></li>
                  <li><NavLink href="#proyectos" onClick={() => setOpen(false)}>{t("nav_projects") ?? "Showcase"}</NavLink></li>
                  <li><NavLink href="#proceso" onClick={() => setOpen(false)}>{t("nav_process")}</NavLink></li>
                  <li><NavLink href="#contacto" onClick={() => setOpen(false)}>{t("nav_contact")}</NavLink></li>
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setLang(lang === "es" ? "en" : "es")}
                    className="rounded-xl bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
                    aria-label={lang === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
                    title="ES / EN"
                  >
                    {lang.toUpperCase()}
                  </button>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-xl bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
                    aria-label={theme === "dark" ? "Cambiar a tema claro" : "Switch to dark theme"}
                    title="Light / Dark"
                  >
                    {theme === "dark" ? "☀︎" : "🌙"}
                  </button>
                </div>

                <div className="mt-4">
                  <a href="#contacto" onClick={() => setOpen(false)}>
                    <Button className="w-full">{t("cta_quote")}</Button>
                  </a>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer para que el contenido no quede bajo el header fijo */}
      <div aria-hidden className="h-16" />
    </>
  );
}
