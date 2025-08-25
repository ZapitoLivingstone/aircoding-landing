'use client';
import { useState } from 'react';
import { z } from 'zod';
import { Button } from './ui/button';

const schema = z.object({
  name: z.string().min(2, 'Ingresa tu nombre'),
  email: z.string().email('Email inválido'),
  service: z.enum(['webmovil','software','ia','apis']).optional(),
  message: z.string().min(10, 'Cuéntanos un poco más (≥10 caracteres)'),
});

export default function ContactForm() {
  const [errors, setErrors] = useState<Record<string,string>>({});
  const to = 'aircodingspa@gmail.com';

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      service: (String(form.get('service') || '') || undefined) as any,
      message: String(form.get('message') || ''),
    };

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const flat: Record<string,string> = {};
      parsed.error.issues.forEach(i => flat[i.path.join('.')] = i.message);
      setErrors(flat);
      return;
    }
    setErrors({});

    const subject = encodeURIComponent(`Cotización — ${data.name} (${data.service ?? 'general'})`);
    const body = encodeURIComponent(
      `Nombre: ${data.name}\nEmail: ${data.email}\nServicio: ${data.service ?? 'No especificado'}\n\nMensaje:\n${data.message}`
    );

    // Abrir el cliente de correo del usuario
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">Nombre</label>
        <input name="name" className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)]" />
        {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Email</label>
        <input name="email" type="email" className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)]" />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm mb-1">Servicio</label>
        <select name="service" className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)]">
          <option value="">Selecciona una opción</option>
          <option value="webmovil">Web & Móvil</option>
          <option value="software">Software a medida</option>
          <option value="ia">Soluciones de IA</option>
          <option value="apis">Integración de APIs</option>
        </select>
      </div>
      <div>
        <label className="block text-sm mb-1">Mensaje</label>
        <textarea name="message" rows={5} className="w-full rounded-xl bg-white/5 px-4 py-3 outline-none ring-1 ring-white/10 focus:ring-[var(--ac-teal)]" />
        {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
      </div>
      <Button type="submit" className="w-full">Enviar cotización</Button>
      <p className="text-xs text-slate-400">
        * Al enviar se abrirá tu cliente de correo para revisar y confirmar el mensaje.
      </p>
    </form>
  );
}
