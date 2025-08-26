'use client';
import { useI18n } from '@/providers/i18n';

export default function T({ k, children }: { k?: string; children?: React.ReactNode }) {
  const { t } = useI18n();
  // Si no pasas clave, usa el texto literal como clave (fallback)
  const key = k ?? (typeof children === 'string' ? children.trim() : '');
  const out = key ? t(key) : children;
  return <>{out ?? children}</>;
}
