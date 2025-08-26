'use client';
import ServicePage from '@/components/service-page';
import { svc } from '@/content/services';
import { useI18n } from '@/providers/ui';


export default function Client() {
  const { lang } = useI18n();
  const data = svc('apis', lang);
  return (
    <ServicePage key={lang}
      title="Integración de APIs"
      summary="Conectamos pagos, ERPs, logística y facturación. Datos sincronizados."
      forWho={[
        "Tiendas y distribuidoras que necesitan automatizar",
        "Empresas con sistemas que no conversan entre sí",
        "Pymes que requieren facturación electrónica y conciliación",
      ]}
      fit={[
        "Haces procesos manuales entre plataformas",
        "Pierdes pedidos o duplicas información",
        "Necesitas webhooks y monitoreo de integraciones",
      ]}
      ideas={[
        "Pagos (Transbank/MercadoPago)",
        "Facturación electrónica",
        "Integraciones logísticas y tracking",
        "ETLs simples y sincronización programada",
      ]}
      benefits={[
        "Menos fricción y errores",
        "Trazabilidad de punta a punta",
        "Escalabilidad con monitoreo y alertas",
      ]}
      kpis={[
        "Pedidos despachados 2× más rápido",
        "-30–50% errores de conciliación",
        "Tiempos de integración medidos en días",
      ]}
    />
  );
}
