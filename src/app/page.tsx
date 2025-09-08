"use client";

import Header from '@/components/header';
import Hero from '@/components/hero/hero';
import ServicesGrid from '@/components/services-grid';
import WhyUs from '@/components/why-us';
import ProcessSteps from '@/components/process-steps';
import Showcase from '@/components/showcase';
import Testimonials from '@/components/testimonials';
import CTABanner from '@/components/cta-banner';
import ContactForm from '@/components/contact-form';
import { useI18n } from '@/providers/ui';

export default function Page() {
  const year = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <WhyUs />
        <ProcessSteps />
        <Showcase />
        <Testimonials />
        <CTABanner />

        <section id="contacto" className="container pb-24">
          <h2 className="text-2xl font-bold md:text-3xl">{t('contact_title') ?? 'Contáctanos'}</h2>
          <p className="mt-2 text-slate-300">{t('contact_sub') ?? 'Te responderemos en menos de 24 horas.'}</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        © {year} AirCoding — Valdivia, Chile · <a className="underline" href="mailto:aircodingspa@gmail.com">aircodingspa@gmail.com</a>
      </footer>
    </>
  );
}
