import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { MotionConfig } from "framer-motion";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "AirCoding — Software y apps para hacer crecer tu negocio",
  description: "Desarrollo Web & Móvil, Software a medida, Soluciones de IA e Integración de APIs.",
  openGraph: { title: "AirCoding", description: "Construimos apps y software que venden por ti.", type: "website" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased background-dots`}>
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
