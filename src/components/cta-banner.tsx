import { Button } from './ui/button';

export default function CTABanner() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16" id="contacto">
      <div className="rounded-2xl bg-gradient-to-r from-teal-700/40 to-teal-500/20 p-8 ring-1 ring-white/10">
        <h3 className="text-2xl font-semibold">¿Listo para construir?</h3>
        <p className="mt-1 text-slate-300">Agenda tu cotización hoy y arranquemos esta semana.</p>
        <div className="mt-6">
          <a href="#contact-form"><Button>Escríbenos por correo</Button></a>
        </div>
      </div>
    </section>
  );
}
