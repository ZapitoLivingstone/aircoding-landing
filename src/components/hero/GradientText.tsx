"use client";

import { motion } from "framer-motion";

type Props = {
  colors?: string[];           // ["#40ffaa", "#4079ff", ...]
  animationSpeed?: number;     // segundos por ciclo
  showBorder?: boolean;
  className?: string;
  children: React.ReactNode;
};

/** Gradiente animado (performante, sin CSS extra) */
export default function GradientText({
  colors = ["#06b6d4", "#6366f1", "#06b6d4"],
  animationSpeed = 6,
  showBorder = false,
  className = "",
  children,
}: Props) {
  const gradient = `linear-gradient(90deg, ${colors.join(",")})`;
  const Comp = (
    <motion.span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: "200% 100%",
        backgroundPosition: "0% 50%",
      }}
      animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
      transition={{ duration: animationSpeed, ease: "linear", repeat: Infinity }}
    >
      {children}
    </motion.span>
  );

  if (!showBorder) return Comp;

  return (
    <span className="relative inline-block">
      <span
        aria-hidden
        className="absolute -inset-1 rounded-xl opacity-25 blur"
        style={{ backgroundImage: gradient }}
      />
      {Comp}
    </span>
  );
}
