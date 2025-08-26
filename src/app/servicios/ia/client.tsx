'use client';
import ServicePage from '@/components/service-page';
import { svc } from '@/content/services';
import { useI18n } from '@/providers/ui';

export default function Client() {
  const { lang } = useI18n();
  const data = svc('ia', lang);
  return (
    <ServicePage key={lang}
      title="Soluciones de IA"
      summary="Atiende 24/7, clasifica, resume y encuentra información al instante."
      forWho={[
        "Soporte/atención al cliente con alto volumen",
        "Áreas que procesan documentos o tickets",
        "Equipos que quieren respuestas internas rápidas",
      ]}
      fit={[
        "Tienes preguntas frecuentes y tiempos de respuesta altos",
        "Debes resumir o comparar documentos",
        "Quieres búsqueda semántica sobre tus datos",
      ]}
      ideas={[
        "Chatbot con base de conocimiento propia",
        "Clasificación y priorización automática de tickets",
        "Resumen y extracción de datos desde PDFs",
        "Buscador inteligente para el equipo",
      ]}
      benefits={[
        "Atención inmediata y consistente",
        "Ahorro de horas hombre",
        "Mejor experiencia de usuario",
      ]}
      kpis={[
        "-30–60% tiempo medio de respuesta",
        "-20–40% volumen atendido por humanos",
        "+15–25% satisfacción de usuarios",
      ]}
    />
  );
}
