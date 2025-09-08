//components/header.tsx//
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
} from "framer-motion";
import { useRef, useState } from "react";
import { useI18n, useThemeMode } from "@/providers/ui";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="group relative inline-flex items-center">
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

export default function Header() {
  const { t, setLang, lang } = useI18n();
  const { theme, setTheme } = useThemeMode();
  const { scrollYProgress, scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 120], ["rgba(2,6,23,0.28)", "rgba(2,6,23,0.65)"]);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = latest - lastY.current;
    setHidden(latest > 80 && diff > 0);
    lastY.current = latest;
  });

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] backdrop-blur-md"
      style={{ backgroundColor: bg, y: hidden ? -24 : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <LogoMark />
          <motion.span
            className="text-sm font-semibold tracking-wide"
            initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            AirCoding
          </motion.span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink href="#servicios">{t('nav_services')}</NavLink>
          <NavLink href="#proceso">{t('nav_process')}</NavLink>
          <NavLink href="#contacto">{t('nav_contact')}</NavLink>

          {/* Toggle idioma */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
              className="rounded-xl bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
              aria-label="Toggle language"
              title="ES / EN"
            >
              {lang.toUpperCase()}
            </button>

            {/* Toggle tema */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-xl bg-[var(--surface)] px-2.5 py-1.5 text-xs text-[var(--muted)] ring-1 ring-[var(--border)] hover:text-[var(--fg)] transition"
              aria-label="Toggle theme"
              title="Light / Dark"
            >
              {theme === 'dark' ? '☀︎' : '🌙'}
            </button>

            <a href="#contacto" className="hidden lg:inline">
              <Button>{t('cta_quote')}</Button>
            </a>
          </div>
        </nav>
      </div>

      <motion.div className="absolute left-0 right-0 top-0 h-[2px] origin-left bg-gradient-to-r from-teal-400 to-teal-200" style={{ scaleX: scrollYProgress }} />
    </motion.header>
  );
}
