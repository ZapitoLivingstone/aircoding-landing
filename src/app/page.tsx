import Header from '@/components/header';
import Hero from '@/components/hero';
import ServicesGrid from '@/components/services-grid';
import CTABanner from '@/components/cta-banner';
import ContactForm from '@/components/contact-form';

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ServicesGrid />
        <CTABanner />
        <section id="contact-form" className="mx-auto max-w-4xl px-4 pb-24">
          <h2 className="text-2xl font-bold md:text-3xl">Contáctanos</h2>
          <p className="mt-2 text-slate-300">Te responderemos en menos de 24 horas.</p>
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
            <ContactForm />
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 py-10 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} AirCoding — Valdivia, Chile · <a className="underline" href="mailto:aircodingspa@gmail.com">aircodingspa@gmail.com</a>
      </footer>
    </>
  );
}
