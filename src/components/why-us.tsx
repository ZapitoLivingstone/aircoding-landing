'use client';
import { motion, type Variants } from 'framer-motion';
import { useMemo, useRef } from 'react';
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

export default function WhyUs() {
  const { lang } = useI18n();

  const title = lang === 'en' ? 'Why AirCoding?' : '¿Por qué AirCoding?';

  // Mensaje honesto: empresa/equipo pequeño (actualmente 1), 2 clientes, factura
  const honesty = lang === 'en'
    ? 'We’re a small, transparent team (currently one person). I’ve worked with 2 clients so far. I can issue invoices and I’m clear about scope, timelines and costs.'
    : 'Somos un equipo pequeño y transparente (actualmente una persona). He trabajado con 2 clientes hasta ahora. Puedo emitir factura y soy claro con el alcance, plazos y costos.';

  // Razones para trabajar con AirCoding (sin métricas ni portafolio aquí)
  const reasons = useMemo(() => (
    lang === 'en'
      ? [
          { h:'Transparent process', p:'Clear proposals, fixed milestones and weekly updates. No hidden fees.', icon:'checklist', badges:['Invoices', 'Formal quotes', 'NDA on request'] },
          { h:'Direct communication', p:'You talk to the person who builds. Fewer layers, faster feedback.', icon:'chat' },
          { h:'Milestone delivery', p:'Short iterations with demos. Scope managed in small, visible steps.', icon:'calendar' },
          { h:'Maintainable code', p:'Clean architecture, docs and handover. Built to evolve, not just to launch.', icon:'code' },
          { h:'Security & privacy', p:'Good practices by default and basic data-protection hygiene.', icon:'shield' },
          { h:'Post-launch support', p:'Monitoring and improvement cycles after go-live.', icon:'support' },
        ]
      : [
          { h:'Proceso transparente', p:'Propuestas claras, hitos definidos y reportes semanales. Sin costos ocultos.', icon:'checklist', badges:['Factura', 'Cotización formal', 'NDA si se requiere'] },
          { h:'Comunicación directa', p:'Hablas con quien construye. Menos capas, feedback más rápido.', icon:'chat' },
          { h:'Entregas por hitos', p:'Iteraciones cortas con demos. Alcance gestionado en pasos visibles.', icon:'calendar' },
          { h:'Código mantenible', p:'Arquitectura limpia, documentación y traspaso. Pensado para crecer.', icon:'code' },
          { h:'Seguridad y privacidad', p:'Buenas prácticas por defecto y cuidado básico de datos.', icon:'shield' },
          { h:'Soporte post-lanzamiento', p:'Monitoreo y mejoras continuas después del go-live.', icon:'support' },
        ]
  ), [lang]);

  // Paleta de acentos sobrios por card (indigo/cyan/violet/amber)
  const ACCENTS = [
    'oklch(0.73 0.15 264)',  // indigo
    'oklch(0.76 0.12 205)',  // cyan
    'oklch(0.78 0.13 310)',  // violet
    'oklch(0.86 0.12 80)',   // amber
  ] as const;

  // Mini íconos con currentColor
  const Icon = ({ type }: { type: string }) => {
    switch (type) {
      case 'checklist':
        return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <path d="M4 7h16M4 12h5M4 17h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M9.5 12.5 11 14l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>;
      case 'chat':
        return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <path d="M4 6h16v9a3 3 0 0 1-3 3H9l-5 3V9a3 3 0 0 1 3-3Z" stroke="currentColor" strokeWidth="2" />
          <path d="M8 10h8M8 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>;
      case 'calendar':
        return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M16 3v4M8 3v4M3 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 14h4l-2 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>;
      case 'code':
        return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <path d="M8 16 4 12l4-4M16 8l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M14 4 10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>;
      case 'shield':
        return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <path d="M12 3 4 7v6c0 5 8 8 8 8s8-3 8-8V7l-8-4Z" stroke="currentColor" strokeWidth="2" />
          <path d="M9.5 12.5 11 14l3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>;
      default: // support
        return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
          <path d="M12 7v6l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>;
    }
  };

  return (
    <section key={lang} className="container py-16" id="por-que">
      {/* Título + subrayado */}
      <div className="relative inline-block">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        <motion.span
          aria-hidden initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }}
          className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded"
          style={{ background: 'linear-gradient(90deg, color-mix(in oklab, var(--acc-indigo) 40%, transparent), color-mix(in oklab, var(--acc-cyan) 40%, transparent))' }}
        />
      </div>

      {/* Párrafo honesto (equipo pequeño + factura + 2 clientes) */}
      <p className="mt-3 text-sm text-muted max-w-2xl">{honesty}</p>

      {/* Razones: grid de cards (sin métricas ni portafolio) */}
      <motion.div
        variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {reasons.map((r, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          return (
            <motion.div key={r.h} variants={cardIn}>
              <TiltCard>
                <div className="relative isolate overflow-hidden rounded-2xl border border-token bg-[color:var(--surface)] p-6 backdrop-blur shadow-token transition group">
                  <div className="flex items-start gap-3">
                    <span
                      className="rounded-xl p-2.5 ring-1"
                      style={{
                        color: accent,
                        background: `color-mix(in oklab, ${accent} 12%, transparent)`,
                        borderColor: `color-mix(in oklab, ${accent} 24%, transparent)`,
                      }}
                    >
                      <Icon type={r.icon} />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold group-hover:text-[color:var(--fg)]" style={{ color: 'color-mix(in oklab, var(--fg) 92%, transparent)' }}>
                        {r.h}
                      </h3>
                      <p className="mt-1 text-sm text-muted">{r.p}</p>
                      {r.badges && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {r.badges.map(b => (
                            <span key={b} className="rounded-lg px-2.5 py-1 text-xs ring-1"
                              style={{
                                background: 'color-mix(in oklab, var(--surface-2), transparent 10%)',
                                borderColor: 'var(--border)',
                                color: 'color-mix(in oklab, var(--fg) 85%, transparent)',
                              }}
                            >
                              {b}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
