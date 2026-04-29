"use client";

import Header from '@/components/header';
import Footer from '@/components/footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="container pt-32 pb-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold md:text-4xl mb-4 text-[color:var(--fg)]">Política de Privacidad</h1>
          <p className="text-muted mb-8">Última actualización: 28 de abril de 2026</p>

          <div className="rounded-2xl border border-token bg-[color:var(--surface)] p-6 md:p-10 space-y-8 text-[color:var(--fg)]">
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Introducción</h2>
              <p className="text-muted leading-relaxed">
                En <strong>Aircoding</strong> respetamos tu privacidad y nos comprometemos a proteger tus datos personales.
                Esta política explica cómo recopilamos, usamos y protegemos la información cuando utilizas nuestra aplicación y
                nuestros servicios conectados a través de APIs de terceros (como Meta/Facebook).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Datos que recopilamos</h2>
              <p className="text-muted leading-relaxed mb-3">
                Al utilizar nuestra integración, podemos recopilar la siguiente información mínima necesaria para el funcionamiento del servicio:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2">
                <li>Información de perfil público (nombre, correo electrónico).</li>
                <li>Datos públicos de la cuenta vinculada, necesarios estrictamente para la funcionalidad de la API.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Uso de la información</h2>
              <p className="text-muted leading-relaxed mb-3">
                Los datos recopilados se utilizan exclusivamente para los siguientes propósitos:
              </p>
              <ul className="list-disc pl-6 text-muted space-y-2 mb-3">
                <li>Proporcionar y mantener el servicio.</li>
                <li>Mejorar la experiencia del usuario.</li>
                <li>Autenticación y acceso mediante servicios de terceros (ej. Meta).</li>
              </ul>
              <p className="text-muted leading-relaxed">
                <strong>No vendemos ni compartimos</strong> tu información personal con terceros para fines comerciales o de marketing.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Eliminación de datos</h2>
              <p className="text-muted leading-relaxed mb-3">
                Tienes el derecho de solicitar la eliminación de tus datos personales en cualquier momento.
                Para solicitar la eliminación completa de tus datos de nuestros sistemas, por favor sigue estos pasos:
              </p>
              <ol className="list-decimal pl-6 text-muted space-y-2">
                <li>Envía un correo electrónico a <strong>contacto@aircoding.cl</strong> con el asunto "Solicitud de eliminación de datos".</li>
                <li>Incluye en el mensaje la dirección de correo electrónico asociada a tu cuenta o integración.</li>
                <li>Procesaremos tu solicitud y eliminaremos todos tus datos en un plazo máximo de 3 a 5 días hábiles.</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">5. Contacto</h2>
              <p className="text-muted leading-relaxed mb-3">
                Si tienes alguna pregunta o inquietud sobre esta Política de Privacidad, puedes contactarnos en:
              </p>
              <ul className="list-none text-muted space-y-2">
                <li>Email: <a href="mailto:aircodingspa@gmail.com" className="text-[color:var(--acc-cyan)] hover:underline">aircodingspa@gmail.com</a></li>
                <li>Sitio web: <a href="https://aircoding.cl" className="text-[color:var(--acc-cyan)] hover:underline">aircoding.cl</a></li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
