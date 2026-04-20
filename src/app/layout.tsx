import "./globals.css";
import { ReactNode } from "react";
import { Inter } from "next/font/google";
import { UIProvider } from "@/providers/ui";
import AccessibilityMenu from "@/components/accessibility-menu";
import MotionProvider from "@/components/motion-provider";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  title: "AirCoding",
  description: "Desarrollo Web & Móvil, Software a medida, Soluciones de IA e Integración de APIs.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} background-dots`} style={{ background: "var(--bg)", color: "var(--fg)" }}>
        <MotionProvider>
          <UIProvider>
            {children}
            <AccessibilityMenu />
          </UIProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
