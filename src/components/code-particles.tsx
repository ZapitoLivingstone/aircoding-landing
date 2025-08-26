'use client';
import { motion } from 'framer-motion';

const items = [
  { x: '6%',  y: '14%', s: 28, r: -12, t: 0.0, ch: '<>' },
  { x: '18%', y: '62%', s: 32, r: 8,   t: 0.2, ch: '{}' },
  { x: '32%', y: '28%', s: 24, r: 14,  t: 0.35,ch: '</>' },
  { x: '46%', y: '10%', s: 20, r: -6,  t: 0.5, ch: '<>' },
  { x: '58%', y: '52%', s: 30, r: 10,  t: 0.65,ch: '{}' },
  { x: '70%', y: '18%', s: 26, r: -18, t: 0.8, ch: '</>' },
  { x: '84%', y: '40%', s: 34, r: 6,   t: 0.95,ch: '<>' },
];

export default function CodeParticles() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      {items.map((it, i) => (
        <motion.div
          key={i}
          className="code-symbol absolute text-white"
          style={{ left: it.x, top: it.y, fontSize: it.s }}
          initial={{ opacity: 0, y: 10, rotate: it.r }}
          animate={{ opacity: 0.22, y: [0, -6, 0], rotate: [it.r, it.r + 8, it.r] }}
          transition={{ duration: 6, repeat: Infinity, delay: it.t, ease: 'easeInOut' }}
        >
          {it.ch}
        </motion.div>
      ))}
    </div>
  );
}
