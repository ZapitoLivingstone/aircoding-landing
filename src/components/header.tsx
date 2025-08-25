"use client";
import Image from "next/image";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-slate-900/30 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/Logo_AirCoding-sin-fondo.png" alt="AirCoding" width={34} height={34} priority />
          <span className="text-sm font-semibold tracking-wide">AirCoding</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a href="#servicios" className="hover:text-white">Servicios</a>
          <a href="#proceso" className="hover:text-white">Proceso</a>
          <a href="#contacto" className="hover:text-white">Contacto</a>
          <a href="#contacto" className="hidden lg:inline"><Button>Cotiza tu proyecto</Button></a>
        </nav>
      </div>
    </header>
  );
}
