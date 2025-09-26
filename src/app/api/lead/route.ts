import { z } from 'zod';
import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const LeadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  service: z.enum(['webmovil','software','ia','apis']).optional(),
  message: z.string().min(10),
  website: z.string().optional().default(''),
});

function createTransport() {
  const host = process.env.SMTP_HOST!;
  const port = Number(process.env.SMTP_PORT ?? 587); // <-- prueba 587 por defecto
  // secure true SOLO para 465, false para 587 (STARTTLS)
  const secure = port === 465 ? true : false;

  const user = process.env.SMTP_USER!;
  const pass = process.env.SMTP_PASS!;

  // timeouts y TLS más explícitos
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    requireTLS: !secure,         // STARTTLS en 587
    connectionTimeout: 10000,    // 10s
    greetingTimeout: 8000,
    socketTimeout: 15000,
    tls: {
      // si tu servidor requiere ciphers modernos, puedes ajustar aquí
      // ciphers: 'TLSv1.2',
      // rejectUnauthorized: true, // por seguridad; déjalo true si tu CA es válida
    },
  });
}

export async function POST(req: Request) {
  try {
    const json = await req.json().catch(() => ({}));
    const parsed = LeadSchema.safeParse(json);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      return Response.json({ ok: false, errors }, { status: 400 });
    }

    const { name, email, service, message, website } = parsed.data;
    if (website && website.trim() !== '') return Response.json({ ok: true });

    // Validación rápida de envs en runtime
    const missing = ['SMTP_HOST','SMTP_USER','SMTP_PASS']
      .filter(k => !process.env[k]);
    if (missing.length) {
      console.error('lead env error: faltan', missing);
      return Response.json({ ok: false, error: 'ENV_MISSING', missing }, { status: 500 });
    }

    const transport = createTransport();

    const to = process.env.LEAD_TO || process.env.SMTP_USER!;
    const from = process.env.LEAD_FROM || process.env.SMTP_USER!;
    const subject = `Nuevo lead — ${name} (${service ?? 'general'})`;

    const plain = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Servicio: ${service ?? 'No especificado'}`,
      '',
      'Mensaje:',
      message,
      '',
      `Origen: ${req.headers.get('referer') ?? ''}`,
      `Fecha: ${new Date().toISOString()}`
    ].join('\n');

    const html = `
      <table style="width:100%;max-width:640px;margin:auto;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;border-collapse:collapse">
        <tr><td style="padding:16px 0">
          <h2 style="margin:0 0 6px">🆕 Nuevo lead</h2>
          <div style="font-size:14px;color:#64748b">Servicio: <b>${service ?? 'No especificado'}</b></div>
        </td></tr>
        <tr><td style="padding:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px">
          <p style="margin:0 0 8px"><b>Nombre:</b> ${name}</p>
          <p style="margin:0 0 8px"><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
          <p style="margin:0 0 0;white-space:pre-wrap"><b>Mensaje:</b>\n${message}</p>
        </td></tr>
        <tr><td style="padding:10px 0;color:#64748b;font-size:12px">
          Origen: ${req.headers.get('referer') ?? ''} • Fecha: ${new Date().toLocaleString()}
        </td></tr>
        <tr><td style="padding:8px 0">
          <a href="mailto:${email}?subject=Re:%20${encodeURIComponent(subject)}" 
             style="display:inline-block;padding:10px 14px;border:1px solid #0f172a;border-radius:10px;text-decoration:none;color:#0f172a">
             Responder al cliente
          </a>
        </td></tr>
      </table>
    `;

    const info = await transport.sendMail({
      from,
      to,
      subject,
      text: plain,
      html,
      replyTo: email,
      headers: {
        'X-Lead-Service': service ?? 'general',
        'X-Reply-To': email
      }
    });

    // log mínimo (no exponer secretos)
    console.log('lead mail sent', { messageId: info.messageId });

    return Response.json({ ok: true });
  } catch (err: any) {
    console.error('lead error', { message: err?.message, code: err?.code, stack: err?.stack });
    // Devuelve más pista en prod (sin filtrar secretos)
    return Response.json({ ok: false, error: 'MAIL_ERROR', detail: err?.message ?? String(err) }, { status: 500 });
  }
}
