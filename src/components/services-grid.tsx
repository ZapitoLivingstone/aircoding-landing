"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const services = [
  { key: "webmovil", title: "Web & Móvil", bullets: ["Next.js / React Native", "Performance y SEO", "Escalable"] },
  { key: "software", title: "Software a medida", bullets: ["Procesos ágiles", "Seguridad", "Soporte"] },
  { key: "ia", title: "Soluciones de IA", bullets: ["Chatbots", "Automatización", "Análisis"] },
  { key: "apis", title: "Integración de APIs", bullets: ["Pagos / ERPs", "Terceros", "Monitoreo"] },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current!;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 8}deg`);
  }
  function reset() {
    const el = ref.current!;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={reset}
         className="[transform-style:preserve-3d] [transform:rotateX(var(--rx))_rotateY(var(--ry))] transition-transform">
      {children}
    </div>
  );
}

export default function ServicesGrid() {
  return (
    <section id="servicios" className="container py-16">
      <h2 className="text-2xl font-bold md:text-3xl">Servicios</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
          >
            <TiltCard>
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl backdrop-blur
                              hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,179,164,.15)] transition">
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <ul className="mt-3 space-y-1 text-sm text-slate-300">
                  {s.bullets.map((b) => <li key={b}>• {b}</li>)}
                </ul>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
