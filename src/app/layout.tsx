import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { UIProvider } from "@/providers/ui";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "AirCoding — Software y apps para hacer crecer tu negocio",
  description: "Desarrollo Web & Móvil, Software a medida, Soluciones de IA e Integración de APIs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} background-dots`} style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <MotionConfig reducedMotion="user">
          <UIProvider>{children}</UIProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
