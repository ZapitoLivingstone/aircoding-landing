'use client';
import ServicePage from '@/components/service-page';
import { svc } from '@/content/services';
import { useI18n } from '@/providers/ui';


export default function Client() {
  const { lang } = useI18n();
  const data = svc('web-movil', lang);
  return (
    <ServicePage
      title="Desarrollo Web & Móvil"
      summary="Sitios y apps rápidas, modernas y optimizadas para SEO/ASO."
      forWho={[
        "Pymes de retail que quieren vender online",
        "Servicios profesionales que agendan y cobran",
        "Negocios locales que necesitan app para clientes",
      ]}
      fit={[
        "No tienes e-commerce o no convierte",
        "Necesitas app ligera para pedidos/seguimiento",
        "Quieres rendimiento alto (Lighthouse 95+) y SEO",
      ]}
      ideas={[
        "E-commerce con Transbank/MercadoPago",
        "App de pedidos y estado de entrega",
        "Portal de clientes con notificaciones push",
        "Dashboard de ventas/operaciones",
      ]}
      benefits={[
        "Time-to-market veloz con Next.js/React Native",
        "Experiencia móvil fluida y rápida",
        "Arquitectura escalable y segura",
      ]}
      kpis={[
        "+25–40% conversiones en 60–90 días",
        "LCP < 2s y CLS estable",
        "Retención móvil +15–20%",
      ]}
    />
  );
}
