'use client';
import ServicePage from '@/components/service-page';
import { svc } from '@/content/services';
import { useI18n } from '@/providers/ui';



export default function Client() {
  const { lang } = useI18n();
  const data = svc('software', lang);
  return (
    <ServicePage
      title="Software a medida"
      summary="Tu proceso, tu herramienta. Automatizamos y ordenamos el negocio."
      forWho={[
        "Empresas con procesos manuales o dispersos",
        "Equipos que usan planillas y quieren trazabilidad",
        "Emprendimientos que crecieron y necesitan control",
      ]}
      fit={[
        "Necesitas flujos con aprobaciones y estados",
        "Requieres perfiles/roles y auditoría",
        "Quieres reportes y métricas reales del negocio",
      ]}
      ideas={[
        "ERP/CRM liviano por módulos",
        "Gestión de órdenes y servicios",
        "Inventario y compras con alertas",
        "Reporterías y BI básico",
      ]}
      benefits={[
        "Menos errores y tareas repetitivas",
        "Visibilidad del estado real del negocio",
        "Base escalable para nuevas integraciones",
      ]}
      kpis={[
        "-30–50% tiempo operativo",
        "-20–40% errores de ingreso",
        "+20–30% velocidad en atención",
      ]}
    />
  );
}
