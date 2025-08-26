'use client';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import CodeParticles from './code-particles';

export default function Hero() {
  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden pt-24">
      {/* blobs suaves de fondo */}
      <motion.div
        aria-hidden
        className="absolute left-1/2 top-[-120px] -z-10 h-[800px] w-[1200px] -translate-x-1/2 rounded-full
                   bg-gradient-to-br from-teal-600/25 via-teal-500/10 to-transparent blur-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      />

      {/* símbolos de “código” */}
      <CodeParticles />

      <div className="container grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1
            className="text-5xl font-extrabold leading-tight md:text-6xl"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.7 }}
          >
            <span className="bg-gradient-to-r from-teal-300 via-white to-teal-300 bg-clip-text text-transparent">
              Software y apps que hacen crecer tu negocio.
            </span>
          </motion.h1>
          <motion.p
            className="mt-4 text-lg text-slate-300"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.05 }}
          >
            Web & Móvil, Software a medida, Soluciones de IA e Integración de APIs. Rápido, moderno y sin complicaciones.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}
          >
            <a href="#contacto"><Button className="w-full sm:w-auto">Cotiza tu proyecto</Button></a>
            <a href="#servicios"><Button variant="ghost" className="w-full sm:w-auto">Ver servicios</Button></a>
          </motion.div>
        </div>

        {/* Logo animado con spotlight */}
        <motion.div
          className="relative justify-self-center"
          initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: .8, delay: .2 }}
        >
          <div className="logo-spotlight" />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <motion.div
              style={{ display: 'inline-block' }}
              animate={{ rotate: [0, 1.5, -1.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Image src="/Logo_AirCoding-sin-fondo.png" alt="AirCoding" width={360} height={360} priority className="select-none" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
