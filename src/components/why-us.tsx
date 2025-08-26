'use client';
import { motion, type Variants, useInView } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '@/providers/ui';

const container: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cardIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  function onMouseMove(e: React.MouseEvent) {
    const el = ref.current!; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(0.5 - y) * 6}deg`);
    el.style.setProperty('--ry', `${(x - 0.5) * 8}deg`);
  }
  function reset() { const el = ref.current!; el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); }
  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={reset}
      className="[transform-style:preserve-3d] [transform:rotateX(var(--rx))_rotateY(var(--ry))] transition-transform">
      {children}
    </div>
  );
}

function CountUp({ to, duration = 1.4, decimals = 0, prefix = '', suffix = '', className = '' }:{
  to:number; duration?:number; decimals?:number; prefix?:string; suffix?:string; className?:string;
}) {
  const viewRef = useRef<HTMLSpanElement>(null); const inView = useInView(viewRef, { once:true, amount:0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return; const s = performance.now(); let id = 0;
    const tick = (n:number)=>{ const p = Math.min(1, (n - s) / (duration*1000)); const e = 1 - Math.pow(1-p,3);
      setV(to*e); if (p<1) id = requestAnimationFrame(tick); };
    id = requestAnimationFrame(tick); return ()=>cancelAnimationFrame(id);
  }, [inView, to, duration]);
  return <span ref={viewRef} className={className}>{prefix}{v.toFixed(decimals)}{suffix}</span>;
}

export default function WhyUs() {
  const { lang } = useI18n();

  const title = lang === 'en' ? 'Why AirCoding?' : '¿Por qué AirCoding?';

  const items = useMemo(() => (
    lang === 'en'
      ? [
          { title:'Fast & transparent', desc:'Clear scope and pricing. We deliver in small, visible iterations.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" fill="currentColor"/></svg>) },
          { title:'Built to grow', desc:'Clean, maintainable solutions ready to scale with your needs.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M8 16 4 12l4-4M16 8l4 4-4 4M10 20l4-16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>) },
          { title:'Reliable & secure', desc:'Good practices, strong performance and data protection.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4Z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M9.5 12.5 11 14l3.5-3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>) },
          { title:'Post-launch support', desc:'We stay with you for improvements and monitoring.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M4 6v12a2 2 0 0 0 2 2h12" stroke="currentColor" strokeWidth="2" fill="none"/></svg>) },
        ]
      : [
          { title:'Rápidos y claros', desc:'Alcance y precio transparentes. Entregas iterativas visibles.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" fill="currentColor"/></svg>) },
          { title:'Listos para crecer', desc:'Soluciones limpias y mantenibles que escalan contigo.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M8 16 4 12l4-4M16 8l4 4-4 4M10 20l4-16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>) },
          { title:'Confiables y seguros', desc:'Buenas prácticas, alto rendimiento y protección de datos.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4Z" stroke="currentColor" strokeWidth="2" fill="none"/><path d="M9.5 12.5 11 14l3.5-3.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>) },
          { title:'Acompañamiento', desc:'Seguimos contigo para mejoras y monitoreo post-lanzamiento.', icon:(<svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--ac-teal)]"><path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><path d="M4 6v12a2 2 0 0 0 2 2h12" stroke="currentColor" strokeWidth="2" fill="none"/></svg>) },
        ]
  ), [lang]);

  const metrics = useMemo(() => (
    lang === 'en'
      ? [
          { value:30, prefix:'+', label:'Projects delivered' },
          { value:4.9, suffix:'/5', decimals:1, label:'Client satisfaction' },
          { value:4, prefix:'< ', suffix:' weeks', label:'Typical go-live time' },
        ]
      : [
          { value:30, prefix:'+', label:'Proyectos entregados' },
          { value:4.9, suffix:'/5', decimals:1, label:'Satisfacción de clientes' },
          { value:4, prefix:'< ', suffix:' sem', label:'Tiempo típico de go-live' },
        ]
  ), [lang]);

  return (
    // 👇 fuerza remount cuando cambia el idioma
    <section key={lang} className="container py-16" id="por-que">
      <div className="relative inline-block">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <motion.span
          aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded bg-gradient-to-r from-teal-400 to-teal-200/60"
        />
      </div>

      <motion.div
        variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
        className="mt-8 grid gap-6 sm:grid-cols-2"
      >
        {items.map((it) => (
          <motion.div key={it.title} variants={cardIn}>
            <TiltCard>
              <div className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur shadow-xl transition">
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -z-10 -top-10 -left-10 h-32 w-32 rounded-full
                             bg-[radial-gradient(circle_at_center,rgba(0,179,164,0.28),transparent_60%)] blur-2xl"
                  initial={{ opacity: 0.2, scale: 0.9 }} whileInView={{ opacity: 0.35, scale: 1 }}
                  viewport={{ once: true }} transition={{ duration: 0.8 }}
                />
                <div className="relative inline-flex items-center gap-3">
                  <motion.span
                    className="rounded-xl bg-[var(--ac-teal)]/15 p-2.5 ring-1 ring-[var(--ac-teal)]/30 text-[var(--ac-teal)]"
                    whileHover={{ scale: 1.03, rotate: 1 }} transition={{ duration: 0.3, ease: [0.22,1,0.36,1] }}
                  >
                    {it.icon}
                  </motion.span>
                </div>

                <h3 className="mt-3 text-lg font-semibold">{it.title}</h3>
                <p className="mt-2 text-slate-300">{it.desc}</p>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
        className="mt-10 grid gap-6 sm:grid-cols-3"
      >
        {metrics.map((m, i) => (
          <motion.div
            key={m.label} variants={cardIn}
            className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
            whileHover={{ y: -4 }} transition={{ duration: 0.35, ease: [0.22,1,0.36,1] }}
          >
            <CountUp
              to={m.value} decimals={(m as any).decimals ?? 0}
              prefix={(m as any).prefix ?? ''} suffix={(m as any).suffix ?? ''}
              className="text-3xl font-extrabold text-[var(--ac-accent)]"
            />
            <div className="mt-1 text-sm text-slate-300">{m.label}</div>
            <motion.div
              aria-hidden className="mx-auto mt-3 h-[2px] w-10 rounded bg-gradient-to-r from-teal-400 to-teal-200/60"
              initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 * i, ease: [0.22,1,0.36,1] }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
