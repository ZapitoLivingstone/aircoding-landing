'use client';

import { Button } from '../ui/button';
import { motion, useReducedMotion } from 'framer-motion';
import CodeParticles from '../code-particles';
import { useI18n } from '@/providers/ui';
import Image from 'next/image';
import LiquidEther from './LiquidEther'; // ⬅️ tu componente de fondo

// reactbits
import TextType from './TextType';
import GradientText from './GradientText';

const EASE: readonly [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function Hero() {
  const { t, lang } = useI18n();
  const prefersReduced = useReducedMotion() ?? false;

  // Paletas menos saturadas (evitamos “mar” azul)
  const darkColors = ['#6E63FF', '#F2B6FF', '#C7B8FF'];  // indigo/magenta suaves
  const lightColors = ['#6A5AE0', '#E9A8F5', '#B9AEF2'];

  // Detecta tema desde atributo del <html> (si ya lo setea tu provider)
  const theme = typeof document !== 'undefined'
    ? document.documentElement.getAttribute('data-theme') ?? 'dark'
    : 'dark';

  return (
    <section
      className="hero relative isolate min-h-[92vh] overflow-hidden hero-padding md:pt-28 md:pb-24"
      style={{ background: 'transparent' }} // neutraliza aurora previa si venía por CSS
    >
      {/* Fondo reactbits: capa detrás de todo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20"
      >
        {prefersReduced ? (
          // Fallback estático (sin animación)
          <div className="h-full w-full opacity-70"
               style={{
                 background:
                   'radial-gradient(120% 80% at 20% 10%, rgba(110,99,255,0.20) 0%, transparent 60%),' +
                   'radial-gradient(120% 80% at 80% 30%, rgba(242,182,255,0.18) 0%, transparent 62%),' +
                   'radial-gradient(120% 80% at 50% 90%, rgba(185,174,242,0.16) 0%, transparent 65%)'
               }}
          />
        ) : (
          // LiquidEther animado
          <LiquidEther
            colors={theme === 'light' ? lightColors : darkColors}
            mouseForce={16}
            cursorSize={96}
            isViscous={false}
            viscous={28}
            iterationsViscous={28}
            iterationsPoisson={28}
            resolution={0.6}         // más liviano que 1.0
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.45}
            autoIntensity={1.9}      // menos “agresivo”
            takeoverDuration={0.25}
            autoResumeDelay={2600}
            autoRampDuration={0.55}
            style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
          />
        )}
      </div>

      {/* Partículas de código (las mantenemos) */}
      <CodeParticles />

      <div className="container relative z-10 grid items-center gap-10 md:grid-cols-2">
        {/* Columna de texto */}
        <div className="max-w-2xl">
          <motion.h1
            className="text-balance text-4xl font-extrabold leading-tight md:text-6xl"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <TextType
              id='hero-typed-text'
              key={lang}
              text={[t('hero_h1')]}
              as="span"
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#40ffaa] via-[#4079ff] to-[#40ffaa]"
              typingSpeed={40}
              deletingSpeed={20}
              pauseDuration={1500}
              loop={false}
            />
          </motion.h1>

          <motion.p
            className="mt-4 text-lg"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
          >
            <GradientText
              colors={['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa']}
              animationSpeed={3}
              showBorder={false}
              className="custom-class"
            >
              {t('hero_sub')}
            </GradientText>
          </motion.p>

          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          >
            <a href="#contacto">
              <Button className="w-full sm:w-auto">{t('hero_cta_primary')}</Button>
            </a>
            <a href="#servicios">
              <Button id='button_service' variant="ghost" className="w-full sm:w-auto">
                {t('hero_cta_secondary')}
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Columna visual (logo + spotlight) */}
        <motion.div
          className="relative justify-self-center"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        >
          <div className="logo-spotlight" aria-hidden />
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
            className="transform-gpu will-change-transform"
          >
            <Image
              src="/solo-logo.png"
              alt="Logo AirCoding"
              width={360}
              height={360}
              className="select-none"
              priority
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
