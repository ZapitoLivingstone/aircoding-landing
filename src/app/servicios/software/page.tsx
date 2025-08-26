'use client';
import ServicePage from '@/components/service-page';
import { svc } from '@/content/services';
import { useI18n } from '@/providers/ui';

export default function Client() {
  const { lang } = useI18n();
  const data = svc('software', lang); // usa tu helper bilingüe
  return <ServicePage {...data} />;
}
