"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useI18n } from "@/providers/ui";

type Social = "instagram" | "tiktok" | "linkedin" | "github";

const socials: { id: Social; href: string; label: { es: string; en: string } }[] = [
  { id: "instagram", href: "https://instagram.com/aircodingspa", label: { es: "Instagram", en: "Instagram" } },
  { id: "tiktok",    href: "https://tiktok.com/@aircoding",      label: { es: "TikTok",    en: "TikTok"    } },
  { id: "linkedin",  href: "https://www.linkedin.com/company/aircoding", label: { es: "LinkedIn",  en: "LinkedIn"  } },
  { id: "github",    href: "https://github.com/aircoding",        label: { es: "GitHub",    en: "GitHub"    } },
];

function SocialIcon({ id }: { id: Social }) {
  const base = "h-5 w-5";
  switch (id) {
    case "instagram":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
        </svg>
      );
    case "tiktok":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M14 3v8.2a4.2 4.2 0 1 1-3.2-4.07V10a2.2 2.2 0 1 0 2.2 2.2V3h1ZM15 3c.63 1.9 2.36 3.32 4.44 3.53V9.2c-1.96 0-3.77-.68-4.44-1.6V3Z" fill="currentColor"/>
        </svg>
      );
    case "linkedin":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <rect x="6" y="10" width="3" height="8" fill="currentColor" />
          <rect x="6" y="6" width="3" height="3" fill="currentColor" />
          <path d="M12 10h3v1.6c.5-.95 1.65-1.8 3.4-1.6V18h-3v-4c0-1.2-1.2-1.7-2.1-1.3-.2.1-.3.2-.3.3V18h-3v-8Z" fill="currentColor"/>
        </svg>
      );
    case "github":
      return (
        <svg className={base} viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M12 2C6.49 2 2 6.58 2 12.25c0 4.52 2.87 8.35 6.85 9.71.5.1.68-.23.68-.5v-1.8c-2.78.63-3.37-1.22-3.37-1.22-.46-1.2-1.14-1.53-1.14-1.53-.93-.66.07-.65.07-.65 1.02.07 1.56 1.07 1.56 1.07.92 1.61 2.4 1.15 2.98.88.09-.69.36-1.15.65-1.42-2.22-.26-4.55-1.15-4.55-5.12 0-1.13.39-2.05 1.04-2.77-.11-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.06A9.2 9.2 0 0 1 12 6.8c.85 0 1.7.12 2.5.36 1.9-1.34 2.74-1.06 2.74-1.06.56 1.43.22 2.49.11 2.75.65.72 1.04 1.64 1.04 2.77 0 3.98-2.34 4.85-4.56 5.1.37.33.7.96.7 1.95v2.88c0 .27.18.6.69.5A10.06 10.06 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" fill="currentColor"/>
        </svg>
      );
  }
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Footer() {
  const year = new Date().getFullYear();
  const { lang } = useI18n();

  const copy = lang === "en"
    ? {
        city: "Valdivia, Chile",
        talk: "Let’s talk",
        seeServices: "View services",
        follow: "Follow us for updates, tips, and real projects.",
        rights: "All rights reserved.",
        projects: "Projects",
        contact: "Contact",
        brandAlt: "AirCoding",
      }
    : {
        city: "Valdivia, Chile",
        talk: "Hablemos",
        seeServices: "Ver servicios",
        follow: "Síguenos para ver avances, tips y proyectos reales.",
        rights: "Todos los derechos reservados.",
        projects: "Proyectos",
        contact: "Contacto",
        brandAlt: "AirCoding",
      };

  return (
    <footer className="relative border-t border-token bg-[color:var(--surface)]/50 backdrop-blur pt-10">
      {/* Top progress line (accent) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, color-mix(in oklab, var(--acc-indigo) 55%, transparent), color-mix(in oklab, var(--acc-cyan) 55%, transparent))",
        }}
      />

      <div className="container">
        {/* Upper row: brand + CTA */}
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <span
                aria-hidden
                className="absolute -inset-3 rounded-full blur-2xl"
                style={{ boxShadow: "0 0 90px 18px color-mix(in oklab, var(--ac-accent) 22%, transparent)" }}
              />
              <Image
                src="/Logo_AirCoding-sin-fondo.png"
                alt={copy.brandAlt}
                width={40}
                height={40}
                className="rounded-full ring-1 ring-[var(--border)]"
              />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">AirCoding</div>
              <div className="text-xs text-muted">
                {copy.city} ·{" "}
                <a className="underline" href="mailto:aircodingspa@gmail.com">
                  aircodingspa@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 sm:justify-self-end">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="#contacto" className="btn-hero btn-icon focus-ring">
                {copy.talk} <span aria-hidden>→</span>
              </Link>
              <Link href="#servicios" className="btn-ghost-hero btn-icon focus-ring">
                {copy.seeServices} <span aria-hidden>↗</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Middle row: social & nav */}
        <div className="mt-8 rounded-2xl border border-token bg-[color:var(--surface)]/60 p-5">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm on-surface-muted">{copy.follow}</p>
            </div>

            <ul className="flex flex-wrap items-center gap-2">
              {socials.map(({ id, href, label }) => (
                <li key={id}>
                  <motion.a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label[lang as "es" | "en"]}
                    whileHover={{ y: -2, scale: 1.02 }}
                    transition={{ duration: 0.22, ease: EASE }}
                    className="inline-flex items-center gap-2 rounded-xl border border-token bg-[color:var(--surface-2)] px-3 py-2 text-sm transition hover:bg-[color:var(--surface)] focus-ring"
                    style={{ color: "color-mix(in oklab, var(--fg) 92%, transparent)" }}
                  >
                    <SocialIcon id={id} />
                    <span className="hidden sm:inline">{label[lang as "es" | "en"]}</span>
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row: legal */}
        <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-token py-5 text-center text-xs text-muted sm:flex-row sm:text-left">
          <div>© {year} AirCoding — {copy.rights}</div>
          <div className="flex items-center gap-3">
            <Link href="#proyectos" className="underline hover:no-underline">
              {copy.projects}
            </Link>
            <span aria-hidden className="text-muted">•</span>
            <Link href="#contacto" className="underline hover:no-underline">
              {copy.contact}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
