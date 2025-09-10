// components/ui/button.tsx
import React, {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
} from "react";
import { twMerge } from "tailwind-merge";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";

type ButtonVariant = "primary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-[var(--ac-teal)] hover:bg-[var(--ac-teal-dark)] text-white shadow-[0_8px_30px_rgba(0,179,164,.25)]"
      : "bg-white/5 hover:bg-white/10 text-slate-100 ring-1 ring-white/10";
  return <button className={twMerge(base, styles, className)} {...props} />;
}

/* ======== ShinyButton (a|button sin any) ======== */
type BaseShiny = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type AnchorProps = BaseShiny &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type NativeButtonProps = BaseShiny &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export type ShinyButtonProps = AnchorProps | NativeButtonProps;

export function ShinyButton(props: ShinyButtonProps) {
  const { className, children, variant = "primary", ...rest } = props;
  const prefers = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const tx = useSpring(x, { stiffness: 200, damping: 16, mass: 0.35 });
  const ty = useSpring(y, { stiffness: 200, damping: 16, mass: 0.35 });

  function onMove(e: React.MouseEvent<HTMLElement>) {
    if (prefers) return;
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const ny = ((e.clientY - r.top) / r.height - 0.5) * 10;
    x.set(nx);
    y.set(ny);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "group relative inline-flex select-none items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold focus:outline-none focus-visible:outline-none";
  const primary =
    "text-white border transition will-change-transform " +
    "border-[color:color-mix(in_oklab,var(--acc-cyan,#06b6d4)_35%,black)] " +
    "shadow-[0_10px_28px_color-mix(in_oklab,var(--acc-cyan,#06b6d4)_24%,transparent)] " +
    "bg-[linear-gradient(180deg,color-mix(in_oklab,var(--acc-cyan,#06b6d4)_74%,white),color-mix(in_oklab,var(--acc-indigo,#6366f1)_70%,var(--ac-accent)))]";
  const ghost =
    "text-[color:var(--fg)] border border-[color:var(--border)] backdrop-blur bg-[color-mix(in_oklab,var(--surface),transparent_10%)]";

  const classes = twMerge(base, variant === "primary" ? primary : ghost, "focus-ring", className);

  const MotionWrapper = (
    <motion.div style={{ x: tx, y: ty }} className="inline-flex">
      {/* shine */}
      {children}
    </motion.div>
  );

  if ("href" in props && props.href) {
    const aProps = rest as AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <motion.div style={{ x: tx, y: ty }} className="inline-flex">
        <a
          {...aProps}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className={classes}
        >
          <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <span className="absolute -inset-x-10 -top-1 h-[150%] w-[40%] rotate-[12deg] bg-gradient-to-b from-white/60 via-white/0 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
          </span>
          {children}
          {variant === "primary" && (
            <svg
              className="ml-1 h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px]"
              viewBox="0 0 24 24"
              aria-hidden
            >
              <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </a>
      </motion.div>
    );
  }

  const btnProps = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <motion.div style={{ x: tx, y: ty }} className="inline-flex">
      <button
        {...btnProps}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={classes}
      >
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
          <span className="absolute -inset-x-10 -top-1 h-[150%] w-[40%] rotate-[12deg] bg-gradient-to-b from-white/60 via-white/0 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />
        </span>
        {children}
        {variant === "primary" && (
          <svg
            className="ml-1 h-[14px] w-[14px] transition-transform duration-200 group-hover:translate-x-[2px]"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path d="M5 12h14M13 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </motion.div>
  );
}
