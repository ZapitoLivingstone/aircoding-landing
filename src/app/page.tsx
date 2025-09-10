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
import Footer from '@/components/footer'; // <-- nuevo
import { useI18n } from '@/providers/ui';

export default function Page() {
  const { t } = useI18n();

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <ServicesGrid />
        <WhyUs />
        <ProcessSteps />
        <Showcase />
        <Testimonials />
        <CTABanner />

        <section id="contacto" className="container pb-24">
          <h2 className="text-2xl font-bold md:text-3xl">{t('contact_title') ?? 'Contáctanos'}</h2>
          <p className="mt-2 text-muted">{t('contact_sub') ?? 'Te responderemos en menos de 24 horas.'}</p>
          <div className="mt-6 rounded-2xl border border-token bg-[color:var(--surface)] p-6">
            <ContactForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
