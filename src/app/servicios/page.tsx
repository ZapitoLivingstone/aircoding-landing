import ServiciosClient from './client';
import { cookies } from 'next/headers';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('ac-lang')?.value === 'en' ? 'en' : 'es';

  return {
    title: lang === 'en' ? 'Services — AirCoding' : 'Servicios — AirCoding',
    description:
      lang === 'en'
        ? 'Choose what you need: Web & Mobile, Custom Software, AI Solutions and API Integrations.'
        : 'Elige lo que necesitas: Web & Móvil, Software a medida, Soluciones de IA e Integración de APIs.',
  };
}

export default function Page() {
  return <ServiciosClient />;
}
