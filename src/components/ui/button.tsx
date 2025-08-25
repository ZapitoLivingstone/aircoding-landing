import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };

export function Button({ className, variant = "primary", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-[var(--ac-teal)] hover:bg-[var(--ac-teal-dark)] text-white shadow-[0_8px_30px_rgba(0,179,164,.25)]"
      : "bg-white/5 hover:bg-white/10 text-slate-100 ring-1 ring-white/10";
  return <button className={twMerge(base, styles, className)} {...props} />;
}
