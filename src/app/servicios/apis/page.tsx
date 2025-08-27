import Client from './client';
import { cookies } from 'next/headers';
import { servicesData } from '@/content/services';

export async function generateMetadata() {
  const cookieStore = await cookies();
  const lang = cookieStore.get('ac-lang')?.value === 'en' ? 'en' : 'es';
  const s = servicesData['apis'];
  return {
    title: `${s.title[lang] ?? s.title.es} — AirCoding`,
    description: s.summary[lang] ?? s.summary.es,
  };
}

export default function Page() {
  return <Client />;
}
